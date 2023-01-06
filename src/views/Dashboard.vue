/* eslint-disable vue/valid-template-root */
<template>
  <div class="content">
    <EditModal v-show="showModal" @closed="showModal = false" />
    <NotificationMessage type="sucess" v-if="showNotification">A cool message</NotificationMessage>
    <HeaderNavigation>Dashboard</HeaderNavigation>

    <div class="grid">
      <GeneralClubInfo></GeneralClubInfo>

      <TotalMoneyChart></TotalMoneyChart>

      <TotalReceivedChart></TotalReceivedChart>

      <DealCalculator></DealCalculator>
      <DealCompletion>
        <template v-slot:current-deals>
          <div class="tab-header">
            <router-link to="/dealcalculator" class="link-text"
              >+ Add new deal</router-link
            >
            <icon name="filter" class="dark" />
          </div>
          <DealCard
            :card-data="{
              type: 'paused',
              icon: '@/assets/img/dashboard/Nike.png',
            }"
          >
            <div class="content-info">
              <h5 class="deal-header">Sponsorship</h5>
              <p class="deal-description">2020 - 2023 by Lender 5</p>
              <b-row>
                <b-col class="text-with-label">
                  <label>Total to borrow</label>
                  <p>$2,000,000</p>
                </b-col>
                <b-col class="text-with-label">
                  <label>Total received</label>
                  <p>$2,000,000</p>
                </b-col>
              </b-row>
            </div>
            <div class="deal-progress">
              <b-row> <b-col>Deal completion</b-col><b-col>20%</b-col> </b-row>
              <div class="progress">
                <div
                  class="progress-bar paused"
                  role="progressbar"
                  :style="{ width: 20 + '%' }"
                  aria-valuenow="20"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </DealCard>

          <DealCard
            :card-data="{
              type: 'waiting',
              icon: '@/assets/img/dashboard/quatar.png',
            }"
          >
            <div class="content-info">
              <h5 class="deal-header">Sponsorship</h5>
              <p class="deal-description">2020 - 2023 by Lender 4</p>
              <b-row>
                <b-col class="text-with-label">
                  <label>Total to borrow</label>
                  <p>$2,000,000</p>
                </b-col>
                <b-col class="text-with-label">
                  <label>Total received</label>
                  <p>$0</p>
                </b-col>
              </b-row>
            </div>
            <router-link to="/#" class="link-text-small upload-link"
              ><icon name="upload" />Upload documents</router-link
            >
          </DealCard>

          <DealCard
            :card-data="{
              type: 'complete',
              icon: '@/assets/img/dashboard/arsenal.png',
            }"
          >
            <div class="content-info">
              <h5 class="deal-header">Player trasnfer</h5>
              <p class="deal-description">2020 - 2023 by Lender 1</p>
              <b-row>
                <b-col class="text-with-label">
                  <label>Total to borrow</label>
                  <p>$2,000,000</p>
                </b-col>
                <b-col class="text-with-label">
                  <label>Total received</label>
                  <p>$10,000</p>
                </b-col>
              </b-row>
            </div>
            <div class="deal-progress">
              <b-row> <b-col>Deal completion</b-col><b-col>100%</b-col> </b-row>
              <div class="progress">
                <div
                  class="progress-bar complete"
                  role="progressbar"
                  :style="{ width: 100 + '%' }"
                  aria-valuenow="100"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </DealCard>

          <DealCard
            :card-data="{
              type: 'active',
              icon: '@/assets/img/dashboard/lion.png',
            }"
          >
            <div class="content-info">
              <h5 class="deal-header">TV Rights</h5>
              <p class="deal-description">2020 - 2023 by Lender 2</p>
              <b-row>
                <b-col class="text-with-label">
                  <label>Total to borrow</label>
                  <p>$2,000,000</p>
                </b-col>
                <b-col class="text-with-label">
                  <label>Total received</label>
                  <p>$6,700</p>
                </b-col>
              </b-row>
            </div>
            <div class="deal-progress">
              <b-row> <b-col>Deal completion</b-col><b-col>75%</b-col> </b-row>
              <div class="progress">
                <div
                  class="progress-bar active"
                  role="progressbar"
                  :style="{ width: 25 + '%' }"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </DealCard>

          <router-link to="/#" class="link-text all-deals"
            >All deals</router-link
          >
        </template>
        <template v-slot:past-deals>
          <p>No deals available</p>
        </template>
      </DealCompletion>
      <FinancialOverview></FinancialOverview>

      <Footer class="footer" />
    </div>
  </div>
</template>

<script>
import HeaderNavigation from '@/components/HeaderNavigation.vue';
import Footer from '@/components/Footer.vue';
import NotificationMessage from '@/components/NotificationMessage.vue';
import EditModal from '@/components/EditModal.vue';
import GeneralClubInfo from '@/components/DashboardComponents/GeneralClubInfo';
import TotalMoneyChart from '@/components/DashboardComponents/TotalMoneyChart';
import TotalReceivedChart from '@/components/DashboardComponents/TotalReceivedChart';
import DealCalculator from '@/components/DashboardComponents/DealCalculator';
import FinancialOverview from '@/components/DashboardComponents/FinancialOverview';
import DealCompletion from '../components/DashboardComponents/DealCompletion';
import DealCard from '../components/DashboardComponents/DealCard/DealCard';
/* Charts */

export default {
  name: 'Welcome',
  components: {
    HeaderNavigation,
    Footer,
    NotificationMessage,
    EditModal,
    GeneralClubInfo,
    TotalMoneyChart,
    TotalReceivedChart,
    DealCalculator,
    FinancialOverview,
    DealCompletion,
    DealCard,
  },

  data() {
    return {
      showNotification: false,
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
};
</script>
<style src="@/assets/styles/dashboard.css"></style>
