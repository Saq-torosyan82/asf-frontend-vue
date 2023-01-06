<template>
  <div class="content">
    <BaseModal
      :modalType="modalType"
      v-show="showModal"
      @closed="showModal = false"
    />
    <NotificationMessage type="sucess" v-if="showNotification"
      >A cool message</NotificationMessage
    >
    <HeaderNavigation>Agent profile</HeaderNavigation>
    <div class="grid">
      <BasicInfoUserCard />
      <div class="user-information">
        <div class="inner-component">
          <UserProfile>
            <InputUserDetails :phone-label="'Office Number'"></InputUserDetails>
          </UserProfile>
        </div>
        <div class="inner-component link">
          <a href="#" class="link-text">Change the password</a>
        </div>
        <div class="inner-component link remove">
          <a href="#" class="link-text" @click="displayModal('delete-account')"
            >Remove account</a
          >
        </div>
      </div>
      <UserDocument>
        <b-tabs content-class="">
          <b-tab title="Company/Personal" active>
            <UserDocumentList
              @updateList="getUserDocuments"
              :docs="documents.personal"
              :type="'term_sheets'"
            />
          </b-tab>
          <b-tab title="Deals">
            <UserDocumentList
              @updateList="getUserDocuments"
              :docs="documents.deals"
              :type="'deals'"
            />
          </b-tab>
        </b-tabs>
      </UserDocument>
      <NewsWidget />
      <AthleteWidgetCard />
      <InputSocialMedia />
      <UserWidget />

      <Footer class="footer" />
    </div>
  </div>
</template>

<script>
import HeaderNavigation from '@/components/HeaderNavigation.vue';
import Footer from '@/components/Footer.vue';
import NotificationMessage from '@/components/NotificationMessage.vue';
// import CustomInput from '@/components/CustomInput.vue';
import BasicInfoUserCard from '@/components/UserComponents/BasicInfoUserCard';
import UserProfile from '@/components/UserComponents/UserProfile';
import InputUserDetails from '@/components/UserComponents/InputUserDetails';
import UserDocument from '@/components/UserComponents/UserDocument';
import UserDocumentList from '@/components/UserComponents/UserDocumentList';
import InputSocialMedia from '@/components/UserComponents/InputSocialMedia';
import AthleteWidgetCard from '@/components/UserComponents/AthleteWidgetCard';
import BaseModal from '@/components/BaseModal';
import NewsWidget from '@/components/News/NewsWidget.vue';
import UserWidget from '@/components/UserComponents/UserWidget.vue';

import DocumentsMixin from '@/mixins/User/Documents.mixin';

export default {
  name: 'AgentEdit',
  components: {
    NotificationMessage,
    HeaderNavigation,
    Footer,
    BasicInfoUserCard,
    UserProfile,
    InputUserDetails,
    UserDocument,
    UserDocumentList,
    InputSocialMedia,
    AthleteWidgetCard,
    BaseModal,
    NewsWidget,
    UserWidget,
    // SponsorDetails
  },
  mixins: [DocumentsMixin],
  mounted() {
    this.getUserDocuments();
  },
  data() {
    return {
      showNotification: false,
      showModal: false,
      modalType: '',
    };
  },
  computed: {},
  methods: {
    displayModal(modalType) {
      this.modalType = modalType;
      this.showModal = true;
    },
  },
};
</script>

<style
  scoped
  lang="scss"
  src="@/assets/styles/user-style/user-agent-edit.scss"
></style>
