<template>
  <b-tabs content-class="" id="financial_widget">
    <b-tab title="Financial overview" active>
      <div class="financial-overview-widget component" v-if="isChart">
        <FinancialSheetCharts
          :dataList="financialDataListByProfit"
          :selectedTab="profit"
          :labels="labels"
        />
        <router-link to="/financials" class="link-text"
          >See financial report</router-link
        >
      </div>
    </b-tab>
  </b-tabs>
</template>

<script>
import FinancialSheetCharts from '@/components/Financials/FinancialSheetCharts.vue';
import FinancialRepository from '@/repositories/Financials/FinancialRepository';
// import StaticFinancialData from '@/assets/js/staticFinancialData.json';
export default {
  components: {
    FinancialSheetCharts,
  },
  data() {
    return {
      // staticFinancialData: StaticFinancialData,
      financialDataListByProfit: [],
      profit: 'Profit/loss sheet',
      labels: [],
      isChart: false,
    };
  },
  created() {
    this.getFinancials();
  },
  methods: {
    onClickWidget() {
      this.$router.push(`/financials`);
    },
    getFinancials() {
      let $this = this;
      $this.$loading(true);
      FinancialRepository.getFinancials()
        .then((res) => {
          this.getDataList(res.data, this.profit);
          $this.$loading(false);
        })
        .catch((err) => {
          console.error(err);
          $this.$loading(false);
        });
      ////////////////
      /// Dummy Data
      ////////////////
      // this.getDataList(this.staticFinancialData, this.profit);
      ////////////////
      ///
      ////////////////
    },

    getDataList(data, profit) {
      this.labels = data?.seasons.map((e) => e.label).slice(0, 4);
      // const tmp = Object.values(data['items'][`${profit}`]); //dummyData

      const tmp = Object.values(data['items'][`${profit}`]['items']); //realData

      const tmpData = tmp.map((e) =>
        Object.values(e).reduce((arr, { label, amounts }) => {
          arr = {
            ...this.labels.reduce((subArr, a, index) => {
              subArr[this.labels[index]] = [
                ...(subArr[a] || []),
                amounts[index] || amounts[index] === 0 ? amounts[index] : '',
              ];
              return subArr;
            }, arr),
            label: [...(arr?.label || []), label],
          };
          return arr;
        }, {})
      );

      Object.values(tmpData).forEach((e) => {
        Object.values(e)[0].forEach((m, index) => {
          let tmpRowList = {};
          Object.keys(e).forEach((key) => {
            tmpRowList = { ...tmpRowList, [`${key}`]: e[`${key}`][index] };
          });
          this.financialDataListByProfit = [
            ...this.financialDataListByProfit,
            tmpRowList,
          ];
        });
      });

      this.setShowChart();
    },
    setShowChart() {
      setTimeout(() => {
        this.isChart = true;
      }, 50);
    },
  },
  mounted() {
    document
      .querySelector('#financial_widget')
      .addEventListener('click', this.onClickWidget);
  },
  beforeUnmount() {
    document
      .querySelector('#financial_widget')
      .removeEventListener('click', this.onClickWidget);
  },
};
</script>

<style lang="scss" scoped>
.financial-overview-widget {
  padding: 20px 20px 20px;
  cursor: pointer;
}
.chart-header {
  font-size: 15px;
  margin: 20px 0 16px;
  &:first-child {
    margin: 0px 0 16px;
  }
}
.revenue-chart,
.profit-loss-chart,
.debt-chart {
  /* max-width: 350px; */
  max-height: 300px;
}
a.link-text {
  margin-top: 16px;
  display: block;
}
</style>
