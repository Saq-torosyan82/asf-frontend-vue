<template>
  <form>
    <div v-if="errorMessage !== ''" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>
    <CustomInput
      v-if="!emptyPassword && !isAdmin"
      label="Enter your current password"
      :error="$v.form.old_password.$error && $v.form.old_password.$dirty"
      errorMsg="Field is required."
    >
      <input
        type="password"
        v-model="form.old_password"
        placeholder="Current password"
      />
    </CustomInput>
    <CustomInput
      label="Enter your new password"
      :error="$v.form.password.$error && $v.form.password.$dirty"
      errorMsg="Valid password must contain at least 8 characters, one lowercase letter, one uppercase letter, one digit and one special character"
    >
      <input
        type="password"
        @keyup="checkPasswordRules"
        v-model="form.password"
        placeholder="New password"
      />
    </CustomInput>
    <CustomInput
      label="Confirm your new password"
      :error="
        $v.form.password_confirmation.$error &&
        $v.form.password_confirmation.$dirty
      "
      errorMsg="Same as password"
    >
      <input
        type="password"
        v-model="form.password_confirmation"
        placeholder="Confirm new password"
      />
    </CustomInput>
    <div class="password-validation">
      <p class="valid-error" :class="{ validated: validationRules.min8Lenght }">
        Minimum 8 characters
      </p>
      <p class="valid-error" :class="{ validated: validationRules.oneDigit }">
        1 digit
      </p>
      <p class="valid-error" :class="{ validated: validationRules.lowerCase }">
        1 lowercase
      </p>
      <p
        class="valid-error"
        :class="{ validated: validationRules.oneSpecialCharacter }"
      >
        1 special character
      </p>
      <p class="valid-error" :class="{ validated: validationRules.upperCase }">
        1 uppercase
      </p>
    </div>
    <button @click.prevent="submit" class="btn">Change your password</button>
  </form>
</template>

<script>
import CustomInput from '@/components/CustomInput.vue';
import UserService from "@/services/user.service.js";

import {
  required,
  sameAs,
  minLength,
  requiredIf,
} from 'vuelidate/lib/validators';
import RepositoryFactory from '@/repositories/RepositoryFactory';
const UserRepository = RepositoryFactory.get('user');
import PasswordMixin from '@/mixins/Auth/Password.mixin';
import { helpers } from 'vuelidate/lib/validators';
const password = helpers.regex(
  'password',
  /^(?=.*\d)(?=.*[!@#$%^&*-])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
);

export default {
  name: 'ChangePassword',
  components: {
    CustomInput,
  },
  created() {
    this.getPasswordSet();
  },
  mixins: [PasswordMixin],
  data() {
    return {
      errorMessage: '',
      emptyPassword: false,
      form: {
        old_password: '',
        password: '',
        password_confirmation: '',
      },
    };
  },
  computed: {
    isAdmin() {
      return UserService.isAdmin();
    },
  },
  validations() {
    return {
      form: {
        old_password: {
          required: requiredIf(function () {
            return !this.emptyPassword && !this.isAdmin;
          }),
        },
        password: { required, minLength: minLength(8), password },
        password_confirmation: { required, sameAsPassword: sameAs('password') },
      },
    };
  },
  methods: {
    submit() {
      this.$v.form.$touch();
      let $this = this;
      if (!this.$v.form.$invalid) {
        this.$loading(true);
        UserRepository.changePassword(this.form)
          .then((response) => {
            $this.$emit('success', true);
            $this.form = {
              old_password: '',
              password: '',
              password_confirmation: '',
            };
            $this.errorMessage = '';
            $this.$router.go(0);
            $this.$loading(false);
          })
          .catch((error) => {
            $this.errorMessage = error.response.data.message;
            $this.$loading(false);
          });
      }
    },
    async getPasswordSet() {
      let response = await UserRepository.checkHavePasswordSet();
      this.emptyPassword = response.data.empty_password;
    },
  },
};
</script>

<style scoped>
.password-validation {
  text-align: left;
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
</style>
