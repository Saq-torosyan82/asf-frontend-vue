<template>
  <div>
    <div class="colored-header dp-row">
      <h5>All deal board</h5>
      <div class="header-currency-filter dp-row">
        <v-autocomplete
          v-model="currencyType"
          :items="listCurrencyType"
          solo
          flat
          hide-details
          :label="currencyType || 'Currency'"
          @change="onSelectCurrency"
        />
        <div class="deals-table-filter" v-click-outside="onHideFilter">
          <img
            src="@/assets/img/table-data-filter-icon.png"
            class="sort-icon"
            @click="onDealsTableSort"
          />
          <div v-if="isSort" class="sort-container">
            <span class="sort-title">Sort</span>
            <div class="sort-content">
              <div v-for="title in titlesForSort" :key="title.id">
                <span class="sort-name">{{ title }}</span>
                <v-radio-group v-model="sortValueModel[title]">
                  <v-radio
                    v-for="sort in sortList"
                    :key="sort"
                    :label="sort"
                    :value="sort"
                    :color="filterIconColor"
                    @click="onSortBy(title, sort)"
                  ></v-radio>
                </v-radio-group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="filter-wrapper" v-if="isAdmin">
      <DealsFilter
        @setFilterDealsList="setFilterDealsList"
        :listFilterCountry="listFilterCountry"
        :listFilterDealType="listFilterDealType"
        :listFilterSport="listFilterSport"
        :listFilterBorrower="listFilterBorrower"
        :listFilterObligorRisk="listFilterObligorRisk"
        :listFilterStatus="listFilterStatus"
      ></DealsFilter>
    </div>

    <div class="tableWrap">
      <table>
        <thead>
          <tr>
            <td
              v-for="col in dealsCols"
              :key="col"
              :class="
                col === 'Amount' || col === 'Interest' ? 'align-right' : ''
              "
            >
              {{ col }}
            </td>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, key) in deals"
            :key="key"
            @click="showDealDetailView(key, row.id)"
          >
            <td
              v-for="col in dealsCols"
              :key="col"
              :class="
                col === 'Amount' || col === 'Interest' ? 'align-right' : ''
              "
            >
              <div
                v-if="col === 'Status'"
                class="status-indicator"
                :class="row.dealStatus"
              ></div>
              {{ row[col] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <BaseModal v-if="acceptDealDetailTerms" :modal-type="'accept-terms'">
      <p>If you want to see deal detail , you need to accept term below</p>

      <div class="checkbox" :class="acceptTermsError ? 'error' : ''">
        <input v-model="acceptTerms" value="1" id="check-box" type="checkbox" />
        <label for="check-box"
          >I confirm that will not contact borrower outside SportsFi Platform
          ...</label
        >
      </div>
      <div>
        <a href="#" @click.prevent="acceptDealTerms" class="button">Submit</a>
        <a href="#" @click.prevent="cancelAcceptDealTerms" class="button cancel"
          >Cancel</a
        >
      </div>
    </BaseModal>
    <BaseModal
      v-if="anonymousClick"
      :modal-type="'anonymous-click'"
      @closed="closedModalAnonymous"
    >
    </BaseModal>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
import ClickOutside from 'vue-click-outside';
import RepositoryFactory from '../../repositories/RepositoryFactory';
import DealsFilter from '@/components/Deals/DealsFilter.vue';
import BaseModal from '@/components/BaseModal';
import GetDealDetailMixin from '@/mixins/Deal/GetDealDetail.mixin';
import UserService from '@/services/user.service.js';
const DealRepository = RepositoryFactory.get('deal');
const dealsHelpers = createNamespacedHelpers('Deals');
import moment from 'moment';
import numeral from 'numeral';

export default {
  name: 'LiveDealsBoard',
  components: {
    BaseModal,
    DealsFilter,
  },
  data() {
    return {
      currencyType: '',
      listCurrencyType: ['£ GBP', '$ USD', '€ EURO'],
      acceptDealDetailTerms: false,
      anonymousClick: false,
      dealKey: '',
      acceptTermsError: false,
      acceptTerms: '',

      listFilterDealType: [],
      listFilterBorrower: [],
      listFilterObligorRisk: [],
      listFilterSport: [],
      listFilterStatus: [],
      listFilterCountry: [],
      fullDealsList: [],

      sortList: ['Ascending', 'Descending'],
      sortedKey: '',
      sortValueModel: {},
      tmpSortValueModel: {},
      titlesForSort: ['Date', 'Interest'],
      filterIconColor: '#4289DA',
      isSort: false,
      listFilteredValues: {},

      dealsCols: [
        'Date',
        'Country',
        'Deal Type',
        'Sport',
        'Borrower',
        'Obligor Risk',
        'Amount',
        'Interest',
        'Status',
      ],
    };
  },
  mixins: [GetDealDetailMixin],
  created() {
    this.getDealsDataLive();
  },
  computed: {
    ...dealsHelpers.mapGetters(['getDeals']),

    isLender() {
      return UserService.isLender();
    },
    isAdmin() {
      return UserService.isAdmin();
    },

    deals() {
      return this.fullDealsList
        .filter((list) => {
          if (
            !this.listFilteredValues ||
            !Object.keys(this.listFilteredValues).length
          ) {
            return true;
          }
          return Object.keys(this.listFilteredValues)
            .map((key) => {
              if (!this.listFilteredValues[key]) {
                return true;
              }
              return list[key] === this.listFilteredValues[key];
            })
            .every((v) => v === true);
        })
        .sort((a, b) => {
          if (
            this.sortValueModel[this.sortedKey] &&
            this.sortedKey === 'Interest'
          ) {
            return this.sortValueModel[this.sortedKey] === 'Ascending'
              ? a.interest - b.interest
              : b.interest - a.interest;
          }
          if (
            this.sortValueModel[this.sortedKey] &&
            this.sortedKey === 'Date'
          ) {
            return this.sortValueModel[this.sortedKey] === 'Ascending'
              ? a.deal_date - b.deal_date
              : b.deal_date - a.deal_date;
          }
        });
    },
  },
  methods: {
    ...dealsHelpers.mapActions(['storeDeals']),
    formatCurrency(currency) {
      switch (currency) {
        case 'USD':
          return '$';
        case 'GBP':
          return '£';
        default:
          return '€';
      }
    },
    onSelectCurrency() {
      let tmpCurrency = '';
      switch (this.currencyType) {
        case '£ GBP':
          tmpCurrency = 'GBP';
          break;
        case '$ USD':
          tmpCurrency = 'USD';
          break;
        case '€ EURO':
          tmpCurrency = 'EUR';
          break;
        default:
          tmpCurrency = 'no_select';
          break;
      }
      this.onSelectedCurrency(tmpCurrency);
    },
    onSelectedCurrency(currency) {
      if (currency === 'no_select') {
        this.getDealsDataLive();
        return;
      }
      let $this = this;
      $this.$loading(true);
      DealRepository.getLiveDealsWithCurrency('', currency)
        .then((response) => {
          $this.$loading(false);
          this.storeDeals(response.data.data);
          this.fullDealsList = this.setInitialDealsList();
          this.setAllListFilters();
        })
        .catch((error) => {
          console.error(error);
          $this.$loading(false);
        });
    },

    getDealsDataLive() {
      let $this = this;
      $this.$loading(true);
      DealRepository.getLiveDeals('')
        .then((response) => {
          $this.$loading(false);
          this.storeDeals(response.data.data);
          this.fullDealsList = this.setInitialDealsList();
          this.setAllListFilters();
        })
        .catch((error) => {
          console.error(error);
          $this.$loading(false);
        });
    },
    setInitialDealsList() {
      return this.getDeals.map((deal) => ({
        'Obligor Risk': deal.counterparty || '--',
        Borrower: deal.borrower || '--',
        Date: moment(deal.start_date).format('DD.MM.YYYY') || '--',
        'Deal Type': deal.type_label || '--',
        Status: deal.status_label || '--',
        Country: deal.country || '--',
        Sport: deal.sport || '--',
        Interest: deal.interest_rate + '%',
        Amount:
          this.formatCurrency(deal.currency) +
          numeral(deal.contract_amount).format('0,0.[00]'),
        deal_currency: this.formatCurrency(deal.currency),
        deal_amount: deal.contract_amount,
        deal_date: new Date(deal.start_date),
        interest: deal.interest_rate,
        dealStatus: deal.status,
        terms_accepted: deal.terms_accepted,
        is_matched: deal.is_matched,
        id: deal.id,
        dealDetail: deal,
      }));
    },

    setAllListFilters() {
      this.listFilterDealType = this.getListFilterByKeys('Deal Type');
      this.listFilterBorrower = this.getListFilterByKeys('Borrower');
      this.listFilterObligorRisk = this.getListFilterByKeys('Obligor Risk');
      this.listFilterCountry = this.getListFilterByKeys('Country');
      this.listFilterStatus = this.getListFilterByKeys('Status');
      this.listFilterSport = this.getListFilterByKeys('Sport');
    },

    getListFilterByKeys(key) {
      const tmpList = this.deals.map((list) => list[`${key}`]);

      return tmpList.filter((list, index) => tmpList.indexOf(list) === index);
    },

    cancelAcceptDealTerms() {
      this.acceptDealDetailTerms = false;
      this.acceptTermsError = false;
    },
    closedModalAnonymous() {
      this.anonymousClick = false;
    },
    acceptDealTerms() {
      let $this = this;
      if (this.dealKey !== '' && this.acceptTerms !== '') {
        this.acceptTermsError = false;
        $this.$loading(true);
        DealRepository.acceptLenderTerms({
          deal_id: this.deals[this.dealKey].id,
        })
          .then((response) => {
            this.deals[this.dealKey].terms_accepted = 1;
            this.$emit('showDealDetail', this.deals[this.dealKey].id);
            $this.acceptDealDetailTerms = false;
            $this.acceptTerms = '';
            $this.$loading(false);
          })
          .catch((error) => {
            $this.$loading(false);
            console.error(error);
          });
      } else {
        this.acceptTermsError = true;
      }
    },

    showDealDetailView(key, id) {
      if (
        this.deals[key].terms_accepted === 0 &&
        this.isLender &&
        this.deals[key].is_matched === true
      ) {
        this.dealKey = key;
        this.acceptDealDetailTerms = true;
      } else if (this.isLender && this.deals[key].is_matched === false) {
        this.anonymousClick = true;
        this.$emit('showDealDetail', null);
      } else {
        this.$emit('showDealDetail', id);
      }
    },
    onDealsTableSort() {
      this.isSort = !this.isSort;
    },

    onSortBy(key, sorted) {
      this.sortedKey = key;
      if (Object.keys(this.tmpSortValueModel).includes(key)) {
        if (this.tmpSortValueModel[key] === sorted) {
          this.tmpSortValueModel[key] = '';
          this.sortValueModel[key] = '';
        } else {
          this.tmpSortValueModel[key] = sorted;
        }
      } else {
        this.tmpSortValueModel[key] = sorted;
      }

      Object.keys(this.tmpSortValueModel).forEach((e) => {
        if (e !== key) {
          this.tmpSortValueModel[e] = '';
        }
      });

      this.sortValueModel = {};
      this.sortValueModel = { ...this.tmpSortValueModel };
    },
    setFilterDealsList(filteredList) {
      this.listFilteredValues = filteredList;
    },
    onHideFilter() {
      this.isSort = false;
    },
  },
  watch: {
    deals() {
      this.setAllListFilters();
    },
  },
  directives: {
    ClickOutside,
  },
};
</script>
<style lang="scss" scoped src="@/assets/styles/live-deals-board.scss"></style>
