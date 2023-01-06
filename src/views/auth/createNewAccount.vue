<template>
  <div class="content-wrapper">
    <LogoImage class="logo-image" />
    <h1>Create new account</h1>
    <router-link to="/login" class="back-btn">Back to login page</router-link>
    <h3>We will help you find the best financial deal in no time.</h3>
    <form id="login-form" action="post" @submit.prevent="submit()">
      <CustomInput
        label="Email"
        name="email"
        :error="$v.form.email.$error && $v.form.email.$dirty"
        errorMsg="Valid email is required."
      >
        <input type="email" placeholder="Enter your email" v-model="form.email"
      /></CustomInput>

      <SquareButton
        type="submit"
        background="#3a9eba"
        color="white"
        :disabled="$v.form.$invalid"
        >Continue</SquareButton
      >
      <DividerWithText>or</DividerWithText>

      <SquareButton
        type="submit"
        class="google"
        background="white"
        color="#253242"
        icon="google"
        >Continue with Google</SquareButton
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
        <input id="product-information" type="checkbox" />
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
import LogoImage from '@/assets/icons/logo-blue.svg';
import SquareButton from '@/components/SquareButton.vue';
import DividerWithText from '@/components/DividerWithText.vue';
import CustomInput from '@/components/CustomInput.vue';
/* Validation */
import { email, required, sameAs } from 'vuelidate/lib/validators';

export default {
  name: 'createNewAccount',

  components: { LogoImage, SquareButton, DividerWithText, CustomInput },
  data: function () {
    return {
      form: {
        email: '',
        termsAndPrivacy: false,
      },
    };
  },
  validations() {
    return {
      form: {
        email: { required, email },
        termsAndPrivacy: { sameAs: sameAs(() => true) },
      },
    };
  },
  methods: {
    submit() {
      this.$v.form.$touch();
      if (!this.$v.form.$invalid && this.$v.form.termsAndPrivacy.$model) {
        alert('submit');
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
