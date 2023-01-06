<template>
  <div class="content-wrapper">
    <LogoImage class="logo-image" />
    <h1>Get a one time code</h1>
    <h3>
      <a href="#" @click.prevent="$emit('magicLogin')">Back to login page</a>
    </h3>
    <p>We will email you a one time code that you will use to sign in.</p>
    <form id="login-form" action="post" @submit.prevent="submit()">
      <div v-if="success" class="alert alert-success" role="alert">
        Please check your email
      </div>
      <div
        v-if="!isUserCredentialsCorect"
        class="alert alert-danger"
        role="alert"
      >
        {{ loginErrorMessage }}
      </div>
      <CustomInput
        label="Email"
        name="email"
        :error="$v.form.email.$error && $v.form.email.$dirty"
        errorMsg="Valid email is required."
      >
        <input type="email" placeholder="Enter your email" v-model="form.email"
      /></CustomInput>

      <br />

      <SquareButton type="submit" background="#3a9eba" color="white"
        >Send me the code</SquareButton
      >
    </form>
  </div>
</template>

<script>
import LogoImage from '@/assets/icons/logo-blue.svg';
import SquareButton from '@/components/SquareButton.vue';
import CustomInput from '@/components/CustomInput.vue';
import { email, required } from 'vuelidate/lib/validators';

import Repository from '../../repositories/RepositoryFactory';
const AuthRepository = Repository.get('authentification');

export default {
  name: 'LoginWithMagicLink',
  components: {
    LogoImage,
    SquareButton,
    CustomInput,
  },
  props: ['email'],
  mounted() {
    this.form.email = this.email;
  },
  data: function () {
    return {
      isUserCredentialsCorect: true,
      loginErrorMessage: null,
      success: false,
      form: {
        email: '',
      },
    };
  },
  validations() {
    return {
      form: {
        email: { required, email },
      },
    };
  },
  methods: {
    submit() {
      let $this = this;
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        $this.$loading(true);
        AuthRepository.sendMagicLink({ email: $this.form.email })
          .then((response) => {
            $this.success = true;
            $this.$loading(false);
          })
          .catch((error) => {
            $this.success = false;
            $this.loginErrorMessage = error.response.data.message;
            $this.isUserCredentialsCorect = false;
            $this.$loading(false);
          });
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
  .icon {
    top: 55px;
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
  .icon {
    top: 71px;
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
}
.content-wrapper h3 a {
  color: #3a9eba;
  font-weight: 700;
  text-decoration: none;
}

.forgot-password {
  font-weight: bold;
  color: #3a9eba;
  margin-top: 12px;
  margin-bottom: 40px;
  text-decoration: none;
  display: block;
}

.icon {
  position: absolute;
  right: 16px;
  cursor: pointer;
}
</style>
