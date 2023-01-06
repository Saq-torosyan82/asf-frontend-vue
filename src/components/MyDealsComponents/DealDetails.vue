<template>
  <div class="counterparties component">
    <div class="inline counterparties-component-header">
      <h1 class="component-header">Counterparties</h1>
      <a @click="$emit('closeDeal')" v-if="isAdmin">
        <icon name="close" />
      </a>
    </div>

    <b-row class="parties">
      <b-col class="party">
        <h5 class="header">Borrower:</h5>
        <img width="60" height="60" v-if="borrower.avatar" v-auth-image="borrower.avatar" alt="" />
        <img width="60" height="60" v-else src="@/assets/img/person-default.png" alt="" />
        <p>
          {{ borrower.name || borrower.name !== '' ? borrower.name : 'n/a' }}
        </p>
      </b-col>
      <b-col class="party">
        <h5 class="header">Counterparty:</h5>
        <img v-if="counterparty.avatar" :src="counterparty.avatar" alt="" />
        <img v-else src="@/assets/img/person-default.png" alt="" />
        <p>
          {{
            counterparty.name || counterparty.name !== ''
              ? counterparty.name
              : 'n/a'
          }}
        </p>
      </b-col>
      <b-col class="party">
        <div v-if="dealType != futureDealType">
          <h5 class="header">Lender:</h5>
          <img v-if="lender.avatar" v-auth-image="lender.avatar" alt="" />
          <img v-else src="@/assets/img/person-default.png" alt="" />
          <p>{{ lender.name || lender.name !== '' ? lender.name : 'n/a' }}</p>
        </div>
      </b-col>
    </b-row>

    <div class="deal-type-progress" v-if="dealType != futureDealType">
      <p>Commercial endorsement deal</p>

      <div class="labels">
        <label class="label-dark">{{ statusBar.label }}</label>
        <label class="percentage label-dark">{{ statusBar.percentaje }}%</label>
      </div>
      <div class="progress">
        <div
          class="progress-bar"
          role="progressbar"
          :style="{ width: statusBar.percentaje + '%' }"
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>

    <div
      v-if="
        isLender &&
        status === dealStatuses.LIVE &&
        (reason === reasons.APPROVED_ASF ||
          reason === reasons.TERMS_UPLOADED) &&
        Object.keys(offer).length <= 0
      "
      class="term-sheet"
    >
      <hr />
      <BaseModal
        v-if="uploadTermModal"
        v-on:closed="closeUploadTerm"
        :modal-type="'upload-term'"
      ></BaseModal>
      <h5 class="component-header">Submit term sheet</h5>
      <p class="text">
        This application was reveiwed by admin and is now submitted to lenders.
        If you are interested in this deal, you can send an offer to the
        borrower
      </p>
      <a class="link-text block" href="#">See default terms</a>

      <a href="#" class="button mr-1">Submit default terms</a>
      <a href="#" class="button" @click.prevent="uploadTermModal = true"
        >Upload Term Sheet</a
      >
      <hr />
    </div>
    <!-- 
    <hr /> -->

    <div class="update-information">
      <DealStatus v-if="dealType != futureDealType" />
      <SignContract
        v-if="
          isLender &&
          status === dealStatuses.ACCEPTED &&
          reason === reasons.SIGNED_BORRWER
        "
      >
        <p>
          The borrower signed the contract. <br />
          You can proceed with signing a contract
        </p>
      </SignContract>

      <SignContract
        v-if="
          isBorrower &&
          status === dealStatuses.IN_PROGRESS &&
          reason === reasons.CONTRACT_ISSUED
        "
      >
        <p>
          The SportsFi admin issued contract. <br />
          You can proceed with signing a contract.
        </p>
      </SignContract>

      <CanceledDealReason
        v-if="
          status === dealStatuses.NOT_STARTED && reason === reasons.CANCELED
        "
      ></CanceledDealReason>
      <div
        v-if="
          isAdmin &&
          status === dealStatuses.ACCEPTED &&
          reason === reasons.ACCEPTED_BORROWER
        "
        class="contract"
      >
        <hr />
        <BaseModal
          v-if="uploadContractModal"
          v-on:closed="uploadContractModal = false"
          :modal-type="'upload-contract'"
        ></BaseModal>
        <div>
          <h5 class="component-header">Submit draft contract</h5>
          <div class="items" v-if="contract">
            <div>
              <div class="item">
                {{ lender.name || lender.name !== '' ? lender.name : 'n/a' }}
              </div>
              <div class="item">
                <i> {{ contract.current.date | moment('DD.MM.YYYY') }}</i>
              </div>
              <div class="item">
                <a href="#" @click.prevent="downloadFile(contract.current.url)"
                  >Download</a
                >
              </div>
            </div>
          </div>
        </div>
        <br />
        <a href="#" @click.prevent="uploadContractModal = true"
          >Upload Contract</a
        >
        <hr />
      </div>
      <!-- <hr
        v-if="
          reason === reasons.DRAFT &&
          status === dealStatuses.NOT_STARTED &&
           dealType != futureDealType &&
          !isAdmin
        "
      /> -->
      <div
        v-if="
          reason === reasons.DRAFT &&
          status === dealStatuses.NOT_STARTED &&
          dealType != futureDealType &&
          !isAdmin
        "
        class="update-information"
      >
        <hr />
        <h5 class="component-header">Update your information</h5>
        <p class="text">
          In order to proceed with your deal, please upload the needed documents
          and accept terms.
        </p>
        <a href="#" @click.prevent="updateInformation(5)" class="button"
          >Proceed with deal</a
        >
        <a href="#" @click.prevent="stopDeal" class="button cancel-deal"
          >Stop the deal</a
        >
      </div>

      <div
        v-if="
          reason === reasons.SUBMITTED &&
          status === dealStatuses.IN_PROGRESS &&
          !isAdmin
        "
        class="update-information"
      >
        <hr />
        <h5 class="component-header">Admin reviews your deal</h5>
        <p class="text">
          When your application is reviewed by admin, it will be submitted to
          the lenders. After that you will receive the Terms from the lenders to
          choose from.
        </p>
      </div>

      <div
        v-if="
          reason === reasons.REJECTED_ASF &&
          status === dealStatuses.NOT_STARTED &&
          !isAdmin
        "
        class="update-information"
      >
        <hr />
        <h5 class="component-header">Deal is rejected</h5>
        <p class="text">
          Please review reason for rejection from SportsFi admin
        </p>
      </div>

      <Offers
        v-if="
          isBorrower &&
          status === dealStatuses.LIVE &&
          reason === reasons.TERMS_UPLOADED &&
          offers.length > 0
        "
      ></Offers>
      <DealSubmitted
        v-if="
          isBorrower &&
          status === dealStatuses.LIVE &&
          reason === reasons.APPROVED_ASF &&
          Object.keys(offers).length <= 0
        "
      ></DealSubmitted>
      <WaitingForContract
        v-if="
          isBorrower &&
          status === dealStatuses.ACCEPTED &&
          reason === reasons.ACCEPTED_BORROWER
        "
      ></WaitingForContract>
      <UnderReview
        v-if="
          isBorrower &&
          status === dealStatuses.IN_PROGRESS &&
          reason === reasons.UNDER_REVIEW
        "
      ></UnderReview>
      <TermSheetRejected
        v-if="
          isLender &&
          status === dealStatuses.LIVE &&
          Object.keys(offer).length > 0 &&
          offer.status === dealStatuses.REJECTED
        "
      ></TermSheetRejected>
      <Terms
        v-if="
          isLender &&
          status === dealStatuses.LIVE &&
          Object.keys(offer).length > 0 &&
          offer.status !== dealStatuses.REJECTED
        "
      ></Terms>
      <ApproveDocuments
        v-if="
          isAdmin &&
          (reason === reasons.UNDER_REVIEW || reason === reasons.SUBMITTED) &&
          status === dealStatuses.IN_PROGRESS
        "
      ></ApproveDocuments>

      <a
        href="#"
        class="link-text"
        v-show="dealStatus === dealStatuses.NOT_STARTED"
        >Proceed with the deal</a
      >

      <component :is="dealStatusComponent" :print="print" :dealType="dealType"></component>
      <a
        href="#"
        v-if="
          (isAdmin || isBorrower) &&
          (dealStatus === 'not_starged' ||
            dealStatus === 'in_progress' ||
            dealStatus === 'live')
        "
        @click.prevent="showRemoveDealAcceptModal()"
        class="button"
        >Remove deal</a
      >

      <CounterPartyInformation v-if="isAdmin"></CounterPartyInformation>

      <div v-if="!print" class="export-xls">
          <a href="#" @click.prevent="exportExcel"  class="link-text">
            Export xls
          </a>
      </div>

      <div  class="export-pdf">
        <a href="#" @click.prevent="exportToPdf"  class="link-text">
          Export PDF
        </a>
      </div>

      <BaseModal
        v-if="removeDealAcceptModal"
        v-on:closed="removeDealAcceptModal = false"
        v-on:cancel="removeDealAcceptModal = false"
        v-on:accept="rejectOffer"
        :modal-type="'delete-deal'"
      ></BaseModal>
    </div>
  </div>
