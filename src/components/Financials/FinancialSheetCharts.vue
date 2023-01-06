<template>
  <div>
    <div v-if="selectedTab === profit">
      <span class="txt-chart-name">{{ chartTitle[0] }}</span>
      <FinancialRevenueStyleChart :chartData="chartData1" class="chart-area" />
      <span class="txt-chart-name">{{ chartTitle[1] }}</span>
      <FinancialOperatingProfitsStyleChart
        :chartData="chartData2"
        class="chart-area"
      />
      <div v-if="isAdmin">
        <span class="txt-chart-name">{{ chartTitle[2] }}</span>
        <FinancialWagesStyleChart :chartData="chartData3" class="chart-area" />
      </div>
      <span class="txt-chart-name">{{ chartTitle[3] }}</span>
      <FinancialPlayerTradingStyleChart
        :chartData="chartData4"
        class="chart-area"
      />
    </div>
    <div v-if="selectedTab === balance">
      <span class="txt-chart-name">{{ chartTitle[0] }}</span>
      <FinancialRevenueStyleChart :chartData="chartData1" class="chart-area" />
      <span class="txt-chart-name">{{ chartTitle[1] }}</span>
      <FinancialPlayerTradingStyleChart
        :chartData="chartData2"
        class="chart-area"
      />
      <span class="txt-chart-name">{{ chartTitle[2] }}</span>
      <FinancialPlayerTradingStyleChart
        :chartData="chartData3"
        class="chart-area"
      />
    </div>
  </div>
