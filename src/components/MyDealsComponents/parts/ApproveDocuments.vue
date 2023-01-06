<template>
  <div>
    <hr />
    <h5 class="component-header">Deal documents needs to be revised</h5>
    <p class="actions">Actions:</p>
    <div class="form-check">
      <input
        class="form-check-input"
        v-model="action"
        type="radio"
        value="review"
        id="review"
        :disabled="reason === reasons.UNDER_REVIEW"
      />
      <label class="form-check-label" for="review"> Review Documents </label>
    </div>
    <div v-if="idCreditAnalysisDocumentUploaded" class="form-check">
      <input
        class="form-check-input"
        v-model="action"
        type="radio"
        value="approve"
        id="approve"
        checked
      />
      <label class="form-check-label" for="approve"> Approve </label>
    </div>
    <div class="form-check">
      <input
        class="form-check-input"
        v-model="action"
        type="radio"
        value="reject"
        id="reject"
        checked
      />
      <label class="form-check-label" for="reject"> Reject </label>
    </div>
    <div class="credit-analysis-wrapper">
      <a
        href="#"
        class="link-text"
        @click.prevent="openUploadCreditAnalysisModal"
        >Upload Credit Analysis document</a
      >
    </div>

    <a class="button" @click.prevent="submit">Submit</a>

    <RejectDocumentsModal
      v-if="rejectDocumentsModal"
      @closed="closeRejectModal"
    ></RejectDocumentsModal>

    <BaseModal
      v-if="uploadCreditAnalysis"
      @closed="uploadCreditAnalysis = false"
      :modal-type="'upload-credit-analysis'"
    ></BaseModal>
  </div>
</template>

<script>
import store from '@/store';
import RejectDocumentsModal from './RejectDocumentsModal';
import DocumentsMixin from '@/mixins/Deal/Documents.mixin';
import DealReasons from '../../../enums/deal/reasons';
import GetDealDetailMixin from '@/mixins/Deal/GetDealDetail.mixin';
import BaseModal from '../../BaseModal';

export default {
  name: 'ApproveDocuments',
  mixins: [DocumentsMixin, GetDealDetailMixin],
  components: {
    RejectDocumentsModal,
    BaseModal,
  },
  data() {
    return {
      action: '',
      reasons: DealReasons,
      uploadCreditAnalysis: false,
    };
  },
  computed: {
    reason: () => {
      return store.getters['dealDetail/getReason'];
    },
    documents: () => {
      return store.getters['dealDetail/getDocuments'];
    },
    idCreditAnalysisDocumentUploaded: () => {
      return store.getters['dealDetail/idCreditAnalysisDocumentUploaded'];
    }
  },
  methods: {
    submit() {
      let $this = this;
      switch (this.action) {
        case 'review':
          $this.underReviewDocuments();
          break;
        case 'approve':
          $this.acceptDocuments();
          break;
        case 'reject':
          $this.rejectDocumentsModal = true;
          break;
        default:
          break;
      }
    },
    closeRejectModal() {
      this.rejectDocumentsModal = false;
    },
    openUploadCreditAnalysisModal() {
      this.uploadCreditAnalysis = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.credit-analysis-wrapper {
  margin: 20px 0;
}
.actions {
  font-size: 14px;
  font-weight: bold;
  margin: 10px 0 5px;
}
.button {
  margin-top: 0;
}
</style>
