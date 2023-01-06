<template>
  <div class="deal-status">
    <p class="deal-stat">
      <span>Status:</span>
      <span class="status-icon"></span>
      {{ next_payment.status }}
    </p>
    <p class="deal-stat">
      <span>Amount:</span>
      {{ currency }} {{ next_payment.amount | numFormat('0,0.[00]') }}
    </p>
    <p class="deal-stat">
      <span>Receiving date:</span>
      {{ next_payment.payment_date | moment('DD.MM.YYYY') }}
    </p>
    <p class="deal-stat">
      <span>Installment:</span>
      {{ next_payment.crt_installment }}/{{ next_payment.nb_installments }}
    </p>
    <hr />
  </div>
</template>
<script>
import store from '@/store';
import UserService from '@/services/user.service';

export default {
  props: {},
  components: {},
  computed: {
    next_payment: () => {
      return store.getters['dealDetail/getNextPayment'];
    },
    currency: () => {
      return store.getters['dealDetail/getCurrency'];
    },
  },
};
</script>
<style lang="scss" scoped>
.deal-status {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  margin-bottom: 15px;
  row-gap: 8px;
  svg.status-icon {
    margin: 0 0 3px 5px;
  }
  p.deal-stat {
    font-size: 12px;
    width: 50%;
    margin-bottom: 0px;
    span {
      font-weight: 700;
    }
  }
}

/* .deal-status {
  .deal-stat {
    font-size: 14px;
    font-weight: 700;
    span {
      font-weight: 400;
    }
  }
} */
</style>
