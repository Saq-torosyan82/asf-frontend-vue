<template>
  <div class="content">
    <HeaderNavigation>Lenders</HeaderNavigation>
    <TitleAndCurrency title="" @selectedCurrency="onSelectedCurrency" />

    <v-row>
      <v-col cols="12" lg="8">
        <div class="table-content">
          <v-card class="card-content">
            <v-card-title class="table-header">
              <v-spacer></v-spacer>
              <div class="table-filter" v-click-outside="onHideFilter">
                <img
                  src="@/assets/img/table-data-filter-icon.png"
                  c
                  lass="sort-icon"
                  @click="onTableSort"
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

            <div class="table-body">
              <LendersFilter
                @setFilterList="setFilterList"
                :listFilterType="listFilterType"
                :listFilterCountry="listFilterCountry"
                class="filter-wrapper"
              />
              <table>
                <thead class="thead-scroll-width">
                  <tr>
                    <td v-for="col in lendersTableCols" :key="col">
                      <span>{{ col }}</span>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(row, index) in filteredLendersList"
                    :key="index"
                    :class="{ selectedRow: isSelectedRow[`${row.id}`] }"
                    @click="selectRow(row, row.id)"
                  >
                    <td v-for="col in lendersTableCols" :key="col">
                      {{ row[col] }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </v-card>
        </div>
        <div class="md-deal-detail">
          <DealSectionByBorrowerAndLender
            :isSelectedTab="isSelectedTab"
            :dealListByTap="lenderDealListByTap"
            :selectedDeal="selectedDeal"
            :isDealDetail="isDealDetail"
            @selectedDealDetail="selectedDealDetail"
            @closeDealDetail="closeDealDetail"
            @onSelectTab="onSelectTab"
          />
        </div>
        <div class="table-top-content">
          <div class="table-ribbon">
            <p>Top {{ topLendersList.length }} lenders</p>
          </div>

          <table>
            <thead>
              <tr>
                <td></td>
                <td v-for="col in lendersTableCols" :key="col">
                  <span>{{ col }}</span>
                </td>
              </tr>
            </thead>

            <tbody>
              <p v-if="topLendersList.length == 0" class="no-data">
                There are no lenders
              </p>
              <tr
                v-for="(row, index) in topLendersList"
                :key="index"
                :class="{ selectedRow: isSelectedRow[`${row.id}`] }"
                @click="selectRow(row, row.id)"
              >
                <td>{{ index + 1 }}</td>
                <td v-for="col in lendersTableCols" :key="col">
                  {{ row[col] }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </v-col>
      <v-col cols="12" lg="4">
        <div class="dp-deal-detail">
          <DealSectionByBorrowerAndLender
            :isSelectedTab="isSelectedTab"
            :dealListByTap="lenderDealListByTap"
            :selectedDeal="selectedDeal"
            :isDealDetail="isDealDetail"
            @selectedDealDetail="selectedDealDetail"
            @closeDealDetail="closeDealDetail"
            @onSelectTab="onSelectTab"
            :showMessage="showMessage"
          />
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
import ClickOutside from 'vue-click-outside';
import HeaderNavigation from '@/components/HeaderNavigation.vue';
import TitleAndCurrency from '@/components/AdminTitleAndCurrency/AdminTitleAndCurrency.vue';
import LendersFilter from '@/components/AdminDashboard/AdminLenders/LendersFilter.vue';
import DealRepository from '../../repositories/DealCalculator/DealRepository';
import DealSectionByBorrowerAndLender from '@/components/AdminDashboard/DealSectionByBorrowerAndLender.vue';
import moment from 'moment';
import numeral from 'numeral';
const dealsHelpers = createNamespacedHelpers('Deals');
export default {
  name: 'AdminLenders',
  components: {
    HeaderNavigation,
    TitleAndCurrency,
    LendersFilter,
    DealSectionByBorrowerAndLender,
  },
  data() {
    return {
      listFilterType: [],
      listFilterCountry: [],
      listFilteredValues: {},

      isSort: false,
      sortList: ['Ascending', 'Descending'],
      sortValueModel: {},
      tmpSortValueModel: {},
      titlesForSort: ['No.Deals', 'Deals Value', 'Outstanding'],
      filterIconColor: '#4289DA',
      sortedKey: '',

      isSelectedRow: {},
      tmpRowID: -1,
      fullLendersList: [],
      topLendersList: [],
      lendersTableCols: [
        'Name',
        'Type',
        'Country',
        'No.Deals',
        'No.Term Issued',
        'Success Rate',
        'Deals Value',
        'Outstanding',
      ],

      dealListByLender: [],
      isSelectedTab: 0,
      isDealDetail: false,
      lenderDealListByTap: [],
      selectedDeal: {},
      showMessage: true
    };
  },
  created() {
    this.getDealsDataLive();
  },
  computed: {
    ...dealsHelpers.mapGetters(['getDeals']),
    filteredLendersList() {
      this.onCloseDealCardList();
      return this.fullLendersList
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
            this.sortedKey === 'Deals Value'
          ) {
            return this.sortValueModel[this.sortedKey] === 'Ascending'
              ? a.deal_amount - b.deal_amount
              : b.deal_amount - a.deal_amount;
          }
          if (
            this.sortValueModel[this.sortedKey] &&
            this.sortedKey === 'No.Deals'
          ) {
            return this.sortValueModel[this.sortedKey] === 'Ascending'
              ? a['No.Deals'] - b['No.Deals']
              : b['No.Deals'] - a['No.Deals'];
          }
          if (
            this.sortValueModel[this.sortedKey] &&
            this.sortedKey === 'Outstanding'
          ) {
            return this.sortValueModel[this.sortedKey] === 'Ascending'
              ? a.deal_outstanding - b.deal_outstanding
              : b.deal_outstanding - a.deal_outstanding;
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
    getDealsDataLive() {
      let $this = this;
      $this.$loading(true);
      DealRepository.adminDealLenders()
        .then((response) => {
          $this.$loading(false);
          this.storeDeals(response.data);
          this.fullLendersList = this.setInitialDealsList();
          this.getTopLenders();
          this.setAllListFilters();
        })
        .catch((error) => {
          console.error(error);
          $this.$loading(false);
        });
    },
    setInitialDealsList() {
      return this.getDeals.map((deal) => ({
        Name: deal.name || '--',
        Type: deal.type || '--',
        Country: deal.country || '--',
        'No.Deals': numeral(deal.started_deals).value(),
        'Success Rate': numeral(deal.success_rate).format('0,0.[00]'),
        'Deals Value':
          this.formatCurrency(deal.currency) +
          numeral(deal.amount).format('0,0.[00]'),
        'No.Term Issued': deal.terms_accepted,
        Outstanding:
          this.formatCurrency(deal.currency) +
          numeral(deal.outstanding).format('0,0.[00]'),
        deal_currency: this.formatCurrency(deal.currency),
        deal_amount: numeral(deal.amount).value(),
        deal_outstanding: numeral(deal.outstanding).value(),
        id: deal.id,
        deals_id: deal.deals,
        dealDetail: deal,
      }));
    },
    getTopLenders() {
      let tmpName = '';
      let tmpNameArray = [];
      let tmpArray = [];
      const tmpFullLendersList = [...this.fullLendersList];
      tmpFullLendersList
        .sort((a, b) => {
          return b.deal_amount - a.deal_amount;
        })
        .forEach((e) => {
          if (e.Name !== tmpName && !tmpNameArray.includes(e.Name)) {
            tmpName = e.Name;
            tmpNameArray = [...tmpNameArray, e.Name];
            tmpArray = [...tmpArray, e];
          }
        });
      this.topLendersList = tmpArray
        .slice(0, 5)
        .filter((e) => e.deal_amount !== 0);
    },
    setAllListFilters() {
      this.listFilterType = this.getListFilterByKeys('Type');
      this.listFilterCountry = this.getListFilterByKeys('Country');
    },
    getListFilterByKeys(key) {
      const tmpList = this.filteredLendersList.map((list) => list[`${key}`]);

      return tmpList.filter((list, index) => tmpList.indexOf(list) === index);
    },
    setFilterList(filteredList) {
      this.listFilteredValues = filteredList;
    },
    selectRow(deal, index) {
      this.setSomeInitialDealList();
      if (this.tmpRowID != index) {
        this.getDealListByLender(deal);
        this.tmpRowID = index;
        this.isSelectedRow = { [`${index}`]: true };
      } else {
        this.tmpRowID = -1;
      }
    },
    getDealListByLender(deal) {
      this.dealListByLender = this.filteredLendersList.filter(
        (list) => list.Name === deal.Name
      );

      // First, Deal List By Tab
      // this.isSelectedTab
      this.lenderDealListByTap = this.dealListByLender[0].deals_id.filter((deal) => {
        return deal.is_past === false
      });
      let pastDeals = this.dealListByLender[0].deals_id.filter((deal) => {
        return deal.is_past === true
      });
      this.showMessage = pastDeals.length <= 0
      // this.lenderDealListByTap = this.dealListByLender;
    },
    onSelectTab(str, index, tabTitles) {
      this.isSelectedTab = index;
      this.getLenderDealListByTab(str, tabTitles);
    },
    getLenderDealListByTab(str, tabTitles) {
      // List will be filtered by Tab.
      // this.isSelectedTab
      // this.dealListByLender;
      // this.lenderDealListByTap = this.dealListByLender;
      if (str === tabTitles[1]) {
        this.lenderDealListByTap = this.dealListByLender[0].deals_id.filter((deal) => {
          return deal.is_past === true
        })
        this.showMessage = false
      } else {
        this.lenderDealListByTap = this.dealListByLender[0].deals_id.filter((deal) => {
          return deal.is_past === false
        })
        this.showMessage = this.lenderDealListByTap <= 0
      }
    },
    selectedDealDetail(data) {
      this.getDealDetail(data);
    },
    getDealDetail(data) {
      let $this = this;
      $this.$loading(true);
      DealRepository.getDealDetail(data.deal_id)
        .then((res) => {
          $this.$loading(false);
          this.isDealDetail = true;
          this.selectedDeal = { ...res.data.data, dealDetail: data };
        })
        .catch((error) => {
          console.error(error);
          $this.$loading(false);
        });
    },

    onCloseDealCardList() {
      this.setSomeInitialDealList();
      this.tmpRowID = -1;
    },
    closeDealDetail() {
      this.isDealDetail = false;
    },
    setSomeInitialDealList() {
      this.isSelectedRow = {};
      this.isSelectedTab = 0;
      this.isDealDetail = false;
      this.lenderDealListByTap = [];
    },
    onHideFilter() {
      this.isSort = false;
    },
    onTableSort() {
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
    onSelectedCurrency(currency) {
      if (currency === 'no_select') {
        this.getDealsDataLive();
        return;
      }
      let $this = this;
      $this.$loading(true);
      DealRepository.adminDealLendersWithCurrency(currency)
        .then((response) => {
          $this.$loading(false);
          this.storeDeals(response.data);
          this.fullLendersList = this.setInitialDealsList();
          this.getTopLenders();
          this.setAllListFilters();
        })
        .catch((error) => {
          console.error(error);
          $this.$loading(false);
        });
    },
  },
  watch: {
    filteredLendersList() {
      this.setAllListFilters();
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
  src="@/assets/styles/admin/admin-lenders-borrowers.scss"
></style>
<style
  lang="scss"
  scoped
  src="@/assets/styles/admin/default-table.scss"
></style>
