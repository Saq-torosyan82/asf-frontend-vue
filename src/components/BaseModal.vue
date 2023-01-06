<template>
  <div class="modal-wrapper">
    <div v-if="modalType == 'view-file'" class="modal-base view-file">
      <div class="close-modal-btn" @click="$emit('closed')">
        <icon name="close" />
      </div>
      <slot></slot>
    </div>

    <div v-if="modalType == 'accept-terms'" class="modal-base">
      <h3>Terms</h3>
      <slot></slot>
    </div>

    <div v-if="modalType == 'error'" class="modal-base">
      <slot></slot>
    </div>

    <div
      v-if="modalType == 'add-athlete'"
      class="modal-base modal-base-add-athlete"
    >
      <div class="close-modal-btn" @click="$emit('closed')">
        <icon name="close" />
      </div>
      <AddAthlete @added="$emit('closed')"></AddAthlete>
    </div>

    <div v-if="modalType == 'add-league'" class="modal-base">
      <div class="close-modal-btn" @click="$emit('closed')">
        <icon name="close" />
      </div>
      <AddLeague
        @update-leagues-list="$emit('update-leagues-list')"
      ></AddLeague>
    </div>

    <div v-if="modalType == 'add-brand'" class="modal-base">
      <div class="close-modal-btn" @click="$emit('closed')">
        <icon name="close" />
      </div>
      <AddBrand @update-list="$emit('update-list')"></AddBrand>
    </div>

    <div v-if="modalType == 'add-sponsor'" class="modal-base">
      <div class="close-modal-btn" @click="$emit('closed')">
        <icon name="close" />
      </div>
      <AddSponsor @update-list="$emit('update-list')"></AddSponsor>
    </div>

    <div v-if="modalType == 'add-club'" class="modal-base">
      <div class="close-modal-btn" @click="$emit('closed')">
        <icon name="close" />
      </div>
      <AddClub @update-clubs-list="$emit('update-clubs-list')"></AddClub>
    </div>

    <div v-if="modalType == 'verify'" class="modal-base">
      <EnvelopeSVG />
      <h3>
        Your company is already using SportsFi<br />
        and we need to verify your data.
      </h3>
      <p>
        You will receive a confirmation email to
        {{ email ? email : 'user@mail.com' }}.
      </p>
    </div>
    <div v-if="modalType == 'onboarding'" class="modal-base">
      <OnboardingSucces />
      <h3>You have successfully completed<br />platform onboarding!</h3>
      <LoaderSVG class="loader" />
    </div>

    <div v-if="modalType == 'onboarding-check-organisation'" class="modal-base">
      <OpenEnvelope />
      <h3>
        Your company is already using SportsFi and we need to verify your data.
      </h3>
      <p>You will receive a confirmation email to {{ userEmail }}</p>
    </div>

    <div v-if="modalType == 'save-deal'" class="modal-base">
      <OnboardingSucces />
      <h3>Your deal was saved.</h3>
      <LoaderSVG class="loader" />
    </div>

    <div v-if="modalType == 'register'" class="modal-base">
      <OnboardingSucces />
      <h3>You have successfully registered.<br />Please, check your email</h3>
      <LoaderSVG class="loader" />
    </div>

    <div v-if="modalType == 'magic-link-success'" class="modal-base">
      <h3>Please, check your email</h3>
    </div>

    <div v-if="modalType == 'upload-contract'" class="modal-base">
      <UploadDraftContractModal
        :doc="{ type: 'draft_contract' }"
        @closed="closedModal"
      ></UploadDraftContractModal>
    </div>

    <div v-if="modalType == 'upload-credit-analysis'" class="modal-base">
      <UploadCreditAnalysis
        :doc="{ type: 'credit_analysis' }"
        @closed="closedModal"
      ></UploadCreditAnalysis>
    </div>

    <div v-if="modalType == 'edit-deal-criteria'" class="modal-credit-citeria">
      <div class="close" @click="$emit('closed')">
        <icon name="close" />
      </div>
      <EditDealCriteria
        :deal-criteria="dealCriteria"
        @close-modal="$emit('closed')"
      ></EditDealCriteria>
    </div>

    <div v-if="modalType == 'add-deal-criteria'" class="modal-credit-citeria">
      <div class="close" @click="$emit('closed')">
        <icon name="close" />
      </div>
      <AddDealCriteria @deal-added="$emit('closed')"></AddDealCriteria>
    </div>

    <div v-if="modalType == 'upload-term'" class="modal-base">
      <UploadTermSheetModal
        :doc="{ type: 'term_sheet' }"
        @closed="closedModal"
      ></UploadTermSheetModal>
    </div>

    <div v-if="modalType == 'change-password'" class="modal-password">
      <div class="modal-header">
        <h5>Change your password</h5>
        <div @click="$emit('closed')">
          <icon name="close" />
        </div>
      </div>
      <ChangePasswordForm @success="$emit('closed')"></ChangePasswordForm>
    </div>

    <div
      v-if="modalType == 'delete-account'"
      class="modal-password modal-delete"
    >
      <div @click="$emit('closed')" class="close-icon">
        <icon name="close" />
      </div>

      <DeleteSVG />
      <p>Are you sure you want to remove account?</p>
      <button class="btn" @click="deleteAccount">Delete your account</button>
      <button @click="$emit('closed')" class="btn cancel">Cancel</button>
    </div>

    <div v-if="modalType == 'delete-user'" class="modal-password modal-delete">
      <div @click="$emit('closed')" class="close-icon">
        <icon name="close" />
      </div>
      <DeleteSVG />
      <p>Are you sure ?</p>
      <button class="btn" @click="$emit('delete')">Delete</button>
      <button @click="$emit('closed')" class="btn cancel">Cancel</button>
    </div>

    <div
      v-if="modalType == 'disable-account'"
      class="modal-password modal-delete"
    >
      <div @click="$emit('closed')" class="close-icon">
        <icon name="close" />
      </div>

      <DeleteSVG />
      <p>Are you sure you want to remove account?</p>
      <button class="btn" @click="disableAccount(userHash)">
        Disable account
      </button>
      <button @click="$emit('closed')" class="btn cancel">Cancel</button>
    </div>

    <div v-if="modalType == 'delete-deal'" class="modal-delete-deal">
      <div @click="$emit('closed')" class="close-icon">
        <icon name="close" />
      </div>

      <p>Are you sure you want to delete a deal?</p>
      <button class="btn" @click.prevent="accept">Delete</button>
      <button @click.prevent="cancel" class="btn cancel">Cancel</button>
    </div>

    <div
      v-if="modalType == 'calculator-documents-successful'"
      class="modal-base"
    >
      <DocumentUploadIcon />
      <h3>You have successfully submitted<br />the documents!</h3>
      <LoaderSVG class="loader" />
    </div>

    <div
      v-if="modalType == 'financial-documents-successful-uploading'"
      class="modal-base"
    >
      <DocumentUploadIcon />
      <h3>Submitting your documents...</h3>
      <LoaderSVG class="loader" />
    </div>

    <div
      v-if="modalType == 'calculator-documents-unsuccessful'"
      class="modal-base documents-fail"
    >
      <div @click="$emit('closed')" class="close-icon">
        <icon name="close" />
      </div>
      <DocumentUploadFailIcon />
      <h3>Not all documents were uploaded</h3>
      <p>
        Your application for a deal can’t be processed<br />untill you provide
        all neccessary documents.<br /><br />You can upload them later through
        <a>My deals</a> or <a>User profile</a> sections.
      </p>
      <button class="button upload-now">Upload now</button>
      <button class="button upload-later">Upload later</button>
    </div>

    <UploadDocuments
      :doc="doc"
      @closed="closedModal"
      v-if="modalType == 'upload-documents'"
      class="modal-base"
    ></UploadDocuments>

    <div
      v-if="modalType == 'anonymous-click'"
      class="modal-base"
      @closed="closedModal"
    >
      <div @click="$emit('closed')" class="close-icon">
        <icon name="close" />
      </div>
      <div class="anonymous-click-content">
        <h3>You cannot see deal details.</h3>
        <p class="text">
          You cannot see deal details that doesn't match your Deal criteria.
        </p>
        <a class="button" @click="$emit('closed')">Ok</a>
      </div>
    </div>

    <UploadFinancialDocuments
      v-if="modalType === 'upload-financial-documents'"
      :tab-id="tabId"
      :club-id="clubId"
      :doc="{ type: 'financial' }"
      @closed="closedModal"
      @documentsSubmitted="documentsSubmitted"
      class="modal-base"
    ></UploadFinancialDocuments>
    <div v-if="modalType == 'club-snapshot'" id="modal-club-snapshot">
      <div class="close" @click="$emit('closed')">
        <icon name="close" />
      </div>
      <TotalSnapshotReport :fullSnapshotData="fullSnapshotReport" @selectedCurrency="onSelectedCurrency"/>
    </div>
    <div
      v-if="modalType == 'select-sport'"
      class="modal-base"
      style="max-width: 300px"
    >
      <div class="close" @click="$emit('closed')">
        <icon name="close" />
      </div>
      <h3 style="margin-top: 0px">
        Please select the news you're interested in
      </h3>
      <label
        v-for="(item, index) in sportsArray"
        :key="index"
        class="checkbox-container"
        >{{ item.name }}
        <input type="checkbox" @click="(event) => addSport(item.id, event)" />
        <span class="checkmark"></span>
      </label>
    </div>

    <div
      v-if="modalType == 'remove-regular-user'"
      class="modal-password modal-delete"
    >
      <div @click="$emit('closed')" class="close-icon">
        <icon name="close" />
      </div>
      <DeleteSVG />
      <p>Are you sure you want to remove this account?</p>
      <button class="btn" @click="removeRegularUser">
        Remove user account
      </button>
      <button @click="$emit('closed')" class="btn cancel">Cancel</button>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import EnvelopeSVG from '@/assets/icons/open-envelope.svg';
