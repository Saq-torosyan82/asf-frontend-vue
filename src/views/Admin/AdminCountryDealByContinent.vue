<template>
  <div class="content">
    <HeaderNavigation>Deals by Country - {{ continentKey }}</HeaderNavigation>

    <div class="table-content">
      <v-card class="card-content">
        <v-card-title class="deals-table-header">
          <!-- <span class="deals-table-title"
            >{{ continentList[continentKey] }}&nbsp;Country Deals:&nbsp;{{
              filteredDealsList.length
            }}
          </span> -->

          <v-spacer></v-spacer>
          <div class="deals-table-filter" v-click-outside="onHideFilter">
            <img
              src="@/assets/img/table-data-filter-icon.png"
              c
              lass="sort-icon"
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
        </v-card-title>

        <div class="deals-table-body">
          <ContinentCountryDealFilter
            @setFilterDealsList="setFilterDealsList"
            :listFilterDealType="listFilterDealType"
            :listFilterBorrower="listFilterBorrower"
            :listFilterLender="listFilterLender"
            :listFilterObligorRisk="listFilterObligorRisk"
            :listFilterCountry="listFilterCountry"
            :listFilterDealStatus="listFilterDealStatus"
            class="filter-wrapper"
          />
          <table>
            <thead class="thead-scroll-width">
              <tr>
                <td v-for="col in dealsCols" :key="col">
                  <span>{{ col }}</span>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in filteredDealsList" :key="index">
                <td v-for="col in dealsCols" :key="col">
                  <div class="td-status" v-if="col === 'Deal Status'">
                    <div
                      class="icon-bg"
                      :style="{
                        backgroundColor: statusDotColorList[row[col]],
                      }"
                    ></div>
                    {{ row[col] }}
                  </div>
                  <div v-else>{{ row[col] }}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </v-card>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
import ClickOutside from 'vue-click-outside';
import DealRepository from '../../repositories/DealCalculator/DealRepository';
import HeaderNavigation from '@/components/HeaderNavigation.vue';
import ContinentCountryDealFilter from '@/components/AdminDashboard/AdminCountryDealByContinent/Filter.vue';
import moment from 'moment';
import numeral from 'numeral';
const countryByContinentHelpers = createNamespacedHelpers('countryByContinent');
const dealsHelpers = createNamespacedHelpers('Deals');
export default {
  name: 'AdminCountryDealByContinent',
  components: {
    HeaderNavigation,
    ContinentCountryDealFilter,
  },
  data() {
    return {
      continentKey: '',
      continentList: {
        Europe: 'European',
        Asia: 'Asian',
        Africa: 'African',
        'North America': 'North American',
        'South America': 'South American',
        Oceania: 'Ocean',
      },
      isSort: false,
      sortList: ['Ascending', 'Descending'],
      sortedKey: '',
      titlesForSort: ['Date'],
      sortValueModel: {},
      tmpSortValueModel: {},
      filterIconColor: '#4289DA',

      listFilterDealType: [],
      listFilterBorrower: [],
      listFilterLender: [],
      listFilterObligorRisk: [],
      listFilterCountry: [],
      listFilterDealStatus: [],
      listFilteredValues: {},

      dealsCols: [
        'Country',
        'Date',
        'Borrower',
        'Lender',
        'Obligor Risk',
        'Deal Type',
        'Deal Value',
        'Deal Status',
      ],
      statusDotColorList: {
        Completed: '#76e150',
        'In progress': '#b6c3d1',
        'Not started': '#ffb95a',
        Live: '#4289da',
        Started: '#76e150',
        Closed: 'f61c0d',
      },
    };
  },
  created() {
    this.setCountryByContinent();
  },
  computed: {
    ...countryByContinentHelpers.mapGetters(['countryByContinent']),
    ...dealsHelpers.mapGetters(['getDeals']),
    filteredDealsList() {
      return this.setInitialDealsList()
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
    ...countryByContinentHelpers.mapActions(['getCountryByContinent']),
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
    setCountryByContinent() {
      this.continentKey = Object.keys(this.$route.query)[0];
      this.getCountryByContinent(this.continentKey);
      this.getDealsDataLive();
    },
    getDealsDataLive() {
      let $this = this;
      $this.$loading(true);
      DealRepository.getLiveDeals('')
        .then((response) => {
          $this.$loading(false);
          this.storeDeals(response.data.data);
          this.setInitialDealsList();
          this.setAllListFilters();
        })
        .catch((error) => {
          console.error(error);
          $this.$loading(false);
        });
    },
    setInitialDealsList() {
      return this.getDeals
        .filter((e) => this.countryByContinent.includes(e.country))
        .sort((a, b) =>
          a.country.toUpperCase().localeCompare(b.country.toUpperCase())
        )
        .map((deal) => ({
          'Obligor Risk': deal.counterparty || '--',
          Borrower: deal.borrower || '--',
          Lender: deal.lender || '--',
          Date: moment(deal.start_date).format('DD.MM.YYYY') || '--',
          'Deal Type': deal.type_label || '--',
          'Deal Status': deal.status_label || '--',
          Country: deal.country || '--',
          'Deal Value':
            this.formatCurrency(deal.currency) +
            numeral(deal.contract_amount).format('0,0.[00]'),
          deal_currency: this.formatCurrency(deal.currency),
          deal_amount: deal.contract_amount,
          deal_date: new Date(deal.start_date),
          id: deal.id,
          dealDetail: deal,
        }));
    },
    setAllListFilters() {
      this.listFilterDealType = this.getListFilterByKeys('Deal Type');
      this.listFilterBorrower = this.getListFilterByKeys('Borrower');
      this.listFilterLender = this.getListFilterByKeys('Lender');
      this.listFilterObligorRisk = this.getListFilterByKeys('Obligor Risk');
      this.listFilterCountry = this.getListFilterByKeys('Country');
      this.listFilterDealStatus = this.getListFilterByKeys('Deal Status');
    },
    getListFilterByKeys(key) {
      const tmpList = this.setInitialDealsList()
        .filter(
          (list) => list[`${key}`] && list[`${key}`] !== '--' && list[`${key}`]
        )
        .map((list) => list[`${key}`]);

      return tmpList.filter((list, index) => tmpList.indexOf(list) === index);
    },
    setFilterDealsList(filteredList) {
      this.listFilteredValues = filteredList;
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
    onHideFilter() {
      this.isSort = false;
    },
  },
  directives: {
    ClickOutside,
  },
};
</script>
<style
  lang="scss"
  scoped
  src="@/assets/styles/admin/admin-country-deal-by-continent.scss"
></style>
<style
  lang="scss"
  scoped
  src="@/assets/styles/admin/default-table.scss"
></style>

<style lang="scss" scoped>
.filter-content {
  margin-top: 0px;
  padding: 10px;
  ::v-deep {
    .filter-input-content {
      display: inline-flex !important;
      gap: 10px;
    }
    .filter-section {
      margin-left: 0;
    }
  }
}
</style>
