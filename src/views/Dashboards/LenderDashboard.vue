/* eslint-disable vue/valid-template-root */
<template>
  <div class="content">
    <EditModal v-show="showModal" @closed="showModal = false" />
    <NotificationMessage type="sucess" v-if="showNotification">A cool message</NotificationMessage>
    <HeaderNavigation>Dashbaord</HeaderNavigation>

    <div class="deal-container" v-if="showDealDetail">
      <LiveDealsBoard
        class="component-no-padding live-deal-board"
        @showDealDetail="getDealDetail"
      />
      <DealDetails v-if="showDealDetail" />
    </div>

    <div class="grid" v-if="!showDealDetail">
      <InfoCard
        :card-header="'Lender'"
        :card-name="userProfile.company.name"
        v-if="!showDealDetail"
        :countryFlag="dashboardInfo.company.country_code"
        class="general-information"
      >
        <h3 class="section-header">Lender information</h3>

        <!-- <b-row>
          <b-col>
            <div class="text-with-label">
              <label>Name</label>
              <p>{{ firstLastName }}</p>
            </div>
          </b-col>
        </b-row> -->
        <b-row>
          <b-col>
            <div class="text-with-label">
              <label>Lender type</label>
              <p>{{ userProfile.account.lender_type }}</p>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="text-with-label">
              <label>Company number</label>
              <p>{{ dashboardInfo.company.registration_number }}</p>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="text-with-label">
              <label>Contacts</label>
              <p>
                {{ dashboardInfo.contact.phone }}
                <br />
                {{ dashboardInfo.contact.office_phone }}
              </p>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="text-with-label">
              <label>Email</label>
              <p class="underline">{{ dashboardInfo.contact.email }}</p>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="text-with-label">
              <label>Website</label>
              <p class="underline">
                <a
                  class="dark"
                  :href="dashboardInfo.company.website"
                  target="_blank"
                >
                  {{ dashboardInfo.company.website }}</a
                >
              </p>
            </div>
          </b-col>
        </b-row>

        <hr />
        <h3 class="section-header">Address</h3>
        <div class="text-with-label">
          <label>Street</label>
          <p>{{ dashboardInfo.company.street }}</p>
        </div>
        <b-row>
          <b-col>
            <div class="text-with-label">
              <label>City</label>
              <p>{{ dashboardInfo.company.city }}</p>
            </div>
          </b-col>
          <b-col>
            <div class="text-with-label">
              <label>ZIP - Post code</label>
              <p>{{ dashboardInfo.company.zip }}</p>
            </div>
          </b-col>
        </b-row>
      </InfoCard>

      <LiveDealsBoard
        class="component-no-padding live-deal-board"
        @showDealDetail="getDealDetail"
        v-if="!showDealDetail"
      />
      <LenderTermsWidget />
      <DealsList
        v-if="!showDealDetail"
        @showDealDetail="redirectToDealDetail"
      ></DealsList>

      <TotalMoneyChart v-if="!showDealDetail"></TotalMoneyChart>

      <TotalReceivedChart v-if="!showDealDetail"></TotalReceivedChart>
      <CreditCriteriaComponent />
      <News />
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
import TotalReceivedChart from '@/components/DashboardComponents/TotalReceivedChart';
import InfoCard from '@/components/DashboardComponents/InfoCard';
import DealsList from '../../components/MyDealsComponents/DealsList';
import LiveDealsBoard from '@/components/AdminDashboard/LiveDealsBoard';
import CreditCriteriaComponent from '@/components/DashboardComponents/CreditCriteriaComponent';
import DealDetails from '../../components/MyDealsComponents/DealDetails';
import GetDealDetailMixin from '@/mixins/Deal/GetDealDetail.mixin';
import UserMixin from '@/mixins/User/User.mixin';
import LenderTermsWidget from '@/components/DashboardComponents/LenderTermsWidget';
import News from '@/components/UserComponents/NewsWidget';
import RepositoryFactory from '../../repositories/RepositoryFactory';
const UserRepository = RepositoryFactory.get('user');

