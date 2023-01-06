<template>
  <div class="content-wrapper">
    <LogoImage class="logo-image" />

    <h1 v-if="!succes">Create new password</h1>
    <h1 v-if="succes">Check your inbox</h1>

    <router-link to="/login" v-if="succes">Back to login page</router-link>

    <h3 v-if="!succes">
      Enter the email address associated with your account <br />and we’ll email
      uou a link to reset your password.
    </h3>
    <h3 v-if="succes">
      We have sent an email to <strong>user@mail.com</strong>.<br /><br />
      Click on the link to create a new password..
    </h3>

    <form
      v-if="!succes"
      id="new-password"
      class="showValidation"
      action="post"
      @submit.prevent="submit()"
    >
      <CustomInput
        label="Password"
        :error="$v.form.password.$error && $v.form.password.$dirty"
        errorMsg="Password is required."
      >
        <input
          placeholder="Enter your password"
          :type="typeOfInput"
          name="password"
          v-model="form.password"
        />
        <a @click="showPassword()"><icon class="icon" name="eye-icon" /></a>
      </CustomInput>
      <div class="password-validation">
        <p class="valid-error">Minimum 8 characters</p>
        <p class="valid-error">1 digit</p>
        <p class="valid-error">1 lowercase</p>
        <p class="valid-error">1 special character</p>
        <p class="valid-error">1 uppercase</p>
      </div>

      <SquareButton
        background="#3a9eba"
        color="white"
        @click="submit()"
        :disabled="$v.form.$invalid"
        >Save</SquareButton
      >
    </form>
  </div>
</template>

<script>
import LogoImage from '@/assets/icons/logo-blue.svg';
import SquareButton from '@/components/SquareButton.vue';
import CustomInput from '@/components/CustomInput.vue';
/* Validation */
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'createNewPassword',

  components: { LogoImage, SquareButton, CustomInput },
  data: function () {
    return {
      succes: false,
      typeOfInput: 'password',
      form: {
        password: '',
      },
    };
  },
  validations() {
    return {
      form: {
        password: { required },
      },
    };
  },
  methods: {
    showPassword() {
      if (this.typeOfInput === 'password') {
        this.typeOfInput = 'text';
      } else {
        this.typeOfInput = 'password';
      }
    },
    submit() {
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        this.succes = true;
      }
    },
  },
};
</script>

<style scoped>
/* DESKTOP ONLY */
@media only screen and (min-width: 700px) {
  .image-section {
    width: 555px;
    height: 100vh;
    background-image: url('../../assets/img/onboarding-header.png');
    background-position: center;
    background-size: cover;
  }
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
}
/* MOBILE ONLY */
@media only screen and (max-width: 700px) {
  .content-wrapper {
    padding: 60px 24px 0;
  }
  ::v-deep label {
    margin-top: 15px;
  }
  ::v-deep label:first-child {
    margin-top: 20px;
  }
}

/* GLOBAL */

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
  margin-top: 48px;
  margin-bottom: 16px;
}
.content-wrapper h3 {
  font-size: 14px;
  font-weight: 600;
  margin-top: 16px;
}
.content-wrapper a {
  color: #3a9eba;
  font-weight: 700;
  text-decoration: none;
}

button {
  margin-top: 40px;
}
.password-validation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 15px;
}
p.valid-error {
  position: relative;
  font-size: 12px;
  font-weight: 600;
  margin: 0;
  padding-left: 18px;
}
p.valid-error::before {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid #d9dfe5;
  left: 0;
  top: 4px;
}
</style>
