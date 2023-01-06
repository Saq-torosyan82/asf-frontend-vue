<template>
  <div class="component hasRibbon" id="borrower_widget">
    <div class="ribbon"></div>
    <h5 class="component-header-text">Borrowers</h5>
    <div class="header">
      <PieChart
        :chart-data="chartData"
        :options="chartOptions"
        class="pie-chart"
        style="width: 55px; height: 55px"
      />
      <div>
        <label>Number of borrowers</label>
        <h3 class="lenders-total">{{ borrowers.total }}</h3>
      </div>
    </div>
    <div class="legend">
      <div
        class="line-wrap"
        v-for="(lender, index) in borrowers.data"
        :key="index"
      >
        <div
          class="line"
          :class="[
            seeOther ? 'visible' : '',
            index >= 2 && borrowers.data.length != 3 ? 'other-line' : '',
          ]"
        >
          <div
            class="color-indicator"
            :style="{
              'background-color': chartData.datasets[0].backgroundColor[index],
            }"
          ></div>
          <p>{{ lender.label }}</p>
          <p class="ammount">{{ lender.number }}</p>
        </div>

        <template
          v-if="borrowers.data.length > 3 && index + 1 == borrowers.data.length"
        >
          <div class="line other-clickable" ref="otherBtn">
            <Icon
              name="small-arrow-down"
              class="dowm-arrow"
              :class="seeOther ? 'see-other' : ''"
            />
            <p>All</p>
            <p class="ammount" v-show="!seeOther">{{ otherValue }}</p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import Icon from '@/components/Icon';
import PieChart from '@/components/charts/PieChart.js';
import Colors from '../../enums/modules/colors';

export default {
  name: 'BorrowersChart',
  components: {
    PieChart,
    Icon,
  },
  data() {
    return {
      seeOther: false,
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
    borrowers() {
      return store.getters['dashboard/getBorrowers'];
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

      this.borrowers.data.map(function (item, key) {
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
    chartLegend() {
      let sorted = this.borrowers.data;
      return sorted.sort(function (a, b) {
        return a.number < b.number ? 1 : -1;
      });
    },
    otherValue() {
      let sum = 0;
      this.borrowers.data.forEach((item, i) =>
        i >= 2 ? (sum += item.number) : ''
      );

      return sum;
    },
  },
  methods: {
    onClickWidget(e) {
      if (this.$refs.otherBtn && this.$refs.otherBtn[0].contains(e.target)) {
        this.seeOther = !this.seeOther;
      } else {
        this.$router.push(`/admin/borrowers`);
      }
    },
  },
  mounted() {
    document
      .querySelector('#borrower_widget')
      .addEventListener('click', this.onClickWidget);
  },
  beforeUnmount() {
    document
      .querySelector('#borrower_widget')
      .removeEventListener('click', this.onClickWidget);
  },
};
</script>
<style lang="scss" scoped>
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
</style>
