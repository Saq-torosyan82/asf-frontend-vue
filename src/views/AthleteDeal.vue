<template>
  <div class="content">
    <EditModal v-show="showModal" @closed="showModal = false" />
    <NotificationMessage type="sucess" v-if="showNotification">A cool message</NotificationMessage>
    <HeaderNavigation>Deals</HeaderNavigation>

    <div class="grid">
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
              icon: '../../../assets/img/dashboard/Nike.png',
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
            <h5 class="deal-reson">Application saved as Draft</h5>
          </DealCard>

          <DealCard
            :card-data="{
              type: 'in-progress',
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
            <div class="deal-progress">
              <b-row> <b-col>Deal completion</b-col><b-col>25%</b-col> </b-row>
              <div class="progress">
                <div
                  class="progress-bar paused"
                  role="progressbar"
                  :style="{ width: 25 + '%' }"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <h5 class="deal-reson">Application submitted</h5>
          </DealCard>

          <DealCard
            :card-data="{
              type: 'live',
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
                  <p>$0</p>
                </b-col>
              </b-row>
            </div>
            <div class="deal-progress">
              <b-row> <b-col>Deal completion</b-col><b-col>50%</b-col> </b-row>
              <div class="progress">
                <div
                  class="progress-bar active"
                  role="progressbar"
                  :style="{ width: 50 + '%' }"
                  aria-valuenow="100"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <h5 class="deal-reson">Term sheet uploaded</h5>
          </DealCard>

          <DealCard
            :card-data="{
              type: 'accepted',
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
                <b-col class="text-with-label">
                  <label>To receive</label>
                  <p>$2,000,000</p>
                </b-col>
              </b-row>
            </div>
            <div class="deal-progress">
              <b-row> <b-col>Deal completion</b-col><b-col>75%</b-col> </b-row>
              <div class="progress">
                <div
                  class="progress-bar active"
                  role="progressbar"
                  :style="{ width: 75 + '%' }"
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <h5 class="deal-reson">Available for Lenders</h5>
          </DealCard>
          <DealCard
            :card-data="{
              type: 'started',
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
                <b-col class="text-with-label">
                  <label>To receive</label>
                  <p>$2,000,000</p>
                </b-col>
              </b-row>
            </div>
            <div class="deal-progress">
              <b-row> <b-col>Deal completion</b-col><b-col>75%</b-col> </b-row>
              <div class="progress">
                <div
                  class="progress-bar active"
                  role="progressbar"
                  :style="{ width: 75 + '%' }"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <h5 class="deal-reson">Contract signed by both parties</h5>
          </DealCard>
          <DealCard
            :card-data="{
              type: 'complete',
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
                <b-col class="text-with-label">
                  <label>To receive</label>
                  <p>$2,000,000</p>
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
            <h5 class="deal-reson">All payments are done</h5>
          </DealCard>

          <router-link to="/#" class="link-text all-deals"
            >All deals</router-link
          >
        </template>
        <template v-slot:past-deals>
          <p>No deals available.</p>
        </template>
      </DealCompletion>
      <DealDetails />
      <Footer class="footer" />
    </div>
  </div>
</template>

<script>
import HeaderNavigation from '@/components/HeaderNavigation.vue';
import Footer from '@/components/Footer.vue';
import NotificationMessage from '@/components/NotificationMessage.vue';
import EditModal from '@/components/EditModal.vue';
import FinancialOverview from '@/components/DashboardComponents/FinancialOverview';
import DealCompletion from '../components/DashboardComponents/DealCompletion';
import DealCard from '../components/DashboardComponents/DealCard/DealCard';
import DealDetails from '../components/MyDealsComponents/DealDetails';

export default {
  name: 'Welcome',
  components: {
    HeaderNavigation,
    Footer,
    NotificationMessage,
    EditModal,
    DealCompletion,
    DealCard,
    DealDetails,
  },

  data() {
    return {
      showNotification: false,
    };
  },
  watch: {},
};
</script>
<style scoped>
.counterparties {
  grid-area: counterparties;
}
.grid.grid {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas:
    'dealcompletion counterparties'
    'footer footer';
}
</style>

<style src="@/assets/styles/dashboard.css"></style>
