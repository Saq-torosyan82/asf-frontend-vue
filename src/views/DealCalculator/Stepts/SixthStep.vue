<template>
  <div class="">
    <!--
    <BaseModal modalType="calculator-documents-unsuccessful" />
    -->
    <div class="deal-confirmation">
      <a @click="prevStep()" class="back-link"
        ><icon name="back-arrow" />Back to document upload</a
      >
      <h3 class="sectionHeading mb-12">You are almost there</h3>
      <p class="sectionDescription">
        Please answer key questions to submit the deal.
      </p>

      <div class="form">
        <h3 class="inputHeader">
          1. Have you informed {{ companyName }} of your intention to finance
          this receivable?
        </h3>
        <div class="inputBody">
          <div class="radio__input">
            <input
              type="radio"
              :value="true"
              v-model="form.informedIntention"
              class="radio-input"
            />
            <label>Yes</label>
          </div>
          <div class="radio__input">
            <input
              type="radio"
              :value="false"
              v-model="form.informedIntention"
              class="radio-input"
            />
            <label>No</label>
          </div>
        </div>

        <h3 class="inputHeader">2. Please confirm</h3>
        <div class="inputBody checkbox">
          <span
            class="valid-error"
            v-if="
              $v.form.confirmUsageOfDocuments.$error &&
              $v.form.confirmUsageOfDocuments.$dirty
            "
            >Field is required.</span
          >
          <input
            id="confirmation"
            v-model="form.confirmUsageOfDocuments"
            type="checkbox"
          />
          <label for="confirmation"
            >I understand SportsFi will require the supporting documents from
            {{ companyName }} in order to conclude the purchase of
            receivable.</label
          >
          <!-- <label for="confirmation"
            >I understand SportsFi will require the following documents from
            {{ companyName }} in order to conclude the purchase of the
            receivable: {{ documentsLabels | removeComma  }}</label> -->
        </div>
        <h3 class="inputHeader">
          3. Please provide contact details for the person(s) at
          {{ companyName }}
        </h3>
        <div
          class="contactPersons"
          v-for="(contact, key) in form.contacts"
          :key="key"
        >
          <CustomInput
            :error="
              $v.form.contacts.$each[key].firstName.$error &&
              $v.form.contacts.$each[key].firstName.$dirty
            "
            errorMsg="Field is required."
            label="First name"
          >
            <input
              type="text"
              v-model="form.contacts[key].firstName"
              placeholder=""
            />
          </CustomInput>
          <CustomInput
            :error="
              $v.form.contacts.$each[key].lastName.$error &&
              $v.form.contacts.$each[key].lastName.$dirty
            "
            errorMsg="Field is required."
            label="Last name"
          >
            <input
              type="text"
              v-model="form.contacts[key].lastName"
              placeholder=""
            />
          </CustomInput>
          <CustomInput
            :error="
              $v.form.contacts.$each[key].position.$error &&
              $v.form.contacts.$each[key].position.$dirty
            "
            errorMsg="Field is required."
            label="Position"
          >
            <input
              type="text"
              v-model="form.contacts[key].position"
              placeholder=""
            />
          </CustomInput>
          <CustomInput
            :error="
              $v.form.contacts.$each[key].phone.$error &&
              $v.form.contacts.$each[key].phone.$dirty
            "
            errorMsg="Field is required."
            label="Phone number"
            name="phone-number"
          >
            <vue-tel-input v-model="form.contacts[key].phone"></vue-tel-input>
          </CustomInput>
          <CustomInput
            :error="
              $v.form.contacts.$each[key].email.$error &&
              $v.form.contacts.$each[key].email.$dirty
            "
            errorMsg="Field is required."
            label="Contact email"
          >
            <input
              type="text"
              v-model="form.contacts[key].email"
              placeholder="Enter email"
            />
          </CustomInput>
        </div>

        <a href="#" @click.prevent="addNewContactInfo()" class="link-text"
          >+ Add another contact person</a
        >
      </div>
      <div class="calculator-footer">
        <a
          class="next-step"
          :class="[disableSubmitButton ? 'disabled' : '']"
          @click="nextStep()"
          >Submit the deal</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import CustomInput from '@/components/CustomInput.vue';
import { required } from 'vuelidate/lib/validators';
import SubmitDealDataMixin from '@/mixins/DealCalculator/SubmitDealData.mixin';
import UploadDocumentMixin from '@/mixins/DealCalculator/UploadDocument.mixin';
import StepsNavigationMixin from '@/mixins/DealCalculator/StepsNavigation.mixin';
import RepositoryFactory from '../../../repositories/RepositoryFactory';
const DealStepsRepository = RepositoryFactory.get('deal-steps-repository');
const DealRepository = RepositoryFactory.get('deal');
const UserRepository = RepositoryFactory.get('user');
//import BaseModal from "@/components/BaseModal.vue";

