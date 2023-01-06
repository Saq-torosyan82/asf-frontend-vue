<template>
  <div>
    <div class="header-section dp-row">
      <div class="header-right dp-row">
        <div class="currency-area"><TitleAndCurrency title="" :defaultCurrency="defaultCurrency" @selectedCurrency="onSelectedCurrency" /></div>
        <div class="dp-row">
          <div class="dp-column right-info">
            <span class="txt-name">{{ clubName }}</span>
          </div>
          <img :src="clubLogo" alt="img" class="right-img" />
        </div>
      </div>
    </div>
    <div class="content-section" :class="forPrint ? 'content-section-print':''">
      <b-tabs class="snapshot-tabs">
        <b-tab
            v-for="(tab, key) in tabs"
            :key="key"
            :title="tab.label"
            :active="key === 0"
        >
          <v-row no-gutters v-if="key === 0 || forPrint">
            <v-col cols="12" lg="6" md="12">
              <template v-for="(item, key) in tab.items.withActual">
                <ValueSnapshot :valueListCol="valueListCol" :valueList="item"  :key="key" :forPrint="forPrint"/>
              </template>

            </v-col>
            <v-col cols="12" lg="5" md="5">
              <template v-for="(item, key) in tab.items.withoutActual">
                <ValueSnapshot :valueListCol="valueListColWithoutActual" :valueList="item"  :key="key" class="player-transfer" :forPrint="forPrint"/>
              </template>
              <div class="snapshot-charts" v-if="!forPrint">
                <div class="financial-charts">
                  <span class="txt-title">Financial Indicator Charts</span>
                  <v-autocomplete
                      v-model="finChartType"
                      :items="financialChartList"
                      solo
                      flat
                      hide-details
                      :label="finChartType || 'Choose from the list'"
                  />
                  <SnapshotCharts
                      :selectedType="finChartType"
                      :clubId="clubId"
                      :isAdmin="isAdmin"
                      @loaded="onCanvasLoaded"
                  />
                </div>
                <div class="league-rank-charts">
                  <span class="txt-title">League Rank Charts</span>
                  <v-autocomplete
                      v-model="leagueChartType"
                      :items="leagueChartList"
                      solo
                      flat
                      hide-details
                      :label="leagueChartType || 'Choose from the list'"
                  />
                  <template v-if="leagueChartType === leagueChartList[0]">

                    <span class="txt-chart-name">Historical League Finishes</span>
                    <FinancialRevenueStyleChart :model="leagueChartType" :chartData="leagueData" class="chart-area second-chart" @loaded="onCanvasLoaded" />
                  </template>
                </div>
              </div>
              <div v-if="!forPrint">
                <FinancialRevenueStyleChart :model="tabs[1].items.attendance.label" style="visibility: hidden; width: 100%" :chartData="attendanceData" class="chart-area attendance-chart" @loaded="onCanvasLoaded"/>
              </div>
            </v-col>
          </v-row>
          <v-row no-gutters v-if="key === 1 || forPrint" >
            <v-col cols="12" lg="4" md="12">
              <ClubInfoSnapshot
                :clubList="forPrint ? tabs[1].items.clubList : tab.items.clubList"
                :squadInfo="forPrint ? tabs[1].items.squadInfo : tab.items.squadInfo"
                :clubLogo="clubLogo"
                :clubName="clubName"
                :forPrint="forPrint"
              />
            </v-col>
            <v-col cols="12" lg="4" md="12">
              <ClubPositions
                  :clubHonours="forPrint ? tabs[1].items.clubHonours : tab.items.clubHonours"
                  :leaguesList="forPrint ? tabs[1].items.leagues : tab.items.leagues"
                  :leaguesListCol="leaguesListCol"
              ></ClubPositions>
            </v-col>
            <v-col cols="12" lg="3" md="12">
              <ClubSponsorSocialMedia
                  :sponsors="forPrint ? tabs[1].items.sponsors : tab.items.sponsors"
                  :socialMedia="forPrint ? tabs[1].items.socialMedia : tab.items.socialMedia"
              ></ClubSponsorSocialMedia>
            </v-col>
            <v-col cols="12" lg="4" md="12" v-if="!forPrint">
                <span class="txt-chart-name">{{ tab.items.attendance.label }}</span>
                <FinancialRevenueStyleChart :model="tab.items.attendance.label" :chartData="attendanceData" class="chart-area" @loaded="onCanvasLoaded"  />
            </v-col>
          </v-row>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>
