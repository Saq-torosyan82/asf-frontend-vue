<template>
  <div>
    <BaseModal v-if="showSuccessMessage" modalType="save-deal"></BaseModal>
    <div class="payment__table__wrapper">
      <table class="payment__table">
        <thead>
          <td></td>
          <td>Payment dates</td>
          <td>Payment instalments</td>
          <td>Of which interest</td>
          <td>Of which principal</td>
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
                    :disabled="
                      !isCustomFrequency &&
                      paymentEntries[index].paymentDate !== ''
                    "
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
                    $v.paymentEntries.$each[index].paymentAmount.$error &&
                    $v.paymentEntries.$each[index].paymentAmount.$error
                  "
                  errorMsg="Field is required."
                >
                  <CurrencyInput
                    v-model="paymentEntries[index].paymentAmount"
                    @change="calculateRates()"
                    :currency="currency"
                    :disabled="
                      !isCustomFrequency &&
                      paymentEntries[index].paymentAmount > 0
                    "
                  ></CurrencyInput>
                </CustomInput>
              </div>
            </td>
            <td>
              {{ currency }} {{ item.interestCharged  | roundingUp | numFormat('0,0.[00]') }}
            </td>
            <td>
              {{ currency }}
              {{ paymentEntries[index].grossAmount  | roundingUp | numFormat('0,0.[00]') }}
              <input
                hidden
                type="text"
                class="transparent-input"
                disabled
                v-model="paymentEntries[index].grossAmount"
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
            {{ currency }}
            {{ total  | roundingUp | numFormat('0,0.[00]') }}
          </td>
          <td>
            <span>
              {{ currency }} {{ interestChargeTotal  | roundingUp | numFormat('0,0.[00]') }}
            </span>
          </td>
          <td>
            <span>
              {{ currency }}
              {{
                (parseFloat(this.info.netLoanAmount) + getTotalFees())
                    | roundingUp | numFormat('0,0.[00]')
              }}
            </span>
          </td>
          <td></td>
          <td></td>
        </tr>

        <tr class="capital-fee">
          <td colspan="3">Underwriting fee</td>

          <td></td>
          <td></td>
          <td>
            {{ currency }}
            {{ underwritingFee | roundingUp  | numFormat('0,0.[00]') }}
          </td>
        </tr>

        <tr>
          <td colspan="3">Legal Fee</td>
          <td></td>
          <td></td>
          <td>
            {{ currency }}
            {{ getFeesAmount(feesLegalAndPrincipal)  | roundingUp | numFormat('0,0.[00]') }}
          </td>
        </tr>

        <tr class="border-bottom forwarding-cost">
          <td colspan="3">Total fees</td>

          <td></td>
          <td></td>
          <td>{{ currency }} {{ getTotalFees()  | roundingUp | numFormat('0,0.[00]') }}</td>
        </tr>

        <tr class="amount-charged">
          <td colspan="3">Total amount payable</td>
          <td></td>
          <td></td>
          <td>{{ currency }} {{ total  | roundingUp | numFormat('0,0.[00]') }}</td>
        </tr>
        <tr class="amount-charged">
          <td colspan="3">Recommended transfer fee</td>
          <td></td>
          <td></td>
          <td>{{ currency }} {{ ( guaranteedContractAmount() + getTotalFees() + interestChargeTotal )  | roundingUp | numFormat('0,0.[00]') }}</td>
        </tr>
      </table>
    </div>
    <div class="calculator-footer">
      <a class="next-step save-later" @click="saveLater()">Save for later</a>
      <a class="next-step save-later" @click="exportPdf()">Export PDF</a>

      <a href="#" @click.prevent="exportExcel('Quote')"  class="link-text">
        Export xls
      </a>
      <!--  Export PDF template    -->

      <VueHtml2pdf
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
        ref="html2Pdf"
        :html-to-pdf-options="this.htmlToPdfOptions"
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
                <td>Payment instalments</td>
                <td>Of which interest</td>
                <td>Of which principal</td>
                <td></td>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in paymentEntries"
                  :key="index + '_payment'"
                >
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
                          :disabled="
                            !isCustomFrequency &&
                            paymentEntries[index].paymentDate !== ''
                          "
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
                          $v.paymentEntries.$each[index].paymentAmount.$error &&
                          $v.paymentEntries.$each[index].paymentAmount.$error
                        "
                        errorMsg="Field is required."
                      >
                        <CurrencyInput
                          v-model="paymentEntries[index].paymentAmount"
                          @change="calculateRates()"
                          :currency="currency"
                          :disabled="
                            !isCustomFrequency &&
                            paymentEntries[index].paymentAmount > 0
                          "
                        ></CurrencyInput>
                      </CustomInput>
                    </div>
                  </td>
                  <td>
                    {{ currency }}
                    {{ item.interestCharged  | roundingUp | numFormat('0,0.[00]') }}
                  </td>
                  <td>
                    {{ currency }}
                    {{
                      paymentEntries[index].grossAmount  | roundingUp | numFormat('0,0.[00]')
                    }}
                    <input
                      hidden
                      type="text"
                      class="transparent-input"
                      disabled
                      v-model="paymentEntries[index].grossAmount"
                    />
                  </td>
                  <td></td>
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
                  {{ currency }}
                  {{ total  | roundingUp | numFormat('0,0.[00]') }}
                </td>
                <td>
                  <span>
                    {{ currency }}
                    {{ interestChargeTotal  | roundingUp | numFormat('0,0.[00]') }}
                  </span>
                </td>
                <td>
                  <span>
                    {{ currency }}
                    {{ (this.info.netLoanAmount + getTotalFees())  | roundingUp | numFormat('0,0.[00]') }}
                  </span>
                </td>
                <td></td>
                <td></td>
              </tr>

              <tr class="capital-fee">
                <td colspan="3">Underwriting fee</td>

                <td></td>
                <td></td>
                <td>
                  {{ currency }}
                  {{
                    underwritingFee  | roundingUp | numFormat('0,0.[00]')
                  }}
                </td>
              </tr>

              <tr>
                <td colspan="3">Legal Fee</td>
                <td></td>
                <td></td>
                <td>
                  {{ currency }}
                  {{
                    getFeesAmount(feesLegalAndPrincipal)  | roundingUp | numFormat('0,0.[00]')
                  }}
                </td>
              </tr>

              <tr class="border-bottom forwarding-cost">
                <td colspan="3">Total fees</td>

                <td></td>
                <td></td>
                <td>
                  {{ currency }} {{ getTotalFees()  | roundingUp | numFormat('0,0.[00]') }}
                </td>
              </tr>

              <tr class="amount-charged">
                <td colspan="3">Total amount payable</td>
                <td></td>
                <td></td>
                <td>{{ currency }} {{ total  | roundingUp | numFormat('0,0.[00]') }}</td>
              </tr>
              <tr class="amount-charged">
                <td colspan="3">Recommended transfer fee</td>
                <td></td>
                <td></td>
                <td>{{ currency }} {{ ( guaranteedContractAmount() + getTotalFees() + interestChargeTotal )  | roundingUp | numFormat('0,0.[00]') }}</td>
              </tr>
            </table>
          </div>

          <div class="pdf-footer">
            <p class="head">PRIVATE & CONFIDENTIAL</p>
            <p>
              SportsFi Limited a company incorporated in England and Wales under
              number company no. 13839769 whose registered office is situated
              office at 20-22 Wenlock Road, London, N1 7GU
            </p>
          </div>
        </section>
      </VueHtml2pdf>
    </div>
  </div>
