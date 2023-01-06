<template>
  <div>
    <table class="payment-table the-table">
      <template>
        <thead>
          <td></td>
          <td>Date</td>
          <td>Payment instalments</td>
          <td>Of which interest</td>
          <td>Of which principal</td>
        </thead>
        <tbody>
          <tr v-for="(rate, index) in paymentsDates" :key="index">
            <td>{{ index + 1 }}.</td>
            <td>{{ rate.paymentDate | moment('DD.MM.YYYY') }}</td>
            <td>
              {{ currency }} {{ rate.paymentAmount | numFormat('0,0.[00]') }}
            </td>
            <td>
              {{ currency }} {{ rate.interestCharged | numFormat('0,0.[00]') }}
            </td>
            <td>
              {{ currency }} {{ rate.grossAmount | numFormat('0,0.[00]') }}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="footer">
            <td colspan="2">Total</td>
            <td colspan="1">
              {{ currency }}
              {{
                (totalPaymentAmount + getTotalFees()) | numFormat('0,0.[00]')
              }}
            </td>
            <td>
              {{ currency }} {{ interestChargeTotal | numFormat('0,0.[00]') }}
            </td>
            <td colspan="1">
              {{ currency }} {{ grossAmount | numFormat('0,0.[00]') }}
            </td>
          </tr>
          <tr class="separator-top">
            <td colspan="4">Underwriting Fee</td>
            <td colspan="1">
              {{ currency }}
              {{ underwritingFee | numFormat('0,0.[00]') }}
            </td>
          </tr>
          <tr class="">
            <td colspan="4">Legal Fee</td>
            <td colspan="1">
              {{ currency }}
              {{ getFeesAmount(feesLegalAndPrincipal) | numFormat('0,0.[00]') }}
            </td>
          </tr>
          <tr class="">
            <td colspan="4">Amount paid upfront</td>
            <td colspan="1">{{ currency }} {{ upfrontValue }}</td>
          </tr>
          <tr class="">
            <td colspan="4">Total fees</td>
            <td colspan="1">
              {{ currency }} {{ getTotalFees() | numFormat('0,0.[00]') }}
            </td>
          </tr>
          <tr class="footer">
            <td colspan="4"></td>
            <td colspan="1"></td>
          </tr>
          <tr class="footer separator-top">
            <td colspan="4">Total amount payable</td>
            <td colspan="1">
              {{ currency }} {{ totalPaymentAmount | numFormat('0,0.[00]') }}
              {{ currency }}
            </td>
          </tr>
        </tfoot>
      </template>
    </table>
  </div>
</template>
<script>
import store from '@/store';
import CalculatorMixin from '@/mixins/DealCalculator/Calculator.mixin';

export default {
  name: 'PaymentScheduleFutureDeal',
  props: {
    showChart: {
      type: Boolean,
    },
    additionalCosts: {
      type: Boolean,
    },
  },
  mixins: [CalculatorMixin],
  data() {
    return {
      showSchedule: false,
      totalPaymentAmount: 0,
    };
  },
  components: {},
  mounted() {
    this.getPaymentTotal();
    this.calculateInterestChargeTotal();
  },
  computed: {
    paymentsDates: () => {
      return store.getters['dealDetail/getPaymentRates'];
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
    calculateInterestChargeTotal() {
      if (this.paymentsDates) {
        let $this = this;
        this.paymentsDates.forEach((element) => {
          $this.interestChargeTotal += element.interestCharged;
        });
      }
    },
    getPaymentTotal() {
      if (this.paymentsDates) {
        let $this = this;
        this.paymentsDates.forEach((element) => {
          $this.totalPaymentAmount += element.paymentAmount;
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
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