</template>
<script>
import store from '@/store';
import DealStatus from '@/components/MyDealsComponents/parts/DealStatus';
import RepositoryFactory from '../../repositories/RepositoryFactory';

/** Statuses */
import notStarted from '@/components/MyDealsComponents/statuses/notStarted';
import inProgress from '@/components/MyDealsComponents/statuses/inProgress';
import accepted from '@/components/MyDealsComponents/statuses/accepted';
import live from '@/components/MyDealsComponents/statuses/live';
import rejected from '@/components/MyDealsComponents/statuses/rejected';
import complete from '@/components/MyDealsComponents/statuses/complete';
import UserService from '@/services/user.service.js';
import UploadDraftContractModal from '../modals/UploadDraftContractModal';
import BaseModal from '../BaseModal';
import CanceledDealReason from './parts/CanceledDealReason';
import ApproveDocuments from './parts/ApproveDocuments';
import Terms from './parts/Terms';
import TermSheetRejected from './parts/TermSheetRejected';
import UnderReview from './parts/UnderReview';
import WaitingForContract from './parts/WaitingForContract';
import DealSubmitted from './parts/DealSubmitted';
import SignContract from './parts/SignContract';
import Offers from './parts/Offers';
import DealMixin from '@/mixins/Deal/Deal.mixin';
import LogoImage from '@/assets/icons/sidebar/logo-sidebar.svg';
import CounterPartyInformation from '@/components/MyDealsComponents/parts/CounterPartyInformation';

