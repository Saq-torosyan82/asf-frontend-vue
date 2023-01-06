<template>
  <div class="content">
    <HeaderNavigation>Borrowers</HeaderNavigation>
    <TitleAndCurrency title="" @selectedCurrency="onSelectedCurrency" />

    <v-row row-gap="20" gap="20">
      <v-col cols="12" lg="8" class="pt-0">
        <div class="table-content">
          <v-card class="card-content">
            <v-card-title class="table-header">
              <v-spacer></v-spacer>
              <div class="table-filter" v-click-outside="onHideFilter">
                <img
                  src="@/assets/img/table-data-filter-icon.png"
                  class="sort-icon"
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
              <BorrowersFilter
                @setFilterList="setFilterList"
                :listFilterType="listFilterType"
                :listFilterCountry="listFilterCountry"
                class="filter-wrapper"
              />
              <table>
                <thead class="thead-scroll-width">
                  <tr>
                    <td v-for="col in borrowersTableCols" :key="col">
                      <span>{{ col }}</span>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(row, index) in filteredBorrowerList"
                    :key="index"
                    :class="{ selectedRow: isSelectedRow[`${row.id}`] }"
                    @click="selectRow(row, row.id)"
                  >
                    <td v-for="col in borrowersTableCols" :key="col">
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
            :dealListByTap="borrowerDealListByTap"
            :selectedDeal="selectedDeal"
            :isDealDetail="isDealDetail"
            :showMessage="showMessage"
            @selectedDealDetail="selectedDealDetail"
            @closeDealDetail="closeDealDetail"
            @onSelectTab="onSelectTab"
          />
        </div>
        <div class="table-top-content">
          <div class="table-ribbon">
            <p>Top {{ topBorrowerList.length }} borrowers</p>
          </div>
          <table>
            <thead>
              <tr>
                <td></td>
                <td v-for="col in borrowersTableCols" :key="col">
                  <span>{{ col }}</span>
                </td>
              </tr>
            </thead>
            <tbody>
              <p v-if="topBorrowerList.length == 0" class="no-data">
                There are no borrowers.
              </p>
              <tr
                v-for="(row, index) in topBorrowerList"
                :key="index"
                :class="{ selectedRow: isSelectedRow[`${row.id}`] }"
                @click="selectRow(row, row.id)"
              >
                <td>{{ index + 1 }}</td>
                <td v-for="col in borrowersTableCols" :key="col">
                  {{ row[col] }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </v-col>
      <v-col cols="12" lg="4" class="pa-0">
        <div class="dp-deal-detail">
          <DealSectionByBorrowerAndLender
            :isSelectedTab="isSelectedTab"
            :dealListByTap="borrowerDealListByTap"
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
import BorrowersFilter from '@/components/AdminDashboard/AdminBorrowers/BorrowersFilter.vue';
import DealRepository from '../../repositories/DealCalculator/DealRepository';
import DealSectionByBorrowerAndLender from '@/components/AdminDashboard/DealSectionByBorrowerAndLender.vue';
import moment from 'moment';
import numeral from 'numeral';
const dealsHelpers = createNamespacedHelpers('Deals');
export default {
  name: 'AdminBorrowers',
  components: {
    HeaderNavigation,
    TitleAndCurrency,
    BorrowersFilter,
    DealSectionByBorrowerAndLender,
  },
  data() {
    return {
      //Filter
      listFilterType: [],
      listFilterCountry: [],
      // listFilterSubtype: [],
      listFilteredValues: {},

      //Sort
      isSort: false,
      sortList: ['Ascending', 'Descending'],
      sortValueModel: {},
      tmpSortValueModel: {},
      titlesForSort: ['No.Deals', 'Deals Value', 'Outstanding'],
      filterIconColor: '#4289DA',
      sortedKey: '',

      //Table
      isSelectedRow: {},
      tmpRowID: -1,
      fullBorrowersList: [],
      topBorrowerList: [],
      borrowersTableCols: [
        'Name',
        'Type',
        // 'Subtype',
        'Country',
        'No.Deals',
        'Deals Value',
        'Outstanding',
      ],

      //Borrower Deal Detail
      dealListByBorrower: [],
      isSelectedTab: 0,
      isDealDetail: false,
      borrowerDealListByTap: [],
      selectedDeal: {},
      showMessage: true
    };
  },
  created() {
    this.getDealsDataLive();
  },
  computed: {
    ...dealsHelpers.mapGetters(['getDeals']),
    filteredBorrowerList() {
      this.onCloseDealCardList();
      return this.fullBorrowersList
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
      DealRepository.adminDealBorrowers()
        .then((response) => {
          $this.$loading(false);
          this.storeDeals(response.data);
          this.fullBorrowersList = this.setInitialDealsList();
          this.getTopBorrowers();
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
        // Subtype: '--',
        Country: deal.country || '--',
        'No.Deals': numeral(deal.started_deals).value(),
        'Deals Value':
          this.formatCurrency(deal.currency) +
          numeral(deal.contract_amount).format('0,0.[00]'),
        Outstanding:
          this.formatCurrency(deal.currency) +
          numeral(deal.outstanding).format('0,0.[00]'),
        deal_currency: this.formatCurrency(deal.currency),
        deal_amount: numeral(deal.contract_amount).value(),
        deal_outstanding: numeral(deal.outstanding).value(),
        id: deal.id,
        deals_id: deal.deals,
        dealDetail: deal,
      }));
    },
    getTopBorrowers() {
      let tmpName = '';
      let tmpNameArray = [];
      let tmpArray = [];
      const tmpFullBorrowersList = [...this.fullBorrowersList];
      tmpFullBorrowersList
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

      this.topBorrowerList = tmpArray
        .slice(0, 5)
        .filter((e) => e.deal_amount !== 0);
    },
    setAllListFilters() {
      this.listFilterType = this.getListFilterByKeys('Type');
      this.listFilterCountry = this.getListFilterByKeys('Country');
      // this.listFilterSubtype = this.getListFilterByKeys('Subtype');
    },
    getListFilterByKeys(key) {
      const tmpList = this.filteredBorrowerList.map((list) => list[`${key}`]);

      return tmpList.filter((list, index) => tmpList.indexOf(list) === index);
    },
    setFilterList(filteredList) {
      this.listFilteredValues = filteredList;
    },
    selectRow(deal, index) {
      this.setSomeInitialDealList();
      if (this.tmpRowID != index) {
        this.getDealListByBorrower(deal);
        this.tmpRowID = index;
        this.isSelectedRow = { [`${index}`]: true };
      } else {
        this.tmpRowID = -1;
      }
    },
    getDealListByBorrower(deal) {
      this.dealListByBorrower = this.filteredBorrowerList.filter(
        (list) => list.Name === deal.Name
      );

      // First, Deal List By Tab
      // this.isSelectedTab
      this.borrowerDealListByTap = this.dealListByBorrower[0].deals_id.filter((deal) => {
        return deal.is_past === false
      });
      let pastDeals = this.dealListByBorrower[0].deals_id.filter((deal) => {
        return deal.is_past === true
      });
      this.showMessage = pastDeals.length <= 0
    },
    onSelectTab(str, index, tabTitles) {
      this.isSelectedTab = index;
      this.getBorrowerDealListByTab(str, tabTitles);
    },
    getBorrowerDealListByTab(str, tabTitles) {
      // List will be filtered by Tab.
      // this.isSelectedTab
      // this.dealListByBorrower;
      // this.borrowerDealListByTap = this.dealListByBorrower;
      if (str === tabTitles[1]) {
        this.borrowerDealListByTap = this.dealListByBorrower[0].deals_id.filter((deal) => {
          return deal.is_past === true
        })
        this.showMessage = false
      } else {
        this.borrowerDealListByTap = this.dealListByBorrower[0].deals_id.filter((deal) => {
          return deal.is_past === false
        })
        this.showMessage = this.borrowerDealListByTap <= 0
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
      this.borrowerDealListByTap = [];
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
      DealRepository.adminDealBorrowersWithCurrency(currency)
        .then((response) => {
          $this.$loading(false);
          this.storeDeals(response.data);
          this.fullBorrowersList = this.setInitialDealsList();
          this.getTopBorrowers();
          this.setAllListFilters();
        })
        .catch((error) => {
          console.error(error);
          $this.$loading(false);
        });
    },
  },
  watch: {
    filteredBorrowerList() {
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
