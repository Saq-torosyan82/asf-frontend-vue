<template>
  <div class="content">
    <HeaderNavigation>Total Deal Payments</HeaderNavigation>
    <TitleAndCurrency title="" @selectedCurrency="onSelectedCurrency" />
    <div class="overdue-content">
      <div class="table-overdue-content">
        <v-card class="card-content">
          <v-card-title class="overdue-table-header">
            <span class="txt-title">Overdue</span>
          </v-card-title>
          <div class="overdue-table-body">
            <OverdueTable :cols="overdueTableCols" :rows="overdueDealList" />
          </div>
        </v-card>
      </div>
      <div class="chart-section">
        <PaymentPieChart
          v-if="isChart"
          :chartData="chartData"
          :totalValue="filter_totalValue"
          :currencyType="formatCurrency(currencyType)"
        />
      </div>
    </div>

    <div class="data-filter-reset-section">
      <DateFilter @setFilterDealsList="setFilterDealsList" />
      <button @click="onResetFilter">Reset</button>
    </div>

    <div class="table-payment-content">
      <v-card class="card-content">
        <v-card-title class="payments-table-header"></v-card-title>
        <div class="payments-table-body">
          <PaymentsTableFilters
            :reset="reset"
            :listFilterBorrower="listFilterBorrower"
            :listFilterBorrowerType="listFilterBorrowerType"
            :listFilterLender="listFilterLender"
            :listFilterLenderType="listFilterLenderType"
            @setFilterDealsList="setFilterDealsList"
          />
          <PaymentsTable :cols="paymentsTableCols" :rows="filteredDealList" />
          <!-- <div class="table-footer">
            <span>TOTAL</span>
            <span>&#163;{{ totalDealAmount | numFormat('0,0.[00]') }}</span>
          </div> -->
        </div>
      </v-card>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';
