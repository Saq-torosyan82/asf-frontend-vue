<template>
  <div class="content-wrapper">
    <BaseModal
      v-if="showSuccessMessage"
      modalType="success"
      email="custom@gmail.com"
    ></BaseModal>
    <LogoImage class="logo-image" />
    <h1>Create new password</h1>
    <h3>Your password must contain at least 8 characters.</h3>
    <div v-if="error" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>
    <form id="new-password" action="post" @submit.prevent="submit()">
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
          @keyup="checkPasswordRules"
        />
        <a @click="showPassword()"><icon class="icon" name="eye-icon" /></a>
      </CustomInput>

      <CustomInput
        label="Repeat password"
        :error="
          $v.form.confirmPassword.$error && $v.form.confirmPassword.$dirty
        "
        errorMsg="Passwords must match."
      >
        <input
          placeholder="Repeat your password"
          type="password"
          name="repeat-password"
          v-model="form.confirmPassword"
        />
      </CustomInput>

      <div class="password-validation">
        <p
          class="valid-error"
          :class="{ validated: validationRules.min8Lenght }"
        >
          Minimum 8 characters
        </p>
        <p class="valid-error" :class="{ validated: validationRules.oneDigit }">
          1 digit
        </p>
        <p
          class="valid-error"
          :class="{ validated: validationRules.lowerCase }"
        >
          1 lowercase
        </p>
        <p
          class="valid-error"
          :class="{ validated: validationRules.oneSpecialCharacter }"
        >
          1 special character
        </p>
        <p
          class="valid-error"
          :class="{ validated: validationRules.upperCase }"
        >
          1 uppercase
        </p>
      </div>

      <SquareButton background="#3a9eba" color="white" @click="submit()"
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
import { minLength, required, sameAs } from 'vuelidate/lib/validators';
import BaseModal from '@/components/BaseModal.vue';
import PasswordMixin from '@/mixins/Auth/Password.mixin';

import RepositoryFactory from '../../repositories/RepositoryFactory';
const AuthRepository = RepositoryFactory.get('authentification');

import { helpers } from 'vuelidate/lib/validators';
const password = helpers.regex(
    'password',
    /^(?=.*\d)(?=.*[!@#$%^&*-])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
);

export default {
  name: 'NewPassword',
  components: { LogoImage, SquareButton, CustomInput, BaseModal },
  mixins: [PasswordMixin],
  data: function () {
    return {
      showSuccessMessage: false,
      error: false,
      errorMessage: '',
      success: true,
      typeOfInput: 'password',
      form: {
        password: '',
        confirmPassword: '',
      },
    };
  },
  mounted() {
    if (
      this.$route.query.email === undefined ||
      this.$route.query.email === '' ||
      this.$route.query.token === undefined ||
      this.$route.query.token === ''
    ) {
      this.$router.push('/login');
    }
  },
  validations() {
    return {
      form: {
        password: { required, minLength: minLength(8), password },
        confirmPassword: {
          required,
          sameAs: sameAs(function () {
            return this.form.password;
          }),
        },
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
      let $this = this;
      this.$v.form.$touch();
      let formData = {};
      if (!this.$v.form.$invalid) {
        formData = {
          email: $this.$route.query.email,
          token: $this.$route.query.token,
          password: $this.form.password,
          password_confirmation: $this.form.confirmPassword,
        };
        $this.showSuccessMessage = true; // temporary
        AuthRepository.resetPassword(formData)
          .then(() => {
            $this.$router.push('/login');
          })
          .catch((error) => {
            console.error(error);
            $this.error = true;
            $this.showSuccessMessage = false;
            $this.errorMessage = error.response.data.message;
          });
      }
    },
  },
};
</script>

<style scoped>
.password-validation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 15px;
}

p.validated::before {
  background: #13c12f;
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
.content-wrapper a.back-button {
  color: #3a9eba;
  font-weight: 700;
  text-decoration: none;
}
#login-form * {
  display: block;
}
button {
  margin-top: 40px;
}
.success-message {
  margin-top: 15px;
}

.icon {
  position: absolute;
  right: 16px;
  top: 55px;
  cursor: pointer;
}
@media only screen and (max-width: 700px) {
  .icon {
    top: 72px;
  }
}
</style>
