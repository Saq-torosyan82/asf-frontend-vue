/* eslint-disable vue/valid-template-root */
<template>
  <div class="content">
    <EditModal v-show="showModal" @closed="showModal = false" />
    <NotificationMessage type="sucess" v-if="showNotification"
      >A cool message</NotificationMessage
    >
    <HeaderNavigation>Dashboard</HeaderNavigation>

    <div class="grid">
      <InfoCard
        :card-header="'Team'"
        :card-name="dashboardInfo.professional.club"
        :country-flag="dashboardInfo.professional.country_code"
        class="club-info-card"
      >
        <h3 class="section-header">Corporate information</h3>

        <b-row>
          <b-col>
            <div class="text-with-label">
              <label>Name</label>
              <p>{{ firstLastName }}</p>
            </div>
          </b-col>
          <b-col>
            <div class="text-with-label">
              <label>Job</label>
              <p>
                {{
                  dashboardInfo.contact.position
                    ? dashboardInfo.contact.position
                    : 'Not declared'
                }}
              </p>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="text-with-label">
              <label>Majority Owners</label>
              <p>{{ dashboardInfo.company.club_owners }}</p>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="text-with-label">
              <label>Manager</label>
              <p>{{ dashboardInfo.company.club_manager }}</p>
            </div>
          </b-col>
        </b-row>
        <hr />
        <h3 class="section-header">Basic information</h3>
        <div class="basic-information">
          <b-row>
            <b-col>
              <div class="text-with-label">
                <label>League(20/21)</label>
                <p>{{ dashboardInfo.professional.league_name }}</p>
              </div>
            </b-col>
            <b-col>
              <div class="text-with-label">
                <label>Year of foundation</label>
                <p>{{ clubFoundedYear() }}</p>
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col>
              <div class="basic-information-element">
                <label>League</label>
                <div class="image">
                  <img :src="dashboardInfo.professional.league_logo" alt="" />
                </div>
                <!-- <p class="text">{{ dashboardInfo.professional.league }}</p> -->
              </div>
            </b-col>
            <b-col>
              <div class="basic-information-element">
                <label>Federation</label>
                <div class="image">
                  <img
                    :src="dashboardInfo.professional.association_logo"
                    alt=""
                  />
                </div>

                <!-- <p>{{ dashboardInfo.professional.association_name }}</p> -->
              </div>
            </b-col>
            <b-col>
              <div class="basic-information-element">
                <label>Association</label>
                <div class="image country">
                  <!-- <country-flag country="be" size="normal" :rounded="true" /> -->
                  <img
                    :src="dashboardInfo.professional.confederation_logo"
                    alt=""
                  />
                </div>

                <!-- <p>{{ dashboardInfo.professional.confederation_name }}</p> -->
              </div>
            </b-col>
          </b-row>
        </div>

        <hr />
        <h3 class="section-header">Address</h3>
        <div class="text-with-label">
          <label>Street</label>
          <p>{{ dashboardInfo.address.street }}</p>
        </div>
        <b-row>
          <b-col>
            <div class="text-with-label">
              <label>City</label>
              <p>{{ dashboardInfo.address.city }}</p>
            </div>
          </b-col>
          <b-col>
            <div class="text-with-label">
              <label>ZIP - Post code</label>
              <p>{{ dashboardInfo.address.zip }}</p>
            </div>
          </b-col>
        </b-row>
        <hr />
        <h3 class="section-header">Home stadium</h3>
        <b-row>
          <b-col>
            <div class="text-with-label">
              <label>Stadium name</label>
              <p>{{ dashboardInfo.company.stadium_name }}</p>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="text-with-label">
              <label>Capacity</label>
              <p>{{ dashboardInfo.company.stadium_capacity }}</p>
            </div>
          </b-col>
          <b-col>
            <div class="text-with-label">
              <label>Year opened</label>
              <p>{{ dashboardInfo.company.stadium_year_opened }}</p>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="text-with-label">
              <label>City</label>
              <p>{{ dashboardInfo.company.stadium_city }}</p>
            </div>
          </b-col>
        </b-row>
        <hr />
        <h3 class="section-header">Current sponsors</h3>
        <!-- <div class="sponsors">
          <SponsorDetails
            :sponsor="shirt_sposnsor"
            @sponsorRemoved="removeSponsor(1)"
          />
          <SponsorDetails
            :sponsor="sleeve_sposnsor"
            @sponsorRemoved="removeSponsor(2)"
          />
          <SponsorDetails
            :sponsor="kit_sposnsor"
            @sponsorRemoved="removeSponsor(3)"
          />
        </div>
        <label class="block">Main sponsors</label> -->
        <div class="sponsors">
          <template v-for="(sposnsor, index) in sponsorships">
            <div
              class="main-partner-label"
              v-if="index == 3"
              :key="'label-' + index"
            >
              <label>Main partners</label>
            </div>
            <SponsorDetails
              :sponsor="sposnsor"
              @sponsorRemoved="removeSponsor(index)"
              :key="index"
            />
          </template>
        </div>
        <label class="lbl-add-sponsor" @click="handleSponsorDialog(true)"
          >+Add sponsor</label
        >
        <div
          v-if="
            dashboardInfo.social_media &&
            Object.keys(dashboardInfo.social_media).length > 0
          "
        >
          <hr />
          <h3 class="section-header">Social media followers</h3>
          <SocialMediaFollowers></SocialMediaFollowers>

          <label
            >Followers as of
            {{
              dashboardInfo.social_media.last_update | moment('DD/MM/YYYY')
            }}</label
          >
        </div>
      </InfoCard>

      <TotalMoneyChart></TotalMoneyChart>

      <BorrowersPaymentWidget class="payments-widget"></BorrowersPaymentWidget>

      <DealCalculator></DealCalculator>

      <DealsList @showDealDetail="redirectToDealDetail"></DealsList>
      <News />

      <FinancialOverviewWidget class="financial-widget" />

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
import store from '@/store';
import HeaderNavigation from '@/components/HeaderNavigation.vue';
import Footer from '@/components/Footer.vue';
import NotificationMessage from '@/components/NotificationMessage.vue';
import EditModal from '@/components/EditModal.vue';
import TotalMoneyChart from '@/components/DashboardComponents/TotalMoneyChart';
import BorrowersPaymentWidget from '@/components/DashboardComponents/BorrowersPaymentWidget';
import News from '@/components/UserComponents/NewsWidget';
import DealCalculator from '@/components/DashboardComponents/DealCalculator';
import InfoCard from '@/components/DashboardComponents/InfoCard';
import SocialMediaFollowers from '@/components/DashboardComponents/SocialMediaFollowers';
import DealsList from '../../components/MyDealsComponents/DealsList';
import FinancialOverviewWidget from '@/components/DashboardComponents/FinancialOverviewWidget';
import UserSponsorsMixin from '@/mixins/User/UserSponsors.mixin';
import GetDealDetailMixin from '@/mixins/Deal/GetDealDetail.mixin';
import SponsorDetails from '@/components/UserComponents/SponsorDetails';
import AddSponsorDialog from '@/components/DashboardComponents/CorporateDashboardComponents/AddSponsorDialog.vue';

