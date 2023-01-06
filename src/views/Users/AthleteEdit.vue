<template>
  <div class="content">
    <BaseModal
      :modalType="modalType"
      v-show="showModal"
      @closed="showModal = false"
    />
    <NotificationMessage type="sucess" v-if="showNotification">A cool message</NotificationMessage>
    <HeaderNavigation>Athlete profile</HeaderNavigation>
    <div class="grid">
      <div class="user-information">
        <div class="inner-component">
          <UserProfile>
            <InputUserDetails :phone-label="'Phone Number'"></InputUserDetails>
          </UserProfile>
        </div>
        <div class="inner-component link">
          <a
            href="#"
            class="link-text"
            @click.prevent="displayModal('change-password')"
            >Change the password</a
          >
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

      <div class="component endorsment-deals">
        <div class="component-header">
          <h3 class="section-header">Endorsement deals</h3>
          <a href="#" @click.prevent="isShow = !isShow" class="link-text"
            >+Add endorsement deal</a
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

      <simple-modal v-model="isShow" title="Choose endorsement deal">
        <template slot="body">
          <AddSponsor
            :errorMessage="'This endorsement deal is already added'"
            @sponsorAdded="getSponsorships"
          ></AddSponsor>
        </template>
        <template slot="footer">
          <button>OK</button>
        </template>
      </simple-modal>
      <NewsWidget />

      <InputSocialMedia />

      <Footer class="footer" />
    </div>
  </div>
</template>

<script>
import HeaderNavigation from '@/components/HeaderNavigation.vue';
import Footer from '@/components/Footer.vue';
import NotificationMessage from '@/components/NotificationMessage.vue';
import BaseModal from '@/components/BaseModal.vue';
import UserProfile from '@/components/UserComponents/UserProfile';
import InputUserDetails from '@/components/UserComponents/InputUserDetails';
import UserDocument from '@/components/UserComponents/UserDocument';
import UserDocumentList from '@/components/UserComponents/UserDocumentList';
import InputSocialMedia from '@/components/UserComponents/InputSocialMedia';
import SponsorDetails from '@/components/UserComponents/SponsorDetails';
import AddSponsor from '../../components/UserComponents/AddSponsor';
import DocumentsMixin from '@/mixins/User/Documents.mixin';
import SimpleModal from 'simple-modal-vue';
// import User from '../../modules/User/User';
// import BorrowerTypes from '../../enums/modules/BorrowerType';
import NewsWidget from '@/components/News/NewsWidget.vue';

import UserSponsorsMixin from '@/mixins/User/UserSponsors.mixin';

import RepositoryFactory from '../../repositories/RepositoryFactory';
const UserRepository = RepositoryFactory.get('user');

export default {
  name: 'Welcome',
  components: {
    NotificationMessage,
    HeaderNavigation,
    Footer,
    BaseModal,
    UserProfile,
    InputUserDetails,
    UserDocument,
    UserDocumentList,
    InputSocialMedia,
    SponsorDetails,
    AddSponsor,
    SimpleModal,
    NewsWidget
  },
  mixins: [UserSponsorsMixin, DocumentsMixin],
  mounted() {
    this.getUserDocuments();
  },
  data() {
    return {
      showNotification: false,
      showModal: false,
      modalType: '',
      sponsorships: [],
      isShow: false,
    };
  },
  computed: {},
  methods: {
    displayModal(modalType) {
      this.modalType = modalType;
      this.showModal = true;
    },
  },
  watch: {
    showModal() {
      document.querySelector('body').style.overflow = this.showModal
        ? 'hidden'
        : null;
    },
  },
};
</script>
<style
  scoped
  lang="scss"
  src="@/assets/styles/user-style/user-athlete-edit.scss"
></style>

<style lang="scss" scoped>
::v-deep {
  .document-list {
    max-height: 174px;
  }
}
</style>
