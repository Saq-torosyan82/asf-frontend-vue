<template>
  <div class="content">
    <HeaderNavigation>Total Deal Overview</HeaderNavigation>
    <TitleAndCurrency title="" @selectedCurrency="onSelectedCurrency" />
    <v-row no-gutters>
      <v-col cols="12" lg="8">
        <div class="table-content">
          <v-card class="card-content">
            <v-card-title class="deals-table-header">
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
              <AdminTotalDealOverviewFilters
                @setFilterDealsList="setFilterDealsList"
                :listFilterDealType="listFilterDealType"
                :listFilterBorrower="listFilterBorrower"
                :listFilterLender="listFilterLender"
                :listFilterCounterparty="listFilterCounterparty"
                :listFilterStatus="listFilterStatus"
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
                    v-for="(row, index) in dealsRow"
                    :key="index"
                    :class="{ selectedRow: isSelectedRow[`${row.id}`] }"
                    @click="selectDealBoardRow(row, row.id)"
                  >
                    <td v-for="col in dealsCols" :key="col">
                      <div class="td-status" v-if="col === 'Status'">
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
              <div class="table-footer">
                <span>TOTAL</span>
                <span
                  >{{ formatCurrency(currencyType)
                  }}{{ totalDealAmount | numFormat('0,0.[00]') }}</span
                >
              </div>
            </div>
          </v-card>
        </div>
        <div v-if="isDealRow" class="md-deal-detail-container">
          <SelectedTotalDealsDetail
            :selectedDeal="selectedDeal"
            @closeDealDetail="closeDealDetail"
          />
        </div>
        <div class="chart-container">
          <AdminTotalDealOverviewPieChart
            v-if="isChart"
            :ChartData="statusChartData"
            :totalAmount="totalDealAmount"
            :currency="formatCurrency(currencyType)"
          />
          <AdminTotalDealOverviewPieChart
            v-if="isChart"
            :ChartData="yearChartData"
            :totalAmount="totalDealAmount"
            :currency="formatCurrency(currencyType)"
          />
        </div>
      </v-col>
      <v-col cols="12" lg="4" class="pa-0">
        <div v-if="isDealRow" class="deal-detail-container">
          <SelectedTotalDealsDetail
            :selectedDeal="selectedDeal"
            @closeDealDetail="closeDealDetail"
          />
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
import ClickOutside from 'vue-click-outside';
import DealRepository from '@/repositories/DealCalculator/DealRepository';
import HeaderNavigation from '@/components/HeaderNavigation.vue';
import TitleAndCurrency from '@/components/AdminTitleAndCurrency/AdminTitleAndCurrency.vue';
import moment from 'moment';
import numeral from 'numeral';
import AdminTotalDealOverviewPieChart from '@/components/AdminDashboard/AdminTotalDealOverviewPieChart.vue';
import SelectedTotalDealsDetail from '@/components/AdminDashboard/AdminTotalDealOverview/SelectedTotalDealsDetail.vue';
import AdminTotalDealOverviewFilters from '@/components/AdminDashboard/AdminTotalDealOverview/AdminTotalDealOverviewFilters.vue';
const dealsHelpers = createNamespacedHelpers('Deals');
export default {
  name: 'AdminTotalDealOverview',
  components: {
    AdminTotalDealOverviewPieChart,
    SelectedTotalDealsDetail,
    HeaderNavigation,
    TitleAndCurrency,
    AdminTotalDealOverviewFilters,
  },
  data() {
    return {
      isSort: false,
      sortList: ['Ascending', 'Descending'],
      sortedKey: '',
      sortValueModel: {},
      tmpSortValueModel: {},
      titlesForSort: ['Date', 'Deal Value'],
      filterIconColor: '#4289DA',

      fullDealsList: [],

      listFilterDealType: [],
      listFilterBorrower: [],
      listFilterLender: [],
      listFilterCounterparty: [],
      listFilterStatus: [],
      listFilteredValues: {},

      currencyType: 'GBP',
      listCurrencyType: ['£ GBP', '$ USD', '€ EURO'],
      isChart: false,
      dealsCols: [
        'Date',
        'Deal Type',
        'Borrower',
        'Lender',
        'Counterparty',
        'Deal Value',
        'Status',
      ],
      isSelectedRow: {},
      isDealRow: false,
      tmpDealRowID: -1,
      statusChartData: {},
      yearChartData: {},
      selectedDeal: {},
      colorList: ['#76E150', '#4FC1E0', '#FFE15A'],
      statusDotColorList: {
        Completed: '#76e150',
        'In progress': '#b6c3d1',
        'Not started': '#ffb95a',
        Live: '#4289da',
        Started: '#76e150',
        Closed: 'f61c0d',
      },
      totalDealAmount: 0,
    };
  },
  created() {
    this.getDealsDataLive();
  },
  computed: {
    ...dealsHelpers.mapGetters(['getDeals']),
    dealsRow() {
      this.closeDealDetail();
      const tmp = [
        ...this.fullDealsList
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
          }),
      ];
      this.getChartData(tmp);
      return tmp;
    },
  },
  methods: {
    ...dealsHelpers.mapActions(['storeDeals']),

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
    setInitialDealsList() {
      return this.getDeals.map((deal) => ({
        Counterparty: deal.counterparty || '--',
        Borrower: deal.borrower || '--',
        Lender: deal.lender || '--',
        Date: moment(deal.start_date).format('DD.MM.YYYY') || '--',
        'Deal Type': deal.type_label || '--',
        Status: deal.status_label || '--',
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
    selectDealBoardRow(deal, index) {
      this.isSelectedRow = {};
      this.isDealRow = false;
      if (this.tmpDealRowID !== index) {
        this.getDealDetail(deal, index);
      } else {
        this.tmpDealRowID = -1;
      }
    },
    getChartData(dataList) {
      this.isChart = false;
      this.totalDealAmount = 0;
      let completed = 0;
      let inprogress = 0;
      let notStarted = 0;
      let yearValues = {};
      let tmpData = [...dataList.map((e) => e.dealDetail)];

      for (let { status_label, contract_amount, start_date } of tmpData) {
        if (status_label === 'Completed') {
          completed += contract_amount;
        } else if (status_label === 'In progress') {
          inprogress += contract_amount;
        } else {
          notStarted += contract_amount;
        }
        let itemData = new Date(start_date);
        let itemYear = itemData.getFullYear();
        let tmpYearValue = yearValues[itemYear] ? yearValues[itemYear] : 0;
        let tmpAmount = tmpYearValue + contract_amount;
        yearValues = { ...yearValues, [itemYear]: tmpAmount };
        this.totalDealAmount += contract_amount;
      }
      const yearValuesKeys = Object.keys(yearValues);
      let data = {
        labels: [],
        datasets: [
          {
            borderWidth: 0,
            backgroundColor: [],
            data: [],
          },
        ],
      };
      for (let index = 0; index < 3; index++) {
        const key = yearValuesKeys[index];
        if (!key) {
          data.labels.push(parseInt(yearValuesKeys[index - 1]) + 1);
          data.datasets[0].data.push(0);
        } else {
          data.labels.push(key);
          data.datasets[0].data.push(yearValues[key]);
        }
      }

      data.datasets[0].backgroundColor = this.colorList;
      this.yearChartData = { ...data };

      this.statusChartData = {
        labels: ['Completed', 'Under review', 'In progress'],
        datasets: [
          {
            backgroundColor: this.colorList,
            data: [completed, inprogress, notStarted],
          },
        ],
      };
      this.setShowChart();
    },
    setShowChart() {
      setTimeout(() => {
        this.isChart = true;
      }, 50);
    },
    setAllListFilters() {
      this.listFilterDealType = this.getListFilterByKeys('Deal Type');
      this.listFilterBorrower = this.getListFilterByKeys('Borrower');
      this.listFilterLender = this.getListFilterByKeys('Lender');
      this.listFilterCounterparty = this.getListFilterByKeys('Counterparty');
      this.listFilterStatus = this.getListFilterByKeys('Status');
    },
    getListFilterByKeys(key) {
      const tmpList = this.dealsRow.map((list) => list[`${key}`]);

      return tmpList.filter((list, index) => tmpList.indexOf(list) === index);
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
    closeDealDetail() {
      this.isDealRow = false;
      this.tmpDealRowID = -1;
      this.isSelectedRow = {};
    },
    onHideFilter() {
      this.isSort = false;
    },
    onSelectedCurrency(currency) {
      if (currency === 'no_select') {
        this.getDealsDataLive();
        return;
      }
      this.currencyType = currency;
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
  },
  watch: {
    dealsRow() {
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
  src="@/assets/styles/admin/admin-total-deal-overview.scss"
></style>
<style
  lang="scss"
  scoped
  src="@/assets/styles/admin/default-table.scss"
></style>
<style lang="scss" scoped>
.content .table-content {
  margin-top: 0px;
}
</style>
