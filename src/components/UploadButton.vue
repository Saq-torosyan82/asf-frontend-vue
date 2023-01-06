<template>
  <div class="upload-area">
    <div class="upload-button">
      <icon name="upload-document-solid" />
      <p>
        <span> Browse files </span>
        or drag and drop here
        <input type="file" class="file-input" @change="picFile" multiple>
      </p>
    </div>
    <div v-if="attachements.length > 0" class="upload-preview">
      <div v-for="(attachement, index) in attachements" class="uploaded-file" :key="index">
        {{ attachement.init_file_name }} <span @click="deleteFile(attachement.id)"><Icon name="delete" class="delete-icon" /></span>
      </div>
    </div>
  </div>


</template>
<script>
import CommunicationsRepository from "@/repositories/Inbox/CommunicationsRepository";
import Icon from '@/components/Icon';

export default {
  components: {
    Icon
  },
  data(){
    return {
      fileIds: [],
      attachements : []
    }
  },
  props: {
    emptyAttachments: {
      type:Boolean,
      default: false
    }
  },
  watch: {
    emptyAttachments() {
      this.attachements = []
    }
  },
  methods:{
    picFile(event){
      const self = this;
      let formData = new FormData()
      for(let i=0; i < event.target.files.length; i++) {
        formData.append("attachements[]", event.target.files[i])
      }

      CommunicationsRepository.attachmentsUpload(formData)
          .then((response) => {
            self.attachements = response.data.attachements;
            self.fileIds = response.data.attachements.map(at => at.id);
            this.$emit("set_files_ids", self.fileIds)
          })
          .catch((error) => {
            console.error("Error: " + error)
          })
    },
    deleteFile(uploadId) {
      const self = this;
      CommunicationsRepository.deleteAttachement(uploadId)
          .then((res)=>{
            self.attachements = self.attachements.filter(at => at.id !== uploadId);
            const idIndex = self.fileIds.indexOf(uploadId);
            if (idIndex > -1) {
              self.fileIds.splice(idIndex, 1);
            }
          })
          .catch((error) => {
            console.error("Error: " + error)
          })
    }
  }
};
</script>
<style lang="scss" src="@/assets/styles/Inbox/uploadArea.scss" scoped></style>
