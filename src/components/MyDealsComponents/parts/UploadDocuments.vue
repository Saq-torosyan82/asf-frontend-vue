<template>
  <div class="upload-documents">
    <div class="document-list">
      <div v-for="(document, index) in documents" :key="index" class="document">
        <h5 class="document-name">{{ document }}</h5>
        <UploadButton />
      </div>
    </div>
    <SingleCheckBox class="checkbox-input"
      >I confirm that each copy document prepared and/or provided to SportsFi is
      true and correct, complete and in full force and effect and has not been
      amended or superseded as at a date no earlier than the date of the
      receivable contract</SingleCheckBox
    >
    <SquareButton background="#3a9eba" color="#ffffff" maxWidth="215px"
      >Submit the documents</SquareButton
    >
  </div>
</template>
<script>
import UploadButton from '@/components/UploadButton';
import SingleCheckBox from '@/components/SingleCheckBox';
import SquareButton from '@/components/SquareButton';
export default {
  components: { UploadButton, SingleCheckBox, SquareButton },
  props: {
    documents: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style>
.counterparties-header {
  margin-bottom: 0px;
}
.upload-documents {
  margin-top: 20px;
}
.document {
  display: inline-flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin-top: 20px;
}
.document:first-child {
  margin-top: 0px;
}
.document-name {
  font-weight: bold;
  font-size: 14px;
  color: #707d8c;
  margin-bottom: 0;
}
.checkbox-input {
  margin: 32px 0 24px;
}
</style>
