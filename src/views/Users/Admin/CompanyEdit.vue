<template>
  <div class="content">
    <BaseModal
      :modalType="modalType"
      v-show="showModal"
      @closed="showModal = false"
    />
    <NotificationMessage type="sucess" v-if="showNotification">A cool message</NotificationMessage>
    <HeaderNavigation>Company profile</HeaderNavigation>
    <div class="grid">
      <OrganizationList
        @editCompany="getUserInfo"
        class="column component-no-padding company-list"
      />
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
        </b-tabs>
      </UserDocument>
      <div class="component endorsment-deals">
        <div class="component-header">
          <h3 class="section-header">Current sponsors</h3>
          <a href="#" @click.prevent="isShow = !isShow" class="link-text"
            >+Add sponsor</a
          >
        </div>
        <div class="deals">
          <SponsorDetails
            v-for="(sposnsor, key) in sponsorships"
            :key="key"
            :sponsor="sposnsor"
            @sponsorRemoved="removeSponsor(key)"
          />
        </div>
      </div>

      <simple-modal v-model="isShow" title="Choose sponsor">
        <template slot="body">
          <AddSponsor
            :errorMessage="'This sponsor is already added'"
            @sponsorAdded="getSponsorships"
          ></AddSponsor>
        </template>
        <template slot="footer">
          <button>OK</button>
        </template>
      </simple-modal>

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
import BasicInfoUserCard from '@/components/UserComponents/BasicInfoUserCard';
import UserProfile from '@/components/UserComponents/UserProfile';
import InputUserDetails from '@/components/UserComponents/InputUserDetails';
import UserDocument from '@/components/UserComponents/UserDocument';
import UserDocumentList from '@/components/UserComponents/UserDocumentList';
import SponsorDetails from '@/components/UserComponents/SponsorDetails';
import InputSocialMedia from '@/components/UserComponents/InputSocialMedia';
import BorrowerTypes from '@/enums/modules/BorrowerType';
import AddSponsor from '@/components/UserComponents/AddSponsor';
import SimpleModal from 'simple-modal-vue';
import BaseModal from '@/components/BaseModal';
import OrganizationList from '@/components/AdminUserProfile/OrganizationList';

import UserSponsorsMixin from '@/mixins/User/UserSponsors.mixin';
import DocumentsMixin from '@/mixins/User/Documents.mixin';
import UserMixin from '@/mixins/User/User.mixin';

export default {
  name: 'AdminCompanyEdit',
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
    AddSponsor,
    SimpleModal,
    OrganizationList,
  },
  mixins: [UserSponsorsMixin, DocumentsMixin, UserMixin],
  data() {
    return {
      showNotification: false,
      showModal: false,
      modalType: '',
    };
  },
  computed: {
    borrwerTypes: function () {
      return BorrowerTypes;
    },
    companyHash() {
      return store.getters['editUser/getHash'];
    },
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    displayModal(modalType) {
      this.modalType = modalType;
      this.showModal = true;
    },
    getUserInfo() {
      this.getUserDocuments();
      this.getProfileInfo(this.companyHash);
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
  grid-template-columns: 0.7fr 1.15fr 1.15fr;
  grid-template-rows: 250px 192px auto;
  grid-template-areas:
    'company-list agent-phone documents '
    'company-list user-info endorsment-deals '
    'company-list user-info social-media  '
    'footer footer footer';
}

.company-list {
  grid-area: company-list;
}
.endorsment-deals {
  height: auto;
}
</style>
