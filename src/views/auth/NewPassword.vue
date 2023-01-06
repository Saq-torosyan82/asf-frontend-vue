<template>
  <div class="content-wrapper">
    <LogoImage class="logo-image" />
    <h1>Create new password</h1>
    <h3>Your password must contain at least 8 characters.</h3>
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
import { required, sameAs } from 'vuelidate/lib/validators';

export default {
  name: 'NewPassword',

  components: { LogoImage, SquareButton, CustomInput },
  data: function () {
    return {
      succes: true,
      typeOfInput: 'password',
      form: {
        password: '',
        confirmPassword: '',
      },
    };
  },
  validations() {
    return {
      form: {
        password: { required },
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
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
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
