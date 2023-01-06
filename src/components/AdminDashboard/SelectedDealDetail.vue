<template>
  <div class="deal-detail">
    <span class="icon-close" @click="onCloseDetail"></span>
    <div class="counterparties-section">
      <span class="txt-title">Counterparties</span>
      <div class="div-section">
        <div
          class="div-content"
          v-for="(e, index) in Object.values(counterparties)"
          :key="index"
        >
          <span class="txt-title">{{
            Object.keys(counterparties)[index]
          }}</span>
            <img v-if="e.avatar" v-auth-image="e.avatar" alt="" class="img-avatar" />
            <img v-else src="@/assets/img/person-default.png" class="img-avatar" alt="" />
          <span class="name">{{ e.name || e.name !== '' ? e.name : 'n/a' }}</span>
        </div>
      </div>
    </div>
    <div class="player-transfer-section">
      <div class="deal-progress">
        <span class="txt-title">Player Transfer</span>
        <span class="status"
          ><span>{{ selectedDeal.status_bar.label }}</span
          ><span>{{ selectedDeal.status_bar.percentaje }}%</span></span
        >

        <v-progress-linear
          :value="this.selectedDeal.status_bar.percentaje"
          height="6"
          :color="progressBarColor"
          class="progress-bar-container"
        ></v-progress-linear>
      </div>
      <div class="transfer-info">
        <p class="div-content">
          <span class="txt-title">Status: </span>
          <!-- <div class="icon-start"></div> -->
          <!-- <img
              v-if="selectedDeal.status === 'started'"
              src="@/assets/img/start_blue_icon.png"
            /> -->
          <Icon class="status-icon" :name="selectedDeal.status" />
          <span class="description">{{ selectedDeal.status_label }}</span>
        </p>
        <p class="div-content">
          <span class="txt-title">Reason: </span>
          <span class="description">{{ selectedDeal.reason_label }}</span>
        </p>
        <p class="div-content">
          <span class="txt-title">Start date: </span>
          <span class="description">{{
            dealDetail.start_date | moment('DD.MM.YYYY')
          }}</span>
        </p>

        <p class="div-content">
          <span class="txt-title">End date: </span>
          <span class="description">{{
            dealDetail.finish_date | moment('DD.MM.YYYY')
          }}</span>
        </p>
      </div>
    </div>
    <div class="amount-section">
      <div class="div-content-1">
        <PieChart
          :chart-data="chartData"
          :options="chartOptions"
          class="deal-pieChart"
        ></PieChart>
        <div class="description">
          <span class="txt-title">Contract value</span>
          <span class="value"
            >{{ formatCurrency(selectedDeal.currency)
            }}<span class="sub-value">{{
              selectedDeal.contract_amount | numFormat('0,0.[00]')
            }}</span></span
          >
        </div>
      </div>
      <div class="div-content">
        <div class="icon-total-receive"></div>
        <div class="description">
          <span class="txt-title">Total received</span>
          <span class="value"
            >{{ formatCurrency(selectedDeal.currency)
            }}<span class="sub-value">{{
              selectedDeal.paid_back | numFormat('0,0.[00]')
            }}</span></span
          >
        </div>
      </div>
      <div class="div-content">
        <div class="icon-to-receive"></div>
        <div class="description">
          <span class="txt-title">To receive</span>
          <span class="value"
            >{{ formatCurrency(selectedDeal.currency)
            }}<span class="sub-value">{{
              selectedDeal.deal_amount | numFormat('0,0.[00]')
            }}</span></span
          >
        </div>
      </div>
    </div>
    <div v-if="!isPaymentScheduleHide" class="payments-schedule-section">
      <span class="txt-title">Payments schedule</span>
      <div class="div-content">
        <span class="description"
          >Payment graph({{ formatCurrency(selectedDeal.currency) }})</span
        >
        <div v-if="selectedDeal.payments_data.length !== 0">
          <highcharts :options="paymentChartOptions" class="payment-chart" />
        </div>
      </div>
      <div class="div-content-info">
        <div class="section">
          <span class="txt-title"
            >Deal value:
            <span class="value"
              >{{ formatCurrency(selectedDeal.currency)
              }}{{ selectedDeal.deal_amount }}</span
            ></span
          >
          <span class="txt-title"
            >Amount paid upfront:
            <span class="value"
              >{{ formatCurrency(selectedDeal.currency)
              }}{{ selectedDeal.upfront_amount }}</span
            ></span
          >
          <span class="txt-title"
            >Frequency monthly:
            <span class="value">{{ selectedDeal.frequency }}</span></span
          >
        </div>
        <div class="section">
          <span class="txt-title"
            >Funding date:
            <span class="value">{{
              selectedDeal.funding_date | moment('DD.MM.YYYY')
            }}</span></span
          >
          <span class="txt-title"
            >Indicative legal cost:
            <span class="value"
              >{{ formatCurrency(selectedDeal.currency)
              }}{{ selectedDeal.fees_data.legalCost }}</span
            ></span
          >
          <span class="txt-title"
            >Indicative interest rate:
            <span class="value">{{ selectedDeal.interest_rate }}%</span></span
          >
        </div>
      </div>
      <div class="div-content-table">
        <PaymentTable
          :rows="paymentRows"
          :currency="formatCurrency(selectedDeal.currency)"
        />
      </div>
      <div class="description">
        <span class="txt-title">Total</span>
        <span class="value"
          >{{ formatCurrency(selectedDeal.currency)
          }}{{ selectedDeal.gross_amount }}</span
        >
      </div>
    </div>
    <span class="txt-hide" @click="onHidePaymentSchedule">{{
      !isPaymentScheduleHide ? 'Hide the schedule' : 'Show the schedule'
    }}</span>
    <div class="documents-section">
      <span class="txt-title">Documents</span>
      <DocumentsTable :rows="documentsRows" />
    </div>
    <div class="counterparty-section" v-show="selectedDeal.contact_data.length">
      <span class="txt-title">Counterparty information</span>
      <div
        v-for="(value, index) in selectedDeal.contact_data"
        :key="index"
        class="div-content-info"
      >
        <div class="section">
          <span class="txt-title"
            >First name: <span class="value">{{ value.firstName }}</span></span
          >
          <span class="txt-title"
            >Last name: <span class="value">{{ value.lastName }}</span></span
          >
          <span class="txt-title"
            >Position: <span class="value">{{ value.position }}</span></span
          >
        </div>
        <div class="section">
          <span class="txt-title"
            >Phone number: <span class="value">{{ value.phone }}</span></span
          >
          <span class="txt-title"
            >Contact email: <span class="value">{{ value.email }}</span></span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PieChart from '@/components/charts/PieChart.js';
