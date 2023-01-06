<template>
  <div class="wrap-modal">
    <div v-if="!financialDocumentsSuccessfulUploading">
      <div @click="closedModal" class="close-icon">
        <icon name="close" />
      </div>
      <div v-if="error" class="alert alert-danger" role="alert">
        Upload some documents to submit
      </div>
      <h1>Upload supporting documents</h1>
      <p>
        Please upload all the necessary documents to confirm your actual data.
        You can upload the files in formats: jpg, jpeg, pdf, png, excel
      </p>
      <div
        class="upload-button"
        v-cloak
        @dragover.prevent="dragover"
        @dragleave.prevent="dragleave"
        @drop.prevent="dropFiles($event, doc.type)"
      >
        <icon name="upload-document" />
        <p>
          <span>Drag and drop a file here</span> <br />
          or <br />
          <a href="#">Browse files</a>
        </p>
        <input
          type="file"
          multiple
          class="file-input"
          @change="pickDocuments($event, { document_type: doc.type })"
          :ref="doc.type"
          accept=".pdf,.jpg,,.png,.xls, .xlsx,.doc,.docx"
        />
      </div>

      <div v-if="documents.length > 0" class="document-list">
        <div
          v-for="(item, index) in documents"
          :key="index"
          class="file-wraper"
        >
          <div class="type">
            {{ getFileType(item.type) }}
          </div>
          <div>
            <div class="file-description">
              <span class="file-name"> {{ item.name }}</span>
              <span class="size">{{ parseInt(item.size) | bytes }}</span>
            </div>
            <div class="line"></div>
            <div class="progress">
              <div
                class="progress-bar progress-bar-striped"
                role="progressbar"
                :style="{
                  width: filesUploadProgress[index].progress + '%',
                  'background-color':
                    filesUploadProgress[index].progress === 100
                      ? '#76E150'
                      : '#4FC1E0',
                }"
                aria-valuenow="10"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
          <div class="upload-percentages">
            <span v-if="filesUploadProgress[index].progress !== 100"
              >{{ filesUploadProgress[index].progress }}%</span
            >
            <icon
              name="complete"
              v-if="filesUploadProgress[index].progress === 100"
              class="icon-complete"
            />
            <a
              href="#"
              @click.prevent="removeDocument(index)"
              class="remove-document"
              v-if="filesUploadProgress[index].progress === 100"
              >Delete</a
            >
          </div>
        </div>
      </div>
      <div>
        <a
          href="#"
          @click.prevent="submitDocuments"
          class="submit-button"
          :class="disabledBtn ? 'disabledBtn' : ''"
          v-if="documents.length > 0"
          >Submit</a
        >
      </div>
    </div>

    <div v-if="financialDocumentsSuccessfulUploading">
      <div v-if="financialDocumentsSuccessfulUploading">
        <DocumentUploadIcon />
        <h3>Submitting your documents...</h3>
        <LoaderSVG class="loader" />
      </div>
    </div>
  </div>
</template>
<script>
import RepositoryFactory from '../../repositories/RepositoryFactory';
const UserRepository = RepositoryFactory.get('user');
const FinancialRepository = RepositoryFactory.get('financial');
import FinancialMixin from '@/mixins/Common/Financial.mixin';

import LoaderSVG from '@/assets/icons/loader.svg';
import DocumentUploadIcon from '@/assets/icons/document-upload-icon.svg';

