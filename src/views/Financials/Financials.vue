<template>
  <div class="content" v-show="Object.values(financialFullData).length">
    <header-navigation>Financial Overview</header-navigation>
    <div class="header-section dp-row">
      <div class="header-left dp-row">
        <img :src="clubLogo" alt="img" class="left-img" />
        <div class="dp-column left-info">
          <span class="txt-name">{{ clubName }}</span>
        </div>
      </div>
      <div class="header-right dp-row">
        <div class="currency-area"><TitleAndCurrency title="" :default-currency="defaultCurrency" @selectedCurrency="onSelectedCurrency" /></div>
        <div class="btn-reports dp-row" @click="goToSnapshotReport">
          <IconReport class="img-report" />
          <span class="txt-report">View reports</span>
        </div>
      </div>
    </div>
    <div class="content-section">
      <v-row no-gutters>
        <v-col cols="12" lg="9" class="position-relative">
          <p v-if="numbersIn" class="numbers-in-message"> * numbers are in {{numbersIn}}s</p>
          <v-card>
            <v-tabs
                v-model="tabModel"
                color="v_tabs_color"
                :hide-slider="true"
                class="tabs"
                show-arrows
            >
              <v-tab
                  v-for="item in v_tabs_itemList"
                  :key="item"
                  class="tab"
                  @click="onTab(item)"
              >
                {{ item }}
              </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tabModel">
              <v-tab-item
                v-for="item in v_tabs_itemList"
                :key="item"
                transition="fade"
                reverse-transition="fade"
              >
                <div class="tab-content">
                  <table>
                    <thead class="thead-scroll-width">
                      <tr>
                        <td><span>League Position</span></td>
                        <td v-for="(col, index) in leaguePosition" :key="index">
                          <span>{{ col }}</span>
                        </td>
                      </tr>
                      <tr>
                        <td><span>League</span></td>
                        <td v-for="(col, index) in leagueList" :key="index">
                          <span>{{ col }}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>{{
                            selectedTab === 'Cash flow'
                              ? 'Net Profit/Loss'
                              : 'Category'
                          }}</span>
                        </td>
                        <td v-for="(col, index) in tableDataCol" :key="index">
                          <div
                            v-if="isActual && actualLabel === col"
                            class="td-actuals dp-row"
                            :class="(selectedTabStatus !== 'allow_upload' && selectedTabStatus !== 'edit') && 'td-actuals-disabled'"
                            @click.prevent="showUploadDocModal"
                          >
                            <IconUploadLink />
                            <span>Interim {{col.split(' ')[1]}}</span>
                          </div>
                          <span v-else>{{ col }}</span>
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(row, rowIndex) in tableDataList"
                        :key="rowIndex"
                        :class="row['end-tr'] && 'tr-bottom-border'"
                      >
                        <td>
                          <label :class="row.style === 'bold' && 'txt-bold'">{{
                            row.label
                          }}</label>
                        </td>
                        <td v-for="(col, index) in tableDataCol" :key="index">
                          <div v-if="row.style === 'bold' && row.isEmpty === false && row.item_slag !== 'tax' && row.item_slag !== 'net-non-operating-income-cost' && row.item_slag !=='opening-cash-balance'" class="font-weight-bold" style="font-size: 14px;">
                            {{row[col]}}
                          </div>
                          <div v-else-if="row.isEmpty === true">
                          </div>
                          <div v-else>
                            <v-text-field
                                v-if="
                              isActual && row.isEmpty === false &&
                              actualLabel === col &&
                              (selectedTabStatus === 'edit' || isDocumentsUploaded)
                            "
                                v-model="actualValueModal[row.id]"
                                :class="row.style === 'bold' && 'txt-bold'"
                                :disabled="row.style === 'bold' && row.item_slag !== 'tax' && row.item_slag !== 'net-non-operating-income-cost' && row.item_slag !=='opening-cash-balance'"
                                dense
                                @input="changeActualValue(col, row)"
                            ></v-text-field>
                            <label
                                v-else
                                :class="[
                              row.style === 'bold' && 'txt-bold',
                              isActual &&
                                selectedTabStatus === 'pending' &&
                                actualLabel === col &&
                                'txt-pending',
                              isActual &&
                                selectedTabStatus === 'accepted' &&
                                actualLabel === col &&
                                'txt-accepted',
                            ]"
                            >{{ getValidValue(row[col]) }}</label
                            >
                          </div>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td></td>
                        <td v-for="(col, index) in tableDataCol" :key="index">
                          <div
                            v-if="isActual && actualLabel === col"
                            :class="[((!isDocumentsUploaded && selectedTabStatus === 'allow_upload') || !isSubmit) && 'btn-disable', 'btn-div']"
                            @click="onSubmit"
                          >
                            <span class="btn-txt">Submit</span>
                          </div>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>
        <v-col cols="12" lg="3">
          <div
            class="chart-content"
            v-if="isChart && selectedTab !== 'Cash flow'"
          >
            <FinancialSheetCharts
              :dataList="chartDataList"
              :selectedTab="selectedTab"
              :labels="tableDataCol"
            />
          </div>
        </v-col>
      </v-row>
    </div>
    <BaseModal v-if="uploadDocumentsModal" @closed="uploadDocumentsModal = false" :club-id="clubId" :tab-id="selectedTabId" :modal-type="'upload-financial-documents'" @documentsSubmitted="documentsSubmitted"></BaseModal>
    <NotificationMessage :type="notificationType" @closed="notificationClosed = false" v-if="notificationClosed">{{notificationMessage}}</NotificationMessage>

  </div>
