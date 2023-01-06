<template>
  <div class="content-wrapper">
    <a @click="prev()" class="step-back-button" v-show="this.step > 1"
      >Step back</a
    >
    <h1>Onboarding</h1>
    <h3 class="step-count">Step {{ this.step }}</h3>
    <div class="progress">
      <div
        class="progress-bar"
        role="progressbar"
        :style="{ width: this.step * 25 + '%' }"
        aria-valuenow="25"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
    <h3 class="step-description">{{ stepDescription[step - 1] }}</h3>

    <form id="register-form" @submit.prevent="next()">
      <div v-if="step === 1">
        <CustomInput label="First name" name="first-name">
          <input
            type="text"
            v-model="registration.name"
            placeholder="First name"
          />
        </CustomInput>

        <CustomInput label="Last name" name="last-name">
          <input
            type="text"
            v-model="registration.surname"
            placeholder="Last name"
          />
        </CustomInput>

        <SelectInput label="User type" name="user-type">
          <select v-model="registration.userType">
            <option value="" disabled selected hidden>
              Choose from the list
            </option>
            <option class="option" value="1">1 Year</option>
            <option class="option" value="11">11 Year</option>
          </select>
        </SelectInput>

        <SquareButton background="#3a9eba" color="white" @click.prevent="next()"
          >Next</SquareButton
        >
      </div>
      <div v-if="step === 2">
        <CustomInput label="Phone number" name="phone-number">
          <vue-tel-input></vue-tel-input>
        </CustomInput>
        <CustomInput label="Office number" name="office-number">
          <vue-tel-input></vue-tel-input>
        </CustomInput>

        <CustomInput label="Company registration number" name="company-number">
          <input
            type="text"
            v-model="registration.companyRegistrationNumber"
            placeholder="Company number"
          />
        </CustomInput>

        <SquareButton
          type="submit"
          background="#3a9eba"
          color="white"
          @click="next()"
        >
          Next
        </SquareButton>
      </div>
      <div v-if="step === 3">
        <CustomInput label="Company name" name="company-name">
          <input
            type="text"
            v-model="registration.name"
            placeholder="Company name"
          />
        </CustomInput>

        <SelectInput label="Country" name="country">
          <select v-model="registration.country">
            <option value="" disabled selected hidden>
              Choose your country from the list
            </option>
            <option class="option" value="1">Australia</option>
            <option class="option" value="2">United Kingdom</option>
            <option class="option" value="3">United States Of America</option>
          </select>
        </SelectInput>

        <SquareButton
          type="submit"
          background="#3a9eba"
          color="white"
          @click="next()"
          >Next</SquareButton
        >
      </div>
      <div v-if="step === 4">
        <SelectInput label="Sport" name="Sport">
          <select v-model="registration.country">
            <option value="" disabled selected hidden>
              Choose from the list
            </option>
            <option class="option" value="1">Baseball</option>
            <option class="option" value="2">Football</option>
            <option class="option" value="2">Fighting</option>
            <option class="option" value="3">Soccer</option>
            <option class="option" value="4">Tennis</option>
          </select>
        </SelectInput>

        <SquareButton background="#3a9eba" color="white" @click="next()"
          >Complete onboarding</SquareButton
        >
      </div>
    </form>
  </div>
</template>

<script>
import SquareButton from '@/components/SquareButton.vue';

import CustomInput from '@/components/CustomInput.vue';
import SelectInput from '@/components/SelectInput.vue';
import { VueTelInput } from 'vue-tel-input';

export default {
  name: 'Onboarding',
  components: {
    SquareButton,
    CustomInput,
    SelectInput,
    VueTelInput,
  },
  data() {
    return {
      step: 1,
      registration: {
        firstName: '',
        lastName: '',
        userType: '',
        phoneNumber: '',
        officeNumber: '',
        companyRegistrationNumber: '',
        companyName: '',
        country: '',
        sport: [''],
      },
      stepDescription: [
        'Hello! Let’s get acquainted.\nPlease tell us more about yourself.',
        'Please provide your details',
        'Please provide your residential address.',
        'Please provide professional information.',
      ],
    };
  },
  methods: {
    prev() {
      if (this.step > 1) {
        this.step--;
      }
    },
    next() {
      if (this.step < 4) {
        this.step++;
      } else if (this.step === 4) {
        this.submit();
      }
    },
    submit() {
      alert('Form Submitted ' + this.registration.userType);
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