export default {
  name: 'UploadFinancialDocuments',
  components: {
    DocumentUploadIcon,
    LoaderSVG,
  },
  mixins: [FinancialMixin],
  props: {
    doc: {
      type: Object,
    },
    tabId: {
      type: Number,
    },
    clubId: {
      type: String,
    },
  },

  filters: {
    bytes: (num) => {
      if (typeof num !== 'number' || isNaN(num)) {
        throw new TypeError('Expected a number');
      }

      var exponent;
      var unit;
      var neg = num < 0;
      var units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

      if (neg) {
        num = -num;
      }

      if (num < 1) {
        return (neg ? '-' : '') + num + ' B';
      }

      exponent = Math.min(
        Math.floor(Math.log(num) / Math.log(1000)),
        units.length - 1
      );
      num = (num / Math.pow(1000, exponent)).toFixed(2) * 1;
      unit = units[exponent];

      return (neg ? '-' : '') + num + ' ' + unit;
    },
  },
  data() {
    return {
      documents: [],
      filesIds: [],
      progress: 0,
      filesUploadProgress: [],
      error: false,
      financialDocumentsSuccessfulUploading: false,
      disabledBtn: true,
    };
  },
  methods: {
    getFileType(type) {
      return type.split('/')[1].substring(0, 3).toUpperCase();
    },
    pickDocuments(event, data) {
      let files = event.target.files;
      this.uploadFile(files, data);
    },
    dropFiles(event, ref) {
      this.uploadFile(event.dataTransfer.files, { document_type: ref });
    },
    dragover(event) {
      event.currentTarget.classList.add('dragover');
    },
    dragleave(event) {
      event.currentTarget.classList.remove('dragover');
    },
    uploadFile(file, data) {
      const formData = new FormData();

      const isIterable = (value) => {
        return Symbol.iterator in Object(value);
      };

      if (isIterable(file)) {
        let i = 0;
        for (let filex of file) {
          formData.append('files[' + i + ']', filex);
          this.documents.push(filex);
          this.filesUploadProgress.push({
            progress: 0,
          });
          i++;
        }
      } else {
        this.documents.push(file);
        this.filesUploadProgress.push({
          progress: 0,
        });
        formData.append('files', file);
      }

      formData.append('nx_data', JSON.stringify(data));
      formData.append('club_id', this.clubId);
      formData.append('section_id', this.tabId);

      let $this = this;
      FinancialRepository.uploadDocuments(formData)
        .then((response) => {
          if (response.data) {
            for (let item of response.data) {
              this.filesIds.push(item);
            }
          }
          this.disabledBtn = false;
          let i = 0;
          for (let item of $this.filesUploadProgress) {
            if (item.progress !== 100) {
              setInterval(function () {
                if (item.progress < 100) {
                  item.progress++;
                }
              }, 20);
            }
            i++;
          }
        })
        .catch((error) => {
          console.error(error);
          let i = 0;
          for (let item of $this.filesUploadProgress) {
            item.progress = 100;
            i++;
          }
        });
    },
    removeDocument(index) {
      if (this.filesIds[index]) {
        let $this = this;
        $this.$loading(true);
        FinancialRepository.deleteDocument(this.filesIds[index])
          .then((response) => {
            $this.$loading(false);
            $this.documents.splice(index, 1);
            $this.filesUploadProgress.splice(index, 1);
            $this.filesIds.splice(index, 1);
          })
          .catch((error) => {
            console.error(error);
            $this.$loading(false);
          });
      } else {
        this.documents.splice(index, 1);
        this.filesUploadProgress.splice(index, 1);
      }
    },
    submitDocuments() {
      if (this.filesIds.length > 0) {
        this.error = false;
        let formData = {
          section_id: this.tabId,
          club_id: this.clubId,
          filesIds: this.filesIds,
        };
        this.financialDocumentsSuccessfulUploading = true;
        let $this = this;
        FinancialRepository.submitDocuments(formData)
          .then((response) => {
            $this.financialDocumentsSuccessfulUploading = false;
            $this.closedModal();
            $this.disabledBtn = false;
            $this.$emit('documentsSubmitted', 'success');
          })
          .catch((error) => {
            console.error(error);
            $this.$emit('documentsSubmitted', error.message);
            this.financialDocumentsSuccessfulUploading = true;
            $this.closedModal();
          });
      } else {
        this.error = true;
      }
    },
    closedModal() {
      this.documents = [];
      this.filesUploadProgress = [];
      this.filesIds = [];
      this.$emit('closed', true);
    },
  },
};
</script>
<style scoped>
.wrap-modal {
  width: 80%;
  position: relative;
}
h1 {
  font-size: 16px;
  font-weight: bold;
  color: #707d8c;
}
p {
  font-size: 15px;
  font-weight: 400;
  max-width: 400px;
  display: block;
  margin: 0 auto;
}
.submit-button {
  margin-top: 15px;
  display: inline-block;
  background-color: #3a9eba;
  color: white;
  font-size: 14px;
  font-weight: 700;
  padding: 14px 20px;
  border-radius: 4px;
  cursor: pointer;
  opacity: 1;
  transition: opacity 1s ease;
}
.submit-button.disabledBtn {
  opacity: 0;
  cursor: not-allowed;
}
.upload-button {
  border: 1px dashed #b6c3d1;
  padding: 16px;
  box-shadow: 2px 3px 12px rgba(112, 125, 140, 0.15);
  border-radius: 6px;
  max-width: 180px;
  margin: 32px auto 0;
  position: relative;
}
.upload-button[drop-active='true'] {
  border: 2px solid #b6c3d1;
}
.upload-button p {
  font-size: 10px;
  font-weight: 400;
  color: #707d8c;
}
.upload-button span {
  font-size: 12px;
  font-weight: 600;
}
.upload-button .file-input {
  position: absolute;
  left: 0;
  opacity: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.upload-button .file-input:hover {
  cursor: pointer;
}
.upload-button a {
  font-size: 14px;
  font-weight: 700;
}
.file-wraper {
  display: grid;
  grid-template-columns: 10% 67% 20%;
  grid-column-gap: 10px;
  align-items: end;
  margin-top: 15px;
  font-size: 12px;
}
.type {
  background: linear-gradient(156.09deg, #9de8fc -9.74%, #ffffff 111.18%);
  border-radius: 6px;
  font-size: 12px;
  color: #4fc1e0;
  font-weight: 700;
  padding: 10px;
}
.file-description {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}
.file-name {
  color: #060708;
  font-size: 12px;
  font-weight: 400;
}
.size {
  color: #a3abad;
  font-size: 12px;
  font-weight: 400;
}
.progress {
  height: 4px;
}

.upload-percentages span {
  font-size: 14px;
  color: #666f72;
}
.upload-percentages a {
  font-size: 12px;
  color: #369eba;
  font-weight: 700;
}
.icon-complete {
  margin-right: 10px;
  width: 16px;
  height: 16px;
}
</style>
<style lang="scss" src="@/assets/styles/modal.scss" />
