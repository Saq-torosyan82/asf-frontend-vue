<template>
  <div class="">
    <ContractExpenseChart />
    <hr />
    <PaymentSchedule :showChart="true" :additionalCosts="true" />
    <hr v-if="dealType != 'future'" />
    <DocumentsTable :hasDocuments="true" v-if="dealType != 'future'" />
  </div>
</template>
<script>
import ContractExpenseChart from '@/components/MyDealsComponents/parts/ContractExpenseChart.vue';
import PaymentSchedule from '@/components/MyDealsComponents/parts/PaymentSchedule.vue';
import DocumentsTable from '@/components/MyDealsComponents/parts/DocumentsTable.vue';
// import NextPaymentStatus from '@/components/MyDealsComponents/parts/NextPaymentStatus.vue';
export default {
  components: {
    ContractExpenseChart,
    PaymentSchedule,
    DocumentsTable,
    // NextPaymentStatus,
  },
  props: ['dealType'],
};
</script>

<style scoped>
p {
  font-size: 12px;
  margin-bottom: 0;
}
.offer {
  width: 100%;
  display: inline-flex;
  align-items: center;
  margin-top: 20px;
}
h5.lender-name {
  font-weight: bold;
  font-size: 14px;
  color: #707d8c;
  margin-bottom: 0;
}

.offer-document {
  display: inline-flex;
  align-items: center;
}
.document-type {
  background: linear-gradient(156.09deg, #d0e4fb -9.74%, #f3f7fc 111.18%);
  border-radius: 6px;
  padding: 10px 7px;
  margin-right: 16px;
}
.document-type p {
  font-size: 10px;
  font-weight: bold;
  color: #4289da;
}
.document-info p {
  font-size: 12px;
  color: #93a0ae;
  font-weight: 600;
  line-height: 16px;
}
p.document-name {
  color: #253242;
}

.offer-document,
.actions {
  margin-left: auto;
}
.actions svg {
  margin: 0 6px 1px 0;
}
.offer-footer button {
  margin-top: 24px;
  display: inline;
  box-shadow: none;
}
</style>