import HeaderNavigation from '@/components/HeaderNavigation.vue';
import TitleAndCurrency from '@/components/AdminTitleAndCurrency/AdminTitleAndCurrency.vue';
import PaymentsTable from '@/components/AdminDashboard/AdminTotalDealPayments/PaymentsTable.vue';
import PaymentsTableFilters from '@/components/AdminDashboard/AdminTotalDealPayments/PaymentsTableFilters.vue';
import PaymentPieChart from '@/components/AdminDashboard/AdminTotalDealPayments/PaymentPieChart.vue';
import OverdueTable from '@/components/AdminDashboard/AdminTotalDealPayments/OverdueTable.vue';
import DateFilter from '@/components/AdminDashboard/AdminTotalDealPayments/DateFilter.vue';
import DealRepository from '@/repositories/DealCalculator/DealRepository';
import moment from 'moment';
import numeral from 'numeral';
const dealsHelpers = createNamespacedHelpers('Deals');
export default {
  name: 'AdminTotalDealPayments',
  components: {
    HeaderNavigation,
    DateFilter,
    OverdueTable,
    PaymentsTable,
    PaymentsTableFilters,
    PaymentPieChart,
    TitleAndCurrency,
  },
  data() {
    return {
      reset: false,
      currencyType: 'GBP',
      fullDealsList: [],
      listFilteredValues: {},
      listFilterBorrower: [],
      listFilterBorrowerType: [],
      listFilterLender: [],
      listFilterLenderType: [],
      overdueDealList: [],
      paymentsTableCols: [
        'Date',
        'Borrower',
        'Borrower Type',
        'Lender',
        'Lender Type',
        'Deal Value',
        'Outstanding',
        'Payment',
        'No.Installment',
      ],
      overdueTableCols: [
        'Due Date',
        'Overdue (days)',
        'Borrower',
        'Lender',
        'Deal Value',
        'Payment',
        'No.Installment',
      ],
      chartData: {},
      isChart: false,
      filter_totalValue: 0,
    };
  },
  created() {
    this.getTotalDealPayment();
  },
  computed: {
    // ...dealsHelpers.mapGetters(['getDeals']),
    filteredDealList() {
      const tmp = this.getFilterDealList();
      let tmp_paid_installments = 0;
      let tmp_installments = 0;
      let tmp_totalValue = 0;
      let tmp_totalPayments = 0;
      let tmp_totalOutstanding = 0;
      tmp.forEach((e) => {
        tmp_totalValue += e.deal_value;
        tmp_totalOutstanding += e.deal_outstanding;
        tmp_totalPayments += e.deal_payments;
        tmp_paid_installments += e.deal_paid_installments;
        tmp_installments += e.deal_installments;
      });
      return [
        ...tmp,
        {
          Date: 'TOTAL',
          'Deal Value':
            this.formatCurrency(this.currencyType) +
            numeral(tmp_totalValue).format('0,0.[00]'),
          Outstanding:
            this.formatCurrency(this.currencyType) +
            numeral(tmp_totalOutstanding).format('0,0.[00]'),
          Payment:
            this.formatCurrency(this.currencyType) +
            numeral(tmp_totalPayments).format('0,0.[00]'),
          'No.Installment': `${tmp_paid_installments} / ${tmp_installments}`,
        },
      ];
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

    getTotalDealPayment() {
      let $this = this;
      $this.$loading(true);
      DealRepository.adminTotalDealPayment()
        .then((response) => {
          $this.$loading(false);
          // this.storeDeals(response.data.data);
          this.fullDealsList = this.setInitialDealsList(response.data.all.data);
          this.getChartData(this.fullDealsList);
          this.overdueDealList = this.setInitialDealsList(
            response.data.overdue.data
          );
          this.setAllListFilters();
        })
        .catch((error) => {
          console.error(error);
          $this.$loading(false);
        });
    },
    getChartData(data) {
      this.filter_totalValue = 0;
      let tmp_totalOutstanding = 0;
      let tmp_totalPayments = 0;
      data.forEach((e) => {
        this.filter_totalValue += e.deal_value;
        tmp_totalOutstanding += e.deal_outstanding;
        tmp_totalPayments += e.deal_payments;
      });
      this.chartData = {
        labels: ['Outstanding', 'Payments'],
        datasets: [
          {
            borderWidth: 0,
            backgroundColor: ['#72B1F0', '#D9DFE5'],
            data: [
              parseFloat(tmp_totalOutstanding.toFixed(2)),
              parseFloat(tmp_totalPayments.toFixed(2)),
            ],
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
    setInitialDealsList(data) {
      return data.map((deal) => ({
        Date: moment(deal.date).format('DD.MM.YYYY'),
        'Due Date': moment(deal.date).format('DD.MM.YYYY'),
        'Overdue (days)': deal.overdue,
        Borrower: deal.borrower,
        'Borrower Type': deal.borrower_type,
        Lender: deal.lender,
        'Lender Type': deal.lender_type,
        'Deal Value':
          this.formatCurrency(deal.currency) +
            numeral(deal.deal_value).format('0,0.[00]') || 0,
        Outstanding:
          this.formatCurrency(deal.currency) +
            numeral(deal.outstanding).format('0,0.[00]') || 0,
        Payment:
          this.formatCurrency(deal.currency) +
            numeral(deal.payments).format('0,0.[00]') || 0,
        'No.Installment':
          `${deal.paid_installments} / ${deal.installments}` || 0,
        deal_currency: this.formatCurrency(deal.currency),
        deal_value: numeral(deal.deal_value).value(),
        deal_outstanding: numeral(deal.outstanding).value(),
        deal_payments: numeral(deal.payments).value(),
        deal_date: new Date(deal.date).getTime(),
        deal_paid_installments: deal.paid_installments,
        deal_installments: deal.installments,
        // id: deal.id,
        // dealDetail: deal,
      }));
      // .filter((list) => list.deal_date >= this.getLast6WeekDate());
    },
    /*getLast6WeekDate() {
      const today = new Date();
      const last6WeekDateTime = today.getTime() - 6 * 7 * 24 * 60 * 60 * 1000;
      const last6WeekDate = new Date(last6WeekDateTime);
      return last6WeekDate;
    },*/

    setAllListFilters() {
      this.listFilterBorrower = this.getListFilterByKeys('Borrower');
      this.listFilterBorrowerType = this.getListFilterByKeys('Borrower Type');
      this.listFilterLender = this.getListFilterByKeys('Lender');
      this.listFilterLenderType = this.getListFilterByKeys('Lender Type');
    },
    getListFilterByKeys(key) {
      const tmpList = this.filteredDealList?.reduce((arr, item) => {
        if (Object.keys(item).includes(`${key}`)) {
          arr = [...arr, item[`${key}`]];
        }
        return arr;
      }, []);
      return tmpList.filter((list, index) => tmpList.indexOf(list) === index);
    },
    setFilterDealsList(filteredList) {
      this.isChart = false;
      this.listFilteredValues = { ...this.listFilteredValues, ...filteredList };
      this.reset = false;
      this.getChartData(this.getFilterDealList());
    },
    getFilterDealList() {
      const tmp = this.fullDealsList.filter((list) => {
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
            if (
              key === 'start_date' &&
              parseInt(list.deal_date, 10) >=
                parseInt(this.listFilteredValues[key], 10)
            ) {
              return true;
            }
            if (
              key === 'end_date' &&
              parseInt(list.deal_date, 10) <=
                parseInt(this.listFilteredValues[key], 10)
            ) {
              return true;
            }
            return list[key] === this.listFilteredValues[key];
          })
          .every((v) => v === true);
      });
      return tmp;
    },

    onResetFilter() {
      this.reset = true;
    },
    onSelectedCurrency(currency) {
      if (currency === 'no_select') {
        this.getTotalDealPayment();
        return;
      }
      this.currencyType = currency;
      let $this = this;
      $this.$loading(true);
      DealRepository.adminTotalDealPaymentWithCurrency(currency)
        .then((response) => {
          $this.$loading(false);
          this.fullDealsList = this.setInitialDealsList(response.data.all.data);
          this.getChartData(this.fullDealsList);
          this.overdueDealList = this.setInitialDealsList(
            response.data.overdue.data
          );
          this.setAllListFilters();
        })
        .catch((error) => {
          console.error(error);
          $this.$loading(false);
        });
    },
  },
  watch: {
    filteredDealList() {
      this.setAllListFilters();
    },
  },
};
</script>
<style
  lang="scss"
  scoped
  src="@/assets/styles/admin/admin-total-deal-payments.scss"
></style>
