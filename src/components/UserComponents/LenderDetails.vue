<template>
  <div>
    <section id="form">
      <p>
        <b>Lender type:</b> <br />
        {{ userProfile.account ? userProfile.account.lender_type : '' }}
      </p>
      <p>
        <b>Website:</b> <br />
        {{ userProfile.company ? userProfile.company.website : '' }}
      </p>

      <CustomInput
        v-if="userProfile.company"
        :label="'Office number'"
        name="phone-number"
      >
        <vue-tel-input v-model="userProfile.company.phone"></vue-tel-input>
      </CustomInput>
      <CustomInput
        v-if="userProfile.company"
        :label="'Fax number'"
        name="fax-number"
      >
        <vue-tel-input v-model="userProfile.company.fax"></vue-tel-input>
      </CustomInput>

      <SelectInput
        v-if="userProfile.company"
        label="Country"
        name="Country"
        :no-arrow="true"
      >
        <p>{{ userProfile.company.country_txt }}</p>
      </SelectInput>

      <CustomInput
        v-if="userProfile.company"
        label="Street address"
        name="street-address"
      >
        <input
          type="text"
          placeholder="Street address"
          v-model="userProfile.company.street"
        />
      </CustomInput>

      <CustomInput
        v-if="userProfile.company"
        label="State (optional)"
        name="state"
      >
        <input
          type="text"
          placeholder="State"
          v-model="userProfile.company.state"
        />
      </CustomInput>

      <b-row v-if="userProfile.company">
        <b-col
          ><CustomInput label="City" name="City">
            <input
              type="text"
              placeholder="City"
              v-model="userProfile.company.city"
            /> </CustomInput
        ></b-col>
        <b-col
          ><CustomInput label="ZIP - Post code" name="zipcode">
            <input
              type="text"
              placeholder="Post code"
              v-model="userProfile.company.zip"
            /> </CustomInput
        ></b-col>
      </b-row>

      <a href="#" class="button" @click.prevent="updateUserProfile()">Save</a>
    </section>
  </div>
</template>

<script>
import CustomInput from '@/components/CustomInput.vue';
import SelectInput from '@/components/SelectInput.vue';
import User from '../../modules/User/User';
import RepositoryFactory from '../../repositories/RepositoryFactory';
import store from '@/store';

const UserRepository = RepositoryFactory.get('user');
const SystemRepository = RepositoryFactory.get('system');
import UserMixin from '@/mixins/User/User.mixin';

export default {
  name: 'LendersDetails',
  components: {
    CustomInput,
    SelectInput,
  },
  data() {
    return {};
  },
  mounted() {},
  computed: {
    userProfile() {
      return store.getters['user/getUserInfo'];
    },
  },
  mixins: [UserMixin],
  methods: {
    updateUserProfile() {
      let data = new FormData();
      data.append('nx_data', JSON.stringify(this.userProfile));
      data.append('avatar', store.getters['user/getUserPhoto']);
      data.append('_method', 'PATCH');
      this.$loading(true);
      UserRepository.updateUserProfile(data)
        .then((response) => {
          this.redirectUser();
          this.$loading(false);
        })
        .catch((error) => {
          console.error(error);
          this.$loading(false);
        });
    },
  },
};
</script>

<style scoped>
/* .agent-phone .input-wrap {
  margin-top: 10px;
} */
.input-wrap {
  margin-top: 10px;
}
a.button {
  display: inline-block;
  margin: 24px 0 12px;
  padding: 14px 40px;
  border-radius: 4px;
  color: #ffffff;
  background-color: var(--primary);
}
</style>
<style src="@/assets/styles/multiselect.css"></style>
