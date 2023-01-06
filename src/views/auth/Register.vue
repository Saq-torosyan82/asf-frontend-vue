<template>
  <div class="content-wrapper">
    <BaseModal
      v-if="showSuccessMessage"
      modalType="register"
      email="custom@gmail.com"
    ></BaseModal>
    <LogoImage class="logo-image" />
    <h1>Create new account</h1>
    <router-link to="/login" class="back-btn">Back to login page</router-link>
    <h3>We will help you find the best financial deal in no time.</h3>
    <form id="login-form" action="post" @submit.prevent="submit()">
      <div class="errors">
        <ul>
          <span v-for="(error, index) in errors" :key="index">
            <li v-for="(item, index2) in error" :key="index2">{{ item }}</li>
          </span>
        </ul>
      </div>

      <CustomInput
        label="Email"
        name="email"
        :error="$v.form.email.$error && $v.form.email.$dirty"
        errorMsg="Valid email is required."
      >
        <input
          type="email"
          placeholder="Enter your email"
          v-model="form.email"
          @keyup="lowercase"
      /></CustomInput>

      <CustomInput
        label="Password"
        :error="$v.form.password.$error && $v.form.password.$dirty"
        errorMsg="Valid password must contain at least 8 characters, one lowercase letter, one uppercase letter, one digit and one special character"
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

      <SquareButton type="submit" background="#3a9eba" color="white"
        >Create account</SquareButton
      >
      <div class="terms">
        <input
          id="sport-finance-terms"
          type="checkbox"
          v-model="form.termsAndPrivacy"
        />
        <label for="sport-finance-terms"
          >I agree to All Sports Finance's website
          <router-link to="/terms">Terms of Use</router-link> and
          <router-link to="/privacy">Privacy Policy</router-link>
        </label>
      </div>
      <span
        class="terms-error"
        v-show="
          !$v.form.termsAndPrivacy.$model && $v.form.termsAndPrivacy.$dirty
        "
        >You need to accept Terms of Use and Privacy Policy before
        proceeding</span
      >
      <div class="terms">
        <input
          id="product-information"
          v-model="form.opt_notify_products"
          type="checkbox"
        />
        <label for="product-information"
          ><span class="dim-text">(Optional)</span> I agree to receive
          notifications about new products, services, offers, news & insights
          and research (you can unsubscribe at any time.)</label
        >
      </div>
    </form>
  </div>
</template>

<script>
import LogoImage from '@/assets/icons/sidebar/logo-sidebar.svg';
import SquareButton from '@/components/SquareButton.vue';
import CustomInput from '@/components/CustomInput.vue';
import BaseModal from '@/components/BaseModal.vue';
/* Validation */
import { email, required, sameAs, minLength } from 'vuelidate/lib/validators';
import PasswordMixin from '@/mixins/Auth/Password.mixin';

import { helpers } from 'vuelidate/lib/validators';
const password = helpers.regex(
  'password',
  /^(?=.*\d)(?=.*[!@#$%^&*-])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
);

import RepositoryFactory from '../../repositories/RepositoryFactory';
const RegisterRepository = RepositoryFactory.get('register');

export default {
  name: 'Register',

  components: {
    LogoImage,
    SquareButton,
    CustomInput,
    BaseModal,
  },
  mixins: [PasswordMixin],
  data: function () {
    return {
      typeOfInput: 'password',
      errors: [],
      form: {
        email: '',
        password: '',
        termsAndPrivacy: false,
        opt_notify_products: false,
      },
      showSuccessMessage: false,
    };
  },
  validations() {
    return {
      form: {
        email: { required, email },
        password: { required, minLength: minLength(8), password },
        termsAndPrivacy: { sameAs: sameAs(() => true) },
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
    lowercase() {
      //Not letting users enter a capital letter in email input which creates an Invalid email address error
      this.form.email = this.form.email.toLowerCase();
    },
    submit() {
      let $this = this;
      this.$v.form.$touch();
      if (!this.$v.form.$invalid && this.$v.form.termsAndPrivacy.$model) {
        RegisterRepository.register($this.form)
          .then(() => {
            $this.showSuccessMessage = true;
            $this.errors = [];
            setTimeout(() => {
              $this.$router.push('/login');
            }, 2000);
          })
          .catch((error) => {
            $this.errors = error.response.data.errors;
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
.errors ul {
  list-style: outside;
  color: red;
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
  .terms input {
    margin-top: 3.2px;
  }
}
/* MOBILE ONLY */
@media only screen and (max-width: 700px) {
  .content-wrapper {
    padding: 60px 24px 60px;
  }
  ::v-deep label {
    margin-top: 15px;
  }
  ::v-deep label:first-child {
    margin-top: 20px;
  }
  .terms input {
    margin-top: 18px;
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
  margin-bottom: 13px;
}
.content-wrapper h3 {
  font-size: 14px;
  font-weight: 600;
  margin-top: 18px;
  margin-bottom: 29px;
}
.content-wrapper a {
  color: #3a9eba;
  font-weight: 700;
  text-decoration: none;
}
button:first-of-type {
  margin-top: 40px;
}
button:last-of-type {
  margin-bottom: 50px;
}
.terms {
  display: flex;
  align-items: flex-start;
  margin-top: 10px;
}

.terms label {
  margin-left: 6px;
  font-size: 14px;
}
.dim-text {
  color: #707d8c;
}
.terms-error {
  font-size: 12px;
  color: #f61c0d;
  margin-left: 18px;
  font-weight: 600;
}
</style>
