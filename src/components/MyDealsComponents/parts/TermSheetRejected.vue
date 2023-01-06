<template>
  <div>
    <hr />
    <h5 class="component-header">Term sheet is rejected by borrower</h5>
    <p class="text">{{ offer.reject_reason }}</p>
  </div>
</template>

<script>
import store from '@/store';

export default {
  name: 'TermSheetRejected',
  computed: {
    offer: () => {
      return store.getters['dealDetail/getOffer'];
    },
  },
};
</script>

<style scoped></style>