import OnboardingSucces from '@/assets/icons/onboarding-succes.svg';
import OpenEnvelope from '@/assets/icons/open-envelope.svg';
import LoaderSVG from '@/assets/icons/loader.svg';
import DeleteSVG from '@/assets/img/editProfile/removeAccount.svg';
import DocumentUploadIcon from '@/assets/icons/document-upload-icon.svg';
import DocumentUploadFailIcon from '@/assets/icons/document-upload-fail-icon.svg';
import ChangePasswordForm from '@/components/Forms/ChangePassword';
import UploadDraftContractModal from './modals/UploadDraftContractModal';
import EditDealCriteria from './Forms/EditDealCriteria';
import AddDealCriteria from './Forms/AddDealCriteria';
import UploadTermSheetModal from './modals/UploadTermSheetModal';
import UserService from '@/services/user.service';
import UploadFinancialDocuments from './modals/UploadFinancialDocuments';
import UploadCreditAnalysis from './modals/UploadCreditAnalysis';
import AddAthlete from '../views/AddAthlete';
import TotalSnapshotReport from '@/components/Financials/snapshot-report/TotalSnapshotReport';
import AddLeague from './modals/AddLeague';
import AddClub from './modals/AddClub';
import AddBrand from './modals/AddBrand';
import AddSponsor from './modals/AddSponsor';

