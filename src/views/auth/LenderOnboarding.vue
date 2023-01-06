<template>
  <div class="content-wrapper">
    <div class="form-wrapper">
      <a @click="prev()" class="step-back-button" v-show="currentStep > 1">
        Step back
      </a>
      <h1>Create Lender</h1>
      <Steps></Steps>

      <h3 class="step-description">{{ stepDescription[currentStep - 1] }}</h3>

      <FirstStep v-if="currentStep == 1"></FirstStep>
      <SecondStep v-if="currentStep == 2"></SecondStep>
      <ThirdStep v-if="currentStep == 3"></ThirdStep>
    </div>
    <div class="side-panel"><icon name="asf-admin-logo" /></div>
  </div>
</template>

<script>
import store from '@/store';

import Steps from './LenderOnboarding/Steps';
import FirstStep from './LenderOnboarding/FirstStep';
import SecondStep from './LenderOnboarding/SecondStep';
import ThirdStep from './LenderOnboarding/ThirdStep';
import RepositoryFactory from '../../repositories/RepositoryFactory';
const SystemRepository = RepositoryFactory.get('system');

export default {
  name: 'Register',
  components: {
    Steps,
    FirstStep,
    SecondStep,
    ThirdStep,
  },
  mounted() {
    store.dispatch('lenderCriteria/getCriteria');
    store.dispatch('lenderCriteria/getCountries');
    store.dispatch('lenderCriteria/getSports');
  },
  data() {
    return {
      stepDescription: [
        'Please fill in the information about the lender',
        'Please fill in the information about the lender',
        'Please provide credit criteria',
      ],
    };
  },
  computed: {
    currentStep() {
      return store.getters['lenderOnboarding/getStep'];
    },
  },
  methods: {
    prev() {
      if (this.currentStep > 1) {
        store.dispatch('lenderOnboarding/prevStep');
      }
    },
    next() {
      store.dispatch('lenderOnboarding/nextStep');
    },
    submit() {
      alert('submit');
    },
  },
};
</script>

<style>
/* DESKTOP ONLY */
@media only screen and (min-width: 700px) {
  .content-wrapper {
    padding: 56px 0;
    width: 80%;
  }
  .form-wrapper {
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
    padding: 56px 0;
    width: 100%;
  }
  .side-panel {
    display: none;
  }
  .form-wrapper {
    padding: 30px 24px 60px;
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
.col {
  min-width: 220px;
}
.side-panel svg {
  width: 70%;
  position: absolute;
  right: 30px;
  top: 56px;
}
.side-panel {
  background: linear-gradient(156.09deg, #d0e4fb -9.74%, #f3f7fc 111.18%);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 20%;
  height: 100vh;
}

.step-back-button {
  position: absolute;
  top: 30px;
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
a {
  text-decoration: none;
}
a.link-text {
  color: #3a9eba;
  font-size: 14px;
  font-weight: 700;
}

::v-deep button {
  margin-top: 40px;
}
::v-deep .label {
  color: #253242;
}

.form-wrapper {
  color: #253242;
}

.form-wrapper h1 {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 16px;
}
.form-wrapper h3 {
  font-size: 14px;
  font-weight: 600;
}
.form-wrapper h3 span {
  color: #3a9eba;
  font-weight: 700;
}

.progress {
  border-radius: 12px;
  border: 1px solid #d9dfe5;
  box-sizing: border-box;
  background: none;
  margin-left: 0;
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

/** Step 1 */
::v-deep .label {
  display: block;
}
.company-logo {
  display: inline-flex;
  align-items: center;
  margin-top: 8px;
}
.logo-image {
  display: grid;
  place-content: center;
}
.logo-image span {
  color: #707d8c;
  font-size: 14px;
}

.logo-image {
  width: 52px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1px solid #d9dfe5;
  margin-right: 16px;
}
.company-logo a {
}

/** Step 3 */
.deal-criteria {
  margin-top: 20px;
  display: block;
}
</style>
<style src="@/assets/styles/Tel-Input.css"></style>
