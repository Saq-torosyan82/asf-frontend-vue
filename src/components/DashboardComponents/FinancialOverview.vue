<template>
  <div class="component financial-overview">
    <h3>Financial overview</h3>
    <h5>Revenue</h5>
    <StackedBarChart class="chart" />
    <h5>Profit and loss</h5>
    <BarChart class="chart" />
    <h5>Debt</h5>
    <DebtChart class="chart" />
    <router-link to="/#" class="link-text financial-report"
      >See financial report</router-link
    >
  </div>
</template>

<script>
import StackedBarChart from '@/components/charts/StackedBarChart.js';
import BarChart from '@/components/charts/BarChart.js';
import DebtChart from '@/components/charts/DebtChart.js';
export default {
  name: 'FinancialOverview',
  components: {
    StackedBarChart,
    BarChart,
    DebtChart,
  },
};
</script>

<style scoped></style>
