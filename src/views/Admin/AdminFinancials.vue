<template>
  <div class="content">
    <HeaderNavigation> Admin Financial Overview </HeaderNavigation>
    <div class="gridWrap">
      <AdminFinancialsHeader
        @clubChanged="clubChanged"
        @changeLeagueCountry="changeLeagueCountry"
      />
      <FinancialSheets
        :changedClub="changedClub"
        :lastTab="lastTab"
        @tabChanged="changeEvent"
        @financialDataChanged="sheetChartData"
        :selectedTab="selectedTab"
      />
      <FinancialSheetCharts
        v-if="
          isChart &&
          (selectedTab === v_tabs_itemList[0] ||
            selectedTab === v_tabs_itemList[1])
        "
        :dataList="chartData"
        :selectedTab="selectedTab"
        :labels="tableDataCol"
        class="adminFinancialCharts financial-charts"
      />
    </div>
  </div>
</template>

<script>
import '@/assets/styles/adminMain.css';

import HeaderNavigation from '@/components/HeaderNavigation.vue';
import AdminFinancialsHeader from '@/components/Financials/AdminFinancialsHeader';
import FinancialSheets from '@/components/Financials/FinancialSheets';
import FinancialMixin from '@/mixins/Common/Financial.mixin';
import FinancialSheetCharts from '@/components/Financials/FinancialSheetCharts';
import store from '@/store';

export default {
  components: {
    HeaderNavigation,
    AdminFinancialsHeader,
    FinancialSheets,
    FinancialSheetCharts,
  },
  mixins: [FinancialMixin],
  mounted() {
    this.getFinancials();
  },
  data() {
    return {
      changedClub: false,
      isChart: false,
      selectedTab: '',
      tableDataCol: [],
      chartDataList: [],
      chartData: [],
      club: null,
      v_tabs_itemList: [],
      lastTab: 'Financial documents',
      financialFullData: [],
    };
  },
  methods: {
    clubChanged(club) {
      this.club = club;
      this.chartDataList = [];
      this.isChart = false;
      this.financialFullData = store.getters['Financials/getTabs'];
      if (
        this.selectedTab &&
        this.selectedTab !== this.v_tabs_itemList[2] &&
        this.selectedTab !== this.v_tabs_itemList[3]
      ) {
        this.getDataList(this.selectedTab);
      } else if (!this.selectedTab) {
        this.selectedTab = this.v_tabs_itemList[0];
        this.getDataList(this.selectedTab);
      } else {
        this.chartDataList = [];
        this.isChart = false;
      }
    },
    changeLeagueCountry() {
      this.chartDataList = [];
      this.isChart = false;
      this.getFinancials();
    },
    changeEvent(sheet) {
      this.chartDataList = [];
      this.isChart = false;
      let tab = sheet;
      this.changedClub = !this.changedClub;
      if (this.club) {
        if (!sheet) {
          this.getDataList(this.v_tabs_itemList[0]);
          tab = this.v_tabs_itemList[0];
        } else if (
          sheet !== this.v_tabs_itemList[2] &&
          sheet !== this.v_tabs_itemList[3]
        ) {
          this.getDataList(sheet);
        } else {
          this.chartDataList = [];
          this.isChart = false;
        }
      }
      this.selectedTab = tab;
    },
    setShowChart() {
      setTimeout(() => {
        this.isChart = true;
      }, 50);
    },
    sheetChartData(items) {
      this.chartDataList = [];
      this.isChart = false;
      this.financialFullData = items;
      this.tableDataCol = items?.seasons?.map((e) => e.label);
      this.v_tabs_itemList = Object.keys(items.items);
      this.v_tabs_itemList.push(this.lastTab);
    },

    getDataList(tabItem) {
      this.tableDataList = [];
      this.chartDataList = [];
      this.selectedTab = tabItem;
      const tmpTabList = Object.values(
        this.financialFullData['items'][`${tabItem}`]['items']
      );

      const tmpTableDataList = tmpTabList.map((e) =>
        Object.values(e).reduce((arr, { label, style, amounts }, index) => {
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
            tmpRowList = { ...tmpRowList, [`${key}`]: e[`${key}`][index] };
          });
          this.tableDataList = [...this.tableDataList, tmpRowList];
        });
      });
      if (tabItem === this.v_tabs_itemList[0]) {
        this.chartDataList = this.tableDataList;
      } else if (tabItem === this.v_tabs_itemList[1]) {
        this.chartDataList =
          this.financialFullData['items'][`${tabItem}`]['Debt_Profile'][
            'items'
          ];
      }
      this.setShowChart();
    },
  },
  watch: {
    chartDataList() {
      if (this.chartDataList.length) {
        this.chartData = this.chartDataList;
      }
    },
  },
};
</script>

<style scoped>
.gridWrap {
  display: grid;

  gap: 20px;
  margin: 25px 0;
}
.financials-header {
  grid-area: financials-header;
}
.sheets {
  grid-area: sheets;
}
.financial-charts {
  grid-area: financial-charts;
}
.adminFinancialCharts {
  margin-top: 40px;
  padding: 18px;
  background: #fff;
  max-height: 750px;
  overflow-y: auto;
  border-radius: 3px;
}

@media only screen and (min-width: 1101px) {
  .gridWrap {
    grid-template-columns: 1.2fr 1fr 0.8fr;
    grid-template-rows: auto auto;
    grid-template-areas:
      'financials-header financials-header financials-header '
      'sheets sheets financial-charts  ';
  }
}
@media only screen and (max-width: 1100px) {
  .gridWrap {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    grid-template-areas:
      'financials-header  financials-header '
      'sheets  financial-charts  ';
  }
}
@media only screen and (max-width: 900px) {
  .gridWrap {
    grid-template-columns: 100%;
    grid-template-areas:
      'financials-header'
      'sheets'
      'financial-charts  ';
  }
}
</style>
