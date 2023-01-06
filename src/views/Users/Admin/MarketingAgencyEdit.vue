<template>
  <div class="content">
    <BaseModal
        :modalType="modalType"
        v-show="showModal"
        @closed="showModal = false"
    />
    <NotificationMessage type="sucess" v-if="showNotification">A cool message</NotificationMessage>
    <HeaderNavigation>Marketing Agency profile</HeaderNavigation>
    <div class="grid">
      <MarketingAgencyList
          @editAgent="getAgentData"
          class="column agencies-list component-no-padding"
      />
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
          <a href="#" class="link-text">Remove account</a>
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
      <AthleteWidgetCard />
      <InputSocialMedia />
      <Footer class="footer" />
    </div>
  </div>
</template>

<script>
import store from '@/store';
import HeaderNavigation from '@/components/HeaderNavigation.vue';
import Footer from '@/components/Footer.vue';
import NotificationMessage from '@/components/NotificationMessage.vue';
import CustomInput from '@/components/CustomInput.vue';
import BasicInfoUserCard from '@/components/UserComponents/BasicInfoUserCard';
import UserProfile from '@/components/UserComponents/UserProfile';
import InputUserDetails from '@/components/UserComponents/InputUserDetails';
import UserDocument from '@/components/UserComponents/UserDocument';
import UserDocumentList from '@/components/UserComponents/UserDocumentList';
import InputSocialMedia from '@/components/UserComponents/InputSocialMedia';
import AthleteWidgetCard from '@/components/UserComponents/AthleteWidgetCard';
import BaseModal from '@/components/BaseModal';
import MarketingAgencyList from "@/components/AdminUserProfile/MarketingAgencyList";
import DocumentsMixin from '@/mixins/User/Documents.mixin';
import UserMixin from '@/mixins/User/User.mixin';

import RepositoryFactory from '@/repositories/RepositoryFactory';
const UserRepository = RepositoryFactory.get('user');

export default {
  name: 'MarketingAgencyAdminEdit',
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
    MarketingAgencyList
    // SponsorDetails
  },
  mixins: [DocumentsMixin, UserMixin],
  mounted() {},
  beforeMount() {
    this.getUserDocuments();
    this.getProfileInfo(this.agentHash);
  },
  data() {
    return {
      showNotification: false,
      showModal: false,
      modalType: '',
    };
  },
  computed: {
    agentHash() {
      return store.getters['editUser/getHash'];
    },
  },
  methods: {
    displayModal(modalType) {
      this.modalType = modalType;
      this.showModal = true;
    },
    getUserAthletes() {
      UserRepository.getUserAthletes()
          .then((response) => {
            store.dispatch('user/storeUserAthletes', response.data.data);
          })
          .catch((error) => {
            console.error(error);
          });
    },
    getAgentData() {
      this.getUserDocuments();
      this.getProfileInfo(this.agentHash);
      this.getUserAthletes();
    },
  },
};
</script>

<style
    scoped
    lang="scss"
    src="@/assets/styles/user-style/user-agent-edit.scss"
></style>

<style lang="scss" scoped>
.grid.grid {
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto minmax(auto, 192px) auto 160px;
  grid-template-areas:
    'agencies-list agent-phone documents '
    'agencies-list user-info athletes-component '
    'agencies-list user-info social-media '
    'footer footer  footer';
}
.agencies-list {
  grid-area: agencies-list;
}
</style>