import DealStatuses from '../../enums/deal/dealStatuses';
import DealReasons from '../../enums/deal/reasons';
import DownloadMixin from '@/mixins/User/download.mixin';

import GetDealDetailMixin from '@/mixins/Deal/GetDealDetail.mixin';

import { FUTURE } from '../../enums/dealCalculator/DealTypes';
import moment from "moment";
import { saveExcel } from '@progress/kendo-vue-excel-export';

const DealRepository = RepositoryFactory.get('deal');
const STATUS_CANCEL = 'cancel';

export default {
  mixins: [DealMixin, GetDealDetailMixin, DownloadMixin],
  components: {
    notStarted,
    inProgress,
    accepted,
    live,
    rejected,
    complete,
    DealStatus,
    BaseModal,
    UploadDraftContractModal,
    CanceledDealReason,
    ApproveDocuments,
    LogoImage,
    Terms,
    CounterPartyInformation,
    TermSheetRejected,
    UnderReview,
    WaitingForContract,
    DealSubmitted,
    Offers,
    SignContract,
  },
  props: {
    print: {
      default: false
    },
  },
  data() {
    return {
      dealStatus: DealStatuses.COMPLETED,
      dealStatusComponent: null,
      removeDealAcceptModal: false,
      uploadContractTerm: false,
      uploadTermModal: false,
      uploadContractModal: false,
      dealStatuses: DealStatuses,
      reasons: DealReasons,
      xlsx_data: [],
      columns: [
        { field: 'col1', title: 'Borrower'},
        { field: 'col2', title: 'Counterparty'},
        { field: 'col3', title: 'Lender'},
        { field: 'col4', title: 'Status'},
        { field: 'col5', title: 'Contract amount'},
        { field: 'col6', title: 'Contract date'},
        { field: 'col7', title: 'Contract value'},
        { field: 'col8', title: 'Guaranteed value'},
        { field: 'col9', title: 'Contract type'},
        { field: 'col10', title: 'Currency'},
        { field: 'col11', title: 'Deal amount'},
        { field: 'col12', title: 'Deal type'},
        { field: 'col13', title: 'Costs'},
        { field: 'col14', title: 'Legal costs'},
        { field: 'col15', title: 'First installment'},
        { field: 'col16', title: 'Frequency'},
        { field: 'col17', title: 'Funding Date'},
        { field: 'col18', title: 'Gross amount'},
        { field: 'col19', title: 'Interest rate'},
        { field: 'col20', title: 'Nb installmetnts'},
        { field: 'col21', title: 'Reason'},
        { field: 'col22', title: 'Type'},
        { field: 'col23', title: 'Upfront amount'},
      ]
    };
  },
  mounted() {
    this.getDealStatusComponent();
    this.fillXlsx();
  },
  computed: {
    isAdmin() {
      return UserService.isAdmin();
    },
    isLender() {
      return UserService.isLender();
    },
    isBorrower() {
      return UserService.isBorrower();
    },
    offer: () => {
      return store.getters['dealDetail/getOffer'];
    },
    criterias: () => {
      return store.getters['dealDetail/getLenderCriterias'];
    },
    borrower: () => {
      return store.getters['dealDetail/getBorrower'];
    },
    counterparty: () => {
      return store.getters['dealDetail/getCounterparty'];
    },
    lender: () => {
      return store.getters['dealDetail/getlender'];
    },
    statusBar: () => {
      return store.getters['dealDetail/getStatusBar'];
    },
    status: () => {
      return store.getters['dealDetail/getStatus'];
    },
    currency: () => {
      return store.getters['dealDetail/getCurrency'];
    },
    reason: () => {
      return store.getters['dealDetail/getReason'];
    },
    consentFile: () => {
      return store.getters['dealDetail/getConsentFile'];
    },
    dealId: () => {
      return store.getters['dealDetail/getDealId'];
    },
    deal: () => {
      return store.getters['dealDetail/getState'];
    },
    offers: () => {
      return store.getters['dealDetail/getOffers'];
    },
    contract: () => {
      return store.getters['dealDetail/getContract'];
    },
    futureDealType: () => {
      return FUTURE;
    },
    dealType: () => {
      return store.getters['dealCalculator/getDealType'];
    },
    athlete: () => {
      return store.getters['dealDetail/getAthlete'];
    },
    paymentsDates: () => {
      return store.getters['dealDetail/getPaymentRates'];
    },
  },
  methods: {
    exportExcel () {
      saveExcel({
        data: this.xlsx_data,
        fileName: "deal-detail.xlsx",
        columns: this.columns
      });
    },
    exportToPdf(){
      DealRepository.exportDealDetails(this.dealId).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'deal-detail.pdf');
        document.body.appendChild(link);
        link.click();
      });
    },
    fillXlsx() {
      this.xlsx_data = [];

        this.xlsx_data.push({
          'col1': this.deal.borrower.name,
          'col2': this.deal.counterparty.name,
          'col3': this.deal.lender.name,
          'col4': this.deal.status_label,
          'col5': this.deal.contract_amount,
          'col6': moment(this.deal.contract_data.contract_date).format('DD.MM.YYYY'),
          'col7': this.deal.contract_data.contract_value,
          'col8': this.deal.contract_data.guaranteed_amount,
          'col9': this.deal.contract_type,
          'col10': this.deal.currency,
          'col11': this.deal.deal_amount,
          'col12': this.deal.deal_type,
          'col13': this.deal.fees_data.costs,
          'col14': this.deal.fees_data.legalCost,
          'col15': moment(this.deal.first_installment).format('DD.MM.YYYY'),
          'col16': this.deal.frequency,
          'col17': moment(this.deal.funding_date).format('DD.MM.YYYY'),
          'col18':this.deal.gross_amount,
          'col19':this.deal.interest_rate,
          'col20':this.deal.nb_installmetnts,
          'col21':this.deal.reason_label,
          'col22':this.deal.type_label,
          'col23':this.deal.upfront_amount,
        });
        this.emptyRow();
        this.emptyRow();
        this.emptyRow();
      this.xlsx_data.push({
        'col1': 'Payment schedule ',
      });
      this.paymentsDates.forEach((payment) => {
        this.xlsx_data.push({
          'col1': moment(payment.paymentDate).format('DD.MM.YYYY'),
          'col3': payment.paid ? 'Paid' : 'Pending',
          'col5': this.currency+' '+payment.grossAmount,
        });
      })
    },
    emptyRow() {
      this.xlsx_data.push({
        'col1': '',
        'col2': '',
        'col3': '',
        'col4': '',
        'col5': '',
        'col6': '',
        'col7': '',
        'col8': '',
        'col9': '',
        'col10': '',
        'col11': '',
        'col12': '',
        'col13': '',
        'col14': '',
        'col15': '',
        'col16':'',
        'col17': '',
        'col18':'',
        'col19':'',
        'col20':'',
        'col21':'',
        'col22':'',
        'col23':'',
      });
    },
    getDealStatusComponent() {
      // TODO chnage this.dealStatus to status when list of deals is done
      switch (this.status) {
        case DealStatuses.NOT_STARTED:
          this.dealStatusComponent = notStarted;
          break;
        case DealStatuses.IN_PROGRESS:
          this.dealStatusComponent = inProgress;
          break;
        case DealStatuses.ACCEPTED:
          this.dealStatusComponent = accepted;
          break;
        case DealStatuses.LIVE:
          this.dealStatusComponent = live;
          break;
        case DealStatuses.STARTED:
          this.dealStatusComponent = accepted;
          break;
        case DealStatuses.COMPLETED:
          this.dealStatusComponent = complete;
          break;
      }
    },
    uploadTerm() {},
    showRemoveDealAcceptModal() {
      this.removeDealAcceptModal = true;
    },
    rejectOffer() {
      let $this = this;
      $this.$loading(true);
      DealRepository.cancelDeal(this.dealId)
        .then((response) => {
          this.$emit('removed', true);
          this.getDealDetail(this.dealId);
          this.getDeals();
          $this.$loading(false);
        })
        .catch((error) => {
          console.error(error);
          $this.$loading(false);
        });
    },
    closeUploadTerm() {
      this.getDealDetail(this.dealId);
      this.uploadTermModal = false;
    },
    updateInformation(dealCalculatorStep) {
      this.$router.push('/dealcalculator');
      if (this.athlete) {
        store.dispatch('dealCalculator/setAthlete', this.athlete);
        store.dispatch('editUser/setHash', this.athlete.id);
      }
      store.dispatch('dealCalculator/jumpToStep', dealCalculatorStep);
      store.dispatch('dealCalculator/setResume', true);
      store.dispatch('dealCalculator/nextStep');
    },
    stopDeal() {
      let $this = this;
      this.cancelDeal();
    },
    async cancelDeal() {
      let $this = this;
      $this.$loading(true);
      DealRepository.updateDealStatus(this.dealId, STATUS_CANCEL, {})
        .then((response) => {
          $this.$loading(false);
          store.dispatch('dealDetail/updateDealFlag', true);
          $this.getDealDetail($this.dealId);
          this.getDeals();
        })
        .catch((error) => {
          $this.$loading(false);
          console.error(error);
        });
    },
  },
};
</script>
<style lang="scss" scoped>