</template>
<script>
import FinancialRevenueStyleChart from './charts/FinancialRevenueStyleChart';
import FinancialOperatingProfitsStyleChart from './charts/FinancialOperatingProfitsStyleChart';
import FinancialWagesStyleChart from './charts/FinancialWagesStyleChart';
import FinancialPlayerTradingStyleChart from './charts/FinancialPlayerTradingStyleChart';
export default {
  props: {
    dataList: {
      type: Array,
      default: new Array(),
    },
    selectedTab: {
      type: String,
      default: new String(),
    },
    labels: {
      type: Array,
      default: new Array(),
    },
  },
  components: {
    FinancialRevenueStyleChart,
    FinancialOperatingProfitsStyleChart,
    FinancialWagesStyleChart,
    FinancialPlayerTradingStyleChart,
  },
  data() {
    return {
      profit: 'Profit/loss sheet',
      balance: 'Balance sheet',
      cash: 'Cash flow',
      isAdmin: false,
    };
  },
  created() {
    this.getUserType();
  },
  computed: {
    chartTitle() {
      let tmp = [];
      if (this.selectedTab === this.profit) {
        tmp = [
          'Core Revenues',
          'Operating Profits',
          'Wages to Revenues',
          'Player Trading Income',
        ];
      } else if (this.selectedTab === this.balance) {
        tmp = ['Net Debt', 'Gross Financial Debt', 'Player Transfer Balance'];
      }
      return tmp;
    },

    chartData1() {
      let tmp = {};
      if (this.selectedTab === this.profit) {
        tmp = {
          labels: [...this.labels],
          datasets: [
            {
              datalabels: {
                anchor: 'end',
              },
              type: 'line',
              fill: false,
              label: 'Total',
              borderColor: '#F8CF2F',
              pointBackgroundColor: '#F8CF2F',
              data: [...this.getSubChartData('Total operating revenue')],
            },
            {
              type: 'bar',
              label: 'Broadcasting',
              backgroundColor: '#4FC1E0',
              data: [...this.getSubChartData('Broadcasting')],
            },
            {
              type: 'bar',
              label: 'Commercial',
              backgroundColor: '#7DD2EA',
              data: [...this.getSubChartData('Commercial')],
            },
            {
              type: 'bar',
              label: 'Matchday',
              backgroundColor: '#A6E6F8',
              data: [...this.getSubChartData('Matchday')],
            },
          ],
        };
      } else if (this.selectedTab === this.balance) {
        tmp = {
          labels: [...this.labels],
          datasets: [
            {
              type: 'bar',
              label: 'Net financial debt',
              backgroundColor: '#4FC1E0',
              data: [...this.getSubChartData('Net financial debt')],
            },
            {
              type: 'bar',
              label: 'Net transfer debt',
              backgroundColor: '#F8CF2F ',
              data: [...this.getSubChartData('Net transfer debt')],
            },
            {
              type: 'bar',
              label: 'Social/tax dues (non-current)',
              backgroundColor: '#C6CBCC',
              data: [...this.getSubChartData('Social/tax dues (non-current)')],
            },
          ],
        };
      }
      return tmp;
    },
    chartData2() {
      let tmp = {};
      if (this.selectedTab === this.profit) {
        tmp = {
          labels: [...this.labels],
          datasets: [
            {
              type: 'line',
              fill: false,
              label: 'Before player trading',
              borderColor: '#4FC1E0',
              pointBackgroundColor: '#4FC1E0',
              data: [...this.getSubChartData('Operating Profit/(Loss)')],
            },
            {
              type: 'line',
              fill: false,
              label: 'After Player Trading (EBIT)',
              borderColor: '#F8CF2F',
              pointBackgroundColor: '#F8CF2F',
              data: [
                ...this.getSubChartData(
                  'Earnings before interest and tax (EBIT)'
                ),
              ],
            },
          ],
        };
      } else if (this.selectedTab === this.balance) {
        tmp = {
          labels: [...this.labels],
          datasets: [
            {
              datalabels: {
                anchor: 'center',
              },
              type: 'bar',
              label: 'Share holder debt',
              backgroundColor: '#4FC1E0',
              data: [...this.getSubChartData('Shareholder debt')],
            },
            {
              datalabels: {
                anchor: 'center',
              },
              type: 'bar',
              label: 'Other debt',
              backgroundColor: '#F8CF2F ',
              data: [...this.getSubChartData('Other debt')],
            },
            {
              type: 'bar',
              label: 'Cash',
              backgroundColor: '#C6CBCC',
              data: [...this.getSubChartData('Cash')],
            },
          ],
        };
      }
      return tmp;
    },
    chartData3() {
      let tmp = {};
      if (this.selectedTab === this.profit) {
        tmp = {
          labels: [...this.labels],
          datasets: [
            {
              type: 'line',
              fill: false,
              label: 'Wages to revenue',
              borderColor: '#4FC1E0',
              pointBackgroundColor: '#4FC1E0',
              data: [...this.getSubChartData('Operating Profit/(Loss)')],
            },
            {
              type: 'line',
              fill: false,
              label: 'Revenue',
              borderColor: '#A6E6F8',
              pointBackgroundColor: '#A6E6F8',
              data: [...this.getSubChartData('Total operating revenue')],
            },
            {
              type: 'line',
              fill: false,
              label: 'Staff Costs',
              borderColor: '#F8CF2F',
              pointBackgroundColor: '#F8CF2F',
              data: [
                ...this.getSubChartData(
                  'Earnings before interest and tax (EBIT)'
                ),
              ],
            },
          ],
        };
      } else if (this.selectedTab === this.balance) {
        tmp = {
          labels: [...this.labels],
          datasets: [
            {
              type: 'bar',
              label: 'Player creditors',
              backgroundColor: '#4FC1E0',
              data: [...this.getSubChartData('Player creditors')],
            },
            {
              type: 'bar',
              label: 'Player debtors',
              backgroundColor: '#F8CF2F ',
              data: [...this.getSubChartData('Player debtors')],
            },
          ],
        };
      }
      return tmp;
    },
    chartData4() {
      let tmp = {};
      if (this.selectedTab === this.profit) {
        tmp = {
          labels: [...this.labels],
          datasets: [
            {
              type: 'bar',
              label: 'Profit on Player Sales',
              backgroundColor: '#4FC1E0',
              data: [...this.getSubChartData('Profit/(loss) on Player sales')],
            },
            {
              type: 'bar',
              label: 'Player Trading Income',
              backgroundColor: '#F8CF2F',
              data: [...this.getSubChartData('Player trading')],
            },
          ],
        };
      }
      return tmp;
    },
  },
  methods: {
    getUserType() {
      if (this.$localStorage.get('userInfo').user_type === 'admin') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    },
    getSubChartData(key) {
      const tmp = this.dataList.filter((e) => e.label === key);

      const tmpKey = Object.keys(tmp[0]).filter(
        (key) =>
          key !== 'label' &&
          key !== 'style' &&
          key !== 'end-tr' &&
          key !== 'id' &&
          key !== 'actualStatus'
      );
      return this.selectedTab === this.profit
        ? tmpKey.map((e) =>
            !isNaN(parseFloat(tmp[0][`${e}`]))
              ? parseFloat(tmp[0][`${e}`]).toFixed(0)
              : null
          )
        : [...tmp[0].values];
    },
  },
};
</script>
<style lang="scss" , scoped>
.txt-chart-name {
  font-size: 12px;
  line-height: 15px;
  color: #060708;
}
.chart-area {
  margin: 20px 0;
  max-height: 300px;
}
</style>
