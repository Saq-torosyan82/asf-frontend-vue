<template>
  <div>
    <hr />

    <div class="next-payment-chart inline">
      <b-col class="chart">
        <PieChart
          :chart-data="chartData"
          :options="chartOptions"
          class="pie-chart"
          style="width: 55px; height: 55px"
        />
      </b-col>
      <b-col class="chart-legend-row">
        <b-row>
          <b-col>
            <div class="legend">
              <p>Contract value</p>
              <p class="ammount">
                {{ currency }} {{ dealAmount | numFormat('0,0.[00]') }}
              </p>
            </div>
          </b-col>
          <b-col>
            <div class="legend">
              <div class="color-indicator green"></div>
              <p>Total received</p>
              <p class="ammount">
                {{ currency }}
                {{
                  totalReceivedAndTotalReceive.received | numFormat('0,0.[00]')
                }}
              </p>
            </div>
          </b-col>
          <b-col>
            <div class="legend">
              <div class="color-indicator grey"></div>
              <p>To receive</p>
              <p class="ammount">
                {{ currency }}
                {{
                  totalReceivedAndTotalReceive.receive | numFormat('0,0.[00]')
                }}
              </p>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </div>
  </div>
</template>
<script>
import store from '@/store';
import PieChart from '@/components/charts/PieChart.js';

export default {
  components: {
    PieChart,
  },
  data() {
    return {
      /* Chart Options */
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
      /* Chart Data */
      // chartData: {
      //   datasets: [
      //     {
      //       backgroundColor: ["#D9DFE5", "#90DC13", "#72B1F0"],
      //       data: [this.dealAmount, 20000000, 10000000],
      //     },
      //   ],
      // },
    };
  },
  computed: {
    currency: () => {
      return store.getters['dealDetail/getCurrency'];
    },
    dealAmount: () => {
      return store.getters['dealDetail/getDealAmount'];
    },
    totalReceivedAndTotalReceive: () => {
      return store.getters['dealDetail/getTotalReceivedAndTotalReceive'];
    },
    chartData: () => {
      return store.getters['dealDetail/getContractExpenseChartData'];
    },
  },
};
</script>
<style lang="scss" scoped>
/** Pie chart */
.next-payment-chart {
  align-items: center;
  width: 100%;
  .chart-legend-row {
    flex-grow: 1;
  }
}
.next-payment-chart .chart {
  max-width: 77px;
}
.next-payment-chart .legend p {
  font-size: 10px;
  font-weight: 600;
  color: #93a0ae;
  margin-bottom: 0;
  white-space: nowrap;
}
.next-payment-chart .legend .ammount {
  font-size: 16px;
  font-weight: 700;
  color: #253242;
  white-space: nowrap;
}
</style>
