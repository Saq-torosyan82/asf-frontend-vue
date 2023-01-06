<template>
  <div class="">
    <div class="admin-review" v-show="!thereIsOffer">
      <h5 class="counterparties-header">Admin reviews your deal</h5>
      <p class="text">
        When your application is reveiwed by admin, it will be submitted to
        lenders. After that you will receive the Terms from the lenders to
        choose from.
      </p>
      <a href="#" class="link-text cancel-deal">Stop the deal</a>
    </div>
    <!--    <LenderOffer v-show="thereIsOffer" />-->
    <ContractExpenseChart />
    <hr />
    <PaymentSchedule :showChart="false" />
    <hr v-if="dealType != 'future'" />
    <DocumentsTable v-if="dealType != 'future'" />
  </div>
</template>
<script>
import LenderOffer from '@/components/MyDealsComponents/parts/LenderOffer.vue';
import ContractExpenseChart from '@/components/MyDealsComponents/parts/ContractExpenseChart.vue';
import PaymentSchedule from '@/components/MyDealsComponents/parts/PaymentSchedule.vue';
import DocumentsTable from '@/components/MyDealsComponents/parts/DocumentsTable.vue';
export default {
  components: {
    ContractExpenseChart,
    PaymentSchedule,
    DocumentsTable,
  },
  props: ['dealType'],
  data() {
    return {
      thereIsOffer: true,
    };
  },
};
</script>
<style scoped>
/** Admin review */
.admin-review h5 {
  margin-top: 20px;
}
p {
  font-size: 12px;
}
</style>
