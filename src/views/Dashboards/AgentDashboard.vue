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
        :card-header="'Agency'"
        :card-name="dashboardInfo.company.name"
        class="agent-info-card"
        :countryFlag="dashboardInfo.address.country_code"
      >
        <h3 class="section-header">Agency information</h3>

        <b-row>
          <b-col>
            <div class="text-with-label">
              <label>Name</label>
              <p>{{ dashboardInfo.company.name }}</p>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="text-with-label">
              <label>Contacts</label>s
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
              <label>Agency owner</label>
              <p>Agency Owner</p>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="text-with-label">
              <label>Agency email</label>
              <p>info@agency.com</p>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="text-with-label">
              <label>Agency website</label>
              <p class="underline">
                <a
                  class="dark"
                  href="needs-to-be-implemented.com"
                  target="blank"
                >
                  www.website.com
                </a>
              </p>
            </div>
          </b-col>
        </b-row>

        <hr />
        <h3 class="section-header">Address</h3>
        <b-row>
          <b-col>
            <div class="text-with-label">
              <label>Street</label>
              <p>{{ dashboardInfo.address.street }}</p>
            </div>
          </b-col>
        </b-row>

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

        <!-- <b-row>
          <b-col v-if="dashboardInfo.address.country">
            <div class="text-with-label">
              <label>Country</label>
              <p>{{ dashboardInfo.address.country }}</p>
            </div>
          </b-col>
          <b-col v-if="dashboardInfo.address.state">
            <div class="text-with-label">
              <label>State</label>
              <p>{{ dashboardInfo.address.state }}</p>
            </div>
          </b-col>
        </b-row> -->
        <hr />

        <div
          v-if="
            dashboardInfo.social_media &&
            Object.keys(dashboardInfo.social_media).length > 1
          "
        >
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

      <TotalMoneyChart />

      <BorrowersPaymentWidget />

      <DealCalculator />

      <AthleteWidgetCard v-if="!isAgency && isAgent" />

      <News />
      <DealsList @showDealDetail="redirectToDealDetail" />

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
import GetDealDetailMixin from '@/mixins/Deal/GetDealDetail.mixin';
import News from '@/components/UserComponents/NewsWidget.vue';
import BorrowersPaymentWidget from '@/components/DashboardComponents/BorrowersPaymentWidget';

import DealCalculator from '@/components/DashboardComponents/DealCalculator';
import DealCompletion from '@/components/DashboardComponents/DealCompletion';
import InfoCard from '@/components/DashboardComponents/InfoCard';
import SocialMediaFollowers from '@/components/DashboardComponents/SocialMediaFollowers';
import AthleteWidgetCard from '@/components/UserComponents/AthleteWidgetCard';
import DealsList from '../../components/MyDealsComponents/DealsList';

import RepositoryFactory from '../../repositories/RepositoryFactory';
import User from '../../modules/User/User';

const UserRepository = RepositoryFactory.get('user');

export default {
  name: 'AgentDashboard',
  components: {
    HeaderNavigation,
    Footer,
    NotificationMessage,
    EditModal,
    AthleteWidgetCard,
    TotalMoneyChart,
    BorrowersPaymentWidget,
    DealCalculator,
    InfoCard,
    SocialMediaFollowers,
    DealsList,
    News,
  },
  mixins: [GetDealDetailMixin],
  created() {
    store.dispatch('editUser/setHash', '');
    store.dispatch('editUser/setType', '');
  },
  mounted() {
    this.dashboardInfo = store.getters['dashboard/getDashboard'];
  },
  computed: {
    isAgency() {
      return store.getters['dashboard/getAccount'].isAgency;
    },
    isAgent() {
      return User.isAgent();
    },
  },
  data() {
    return {
      showNotification: false,
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
<style lang="scss" src="@/assets/styles/dashboardInitial.scss"></style>
<style lang="scss" scoped>
/*
*
*
*
TO DO:
1. Fix grid layout on scaling down
*
*
*/

/* When there are 4 columns */
@media only screen and (min-width: 1294px) {
  .grid.grid {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 257px 310px auto auto;
    grid-template-areas:
      'agentinfo borrow received dealcalc'
      'agentinfo dealcompletion dealcompletion news-widget'
      'agentinfo dealcompletion dealcompletion athletescomp'
      'footer footer footer footer';
  }
}

/* When there are 3 columns */
@media only screen and (max-width: 1294px) {
  .grid.grid {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 257px 257px 310px auto;
    grid-template-areas:
      'agentinfo borrow received '
      'agentinfo dealcompletion dealcalc'
      'agentinfo dealcompletion news-widget'
      'agentinfo dealcompletion athletescomp'
      'footer  footer footer';
  }
}

/* When there are 2 columns */
@media only screen and (max-width: 1030px) {
  .grid.grid {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 257px auto 257px auto 310px auto;
    grid-template-areas:
      'agentinfo dealcalc'
      'agentinfo news-widget'
      'borrow received'
      'dealcompletion dealcompletion'
      'athletescomp athletescomp'
      'footer footer';
  }
  .content {
    padding: 24px 15px 0;
  }
}

/* When there is 1 column */
@media only screen and (max-width: 750px) {
  .grid.grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      'agentinfo'
      'dealcalc'
      'borrow'
      'received'
      'news-widget'
      'dealcompletion'
      'athletescomp'
      'financial'
      'footer';
  }
  .content {
    padding: 88px 15px 24px;
  }
}
@media only screen and (min-width: 750px) {
  .content {
    margin-left: 163px;
    padding: 24px 40px 0;
  }
}
/* Naming components */
.agent-info-card {
  grid-area: agentinfo;
}
.total-borrow {
  grid-area: borrow;
}
.total-received {
  grid-area: received;
}
.deal-calculator {
  grid-area: dealcalc;
}
.news-widget {
  grid-area: news-widget;
}
.deal-completion {
  grid-area: dealcompletion;
}
.athletes-component {
  grid-area: athletescomp;
}
.footer {
  grid-area: footer;
}
/* Styles */
.grid {
  display: grid;
  height: 1550px;
  gap: 15px;
  margin-top: 16px;
}

/* Athletes component */
::v-deep .athletes {
  height: auto;
  overflow-y: auto;
  /* padding-right: 20px; */
}
</style>
