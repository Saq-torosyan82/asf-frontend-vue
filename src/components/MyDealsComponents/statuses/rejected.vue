<template>
  <div>
    <h5 class="counterparties-header">Your deal was not approved</h5>
    <p class="text">
      Admin did not approve your deal.<br />Reason of disapproval: reason<br />Please,
      upload missing documents.
    </p>
    <UploadDocuments :docs="requiredDocuments" />
    <hr />
    <ContractExpenseChart />
    <hr />
    <PaymentSchedule :showChart="false" />
    <hr v-if="dealType != 'future'" />
    <DocumentsTable :hasDocuments="true" v-if="dealType != 'future'" />
  </div>
</template>
<script>
import UploadDocuments from '@/components/MyDealsComponents/parts/UploadDocuments.vue';
import ContractExpenseChart from '@/components/MyDealsComponents/parts/ContractExpenseChart.vue';
import PaymentSchedule from '@/components/MyDealsComponents/parts/PaymentSchedule.vue';
import DocumentsTable from '@/components/MyDealsComponents/parts/DocumentsTable.vue';
export default {
  components: {
    UploadDocuments,
    ContractExpenseChart,
    PaymentSchedule,
    DocumentsTable,
  },
  props: ['dealType'],
  data() {
    return {
      requiredDocuments: [
        'Quarterly balance sheets',
        'Income statements',
        'Cash flow statements',
      ],
    };
  },
};
</script>
<style scoped>
.text {
  margin-bottom: 16px;
}
.upload-documents {
  margin-top: 0;
}
</style>