</template>
<script>
import HeaderNavigation from '@/components/HeaderNavigation.vue';
import TitleAndCurrency from '@/components/AdminTitleAndCurrency/AdminTitleAndCurrency.vue';
import FinancialSheetCharts from '@/components/Financials/FinancialSheetCharts.vue';
import IconReport from '@/assets/icons/report_icon.svg';
import IconUploadLink from '@/assets/icons/upload-link-icon.svg';
import FinancialRepository from '@/repositories/Financials/FinancialRepository';
import BaseModal from "@/components/BaseModal";
import NotificationMessage from '@/components/NotificationMessage.vue';
// import StaticFinancialData from '@/assets/js/staticFinancialData.json';
import numeral from 'numeral';
export default {
  components: {
    HeaderNavigation,
    TitleAndCurrency,
    IconReport,
    IconUploadLink,
    FinancialSheetCharts,
    BaseModal,
    NotificationMessage
  },
  data() {
    return {
      uploadDocumentsModal: false,
      isChart: false,
      // staticFinancialData: StaticFinancialData,
      tabModel: 0,
      selectedTab: '',
      selectedTabId: null,
      selectedTabStatus: '',
      v_tabs_color: '#060708',
      v_tabs_itemList: ['Profit/loss sheet', 'Balance sheet', 'Cash flow'],

      financialFullData: {},
      tableDataCol: {},
      tableDataList: [],
      leaguePosition: [],
      subTableRevenueBreakupList: [],
      leagueList: [],

      isActual: false,
      actualLabel: '',
      actualValueModal: {},
      initialActualValueList: {},
      updatedActualValueList: [],

      chartDataList: [],

      isSubmit: false,
      isDocumentsUploaded: false,

      clubLogo: '',
      clubName: '',
      clubId: null,

      financialYears: '',
      tmpTableDataList: [],
      notificationClosed: false,
      notificationMessage: '',
      notificationType: '',
      defaultCurrency: '',
      numbersIn: '',
      sumItems: {
        'operating-profit-loss': ['total-operating-revenue', 'operating-expenses'],
        'earnings-before-interest-and-tax-ebit': ['operating-profit-loss', 'player-trading'],
        'pre-tax-profit-loss': ['earnings-before-interest-and-tax-ebit', 'net-finance-income-cost', 'net-non-operating-income-cost'],
        'profit-loss-after-tax': ['pre-tax-profit-loss', 'tax'],

        'total-assets': ['non-current-assets', 'current-assets'],
        'total-liabilities': ['equity', 'non-current-liabilities', 'current-liabilities'],

        'net-cash-flow': ['a-net-cash-from-operating-activities', 'b-net-cash-from-investing-activities', 'c-net-cash-from-funding-activities'],
        'closing-cash-balance': ['net-cash-flow', 'other-tax-paid', 'opening-cash-balance']
      }
    };
  },
  created() {
    this.getFinancials(this.tabModel);
  },
  methods: {
    onSelectedCurrency(currency) {
      let $this = this;
      $this.$loading(true);
      FinancialRepository.getClubFinancialsWithCurrency(currency)
          .then((res) => {
            $this.changeFinancialsDataStructure(this.tabModel, res)
          })
          .catch((err) => {
            console.error(err);
            $this.$loading(false);
          });
    },
    showUploadDocModal() {
      if (this.selectedTabStatus === 'edit' || this.selectedTabStatus === 'allow_upload') {
        this.uploadDocumentsModal = true;
      }
    },
    getFinancials(tabItem) {
      let $this = this;
      $this.$loading(true);
      FinancialRepository.getFinancials()
        .then((res) => {
          $this.changeFinancialsDataStructure(tabItem, res)
        })
        .catch((err) => {
          console.error(err);
          $this.$loading(false);
        });
    },
    changeFinancialsDataStructure(tabItem, res) {
      this.financialFullData = { ...res.data };
      this.clubLogo = this.financialFullData?.club?.logo;
      this.clubName = this.financialFullData?.club?.name;
      this.clubId = this.financialFullData?.club?.id;
      this.defaultCurrency = this.financialFullData.defaultCurrency
      this.numbersIn = this.financialFullData?.numbers_in

      this.leagueList = this.financialFullData?.leagues;
      this.leaguePosition = this.financialFullData?.positions;
      this.tableDataCol = this.financialFullData?.seasons?.map(
          (e) => e.label
      );

      const tmpDate = new Date().getFullYear().toString().slice(0, 2);

      this.financialYears =
          tmpDate +
          this.tableDataCol[this.tableDataCol.length - 1].split('/')[0] +
          ' - ' +
          tmpDate +
          this.tableDataCol[0].split('/')[1];

      this.isActual = this.financialFullData?.seasons?.reduce(
          (value, { type, label }) => {
            if (type === 'actual') {
              value = true;
              this.actualLabel = label;
            }
            return value;
          },
          false
      );

      this.getDataList(this.v_tabs_itemList[tabItem]);
      this.$loading(false);
    },
    getDataList(tabItem) {
      this.updatedActualValueList = [];
      this.tableDataList = [];
      this.chartDataList = [];
      this.selectedTab = tabItem;
      this.selectedTabId = this.financialFullData['items'][`${tabItem}`]['id'];
      this.selectedTabStatus = this.financialFullData['items'][`${tabItem}`]['status'];

      const tmpTabList = Object.values(
        this.financialFullData['items'][`${tabItem}`]['items']
      );
      console.log("tmpTabList = ", tmpTabList)
      const tmpTableDataList = tmpTabList.map((e) =>
        Object.values(e).reduce(
          (arr, { label, style, item_slag, isEmpty, amounts }, index) => {
            arr = {
              ...this.tableDataCol.reduce((subArr, a, index) => {
                subArr[this.tableDataCol[index]] = [
                  ...(subArr[a] || []),
                  amounts[index] || amounts[index] === 0 ? amounts[index] : 0,
                ];
                return subArr;
              }, arr),

              label: [...(arr?.label || []), label],
              style: [...(arr?.style || []), style],
              isEmpty: [...(arr?.isEmpty || []), isEmpty],
              item_slag: [...(arr?.item_slag || []), item_slag],
              id: [...(arr?.id || []), Object.keys(e)[index]],
            };
            return arr;
          },
          {}
        )
      );
      this.tmpTableDataList = tmpTableDataList
      Object.values(tmpTableDataList).forEach((e) => {
        Object.values(e)[0].forEach((m, index) => {
          let tmpRowList = {};
          Object.keys(e).forEach((key) => {
            tmpRowList = { ...tmpRowList, [`${key}`]: e[`${key}`][index] };
            if (this.actualLabel && this.actualLabel === key) {
              this.actualValueModal = {
                ...this.actualValueModal,
                [e.id[index]]: e[this.actualLabel][index] !== 0 && numeral(e[this.actualLabel][index]).value() ? numeral(e[this.actualLabel][index]).value().toFixed(2) : e[this.actualLabel][index],
              };
            }
            if (index === Object.values(e)[0].length - 1) {
              tmpRowList = { ...tmpRowList, ['end-tr']: true };
            }
          });
          this.tableDataList = [...this.tableDataList, tmpRowList];
        });
      });

      this.initialActualValueList = { ...this.actualValueModal };
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
    getValidValue(value) {
      let validValue = '';

      if (typeof value === 'number' && value !== 0) {
        validValue = value > 0 ? numeral(value).value().toFixed(2) : `(${numeral(Math.abs(value)).value().toFixed(2)})`;
      } else {
        validValue = value === 0 && this.selectedTabStatus !== 'allow_upload' ? '-' : value;
      }

      return validValue;
    },

    setShowChart() {
      setTimeout(() => {
        this.isChart = true;
      }, 50);
    },
    onTab(item) {
      this.isChart = false;
      this.getDataList(item);
    },
    changeActualValue(colName, row, index) {
      let sums = [];
      const obj = this.tmpTableDataList.find(el => el.id.includes(row.id))
      const arr2 = this.tableDataList.filter(el => obj.id.includes(el.id))

      const mappedArray = arr2.map(el => {
        return {value: el[colName], row: el.id}
      })
      if (mappedArray.length > 1) {
        if (this.selectedTab === this.v_tabs_itemList[2] && row.item_slag !== 'other-tax-paid') {
          mappedArray.splice(-1, 1)
        } else {
          mappedArray.splice(0, 1)
        }
      }
      mappedArray.find(el => +el.row === +row.id).value = +this.actualValueModal[row.id]
      let count = 0;
      mappedArray.forEach(item => {
        count += item.value
      })
      let item = {};
      if (this.selectedTab === this.v_tabs_itemList[2]) {
        let a  = this.tableDataList.filter(el => obj.id.includes(el.id));
        item = this.tableDataList[this.tableDataList.indexOf(a[a.length-1])]
        item[colName] = count;
      } else {
        item = this.tableDataList[this.tableDataList.indexOf(this.tableDataList.filter(el => obj.id.includes(el.id))[0])];
        item[colName] = count;
      }
      sums.push({item_id: +item['id'], amount: count})
      Object.keys(this.sumItems).forEach(key => {
        let sumAmount = 0;
        let itemIndex = this.tableDataList.findIndex(el => el.item_slag === key);
        if (itemIndex > -1) {
          this.sumItems[key].forEach(itemSlug => {
            sumAmount += this.tableDataList.find(el => el.item_slag === itemSlug)[colName]
          });
          this.tableDataList[itemIndex][colName] = sumAmount;
          sums.push({item_id: +this.tableDataList[itemIndex]['id'], amount : sumAmount})
        }
      });
      this.tableDataList.find(el => el.id === row.id)[colName] = +this.actualValueModal[row.id]
      Object.keys(this.initialActualValueList).forEach((key) => {
        if (
          !isNaN(parseFloat(this.actualValueModal[key])) &&
          parseFloat(this.initialActualValueList[key]) !==
            parseFloat(this.actualValueModal[key])
        ) {
          let index = this.updatedActualValueList.findIndex(el => el.item_id == key);
          if (index > -1) {
            this.updatedActualValueList[index]['amount'] = this.actualValueModal[key];
          } else {
            this.updatedActualValueList.push({
              item_id: key,
              amount: this.actualValueModal[key],
            })
          }
        }
      });
      sums.forEach((sum) => {
        if (
            !isNaN(parseFloat(sum.amount))
        ) {

          let index = this.updatedActualValueList.findIndex(el => el.item_id == sum.item_id);
          console.log('index', index)
          if (index > -1) {
            this.updatedActualValueList[index]['amount'] = sum.amount;
          } else {
            this.updatedActualValueList.push(sum)
          }

        }
      })
      this.isSubmit = Object.keys(this.updatedActualValueList).length;
    },
    onSubmit() {
      if (!this.isSubmit) {
        return;
      }
      let $this = this;
      $this.$loading(true);
      FinancialRepository.submitFinancialValues({
        data: $this.updatedActualValueList,
        section_id: $this.selectedTabId
      })
        .then((res) => {
          this.getFinancials(this.tabModel);
          $this.isDocumentsUploaded = false;
          $this.$loading(false);
          this.notificationClosed = true;
          this.notificationMessage = "Values were successfully submitted. Please wait for the Admin's verification.";
          this.notificationType = 'success'
        })
        .catch((err) => {
          console.error(err);
          this.notificationClosed = true;
          this.notificationMessage = "Values can't be submitted due this error - " . err;
          this.notificationType = 'error'
          this.actualValueModal = { ...this.initialActualValueList };
          $this.$loading(false);
        });
      setTimeout(() => {
        this.notificationClosed = false;
      }, 6000)
      this.isSubmit = false;
    },
    goToSnapshotReport() {
      this.$router.push(`/snapshot-report`);
    },
    documentsSubmitted(message) {
      if (message === 'success') {
        this.isDocumentsUploaded = true;
        this.notificationClosed = true;
        this.notificationMessage = "Your documents were successfully submitted. Please enter actual values.";
        this.notificationType = 'success'
      } else {
        this.notificationClosed = true;
        this.notificationMessage = `Your documents can't be submitted due this error - ${message}`;
        this.notificationType = 'error';
        this.uploadDocumentsModal = false
      }
      setTimeout(() => {
        this.notificationClosed = false;
      }, 6000)
    }
  },
};
</script>
<style
  lang="scss"
  scoped
  src="@/assets/styles/financial/financial-overview.scss"
></style>
<style
  lang="scss"
  scoped
  src="@/assets/styles/admin/default-table.scss"
></style>
<style lang="scss" scoped>
.content-section {
  position: relative;
  .numbers-in-message {
    position: absolute;
    top: 25px;
    right: 0;
    font-size: 14px;
    margin-bottom: 0;
    z-index: 1;
  }
}
.v-card {
  height: 100%;
}
.v-input {
  color: #060708;
  border-radius: 0px;
  padding: 0;
  margin: 0;
  background-color: transparent;
  ::v-deep {
    .v-input__control {
      color: #060708;
      .v-text-field__details {
        display: none;
      }
      .v-input__slot {
        margin: 0;
        padding: 0;
        input {
          font-size: 14px;
          padding: 0;
          line-height: 18px;
          text-align: right;
          color: #060708;
          opacity: 1;
          caret-color: #060708;
        }
      }
      .v-input__slot:before {
        border: none;
      }
      .v-input__slot:after {
        border-style: none;
        border-bottom: 1px solid #c6cbcc;
        font-weight: 100;
        right: 0;
        left: auto;
      }
    }
  }
}
</style>
