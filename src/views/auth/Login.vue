<template>
  <div>
    <div class="content-wrapper" v-if="!magicLink">
      <LogoImage class="logo-image" />
      <h1>Log in to your SportsFi account</h1>
      <h3>
        Don't have an account? <router-link to="/register">Sign up</router-link>
      </h3>
      <form id="login-form" action="post" @submit.prevent="submit()">
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
          <input
            type="email"
            placeholder="Enter your email"
            v-model="form.email"
            @keyup="lowercase"
        /></CustomInput>

        <CustomInput
          label="Password"
          :error="$v.form.password.$error && $v.form.password.$dirty"
          errorMsg="Valid password is required."
        >
          <input
            placeholder="Enter your password"
            :type="typeOfInput"
            name="password"
            v-model="form.password"
          />
          <a @click="showPassword()"><icon class="icon" name="eye-icon" /></a>
        </CustomInput>

        <router-link
          to="/forgot"
          class="forgot-password"
          v-model="form.forgotPassword"
          >Forgot your password?</router-link
        >

        <SquareButton type="submit" background="#3a9eba" color="white"
          >Log in</SquareButton
        >
        <DividerWithText>or</DividerWithText>
      </form>
      <button class="magic-link" @click.prevent="loginWithMagicLink">
        <span>Log in with one time code</span>
      </button>
    </div>
    <LoginWithMagicLink
      v-if="magicLink"
      :email="form.email"
      @magicLogin="magicLogin"
    ></LoginWithMagicLink>
  </div>
</template>

<script>
import LogoImage from '@/assets/icons/logo-dark.svg';
import SquareButton from '@/components/SquareButton.vue';
import DividerWithText from '@/components/DividerWithText.vue';
import CustomInput from '@/components/CustomInput.vue';
import LoginWithMagicLink from './LoginWithMagicLink';
//import BaseModal from "@/components/BaseModal.vue";
import Repository from '../../repositories/RepositoryFactory';
/* Validation */
import { email, required } from 'vuelidate/lib/validators';
import UserTypes from '../../enums/modules/UserType';
import TokenService from '../../services/token.service';
import axios from 'axios';
const AuthRepository = Repository.get('authentification');
const UserRepository = Repository.get('user');

export default {
  name: 'Login',
  mounted() {
    this.checkIfIsAutoLoginError();
  },
  components: {
    LogoImage,
    SquareButton,
    DividerWithText,
    CustomInput,
    LoginWithMagicLink,
  },
  data: function () {
    return {
      typeOfInput: 'password',
      isUserCredentialsCorect: true,
      loginErrorMessage: null,
      magicLink: false,
      magicLoginSuccess: false,
      form: {
        email: '',
        password: '',
      },
    };
  },
  validations() {
    return {
      form: {
        email: { required, email },
        password: { required },
      },
    };
  },
  methods: {
    magicLogin() {
      this.magicLink = false;
    },
    showPassword() {
      if (this.typeOfInput === 'password') {
        this.typeOfInput = 'text';
      } else {
        this.typeOfInput = 'password';
      }
    },
    loginWithMagicLink() {
      this.magicLink = true;
    },
    checkIfIsAutoLoginError() {
      this.loginErrorMessage = this.$localStorage.get('autologinError');
      this.$localStorage.remove('autologinError');
    },
    redirectUser() {
      let $this = this;
      UserRepository.getMyBasicInfo()
        .then((response) => {
          $this.store.dispatch('user/storeUserInfo', response.data.data);
          $this.$localStorage.set('userInfo', response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    lowercase() {
      //Not letting users enter a capital letter in email input which creates an Invalid email address error
      this.form.email = this.form.email.toLowerCase();
    },
    submit() {
      let $this = this;
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        this.$loading(true);
        AuthRepository.login(this.form)
          .then(function (response) {
            $this.$store.dispatch('auth/doLogin', response.data);
            UserRepository.getMyBasicInfo()
              .then((response) => {
                $this.$store.dispatch('user/storeUserInfo', response.data.data);
                $this.$localStorage.set('userInfo', response.data.data);

                // set token for auth image
                var authHeader = 'Bearer ' + TokenService.getLocalAccessToken();
                axios.defaults.headers.common['Authorization'] = authHeader;

                // redirect to onboarding
                if (
                  response.data.data.user_type === UserTypes.BORROWER &&
                  response.data.data.borrower_type === ''
                ) {
                  $this.$router.push('/onboarding');
                }

                $this.$loading(false);
                $this.$router.push('/');
              })
              .catch((error) => {
                console.error(error);
              });
          })
          .catch(function (error) {
            $this.loginErrorMessage = error.response.data.message;
            $this.isUserCredentialsCorect = false;
            $this.$store.dispatch('auth/loginFailures');
            $this.$loading(false);
          });
      }
    },
  },
};
</script>

<style scoped>
.magic-link {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Mulish !important;
  width: 100%;
  height: 52px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  font-size: 15px;
  box-shadow: 2px 2px 20px rgba(147, 160, 174, 0.3);
  color: #253242;
  background: white;
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
  color: var(--primary);
  font-weight: 700;
  text-decoration: none;
}

.forgot-password {
  font-weight: bold;
  color: var(--primary);
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
