<template>
  <div class="payment">
    <h3 class="sectionHeading mb-12">
      Adjust the payment instalment details, if necessary
    </h3>
    <a @click="prevStep()" class="back-link">
      <icon name="back-arrow" />Back to contract information
    </a>
    <DealInfo></DealInfo>
    <FutureDealInformation v-if="isFutureDealType && quoteType !== 'existing'"></FutureDealInformation>
    <LiveDealInformation v-if="isLiveDealType || (isFutureDealType && quoteType === 'existing')"></LiveDealInformation>
  </div>
</template>

<script>
import store from '@/store';
import StepsNavigationMixin from '@/mixins/DealCalculator/StepsNavigation.mixin';
import DealInfo from './parts/DealInfo';
import FutureDealInformation from './parts/FutureDealInformation';
import LiveDealInformation from './parts/LiveDealInformation';
import { FUTURE, LIVE } from '@/enums/dealCalculator/DealTypes';

export default {
  name: 'FourthStep',
  components: {
    DealInfo,
    FutureDealInformation,
    LiveDealInformation,
  },
  computed: {
    dealType: () => {
      return store.getters['dealCalculator/getDealType'];
    },
    quoteType: () => {
      return store.getters['dealCalculator/getQuoteType'];
    },
    isFutureDealType() {
      return this.dealType === FUTURE;
    },
    isLiveDealType() {
      return this.dealType === LIVE;
    },
  },
  mixins: [StepsNavigationMixin],
  methods: {},
};
</script>

<style scoped></style>