export default {
  name: 'SixthStep',
  components: {
    CustomInput,
    //BaseModal
  },
  mixins: [UploadDocumentMixin, StepsNavigationMixin, SubmitDealDataMixin],
  mounted() {
    this.getCompanyName();
    this.getPersonalDocuments();
  },
  data() {
    return {
      disableSubmitButton: false,
      confirmation: false,
      companyName: '',
      form: {
        informedIntention: '',
        confirmUsageOfDocuments: '',
        consentFile: null,
        contacts: [
          {
            firstName: '',
            lastName: '',
            position: '',
            phone: '',
            email: '',
          },
        ],
      },
      documents: {
        consent: null,
      },
    };
  },
  filters: {
    removeComma: function (value) {
      return value.slice(0, -2) + '.';
    },
  },
  watch: {
    form: {
      handler: function () {
        this.checkIfFormISValid();
      },
      deep: true,
    },
  },
  validations() {
    return {
      form: {
        informedIntention: {
          checked: (value) => value === true,
        },
        confirmUsageOfDocuments: { required },
        contacts: {
          $each: {
            firstName: { required },
            lastName: { required },
            position: { required },
            phone: { required },
            email: { required },
          },
        },
      },
    };
  },
  computed: {
    club: () => {
      return store.getters['dealCalculator/getClub'];
    },
    tvHolder: () => {
      return store.getters['dealCalculator/getTvHolder'];
    },
    sponsorOrBrand: () => {
      return store.getters['dealCalculator/getSponsorOrBrand'];
    },
    contractType: () => {
      return store.getters['dealCalculator/getContractType'];
    },
  },
  methods: {
    dealId: () => {
      return store.getters['dealCalculator/getDealId'];
    },
    getCompanyName() {
      if (this.club !== null) {
        this.companyName = this.club.name;
      } else if (this.tvHolder !== null) {
        this.companyName = this.tvHolder.name;
      } else if (this.sponsorOrBrand !== null) {
        this.companyName = this.sponsorOrBrand.name;
      }
    },
    checkIfFormISValid() {
      if (this.$v.form.$invalid) {
        this.disableSubmitButton = true;
      } else {
        this.disableSubmitButton = false;
      }
    },
    addNewContactInfo() {
      this.form.contacts.push({
        firstName: '',
        lastName: '',
        position: '',
        phone: '',
        email: '',
      });
    },
    nextStep() {
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        store.dispatch('dealCalculator/addStep6Info', this.form);
        store.dispatch('dealCalculator/addDocuments', this.documents);
        store.dispatch('dealCalculator/jumpToStep', 7);
      }
    },
    prevStep() {
      store.dispatch('dealCalculator/prevStep');
    },
    removeDocument(ref) {
      this.documents.consent = null;
      this.form.consentFile = null;
    },
    uploadFile(file, data) {
      const dealCalculatorState = store.getters['dealCalculator/getState'];
      this.documents.consent = file;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('nx_data', JSON.stringify(data));
      formData.append('deal_id', dealCalculatorState.dealId);

      let $this = this;
      $this.$loading(true);
      UserRepository.uploadDocument(formData)
        .then((response) => {
          $this.$loading(false);
          $this.form.consentFile = response.data.id;
          $this.$emit('closed', true);
        })
        .catch((error) => {
          console.error(error);
          $this.$loading(false);
          $this.$emit('closed', true);
        });
    },
  },
};
</script>

<style scoped>
.disabled {
  pointer-events: none;
  opacity: 0.65;
}
@media only screen and (min-width: 750px) {
  .document-info {
    text-align: left;
  }
}
@media only screen and (max-width: 750px) {
  .deal-confirmation {
    margin-top: 40px;
  }
  .document-info {
    text-align: center;
  }
}
::v-deep .input-wrap {
  margin-top: 24px;
  background-color: transparent !important;
  border-color: transparent !important;
}
::v-deep .input-wrap label {
  color: #253242;
}

.bg-grey {
  background-color: #f3f7fc;
  padding: 16px 20px;
  border-radius: 8px;
}
a.link-text {
  margin-top: 12px;
  display: block;
}
p.document-info {
  font-size: 14px;
  color: #253242;
  font-weight: 400;
  max-width: 100%;
  margin-top: 20px;
}
.deal-confirmation {
  max-width: 650px;
}
h3.inputHeader {
  font-size: 14px;
  font-weight: 600;
  margin-top: 30px;
}
.inputBody {
  margin-top: 16px;
}
.inputBody label {
  font-size: 14px;
  color: #253242;
  font-weight: 400;
}
.inputBody label ul {
  list-style: initial;
}
.inputBody.checkbox label {
  display: inline-block;
  padding-left: 25px;
}
.inputBody.checkbox input {
  position: absolute;
  margin-top: 2px;
}
.upload-button {
  display: inline-block;
}

.valid-error {
  font-size: 12px;
  color: #f61c0d;
  display: block;
  font-weight: 600;
}
</style>
