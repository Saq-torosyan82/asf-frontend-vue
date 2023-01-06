<template>
  <div class="component hasRibbon" @click="onClickWidget">
    <div class="ribbon"></div>
    <h5 class="component-header-text">Lenders</h5>
    <div class="header">
      <PieChart
        :chart-data="chartData"
        :options="chartOptions"
        class="pie-chart"
        style="width: 55px; height: 55px"
      />
      <div>
        <label>Number of lenders</label>
        <h3 class="lenders-total">{{ lenders.total }}</h3>
      </div>
    </div>
    <div class="legend">
      <div v-for="(lender, index) in lenders.data" :key="index" class="line">
        <div
          class="color-indicator"
          :style="{
            'background-color': chartData.datasets[0].backgroundColor[index],
          }"
        ></div>
        <p>{{ lender.label }}</p>
        <p class="ammount">{{ lender.number }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';

import PieChart from '@/components/charts/PieChart.js';

import RepositoryFactory from '../../repositories/RepositoryFactory';
const UserRepository = RepositoryFactory.get('user');
import Colors from '../../enums/modules/colors';

export default {
  name: 'LendersChart',
  components: {
    PieChart,
  },
  data() {
    return {
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
      },
    };
  },
  computed: {
    lenders() {
      return store.getters['dashboard/getLenders'];
    },
    chartData() {
      let data = {
        labels: [],
        datasets: [
          {
            borderWidth: 0,
            backgroundColor: [],
            data: [],
          },
        ],
      };
      this.lenders.data.map(function (item, key) {
        data.labels.push(item.label);
        data.datasets[0].data.push(item.number);
        data.datasets[0].backgroundColor.push(Colors[key]);
      });
      if (data.datasets.data == null) {
        data.datasets[0].data.push(1);
        data.datasets[0].backgroundColor.push('#D7DBDC');
      }
      return data;
    },
  },
  methods: {
    onClickWidget() {
      this.$router.push(`/admin/lenders`);
    },
  },
};
</script>
<style scoped>
.component {
  cursor: pointer;
}
.hasRibbon {
  padding-left: 28px;
}
.ribbon {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 16px;
  background-color: #b6daff;
  border-radius: 8px 0 0 8px;
}
h5.component-header-text {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 14px;
}
h3.lenders-total {
  font-size: 18px;
  font-weight: 700;
}

.header {
  display: flex;
  align-items: center;
}

.pie-chart {
  margin-right: 16px;
}

.legend {
  margin-top: 20px;
}
.legend .line {
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 16px;
}

.legend .line .color-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 12px;
}
.legend .line .color-indicator.orange {
  background: #ffb95a;
}
.legend .line .color-indicator.lblue {
  background: #72b1f0;
}
.legend .line .color-indicator.blue {
  background: #4289da;
}
.legend .line p {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 0;
}
.legend .line .ammount {
  margin-left: auto;
  font-size: 14px;
  font-weight: 700;
}
</style>
