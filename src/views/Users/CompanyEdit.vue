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
    <HeaderNavigation>User profile</HeaderNavigation>
    <div class="grid">
      <BasicInfoUserCard />
      <div class="user-information">
        <div class="inner-component">
          <UserProfile>
            <InputUserDetails :phone-label="'Office Number'"></InputUserDetails>
          </UserProfile>
        </div>
        <div class="inner-component link">
          <a
            href="#"
            @click.prevent="displayModal('change-password')"
            class="link-text"
            >Change the password</a
          >
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
            />
          </b-tab>
          <b-tab title="Deals">
            <UserDocumentList
              @updateList="getUserDocuments"
              :docs="documents.deals"
              :type="'deals'"
            />
          </b-tab>
          <b-tab title="Financial">
            <FinancialDocumentList />
          </b-tab>
        </b-tabs>
      </UserDocument>
      <div class="component endorsment-deals">
        <div class="component-header">
          <h3 class="section-header">Current sponsors</h3>
          <label class="lbl-add-sponsor" @click="handleSponsorDialog(true)"
            >+Add sponsor</label
          >
        </div>
        <div class="deals" v-if="sponsorships.length > 0">
          <SponsorDetails
            v-for="(sposnsor, key) in sponsorships"
            :key="key"
            :sponsor="sposnsor"
            @sponsorRemoved="removeSponsor(key)"
          />
        </div>
        <div v-else class="no-items">
          <h5>There are no sponsors.</h5>
        </div>
      </div>

      <InputSocialMedia class="input-social-media" />
      <NewsWidget />
      <UserWidget />
      <AddSponsorDialog
        :sponsorDialog="sponsorDialog"
        @handleSponsorDialog="handleSponsorDialog"
        @onSuccessAddSponsor="onSuccessAddSponsor"
      />

      <Footer class="footer" />
    </div>
  </div>
</template>

<script>
import HeaderNavigation from '@/components/HeaderNavigation.vue';
import Footer from '@/components/Footer.vue';
import NotificationMessage from '@/components/NotificationMessage.vue';
import BasicInfoUserCard from '@/components/UserComponents/BasicInfoUserCard';
import UserProfile from '@/components/UserComponents/UserProfile';
import InputUserDetails from '@/components/UserComponents/InputUserDetails';
import UserDocument from '@/components/UserComponents/UserDocument';
import UserDocumentList from '@/components/UserComponents/UserDocumentList';
import SponsorDetails from '@/components/UserComponents/SponsorDetails';
import InputSocialMedia from '@/components/UserComponents/InputSocialMedia';
// import User from '../../modules/User/User';
import BorrowerTypes from '../../enums/modules/BorrowerType';
import BaseModal from '@/components/BaseModal';
import FinancialDocumentList from '@/components/Financials/FinancialDocumentList';
import NewsWidget from '@/components/News/NewsWidget.vue';
import UserWidget from '@/components/UserComponents/UserWidget.vue';
import AddSponsorDialog from '@/components/DashboardComponents/CorporateDashboardComponents/AddSponsorDialog.vue';
import UserSponsorsMixin from '@/mixins/User/UserSponsors.mixin';
import DocumentsMixin from '@/mixins/User/Documents.mixin';

export default {
  name: 'Welcome',
  components: {
    NotificationMessage,
    HeaderNavigation,
    Footer,
    BaseModal,
    BasicInfoUserCard,
    UserProfile,
    InputUserDetails,
    UserDocument,
    UserDocumentList,
    SponsorDetails,
    InputSocialMedia,
    FinancialDocumentList,
    NewsWidget,
    UserWidget,
    AddSponsorDialog,
  },
  mixins: [UserSponsorsMixin, DocumentsMixin],
  data() {
    return {
      showNotification: false,
      showModal: false,
      modalType: '',
      sponsorDialog: false,
    };
  },
  computed: {
    borrwerTypes: function () {
      return BorrowerTypes;
    },
  },
  mounted() {
    this.getUserDocuments();
  },
  methods: {
    displayModal(modalType) {
      this.modalType = modalType;
      this.showModal = true;
    },
    handleSponsorDialog(b_value) {
      this.sponsorDialog = b_value;
    },
    onSuccessAddSponsor() {
      this.getSponsorships();
    },
  },
};
</script>

<style
  scoped
  lang="scss"
  src="@/assets/styles/user-style/user-company-edit.scss"
></style>
<style lang="scss" scoped>
.grid.grid {
  grid-template-rows: 270px minmax(auto, 192px) auto 160px;
}
::v-deep .document-list {
  max-height: 192px;
}

@media only screen and (min-width: 1294px) {
  .grid.grid {
    grid-template-columns: 0.8fr 1.2fr;
    grid-template-rows: minmax(auto, 275px) 260px 280px auto auto auto;
    grid-template-areas:
      'agent-phone documents'
      'user-info news-widget-container'
      'user-info user-widget-container'
      'user-info endorsment-deals'
      'user-info input-social-media'
      'footer footer';
  }
}

@media only screen and (max-width: 1294px) {
  .grid.grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: minmax(auto, 275px) 260px 280px auto auto auto;
    grid-template-areas:
      'agent-phone documents'
      'user-info news-widget-container'
      'user-info user-widget-container'
      'user-info endorsment-deals'
      'user-info input-social-media'
      'footer footer';
  }
}
@media only screen and (max-width: 900px) {
  .grid.grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto 260px 280px auto auto auto;
    grid-template-areas:
      'agent-phone'
      'user-info'
      'documents'
      'news-widget-container'
      'user-widget-container'
      'endorsment-deals'
      'input-social-media'
      'footer';
  }
}

.input-social-media {
  grid-area: input-social-media;
}
.endorsment-deals {
  height: max-content;
  min-height: stretch;
}
</style>
