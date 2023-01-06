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
        v-if="loaded"
        class="athlete-info-card"
        :card-header="'Athlete'"
        :card-name="firstLastName"
        :countryFlag="dashboardInfo.address.country_code"
      >
        <h3 class="section-header">Athlete information</h3>

        <b-row>
          <b-col>
            <div class="text-with-label">
              <label>Name</label>
              <p>{{ firstLastName }}</p>
            </div>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <div class="text-with-label">
              <label>Date of birth</label>
              <p v-if="userProfile.user.date_of_birth">
                {{ userProfile.user.date_of_birth | moment('DD/MM/YYYY') }}
              </p>
              <p v-else>n/a</p>
            </div>
          </b-col>
          <b-col>
            <div class="text-with-label">
              <label>Place of birth</label>
              <p>
                {{
                  userProfile.user.place_of_birth
                    ? userProfile.user.place_of_birth
                    : 'n/a'
                }}
              </p>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="text-with-label">
              <label>Age</label>
              <p>{{ age }}</p>
            </div>
          </b-col>
          <b-col>
            <div class="text-with-label">
              <label>Citizenship</label>
              <p>
                {{
                  userProfile.user.citizenship
                    ? userProfile.user.citizenship
                    : 'n/a'
                }}
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
        <h3 class="section-header">Athlete Information</h3>

        <!-- <b-row>
          <b-col>
            <div class="label-image-text">
              <label>League</label>
              <div class="image">
                <img src="../../assets/img/dashboard/bvb.png" alt="" />
              </div>
              <p>{{ dashboardInfo.professional.league }}</p>
            </div>
          </b-col>
          <b-col>
            <div class="label-image-text">
              <label>Country</label>
              <div class="image">
                <img src="../../assets/img/dashboard/bvb.png" alt="" />
              </div>
              <p>{{ dashboardInfo.professional.country }}</p>
            </div>
          </b-col>
        </b-row> -->

        <b-row class="mt-0">
          <b-col>
            <div class="label-image-text">
              <label>Current team</label>
              <img
                v-if="dashboardInfo.professional.club_logo"
                :src="dashboardInfo.professional.club_logo"
                class="image"
              />
              <img v-else class="image" src="@/assets/img/person-default.png" />
              <p v-if="dashboardInfo.professional.club">
                {{ dashboardInfo.professional.club }}
              </p>
              <p v-else>n/a</p>
            </div>
          </b-col>
          <b-col>
            <div class="label-image-text">
              <label>Agent</label>

              <img
                v-if="dashboardInfo.professional.agent_avatar"
                v-auth-image="dashboardInfo.professional.agent_avatar"
                class="image"
              />
              <img v-else class="image" src="@/assets/img/person-default.png" />

              <p>
                {{
                  dashboardInfo.professional.agent_name
                    ? dashboardInfo.professional.agent_name
                    : 'n/a'
                }}
              </p>
            </div>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <div class="text-with-label">
              <label>Joined:</label>
              <p v-if="dashboardInfo.professional.club_joined_date">
                {{
                  dashboardInfo.professional.club_joined_date
                    | moment('DD/MM/YYYY')
                }}
              </p>
              <p v-else>n/a</p>
            </div>
          </b-col>
          <b-col>
            <div class="text-with-label">
              <label>Contract expires:</label>
              <p v-if="dashboardInfo.professional.contract_expires">
                {{
                  dashboardInfo.professional.contract_expires
                    | moment('DD/MM/YYYY')
                }}
              </p>
              <p v-else>n/a</p>
            </div>
          </b-col>
        </b-row>
        <label class="mt-4">Previous teams</label>
        <Clubs :clubs="prevClubs" @teamAdded="refreshDashboard"></Clubs>

        <hr />

        <h3 class="section-header endorsment-deals-header">
          Endorsement deals
        </h3>

        <div class="sponsors">
          <SponsorDetails
            v-for="(sposnsor, key) in sponsorships"
            :key="key"
            :sponsor="sposnsor"
            @sponsorRemoved="removeSponsor(key)"
          />
        </div>
        <a href="#" @click.prevent="isShow = !isShow" class="link-text"
          >+Add endorsement deal</a
        >
        <hr />
        <div v-if="socialMediaLastUpdate !== ''">
          <h3 class="section-header">Social media followers</h3>
          <SocialMediaFollowers></SocialMediaFollowers>

          <label
            >Followers as of
            {{ socialMediaLastUpdate | moment('DD/MM/YYYY') }}</label
          >
        </div>
      </InfoCard>

      <TotalMoneyChart></TotalMoneyChart>

      <BorrowersPaymentWidget></BorrowersPaymentWidget>

      <DealCalculator></DealCalculator>
      <News></News>
      <DealsList @showDealDetail="redirectToDealDetail"></DealsList>

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
import News from '@/components/UserComponents/NewsWidget';
import BorrowersPaymentWidget from '@/components/DashboardComponents/BorrowersPaymentWidget';