.export-xls {
  display: inline-block;
  margin-right: 20px;
}

.export-pdf {
  display: inline-block;
}

.items .item {
  display: inline-flex;
  margin-left: 30px;
}
.counterparties-component-header {
  width: 100%;
  justify-content: space-between;
  svg {
    margin-bottom: 16px;
    cursor: pointer;
  }
}
.component-header {
  margin-bottom: 16px;
}
a {
  cursor: pointer;
}

hr,
::v-deep hr {
  background-color: #bac0c5;
}
:v-deep p.text {
  font-size: 12px;
  margin-bottom: 0;
}
p.text {
  font-size: 12px;
  margin-bottom: 0;
}
::v-deep .counterparties-header {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 16px;
}
.counterparties-header {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 16px;
}
/** Parties */
.party {
  padding: 12px 8px;
}
.party h5,
.party p {
  font-size: 12px;
}
.party h5 {
  font-weight: 700;
  /* margin-left: 5px; */
}
.party img {
  width: 60px;
  height: 60px;
  margin: 4px 0 6px;
  border-radius: 50px;
  border: 2px solid #c4c4c4;
  object-fit: scale-down;
  padding: 3px;
}
.party p {
  font-weight: 400;
  /* margin-left: 5px; */
}

/** Commercial deal */
.deal-type-progress {
  background: #f3f7fc;
  border-radius: 8px;
  padding: 16px 20px;
}
.deal-type-progress p {
  font-weight: 600;
  font-size: 12px;
  margin-bottom: 0px;
}
.deal-type-progress .progress.progress {
  height: 6px;
  margin-left: 0;
  margin-top: 4px;
  background: #d9dfe5;
}
.deal-type-progress .progress-bar {
  background: var(--main-gradient-reverse);
  border-radius: 4px;
}

.labels {
  display: inline-flex;
  width: 100%;
}
label.label-dark {
  font-weight: 600;
  font-size: 10px;
  color: #253242;
}
.labels .percentage {
  margin-left: auto;
}

/** Deal info */
.deal-info.deal-info {
  margin-bottom: 20px;
}
</style>

<style scoped src="@/assets/styles/deal.css" />
