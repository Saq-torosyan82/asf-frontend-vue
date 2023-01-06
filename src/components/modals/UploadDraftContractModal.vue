<template>
  <div>
    <div @click="closedModal" class="close-icon">
      <icon name="close" />
    </div>
    <h1>Upload the draft contract</h1>
    <p>Please upload the Contract you would  like to send to the Borrower and the Lender . <br> You can upload the file in the pdf format</p>

    <div v-if="contractUpload" class="progress-bar-wrapper">
      <hr>
      {{ fileName }}
      <br>
      {{ fileType }}
      <br>
      {{ fileSize | bytes }}
      <div class="progress">
        <div class="progress-bar" role="progressbar" :style="{'width': progress+'%'}" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
      <span>{{progress}}%</span>
      <br>
      <a href="#" @click.prevent="deleteContract">Delete</a>
    </div>

    <div v-if="error" class="alert alert-danger" role="alert">
      The document extension is not accepted, it is only accepted .pdf, .doc .docx
    </div>
    <div v-show="!contractUpload" class="upload-button" v-cloak @dragover.prevent="dragover" @dragleave.prevent="dragleave"  @drop.prevent="dropFile($event, doc.type)">
      <icon name="upload-document" />
      <p><span>Drag and drop a file here</span> <br> or <br> <a href="#">Browse files</a></p>
      <input type="file" class="file-input"   @change="pickDocument($event, {upload_type: doc.type})" :ref="doc.type" accept=".pdf,.doc,.docx">
    </div>
  </div>
</template>
<script>
import store from "@/store";
import UploadDocumentMixin from "../../mixins/DealCalculator/UploadDocument.mixin";
import GetDealDetailMixin from "@/mixins/Deal/GetDealDetail.mixin";

import RepositoryFactory from "../../repositories/RepositoryFactory";
const DealRepository = RepositoryFactory.get('deal');

export default {
  name: "UploadDraftContractModal",
  mixins:[UploadDocumentMixin, GetDealDetailMixin],
  props: {
    doc: {
      type: Object,
    },
  },
  data() {
    return {
      progress: 0,
      fileName: '',
      fileType: '',
      fileSize: '',
      contractUpload: false,
      error: false,
      acceptedFiles: [
          'pdf',
          'doc',
          'docx'
      ]
    }
  },
  computed: {
    dealId: () => {
      return store.getters['dealDetail/getDealId'];
    }
  },
  methods: {
    closedModal() {
      this.$emit('closed', true);
    },
    dropFile(event, ref) {
      this.uploadFile(event.dataTransfer.files[0], {upload_type: ref});
    },
    uploadFile(file, data) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append("nx_data", JSON.stringify(data));
      this.fileName = file.name;
      this.fileSize = file.size;
      this.fileType = this.getFileType(file.type);

      if(this.acceptedFiles.includes(this.getFileExtension(this.fileName))) {
        this.error = false;
        this.contractUpload = true;
        let $this = this;
        DealRepository.upload(this.dealId, formData).then((response) => {
          $this.progress = 100;
          setTimeout(function(){
            $this.getDealDetail($this.dealId)
              }, 1000)

          $this.$loading(false);
        }).catch((error) => {
          console.error(error);
          $this.$loading(false);
        })
      }else {
        this.error = true;
      }
    },
    deleteContract() {
      let $this = this;
      $this.$loading(true);
      this.contractUpload = false;
      DealRepository.deleteContract(this.dealId).then((response) => {
        $this.fileName = '';
        $this.fileSize = '';
        $this.fileType = '';
        this.contractUpload = false;
        $this.getDealDetail($this.dealId);
        $this.$loading(false);
      }).catch((error) => {
        console.error(error);
        $this.$loading(false);
      })
    }
  }
};
</script>
<style  scoped>
.wrap-modal{
  width:80%;
  position: relative;
}
h1{
  font-size: 16px;
  font-weight: bold;
  color: #707D8C;
}
p{
  font-size: 15px;
  font-weight: 400;
  max-width: 400px;
  display: block;
  margin: 0 auto;
}
.upload-button{
  border: 1px dashed #B6C3D1;
  padding:16px;
  box-shadow: 2px 3px 12px rgba(112, 125, 140, 0.15);
  border-radius: 6px;
  max-width: 180px;
  margin: 32px auto 0;
  position: relative;
}
.upload-button[drop-active=true] {
  border: 2px solid #B6C3D1;
}
.upload-button p{
  font-size: 10px;
  font-weight:400;
  color: #707D8C;
}
.upload-button span{
  font-size: 12px;
  font-weight:600;

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
.upload-button a{
  font-size: 14px;
  font-weight: 700;
}
</style>
<style lang="scss" src="@/assets/styles/modal.scss">
