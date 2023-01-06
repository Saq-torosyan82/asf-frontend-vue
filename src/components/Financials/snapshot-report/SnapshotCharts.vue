<template>
  <div>
    <div v-if="selectedType">
      <span class="txt-chart-name">{{ selectedType }}</span>
      <div v-if="chartComonents[selectedType]">
        <component :is="chartComonents[selectedType].comp" v-if="!reload" :model="selectedType" :chartData="fullChartData[chartComonents[selectedType].num - 1]" class="chart-area fin-area" :ref="nameToSlug(selectedType)"></component>
        <a @click="printChart(nameToSlug(selectedType))" class="print-btn">
          <img src="@/assets/img/download-icon.png" alt="" />Print
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import FinancialRevenueStyleChart from '../charts/FinancialRevenueStyleChart';
import FinancialOperatingProfitsStyleChart from '../charts/FinancialOperatingProfitsStyleChart';
import FinancialWagesStyleChart from '../charts/FinancialWagesStyleChart';
import FinancialPlayerTradingStyleChart from '../charts/FinancialPlayerTradingStyleChart';
import FinancialRepository from "@/repositories/Financials/FinancialRepository";
export default {
  props: {
    selectedType: {
      type: String,
      default: new String(),
    },
    clubId: {
      type: String,
      default: ''
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  components: {
    FinancialRevenueStyleChart,
    FinancialOperatingProfitsStyleChart,
    FinancialWagesStyleChart,
    FinancialPlayerTradingStyleChart,
  },
  data() {
    return {
      reload: false,
      titles: ['Core Revenues', 'Operating Profits', 'Wages to Turnover', 'Player Trading Income', 'Net Debt Profile', 'Gross Financial Debt', 'Player Transfer Balance', 'Squad Market Value Vs Book Value'],
      v_tabs_itemList: [],
      chartDataList: [],
      tableDataCol: {},
      financialData: {},
      dataList: [],
      labels: [],
      chartComonents: {
        'Core Revenues': {
          comp: 'FinancialRevenueStyleChart',
          num: 1,
        },
        'Operating Profits': {
          comp: 'FinancialOperatingProfitsStyleChart',
          num: 2
        },
        'Wages to Turnover': {
          comp: 'FinancialWagesStyleChart',
          num: 3
        },
        'Player Trading Income': {
          comp: 'FinancialPlayerTradingStyleChart',
          num: 4
        },
        'Net Debt Profile': {
          comp: 'FinancialRevenueStyleChart',
          num: 5
        },
        'Gross Financial Debt': {
          comp: 'FinancialPlayerTradingStyleChart',
          num: 6
        },
        'Player Transfer Balance': {
          comp: 'FinancialPlayerTradingStyleChart',
          num: 7
        },
      }
    };
  },
  computed: {
    chartData1() {
      return {
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
            data: [...this.getSubChartData('Total operating revenue', false)],
          },
          {
            type: 'bar',
            label: 'Broadcasting',
            backgroundColor: '#4FC1E0',
            data: [...this.getSubChartData('Broadcasting', false)],
          },
          {
            type: 'bar',
            label: 'Commercial',
            backgroundColor: '#7DD2EA',
            data: [...this.getSubChartData('Commercial', false)],
          },
          {
            type: 'bar',
            label: 'Matchday',
            backgroundColor: '#A6E6F8',
            data: [...this.getSubChartData('Matchday',false)],
          },
        ],
      };
    },
    chartData2() {
      return {
        labels: [...this.labels],
        datasets: [
          {
            type: 'line',
            fill: false,
            label: 'Before player trading',
            borderColor: '#4FC1E0',
            pointBackgroundColor: '#4FC1E0',
            data: [...this.getSubChartData('Operating Profit/(Loss)', false)],
          },
          {
            type: 'line',
            fill: false,
            label: 'After Player Trading (EBIT)',
            borderColor: '#F8CF2F',
            pointBackgroundColor: '#F8CF2F',
            data: [
              ...this.getSubChartData(
                  'Earnings before interest and tax (EBIT)', false
              ),
            ],
          },
        ],
      };
    },
    chartData3() {
      return {
        labels: [...this.labels],
        datasets: [
          {
            type: 'line',
            fill: false,
            label: 'Wages to turnover',
            borderColor: '#4FC1E0',
            pointBackgroundColor: '#4FC1E0',
            data: [...this.getSubChartData('Operating Profit/(Loss)', false)],
          },
          {
            type: 'line',
            fill: false,
            label: 'Revenue',
            borderColor: '#A6E6F8',
            pointBackgroundColor: '#A6E6F8',
            data: [...this.getSubChartData('Total operating revenue', false)],
          },
          {
            type: 'line',
            fill: false,
            label: 'Staff Costs',
            borderColor: '#F8CF2F',
            pointBackgroundColor: '#F8CF2F',
            data: [
              ...this.getSubChartData(
                  'Earnings before interest and tax (EBIT)', false
              ),
            ],
          },
        ],
      };
    },
    chartData4() {
      return {
        labels: [...this.labels],
        datasets: [
          {
            type: 'bar',
            label: 'Profit on Player Sales',
            backgroundColor: '#4FC1E0',
            data: [...this.getSubChartData('Profit/(loss) on Player sales', false)],
          },
          {
            type: 'bar',
            label: 'Player Trading Income',
            backgroundColor: '#F8CF2F',
            data: [...this.getSubChartData('Player trading', false)],
          },
        ],
      };
    },
    chartData5() {
      return {
        labels: [...this.labels],
        datasets: [
          {
            type: 'bar',
            label: 'Net financial debt',
            backgroundColor: '#4FC1E0',
            data: [...this.getSubChartData('Net financial debt', true)],
          },
          {
            type: 'bar',
            label: 'Net transfer debt',
            backgroundColor: '#F8CF2F ',
            data: [...this.getSubChartData('Net transfer debt', true)],
          },
          {
            type: 'bar',
            label: 'Social/tax dues (non-current)',
            backgroundColor: '#C6CBCC',
            data: [...this.getSubChartData('Social/tax dues (non-current)', true)],
          },
        ],
      };
    },
    chartData6() {
      return {
        labels: [...this.labels],
        datasets: [
          {
            datalabels: {
              anchor: 'center',
            },
            type: 'bar',
            label: 'Share holder debt',
            backgroundColor: '#4FC1E0',
            data: [...this.getSubChartData('Shareholder debt', true)],
          },
          {
            datalabels: {
              anchor: 'center',
            },
            type: 'bar',
            label: 'Other debt',
            backgroundColor: '#F8CF2F ',
            data: [...this.getSubChartData('Other debt', true)],
          },
          {
            type: 'bar',
            label: 'Cash',
            backgroundColor: '#C6CBCC',
            data: [...this.getSubChartData('Cash', true)],
          },
        ],
      };
    },
    chartData7() {
      return {
        labels: [...this.labels],
        datasets: [
          {
            type: 'bar',
            label: 'Player creditors',
            backgroundColor: '#4FC1E0',
            data: [...this.getSubChartData('Player creditors', true)],
          },
          {
            type: 'bar',
            label: 'Player debtors',
            backgroundColor: '#F8CF2F ',
            data: [...this.getSubChartData('Player debtors', true)],
          },
        ],
      };
    },

    fullChartData() {
      return [this.chartData1, this.chartData2, this.chartData3, this.chartData4, this.chartData5, this.chartData6, this.chartData7]
    }
  },
  methods: {
    getFinancialData() {
      if (this.isAdmin && this.clubId) {
        FinancialRepository.getClubFinancials(this.clubId)
            .then((res) => {
              this.financialData = res.data;
              this.getDataList()
            })
            .catch((err) => {
              console.error(err);
            });
      } else {
        FinancialRepository.getFinancials()
            .then((res) => {
              this.financialData = res.data;
              this.getDataList()
            })
            .catch((err) => {
              console.error(err);
            });
      }
    },
    getSubChartData(key, isBalance = false) {
      const tmp = this.chartDataList.filter((e) => e.label === key);
      const tmpKey = Object.keys(tmp[0]).filter(
          (key) =>
              key !== 'label' &&
              key !== 'style' &&
              key !== 'end-tr' &&
              key !== 'id' &&
              key !== 'actualStatus'
      );
      return isBalance === false
          ? tmpKey.map((e) =>
              !isNaN(parseFloat(tmp[0][`${e}`]))
                  ? parseFloat(tmp[0][`${e}`]).toFixed(0)
                  : null
          )
          : [...tmp[0].values];
    },
    getDataList() {
      this.tableDataCol = this.financialData?.seasons?.map((e) => e.label);
      this.v_tabs_itemList = Object.keys(this.financialData.items);
      this.tableDataList = [];
      this.chartDataList = [];
      this.dataList = [];
      let len = this.v_tabs_itemList.length;
      for (let i = 0; i < len - 1; i++) {
        let tabItem = this.v_tabs_itemList[i];
        const tmpTabList = Object.values(
            this.financialData['items'][`${tabItem}`]['items']
        );
        const tmpTableDataList = tmpTabList.map((e) =>
            Object.values(e).reduce((arr, {label, style, amounts}, index) => {
              arr = {
                ...this.tableDataCol.reduce((subArr, a, index) => {
                  subArr[this.tableDataCol[index]] = [
                    ...(subArr[a] || []),
                    amounts[index] || amounts[index] === 0 ? amounts[index] : '',
                  ];
                  return subArr;
                }, arr),
                label: [...(arr?.label || []), label],
                style: [...(arr?.style || []), style],
                id: [...(arr?.id || []), Object.keys(e)[index]],
              };
              return arr;
            }, {})
        );
          Object.values(tmpTableDataList).forEach((e) => {
            Object.values(e)[0].forEach((m, index) => {
              let tmpRowList = {};
              Object.keys(e).forEach((key) => {
                tmpRowList = {...tmpRowList, [`${key}`]: e[`${key}`][index]};
              });
              this.tableDataList = [...this.tableDataList, tmpRowList];
            });
          });
          if (tabItem === this.v_tabs_itemList[0]) {
            this.chartDataList = this.tableDataList;
          } else if (tabItem === this.v_tabs_itemList[1]) {
            this.chartDataList = this.chartDataList.concat(this.financialData['items'][`${tabItem}`]['Debt_Profile']['items']);
          }
      }
      this.labels = this.tableDataCol;
    },
    nameToSlug(name){
      return name.toLowerCase().replace(' ', '-')
    },
    printChart(ref) {
      let canvasEle = this.$refs[ref].$refs['canvas'];
      let win = window.open('', 'Print', 'height=600,width=800');
      win.document.write("<br><img src='" + canvasEle.toDataURL() + "' />");
      setTimeout(function(){
        win.document.close();
        win.focus()
        win.print();
        win.location.reload()
      }, 200);
    },
  },
  mounted() {
    this.getFinancialData();
  },
  watch: {
    selectedType() {
      setTimeout(() => {
        const canvas = document.querySelector('.fin-area canvas')
        this.$emit('loaded', canvas, this.selectedType)
      }, 200)
    }
  }
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
