<template>
  <div class="deal-status">
    <p class="deal-stat">
      <span>Status:</span>
      <Icon class="status-icon" :name="deal.status" />
      {{ deal.status_label }}
    </p>
    <p class="deal-stat">
      <span>Reason:</span>
      {{ deal.reason_label }}
    </p>
    <p class="deal-stat">
      <span>Start date:</span>
      {{ deal.funding_date | moment('DD.MM.YYYY') }}
    </p>
    <p class="deal-stat">
      <span>End date:</span>
      {{ lastPayment.paymentDate | moment('DD.MM.YYYY') }}
    </p>
  </div>
</template>
<script>
import store from '@/store';
import Icon from '@/components/Icon.vue';
export default {
  components: {
    Icon,
  },
  computed: {
    deal: () => {
      return store.getters['dealDetail/getState'];
    },
    lastPayment: () => {
      return store.getters['dealDetail/getLastPayment'];
    },
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.deal-status {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  margin-bottom: 15px;
  row-gap: 8px;
}
svg.status-icon {
  margin: 0 0 3px 5px;
}
p.deal-stat {
  font-size: 12px;
  width: 50%;
  margin-bottom: 0px;
}
.deal-stat span {
  font-weight: 700;
}
</style>
