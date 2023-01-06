<template>
  <div class="content-wrapper">
    <BaseModal
      v-if="showSuccessMessage"
      modalType="onboarding"
      email="custom@gmail.com"
    ></BaseModal>
    <BaseModal
      v-if="showOnboardingCheckOrganisationMessage"
      modalType="onboarding-check-organisation"
      email="custom@gmail.com"
    ></BaseModal>
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
  </div>
</template>

<script>
/* Inputs, Buttons */
import SquareButton from '@/components/SquareButton.vue';
import CustomInput from '@/components/CustomInput.vue';
import SelectInput from '@/components/SelectInput.vue';

/*Step components*/
import FormInitial from '@/views/auth/Onboarding/FormInitial.vue';
import FormAthlete from '@/views/auth/Onboarding/FormAthlete.vue';
import FormAgent from '@/views/auth/Onboarding/FormAgent.vue';
import FormCorporation from '@/views/auth/Onboarding/FormCorporate.vue';
import BorrowerTypes from '../../enums/modules/BorrowerType';
import BaseModal from '../../components/BaseModal';
import OnboardingForm from '../../enums/modules/OnboardingForm';
import UserProfileKey from '../../enums/modules/UserProfileKey';

import Repository from '../../repositories/RepositoryFactory';
import TokenService from "../../services/token.service";
const OnboardingRepository = Repository.get('onboarding');
const AuthRepository = RepositoryFactory.get('logout');
const UserRepository = Repository.get('user');

/* Validation */
import {required, requiredIf} from 'vuelidate/lib/validators';
import { user } from '../../store/modules/user.module';
import UserProfileGroup from '../../enums/modules/UserProfileGroup';
import UserTypes from '../../enums/modules/UserType';
import RepositoryFactory from "../../repositories/RepositoryFactory";

