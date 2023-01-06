<template>
  <div class="content-wrapper">
    <a @click="prev()" class="step-back-button" v-show="currentStep > 1">
      Step back
    </a>
    <h1>Onboarding</h1>
    <h3 class="step-count">Step {{ currentStep }}</h3>
    <div class="progress">
      <div
        class="progress-bar"
        role="progressbar"
        :style="{ width: currentStep * 25 + '%' }"
        aria-valuenow="25"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>

    <h3 class="step-description">{{ getStepDesctiption(selectedUserType) }}</h3>

    <FormInitial
      v-show="currentStep == 1"
      :wizard-data="form"
      :validatorProps="this.$v"
    />

    <component
      v-show="currentStep > 1"
      :is="selectedUserType"
      :wizard-data="form"
      :current-step="currentStep"
      :validatorProps="this.$v"
    />

    <SquareButton
      v-if="currentStep < 4"
      @click.native="next()"
      background="#3a9eba"
      color="white"
      :disabled="checkButtonDisable()"
      >Next</SquareButton
    >
    <SquareButton
      v-if="currentStep === 4"
      @click.native="submit()"
      background="#3a9eba"
      color="white"
      >Complete onboarding</SquareButton
    >

    <base-modal v-if="modal.show" :modal-type="modal.type"></base-modal>
  </div>
</template>

<script>
/* Inputs, Buttons, Modal */
import SquareButton from '@/components/SquareButton.vue';
import CustomInput from '@/components/CustomInput.vue';
import SelectInput from '@/components/SelectInput.vue';
import BaseModal from '@/components/BaseModal.vue';

/*Step components*/
import FormInitial from '@/views/auth/FormInitial.vue';
import FormAthlete from '@/views/auth/FormAthlete.vue';
import FormAgent from '@/views/auth/FormAgent.vue';
import FormCorporate from '@/views/auth/FormCorporate.vue';

