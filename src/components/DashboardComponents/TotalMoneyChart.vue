<template>
  <b-tabs content-class="">
    <b-tab title="Deal Values" active>
      <div
        v-if="typeof money !== 'undefined'"
        class="component total-borrow"
        @click="onClickWidget"
      >
        <div class="header inline">
          <PieChart
            :chart-data="chartData"
            :options="chartOptions"
            class="pie-chart"
            style="width: 55px; height: 55px"
          />
          <div>
            <label>Total money to borrow</label>
            <h3 class="money-total">
              {{ money.currency | currency }}
              {{ money.total | numFormat('0,0.[00]') }}
            </h3>
          </div>
        </div>
        <div class="legend">
          <div v-for="(item, index) in money.data" :key="index" class="line">
            <div
              class="color-indicator"
              :style="{
                'background-color':
                  chartData.datasets[0].backgroundColor[index],
              }"
              :class="item.key"
            ></div>
            <p>{{ item.label }}</p>
            <p class="ammount">
              {{ money.currency | currency }}
              {{ item.number | numFormat('0,0.[00]') }}
            </p>
          </div>
          <!-- <div class="no-deals">
        <h5>There are no deals.</h5>
      </div> -->
        </div>
      </div>
    </b-tab>
  </b-tabs>
</template>

<script>
import store from '@/store';
import PieChart from '@/components/charts/PieChart.js';
import Colors from '../../enums/modules/colors';
export default {
  name: 'TotalMoneyChart',
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
        hover: { mode: null },
      },
    };
  },
  filters: {
    currency: (value) => {
      switch (value) {
        case 'usd':
          return '$';
        case 'gbp':
          return '£';
        case 'euro':
          return '€';
        default:
          return '£';
      }
    },
  },

  computed: {
    money() {
      return store.getters['dashboard/getMoney'];
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
      this.money.data.map(function (item, key) {
        data.labels.push(item.label);
        data.datasets[0].data.push(item.number);
        if (item.key == 'not_started') {
          data.datasets[0].backgroundColor.push('#FFE15A');
          item.label = 'In progress';
        } else if (item.key === 'completed') {
          data.datasets[0].backgroundColor.push(Colors[1]);
          //#76E150
        } else if (item.key === 'in_progress') {
          data.datasets[0].backgroundColor.push('#4FC1E0');
          item.label = 'Under review';
        } else {
          data.datasets[0].backgroundColor.push(Colors[0]);
          //#72B1F0
        }
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
      if (this.$localStorage.get('userInfo').user_type === 'admin') {
        this.$router.push(`/admin/total-deal-overview`);
      } else {
        this.$router.push(`/deals`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.total-borrow {
  min-height: 220px;
  height: fit-content !important;
  cursor: pointer;
}

.no-deals {
  h5 {
    margin-top: 40px;
    text-align: center;
    font-size: 18px;
    color: #93a0ae;
  }
}
</style>
