<template>
  <div>
    <SheetsTable class="documents-table">
      <thead>
      <tr>
        <td colspan="5" v-if="Object.keys(documents).length > 0">Uploaded documents confirm actual data</td>
        <td colspan="5" v-else>There are no financial documents</td>
      </tr>
      <tr class="bold" v-if="!showDocuments && Object.keys(documents).length > 0">
        <td>Documents</td>
        <td>Upload date</td>
        <td>Status</td>
        <td></td>
        <td>Actions</td>
      </tr>
      </thead>
      <tbody v-if="!showDocuments && Object.keys(documents).length > 0">
      <tr v-for="(document, index) in documents" :key="index">
        <td>{{ document.label }}</td>
        <td>{{ document.items[0]['upload_date'] | moment('DD.MM.YYYY') }}</td>
        <td>
            <span v-if="documentsStatuses[document.label][0].status === documentStatuses.approved">
              <icon name="complete" /> {{ documentsStatuses[document.label][0].status_label }}
            </span>
          <span v-else-if="documentsStatuses[document.label][0].status === documentStatuses.rejected">
              <icon name="rejected" />
              {{ documentsStatuses[document.label][0].status_label }}
            </span>
          <span v-else-if="documentsStatuses[document.label][0].status === documentStatuses.uploaded">
              <icon name="waiting" />
              {{ documentsStatuses[document.label][0].status_label }}
            </span>
          <span v-else>
              <icon name="pending" />
              {{ documentsStatuses[document.label][0].status_label }}
            </span></td>
        <td class="inline admin-actions">
          <input
              v-model="documentsStatuses[document.label][0].status"
              :value="documentStatuses.approved"
              :id="'admin-financial-document-approve_' + documentsStatuses[document.label][0].id"
              type="radio"
              :name="'admin-financial-document-status' + documentsStatuses[document.label][0].id"
              class="form-check-input"
              :disabled=" documentsStatuses[document.label][0].status !== documentStatuses.pending"
              :checked=" documentsStatuses[document.label][0].status === documentStatuses.approved"
              @change="changedStatus(document.label, document.items, true, false)"
          /><label :for="'admin-financial-document-approve_' + documentsStatuses[document.label][0].id"
        >Approve</label
        >
          <input
              v-model="documentsStatuses[document.label][0].status"
              :value="documentStatuses.rejected"
              :id="'admin-financial-document-reject_' + documentsStatuses[document.label][0].id"
              type="radio"
            :name="'admin-financial-document-status' + documentsStatuses[document.label][0].id"
            class="form-check-input reject"
            :disabled=" documentsStatuses[document.label][0].status !== documentStatuses.pending"
            :checked=" documentsStatuses[document.label][0].status === documentStatuses.rejected"
            @change="changedStatus(document.label,document.items, false, true)"
          /><label
            :for="'admin-financial-document-reject_' +  documentsStatuses[document.label][0].id"
            class="reject"
        >Reject</label
        >
        </td>
        <td class="actions">
          <a href="#" @click.prevent="showSheetDocuments(document.items, document.label)"> View </a>
          <a href="#" @click.prevent="downloadFiles(document.items)">
            Download
          </a>
        </td>
      </tr>
      </tbody>
      <tbody v-else-if="showDocuments" class="sheetDocuments">
        <tr v-for="(doc, index) in sheetDocuments" :key="index">
          <td>{{index + 1}}. {{ doc.name }}</td>
          <td class="actions">
            <a href="#" @click.prevent="viewFile(doc.url)"> View </a>
            <a href="#" @click.prevent="downloadFile(doc.url)"> Download </a>
          </td>
        </tr>
        <tr>
          <td class="admin-actions">
            <input
                v-model="documentsStatuses[selectedLabel][0].status"
                :value="documentStatuses.approved"
                :id="'admin-financial-document-approve_' + documentsStatuses[selectedLabel][0].id"
                type="radio"
                :name="'admin-financial-document-status' + documentsStatuses[selectedLabel][0].id"
                class="form-check-input"
                :disabled=" documentsStatuses[selectedLabel][0].status !== documentStatuses.pending"
                :checked=" documentsStatuses[selectedLabel][0].status === documentStatuses.approved"
                @change="changedStatus(selectedLabel,sheetDocuments, true, false)"
            /><label :for="'admin-financial-document-approve_' + documentsStatuses[selectedLabel][0].id"
          >Approve</label
          ></td>
        </tr>
        <tr>
          <td class="admin-actions">
            <input
                v-model="documentsStatuses[selectedLabel][0].status"
                :value="documentStatuses.rejected"
                :id="'admin-financial-document-reject_' + documentsStatuses[selectedLabel][0].id"
                type="radio"
                :name="'admin-financial-document-status' + documentsStatuses[selectedLabel][0].id"
                class="form-check-input reject"
                :disabled=" documentsStatuses[selectedLabel][0].status !== documentStatuses.pending"
                :checked=" documentsStatuses[selectedLabel][0].status === documentStatuses.rejected"
                @change="changedStatus(selectedLabel, sheetDocuments, false, true)"
            /><label
              :for="'admin-financial-document-reject_' +  documentsStatuses[selectedLabel][0].id"
              class="reject"
          >Reject</label
          >
          </td>
        </tr>
      </tbody>
    </SheetsTable>
    <BaseModal
        :modalType="'view-file'"
        v-show="previewFile"
        @closed="closePreview"
    >
      <embed :type="fileMime" :src="previewFile" width="100%" height="600" />
    </BaseModal>
    <RejectFinDocumentModal
        v-if="rejectDocumentsModal"
        @closed="closeRejectModal"
        :docData="data"
    ></RejectFinDocumentModal>
  </div>
