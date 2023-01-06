<template>
  <div>
    <div class="club-general component">
      <div class="club-header">
        <h3 class="club-header">{{ cardHeader }}</h3>
        <a href="/edit" class="link-text" @click="showModal = true"
          ><icon name="edit-icon" />Edit</a
        >
      </div>
      <div class="club-image">
        <img v-if="avatarUrl && !isPublicAvatar" v-auth-image="avatarUrl" />
        <img v-else-if="isPublicAvatar" :src="avatarUrl" />
        <img v-else src="@/assets/img/person-default.png" />
      </div>
      <div class="club-name">
        <h3>{{ cardName }}</h3>
        <country-flag
          v-if="countryFlag"
          :country="countryFlag"
          size="normal"
          :rounded="true"
        />
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import store from '@/store';
export default {
  name: 'InfoCard',
  props: {
    cardHeader: String,
    cardName: String,
    countryFlag: String,
  },
  computed: {
    avatarUrl() {
      let userInfo = store.getters['user/getUserInfo'];
      if (userInfo.user) {
        return store.getters['user/getUserInfo'].user.avatar;
      }
      return '';
    },
    isPublicAvatar() {
      let userInfo = store.getters['user/getUserInfo'];
      if (
        userInfo.user &&
        userInfo.user.avatar &&
        userInfo.user.is_public_avatar
      ) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.row {
  /* margin-top: 0; */
}
.col {
  padding-top: 0px;
  padding-bottom: 0;
}

.section-header {
  margin-bottom: 15px;
}
.club-name {
  ::v-deep .flag.normal-flag {
    margin: 0;
    margin-right: -0.9em;
    /* border: 2px solid #17afd9; */
    filter: drop-shadow(1px 1px 4px rgba(0, 0, 0, 0.25));
    padding: 20px;
  }
}

.club-image {
  aspect-ratio: 1;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  margin: 0 auto;
  border: 8px solid #dbe7f4;
  box-sizing: content-box;
  overflow: hidden;
  display: grid;
  place-content: center;
  position: relative;
  img {
    height: 100%;
    width: 100%;
    position: absolute;
    object-fit: scale-down;
  }
}
</style>
