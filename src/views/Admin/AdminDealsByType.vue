<template>
  <div class="content">
    <HeaderNavigation>Deals by Type</HeaderNavigation>
    <v-row no-gutters>
      <v-col cols="12" lg="8">
        <div class="table-content">
          <v-card class="card-content">
            <v-card-title class="deals-table-header">
              <span class="deals-table-title">All deal board</span>

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
              <AdminDealsByTypeFilters
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
                  <tr
                    v-for="(row, index) in filteredDealsList"
                    :key="index"
                    :class="{ selectedRow: isSelectedRow[`${row.id}`] }"
                    @click="selectDealBoardRow(row, row.id)"
                  >
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
      </v-col>
      <v-col cols="12" lg="4">
        <div v-if="isDealRow" class="deal-detail-container">
          <SelectedDealDetail
            :selectedDeal="selectedDeal"
            @closeDealDetail="closeDealDetail"
          /></div
      ></v-col>
    </v-row>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
import ClickOutside from 'vue-click-outside';
import HeaderNavigation from '@/components/HeaderNavigation.vue';
import SelectedDealDetail from '../../components/AdminDashboard/SelectedDealDetail.vue';
import DealRepository from '../../repositories/DealCalculator/DealRepository';
import moment from 'moment';
import numeral from 'numeral';
import AdminDealsByTypeFilters from '../../components/AdminDashboard/AdminDealsByTypeFilters/index.vue';
const dealsHelpers = createNamespacedHelpers('Deals');

export default {
  name: 'AdminDealsByType',
  components: { SelectedDealDetail, AdminDealsByTypeFilters, HeaderNavigation },

  data() {
    return {
      sortList: ['Ascending', 'Descending'],
      sortedKey: '',
      sortValueModel: {},
      tmpSortValueModel: {},
      titlesForSort: ['Date', 'Deal Value'],

      selectedDeal: {},
      isSelectedRow: {},
      filterIconColor: '#4289DA',
      typeFilter: [],
      isSort: false,
      isDealRow: false,
      tmpDealRowID: -1,
      dealsCols: [
        'Date',
        'Borrower',
        'Lender',
        'Obligor Risk',
        'Deal Type',
        'Country',
        'Deal Value',
        'Deal Status',
      ],
      fullDealsList: [],
      listFilterDealType: [],
      listFilterBorrower: [],
      listFilterLender: [],
      listFilterObligorRisk: [],
      listFilterCountry: [],
      listFilterDealStatus: [],
      listFilteredValues: {},
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
    this.getDealsDataLive();
  },
  computed: {
    ...dealsHelpers.mapGetters(['getDeals']),
    filteredDealsList() {
      this.closeDealDetail();
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
            this.sortedKey === 'Deal Value'
          ) {
            return this.sortValueModel[this.sortedKey] === 'Ascending'
              ? a.deal_amount - b.deal_amount
              : b.deal_amount - a.deal_amount;
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

    getDealDetail(deal, index) {
      DealRepository.getDealDetail(deal.id)
        .then((res) => {
          this.isDealRow = true;
          this.tmpDealRowID = index;
          this.isSelectedRow = { [`${index}`]: true };
          this.selectedDeal = { ...res.data.data, dealDetail: deal.dealDetail };
        })
        .catch((error) => {
          this.tmpDealRowID = -1;
          console.error(error);
        });
    },

    setInitialDealsList() {
      return this.getDeals.map((deal) => ({
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
    /*getListFilterByKeys(key) {
      const tmpList = this.fullDealsList
        .filter(
          (list) => list[`${key}`] && list[`${key}`] !== '--' && list[`${key}`]
        )
        .map((list) => list[`${key}`]);

      return tmpList.filter((list, index) => tmpList.indexOf(list) === index);
    },*/
    getListFilterByKeys(key) {
      const tmpList = this.filteredDealsList.map((list) => list[`${key}`]);

      return tmpList.filter((list, index) => tmpList.indexOf(list) === index);
    },
    onDealsTableSort() {
      this.isSort = !this.isSort;
    },
    selectDealBoardRow(deal, index) {
      this.isSelectedRow = {};
      this.isDealRow = false;
      if (this.tmpDealRowID !== index) {
        this.getDealDetail(deal, index);
      } else {
        this.tmpDealRowID = -1;
      }
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
    closeDealDetail() {
      this.isDealRow = false;
      this.tmpDealRowID = -1;
      this.isSelectedRow = {};
    },
    onHideFilter() {
      this.isSort = false;
    },
  },
  watch: {
    filteredDealsList() {
      this.setAllListFilters();
    },
  },
  directives: {
    ClickOutside,
  },
};
</script>

<style lang="scss" scoped src="@/assets/styles/admin/deals-by.scss"></style>
<style
  lang="scss"
  scoped
  src="@/assets/styles/admin/default-table.scss"
></style>