</template>

<script>
import SheetsTable from '../SheetsTable.vue';
import RejectFinDocumentModal from '@/components/Financials/parts/RejectFinDocumentModal';
import RepositoryFactory from '../../../repositories/RepositoryFactory';
const FinancialRepository = RepositoryFactory.get('financial');
import DownloadMixin from '@/mixins/User/download.mixin';
import FinancialMixin from '@/mixins/Financial/Financial.Mixin';
import BaseModal from '../../BaseModal';
import store from "@/store";

export default {
  components: {
    SheetsTable,
    BaseModal,
    RejectFinDocumentModal
  },
  mixins: [DownloadMixin, FinancialMixin],
  data() {
    return {
      documentStatuses: {
        uploaded: 0,
        pending: 1,
        approved: 2,
        rejected: 3
      },
      sheetDocuments: {},
      selectedLabel: null,
      showDocuments: false
    };
  },
  props: {
    changedClub: Boolean
  },
  watch: {
    changedClub() {
      this.showDocuments = false
    }
  },
  methods: {
    downloadFiles (documents) {
      documents.map((document) => {
        this.downloadFile(document.url)
      })
    },
    showSheetDocuments (documents, label) {
      this.showDocuments = true;
      this.sheetDocuments = documents
      this.selectedLabel = label
    },
    closeRejectModal() {
      this.rejectDocumentsModal = false;
      this.isRejectedDocument = false;
    },
    changedStatus(sheet, items, is_approved, is_rejected) {
      let ids = [];
      Object.values(items).forEach((e) => {
        if (e.status === this.documentStatuses.pending) {
          ids.push(e.id)
        }
      })
      this.data = {
        'ids': ids,
        'is_approved': is_approved,
        'is_rejected': is_rejected,
        'reason': null,
        'sheet': sheet,
        'user_id': items[0].user_id
      };
      this.isRejectedDocument = is_rejected;
      this.changeStatus(this.data)
      this.showDocuments = false
    },
  },
};
</script>

<style scoped>
tbody tr:hover td {
}
table.documents-table tbody tr:hover td {
  background-color: transparent;
}
thead tr:first-of-type td {
  padding-top: 15px;
  font-size: 16px;
}
table thead td:not(:last-child),
table tbody td:not(:last-child) {
  text-align: left;
}

.admin-actions input {
  margin-right: 7px;
  height: 19px;
  padding-right: 10px;
  border-radius: 50%;
  border: 2px solid #d7dbdc;
  width: 20px;
}
.admin-actions input[type='radio']:checked {
  border:none;
}
.admin-actions input[type='radio']:disabled, .admin-actions input[type='radio']:disabled + label {
  color: #C4C4C4
}
.admin-actions input[type='radio']:checked:disabled {
  box-shadow: 0 0 0 5px #C4C4C4 inset;
}
.admin-actions label,
.actions a {
  font-size: 14px;
  font-weight: 700;
  color: #3a9eba;
}
.admin-actions label.reject {
  color: #f61c0d;
}
.admin-actions input.reject:checked {
  box-shadow: 0 0 0 5px #f61c0d inset
}
.admin-actions #admin-financial-document-reject {
  accent-color: #f61c0d;
}
.admin-actions label:not(:last-child),
.actions a:not(:last-child) {
  margin-right: 15px;
}
.sheetDocuments td:first-child {
  font-weight: 700;
}
.sheetDocuments .actions {
  padding-left: 24px
}
</style>
