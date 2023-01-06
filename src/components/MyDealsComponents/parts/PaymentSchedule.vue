<template>
  <div class="payment-schedule">
    <h5 class="counterparties-header">Payment schedule</h5>

<!--    <PaymentBarChart v-show="showChart" class="payment-bar-chart" />-->

    <DealInfoSmall />

    <PaymentScheduleFutureDeal v-if="dealType == 'future'  && quoteType === 'future'"></PaymentScheduleFutureDeal>
    <PaymentScheduleLiveDeal v-if="dealType == 'future' && quoteType === 'existing'"></PaymentScheduleLiveDeal>

    <table
      class="payment-table the-table"
      v-if="showSchedule"
    >
      <template>
        <thead>
          <td></td>
          <td>Date</td>
          <td>Status</td>
          <td>Gross amount</td>
        </thead>
        <tbody>
          <tr v-for="(rate, index) in paymentsDates" :key="index">
            <td>{{ index + 1 }}.</td>
            <td>{{ rate.paymentDate | moment('DD.MM.YYYY') }}</td>
            <td v-if="rate.paid" class="received status">Received</td>
            <td v-else class="pending status">Pending</td>
            <td>
              {{ currency }} {{ rate.grossAmount | numFormat('0,0.[00]') }}
            </td>
          </tr>
        </tbody>

        <tfoot>
          <tr class="footer">
            <td colspan="3">Amount charged to counterparty</td>
            <td colspan="1">
              {{ currency }} {{ grossAmount | numFormat('0,0.[00]') }}
            </td>
          </tr>
        </tfoot>
      </template>

      <!-- Izbrisati additionalCosts   -->
      <!-- <tfoot v-show="additionalCosts">
        <tr class="footer">
          <td colspan="3">Amount charged to counterparty</td>
          <td colspan="1">{{ currency }} 11,833,222</td>
        </tr>
      </tfoot> -->
    </table>

    <a
      v-if="dealType != 'future'"
      @click="toggleSchedule()"
      class="link-text"
      >{{ showSchedule ? 'Hide the schedule' : 'Show the schedule' }}</a
    >
    <a
      href="#"
      @click.prevent="exportPdf"
      v-if="dealType == 'future'"
      class="link-text block text-right mt-7"
      >Download PDF</a
    >


    <VueHtml2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="false"
        :paginate-elements-by-height="1400"
        filename="Payment instalment"
        @progress="generatePdfProgress"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="landscape"
        pdf-content-width="100%"
        ref="html2Pdf"
        :html-to-pdf-options="this.htmlToPdfOptions"
    >
      <section slot="pdf-content" id="pdf-content" class="pdf-content">
        <div class="pdf-header">
          <LogoImage></LogoImage>
          <div class="line"></div>
        </div>
        <DealInfoSmall />

        <PaymentScheduleFutureDeal v-if="dealType == 'future'  && quoteType === 'future'"></PaymentScheduleFutureDeal>
        <PaymentScheduleLiveDeal v-if="dealType == 'future' && quoteType === 'existing'"></PaymentScheduleLiveDeal>

        <div class="pdf-footer">
          <p class="head">PRIVATE & CONFIDENTIAL</p>
          <p>SportsFi Limited a company incorporated in England and Wales under number company no. 13839769 whose registered office is situated office at 20-22 Wenlock Road, London, N1 7GU</p>
        </div>

      </section>

    </VueHtml2pdf>


  </div>
</template>
<script>
import store from '@/store';
import DealInfoSmall from '@/components/DealInfoSmall.vue';
import PaymentScheduleFutureDeal from "./PaymentScheduleFutureDeal";
import PaymentScheduleLiveDeal from "./PaymentScheduleLiveDeal";
import PaymentBarChart from '@/components/charts/PaymentBarChart.js';
import CalculatorMixin from "@/mixins/DealCalculator/Calculator.mixin"
import ExportPDFMixin from "@/mixins/DealCalculator/ExportPDF.mixin"
import LogoImage from '@/assets/icons/sidebar/logo-sidebar.svg';
import VueHtml2pdf from 'vue-html2pdf'