import UploadDocuments from '@/components/modals/UploadDocuments.vue';
import RemoveDisableAccount from '@/mixins/User/RemoveDisableAccount.mixin';
import RepositoryFactory from '../repositories/RepositoryFactory';
import TokenService from '../services/token.service';

const UserRepository = RepositoryFactory.get('user');
const AuthRepository = RepositoryFactory.get('logout');
const NewsRepository = RepositoryFactory.get('news');

export default {
  name: 'BaseModal',
  components: {
    EnvelopeSVG,
    OnboardingSucces,
    LoaderSVG,
    DeleteSVG,
    DocumentUploadIcon,
    DocumentUploadFailIcon,
    UploadDocuments,
    ChangePasswordForm,
    UploadDraftContractModal,
    UploadTermSheetModal,
    OpenEnvelope,
    EditDealCriteria,
    AddDealCriteria,
    UploadFinancialDocuments,
    UploadCreditAnalysis,
    AddAthlete,
    TotalSnapshotReport,
    AddLeague,
    AddClub,
    AddBrand,
    AddSponsor,
  },
  mixins: [RemoveDisableAccount],
  data: function () {
    return {};
  },
  props: {
    modalType: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    doc: {
      type: Object,
    },
    tabId: {
      type: Number,
    },
    clubId: {
      type: String,
    },
    dealCriteria: {
      type: Object,
    },
    fullSnapshotReport: {
      type: Object,
    },
    userId: {
      type: String,
    },
    sportsArray: {
      type: Array,
    },
    selectedSportsArray: {
      type: Array,
    },
  },
  computed: {
    userEmail() {
      let user = UserService.getUserInfo();
      return user.email;
    },
    userHash() {
      return store.getters['editUser/getHash'];
    },
  },
  methods: {
    closedModal() {
      this.$emit('closed', true);
    },
    cancel() {
      this.$emit('cancel', true);
    },
    accept() {
      this.$emit('accept', true);
    },
    deleteAccount() {
      let $this = this;
      UserRepository.deleteAccount()
        .then((response) => {
          AuthRepository.logout().then(() => {
            TokenService.removeToken();
            window.location.href = '/login';
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    documentsSubmitted(message) {
      this.$emit('documentsSubmitted', message);
    },
    addSport(id, event) {
      if (id && event) {
        if (event.target.checked) {
          this.selectedSportsArray.push(id);
        } else {
          this.selectedSportsArray = this.selectedSportsArray.filter(
            (e) => e !== id
          );
        }
      }
      this.saveSport();
    },
    saveSport() {
      NewsRepository.saveSport(this.selectedSportsArray)
        .then((res) => {})
        .catch((err) => {
          console.error(err.message);
        });
    },
    removeRegularUser() {
      UserRepository.deleteCompanyUsers(this.userId)
        .then((res) => {
          this.$emit('removeUser', this.userId);
        })
        .catch((err) => {
          console.error(err.message);
        });
    },
    onSelectedCurrency(currency) {
      this.$emit('selectedCurrency', currency);
    },
  },

  mounted() {
    // document.body.style.overflow = 'hidden';
    // document.body.style.height = '100vh';
  },
};
</script>

<style lang="scss" src="@/assets/styles/modal.scss"></style>
