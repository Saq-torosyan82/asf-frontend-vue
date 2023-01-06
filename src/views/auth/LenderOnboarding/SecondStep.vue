<template>
  <div>
    <div class="step-two">
      <CustomInput
        :error="$v.form.firstName.$error && $v.form.firstName.$dirty"
        errorMsg="Field is required."
        label="First name"
      >
        <input v-model="form.firstName" type="text" placeholder="First name" />
      </CustomInput>
      <CustomInput
        :error="$v.form.lastName.$error && $v.form.lastName.$dirty"
        errorMsg="Field is required."
        label="Last name"
      >
        <input v-model="form.lastName" type="text" placeholder="Last name" />
      </CustomInput>
      <CustomInput
        :error="$v.form.position.$error && $v.form.position.$dirty"
        errorMsg="Field is required."
        label="Position"
      >
        <input v-model="form.position" type="text" placeholder="Position" />
      </CustomInput>

      <CustomInput
        :error="$v.form.phoneNumber.$error && $v.form.phoneNumber.$dirty"
        errorMsg="Field is required."
        label="Phone number"
      >
        <vue-tel-input v-model="form.phoneNumber"></vue-tel-input>
      </CustomInput>
      <CustomInput
        :error="$v.form.officeNumber.$error && $v.form.officeNumber.$dirty"
        errorMsg="Field is required."
        label="Office number"
      >
        <vue-tel-input v-model="form.officeNumber"></vue-tel-input>
      </CustomInput>
      <CustomInput
        :error="$v.form.email.$error && $v.form.email.$dirty"
        errorMsg="Field is required."
        label="Email"
      >
        <input
          v-model="form.email"
          type="email"
          placeholder="Enter your email"
        />
      </CustomInput>
    </div>

    <SquareButton @click.native="next()" background="#3a9eba" color="white"
      >Next</SquareButton
    >
  </div>
</template>

<script>
import store from '@/store';

import SquareButton from '@/components/SquareButton.vue';
import CustomInput from '@/components/CustomInput.vue';
import { email, minLength, required } from 'vuelidate/lib/validators';

export default {
  name: 'SecondStep',
  components: {
    CustomInput,
    SquareButton,
  },
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        position: '',
        phoneNumber: '',
        officeNumber: '',
        email: '',
      },
    };
  },
  mounted() {
    let data = store.getters['lenderOnboarding/getContactInfo'];
    if (Object.keys(data).length !== 0) {
      this.form = data;
    }
  },
  validations() {
    return {
      form: {
        firstName: { required },
        lastName: { required },
        position: { required },
        phoneNumber: { required, minLength: minLength(6) },
        officeNumber: { required, minLength: minLength(6) },
        email: { required, email },
      },
    };
  },
  methods: {
    next() {
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        store.dispatch('lenderOnboarding/nextStep');
        store.dispatch('lenderOnboarding/addContactInfo', this.form);
      }
    },
  },
};
</script>

<style scoped>
.step-two {
  margin-bottom: 50px;
}
</style>
