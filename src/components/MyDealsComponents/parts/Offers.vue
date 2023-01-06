<template>
  <div>
    <h1 class="counterparties-header">Choose the offer</h1>
    <p class="offer-note">
      Please choose the offer from the list below <br />
      Keep in mind that when you accept an offer , all the other will be
      automatically rejected.
    </p>
    <table class="table">
      <thead>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </thead>
      <tbody>
        <tr v-for="(offer, key) in offers" :key="key">
          <td>
            <div class="form-check">
              <input
                v-if="offer.termsheet.status === statuses.NEW"
                class="form-check-input"
                type="radio"
                v-model="offerId"
                :value="offer.id"
              />
            </div>
          </td>
          <td>{{ offer.lender }}</td>
          <td>
            {{ offer.termsheet.name }} <br />
            {{ offer.termsheet.date | moment('DD.MM.YYYY') }}
          </td>
          <td>
            <a href="#" @click.prevent="downloadFile(offer.termsheet.link)"
              >Download</a
            >
            <br />
            <a
              v-if="offer.termsheet.status === statuses.NEW"
              href="#"
              @click.prevent="rejectOffer(offer.id)"
              class="reject"
              >Reject</a
            >
            <p v-if="offer.termsheet.status === statuses.REJECTED">Rejected</p>
            <p v-if="offer.termsheet.status === statuses.ACCEPTED">Accepted</p>
          </td>
        </tr>
      </tbody>
    </table>

    <a
      href="#"
      @click.prevent="acceptOffer"
      class="button"
      :class="offerId === '' ? 'disabled' : ''"
      :disabled="offerId === '' || !acceptDealButton"
      >Accept the deal</a
    >
    <a href="#" @click.prevent="stopDeal" class="button cancel-deal"
      >Stop the deal</a
    >
    <StopDeal
      v-if="stopDealReason"
      :offer-id="offerId"
      @closed="stopDealReason = false"
    ></StopDeal>
    <RejectOffer
      v-if="rejectOfferReason"
      :offer-id="rejectedOfferId"
      @closed="rejectOfferSuccess"
    ></RejectOffer>
    <hr />
  </div>
</template>

<script>
import store from '@/store';
import RepositoryFactory from '../../../repositories/RepositoryFactory';
import RejectOffer from './RejectOffer';
import { required } from 'vuelidate/lib/validators';
const DealRepository = RepositoryFactory.get('deal');
import DealMixin from '@/mixins/Deal/Deal.mixin';
import DownloadMixin from '@/mixins/User/download.mixin';
import GetDealDetailMixin from '@/mixins/Deal/GetDealDetail.mixin';
import StopDeal from './StopDeal';
import statuses from '@/enums/deal/dealStatuses';

export default {
  name: 'Offers',
  mixins: [DealMixin, GetDealDetailMixin, DownloadMixin],
  components: {
    StopDeal,
    RejectOffer,
  },
  mounted() {
    this.mapOffers();
  },
  data() {
    return {
      stopDealReason: false,
      rejectOfferReason: false,
      acceptDealButton: false,
      offerId: '',
      rejectedOfferId: '',
    };
  },
  validations() {
    return {
      offerId: { required },
    };
  },
  computed: {
    offers: () => {
      return store.getters['dealDetail/getOffers'];
    },
    dealId: () => {
      return store.getters['dealDetail/getDealId'];
    },
    statuses: () => {
      return statuses;
    },
  },
  methods: {
    acceptOffer() {
      let $this = this;
      this.$v.offerId.$touch();
      if (!this.$v.offerId.$invalid) {
        $this.$loading(true);
        DealRepository.acceptOffer(this.dealId, this.offerId, {
          status: statuses.ACCEPTED,
        })
          .then((response) => {
            $this.offerId = '';
            $this.getDealDetail($this.dealId);
            $this.$loading(false);
          })
          .catch((error) => {
            console.error(error);
            $this.$loading(false);
          });
      }
    },
    mapOffers() {
      this.offers.map(function (item) {
        if (item.termsheet.status !== 'rejected') {
          this.acceptDealButton = true;
        }
      });
    },
    stopDeal() {
      let $this = this;
      this.cancelDeal();
    },
    rejectOfferSuccess() {
      this.rejectOfferReason = false;
      this.getDealDetail(this.dealId);
      this.rejectedOfferId = '';
      this.offerId = '';
    },
    rejectOffer(id) {
      let $this = this;
      $this.rejectedOfferId = id;
      $this.rejectOfferReason = true;
      this.offerId = '';
    },
  },
};
</script>

<style scoped src="@/assets/styles/deal.css"></style>
<style lang="scss" scoped>
.offer-note {
  font-size: 14px;
}
table {
  td {
    border-bottom-width: 0;
    font-size: 14px;
    &:last-child {
      text-align: right;
    }
  }
  a {
    color: var(--primary);
    &.reject {
      color: #f61c0d;
    }
  }
}
a.button {
  margin-top: 0;
}
</style>
