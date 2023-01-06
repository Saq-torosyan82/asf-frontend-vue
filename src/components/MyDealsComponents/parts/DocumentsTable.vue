<template>
  <div class="documents-section">
    <h5 class="counterparties-header">Documents</h5>
    <p class="no-documents-text" v-if="documents.length <= 0">
      You haven’t uploaded any documents yet
    </p>
    <table class="table" v-if="Object.keys(documents).length > 0">
      <thead>
        <tr>
          <td scope="col">Type</td>
          <td scope="col">Upload date</td>
          <td scope="col">Status</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(doc, index) in documents" :key="index">
          <td>{{ doc.label }}</td>
          <td>{{ doc.upload_date | moment('DD.MM.YYYY') }}</td>

          <td v-if="!isLender || !isAdmin" class="document-status">
            <span v-if="doc.is_verified === 1">
              <icon name="complete" /> Verified
            </span>
            <span v-else>
              <icon name="pending" />
              Pending
            </span>
          </td>

          <td v-if="isLender || isAdmin">
            <a href="#" @click.prevent="viewFile(doc.url)">View</a>
          </td>
          <td v-if="isLender || isAdmin">
            <a href="#" @click.prevent="downloadFile(doc.url)">Download</a>
          </td>
        </tr>
      </tbody>
    </table>

    <BaseModal
      :modalType="'view-file'"
      v-show="previewFile"
      @closed="closePreview"
    >
      <embed :type="fileMime" :src="previewFile" width="100%" height="600" />
    </BaseModal>

    <!--    <div-->
    <!--      v-if="-->
    <!--        isAdmin &&-->
    <!--          status === 'in_progress' &&-->
    <!--          reason === 'under_review' &&-->
    <!--          documents.length > 0-->
    <!--      "-->
    <!--    >-->
    <!--      <hr />-->
    <!--      <RejectDocumentsModal-->
    <!--        v-if="rejectDocumentsModal"-->
    <!--        @closed="rejectDocumentsModal = false"-->
    <!--      ></RejectDocumentsModal>-->
    <!--      <a href="#" class="button" @click.prevent="acceptDocuments"-->
    <!--        >Accept Documents</a-->
    <!--      >-->
    <!--      <a href="#" @click.prevent="rejectDocuments()" class="button-reject"-->
    <!--        >Reject Documents</a-->
    <!--      >-->
    <!--    </div>-->
  </div>
</template>
<script>
import axios from 'axios';
import store from '@/store';
import VueDocPreview from 'vue-doc-preview';
import RepositoryFactory from '../../../repositories/RepositoryFactory';
// import RejectDocumentsModal from "./RejectDocumentsModal";
import UserService from '@/services/user.service.js';
import BaseModal from '../../BaseModal';
import DocumentsMixin from '@/mixins/Deal/Documents.mixin';
import DownloadMixin from '@/mixins/User/download.mixin';
const DealRepository = RepositoryFactory.get('deal');
const SystemRepository = RepositoryFactory.get('system');

export default {
  components: {
    // RejectDocumentsModal,
    BaseModal,
  },
  mixins: [DocumentsMixin, DownloadMixin],
  data() {
    return {};
  },
  computed: {
    documents: () => {
      return store.getters['dealDetail/getDocuments'];
    },
    dealId: () => {
      return store.getters['dealDetail/getDealId'];
    },
    isAdmin() {
      return UserService.isAdmin();
    },
    isLender() {
      return UserService.isLender();
    },
    status: () => {
      return store.getters['dealDetail/getStatus'];
    },
    reason: () => {
      return store.getters['dealDetail/getReason'];
    },
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.table {
  tr {
    &:hover {
      background-color: #f6f6f6;
    }
  }
  thead {
    td {
      font-weight: 600;
      white-space: nowrap;
    }
  }
  td {
    border-bottom-width: 0;
    font-size: 13px;
    &:last-child {
      text-align: right;
    }
  }
  .document-status {
    span {
      white-space: nowrap;
    }
    svg {
      margin-right: 3px;
    }
  }
}
/* .button {
  display: inline-block;
  padding: 17px 32px;
  color: white;
  background-color: #3a9eba;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}
.button-reject {
  display: inline-block;
  padding: 17px 32px;
  color: #3a9eba;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
} */
.no-documents-text {
  font-size: 12px;
}
.documents-table .document-status svg {
  margin: 0 3px 1.5px 0;
}
</style>
