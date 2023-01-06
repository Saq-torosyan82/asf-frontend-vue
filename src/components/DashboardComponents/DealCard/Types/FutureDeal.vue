<template>
  <DealCard
    :card-data="{
      type: 'future-deal',
      icon: deal.counterparty.avatar,
    }"
  >
    <div class="content-info inline">
      <div>
        <h5 class="deal-header">{{ deal.type_label }}</h5>
        <p class="deal-description">
          {{ deal.start_date | moment('YYYY') }} -
          {{ deal.finish_date | moment('YYYY') }}
          <span v-if="deal.lender && deal.lender.name != ''"
            >by {{ deal.lender.name }}</span
          >
        </p>
      </div>
      <div class="content-info-numbers inline">
        <div class="text-with-label">
          <label>Deal value</label>
          <p>
            {{ deal.currency | currency }}
            {{ deal.net_amount | numFormat('0,0.[00]') }}
          </p>
        </div>
        <div class="text-with-label">
          <label>Total amount payable</label>
          <p>
            {{ deal.currency | currency }}
            {{ deal.contract_amount | numFormat('0,0.[00]') }}
          </p>
        </div>
      </div>
    </div>
  </DealCard>
</template>

<script>
import DealCard from '../DealCard';
import DealMixin from '@/mixins/Deal/Deal.mixin';
export default {
  name: 'FutureDeal',
  mixins: [DealMixin],
  props: {
    deal: {
      type: Object,
      required: true,
    },
  },
  components: {
    DealCard,
  },
};
</script>

<style scoped>
.progress-bar {
  background: var(--main-gradient-reverse);
}
</style>
