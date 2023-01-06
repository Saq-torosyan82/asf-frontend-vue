<template>
  <div class="">
    <ContractExpenseChart />
    <hr />
    <PaymentSchedule :showChart="true" />
    <hr v-if="dealType != 'future'" />
    <DocumentsTable v-if="dealType != 'future'" />
  </div>
</template>
<script>
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
    return {};
  },
};
</script>
<style scoped></style>
