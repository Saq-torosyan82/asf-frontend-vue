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
    <HeaderNavigation>Lender profile</HeaderNavigation>
    <div class="grid">
      <LendersList
        @editLender="getUserInfo"
        class="lender-list component-no-padding"
      ></LendersList>
      <BasicInfoUserCard />
      <div class="user-information">
        <div class="inner-component">
          <UserProfile>
            <LenderDetails :phone-label="'Office Number'"></LenderDetails>
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
          <b-tab title="Term Sheets" active>
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

      <DealCriteria class="deal-criteria" />

      <Footer class="footer" />
    </div>
  </div>
</template>

<script>
import store from '@/store';
import BaseModal from '@/components/BaseModal';
import HeaderNavigation from '@/components/HeaderNavigation.vue';
import Footer from '@/components/Footer.vue';
import NotificationMessage from '@/components/NotificationMessage.vue';
import BasicInfoUserCard from '@/components/UserComponents/BasicInfoUserCard';
import UserProfile from '@/components/UserComponents/UserProfile';
import UserDocument from '@/components/UserComponents/UserDocument';
import UserDocumentList from '@/components/UserComponents/UserDocumentList';
import BorrowerTypes from '@/enums/modules/BorrowerType';
import LenderDetails from '@/components/UserComponents/LenderDetails';
import DealCriteria from '@/components/UserComponents/DealCriteria';
import LendersList from '@/components/AdminUserProfile/LendersList';
import DocumentsMixin from '@/mixins/User/Documents.mixin';
import UserMixin from '@/mixins/User/User.mixin';
import UserService from '@/services/user.service.js';

import RepositoryFactory from '@/repositories/RepositoryFactory';
const UserRepository = RepositoryFactory.get('user');

export default {
  name: 'AdminLenderEdit',
  components: {
    NotificationMessage,
    BaseModal,
    HeaderNavigation,
    DealCriteria,
    Footer,
    BasicInfoUserCard,
    UserProfile,
    LenderDetails,
    UserDocument,
    UserDocumentList,
    LendersList,
  },
  mixins: [UserMixin, DocumentsMixin],
  data() {
    return {
      showNotification: false,
      loaded: false,
      showModal: false,
      modalType: '',
    };
  },
  computed: {
    borrwerTypes: function () {
      return BorrowerTypes;
    },
    isAdmin() {
      return UserService.isAdmin();
    },
    isLender() {
      return UserService.isLender();
    },
    isBorrower() {
      return UserService.isBorrower();
    },
    lenderHash() {
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
      this.getProfileInfo(this.lenderHash);
      store.dispatch('lenderCriteria/getCriteria');
      store.dispatch('lenderCriteria/getCountries');
      store.dispatch('lenderCriteria/getSports');
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
  grid-template-rows: 250px auto auto auto;
  grid-template-areas:
    'lender-list agent-phone documents'
    'lender-list user-info deal-criteria'
    'lender-list user-info credit-criteria'
    'footer footer footer';
}

.athlete-list {
  grid-area: lender-list;
}
.deal-criteria {
  grid-area: deal-criteria;
}
.credit-criteria {
  grid-area: credit-criteria;
}
/* ::v-deep {
  .document-list {
    max-height: 173px;
  }
}
.endorsment-deals {
  height: auto;
} */
</style>