export default {
  props: {
    showChart: {
      type: Boolean,
    },
    additionalCosts: {
      type: Boolean,
    },

  },
  mixins: [CalculatorMixin, ExportPDFMixin],
  data() {
    return {
      showSchedule: false,
      totalPaymentAmount: 0,
      htmlToPdfOptions: {
        margin: [0,1,1,1],
        filename: 'deal-calculator.pdf',
        image: {
          type: 'jpeg',
          quality: 0.98
        },
        enableLinks: false,
        html2canvas: {
          scale: 1,
          useCORS: true
        },
        jsPDF: {
          unit: 'cm',
          format: 'a4',
          orientation: 'landscape'
        }
      },
    };
  },
  components: {
    DealInfoSmall,
    // PaymentBarChart,
    PaymentScheduleFutureDeal,
    PaymentScheduleLiveDeal,
    VueHtml2pdf,
    LogoImage

  },
  mounted() {
    this.getPaymentTotal();
  },
  computed: {
    paymentsDates: () => {
      return store.getters['dealDetail/getPaymentRates'];
    },
    quoteType: () => {
      return store.getters['dealDetail/getQuoteType'];
    },
    upfrontValue: () => {
      return store.getters['dealDetail/getUpFrontAmount'];
    },
    grossAmount: () => {
      return store.getters['dealDetail/getGrossAmount'];
    },
    currency: () => {
      return store.getters['dealDetail/getCurrency'];
    },
  },
  methods: {
    toggleSchedule() {
      return (this.showSchedule = !this.showSchedule);
    },
    getPaymentTotal() {
      if(this.paymentsDates) {
        let $this = this;
        this.paymentsDates.forEach((element) => {
          $this.totalPaymentAmount += element.paymentAmount;
        });
      }
    }
  },
};
</script>
<style>
.pdf-content .deal-info-small .deal-value,
.pdf-content .deal-info-small .upfront,
.pdf-content .deal-info-small .freq,
.pdf-content .deal-info-small .funding-date,
.pdf-content .deal-info-small .legal-cost,
.pdf-content .deal-info-small .deal-value
{
  font-size: 0.9em;
  letter-spacing: 0.1em;
}

.pdf-content .payment-table {
  font-size: 0.9em;
  letter-spacing: 0.1em;
}
</style>
<style lang="scss" scoped>
.pdf-header .line {
  display: block;
  width: 700px;
  height: 3px;
  float: right;
  background-color: #3a9eba;
  margin-top: 13px;
}

.pdf-header {
  width: 100%;
  padding: 30px 0;
}

.pdf-footer .head {
  font-weight: bold;
  font-size: 12px;
  color: black;
  letter-spacing: 0.1em;
}
.pdf-footer {
  text-align: center;
  font-size: 8px;
  color: black;
  margin-top: 100px;
  letter-spacing: 0.1em;
}
/** payment-bar-chart */
.payment-bar-chart {
  max-height: 220px;
}

/** Payment table */
.payment-table {
  margin-bottom: 10px;
  font-size: 13px;
  width: 100%;
  thead {
    font-weight: 700;
  }
  tr {
    &:hover {
      background: #f6f6f6;
    }
    &.separator-top {
      td {
        border-top: 1px solid #d9dfe5;
      }
    }
  }
  td {
    padding: 5px 10px;
    &:first-child {
      max-width: 50px;
    }
    &:last-child {
      text-align: right;
    }
  }
  .status::before {
    content: '';
    display: inline-block;
    margin-right: 8px;
    width: 8px;
    height: 8px;
    border-radius: 50px;
  }
  tr.additional-costs {
    line-height: 20px;
  }
  .footer {
    td {
      padding-top: 10px;
    }
    font-weight: 700;
  }
}

.payment-table .status.received::before {
  background-color: #76e150;
}
.payment-table .status.pending::before {
  background-color: #ffb95a;
}
</style>
