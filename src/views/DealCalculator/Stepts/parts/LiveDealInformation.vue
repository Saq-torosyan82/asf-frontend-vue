<template>
  <div>
    <BaseModal v-if="showSuccessMessage" modalType="save-deal"></BaseModal>
    <div class="payment__table__wrapper">
      <table class="payment__table">
        <thead>
        <td></td>
        <td>Payment dates</td>
        <td>Payment amounts</td>
        <td v-if="!instantCalc">Present amounts</td>
        <td></td>
        </thead>
        <tbody>
        <tr v-for="(item, index) in paymentEntries" :key="index + '_payment'">
          <td>{{ index + 1 }}.</td>
          <td>
            <div class="payment-dates">
              <CustomInput
                  :error="
                    $v.paymentEntries.$each[index].paymentDate.$error &&
                    $v.paymentEntries.$each[index].paymentDate.$error
                  "
                  errorMsg="Field is required."
              >
                <datepicker
                    :disabled="!isCustomFrequency && paymentEntries[index].paymentDate !== ''"
                    v-model="paymentEntries[index].paymentDate"
                    format="dd/MM/yyyy"
                    placeholder="dd/MM/yyyy"
                    @input="calculateRates()"
                    class="datepicker-payment"
                ></datepicker>
              </CustomInput>
            </div>
          </td>
          <td>
            <div>
              <CustomInput
                  :error="
                    $v.paymentEntries.$each[index].grossAmount.$error &&
                    $v.paymentEntries.$each[index].grossAmount.$error
                  "
                  errorMsg="Field is required."
              >
                <CurrencyInput v-model="paymentEntries[index].grossAmount"
                               @change="calculateRates()"
                               :currency="currency"
                               :disabled="!isCustomFrequency && paymentEntries[index].grossAmount > 0"></CurrencyInput>
              </CustomInput>
            </div>
          </td>
          <td v-if="!instantCalc">
            {{ currency }}
            {{ paymentEntries[index].paymentAmount  | roundingUp | numFormat('0,0.[00]') }}
            <input
                hidden
                type="text"
                class="transparent-input"
                disabled
                v-model="paymentEntries[index].paymentAmount"
            />
          </td>
          <td>
            <a href="#" @click.prevent="addPaymentEntry()">+ Add</a>
            <a href="#" @click.prevent="removePaymentEntry(index)">Delete</a>
          </td>
        </tr>
        </tbody>
        <tr v-if="totalPaymentsError">
          <td colspan="7">
            <div class="alert alert-danger" role="alert">
              Total payments are higher than must be paid, please review
              payments amount
            </div>
          </td>
        </tr>

        <tr class="border-bottom total">
          <td>Total</td>
          <td></td>
          <td class="pl-17">
            {{ currency }} {{ grossTotal | roundingUp | numFormat('0,0.[00]') }}
          </td>
          <td v-if="!instantCalc">
            {{ currency }} {{ total | roundingUp | numFormat('0,0.[00]') }}
          </td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr class="capital-fee">
          <td colspan="3">Underwriting fee</td>
          <td></td>
          <td></td>
          <td>
            {{ currency }}
            {{ underwritingFee | roundingUp | numFormat('0,0.[00]') }}
          </td>
        </tr>
        <tr>
          <td colspan="3">Legal costs</td>
          <td></td>
          <td></td>
          <td>
            {{ currency }} {{ legalCost.toFixed(3) | roundingUp | numFormat('0,0.[00]') }}
          </td>
        </tr>
        <tr>
          <td colspan="3">Insurance expense</td>

          <td></td>
          <td></td>
          <td>{{ currency }} {{this.insuranceAmount() | roundingUp | numFormat('0,0.[00]') }}</td>
        </tr>
        <tr class="amount-charged">
          <td colspan="3">Estimated Net Amount due</td>

          <td></td>
          <td></td>
          <td>{{ currency }} {{ totalPresentAmount() - underwritingFee - this.insuranceAmount() - legalCost | roundingUp | numFormat('0,0.[00]') }}</td>
        </tr>
        <tr class="amount-charged">
          <td colspan="3">Net amount due to selling club</td>

          <td></td>
          <td></td>
          <td>{{ currency }} {{ totalPresentAmount() - underwritingFee - this.insuranceAmount() - legalCost + upfrontValue() | roundingUp | numFormat('0,0.[00]') }}</td>
        </tr>
      </table>
    </div>
    <div class="calculator-footer">
      <a
          class="next-step"
          v-if="dealType !== featureDealType && !instantCalc"
          @click="nextStep()"
      >Proceed with deal</a
      >

      <a
          class="next-step"
          v-if="instantCalc"
          @click="nextStep(5)"
      >Submit</a>
      <a class="next-step save-later" @click="saveLater()">Save for later</a>

      <a v-if="isExported" class="next-step save-later" @click="exportPdf()">Export PDF</a>
      <a href="#" @click.prevent="exportExcel('deal')"  class="link-text">
        Export xls
      </a>


      <VueHtml2pdf
          v-if="isExported"
          :show-layout="false"
          :float-layout="true"
          :enable-download="true"
          :preview-modal="false"
          :paginate-elements-by-height="1400"
          filename="Payment instalment"
          @progress="generatePdfProgress"
          :pdf-quality="2"
          :manual-pagination="false"
          pdf-format="a4"
          pdf-orientation="landscape"
          pdf-content-width="100%"
          :html-to-pdf-options="this.htmlToPdfOptions"
          ref="html2Pdf"
      >
        <section slot="pdf-content" id="pdf-content" class="pdf-content">

          <div class="pdf-header">
            <LogoImage></LogoImage>
            <div class="line"></div>
          </div>

          <DealInfo></DealInfo>
          <div class="payment__table__wrapper">
            <table class="payment__table">
              <thead>
              <td></td>
              <td>Payment dates</td>
              <td>Payment amounts</td>
              <td v-if="!instantCalc">Present amounts</td>
              </thead>
              <tbody>
              <tr v-for="(item, index) in paymentEntries" :key="index + '_payment'">
                <td>{{ index + 1 }}.</td>
                <td>
                  <div class="payment-dates">
                    <CustomInput
                        :error="
                    $v.paymentEntries.$each[index].paymentDate.$error &&
                    $v.paymentEntries.$each[index].paymentDate.$error
                  "
                        errorMsg="Field is required."
                    >
                      <datepicker
                          :disabled="!isCustomFrequency && paymentEntries[index].paymentDate !== ''"
                          v-model="paymentEntries[index].paymentDate"
                          format="dd/MM/yyyy"
                          placeholder="dd/MM/yyyy"
                          @input="calculateRates()"
                          class="datepicker-payment"
                      ></datepicker>
                    </CustomInput>
                  </div>
                </td>
                <td>
                  <div>
                    <CustomInput
                        :error="
                    $v.paymentEntries.$each[index].grossAmount.$error &&
                    $v.paymentEntries.$each[index].grossAmount.$error
                  "
                        errorMsg="Field is required."
                    >
                      <CurrencyInput v-model="paymentEntries[index].grossAmount"
                                     @change="calculateRates()"
                                     :currency="currency"
                                     :disabled="!isCustomFrequency && paymentEntries[index].grossAmount > 0"></CurrencyInput>
                    </CustomInput>
                  </div>
                </td>
                <td v-if="!instantCalc">
                  {{ currency }}
                  {{ paymentEntries[index].paymentAmount | roundingUp | numFormat('0,0.[00]') }}
                  <input
                      hidden
                      type="text"
                      class="transparent-input"
                      disabled
                      v-model="paymentEntries[index].paymentAmount"
                  />
                </td>
              </tr>
              </tbody>
              <tr v-if="totalPaymentsError">
                <td colspan="4">
                  <div class="alert alert-danger" role="alert">
                    Total payments are higher than must be paid, please review
                    payments amount
                  </div>
                </td>
              </tr>

              <tr class="border-bottom total">
                <td>Total</td>
                <td></td>
                <td class="pl-17">
                  {{ currency }} {{ grossTotal | roundingUp | numFormat('0,0.[00]') }}
                </td>
                <td v-if="!instantCalc">
                  {{ currency }} {{ total | roundingUp | numFormat('0,0.[00]') }}
                </td>
                <td></td>
              </tr>
              <tr class="capital-fee">
                <td colspan="3">Underwriting fee</td>
                <td>
                  {{ currency }}
                  {{ underwritingFee | roundingUp | numFormat('0,0.[00]') }}
                </td>
              </tr>
              <tr>
                <td colspan="3">Legal costs</td>
                <td>
                  {{ currency }} {{ legalCost.toFixed(3) | roundingUp | numFormat('0,0.[00]') }}
                </td>
              </tr>
              <tr>
                <td colspan="3">Insurance expense</td>
                <td>{{ currency }} 0</td>
              </tr>
              <tr>
                <td colspan="3">Amount paid upfront</td>
                <td>{{ currency }} {{ info.upfrontValue | roundingUp | numFormat("0,0.[00]") }}</td>
              </tr>
              <tr class="amount-charged">
                <td colspan="3">Estimated Net Amount due</td>
                <td>{{ currency }} {{ totalPresentAmount() - underwritingFee - this.insuranceAmount() - legalCost | roundingUp | numFormat('0,0.[00]') }}</td>
              </tr>
              <tr class="amount-charged">
                <td colspan="3">Net amount due to selling club</td>
                <td>{{ currency }} {{ totalPresentAmount() - underwritingFee - this.insuranceAmount() - legalCost + upfrontValue() | roundingUp | numFormat('0,0.[00]') }}</td>
              </tr>
            </table>
          </div>
          <div class="pdf-footer">
            <p class="head">PRIVATE & CONFIDENTIAL</p>
            <p>SportsFi Limited a company incorporated in England and Wales under number company no. 13839769 whose registered office is situated office at 20-22 Wenlock Road, London, N1 7GU</p>
          </div>
        </section>
      </VueHtml2pdf>

    </div>
  </div>
