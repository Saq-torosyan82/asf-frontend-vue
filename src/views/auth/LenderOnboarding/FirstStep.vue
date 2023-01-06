<template>
  <div>
    <div class="step-one">
      <div
        v-if="emailAlreadyTakenError"
        class="alert alert-danger"
        role="alert"
      >
        This email is already taken
      </div>

      <CustomInput
        :error="$v.form.email.$error && $v.form.email.$dirty"
        errorMsg="Field is required."
        label="Lender's Email"
      >
        <input v-model="form.email" type="email" placeholder="Lender's email" />
      </CustomInput>
      <CustomInput
        :error="$v.form.name.$error && $v.form.name.$dirty"
        errorMsg="Field is required."
        label="Lender's Name"
      >
        <input v-model="form.name" type="text" placeholder="Lender's name" />
      </CustomInput>

      <SelectInput
        :error="$v.form.type.$error && $v.form.type.$dirty"
        errorMsg="Field is required."
        label="Lender type"
      >
        <select v-model="form.type">
          <option value="" disabled selected hidden>
            Choose from the list
          </option>
          <option
            v-for="(type, key) in lenderTypes"
            :value="type.id"
            :key="key"
          >
            {{ type.name }}
          </option>
          <!--          <option>Type 2</option>-->
          <!--          <option>Type 3</option>-->
        </select>
      </SelectInput>

      <SelectInput
        :error="$v.form.country.$error && $v.form.country.$dirty"
        errorMsg="Field is required."
        label="Country"
      >
        <select v-model="form.country">
          <option value="" disabled selected hidden>
            Choose from the list
          </option>
          <option
            v-for="(country, key) in countries"
            :value="country.id"
            :key="key"
          >
            {{ country.name }}
          </option>
        </select>
      </SelectInput>

      <CustomInput
        :error="$v.form.street.$error && $v.form.street.$dirty"
        errorMsg="Field is required."
        label="Street address"
      >
        <input
          v-model="form.street"
          type="text"
          placeholder="Enter a location"
        />
      </CustomInput>
      <b-row>
        <b-col>
          <CustomInput label="State (optional)">
            <input
              v-model="form.state"
              type="text"
              placeholder="State"
            /> </CustomInput
        ></b-col>
        <b-col>
          <CustomInput
            :error="$v.form.city.$error && $v.form.city.$dirty"
            errorMsg="Field is required."
            label="City"
          >
            <input
              type="text"
              v-model="form.city"
              placeholder="City"
            /> </CustomInput
        ></b-col>
        <b-col>
          <CustomInput
            :error="$v.form.zip.$error && $v.form.zip.$dirty"
            errorMsg="Field is required."
            label="ZIP - Post code"
          >
            <input
              v-model="form.zip"
              type="text"
              placeholder="Post code"
            /> </CustomInput
        ></b-col>
      </b-row>
      <b-row>
        <b-col>
          <CustomInput
            :error="
              $v.form.companyRegistrationNumber.$error &&
              $v.form.companyRegistrationNumber.$dirty
            "
            errorMsg="Field is required."
            label="Company registration number"
          >
            <input
              v-model="form.companyRegistrationNumber"
              type="text"
              placeholder="Company number"
            /> </CustomInput
        ></b-col>
        <b-col>
          <CustomInput label="Company logo">
            <div class="company-logo">
              <div
                class="logo-image"
                :style="{ 'background-image': `url(${previewImage})` }"
              >
                <span v-if="!previewImage">OSS</span>
              </div>
              <label for="file-upload" class="custom-file-upload">
                <icon name="camera-link" /> Add
              </label>
              <input
                id="file-upload"
                type="file"
                ref="logo"
                @change="uploadFile"
              />
            </div>
          </CustomInput>
        </b-col>
      </b-row>

      <CustomInput
        :error="$v.form.phone.$error && $v.form.phone.$dirty"
        errorMsg="Field is required."
        label="Company number"
      >
        <vue-tel-input v-model="form.phone"></vue-tel-input>
      </CustomInput>
      <CustomInput label="Fax(optional)">
        <vue-tel-input v-model="form.fax"></vue-tel-input>
      </CustomInput>

      <CustomInput
        label="Website"
        :error="$v.form.website.$error && $v.form.website.$dirty"
        errorMsg="Field is required."
      >
        <input
          type="text"
          v-model="form.website"
          placeholder="www.website.com"
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
import { required, email, minLength } from 'vuelidate/lib/validators';
import RepositoryFactory from '../../../repositories/RepositoryFactory';

import CustomInput from '@/components/CustomInput.vue';
import SelectInput from '@/components/SelectInput.vue';
import SquareButton from '@/components/SquareButton.vue';

const UserRepository = RepositoryFactory.get('user');

export default {
  name: 'FirstStep',
  components: {
    CustomInput,
    SelectInput,
    SquareButton,
  },
  mounted() {
    let data = store.getters['lenderOnboarding/getLenderInfo'];
    if (Object.keys(data).length !== 0) {
      this.form = data;
    }
  },
  data() {
    return {
      form: {
        email: '',
        name: '',
        type: '',
        country: '',
        street: '',
        state: '',
        city: '',
        zip: '',
        companyRegistrationNumber: '',
        phone: '',
        fax: '',
        website: '',
        logo: '',
      },
      emailAlreadyTakenError: false,
      previewImage: null,
    };
  },
  validations() {
    return {
      form: {
        email: { required, email },
        name: { required },
        type: { required },
        country: { required },
        street: { required },
        city: { required },
        zip: { required },
        companyRegistrationNumber: { required },
        phone: { required, minLength: minLength(6) },
        website: { required },
      },
    };
  },
  computed: {
    lenderTypes() {
      return store.getters['lenderCriteria/getLenderTypes'];
    },
    countries() {
      return store.getters['lenderCriteria/getCountries'];
    },
  },
  methods: {
    next() {
      let $this = this;
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        this.$loading(true);
        UserRepository.checkEmailAvailability({ email: this.form.email })
          .then((response) => {
            store.dispatch('lenderOnboarding/nextStep');
            store.dispatch('lenderOnboarding/addLenderInfo', this.form);
            this.$loading(false);
          })
          .catch((error) => {
            $this.emailAlreadyTakenError = true;
            window.scrollTo(0, 0);
            console.error(error);
            this.$loading(false);
          });
      }
    },
    uploadFile(event) {
      this.$store.dispatch(
        'lenderOnboarding/storeUserPhoto',
        event.target.files[0]
      );
    },
    pickLogo() {
      let input = this.$refs.logo;
      let file = input.files;
      if (file && file[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.previewImage = e.target.result;
        };
        reader.readAsDataURL(file[0]);
        this.form.logo = file[0];
      }
    },
  },
};
</script>

<style scoped>
.step-one {
  margin-bottom: 50px;
}
.logo-image {
  background-size: cover;
}

input[type='file'] {
  display: none;
}
.custom-file-upload {
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
}
.custom-file-upload svg {
  margin-right: 5px;
}
</style>