export default {
  name: 'LenderDashboard',
  components: {
    HeaderNavigation,
    Footer,
    NotificationMessage,
    EditModal,
    TotalMoneyChart,
    TotalReceivedChart,
    InfoCard,
    DealsList,
    LiveDealsBoard,
    DealDetails,
    CreditCriteriaComponent,
    LenderTermsWidget,
    News,
  },
  mixins: [GetDealDetailMixin, UserMixin],
  mounted() {
    this.getUserProfile();
    this.dashboardInfo = store.getters['dashboard/getDashboard'];
  },
  data() {
    return {
      showNotification: false,
      showDealDetail: false,
      dashboardInfo: {
        company: {},
        contact: {},
        address: {},
        social_media: {},
      },
      showModal: false,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        cutoutPercentage: 35,
        animation: {
          animateRotate: true,
        },
        legend: {
          display: false,
        },
      },
      chartData: {
        datasets: [
          {
            backgroundColor: ['#D9DFE5', '#90DC13', '#72B1F0'],
            data: [2000000, 20000000, 10000000],
          },
        ],
      },
    };
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
  },
};
</script>
<!--

<style src="@/assets/styles/dashboardInitial.scss"></style>

-->
<style lang="scss" scoped>
.grid {
  height: auto;
}
@media only screen and (max-width: 999px) {
  .grid.grid {
    grid-template-columns: 1fr;
    grid-template-rows: 300px auto auto auto auto auto auto auto;
    grid-template-areas:
      'live-deal-board'
      'general-information '
      'dealcompletion'
      ' lender-terms'
      'total-borrow'
      'total-received '
      'news-widget'
      'credit-criteria '
      'footer ';
  }
}
@media only screen and (min-width: 1000px) {
  .grid.grid {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 300px auto auto auto auto auto;
    grid-template-areas:
      'live-deal-board live-deal-board'
      'general-information dealcompletion'
      'general-information lender-terms'
      'total-received total-borrow'
      'news-widget news-widget'
      'credit-criteria credit-criteria'
      'footer footer';
  }
}
@media only screen and (min-width: 1294px) {
  .grid.grid {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 427px auto 257px 257px auto auto;
    grid-template-areas:
      'general-information live-deal-board live-deal-board live-deal-board'
      'general-information dealcompletion dealcompletion  lender-terms'
      'credit-criteria dealcompletion dealcompletion  total-received'
      'credit-criteria dealcompletion dealcompletion total-borrow'
      'credit-criteria dealcompletion dealcompletion news-widget'
      'footer footer footer footer';
  }
}

.deal-container {
  display: inline-flex;
  align-items: flex-start;
  gap: 15px;
  padding: 20px 0;
  max-width: 100%;
  .live-deal-board {
    width: auto;
    max-width: 55%;
  }
  .counterparties {
    width: calc(45% - 15px);
  }
}

.live-deal-board {
  height: 100%;
}

/* Components */
.live-deal-board {
  grid-area: live-deal-board;
}
.credit-criteria-component {
  grid-area: credit-criteria;
}
.general-information {
  grid-area: general-information;
}
.lender-terms {
  grid-area: lender-terms;
}
.news-widget {
  grid-area: news-widget;
}
::v-deep .club-general {
  height: 100%;
}

.checkbox {
  display: inline-flex;
  align-items: flex-start;
  padding: 16px 24px;
  background: #f3f7fc;
  border-radius: 8px;
}
#check-box {
  margin: 2px 12px 0 0;
}
.checkbox label {
  color: #253242;
  font-size: 12px;
}
</style>

<style src="@/assets/styles/dashboard.css"></style>
<style lang="scss" src="@/assets/styles/dashboardInitial.scss"></style>