import PaymentTable from '@/components/DealDetailTable/PaymentTable.vue';
import DocumentsTable from '@/components/DealDetailTable/DocumentsTable.vue';
import moment from 'moment';
import Icon from '@/components/Icon.vue';
export default {
  components: { PieChart, PaymentTable, DocumentsTable, Icon },
  props: {
    selectedDeal: {
      type: Object,
      default: new Object(),
    },
  },

  data() {
    return {
      isPaymentScheduleHide: false,
      transactionForm: ['Borrower', 'Counterparty', 'Lender'],
      progressBarColor: '#72B1F0',

      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        cutoutPercentage: 25,
        animation: {
          animateRotate: true,
        },
        legend: {
          display: false,
        },
      },
    };
  },
  created() {},
  computed: {
    paymentRows() {
      return this.selectedDeal.payments_data.map((e) => ({
        Date: moment(e.paymentDate).format('DD.MM.YYYY'),
        Status: e.paid ? 'Received' : 'Pending',
        'Gross amounts': Number(e.grossAmount),
      }));
    },
    documentsRows() {
      return this.selectedDeal.user_documents.map((e) => ({
        Type: e.label,
        'Upload date': e.upload_date,
        Status: e.is_verified === 1 ? 'Verified' : 'Pending',
      }));
    },
    counterparties() {
      return {
        Borrower: this.selectedDeal.borrower,
        Counterparty: this.selectedDeal.counterparty,
        Lender: this.selectedDeal.lender,
      };
    },
    dealDetail() {
      return this.selectedDeal.dealDetail;
    },

    chartData() {
      return {
        labels: ['Total received', 'To receive'],
        datasets: [
          {
            backgroundColor: ['#ACE30D', '#D9DFE5'],
            data: [this.selectedDeal.paid_back, this.selectedDeal.deal_amount],
          },
        ],
      };
    },
    paymentChartOptions() {
      let data = {
        data: {
          table: 'datatable',
        },
        chart: {
          type: 'column',
        },
        credits: {
          enabled: false,
        },
        xAxis: {
          categories: [],
          gridLineWidth: 0,
          tickWidth: 0,
          crosshair: false,
        },
        yAxis: {
          crosshair: false,
          gridLineWidth: 1,
          lineWidth: 0,
          tickWidth: 0,
          title: {
            text: '',
          },
        },
        title: {
          text: '',
        },

        series: [
          {
            name: 'Gross amount',
            data: [],
            color: '#4289DA',
          },
          /*{
            name: 'Amount',
            data: [],
            color: '#B6DAFF',
          },*/
        ],
      };

      for (
        let index = 0;
        index < this.selectedDeal.payments_data.length;
        index++
      ) {
        const e = this.selectedDeal.payments_data[index];
        data.xAxis.categories.push(moment(e.paymentDate).format('DD.MM.YYYY'));
        data.series[0].data.push(Number(e.grossAmount));
        // data.series[1].data.push(Number(e.paymentAmount));
      }
      return data;
    },
  },
  methods: {
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
    onHidePaymentSchedule() {
      this.isPaymentScheduleHide = !this.isPaymentScheduleHide;
    },
    onCloseDetail() {
      this.$emit('closeDealDetail');
    },
  },
};
</script>
<style
  lang="scss"
  scoped
  src="@/assets/styles/admin/selected-deal-detail.scss"
></style>
