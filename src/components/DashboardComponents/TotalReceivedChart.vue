<template>
  <b-tabs content-class="">
    <b-tab title="Payments due" active>
      <div class="component total-received" @click="onClickWidget">
        <div class="header dp-row">
          <!-- <img src="@/assets/img/dashboard/payments-received.png" /> -->
          <div>
            <label>Total Outstanding</label>
            <h3 class="money-total">
              &#163;{{ totalOutstanding | numFormat('0,0.[00]') }}
            </h3>
          </div>
          <div>
            <label>Total Installments</label>
            <h3 class="money-total">
              {{ totalInstallments }}
            </h3>
          </div>
        </div>
        <LineChart
          style="height: 120px"
          :chartData="chartData"
          v-if="isChart"
        />
      </div>
    </b-tab>
  </b-tabs>
</template>

<script>
import LineChart from '@/components/charts/LineChart.js';
import DealRepository from '@/repositories/DealCalculator/DealRepository';
import User from '@/modules/User/User';
import numeral from 'numeral';
export default {
  name: 'TotalReceivedChart',
  components: {
    LineChart,
  },
  data() {
    return {
      chartData: [],
      totalValue: '',
      totalOutstanding: '',
      totalInstallments: '',
      isChart: false,
    };
  },
  created() {
    this.getChartData();
  },
  methods: {
    onClickWidget() {
      User.isAdmin()
        ? this.$router.push(`/admin/total-deal-payments`)
        : this.$router.push(`/lender/total-deal-payments`);
    },
    getChartData() {
      let $this = this;
      $this.$loading(true);
      DealRepository.meDashboard()
        .then((response) => {
          $this.$loading(false);
          const data = response.data.stats.received_money;
          this.chartData = data.data;
          this.totalOutstanding = data.totalOutstanding;
          this.totalInstallments =
            numeral(data.totalPaidInstallments).format('0,0') +
            '/' +
            numeral(data.totalInstallments).format('0,0');
          this.totalValue = data.total;
          this.isChart = true;
        })
        .catch((error) => {
          console.error(error);
          $this.$loading(false);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.total-received {
  height: 220px;
  background: white;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  cursor: pointer;
  .header {
    justify-content: space-between;
    img {
      margin-right: 16px;
    }
  }
}

/* .total-received .header,
.total-borrow .header {
  display: flex;
  align-items: center;
} */
</style>
