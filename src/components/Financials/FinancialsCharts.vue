<template>
  <div class="financial-charts component-no-padding">
    <h5 class="chart-header">Revenue</h5>
    <Revenue class="revenue-chart" />
    <h5 class="chart-header">Profit and loss</h5>
    <ProfitLossChart class="profit-loss-chart" />
    <h5 class="chart-header">Expenses</h5>
    <ExpensesChart class="expenses-chart" />
  </div>
</template>

<script>
import Revenue from "@/components/Financials/charts/RevenueChart.js";
import ProfitLossChart from "@/components/Financials/charts/ProfitLossChart.js";
import ExpensesChart from "@/components/Financials/charts/ExpensesChart.js";
export default {
  components: {
    Revenue,
    ProfitLossChart,
    ExpensesChart,
  },
};
</script>

<style scoped>
.financial-charts {
  padding: 5px 20px 20px;
}
.chart-header {
  font-size: 15px;
  margin: 20px 0 16px;
}
.revenue-chart,
.profit-loss-chart,
.expenses-chart {
  max-width: 350px;
  max-height: 300px;
}
</style>
