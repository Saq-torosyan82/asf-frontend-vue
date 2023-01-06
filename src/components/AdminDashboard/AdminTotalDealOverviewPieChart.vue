<template>
  <div class="chart-content">
    <div class="chart-section">
      <PieChart
        :chart-data="ChartData"
        :options="chartOptions"
        class=""
        style="width: 120px; height: 120px"
      />

      <div class="title-section">
        <span class="txt-name">Total money to borrow</span>
        <span class="txt-amount"
          >{{ currency }}{{ totalAmount | numFormat('0,0.[00]') }}</span
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
          >{{ currency }}{{ amount | numFormat('0,0.[00]') }}</span
        >
      </div>
    </div>
  </div>
</template>
<script>
import PieChart from '@/components/charts/PieChart.js';
export default {
  name: 'AdminTotalDealOverviewPieChart',
  components: { PieChart },
  props: {
    ChartData: {
      type: Object,
      default: new Object(),
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: new String(),
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
      return this.ChartData?.datasets[0]?.data;
    },
    labelList() {
      return this.ChartData?.labels;
    },
    colorList() {
      return this.ChartData?.datasets[0]?.backgroundColor;
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
    margin-top: 65px;
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
        font-size: 14px;
        line-height: 18px;
        font-weight: bold;
      }
    }
  }
}
</style>
