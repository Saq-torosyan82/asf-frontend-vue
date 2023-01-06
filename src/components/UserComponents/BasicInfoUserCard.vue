<template>
  <div class="component agent-phone">
    <div class="user-info">
      <h3 v-if="isCorporate">
        {{ userInfo.first_name + ' ' + userInfo.last_name }}
        <!-- {{ userProfile.company ? userProfile.company.name : '' }} -->
      </h3>
      <h3
        v-else-if="
          isAgent &&
          userProfile.user &&
          userProfile.user.first_name &&
          userProfile.user.last_name
        "
      >
        {{ userProfile.user.first_name + ' ' + userProfile.user.last_name }}
      </h3>
      <h3 v-else>{{ userInfo.first_name }} {{ userInfo.last_name }}</h3>
      <p>
        {{
          (isAdmin || isAgent) && userProfile.user
            ? userProfile.user.email
            : userInfo.email
        }}
      </p>
    </div>
    <CustomInput v-if="userProfile.contact" label="Position" name="Position">
      <input
        type="text"
        placeholder=""
        v-model="userProfile.contact.position"
      />
    </CustomInput>
    <CustomInput
      v-if="isAgent && userProfile.contact"
      label="Mobile number"
      name="phone-number"
    >
      <vue-tel-input v-model="userProfile.contact.phone"></vue-tel-input>
    </CustomInput>
    <a href="#" class="button" @click.prevent="updateUserProfile()">Save</a>
  </div>
</template>

<script>
import CustomInput from '@/components/CustomInput.vue';
import BorrowerTypes from '../../enums/modules/BorrowerType';
import RepositoryFactory from '../../repositories/RepositoryFactory';
import store from '@/store';

const UserRepository = RepositoryFactory.get('user');
import UserService from '../../services/user.service';
import User from '../../modules/User/User';
import UserProfileGroup from '../../enums/modules/UserProfileGroup';
import UserMixin from '@/mixins/User/User.mixin';
export default {
  name: 'BasicInfoUserCard',
  components: {
    CustomInput,
  },
  mixins: [UserMixin],
  computed: {
    borrwerTypes: function () {
      return BorrowerTypes;
    },
    userProfile() {
      return store.getters['user/getUserInfo'];
    },
    userInfo: () => {
      return UserService.getUserInfo();
    },
    isCorporate() {
      return User.isCorporate();
    },
    isAgent() {
      return User.isAgent();
    },
    agent() {
      return User.agent();
    },
    isAdmin() {
      return User.isAdmin();
    },
  },

  methods: {
    updateUserProfile() {
      let $this = this;
      let data = new FormData();
      data.append(
        'nx_data',
        JSON.stringify({
          [UserProfileGroup.CONTACT]:
            this.userProfile[UserProfileGroup.CONTACT],
        })
      );
      data.append('_method', 'PATCH');
      $this.$loading(true);
      UserRepository.updateUserProfile(data)
        .then((response) => {
          this.redirectUser();
          $this.$loading(false);
        })
        .catch((error) => {
          console.error(error);
          $this.$loading(false);
        });
    },
  },
};
</script>

<style scoped>
.user-info h3,
.user-info p {
  margin: 0 0 4px;
}
.user-info h3 {
  font-size: 14px;
  font-weight: 600;
}
.user-info p {
  font-size: 12px;
  font-weight: 400;
}
.agent-phone {
  grid-area: agent-phone;
}
.agent-phone .input-wrap {
  margin-top: 10px;
}
/* a.button {
  display: inline-block;
  margin: 24px 0 12px;
  padding: 14px 40px;
  border-radius: 4px;
  color: #ffffff;
  background-color: var(--primary);
} */
.component {
  background-color: white;
  border-radius: 8px;
  position: relative;
  padding: 20px;
  /* height: max-content; */
}
a.button {
  color: white;
}
</style>
