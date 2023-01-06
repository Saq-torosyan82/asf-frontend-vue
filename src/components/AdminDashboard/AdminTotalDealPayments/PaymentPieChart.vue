<template>
  <div class="chart-content">
    <div class="chart-section">
      <PieChart
        :chart-data="chartData"
        :options="chartOptions"
        class=""
        style="width: 120px; height: 120px"
      />

      <div class="title-section">
        <span class="txt-name">Total value</span>
        <span class="txt-amount"
          >{{ currencyType }}{{ totalValue | numFormat('0,0.[00]') }}</span
        >
      </div>
    </div>
    <div class="chart-detail">
      <div class="item" v-for="(amount, index) in amountList" :key="index">
        <div class="item-title">
          <div
            class="icon-bg"
            :style="{ backgroundColor: colorList[index] }"
          ></div>
          <span class="txt-name">{{ labelList[index] }}</span>
        </div>
        <span class="item-amount"
          >{{ currencyType }}{{ amount | numFormat('0,0.[00]') }}</span
        >
      </div>
    </div>
  </div>
</template>
<script>
import PieChart from '@/components/charts/PieChart.js';
export default {
  name: 'PaymentPieChart',
  components: { PieChart },
  props: {
    chartData: {
      type: Object,
      default: new Object(),
    },
    totalValue: {
      type: Number,
      default: 0,
    },
    currencyType: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: true,
        cutoutPercentage: 33,
        animation: {
          animateRotate: true,
        },
        legend: {
          display: false,
        },
      },
    };
  },
  computed: {
    amountList() {
      return this.chartData?.datasets[0]?.data;
    },
    labelList() {
      return this.chartData?.labels;
    },
    colorList() {
      return this.chartData?.datasets[0]?.backgroundColor;
    },
  },
};
</script>
<style lang="scss" scoped>
.chart-content {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  color: #253242;
  width: 100%;
  .chart-section {
    display: flex;
    flex-flow: row;
    .title-section {
      display: flex;
      flex-flow: column;
      align-items: flex-end;
      margin-left: 10px;
      margin-top: 15px;
      .txt-name {
        font-size: 10px;
        color: #93a0ae;
        padding-bottom: 8px;
      }
      .txt-amount {
        font-size: 14px;
        font-weight: bold;
        line-height: 18px;
      }
    }
  }
  .chart-detail {
    margin-top: 47px;
    margin-bottom: 20px;
    .item {
      display: flex;
      flex-flow: row;
      justify-content: space-between;
      align-items: center;
      margin: 10px 0;
      .item-title {
        display: flex;
        flex-flow: row;
        justify-content: flex-start;
        align-items: center;
        .icon-bg {
          width: 12px;
          height: 12px;
          min-width: 12px;
          border-radius: 50%;
          margin-right: 12px;
        }
        .txt-name {
          font-size: 10px;
        }
      }
      .item-amount {
        font-size: 12px;
        line-height: 15px;
        font-weight: bold;
      }
    }
  }
}
</style>
