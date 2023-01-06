<template>
  <div>
    <table>
      <tbody>
      <template v-for="(docs) in documents">
        <tr v-for="document in docs.items" :key="document.id">
          <td class="document-txt">{{ document.name }}</td>
          <td class="document-txt">{{ docs.label }}</td>
          <td class="actions">
            <span v-if="document.status === documentStatuses.uploaded">
              <icon name="waiting" class="icon"/> {{ document.status_label }}
            </span>
            <span v-else-if="document.status === documentStatuses.approved">
              <icon name="approved" class="icon" />
              {{ document.status_label }}
            </span>
            <span v-else-if="document.status === documentStatuses.rejected">
              <icon name="rejected" class="icon" />
              {{ document.status_label }}
            </span>
            <a href="#" @click.prevent="viewFile(document.url)"> View </a>
            <a href="#" @click.prevent="downloadFile(document.url)">
              Download
            </a>
            <a href="#" @click.prevent="deleteDocument(document.upload_id)" v-if="document.status === documentStatuses.uploaded"> Delete </a>
          </td>
        </tr>
      </template>
    </tbody>
    </table>
    <div v-if="documents == null || documents.length === 0" class="no-documents">
      <h5>There are no documents</h5>
    </div>
    <BaseModal
        :modalType="'view-file'"
        v-show="previewFile"
        @closed="closePreview"
    >
      <embed :type="fileMime" :src="previewFile" width="100%" height="600" />
    </BaseModal>
  </div>
</template>

<script>
import RepositoryFactory from '@/repositories/RepositoryFactory';
const FinancialRepository = RepositoryFactory.get('financial');
import DownloadMixin from '@/mixins/User/download.mixin';
import BaseModal from '@/components/BaseModal';
import store from "@/store";

export default {
  components: {
    BaseModal
  },
  mixins: [DownloadMixin,],
  mounted() {
    this.getDocuments()
  },
  data() {
    return {
      documents: [],
      documentStatuses: {
        uploaded: 0,
        pending: 1,
        approved: 2,
        rejected: 3
      },
    };
  },
  methods: {
    getDocuments() {
      let $this = this;
      FinancialRepository.getDocuments().then((response) => {
        $this.documents =  response.data;
      }).catch((error) => {
        $this.documents = [];
        console.error(error);
      })
    },
    deleteDocument(id) {
      let $this = this;
      $this.$loading(true);
      FinancialRepository.deleteDocument(id).then(() => {
        $this.getDocuments();
        $this.$loading(false);
      }).catch((error) => {
        console.error(error);
        $this.$loading(false);
      })
    }
  },
};
</script>

<style scoped>
table {
  width: 100%;
}
table tbody td {
  padding-top: 10px;
  padding-bottom: 10px
}
table tbody td:last-child {
  padding-right: 15px
}
table tbody td:first-child {

}
table tbody td:not(:last-child) {
  text-align: left;
  padding-left: 15px
}
.document-txt {
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 400;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 200px;
  overflow-x: hidden;
}
.actions {
  text-align: right;
  font-weight: 700;
  font-size: 14px;
  padding-right: 10px;
}
.actions a {
  margin-left: 10px
}
.actions span {
  font-weight: 600;
  font-size: 12px;
}
.actions .icon {
  width: 16px;
  height: 16px;
  margin-right: 5px;
}
.no-documents h5 {
  margin-top: 40px;
  text-align: center;
  font-size: 14px;
  color: #93a0ae;
}
</style>
