<template>
  <DealCard
    :card-data="{
      type: 'live',
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
          <label v-if="isLender">Amount advanced</label>
          <label v-else>Net amount received</label>
          <p>
            {{ deal.currency | currency }}
            {{ deal.contract_amount | numFormat('0,0.[00]') }}
          </p>
        </div>
        <div class="text-with-label">
          <label v-if="isLender">Total repaid to date</label>
          <label v-else>Paid down to date</label>
          <p>
            {{ deal.currency | currency }}
            {{ deal.paid_back | numFormat('0,0.[00]') }}
          </p>
        </div>
      </div>
    </div>
    <div class="deal-progress">
      <b-row class="deal-completion">
        <b-col>Deal completion</b-col>
        <b-col>{{ deal.status_bar ? deal.status_bar.percentaje : 0 }}%</b-col>
      </b-row>
      <div class="progress">
        <div
          class="progress-bar complete"
          role="progressbar"
          :style="{
            width: deal.status_bar ? deal.status_bar.percentaje + '%' : 0 + '%',
          }"
          aria-valuenow="100"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
    <h5 class="deal-reson">{{ deal.reason_label }}</h5>
  </DealCard>
</template>

<script>
import User from '@/modules/User/User';
import DealCard from '../DealCard';
import DealMixin from '@/mixins/Deal/Deal.mixin';
export default {
  name: 'Live',
  mixins: [DealMixin],
  props: {
    deal: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isLender() {
      return User.isLender();
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
  background: var(--main-gradient-reverse);
}
</style>
