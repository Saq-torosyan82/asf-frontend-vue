<template>
  <DealCard
    :card-data="{
      type: 'paused',
      icon: deal.counterparty.avatar,
    }"
  >
    <div class="content-info inline">
      <div class="">
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
        <b-col>{{ deal.status_bar.percentaje }}%</b-col>
      </b-row>
      <div class="progress">
        <div
          class="progress-bar complete"
          role="progressbar"
          :style="{ width: deal.status_bar.percentaje + '%' }"
          aria-valuenow="100"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
    <h5 class="deal-reson" v-if="deal.reason != 'draft'">
      {{ deal.reason_label }}
    </h5>
    <a
      class="link-text upload-document-link"
      v-else
      @click.prevent="updateInformation(deal.id, 5)"
      ><Icon name="upload-link" /> Upload documents</a
    >
  </DealCard>
</template>

<script>
import store from '@/store';
import User from '@/modules/User/User';
import DealCard from '../DealCard';
import DealMixin from '@/mixins/Deal/Deal.mixin';
import Icon from '@/components/Icon';
import GetDealDetailMixin from '@/mixins/Deal/GetDealDetail.mixin';

export default {
  name: 'NotStarted',
  mixins: [DealMixin, GetDealDetailMixin],
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
    Icon,
  },

  methods: {
    updateInformation(dealId, dealCalculatorStep) {
      this.$loading(true);
      let $this = this;
      this.getDealDetail(dealId).then((response) => {
        if (this.athlete) {
          store.dispatch('dealCalculator/setAthlete', this.athlete);
          store.dispatch('editUser/setHash', this.athlete.id);
        }
        store.dispatch('dealCalculator/jumpToStep', dealCalculatorStep);
        store.dispatch('dealCalculator/setResume', true);
        store.dispatch('dealCalculator/nextStep');
        this.$loading(false);
        this.$router.push('/dealcalculator');
      });
    },
  },
};
</script>

<style scoped>
.progress-bar {
  background: var(--main-gradient-reverse);
}
.upload-document-link {
  display: block;
  text-align: center;
  margin-top: 10px;
}
</style>
