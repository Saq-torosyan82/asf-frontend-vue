<template>
  <div class="wrap-modal">
    <div @click="closedModal" class="close-icon">
      <icon name="close" />
    </div>
    <h1>Upload the document</h1>
    <p>Please upload all the "document name" to confirm your data. You can upload the files in formats: jpg, jpeg, pdf, png, excel</p>
    <div class="upload-button" v-cloak @dragover.prevent="dragover" @dragleave.prevent="dragleave"  @drop.prevent="dropFile($event, doc.type)">
        <icon name="upload-document" /> 
        <p><span>Drag and drop a file here</span> <br> or <br> <a href="#">Browse files</a></p>
      <input type="file" class="file-input"   @change="pickDocument($event, {document_type: doc.type})" :ref="doc.type" accept=".pdf,.jpg,,.png,.xls, .xlsx,.doc,.docx">
    </div>
  </div>
</template>
<script>
import UploadDocumentMixin from "../../mixins/DealCalculator/UploadDocument.mixin";
export default {
  name: "UploadDocuments",
  mixins:[UploadDocumentMixin],
  props: {
    doc: {
      type: Object,
    },
  },
  methods: {
    closedModal() {
      this.$emit('closed', true);
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
