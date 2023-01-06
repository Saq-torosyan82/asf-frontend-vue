<template>
  <div>
    <hr>
    <p><b>{{ statusBar.label }}</b></p>
  </div>
</template>

<script>
import store from "@/store";
export default {
  name: "CanceledDealReason",
  computed: {
    statusBar: () => {
      return store.getters["dealDetail/getStatusBar"];
    },
  }
}
</script>

<style scoped>

</style>