<template>
  <div class="document-upload">
    <a @click="prevStep()" class="back-link"
      ><icon name="back-arrow" />Back to payment schedule</a
    >
    <h3 class="sectionHeading mb-12">Upload supporting documents</h3>
    <p class="sectionDescription">
      Please upload all the necessary documents to confirm your data. You can
      upload the files in formats: jpg, jpeg, pdf, png, excel.
    </p>

    <div class="document-list">
      <div v-for="(doc, key) in documents" :key="key">
        <div v-if="doc" class="document">
          <h5>{{ doc.label ? doc.label : '' }}</h5>

          <div v-if="doc.is_multiple">
            <div v-if="doc.data" class="multiple-documents">
              <div
                v-for="(item, index) in doc.data"
                :key="index"
                class="file-wraper inline"
              >
                <div class="type">
                  {{ getFileType(item.file_type) }}
                </div>
                <div class="upload-progress">
                  <div class="inline progress-top">
                    <p class="file-name">
                      {{ item.file_name }}
                    </p>
                    <p class="file-size">
                      {{ parseInt(item.file_size) | bytes }}
                    </p>
                  </div>

                  <div class="progress">
                    <div
                      class="progress-bar completed"
                      role="progressbar"
                      :style="{ width: 100 + '%' }"
                      aria-valuenow="20"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
                <Icon class="completed-icon completed" name="completed" />

                <a
                  href="#"
                  @click.prevent="removeDocument(item.id)"
                  class="remove-document"
                  >Delete</a
                >
              </div>
              <div class="multiple-documents-upload inline">
                <a class="upload-button simple-link">
                  <h3>Upload more ></h3>
                  <input
                    type="file"
                    class="file-input"
                    @change="pickDocuments($event, { document_type: doc.type })"
                    :ref="doc.type"
                    accept=".pdf,.jpg,,.png,.xls, .xlsx,.doc,.docx"
                    multiple
                  />
                </a>
              </div>
            </div>
          </div>

          <div v-else>
            <div class="multiple-documents" v-if="doc.url !== ''">
              <div v-if="doc.url !== ''" class="file-wraper inline">
                <div class="type">
                  {{ getFileType(doc.file_type) }}
                </div>
                <div class="upload-progress">
                  <div class="inline progress-top">
                    <p class="file-name">
                      {{ doc.file_name }}
                    </p>
                    <p class="file-size">
                      {{ parseInt(doc.file_size) | bytes }}
                    </p>
                  </div>

                  <div class="progress">
                    <div
                      class="progress-bar completed"
                      role="progressbar"
                      :style="{ width: 100 + '%' }"
                      aria-valuenow="20"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>

                <Icon class="completed-icon completed" name="completed" />

                <a
                  href="#"
                  @click.prevent="removeDocument(doc.id)"
                  class="remove-document"
                  >Delete</a
                >
              </div>
            </div>
            <div class="multiple-documents" v-if="doc.url === ''">
              <a
                v-if="doc.url === ''"
                class="upload-button"
                v-cloak
                @dragover.prevent="dragover"
                @dragleave.prevent="dragleave"
                @drop.prevent="dropFile($event, doc.type)"
              >
                <icon name="upload-document" /> <strong>Browse files</strong>
                <span> or drag and drop here.</span>
                <input
                  type="file"
                  class="file-input"
                  @change="pickDocument($event, { document_type: doc.type })"
                  :ref="doc.type"
                  accept=".pdf,.jpg,,.png,.xls, .xlsx,.doc,.docx"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="confirmation">
      <div
        v-if="$v.form.confirmation.$error && $v.form.confirmation.$dirty"
        class="alert alert-danger"
        role="alert"
      >
        You need to confirm Documents before proceeding
      </div>

      <input id="confirmation" v-model="form.confirmation" type="checkbox" />
      <label for="confirmation"
        >I confirm that each copy document prepared and/or provided to SportsFi
        is true and correct, complete and in full force and effect and has not
        been amended or superseded as at a date no earlier than the date of the
        receivable contract</label
      >
    </div>
    <div class="calculator-footer">
      <a class="next-step" @click="nextStep()">Proceed with deal</a>
      <a class="next-step save-later" @click="saveLater()">Save for later</a>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import { required } from 'vuelidate/lib/validators';
import Icon from '@/components/Icon';
import UploadDocumentMixin from '@/mixins/DealCalculator/UploadDocument.mixin';
import StepsNavigationMixin from '@/mixins/DealCalculator/StepsNavigation.mixin';
import RepositoryFactory from '../../../repositories/RepositoryFactory';
const UserRepository = RepositoryFactory.get('user');
const DealRepository = RepositoryFactory.get('deal');
import SubmitDealDataMixin from '@/mixins/DealCalculator/SubmitDealData.mixin';

