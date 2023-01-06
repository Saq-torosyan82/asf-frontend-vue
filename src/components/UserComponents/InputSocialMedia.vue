<template>
  <div class="component social-media">
    <div class="component-header">
      <h3 class="section-header">Social media</h3>
    </div>
    <CustomInput label="Facebook URL" name="Facebook">
      <input
        type="text"
        placeholder="http://www.facebook.com/skyegraham"
        v-model="userProfile.social_media.facebook"
      />
    </CustomInput>
    <CustomInput label="Instagram URL" name="Instagram">
      <input
        type="text"
        placeholder="https://www.instagram.com/username"
        v-model="userProfile.social_media.instagram"
      />
    </CustomInput>
    <CustomInput label="Linkedin URL" name="Linkedin">
      <input
          type="text"
          placeholder="http://linkedin.com/[username]"
          v-model="userProfile.social_media.linkedin"
      />
    </CustomInput>
    <CustomInput label="Twitter URL" name="Twitter">
      <input
        type="text"
        placeholder="http://twitter.com/[username]"
        v-model="userProfile.social_media.twitter"
      />
    </CustomInput>
    <CustomInput label="YouTube URL" name="YouTube">
      <input
        type="text"
        placeholder="youtube.com/yourcustomname"
        v-model="userProfile.social_media.youtube"
      />
    </CustomInput>
    <a href="#" class="button" @click.prevent="updateUserProfile">Save</a>
  </div>
</template>

<script>
import CustomInput from '@/components/CustomInput.vue';
import RepositoryFactory from '../../repositories/RepositoryFactory';
const UserRepository = RepositoryFactory.get('user');
import store from '@/store';
import UserProfileGroup from '../../enums/modules/UserProfileGroup';
import UserProfileKey from '../../enums/modules/UserProfileKey';
import UserMixin from '@/mixins/User/User.mixin';

export default {
  name: 'InputSocialMedia',
  components: {
    CustomInput,
  },
  props: {
    imgPath: String,
    categoryName: String,
    name: String,
  },
  mixins: [UserMixin],
  computed: {
    userProfile() {
      let userProfile = store.getters['user/getUserInfo'];
      if (userProfile.social_media == null) {
        userProfile.social_media = {
          [UserProfileKey.FACEBOOK]: '',
          [UserProfileKey.INSTAGRAM]: '',
          [UserProfileKey.YOUTUBE]: '',
          [UserProfileKey.TWITTER]: '',
          [UserProfileKey.LINKEDIN]: '',
        };
      }
      return userProfile;
    },
  },
  methods: {
    updateUserProfile() {
      let data = new FormData();
      data.append(
        'nx_data',
        JSON.stringify({
          [UserProfileGroup.SOCIAL_MEDIA]:
            this.userProfile[UserProfileGroup.SOCIAL_MEDIA],
        })
      );
      this.$loading(true);
      data.append('_method', 'PATCH');
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
/* a.button {
  display: inline-block;
  margin: 24px 0 12px;
  padding: 14px 40px;
  border-radius: 4px;
  color: #ffffff;
  background-color: #3a9eba;
} */
.input-wrap {
  margin-top: 10px;
}
.component.social-media a.button {
  /*position: absolute;
  bottom: 20px;*/
}
</style>
