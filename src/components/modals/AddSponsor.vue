<template>
  <div>
    <div class="user-information add-sponsor">
      <div v-if="alreadyExistError" class="alert alert-danger" role="alert">
        Sponsor already exist
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
      <a href="#" class="button" @click.prevent="saveSponsor()">Save</a>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';

import CustomInput from "../CustomInput";

import RepositoryFactory from "@/repositories/RepositoryFactory";
const SystemRepository = RepositoryFactory.get('system');

export default {
  name: "AddSponsor",
  components: {
    CustomInput
  },
  data() {
    return {
      form: {
        name: '',
      },
      logo: null,
      alreadyExistError: false,
    }
  },
  validations() {
    return {
      form: {
        name: { required }
      },
    };
  },
  methods: {
    saveSponsor() {
      let $this = this;
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        $this.$loading(true);
        let data = new FormData();
        data.append('name', this.form.name);
        if(this.logo) {
          data.append('logo', this.logo);
        }
        SystemRepository.createSponsor(data).then((response) => {
          $this.$emit('update-list', true);
          $this.alreadyExistError = false;
          $this.$loading(false);
        }).catch((error) => {
          if(error.response.status === 409) {
            $this.alreadyExistError = true;
          }
          $this.$loading(false);
        })
      }
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
.add-sponsor .input-wrap {
  text-align: left;
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