export default {
  name: 'FifthStep',
  components: {
    Icon,
  },
  data() {
    return {
      documents: {
        contact: null,
        supportingInfo: null,
        lastAccounts: null,
        managementAccount: null,
        balanceSheets: null,
        incomeStatements: null,
        cashFlowStatements: null,
      },
      form: {
        confirmation: '',
      },
    };
  },
  mixins: [UploadDocumentMixin, StepsNavigationMixin, SubmitDealDataMixin],
  mounted() {
    if (this.athlete && this.athlete.id && this.athlete.id !== '')
      store.dispatch('editUser/setHash', this.athlete.id);

    this.getPersonalDocuments(this.contractType);
  },
  validations() {
    return {
      form: {
        confirmation: { required },
      },
    };
  },
  computed: {
    contractType: () => {
      return store.getters['dealCalculator/getContractType'];
    },
    athlete: () => {
      return store.getters['dealCalculator/getAthlete'];
    },
  },
  methods: {
    nextStep() {
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        store.dispatch('dealCalculator/addDocuments', this.documents);
        store.dispatch('dealCalculator/jumpToStep', 6);
      }
    },
    saveLater() {
      this.$v.form.$touch();
      if (this.$v.form.$invalid) {
        return false;
      }

      store.dispatch('dealCalculator/addDocuments', this.documents);
      // store.dispatch("dealCalculator/jumpToStep", 6);

      let $this = this;
      let dealCalculatorState = store.getters['dealCalculator/getState'];
      let data = this.prepareDealSubmitData();
      this.$loading(true);

      data['id'] = dealCalculatorState.dealId;
      data['docs_ready'] = true;
      DealRepository.dealcalculatorUpdate(data)
        .then((response) => {
          setTimeout(() => {
            this.$loading(false);
            $this.showSuccessMessage = true;
            setTimeout(() => {
              store.dispatch('dealCalculator/resetDeal');
              $this.$router.push('/');
            }, 1000);
          }, 1000);
        })
        .catch((error) => {
          console.error(error);
          $this.$loading(false);
        });
    },
    removeDocument(id) {
      let $this = this;
      $this.$loading(true);
      UserRepository.removeDocument(id)
        .then((response) => {
          $this.getPersonalDocuments($this.contractType);
          $this.$loading(false);
        })
        .catch((error) => {
          console.error(error);
          $this.$loading(false);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.upload-button {
  position: relative;
}

.upload-button.simple-link {
  padding: 0;
  border: none;
  box-shadow: none;
}

.simple-link:hover {
  cursor: pointer;
}

.upload-button .file-input {
  position: absolute;
  opacity: 0;
}

.upload-button .file-input:hover {
  cursor: pointer;
}

.file-wraper {
  margin-left: auto;
  font-size: 14px;
  font-weight: 600;
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
    flex-wrap: wrap;
    max-width: 450px;
    /* gap: 25px;   */
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
  .remove-document {
    color: var(--primary);
    font-weight: 700;
    font-size: 14px;
  }
}
@media screen and (min-width: 1264px) {
  .file-wraper {
    /* width: 500px; */
    gap: 16px;
    .remove-document {
      margin-left: 16px;
    }
  }
  .multiple-documents {
    width: 450px;
    padding: 30px;
  }
}
@media screen and (max-width: 1264px) {
  .multiple-documents {
    padding: 15px;
    width: 340px;
  }
  .document-upload {
    ::v-deep {
      .upload-button {
        padding: 15px 10px;
        font-size: 12px;
      }
    }
  }
  .file-wraper {
    gap: 5px;
  }
}
@media screen and (min-width: 985px) {
  .document {
    align-items: center;
  }
}
@media screen and (max-width: 985px) {
  .document {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
}
.multiple-documents {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  background-color: #fbfcfe;

  border-radius: 20px;
  border: 1px solid #e8eaee;
  .multiple-documents-upload {
    gap: 15px;
    width: 100%;
    justify-content: space-between;
    h3 {
      margin-bottom: 0;
      color: #5c9aaf;
      font-size: 14px;
      max-width: 100px;
      text-align: right;
    }
  }
}

/* .file-wraper .file-name {
  display: inline-block;
  padding-right: 6px;
}

.file-wraper .size {
  display: inline-block;
}

.file-wraper .line {
  height: 7px;
  width: 100%;
  background-color: #96dd15;
  margin-top: 8px;
} */
/* .file-wraper .line .remove-document {
  display: inline-block;
  float: right;
} */

.dragover {
  border: 1px solid #b6c3d1 !important;
}
</style>