</template>


<script>
import CustomInput from '../../../../components/CustomInput';
import SubmitDealDataMixin from '@/mixins/DealCalculator/SubmitDealData.mixin';
import RepositoryFactory from '../../../../repositories/RepositoryFactory';
import BaseModal from '../../../../components/BaseModal';
import CurrencyInput from "@/components/common/CurrencyInput";
import VueHtml2pdf from 'vue-html2pdf'
import ExportPDFMixin from "@/mixins/DealCalculator/ExportPDF.mixin"
import ExportXlsxMixin from '@/mixins/Deal/ExportXlsx.mixin';
import LogoImage from '@/assets/icons/sidebar/logo-sidebar.svg';
import Utils from "../../../../services/utils";

import Datepicker from 'vuejs-datepicker';
import Calculator from "@/modules/Deal/Calculator";
import CalculatorMixin from "@/mixins/DealCalculator/Calculator.mixin"
import {required} from "vuelidate/lib/validators";
import DealInfo from "./DealInfo";
import store from "@/store";
import { FUTURE, LIVE } from '@/enums/dealCalculator/DealTypes';

const DealRepository = RepositoryFactory.get('deal');

export default {
  name: 'LiveDealInformation',
  components: {
    CustomInput,
    Datepicker,
    BaseModal,
    CurrencyInput,
    DealInfo,
    VueHtml2pdf,
    LogoImage
  },
  mixins: [SubmitDealDataMixin, CalculatorMixin, ExportPDFMixin, ExportXlsxMixin],
  mounted() {
    this.calculateInterestCharged();
    this.mapPaymentEntries()
    this.calculateRates()
    this.completeXlsx();
  },
  data() {
    return {
      htmlToPdfOptions: {
        margin: [0,0,1,0],
        filename: 'deal-calculator.pdf',
        image: {
          type: 'jpeg',
          quality: 0.98
        },
        enableLinks: true,
        html2canvas: {
          scale: 1,
          useCORS: true
        },
        jsPDF: {
          unit: 'cm',
          format: 'a4',
          orientation: 'landscape'
        }
      },
    };
  },
  props: {
    instantCalc: {
      default: false
    }
  },
  watch: {
    total: {
      handler: function () {
        this.completeXlsx();
      },
    },
  },
  computed: {
    quoteType: () => {
      return store.getters['dealCalculator/getQuoteType'];
    },
    isExported() {
      return this.isFeatureDeal && this.quoteType === 'existing'
    }
  },
  validations() {
    return {
      paymentEntries: {
        $each: {
          paymentDate: {
            required,
          },
          grossAmount: {
            required,
          },
        },
      },
    };
  },
  methods: {
    completeXlsx() {
      this.xlsx_data = [];

      this.xlsx_data.push({
        col1:
            'Deal value:  ' +
            this.currency +
            ' ' +
            this.$options.filters.numFormat(this.info.netLoanAmount),
        col2: '',
        col3:
            'Amount paid upfront:  ' +
            this.currency +
            ' ' +
            this.$options.filters.numFormat(this.info.upfrontValue),
        col4: '',
        col5: 'Frequency:  ' + this.info.frequency,
        col6: '',
      });

      this.xlsx_data.push({
        col1:
            'Funding date: ' +
            this.$moment(this.info.fundingDate).format('DD/MM/YYYY'),
        col2: '',
        col3:
            'Indicative legal cost:  ' +
            this.currency +
            ' ' +
            this.$options.filters.numFormat(this.legalCost),
        col4: '',
        col5: 'Indicative interest rate: ' + this.interestRate + ' %',
        col6: '',
      });

      this.emptyRow();

      this.xlsx_data.push({
        col1: '',
        col2: 'Payment dates',
        col3: '',
        col4: '',
        col5: 'Payment amounts',
        col6: '',
      });

      this.paymentEntries.map((item, key) => {
        this.xlsx_data.push({
          col1: key + 1,
          col2: this.$moment(item.paymentDate).format('DD/MM/YYYY'),
          col3:'',
          col4:'',
          col5:
              this.currency +
              ' ' +
              this.$options.filters.numFormat(item.grossAmount),
          col6: '',
        });
      });

      this.emptyRow();

      this.xlsx_data.push({
        col1: 'Total',
        col2: '',
        col3: '',
        col4:'',
        col5:
            this.currency +
            ' ' +
            this.$options.filters.roundingUp(this.$options.filters.numFormat(this.info.netLoanAmount)),
        col6: '',
      });

      this.emptyRow();

      this.xlsx_data.push({
        col1: 'Underwriting fee',
        col2: '',
        col3: '',
        col4: '',
        col5: '',
        col6:
            this.currency +
            ' ' +
            this.$options.filters.roundingUp(this.underwritingFee),
      });

      this.xlsx_data.push({
        col1: 'Legal costs',
        col2: '',
        col3: '',
        col4: '',
        col5: '',
        col6:
            this.currency +
            ' ' +
            this.$options.filters.roundingUp(this.legalCost),
      });

      this.xlsx_data.push({
        col1: 'Insurance expense',
        col2: '',
        col3: '',
        col4: '',
        col5: '',
        col6:
            this.currency +
            ' ' +
            this.$options.filters.roundingUp(this.$options.filters.numFormat(this.insuranceAmount())),
      });

      this.emptyRow();

      this.xlsx_data.push({
        col1: 'Estimated Net Amount due',
        col2: '',
        col3: '',
        col4: '',
        col5: '',
        col6:
            this.currency +
            ' ' +
            this.$options.filters.roundingUp(this.$options.filters.numFormat(this.totalPresentAmount() - this.underwritingFee - this.legalCost)),
      });

      this.xlsx_data.push({
        col1: 'Net amount due to selling club',
        col2: '',
        col3: '',
        col4: '',
        col5: '',
        col6:
            this.currency +
            ' ' +
            this.$options.filters.roundingUp(this.$options.filters.numFormat(this.totalPresentAmount() - this.underwritingFee - this.legalCost + this.upfrontValue())),
      });
    },
    async mapPaymentEntries() {
      let $this = this;
      let autoPaymentAmount = this.autoPaymentAmount;
      let netLoanAmount = Utils.parseNum(this.info.netLoanAmount);

      for (let i = 1; i <= this.info.numberOfInstalments; i++) {
        let increment = this.incrementValue(i - 1);
        let paymentDate = new Date(
            $this
                .$moment(new Date($this.info.firstInstalment))
                .add(increment.increment, increment.frequency)
        );
        let interest = this.calculateInterestCharged(
            paymentDate,
            this.paymentAmount
        );

        let principalAmount = Math.round(Calculator.getLiveDealPrincipal(
            this.info.frequency,
            this.info.numberOfInstalments,
            netLoanAmount,
            i,
            this.interestRate
        ));

        this.paymentEntries.push({
          index: i,
          paymentDate: paymentDate,
          paymentAmount: -principalAmount,
          interestPeriod: this.getInterestPeriod(paymentDate),
          interestPeriodMonths: this.getInterestPeriodMonths(paymentDate),
          interestCharged: interest,
          grossAmount: autoPaymentAmount
        });
      }

      this.calculateInterestChargeTotal();
    },
    calculateTotalOfDealByDealType() {
      this.totalOfDeal = 0;
      this.totalOfDeal = parseFloat(this.grossTotal) + this.getFeesAmount(this.feesTotalAndInsurance) + parseFloat(this.legalCost);
    },
    calculateTotalOfDeal() {
      this.calculateTotalOfDealByDealType();
      this.calculateCosts();
    },
    removePaymentEntry(index) {
      this.paymentEntries.splice(index, 1);
      this.calculateTotal();
      this.calculateGrossTotal();
      this.calculateTotalOfDeal();
      this.calculateInterestChargeTotal();
    },
    totalPresentAmount() {
      if (this.info.contractFullyGuaranteed)
        return Utils.parseNum(this.info.contractValue);

      return Utils.parseNum(this.info.guaranteedContractAmount);
    },
    upfrontValue() {
      return Utils.parseNum(this.info.upfrontValue);
    }
  },
};
</script>

<style>
.pdf-content .deal-info {
  margin-top: 0 !important;
  font-size: 0.9em;
  letter-spacing: 0.1em;
  padding: 0.5rem;
}

.pdf-content .deal-info hr {
  margin: 0.5rem 0;
}
</style>

<style scoped>

.pdf-content .payment__table {
  font-size: 0.9em;
  letter-spacing: 0.1em;
  width: 100%;
}

.pdf-content .payment__table input {
  border: none;
  padding: 0px;
}

.pdf-content {
  margin-left: -160px;
  margin-right: 160px;
}

.pdf-header .line {
  display: block;
  width: 700px;
  height: 3px;
  float: right;
  background-color: #3a9eba;
  margin-top: 13px;
}

.pdf-header {
  width: 100%;
  padding: 30px 0;
}

.pdf-footer .head {
  font-weight: bold;
  font-size: 12px;
  color: black;
  letter-spacing: 0.1em;
}
.pdf-footer {
  text-align: center;
  font-size: 8px;
  color: black;
  margin-top: 100px;
  letter-spacing: 0.1em;
}

.transparent-input {
  background: transparent;
  border-color: transparent;
}

.datepicker-payment ::v-deep input {
  margin-top: 0 !important;
}
</style>