import ClubInfoSnapshot from './ClubInfoSnapshot.vue';
import ValueSnapshot from './ValueSnapshot.vue';
import ClubPositions from './ClubPositions.vue';
import TitleAndCurrency from '@/components/AdminTitleAndCurrency/AdminTitleAndCurrency.vue';
import ClubSponsorSocialMedia from './ClubSponsorSocialMedia.vue';
import SnapshotCharts from './SnapshotCharts.vue';
import FinancialRevenueStyleChart from '../charts/FinancialRevenueStyleChart';
export default {
  components: {
    ClubInfoSnapshot,
    ValueSnapshot,
    TitleAndCurrency,
    ClubPositions,
    ClubSponsorSocialMedia,
    SnapshotCharts,
    FinancialRevenueStyleChart,
  },
  props: {
    fullSnapshotData: {
      type: Object,
      default: new Object(),
    },
    forPrint: {
      type: Boolean,
      default: false
    },
    clubId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      clubName: '',
      clubLogo: '',
      clubList: {},
      clubListCol: [],
      leaguesList: {},
      leaguesListCol: [],
      valueListColWithoutActual: [],

      valueList: [],
      valueListCol: [],
      valueSplitList: [],
      defaultCurrency: '',
      tabs: [],
      finChartType: '',
      financialChartList: ['Core Revenues', 'Operating Profits', 'Wages to Turnover', 'Player Trading Income', 'Net Debt Profile', 'Gross Financial Debt', 'Player Transfer Balance'/*, 'Squad Market Value Vs Book Value'*/],
      leagueChartType: '',
      leagueChartList: ['Historical League Finishes'],
      labels: [],
      attributes: {
        'EPL':{'color':'#4FC1E0', 'pointStyle': 'circle'},
        'Championship':{'color':'#F8CF2F', 'pointStyle': 'triangle'},
        'League One':{'color':'#f8682f', 'pointStyle': 'rectangle'},
        'League Two':{'color':'#C6CBCC', 'pointStyle':'star'}
      },
      leagueFinishes: [],
      isAdmin: false,

      chartsPdf: [],
    };
  },
  created() {
    this.fullSnapshotReport = this.fullSnapshotData;
    this.getUserType();
    if (!this.isAdmin) {
      this.getData();
    }
  },
  computed: {
    attendanceData() {
      return {
        labels: [...this.labels],
        datasets: [
          {
            datalabels: {
              anchor: 'end',
              formatter: (value) => {
                const array = [...this.fullSnapshotReport.tabs[1]['items'].attendance['items'].filter((e) => e.label === 'Total capacity')[0].amounts]
                for(let i in array) {
                  return Math.round(value/array[i] * 100) + '%'
                }
              }
            },
            type: 'line',
            fill: false,
            label: 'Utilisation rate %',
            borderColor: '#F8CF2F',
            pointBackgroundColor: '#F8CF2F',
            data: [...this.fullSnapshotReport.tabs[1]['items'].attendance['items'].filter((e) => e.label === 'Average attendance')[0].amounts],
          },
          {
            type: 'bar',
            label: 'Average Attendance',
            backgroundColor: '#4FC1E0',
            data: [...this.fullSnapshotReport.tabs[1]['items'].attendance['items'].filter((e) => e.label === 'Average attendance')[0].amounts]
          },
        ],
      };
    },
    leagueData() {
      return {
        labels: [...this.labels],
        datasets: this.leagueFinishes,
      };
    },
  },
  methods: {
    onCanvasLoaded(canvas, title) {
      setTimeout(() => {
        if(this.financialChartList.includes(title)) {
          if(this.chartsPdf.find(el => this.financialChartList.includes(el.title))) {
            this.chartsPdf.splice(this.chartsPdf.indexOf(this.chartsPdf.find(el => this.financialChartList.includes(el.title))), 1, {
              title: title,
              src: canvas.toDataURL()
            })
          } else {
            this.chartsPdf.push({
              title: title,
              src: canvas.toDataURL()
            })
          }
        }
        if(this.leagueChartList.includes(title)) {
          if(this.chartsPdf.find(el => this.leagueChartList.includes(el.title))) {
            console.log('index', this.chartsPdf.indexOf(this.chartsPdf.find(el => this.leagueChartList.includes(el.title))))
            this.chartsPdf.splice(this.chartsPdf.indexOf(this.chartsPdf.find(el => this.leagueChartList.includes(el.title))), 1, {
              title: title,
              src: canvas.toDataURL()
            })
          } else {
            this.chartsPdf.push({
              title: title,
              src: canvas.toDataURL()
            })
          }
        }
        if(!this.chartsPdf.find(el => el.title === title) && !this.financialChartList.includes(title)) {
          this.chartsPdf.push({
            title: title,
            src: canvas.toDataURL()
          })
        }
        this.$emit('charts-page', this.chartsPdf)
      }, 2000)
    },
    onSelectedCurrency(currency) {
      this.$emit('selectedCurrency', currency);
    },
    getData() {
      this.labels = this.fullSnapshotReport.tabs[1]['items'].attendance['seasons'].map((e) => e.label);
      this.clubName = this.fullSnapshotReport?.club?.name;
      this.clubLogo = this.fullSnapshotReport?.club?.logo;
      this.defaultCurrency = this.fullSnapshotReport?.defaultCurrency
      this.tabs = this.fullSnapshotReport.tabs
      this.leaguesListCol = [...this.fullSnapshotReport?.intervals].reverse();
      let seasons = [...this.fullSnapshotReport?.seasons];
      seasons = seasons.reverse()
      this.valueListCol = [
        ...seasons.map(
          (e) => (e.type && 'Interim '+ e.label) || e.label
        ),
        'Year to Year Growth %',
        'League ranking',
      ];
      seasons = seasons.filter(e => {
        return !e.type
      })
      this.valueListColWithoutActual = [
        ...seasons.map(
            (e) => e.label
        ),
        'League ranking',
      ];
      this.getPositions();
    },
    getPositions() {
      let data = [];
      let legs = this.fullSnapshotReport?.positions;
      if (legs) {
        let leagues = legs.map((e) => e.league);
        leagues = [...new Set(leagues)];
        let len = this.labels.length;
        let legLen = leagues.length;
        for (let j = 0; j < legLen; j++) {
          data[leagues[j]] = [];
          for (let i = 0; i < len; i++) {
            let pos = null;
            if (legs[i].league === leagues[j]) {
              pos = legs[i].position
            }
            data[leagues[j]].push(pos)
          }
        }
        for (let key in leagues) {
          let currentLeague = leagues[key]
          this.leagueFinishes.push({
            type: 'line',
            fill: false,
            label: currentLeague,
            pointRadius: 6,
            pointHoverRadius: 6,
            borderColor: this.attributes[currentLeague]['color'] ? this.attributes[currentLeague]['color'] : '#A6E6F8',
            pointBackgroundColor: this.attributes[currentLeague]['color'] ? this.attributes[currentLeague]['color'] : '#A6E6F8',
            pointStyle: this.attributes[currentLeague]['pointStyle'] ? this.attributes[currentLeague]['pointStyle'] : 'circle',
            data: data[currentLeague]
          })
        }
      }
    },
    getUserType() {
      this.isAdmin = this.$localStorage.get('userInfo').user_type === 'admin';
    },
  },
  watch: {
    fullSnapshotData() {
      this.fullSnapshotReport = this.fullSnapshotData;
      this.finChartType = '';
      this.getData();
    },
  },
  mounted() {
    this.finChartType = '';
  },
};
</script>
<style
  lang="scss"
  scoped
  src="@/assets/styles/financial/snapshot-report.scss"
></style>