import RepositoryFactory from '../../repositories/RepositoryFactory';
const UserRepository = RepositoryFactory.get('user');

export default {
  name: 'CorporateDashboard',
  components: {
    HeaderNavigation,
    Footer,
    NotificationMessage,
    EditModal,
    TotalMoneyChart,
    BorrowersPaymentWidget,
    DealCalculator,
    InfoCard,
    SocialMediaFollowers,
    DealsList,
    FinancialOverviewWidget,
    SponsorDetails,
    News,
    AddSponsorDialog,
  },
  mixins: [UserSponsorsMixin, GetDealDetailMixin],
  data() {
    return {
      showNotification: false,
      sponsorDialog: false,
      dashboardInfo: {
        company: {},
        contact: {},
        address: {},
        social_media: {},
        professional: {},
      },
      showModal: false,
    };
  },
  created() {
    this.dashboardInfo = store.getters['dashboard/getDashboard'];
  },

  computed: {
    firstLastName() {
      return store.getters['user/getFirstLastName'];
    },
    userProfile() {
      return store.getters['user/getUserProfile'];
    },
  },
  watch: {
    showModal() {
      document.querySelector('body').style.overflowY = this.showModal
        ? 'hidden'
        : null;
    },
  },
  methods: {
    redirectToDealDetail(id) {
      this.getDealDetail(id);
      store.dispatch('Deals/toggleRedirect');
      this.$router.push({ path: '/deals' });
    },
    clubFoundedYear() {
      if (!this.dashboardInfo.company.club_founded) {
        return '';
      }

      var date = this.dashboardInfo.company.club_founded;
      if (date.length < 6) {
        return date;
      }

      // try to find comma
      var parts = date.split(',');
      if (parts.length == 2) return parts[1];

      return date;
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
<style lang="scss" src="@/assets/styles/dashboardInitial.scss"></style>
<style
  lang="scss"
  scoped
  src="@/assets/styles/corporate-dashboard.scss"
></style>
