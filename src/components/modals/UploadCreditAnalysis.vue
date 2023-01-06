<template>
  <div>
    <div @click="closedModal" class="close-icon">
      <icon name="close" />
    </div>
    <h1>Upload Credit Analysis document</h1>
    <p>Please Upload Credit Analysis document. <br> You can upload the file in PDF format.</p>

    <div v-if="creditAnalysisDocumentUpload" class="progress-bar-wrapper file-wraper inline">
      <!-- <hr>
      {{ fileName }}
      <br>
      {{ fileType }}
      <br>
      {{ fileSize | bytes }}
      <div class="progress">
        <div class="progress-bar" role="progressbar" :style="{'width': progress+'%'}" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
      <span>{{progress}}%</span>
      <br> -->
         <div class="type">
                       {{ fileType }}
                </div>
                                <div class="upload-progress">
                  <div class="inline progress-top">
                    <p class="file-name">
                   {{ fileName }}
                    </p>
                    <p class="file-size">
                  {{ fileSize | bytes }}
                    </p>
                  </div>

                  <div class="progress">
                    <!-- <div
                      class="progress-bar completed"
                      role="progressbar"
                      :style="{ width: 100 + '%' }"
                      aria-valuenow="20"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div> -->
                      <div class="progress-bar" :class="progress == 100 ? 'completed' : ''" role="progressbar" :style="{'width': progress+'%'}" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>

                <Icon class="completed-icon " :class="progress == 100 ? 'completed' : ''" name="completed" />
    </div>


  







    <div v-if="error" class="alert alert-danger" role="alert">
      The document extension is not accepted, it is only accepted .pdf, .doc .docx
    </div>
    <div v-show="!creditAnalysisDocumentUpload" class="upload-button" v-cloak @dragover.prevent="dragover" @dragleave.prevent="dragleave"  @drop.prevent="dropFile($event, doc.type)">
      <icon name="upload-document" />
     <strong>Browse files</strong>
                  <span> or drag and drop here.</span>
              <input type="file" class="file-input"   @change="pickDocument($event, {upload_type: doc.type})" :ref="doc.type" accept=".pdf,.doc,.docx">
    </div>


<a class="done-button button" v-show="progress == 100" @click="closedModal">
Done
</a>
  



  </div>
</template>
<script>
import store from "@/store";
import UploadDocumentMixin from "../../mixins/DealCalculator/UploadDocument.mixin";
import GetDealDetailMixin from "@/mixins/Deal/GetDealDetail.mixin";
import RepositoryFactory from "../../repositories/RepositoryFactory";
const DealRepository = RepositoryFactory.get('deal');
import Icon from "@/components/Icon"
export default {
  name: "UploadCreditAnalysis",
  mixins:[UploadDocumentMixin, GetDealDetailMixin],
  components:{
    Icon
  },
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
      creditAnalysisDocumentUpload: false,
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
      formData.append('upload_type', 'credit_analysis');
      formData.append("nx_data", JSON.stringify(data));
      this.fileName = file.name;
      this.fileSize = file.size;
      this.fileType = this.getFileType(file.type);

      if(this.acceptedFiles.includes(this.getFileExtension(this.fileName))) {
        this.error = false;
        this.creditAnalysisDocumentUpload = true;
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
    }
  }
};
</script>
<style lang="scss" scoped>
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
.done-button{
  display: inline-block;
}
/* .upload-button{
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
} */


.upload-button {
  padding: 20px 40px;
  border: 1px dashed #b6c3d1;
  border-radius: 6px;
  box-shadow: 2px 3px 12px rgba(112, 125, 140, 0.15);
margin-top: 30px;
  font-size: 14px;
  font-weight: 600;
  position: relative;
  cursor: pointer;
  &:hover {
    cursor: pointer;
  }
}
.upload-button span {
  color: #707d8c;
}
.upload-button svg {
  margin-right: 10px;
}
.upload-button strong {
  margin-right: 5px;
  color: var(--primary);
}
.upload-button input {
  opacity: 0;
  position: absolute;
  inset: 0;
  width: 100%;
}
.file-wraper {
  max-width: 500px;
  min-width: 350px;
      width: 100%;
  margin-left: auto;
  font-size: 14px;
  font-weight: 600;
  gap: 16px;
  .type {
    height: 50px;
    width: 50px;
    aspect-ratio: 1;
    line-height: 50px;
    display: inline-block;
    text-align: center;
    background: var(--lightblue-gradient);
    border-radius: 6px;
    color: #5c9aaf;
    font-size: 14px;
    font-weight: 700;
  }
  .upload-progress {
    flex-grow: 1;
  }
  .progress-top {
    max-width: 450px;
    gap: 25px;
    align-items: flex-end;
    padding-bottom: 4px;
    width: 100%;
    p {
      margin: 0;
      font-size: 11px;
    }
    .file-name {
      flex-grow: 1;
      overflow-wrap: anywhere;
      color: #060708;
      text-align: left;
    }
    .file-size {
      color: #a3abad;
      text-align: right;
      white-space: nowrap;
    }
  }

  .progress {
    height: 5px;
    background: #e0e3e4;
    .progress-bar {
      background: #4fc1e0;
      &.completed {
        background: #76e150;
      }
    }
  }

  .completed-icon {
    display: none;
    &.completed {
      display: initial;
    }
  }

}

</style>
<style lang="scss" src="@/assets/styles/modal.scss">
