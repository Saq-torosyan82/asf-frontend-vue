<template>
  <div class="">
    <div v-show="!ready">
      <h5 class="counterparties-header">We prepare your contract</h5>
      <p class="text">
        Admin will review the deal and will generate a contract for you and
        lender to sign. You will receive notification once it is done, usually
        it takes 1-3 business days.
      </p>
    </div>
    <div v-show="ready && !signed">
      <h5 class="counterparties-header">Your contract is ready</h5>
      <p class="text">
        Please review the contract and put your digital signature to start the
        deal.
      </p>
      <div class="offer">
        <h5 class="lender-name">Lender Name 1</h5>
        <div class="offer-document">
          <div class="document-type">
            <p>PDF</p>
          </div>
          <div class="document-info">
            <p class="document-name">Contract</p>
            <p>dd.mm.yyyy</p>
          </div>
        </div>

        <div class="actions">
          <span>
            <icon name="download-document" />
            <a href="#" class="link-text">Download</a>
          </span>
        </div>
      </div>
      <div class="offer-footer">
        <SquareButton background="#3a9eba" color="#ffffff" maxWidth="170px"
          >Sign the deal</SquareButton
        >
        <SquareButton background="#ffffff" color="#3a9eba" maxWidth="170px"
          >Stop the deal</SquareButton
        >
      </div>
    </div>
    <div v-show="ready && signed && !signedByLender">
      <h5 class="counterparties-header">Lender reviews the contract</h5>
      <p class="text">
        Only one step left - lender needs to sign the contract.<br />
        We will notify you once your deal goes live.
      </p>
    </div>

    <div v-show="ready">
      <hr v-show="signedByLender" />
      <div v-show="signedByLender">
        <h5 class="counterparties-header">Next payment information</h5>
        <NextPaymentStatus />
      </div>
      <ContractExpenseChart />
      <hr />
      <PaymentSchedule :showChart="false" />
      <hr v-if="dealType != 'future'" />
      <DocumentsTable :hasDocuments="true" v-if="dealType != 'future'" />
    </div>
  </div>
</template>
<script>
import SquareButton from '@/components/SquareButton.vue';
import ContractExpenseChart from '@/components/MyDealsComponents/parts/ContractExpenseChart.vue';
import PaymentSchedule from '@/components/MyDealsComponents/parts/PaymentSchedule.vue';
import DocumentsTable from '@/components/MyDealsComponents/parts/DocumentsTable.vue';
import NextPaymentStatus from '@/components/MyDealsComponents/parts/NextPaymentStatus.vue';
export default {
  components: {
    SquareButton,
    ContractExpenseChart,
    PaymentSchedule,
    DocumentsTable,
    NextPaymentStatus,
  },
  props: ['dealType'],
  data() {
    return {
      signed: true,
      signedByLender: true,
      ready: true,
    };
  },
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
