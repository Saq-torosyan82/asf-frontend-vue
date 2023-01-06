<template>
  <div class="deal-info-small">
    <div class="top">
      <p class="deal-value">
        Deal value:
        <span
          >{{ currency }} {{ contractAmount | numFormat("0,0.[00]") }}</span
        >
      </p>
      <p class="upfront">
        Amount paid upfront:
        <span
          >{{ currency }} {{ upFrontAmount | numFormat("0,0.[00]") }}</span
        >
      </p>
      <p class="freq">
        Frequency: <span>{{ frequency }}</span>
      </p>
    </div>

    <hr />
    <div class="bottom">
      <p class="funding-date">
        Funding date: <span>{{ fundingDate | moment("DD.MM.YYYY") }}</span>
      </p>
      <p class="legal-cost">
        Indicative legal cost:
        <span>{{ currency }} {{ legalCost | numFormat("0,0.[00]") }}</span>
      </p>
      <p class="interest-rate">
        Indicative interest rate: <span> {{ interestRateVal.toFixed(2) }} %</span>
      </p>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import Calculator from "@/modules/Deal/Calculator";

export default {
  name: "DealInfo",

  computed: {
    currency: () => {
      return store.getters['dealDetail/getCurrency'];
    },
    contractAmount: () => {
      return store.getters['dealDetail/getContractAmount'];
    },
    upFrontAmount: () => {
      return store.getters['dealDetail/getUpFrontAmount'];
    },
    frequency: () => {
      return store.getters['dealDetail/getFrequency'];
    },
    fundingDate: () => {
      return store.getters['dealDetail/getFundingDate'];
    },
    legalCost: () => {
      return store.getters['dealDetail/getLegalCost'];
    },
    interestRateVal: () => {
      return store.getters['dealDetail/getInterestRate'];
    },
  },
  filters: {
    dateFormat(date) {
      let formatedDate = Date.parse(date);
      return new Date(formatedDate);
    },
  },
  methods: {

  }
};
</script>

<style scoped>
.deal-info-small {
  background: #f3f7fc;
  border-radius: 8px;
  padding: 10px 15px;
  margin: 4px 0 16px;
}
.deal-info-small .top,
.deal-info-small .bottom {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
}
.deal-info-small p {
  min-width: 100px;
  width: 33.3%;
  margin-bottom: 0;
  font-size: 10px;
  font-weight: 700;
  color: #253242;
}
.deal-info-small p span {
  margin-left: 7px;
  font-weight: 500;
}
.deal-info-small hr {
  color: #d9dfe5;
  height: 1px;
  opacity: 1;
  margin: 10px 0;
}
</style>
