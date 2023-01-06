<template>
  <div class="component hasRibbon" id="deals-by-sport">
    <div class="ribbon"></div>
    <h5 class="component-header-text">Deals by Sport</h5>
    <div class="chart-container">
      <div class="chart-wrap">
        <PieChart
          :chart-data="chartData"
          :options="chartOptions"
          class=""
          style="width: 90px; height: 90px"
        ></PieChart>
        <div class="deal-count">
          {{ sports.total }}
        </div>
      </div>
    </div>

    <!-- <div class="legend">
      <div v-for="(sport, index) in sports.data" :key="index" class="line">
        <div
          class="color-indicator"
          :style="{
            'background-color': chartData.datasets[0].backgroundColor[index],
          }"
        ></div>
        <p>{{ sport.label }}</p>
        <p class="ammount">{{ sport.number }}</p>
      </div>
    </div> -->

    <div class="legend">
      <div class="line-wrap" v-for="(sport, index) in sports.data" :key="index">
        <div
          class="line"
          :class="[
            seeOther ? 'visible' : '',
            index >= 2 && sports.data.length != 3 ? 'other-line' : '',
          ]"
        >
          <div
            class="color-indicator"
            :style="{
              'background-color': chartData.datasets[0].backgroundColor[index],
            }"
          ></div>
          <p>{{ sport.label }}</p>
          <p class="ammount">{{ sport.number }}</p>
        </div>

        <template
          v-if="sports.data.length > 3 && index + 1 == sports.data.length"
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
  name: 'DealsBySport',
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
    sports() {
      return store.getters['dashboard/getSport'];
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
      this.sports.data.map(function (item, key) {
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
    otherValue() {
      let sum = 0;
      this.sports.data.forEach((item, i) =>
        i >= 2 ? (sum += item.number) : ''
      );
      return sum;
    },
  },
  methods: {
    // onDealsBySport() {
    //   this.$router.push(`/admin/deals-by-sport`);
    // },
    onClickWidget(e) {
      if (this.$refs.otherBtn && this.$refs.otherBtn[0].contains(e.target)) {
        this.seeOther = !this.seeOther;
      } else {
        this.$router.push(`/admin/deals-by-sport`);
      }
    },
  },
  mounted() {
    document
      .querySelector('#deals-by-sport')
      .addEventListener('click', this.onClickWidget);
  },
  beforeUnmount() {
    document
      .querySelector('#deals-by-sport')
      .removeEventListener('click', this.onClickWidget);
  },
};
</script>
<style lang="scss" scoped>
.component {
  cursor: pointer;
}
h3.lenders-total {
  font-size: 18px;
  font-weight: 700;
}

.header {
  display: flex;
  align-items: center;
}
.chart-container {
  width: 100%;
  display: flex;
  justify-content: center;
}
.chart-wrap {
  position: relative;
}
.deal-count {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-51%, -50%);
  width: 20px;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
}
</style>
