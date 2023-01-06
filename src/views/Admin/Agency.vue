<template>
  <div class="content">
    <HeaderNavigation buttonText="Invite a user"> Agency </HeaderNavigation>

    <div class="gridWrap">
      <AgenciesList
        class="grid-item AgenciesList component-no-padding"
      ></AgenciesList>
      <BasicInfoUserCard class="BasicInfoUser" />
      <div class="UserInformation">
        <div class="inner-component">
          <UserProfile>
            <InputUserDetails :phone-label="'Office Number'"></InputUserDetails>
          </UserProfile>
        </div>
        <div class="inner-component link">
          <a href="#" class="link-text">Change the password</a>
        </div>
        <div class="inner-component link remove">
          <a href="#" class="link-text">Remove account</a>
        </div>
      </div>
      <UserDocument class="UserDocument">
        <b-tabs content-class="">
          <b-tab title="Company/Personal" active>
            <UserDocumentList :docs="[]" />
          </b-tab>
          <b-tab title="Deals">
            <UserDocumentList :docs="[]" :type="'deals'" />
          </b-tab>
        </b-tabs>
      </UserDocument>
      <AthleteWidgetCard class="AthleteCard" />
      <InputSocialMedia class="SocialMedia" />
    </div>
  </div>
</template>
<script>
import '@/assets/styles/adminMain.css';
import HeaderNavigation from '@/components/HeaderNavigation.vue';
import AgenciesList from '@/components/AdminUserProfile/AgenciesList.vue';
import CustomInput from '@/components/CustomInput.vue';
import BasicInfoUserCard from '@/components/UserComponents/BasicInfoUserCard';
import UserProfile from '@/components/UserComponents/UserProfile';
import InputUserDetails from '@/components/UserComponents/InputUserDetails';
import UserDocument from '@/components/UserComponents/UserDocument';
import UserDocumentList from '@/components/UserComponents/UserDocumentList';
import InputSocialMedia from '@/components/UserComponents/InputSocialMedia';
import AthleteWidgetCard from '@/components/UserComponents/AthleteWidgetCard';
import BorrowerTypes from '../../enums/modules/BorrowerType';
import User from '../../modules/User/User';

export default {
  name: 'Agency',
  components: {
    HeaderNavigation,
    AgenciesList,
    BasicInfoUserCard,
    UserProfile,
    InputUserDetails,
    UserDocument,
    UserDocumentList,
    InputSocialMedia,
    AthleteWidgetCard,
  },
};
</script>
<style scoped>
.gridWrap {
  display: grid;
  grid-template-columns: 0.8fr 1fr 1.2fr;
  grid-template-rows: 263px auto auto;
  grid-template-areas:
    'AgenciesList BasicInfoUser documents '
    'AgenciesList UserInformation athletes-component '
    'AgenciesList UserInformation social-media '
    'footer footer footer';
  gap: 20px;
  margin: 25px 0;
}
.grid-item {
  background-color: white;
  border-radius: 10px;
}

.AgenciesList {
  grid-area: AgenciesList;
}
.BasicInfoUser {
  grid-area: BasicInfoUser;
}
.UserInformation {
  grid-area: UserInformation;
}

.UserDocument.UserDocument {
  /* height: max-content; */
}
/deep/ .document-list {
  margin-top: 0;
}
/deep/ .document-list ul {
  max-height: 187px;
}
/deep/ .BasicInfoUser.agent-phone {
  grid-area: unset;
}
/deep/ .BasicInfoUser a.button {
  margin-bottom: 0;
}
</style>
<style
  scoped
  lang="scss"
  src="@/assets/styles/user-style/user-agent-edit.scss"
></style>
