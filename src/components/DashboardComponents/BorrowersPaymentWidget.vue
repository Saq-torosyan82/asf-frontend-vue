<template>
  <b-tabs content-class="">
    <b-tab title="Payments" active>
      <div class="component total-received" @click="onClickWidget">
        <div class="header inline">
          <PieChart
            v-if="isChart"
            :chart-data="pieChartData"
            :options="chartOptions"
            class="pie-chart"
            style="width: 55px; height: 55px"
          />
          <b-row>
            <b-col>
              <label>Total paid</label>
              <h3 class="money-total">
                &#163;{{ paidPayments | numFormat('0,0.[00]') }}
              </h3>
            </b-col>
            <b-col class="instalments">
              <label>No.Installments</label>
              <h3 class="money-total">
                {{ `${all_paid_installments} / ${all_installments}` }}
              </h3>
            </b-col>
          </b-row>
        </div>
        <BorrowersPaymentWidgetBarChart
          style="max-height: 70px"
          :chartData="barChartData"
          v-if="isChart"
          class="bar-chart"
        />
        <div class="payments-chart-legend inline">
          <div
            class="image"
            v-for="(label, index) in barChartLabels"
            :key="index"
          >
            <img :src="label" v-if="label" />
            <img src="../../assets/img/dashboard/blank.png" v-if="!label" />
          </div>
          <!-- <div class="image">
            <img src="../../assets/img/dashboard/arsenal.png" alt="" />
          </div>
          <div class="image">
            <img src="../../assets/img/dashboard/chelsea.png" alt="" />
          </div>
          <div class="image">
            <img src="../../assets/img/dashboard/citibank.png" alt="" />
          </div>
          <div class="image">
            <img src="../../assets/img/dashboard/puma.png" alt="" />
          </div> -->
        </div>
      </div>
    </b-tab>
  </b-tabs>
</template>

<script>
import PieChart from '@/components/charts/PieChart.js';
import BorrowersPaymentWidgetBarChart from '@/components/charts/BorrowersPaymentWidgetBarChart.js';
import DealRepository from '@/repositories/DealCalculator/DealRepository';
import numeral from 'numeral';
export default {
  name: 'TotalReceivedChart',
  components: {
    PieChart,
    BorrowersPaymentWidgetBarChart,
  },
  methods: {
    onClickWidget() {
      this.$router.push(`/deals`);
    },
    getData() {
      let $this = this;
      $this.$loading(true);
      DealRepository.meDashboard()
        .then((response) => {
          $this.$loading(false);
          const tmpRes = response.data.stats.payments;
          this.paidPayments = tmpRes.totalPayment;
          this.pieChartData.datasets[0].data = [
            numeral(tmpRes.totalAmount).value().toFixed(2),
            numeral(tmpRes.totalPayment).value().toFixed(2),
            10,
          ];
          this.all_paid_installments = tmpRes.allPaidInstallments;
          this.all_installments = tmpRes.allInstallments;
          this.barChartData = tmpRes.data;
          this.isChart = true;
          this.barChartLabels = tmpRes.labels;
        })
        .catch((error) => {
          console.error(error);
          $this.$loading(false);
        });
    },
  },
  data() {
    return {
      isChart: false,
      barChartData: {},
      barChartLabels: [],
      paidPayments: 0,
      all_paid_installments: 0,
      all_installments: 0,
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
        tooltips: {
          enabled: false,
        },
        hover: { mode: null },
      },
      pieChartData: {
        datasets: [
          {
            type: 'pie',
            borderWidth: 0,
            backgroundColor: ['#17AFD9', '#FAD030'],
            data: [],
          },
        ],
      },
    };
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
/* Total Received */

.total-received {
  height: 220px;
  background: white;
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  /* gap: 10px; */
  cursor: pointer;
  position: relative;
  padding: 20px 15px 10px;
  .header {
    /* display: flex;
    align-items: center; */
    flex-wrap: wrap;
    margin-bottom: auto;
    .row {
      margin: 0;
    }
    .pie-chart {
      align-items: center;
      margin-right: 0;
    }

    .col {
      padding: 0;
      padding-left: 10px;
    }
    label,
    h3 {
      white-space: nowrap;
    }
    img {
      margin-right: 16px;
    }
    .instalments {
      margin-left: auto;
    }
  }
}
.payments-chart-legend {
  padding-left: 27px;
  width: 100%;
  justify-content: space-around;
  .image {
    width: 25px;
    height: 25px;
    img {
      width: 100%;
      height: 100%;
      aspect-ratio: 1;
      object-fit: contain;
    }
  }
}
/* .total-received .header,
.total-borrow .header {
  display: flex;
  align-items: center;
} */

/* .component.total-received {
}
.total-received label,
.total-received h3 {
} */
</style>