/* Validation */
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'Register',
  components: {
    SquareButton,
    CustomInput,
    SelectInput,
    BaseModal,
    FormInitial,
    FormAthlete,
    FormAgent,
    FormCorporate,
  },
  validations() {
    return {
      form: {
        step1: {
          firstName: { required },
          lastName: { required },
          userType: { required },
        },

        athlete: {
          step2: {
            athleteCountry: { required },
            athleteStreetAddress: { required },
            athleteState: { required },
            athleteCity: { required },
            athleteZip: { required },
          },
          step3: {
            athletePhoneNumber: { required },
          },
          step4: {
            sport: { required },
            sportCountry: { required },
            sportLeague: { required },
            sportClub: { required },
          },
        },
        corporate: {
          step2: {
            corpSport: { required },
            corpSportCountry: { required },
            corpLeague: { required },
            corpClub: { required },
          },
          step3: {
            corpPosition: { required },
            corpPhone: { required },
            corpOfficePhone: { required },
          },
          step4: {
            corpCountry: { required },
            corpStreetAddress: { required },
            corpCity: { required },
            corpZIP: { required },
          },
        },
        agent: {
          step2: {
            agentPhoneNumber: { required },
            agenctOfficeNumber: { required },
            agentCompanyRegNumber: { required },
          },
          step3: {
            agentCompanyName: { required },
            agentCountry: { required },
            agentStreetAddress: { required },
            agentCity: { required },
            agentZip: { required },
          },
          step4: {
            agentSport: { required },
          },
        },
      },
    };
  },
  watch: {
    number() {
      this.number = this.number.replace(/[^0-9]/);
    },
  },
  data() {
    return {
      modal: {
        show: false,
        type: 'success',
      },
      currentStep: 1,
      form: {
        step1: {
          firstName: '',
          lastName: '',
          userType: '',
          userCategory: '',
        },
        athlete: {
          step2: {
            athleteCountry: '',
            athleteStreetAddress: '',
            athleteState: '',
            athleteCity: '',
            athleteZip: '',
          },
          step3: {
            athletePhoneNumber: '',
          },
          step4: {
            sport: '',
            sportCountry: '',
            sportLeague: '',
            sportClub: '',
          },
        },
        corporate: {
          step2: {
            corpSport: '',
            corpSportCountry: '',
            corpLeague: '',
            corpClub: '',
          },
          step3: {
            corpPosition: '',
            corpPhone: '',
            corpOfficePhone: '',
          },
          step4: {
            corpCountry: '',
            corpStreetAddress: '',
            corpState: '',
            corpCity: '',
            corpZIP: '',
          },
        },
        agent: {
          step2: {
            agentPhoneNumber: '',
            agenctOfficeNumber: '',
            agentCompanyRegNumber: '',
          },
          step3: {
            agentCompanyName: '',
            agentCountry: '',
            agentStreetAddress: '',
            agentState: '',
            agentCity: '',
            agentZip: '',
          },
          step4: {
            agentSport: [],
          },
        },
      },

      stepDescription: {
        InitialDescription:
          'Hello! Let’s get acquainted.\nPlease tell us more about yourself.',
        FormAgent: [
          'Please provide your details',
          'Please provide your residential address.',
          'Please provide professional information.',
        ],
        FormCorporate: [
          'Please provide professional information.',
          'Please provide your information',
          'Please provide company address.',
        ],
        FormAthlete: [
          'Please provide your residential address.',
          'Please provide your contact information.',
          'Please provide your professional information.',
        ],
      },
    };
  },
  computed: {
    vStep() {
      return this.currentStep;
    },
    selectedUserType() {
      if (this.form.step1.userType != '') {
        var category = this.form.step1.userType.category;
        return 'Form' + category[0].toUpperCase() + category.slice(1);
      } else return 'FormAgent';
    },
  },
  methods: {
    getUType() {
      return this.form.step1.userType.category;
    },
    checkButtonDisable() {
      if (this.vStep === 1) {
        return this.$v.form.step1.$invalid;
      } else {
        var uType = this.getUType();
        var data = this.$v.form[uType];
        return data['step' + this.vStep].$invalid;
      }
    },
    getStepDesctiption(userType) {
      if (this.currentStep === 1) {
        return this.stepDescription.InitialDescription;
      }
      if (userType === 'FormAgent') {
        return this.stepDescription.FormAgent[this.currentStep - 2];
      }
      if (userType === 'FormAthlete') {
        return this.stepDescription.FormAthlete[this.currentStep - 2];
      }
      if (userType === 'FormCorporate') {
        return this.stepDescription.FormCorporate[this.currentStep - 2];
      }
    },
    prev() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },
    next() {
      if (this.selectedUserType === 'FormAthlete' && this.currentStep != 1) {
        this.$v.form.athlete['step' + this.vStep].$touch();
        if (!this.$v.form.athlete['step' + this.vStep].$invalid) {
          this.currentStep++;
          return;
        }
      }
      if (this.selectedUserType === 'FormCorporate' && this.currentStep != 1) {
        this.$v.form.corporate['step' + this.vStep].$touch();
        if (!this.$v.form.corporate['step' + this.vStep].$invalid) {
          this.currentStep++;
          return;
        }
      }

      if (this.selectedUserType === 'FormAgent' && this.currentStep != 1) {
        this.$v.form.agent['step' + this.vStep].$touch();
        if (!this.$v.form.agent['step' + this.vStep].$invalid) {
          this.currentStep++;
          return;
        }
      }
      if (this.currentStep === 1) {
        this.$v.form.step1.$touch();
        if (!this.$v.form.step1.$invalid) {
          this.currentStep++;
          return;
        }
      }
    },
    submit() {
      var uType = this.getUType();

      this.$v.form[uType].$touch();
      if (!this.$v.form[uType].$invalid) {
        var data = {
            first_name: this.form.step1.firstName,
            last_name: this.form.step1.lastName,
            borrower_type: this.form.step1.userType.id,
          },
          varData = {};

        if (uType === 'athlete') {
          varData = {
            address_country: this.form.athlete.step2.athleteCountry,
            address_street: this.form.athlete.step2.athleteStreetAddress,
            address_state: this.form.athlete.step2.athleteState,
            address_city: this.form.athlete.step2.athleteCity,
            address_zip: this.form.athlete.step2.athleteZip,
            contact_phone_number: this.form.athlete.step3.athletePhoneNumber,
            professional_sport: this.form.athlete.step4.sport,
            professional_country: this.form.athlete.step4.sportCountry,
            professional_league: this.form.athlete.step4.sportLeague,
            professional_club: this.form.athlete.step4.sportClub,
          };
        } else if (uType === 'corporate') {
          varData = {
            professional_sport: this.form.corporate.step2.corpSport,
            professional_country: this.form.corporate.step2.corpSportCountry,
            professional_league: this.form.corporate.step2.corpLeague,
            professional_club: this.form.corporate.step2.corpClub,
            contact_position: this.form.corporate.step3.corpPosition,
            contact_phone_number: this.form.corporate.step3.corpPhone,
            office_phone_number: this.form.corporate.step3.corpOfficePhone,
            address_country: this.form.corporate.step4.corpCountry,
            address_street: this.form.corporate.step4.corpStreetAddress,
            address_state: this.form.corporate.step4.corpState,
            address_city: this.form.corporate.step4.corpCity,
            address_zip: this.form.corporate.step4.corpZIP,
          };
        } else {
          varData = {
            contact_phone_number: this.form.agent.step2.agentPhoneNumber,
            office_phone_number: this.form.agent.step2.agenctOfficeNumber,
            company_registration_number:
              this.form.agent.step2.agentCompanyRegNumber,
            company_name: this.form.agent.step3.agentCompanyName,
            address_country: this.form.agent.step3.agentCountry,
            address_street: this.form.agent.step3.agentStreetAddress,
            address_state: this.form.agent.step3.agentState,
            address_city: this.form.agent.step3.agentCity,
            address_zip: this.form.agent.step3.agentZip,
            company_sports: JSON.stringify(this.form.agent.step4.agentSport),
          };
        }

        // Submiting formm
        this.$axios
          .post('onboarding', { ...data, ...varData })
          .then((res) => {
            this.modal.show = true;
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
  },
};
</script>

<style scoped>
/* DESKTOP ONLY */
@media only screen and (min-width: 700px) {
  .content-wrapper {
    max-width: 480px;
    margin: auto;
  }
  ::v-deep .input-wrap {
    margin-top: 16px;
    background-color: transparent !important;
    border-color: transparent !important;
  }
  ::v-deep .input-wrap:first-of-type {
    margin-top: 21px;
    background-color: transparent !important;
    border-color: transparent !important;
  }
  .step-back-button {
    top: 60px;
  }
}
/* MOBILE ONLY */
@media only screen and (max-width: 700px) {
  .content-wrapper {
    padding: 80px 24px 60px;
  }
  ::v-deep label {
    margin-top: 15px;
  }
  ::v-deep label:first-child {
    margin-top: 20px;
  }
  .step-back-button {
    top: 30px;
  }
}
/* GLOBAL */
.step-back-button {
  position: absolute;
  text-decoration: none;
  font-weight: 700;
  color: #253242;
  font-size: 15px;
  cursor: pointer;
}

.step-back-button:before {
  content: '';
  margin-right: 7px;
  margin-bottom: 1px;
  border: solid #253242;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3.5px;
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
}

::v-deep button {
  margin-top: 40px;
}

.content-wrapper {
  color: #253242;
}
svg.logo-image {
  width: 140px;
  height: auto;
}

.content-wrapper h1 {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 16px;
}
.content-wrapper h3 {
  font-size: 14px;
  font-weight: 600;
}
.content-wrapper h3 span {
  color: #3a9eba;
  font-weight: 700;
}

/*????????*/
#login-form * {
  display: block;
}
.progress {
  border-radius: 12px;
  border: 1px solid #d9dfe5;
  box-sizing: border-box;
  background: none;
}
.progress-bar {
  border-radius: 12px;
  background: linear-gradient(135.98deg, #ace30d 24.57%, #13c12f 162.66%);
}
input,
button {
  font-family: Mulish !important;
}
h3.step-count {
  font-weight: 800;
  margin-bottom: 9px;
}
h3.step-description {
  margin-top: 13px;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
<style src="@/assets/styles/Tel-Input.css"></style>