import DealCalculator from '@/components/DashboardComponents/DealCalculator';
import InfoCard from '@/components/DashboardComponents/InfoCard';
import SocialMediaFollowers from '@/components/DashboardComponents/SocialMediaFollowers';
import Clubs from '../../components/DashboardComponents/Clubs';
import DealsList from '../../components/MyDealsComponents/DealsList';
import SponsorDetails from '@/components/UserComponents/SponsorDetails';
import UserSponsorsMixin from '@/mixins/User/UserSponsors.mixin';
import GetDealDetailMixin from '@/mixins/Deal/GetDealDetail.mixin';
import AddSponsor from '@/components/UserComponents/AddSponsor';
import SimpleModal from 'simple-modal-vue';

import RepositoryFactory from '../../repositories/RepositoryFactory';
import NewsWidget from '../../components/UserComponents/NewsWidget.vue';
const UserRepository = RepositoryFactory.get('user');

export default {
  name: 'AthleteDashboard',
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
    Clubs,
    DealsList,
    SponsorDetails,
    AddSponsor,
    SimpleModal,
    News,
  },
  mixins: [UserSponsorsMixin, GetDealDetailMixin],
  mounted() {
    this.dashboardInfo = store.getters['dashboard/getDashboard'];
    this.loaded = true;
    this.getSocialMediaLastUpdate();
  },
  data() {
    return {
      showNotification: false,
      dashboardInfo: {
        company: {},
        contact: {},
        address: {},
        social_media: {},
        professional: {},
      },
      socialMediaLastUpdate: '',
      isShow: false,
      showModal: false,
      loaded: false,
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
      return store.getters['user/getUserInfo'];
    },
    prevClubs() {
      return store.getters['user/getPrevClubs'];
    },
    socialMedia() {
      return store.getters['dashboard/getSocialMedia'];
    },
    age() {
      if (
        this.userProfile.user.date_of_birth &&
        this.userProfile.user.date_of_birth !== ''
      ) {
        return this.$moment().diff(
          this.userProfile.user.date_of_birth,
          'years'
        );
      }
      return '';
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
    refreshDashboard() {
      this.$emit('refreshDashboard', true);
    },
    redirectToDealDetail(id) {
      this.getDealDetail(id);
      store.dispatch('Deals/toggleRedirect');
      this.$router.push({ path: '/deals' });
    },
    getSocialMediaLastUpdate() {
      let $this = this;
      Object.keys($this.socialMedia).forEach(function (key) {
        if (
          ($this.socialMedia[key].last_checked !== 'null' &&
            $this.socialMediaLastUpdate === '') ||
          new Date($this.socialMediaLastUpdate) <
            new Date($this.socialMedia[key].last_checked)
        ) {
          $this.socialMediaLastUpdate = $this.socialMedia[key].last_checked;
        }
      });
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
/* .sponsors {
  overflow: hidden;
} */

/* When there are 4 columns */
@media only screen and (min-width: 1294px) {
  .grid.grid {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 257px auto auto;
    grid-template-areas:
      'athleteinfo borrow received dealcalc'
      'athleteinfo dealcompletion dealcompletion news-widget'
      'athleteinfo dealcompletion dealcompletion athletescomp'
      'footer footer footer footer';
  }
}

/* When there are 3 columns */
@media only screen and (max-width: 1294px) {
  .grid.grid {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 257px 257px 304px auto auto;
    grid-template-areas:
      'athleteinfo dealcalc dealcalc'
      'athleteinfo borrow received'
      'athleteinfo news-widget news-widget'
      'athleteinfo dealcompletion dealcompletion'
      'footer  footer footer';
  }
}

/* When there are 2 columns */
@media only screen and (max-width: 990px) {
  .grid.grid {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 257px 257px 257px 304px auto 1fr;
    grid-template-areas:
      'athleteinfo dealcalc'
      'athleteinfo borrow'
      'athleteinfo received'
      'athleteinfo news-widget'
      'athleteinfo dealcompletion'
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
    grid-template-rows: auto 257px 257px 257px auto auto auto;
    grid-template-areas:
      'athleteinfo'
      'dealcalc'
      'borrow'
      'received'
      'news-widget'
      'dealcompletion'
      'footer';
  }
  .content {
    padding: 88px 15px 24px;
  }
}

/* Naming components */
.athlete-info-card {
  grid-area: athleteinfo;
}
.total-borrow {
  grid-area: borrow;
}
.total-received {
  grid-area: received;
}
.news-widget {
  grid-area: news-widget;
}
.deal-calculator {
  grid-area: dealcalc;
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
.athlete-info-card {
  .col {
    padding-top: 0px;
    padding-bottom: 0;
  }
  .section-header {
    margin-bottom: 15px;
  }
}
.grid {
  display: grid;
  height: 1550px;
  gap: 15px;
  margin-top: 16px;
}
</style>
