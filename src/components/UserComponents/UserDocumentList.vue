<template>
  <div>
    <div class="document-list">
      <div v-for="(doc, key) in docs" :key="key">
        <div v-if="doc.is_multiple">
          <div class="item" v-for="(subDoc, index) in doc.data" :key="index">
            <p class="document-name">{{ doc.label }} {{ isLender && doc.borrower_name ? doc.borrower_name : '' }}</p>

            <template v-if="subDoc.url !== ''">
              <a
                href="#"
                @click.prevent="viewFile(subDoc.url)"
                class="link-text"
                >View</a
              >
              <a
                href="#"
                @click.prevent="downloadFile(subDoc.url)"
                class="link-text"
                ><icon name="download-document" /> Download</a
              >
            </template>

            <template v-if="isLender">
              <p>{{ capitalizeFirstLetter(subDoc.status) }}</p>
            </template>

            <template v-else>
              <template v-if="subDoc.is_verified === 1">
                <span class="verification-status inline">
                  <icon name="completed-deal" />
                  <p>Verified</p>
                </span>
              </template>

              <template v-if="subDoc.is_verified === 2">
                <span class="verification-status inline">
                  <icon name="rejected" />
                  <p>Rejected</p>
                </span>
              </template>
              <template
                v-if="subDoc.is_verified === 0"
                @click.prevent="removeDocument(subDoc.id)"
              >
                <a href="#" class="link-text">Delete</a>
              </template>

              <template
                v-if="
                  subDoc.is_verified === 0 &&
                  subDoc.url === '' &&
                  subDoc.id === ''
                "
                @click.prevent="showUploadDocumentsModal(subDoc)"
              >
                <a href="#" class="link-text">Upload</a>
              </template>
            </template>

            <!-- <span v-if="subDoc.is_verified === 1">
              <p>Verified</p>
              <icon name="completed-deal" />
            </span> -->

            <!-- <span v-if="subDoc.is_verified === 2">
              <p>Rejected</p>
              <icon name="rejected" />
            </span>
            <span v-if="subDoc.url !== '' && subDoc.id !== ''">
              <a
                href="#"
                @click.prevent="viewFile(subDoc.url)"
                class="link-text"
                >View</a
              >
              <a
                href="#"
                @click.prevent="downloadFile(subDoc.url)"
                class="link-text"
                ><icon name="download-document" /> Download</a
              >
            </span> -->
          </div>
        </div>

        <div class="item inline">
          <p class="document-name">{{ doc.label }} {{ isLender && doc.borrower_name ? doc.borrower_name : '' }}</p>
          <template v-if="doc.is_verified === 1">
            <span class="verification-status inline">
              <icon name="completed-deal" />
              <p>Verified</p>
            </span>
          </template>

          <template v-if="doc.is_verified === 2">
            <span class="verification-status inline">
              <icon name="rejected" />
              <p>Rejected</p>
            </span>
          </template>
          <template v-if="doc.url !== ''">
            <a href="#" @click.prevent="viewFile(doc.url)" class="link-text"
              >View</a
            >
            <a
              href="#"
              @click.prevent="downloadFile(doc.url)"
              class="link-text inline"
            >
              Download</a
            >
          </template>

          <template v-if="isLender">
            <p v-if="doc.status" class="status">
              <span>{{ capitalizeFirstLetter(doc.status) }}</span>
              <AcceptedSVG v-if="doc.status === 'accepted'" />
              <RejectedSVG v-if="doc.status === 'rejected'" />
            </p>
          </template>

          <template v-else>
            <template
              v-if="doc.is_verified === 0 && doc.url !== ''"
              @click.prevent="removeDocument(doc.id)"
              ><a href="#" class="link-text">Delete</a></template
            >
            <span
              v-if="doc.url === ''"
              @click.prevent="showUploadDocumentsModal(doc)"
              ><a href="#" class="link-text">Upload</a></span
            >
          </template>

          <!-- <span v-if="doc.is_verified === 1">
            <p>Verified</p>
            <icon name="completed-deal" />
          </span>

          <span v-if="doc.is_verified === 2">
            <p>Rejected</p>
            <icon name="rejected" />
          </span> -->

          <!-- <span v-if="doc.url !== '' && doc.id !== ''">
            <a href="#" @click.prevent="viewFile(doc.url)" class="link-text"
              >View</a
            >
            <a href="#" @click.prevent="downloadFile(doc.url)" class="link-text"
              ><icon name="download-document" /> Download</a
            >
          </span> -->
        </div>
      </div>
      <div v-if="docs == null || docs.length == 0" class="no-documents">
        <h5>There are no documents</h5>
      </div>
    </div>
    <BaseModal
      v-if="showUploadModal && doc"
      :doc="doc"
      :modalType="'upload-documents'"
      @closed="closeUploadDocumentsModal()"
    ></BaseModal>

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
import RepositoryFactory from '../../repositories/RepositoryFactory';
const UserRepository = RepositoryFactory.get('user');
import UserService from '@/services/user.service.js';

import BaseModal from '../BaseModal';
import DownloadMixin from '@/mixins/User/download.mixin';

import UploadDocumentMixin from '../../mixins/DealCalculator/UploadDocument.mixin';

import AcceptedSVG from '@/assets/icons/accepted.svg';
import RejectedSVG from '@/assets/icons/rejected1.svg';

export default {
  name: 'UserDocumentList',
  components: {
    BaseModal,
    AcceptedSVG,
    RejectedSVG,
  },
  props: {
    docs: {
      type: Array,
    },
    type: {
      type: String,
      default: 'term_sheets',
    },
  },
  data() {
    return {
      showUploadModal: true,
      doc: null,
    };
  },
  computed: {
    isLender() {
      return UserService.isLender();
    },
  },
  mounted() {},
  mixins: [UploadDocumentMixin, DownloadMixin],
  methods: {
    removeDocument(id) {
      let $this = this;
      $this.$loading(true);
      UserRepository.removeDocument(id)
        .then((response) => {
          $this.$emit('updateList', true);
          $this.$loading(false);
        })
        .catch((error) => {
          $this.$loading(false);
        });
    },
    showUploadDocumentsModal(doc) {
      this.doc = doc;
      this.showUploadModal = !this.showUploadModal;
    },
    closeUploadDocumentsModal() {
      this.doc = null;
      this.showUploadModal = false;
      this.$emit('updateList', true);
    },
    capitalizeFirstLetter(string) {
      if (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/* .documents-header h3 {
  color: white;
  font-weight: 700;
  margin: 0 0 0 12px;
} */
/*
.document-list {
  margin-top: 20px;
}
*/

.document-list .item {
  padding: 10px 15px;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
  overflow-x: hidden;
  &:hover {
    background-color: #f6f6f6;
  }
  .document-list {
    font-size: 14px;
  }
  .document-name {
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: calc(100% - 100px);
    &:hover {
      overflow: visible;
      white-space: normal;
    }
  }
  .verification-status {
    p {
      font-size: 12px;
      font-weight: 600;
    }
  }
}
.document-list p {
  display: inline-block;
  margin-bottom: 0;
}
.document-list span {
  float: right;
}
.document-list svg {
  height: 16px;
  width: 16px;
  margin-right: 5px;
}

.no-documents {
  h5 {
    margin-top: 40px;
    text-align: center;
    font-size: 14px;
    color: #93a0ae;
  }
}

.status {
  font-size: 14px;
  font-weight: 400;
  display: inline-flex !important;
  align-items: center;

  span::after {
    content: '\00a0\00a0\00a0';
  }
}
</style>