</template>

<script>
import store from "@/store"
import CustomInput from '../../../../components/CustomInput';
import SubmitDealDataMixin from '@/mixins/DealCalculator/SubmitDealData.mixin';
import RepositoryFactory from '@/repositories/RepositoryFactory';
import BaseModal from '../../../../components/BaseModal';
import Utils from "@/services/utils";
import Datepicker from 'vuejs-datepicker';
import { FUTURE, LIVE } from '../../../../enums/dealCalculator/DealTypes';
import Calculator from '@/modules/Deal/Calculator';
import CalculatorMixin from '@/mixins/DealCalculator/Calculator.mixin';
import ExportXlsxMixin from '@/mixins/Deal/ExportXlsx.mixin';
import CurrencyInput from '@/components/common/CurrencyInput';
import DealInfo from './DealInfo';

const DealRepository = RepositoryFactory.get('deal');
import VueHtml2pdf from 'vue-html2pdf';
import moment from 'moment';
import ExportPDFMixin from '@/mixins/DealCalculator/ExportPDF.mixin';
import LogoImage from '@/assets/icons/sidebar/logo-sidebar.svg';

export default {
  name: 'FutureDealInformation',
  components: {
    CustomInput,
    Datepicker,
    BaseModal,
    CurrencyInput,
    VueHtml2pdf,
    DealInfo,
    LogoImage,
  },
  mixins: [
    SubmitDealDataMixin,
    CalculatorMixin,
    ExportXlsxMixin,
    ExportPDFMixin,
  ],
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
  mounted() {
    this.calculateInterestCharged();
    this.mapPaymentEntries();
    this.calculateRates();
    this.completeXlsx();
  },
  watch: {
    total: {
      handler: function () {
        this.completeXlsx();
      },
    },
  },
  computed: {
    contractType: () => {
      return store.getters['dealCalculator/getContractType'];
    }
  },
  methods: {
    paymentDateChanged() {
      let $this = this;
      let totalPrincipalAmount = 0;
      let prevPaymentDate = this.info.fundingDate;
      let crtBalance = this.installmentValue;

      this.paymentEntries.map((item, key) => {
        let paymentDate = new Date($this.$moment(new Date(item.paymentDate)));
        let interest = this.calculateInterestCharged(
          paymentDate,
          item.paymentAmount
        );
      });

      this.completeXlsx();
    },
    guaranteedContractAmount() {
      if (this.info.contractFullyGuaranteed)
        return Utils.parseNum(this.info.contractValue);

      return Utils.parseNum(this.info.guaranteedContractAmount);
    },
    mapPaymentEntries() {
      let $this = this;

      let totalPrincipalAmount = 0;
      let totalPaymentAmount = 0;
      let prevPaymentDate = this.info.fundingDate;
      let crtBalance = this.installmentValue;
      let interest = 0;
      let netLoanAmount = Utils.parseNum(this.info.netLoanAmount);

      let interestRate = this.dealInterestRate();
      for (let i = 1; i <= this.info.numberOfInstalments; i++) {
        let increment = this.incrementValue(i - 1);
        let paymentDate = new Date(
          $this
            .$moment(new Date($this.info.firstInstalment))
            .add(increment.increment, increment.frequency)
        );

        let principalAmount = Math.round(
            Calculator.getFutureDealPrincipal(
                this.info.frequency,
                this.info.numberOfInstalments,
                netLoanAmount,
                i,
                interestRate
            )
        );

        totalPrincipalAmount += principalAmount;
        interest = Math.round(
            Calculator.getFutureDealInterest(
                interestRate,
                prevPaymentDate,
                paymentDate,
                crtBalance
            )
        );
        let paymentAmount = Math.round(parseFloat(principalAmount) + parseFloat(interest));
        this.paymentEntries.push({
          index: i,
          paymentDate: paymentDate,
          paymentAmount: paymentAmount,
          interestPeriod: this.getInterestPeriod(paymentDate),
          interestPeriodMonths: this.getInterestPeriodMonths(paymentDate),
          interestCharged: interest,
          grossAmount: principalAmount,
        });

        prevPaymentDate = paymentDate;
        crtBalance -= principalAmount;
        totalPaymentAmount += paymentAmount;
      } // for

      this.paymentEntries[this.paymentEntries.length - 1].grossAmount +=
        this.installmentValue - totalPrincipalAmount;
      this.calculateInterestChargeTotal();
    },
    checkIfTotal() {
      //this.totalPaymentsError = this.total > this.installmentValue;
    },
    calculateTotalOfDealByDealType() {
      this.totalOfDeal = 0;
      this.totalOfDeal = (
        parseFloat(this.grossTotal) +
        // (1.5 / 100) * parseFloat(this.info.contractValue) +
        parseFloat(this.legalCost) +
        parseFloat(this.insuranceExpense)
      ).toFixed(3);
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
      this.checkIfTotal();
      this.calculateTimetable();
      this.updateGrossAmount();
      this.calculateInterestChargeTotal();
    },
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

.pdf-content .payment__table input {
  border: none;
  padding: 0px;
}
</style>

<style scoped>

.pdf-content {
  margin-left: -160px;
  margin-right: 160px;
}

.pdf-content .payment__table {
  font-size: 0.9em;
  letter-spacing: 0.1em;
  width: 100%;
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
