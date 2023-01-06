<template>
  <div>
    <div class="user-information add-club">
      <div v-if="alreadyExistError" class="alert alert-danger" role="alert">
        Club already exist
      </div>
      <CustomInput
          label="Name"
          name="name"
          :error="
              $v.form.name.$error &&
              $v.form.name.$dirty
            "
          errorMsg="Name is required."
      >
        <input
            type="text"
            placeholder="Name"
            v-model="form.name"
        />
      </CustomInput>


      <SelectInput  :error="$v.form.country_id.$error && $v.form.country_id.$dirty"
                    errorMsg="Field is required." label="Country" name="country">
        <select v-model="form.country_id">
          <option value="" disabled selected hidden>
            Choose your country from the list
          </option>
          <option
              v-for="country in countries"
              :key="'country-' + country.id"
              class="option"
              :value="country.id"
          >
            {{ country.name }}
          </option>
        </select>
      </SelectInput>

      <p style="margin-top: 20px;text-align: left">Logo (optional)</p>
      <div class="upload">
        <div class="user-info with-image">
          <a href="#" class="link-text" @click.prevent="$refs.fileInput.click()">
            <icon name="edit-icon" />Add Logo
          </a>
          <br>
          <div v-if="logo">
            <span style="margin-right: 10px">{{ logo.name }}</span>
            <a href="#" @click.prevent="removeImage"> <icon name="delete" /></a>
          </div>
          <input
              type="file"
              @change="uploadFile"
              ref="fileInput"
              accept="image/png, image/gif, image/jpeg"
              style="display: none"
          />
        </div>
      </div>
      <a href="#" class="button" @click.prevent="saveLeague()">Save</a>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import { required } from 'vuelidate/lib/validators';

import CustomInput from "../CustomInput";
import SelectInput from "../SelectInput";

import RepositoryFactory from "@/repositories/RepositoryFactory";
const SystemRepository = RepositoryFactory.get('system');

export default {
  name: "AddClub",
  components: {
    CustomInput,
    SelectInput
  },
  mounted() {
    this.getCountries();
  },
  data() {
    return {
      form: {
        name: '',
        country_id: ''
      },
      logo: null,
      alreadyExistError: false,
      countries: []
    }
  },
  validations() {
    return {
      form: {
        name: { required },
        country_id: { required },
      },
    };
  },
  computed: {
    league: () => {
      return store.getters['dealCalculator/getLeague'];
    },
  },
  methods: {
    saveLeague() {
      let $this = this;
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        $this.$loading(true);
        let data = new FormData();
        data.append('name', this.form.name);
        data.append('country_id', this.form.country_id);
        data.append('league_id', this.league.id);
        if(this.logo) {
          data.append('logo', this.logo);
        }
        SystemRepository.createClubs(data).then((response) => {
          $this.$emit('update-clubs-list', true);
          $this.alreadyExistError = false;
          $this.$loading(false);
        }).catch((error) => {
          console.error(error.response.status);
          if(error.response.status === 409) {
            $this.alreadyExistError = true;
          }
          $this.$loading(false);
        })
      }
    },
    getCountries() {
      let $this = this;
      SystemRepository.getCountries()
          .then((response) => {
            $this.countries = response.data.data;
          })
          .catch((error) => {
            console.error(error);
          });
    },
    removeImage() {
      this.logo = null;
    },
    uploadFile(event) {
      this.logo = event.target.files[0];
    }
  }
}
</script>

<style scoped>
.add-club .input-wrap {
  text-align: left;
}

.add-club .v-application .error {
  background: transparent;
}

.user-image,
.user-avatar {
  display: inline-block;
  height: 70px;
  width: 70px;
  border-radius: 50%;
  border: 2px solid #dbe7f4;
  box-sizing: content-box;
  background-size: cover;
  background-position: center;
}
.user-image {

}
.upload {
  display: flex;
  align-items: center;
}
</style>