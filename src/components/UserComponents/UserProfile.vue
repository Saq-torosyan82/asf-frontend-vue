<template>
  <div>
    <div class="inline image-header">
      <div class="user-image">
        <img v-if="avatarUrl" v-auth-image="avatarUrl" />
        <img v-else src="@/assets/img/person-default.png" alt="" />
      </div>
      <div class="user-info with-image">
        <h3 v-if="isAgent || isLender">
          {{ userProfile.company ? userProfile.company.name : '' }}
        </h3>
        <h3 v-if="isCorporate">
          {{ clubName }}
        </h3>
        <h3 v-else>{{ userInfo.first_name }} {{ userInfo.last_name }}</h3>
        <p v-if="isAgent || isLender">
          {{
            userProfile.company ? userProfile.company.registration_number : ''
          }}
        </p>
        <p v-else>
          {{
            isAdmin && userProfile.user
              ? userProfile.user.email
              : userInfo.email
          }}
        </p>
        <p v-if="isLender">
          {{ isAdmin ? userProfile.user.email : userInfo.email }}
        </p>
        <a href="#" class="link-text" @click.prevent="$refs.fileInput.click()">
          <icon name="edit-icon" />Change photo
        </a>
        <input
          type="file"
          @change="uploadFile"
          ref="fileInput"
          accept="image/png, image/jpeg, image/png"
          style="display: none"
        />
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import UserService from '../../services/user.service';
import User from '../../modules/User/User';
import store from '@/store';
import UserMixin from '@/mixins/User/User.mixin';

import RepositoryFactory from '@/repositories/RepositoryFactory';
const UserRepository = RepositoryFactory.get('user');
const SystemRepository = RepositoryFactory.get('system');

export default {
  name: 'UserProfile',
  props: {},
  data() {
    return {
      selectedFile: null,
      clubName: '',
    };
  },
  mixins: [UserMixin],
  mounted() {
    if (this.isCorporate) {
      this.getClubById();
    }
  },
  computed: {
    userProfile() {
      return store.getters['user/getUserInfo'];
    },
    avatarUrl() {
      if (store.getters['user/getUserInfo'].user) {
        return store.getters['user/getUserInfo'].user.avatar;
      } else {
        return '';
      }
    },
    userInfo: () => {
      return UserService.getUserInfo();
    },
    isAgent() {
      return User.isAgent();
    },
    isAdmin() {
      return User.isAdmin();
    },
    isLender() {
      return User.isLender();
    },
    isCorporate() {
      return User.isCorporate();
    },
  },

  methods: {
    getClubById() {
      let $this = this;
      SystemRepository.getClubById($this.userProfile.professional.club)
        .then((response) => {
          $this.clubName = response.data.data[0].name;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    uploadFile(event) {
      let $this = this;
      $this.$loading(true);
      let data = new FormData();
      data.append('avatar', event.target.files[0]);
      UserRepository.uploadAvatar(data)
        .then((response) => {
          $this.getUserProfile();
          $this.$loading(false);
        })
        .catch((error) => {
          console.error(error);
          $this.$loading(false);
        });
      this.$store.dispatch('user/storeUserPhoto', event.target.files[0]);
    },
  },
};
</script>

<style lang="scss" scoped>
.image-header {
  margin: 10px 0 20px;
}
.user-image,
::v-deep .user-image {
  height: 70px;
  min-width: 70px;
  width: 70px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 8px solid #dbe7f4;
  box-sizing: content-box;
  overflow: hidden;
  display: grid;
  place-content: center;
  img {
    height: 70px;
  }
}

.user-info.with-image {
  display: inline-block;
  width: calc(100% - 90px);
  margin-left: 16px;
}

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
</style>
