<template>
  <div class="deal-info">
    <p>
      Deal value:
      <span
        >{{ currency }} {{ info.guaranteedContractAmount | roundingUp | numFormat('0,0.[00]') }}</span
      >
    </p>
    <p>
      Amount paid upfront:
      <span
        >{{ currency }} {{ info.upfrontValue | roundingUp | numFormat('0,0.[00]') }}</span
      >
    </p>
    <p>
      Instalment Frequency: <span>{{ capitalizeFirstLetter(info.frequency) }}</span>
    </p>
    <hr />
    <p>
      Funding date: <span>{{ info.fundingDate | moment('DD/MM/YYYY') }}</span>
    </p>
    <p>
      Indicative legal cost:
      <span>{{ currency }} {{ legalCost | roundingUp | numFormat('0,0.[00]') }}</span>
    </p>
    <p>
      Indicative interest rate:
      <span>{{ this.interestRate }} %</span>
    </p>
  </div>
</template>

<script>
import store from '@/store';
import hardcodedvalues from '@/enums/dealCalculator/hardcodedvalues';
import Calculator from '@/modules/Deal/Calculator';
import { FUTURE } from '@/enums/dealCalculator/DealTypes';
import { FEES_LEGAL_AND_PRINCIPAL } from '@/enums/dealCalculator/Common';
import CalculatorMixin from '@/mixins/DealCalculator/Calculator.mixin';
import Utils from "../../../../services/utils";

export default {
  name: 'DealInfo',
  mixins: [
    CalculatorMixin,
  ],
  data: () => {
    return {
      legalCost: hardcodedvalues.legalCost,
      //interestRate: hardcodedvalues.interestRate,
    };
  },
  mounted() {
    this.getLegalCost();
  },
  computed: {
    info: () => {
      return store.getters['dealCalculator/getStep3Info'];
    },
    dealType: () => {
      return store.getters['dealCalculator/getDealType'];
    },
    currency: () => {
      let currency = store.getters['dealCalculator/getStep3Info'].currency;
      switch (currency) {
        case 'USD':
          return '$';
        case 'GBP':
          return '£';
        default:
          return '€';
      }
    },
    dealAmount: () => {
      // SEEMEk: code duplicated !!!
      let info = store.getters['dealCalculator/getStep3Info'];
      return (
        Utils.parseNum(info.netLoanAmount) +
        Utils.parseNum(info.upfrontValue)
      );
    },
    feesLegalAndPrincipal: () => {
      return FEES_LEGAL_AND_PRINCIPAL;
    },
  },
  methods: {
    getLegalCost() {
      if (this.dealType === FUTURE) {
        this.legalCost = Calculator.getLegalCosts(this.dealAmount);
      }
    },
    capitalizeFirstLetter(string) {
      return Utils.capitalizeFirstLetter(string);
    }
  },
  filters: {
    dateFormat(date) {
      let formatedDate = Date.parse(date);
      return new Date(formatedDate);
    }
  },
};
</script>

<style scoped>
.deal-info {
  background: #f3f7fc;
  border-radius: 8px;
  padding: 20px;
  margin: 40px auto;
}

.deal-info p {
  min-width: 210px;

  margin-bottom: 0;
  font-size: 13px;
  font-weight: 700;
  color: #253242;
}

.deal-info p span {
  margin-left: 7px;
  font-weight: 500;
}

.deal-info hr {
  color: #d9dfe5;
  height: 1px;
  opacity: 1;
}
</style>
