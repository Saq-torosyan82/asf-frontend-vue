<template>
  <div>
    <a href="#" @click.prevent="clearData" class="link-text">
      <slot></slot>
    </a>
  </div>
</template>

<script>
import store from '@/store';

export default {
  name: 'LinkToDealCalculator',
  methods: {
    clearData() {
      store.dispatch('dealCalculator/resetDeal');
      this.$router.push('/dealcalculator');
    },
  },
};
</script>

<style scoped></style>
