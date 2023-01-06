<template>
  <div class="content-wrapper">
    <LogoImage class="logo-image" />
    <h1>Reset password</h1>
    <router-link class="back-button" to="/login">Back to login</router-link>
    <div v-if="!succes">
      <h3>
        Enter the email adress associated with your account<br />
        and we'll email you a link to reset your password.
      </h3>
      <div v-if="error" class="alert alert-danger" role="alert">
        This email doesn't exist in our app
      </div>
      <form id="reset-password" action="post" @submit.prevent="submit()">
        <CustomInput
          label="Email"
          name="email"
          class="mb-20"
          :error="$v.form.email.$error && $v.form.email.$dirty"
          errorMsg="Invalid email address."
        >
          <input type="text" placeholder="user@mail.com" v-model="form.email"
        /></CustomInput>

        <SquareButton background="#3a9eba" color="white"
          >Send reset link</SquareButton
        >
      </form>
    </div>
    <div v-if="succes">
      <p class="success-message">
        We have sent you an email to: {{ form.email }} <br />Click on the link to
        create a new password.
      </p>
    </div>
  </div>
</template>

<script>
import LogoImage from '@/assets/img/logo.svg';
import SquareButton from '@/components/SquareButton.vue';
import CustomInput from '@/components/CustomInput.vue';
import RepositoryFactory from '../../repositories/RepositoryFactory';
/* Validation */
import { email, required } from 'vuelidate/lib/validators';

const AuthRepository = RepositoryFactory.get('authentification');

export default {
  name: 'ForgotPassword',

  components: { LogoImage, SquareButton, CustomInput },
  data: function () {
    return {
      succes: false,
      error: false,
      form: {
        email: '',
        reseturl: 'password-reset',
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
    setSuccess() {
      this.succes = true;
    },
    submit() {
      let $this = this;
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        $this.$loading(true);
        AuthRepository.getResetPasswordEmail($this.form)
          .then(() => {
            this.setSuccess();
            $this.$loading(false);
          })
          .catch((error) => {
            console.error(error);
            $this.error = true;
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
  margin-top: 40px;
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
</style>
