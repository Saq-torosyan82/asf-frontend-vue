<template>
<div>
  <h3 class="step-count">Step {{ currentStep }}</h3>
  <div class="progress">
    <div
        class="progress-bar"
        role="progressbar"
        :style="{ width: currentStep * 25 + '%' }"
        aria-valuenow="25"
        aria-valuemin="0"
        aria-valuemax="100"
    ></div>
  </div>
</div>
</template>

<script>
import store from '@/store';

export default {
  name: "Steps",
  computed: {
    currentStep() {
      return store.getters["lenderOnboarding/getStep"];
    },
  },
}
</script>

<style scoped>

</style>