export default {
  name: 'Onboarding',
  components: {
    SquareButton,
    CustomInput,
    SelectInput,
    FormInitial,
    FormAthlete,
    FormAgent,
    FormCorporation,
    BaseModal,
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
            athleteCity: { required },
            athleteZip: { required },
          },
          step3: {
            athletePhoneNumber: { required },
          },
          step4: {
            sport: { required },
            sportCountry: {
              required: requiredIf(function () {
                return this.form.athlete.step4.sport.has_country;
              }),
            },
            sportLeague: {
              required: requiredIf(function () {
                return this.form.athlete.step4.sport.has_league;
              }),
            },
            sportClub: {
              required: requiredIf(function () {
                return this.form.athlete.step4.sport.has_club;
              }),
            },
          },
        },
        corporate: {
          step2: {
            corpSport: { required },
            corpSportCountry: {
              required: requiredIf(function () {
                return this.form.corporate.step2.corpSport.has_country;
              }),
            },
            corpLeague: {
              required: requiredIf(function () {
                return this.form.corporate.step2.corpSport.has_league;
              }),
            },
            corpClub: {
              required: requiredIf(function () {
                return  this.form.corporate.step2.corpSport.has_club;
              }),
            },
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
      showSuccessMessage: false,
      showOnboardingCheckOrganisationMessage: false,
      currentStep: 1,
      form: {
        step1: {
          firstName: '',
          lastName: '',
          userType: '',
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
        FormCorporation: [
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
      if (this.form.step1.userType.category == BorrowerTypes.AGENT)
        return OnboardingForm.AGENT;
      else if (this.form.step1.userType.category == BorrowerTypes.ATHLETE)
        return OnboardingForm.ATHLETE;

      return OnboardingForm.CORPORATE;
    },
  },
  methods: {
    checkButtonDisable() {
      if (this.vStep === 1) {
        return this.$v.form.step1.$invalid;
      } else {
        var uType = this.form.step1.userType.category;
        var data = this.$v.form[uType];
        return data['step' + this.vStep].$invalid;
      }
    },
    getStepDesctiption(userType) {
      if (this.currentStep === 1) {
        return this.stepDescription.InitialDescription;
      }
      if (userType === OnboardingForm.AGENT) {
        return this.stepDescription.FormAgent[this.currentStep - 2];
      }
      if (userType === OnboardingForm.ATHLETE) {
        return this.stepDescription.FormAthlete[this.currentStep - 2];
      }
      if (userType === OnboardingForm.CORPORATE) {
        return this.stepDescription.FormCorporation[this.currentStep - 2];
      }
    },
    prev() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },
    next() {
      if (this.currentStep === 1) {
        this.$v.form.step1.$touch();
        if (!this.$v.form.step1.$invalid) {
          this.currentStep++;
          return;
        }
      }

      if (this.selectedUserType === OnboardingForm.ATHLETE) {
        this.$v.form.athlete['step' + this.vStep].$touch();
        if (!this.$v.form.athlete['step' + this.vStep].$invalid) {
          this.currentStep++;
          return;
        }
      } else if (this.selectedUserType === OnboardingForm.CORPORATE) {
        this.$v.form.corporate['step' + this.vStep].$touch();
        if (!this.$v.form.corporate['step' + this.vStep].$invalid) {
          this.currentStep++;
          return;
        }
      } else if (this.selectedUserType === OnboardingForm.AGENT) {
        this.$v.form.agent['step' + this.vStep].$touch();
        if (!this.$v.form.agent['step' + this.vStep].$invalid) {
          this.currentStep++;
          return;
        }
      }
    },
    submit() {
      let uType = this.form.step1.userType.category;
      let $this = this;

      this.$v.form[uType].$touch();
      if (!this.$v.form[uType].$invalid) {
        var data = this.buildDataToSubmit();

        if (($this.form.step1.userType.category === BorrowerTypes.CORPORATE) && (data.professional.club != "")) {
          OnboardingRepository.checkOrganisation({
            id: data.professional.club,
          })
            .then((response) => {
              if (response.data.organisation_exists) {
                $this.showOnboardingCheckOrganisationMessage = true;
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }

        OnboardingRepository.saveBorrower(data)
          .then(function (response) {
            if(response.data.isLocked) {

              $this.showOnboardingCheckOrganisationMessage = true;

              setTimeout(() => {
                AuthRepository.logout().then(() => {
                  TokenService.removeToken();
                  window.location.href = '/login';
                });
              }, 1000);

            }else {
              $this.showSuccessMessage = true;
            }
            UserRepository.getMyBasicInfo()
              .then((response) => {
                $this.$store.dispatch('user/storeUserInfo', response.data.data);
                $this.$localStorage.set('userInfo', response.data.data);
              })
              .catch((error) => {
                console.error(error);
              });
            setTimeout(() => {
              $this.$router.push('/');
            }, 1000);
          })
          .catch(function (error) {
            // SEEMEk: handle errors
            console.error(error);
          });
      }
    },
    buildDataToSubmit() {
      var data = {
        [UserProfileGroup.ACCOUNT]: {
          [UserProfileKey.FIRST_NAME]: this.form.step1.firstName,
          [UserProfileKey.LAST_NAME]: this.form.step1.lastName,
          [UserProfileKey.BORROWER_TYPE]: this.form.step1.userType.id,
        },
      };

      var uType = this.form.step1.userType.category;

      if (uType == BorrowerTypes.ATHLETE) {
        data[UserProfileGroup.ADDRESS] = {
          [UserProfileKey.COUNTRY]: this.form.athlete.step2.athleteCountry,
          [UserProfileKey.STREET]: this.form.athlete.step2.athleteStreetAddress,
          [UserProfileKey.STATE]: this.form.athlete.step2.athleteState,
          [UserProfileKey.CITY]: this.form.athlete.step2.athleteCity,
          [UserProfileKey.ZIP]: this.form.athlete.step2.athleteZip,
        };
        data[UserProfileGroup.CONTACT] = {
          [UserProfileKey.PHONE]: this.form.athlete.step3.athletePhoneNumber,
        };
        data[UserProfileGroup.PROFESSIONAL] = {
          [UserProfileKey.SPORT]: this.form.athlete.step4.sport.id,
          [UserProfileKey.COUNTRY]: this.form.athlete.step4.sportCountry,
          [UserProfileKey.LEAGUE]: this.form.athlete.step4.sportLeague,
          [UserProfileKey.CLUB]: this.form.athlete.step4.sportClub,
        };
      } else if (uType == BorrowerTypes.AGENT) {
        data[UserProfileGroup.ADDRESS] = {
          [UserProfileKey.COUNTRY]: this.form.agent.step3.agentCountry,
          [UserProfileKey.STREET]: this.form.agent.step3.agentStreetAddress,
          [UserProfileKey.STATE]: this.form.agent.step3.agentState,
          [UserProfileKey.CITY]: this.form.agent.step3.agentCity,
          [UserProfileKey.ZIP]: this.form.agent.step3.agentZip,
        };
        data[UserProfileGroup.CONTACT] = {
          [UserProfileKey.PHONE]: this.form.agent.step2.agentPhoneNumber,
          [UserProfileKey.OFFICE_PHONE]:
            this.form.agent.step2.agenctOfficeNumber,
        };
        data[UserProfileGroup.COMPANY] = {
          [UserProfileKey.REGISTRATION_NUMBER]:
            this.form.agent.step2.agentCompanyRegNumber,
          [UserProfileKey.NAME]: this.form.agent.step3.agentCompanyName,
          [UserProfileKey.SPORTS_LIST]: this.form.agent.step4.agentSport,
        };
      } else if (uType == BorrowerTypes.CORPORATE) {
        data[UserProfileGroup.PROFESSIONAL] = {
          [UserProfileKey.SPORT]: this.form.corporate.step2.corpSport.id,
          [UserProfileKey.COUNTRY]: this.form.corporate.step2.corpSportCountry,
          [UserProfileKey.LEAGUE]: this.form.corporate.step2.corpLeague,
          [UserProfileKey.CLUB]: this.form.corporate.step2.corpClub,
        };
        data[UserProfileGroup.CONTACT] = {
          [UserProfileKey.POSITION]: this.form.corporate.step3.corpPosition,
          [UserProfileKey.PHONE]: this.form.corporate.step3.corpPhone,
          [UserProfileKey.OFFICE_PHONE]:
            this.form.corporate.step3.corpOfficePhone,
        };
        data[UserProfileGroup.ADDRESS] = {
          [UserProfileKey.COUNTRY]: this.form.corporate.step4.corpCountry,
          [UserProfileKey.STREET]: this.form.corporate.step4.corpStreetAddress,
          [UserProfileKey.STATE]: this.form.corporate.step4.corpState,
          [UserProfileKey.CITY]: this.form.corporate.step4.corpCity,
          [UserProfileKey.ZIP]: this.form.corporate.step4.corpZIP,
        };
      }

      return data;
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
