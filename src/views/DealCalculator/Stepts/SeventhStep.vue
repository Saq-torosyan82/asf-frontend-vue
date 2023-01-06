<template>
  <div class="">
    <!--
    <BaseModal modalType="calculator-documents-unsuccessful" />
    -->
    <div class="deal-confirmation">
      <h3 class="sectionHeading mb-12">Thank you for submitting the application</h3>
      <p class="sectionDescription">
        We need you to confirm the following information to proceed with the deal.
      </p>

      <div class="form">
        <h3 class="inputHeader">
          1. Have you already shown this deal to a financier?
        </h3>
        <div class="inputBody">
          <div class="radio__input">
            <input
                type="radio"
                :value="true"
                v-model="form.shownToFinancier"
                class="radio-input"
            />
            <label>Yes</label>
          </div>
          <div class="radio__input">
            <input
                type="radio"
                :value="false"
                v-model="form.shownToFinancier"
                class="radio-input"
            />
            <label>No</label>
          </div>
        </div>

        <div v-if="form.shownToFinancier">
          <h3 class="inputHeader">
            Please state the name of the financier and the date in which you shared the deal
          </h3>
          <div
              class="financier"
              v-for="(financier, key) in form.financiers"
              :key="key"
          >
            <CustomInput
                :error="
              $v.form.financiers.$each[key].firstName.$error &&
              $v.form.financiers.$each[key].firstName.$dirty
            "
                errorMsg="Field is required."
                label="First name"
            >
              <input
                  type="text"
                  v-model="form.financiers[key].firstName"
                  placeholder=""
              />
            </CustomInput>
            <CustomInput
                :error="
              $v.form.financiers.$each[key].lastName.$error &&
              $v.form.financiers.$each[key].lastName.$dirty
            "
                errorMsg="Field is required."
                label="Last name"
            >
              <input
                  type="text"
                  v-model="form.financiers[key].lastName"
                  placeholder=""
              />
            </CustomInput>
            <CustomInput
                :error="
              $v.form.financiers.$each[key].website.$error &&
              $v.form.financiers.$each[key].website.$dirty
            "
                errorMsg="Field is required."
                label="Website"
            >
              <input
                  type="url"
                  v-model="form.financiers[key].website"
                  placeholder=""
              />
            </CustomInput>
            <CustomInput
                :error="
              $v.form.financiers.$each[key].date.$error &&
              $v.form.financiers.$each[key].date.$dirty
            "
                errorMsg="Field is required."
                label="Date"
            >
              <input
                  type="date"
                  v-model="form.financiers[key].date"
                  placeholder="dd.mm.yyyy"
              />
            </CustomInput>
          </div>

          <a href="#" @click.prevent="addNewFinancierInfo()" class="link-text">
            + Add financier
          </a>
        </div>


        <h3 class="inputHeader">2. Please confirm</h3>

        <div class="inputBody checkbox">
          <div>
            <div
                class="alert alert-danger"
                role="alert"
                v-if="
              $v.form.confirmNoExclusivity.$error &&
              $v.form.confirmNoExclusivity.$dirty
            "
            >Confirmation required
            </div>
            <input
                id="confirmation"
                v-model="form.confirmNoExclusivity"
                type="checkbox"
            />
            <label for="confirmation">
              I, confirm that I have not given any financier a period of exclusivity.
            </label>
          </div>
        </div>

        <h3 class="inputHeader">3. Exclusivity</h3>
        <div class="inputBody checkbox">
          <div>
            <div
                class="alert alert-danger"
                role="alert"
                v-if="
              $v.form.confirmNoExclusivity.$error &&
              $v.form.confirmNoExclusivity.$dirty
            "
            >Confirmation required
            </div>
            <input
                id="confirmationExclusivity"
                v-model="form.sellerAgreement"
                type="checkbox"
            />
            <label for="confirmationExclusivity"
            >In consideration of the time and resources that SportsFi will devote to the Purchase of this Receivables,
              the
              Seller agrees that, during the period beginning on the date hereof, and ending no early than in 60 days
              the
              Seller nor any of its respective affiliates will solicit, initiate, entertain or permit, or enter into
              any
              discussions in respect of, any offering, placement or arrangement of any debt or receivable financing
              similar in nature to the Receivables Purchase.</label
            >
          </div>
        </div>
      </div>
      <div class="calculator-footer">
        <a
            class="next-step"
            :class="[disableSubmitButton ? 'disabled' : '']"
            @click="nextStep()"
        >Confirm</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import CustomInput from '@/components/CustomInput.vue';
import {required} from 'vuelidate/lib/validators';
import SubmitDealDataMixin from '@/mixins/DealCalculator/SubmitDealData.mixin';
import UploadDocumentMixin from '@/mixins/DealCalculator/UploadDocument.mixin';
import StepsNavigationMixin from '@/mixins/DealCalculator/StepsNavigation.mixin';
import RepositoryFactory from '../../../repositories/RepositoryFactory';
import requiredIf from "vuelidate/lib/validators/requiredIf";

const DealStepsRepository = RepositoryFactory.get('deal-steps-repository');
const DealRepository = RepositoryFactory.get('deal');
const UserRepository = RepositoryFactory.get('user');
//import BaseModal from "@/components/BaseModal.vue";

export default {
  name: 'SeventhStep',
  components: {
    CustomInput
    //BaseModal
  },
  mixins: [StepsNavigationMixin, SubmitDealDataMixin],
  mounted() {
    // this.getPersonalDocuments();
  },
  data() {
    return {
      disableSubmitButton: false,
      confirmation: false,
      confirmationExclusivity: false,
      form: {
        shownToFinancier: true,
        confirmNoExclusivity: '',
        sellerAgreement: '',
        financiers: [
          {
            firstName: '',
            lastName: '',
            website: '',
            date: '',
          },
        ],
      },
    };
  },
  filters: {},
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
        shownToFinancier: {required},
        confirmNoExclusivity: {
          checked: (value) => value === true,
        },
        sellerAgreement: {
          checked: (value) => value === true,
        },
        financiers: {
          $each: {
            firstName: {required: requiredIf(() => this.form.shownToFinancier)},
            lastName: {required: requiredIf(() => this.form.shownToFinancier)},
            website: {required: requiredIf(() => this.form.shownToFinancier)},
            date: {required: requiredIf(() => this.form.shownToFinancier)},
          },
        },
      },
    };
  },
  computed: {},
  methods: {
    dealId: () => {
      return store.getters['dealCalculator/getDealId'];
    },
    checkIfFormISValid() {
      if (this.$v.form.$invalid) {
        this.disableSubmitButton = true;
      } else {
        this.disableSubmitButton = false;
      }
    },
    addNewFinancierInfo() {
      this.form.financiers.push({
        firstName: '',
        lastName: '',
        website: '',
        date: '',
      });
    },
    nextStep() {
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        store.dispatch('dealCalculator/addStep7Info', this.form);
        let $this = this;
        let data = this.prepareDealSubmitData();
        data['id'] = this.dealId();
        $this.$loading(true);
        DealRepository.dealcalculatorFinish(data)
            .then((response) => {
              $this.$loading(false);
            })
            .catch((error) => {
              console.error(error);
              $this.$loading(false);
            });

        store.dispatch('dealCalculator/resetDeal');
        store.dispatch('dealCalculator/jumpToStep', 8);
      }
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
  margin-top: 5px;
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
