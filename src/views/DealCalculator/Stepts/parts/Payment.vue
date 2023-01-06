<template>
  <div>
    <BaseModal v-if="showSuccessMessage" modalType="save-deal"></BaseModal>
    <div class="payment__table__wrapper">
      <table class="payment__table">
        <thead>
          <td></td>
          <td>Payment dates</td>
          <td>Payment amounts</td>
          <td>Interest Period</td>
          <td>Interest charged</td>
          <td>Gross amounts</td>
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
                    v-model="paymentEntries[index].paymentDate"
                    format="dd/MM/yyyy"
                    placeholder="dd/MM/yyyy"
                    @input="changePaymentData()"
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
                  <input
                    @change="changePaymentData()"
                    type="number"
                    min="0"
                    step="0.01"
                    v-model="paymentEntries[index].paymentAmount"
                  />
                </CustomInput>
              </div>
            </td>
            <td>{{ paymentEntries[index].interestPeriodMonths }}</td>
            <td>
              {{ currency }} {{ item.interestCharged | numFormat('0,0.[00]') }}
            </td>
            <td>
              {{ currency }}
              {{ paymentEntries[index].grossAmount | numFormat('0,0.[00]') }}
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
            {{ currency }} {{ total | numFormat('0,0.[00]') }}
          </td>
          <td></td>
          <td></td>
          <td>{{ currency }} {{ grossTotal | numFormat('0,0.[00]') }}</td>
          <td></td>
        </tr>
        <tr class="capital-fee">
          <td colspan="3">Capital arrangement fee</td>

          <td></td>
          <td></td>
          <td>
            {{ currency }}
            {{ ((1.5 / 100) * info.contractValue) | numFormat('0,0.[00]') }}
          </td>
        </tr>
        <tr>
          <td colspan="3">Legal costs</td>
          <td></td>
          <td></td>
          <td>
            {{ currency }} {{ legalCost.toFixed(3) | numFormat('0,0.[00]') }}
          </td>
        </tr>
        <tr>
          <td colspan="3">Insurance expense</td>

          <td></td>
          <td></td>
          <td>{{ currency }} {{ insuranceExpense | numFormat('0,0.[00]') }}</td>
        </tr>
        <tr class="border-bottom forwarding-cost">
          <td colspan="3">Costs</td>

          <td></td>
          <td></td>
          <td>{{ currency }} {{ costs | numFormat('0,0.[00]') }}</td>
        </tr>
        <tr class="amount-charged">
          <td colspan="3">Amount charged to conterparty</td>

          <td></td>
          <td></td>
          <td>{{ currency }} {{ totalOfDeal | numFormat('0,0.[00]') }}</td>
        </tr>
      </table>
    </div>
    <div class="calculator-footer">
      <a
        class="next-step"
        v-if="dealType !== featureDealType"
        @click="nextStep()"
        >Proceed with deal</a
      >
      <a class="next-step save-later" @click="saveLater()">Save for later</a>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import CustomInput from '../../../../components/CustomInput';
import hardcodedvalues from '../../../../enums/dealCalculator/hardcodedvalues';
import SubmitDealDataMixin from '@/mixins/DealCalculator/SubmitDealData.mixin';
import RepositoryFactory from '../../../../repositories/RepositoryFactory';
import { required } from 'vuelidate/lib/validators';
import BaseModal from '../../../../components/BaseModal';

import Datepicker from 'vuejs-datepicker';
import User from '../../../../modules/User/User';
import BorrowerTypes from '../../../../enums/modules/BorrowerType';
import { FUTURE } from '../../../../enums/dealCalculator/DealTypes';
import Calculator from "@/modules/Deal/Calculator";

const DealStepsRepository = RepositoryFactory.get('deal-steps-repository');
const DealRepository = RepositoryFactory.get('deal');

export default {
  name: 'Payment',
  components: {
    CustomInput,
    Datepicker,
    BaseModal,
  },
  mixins: [SubmitDealDataMixin],
  mounted() {
    this.calculateInterestCharged();
    this.mapPaymentEntries();
    this.calculateGrossTotal();
    this.calculateTotal();
    this.calculateTotalOfDeal();
  },
  data: function () {
    return {
      showSuccessMessage: false,
      totalPaymentsError: false,
      currentStep: 4,
      legalCost: hardcodedvalues.legalCost,
      insuranceExpense: hardcodedvalues.insuranceExpense,
      paymentEntries: [],
      interestRate: hardcodedvalues.interestRate,
      total: 0,
      grossTotal: 0,
      totalOfDeal: 0,
      costs: 0,
    };
  },
  validations() {
    return {
      paymentEntries: {
        $each: {
          paymentDate: {
            required,
          },
          paymentAmount: {
            required,
          },
        },
      },
    };
  },
  watch: {
    paymentEntries: {
      handler: function () {
        this.$v.paymentEntries.$touch();
      },
    },
  },
  computed: {
    info: () => {
      return store.getters['dealCalculator/getStep3Info'];
    },
    featureDealType: () => {
      return FUTURE;
    },
    dealType: () => {
      return store.getters['dealCalculator/getDealType'];
    },
    currency: () => {
      let currency = store.getters['dealCalculator/getStep3Info'].currency;
      switch (currency) {
        case 'USD':
          return '$';
        case 'GBP':
          return '£';
        default:
          return '€';
      }
    },
    installmentValue: () => {
      let info = store.getters['dealCalculator/getStep3Info'];
      return (
        parseFloat(info.netLoanAmount.replace(/,/g, '')) +
        parseFloat(info.upfrontValue.replace(/,/g, ''))
      );
    },
    nBDays: () => {
      let info = store.getters['dealCalculator/getStep3Info'];
      return parseInt(
        Math.floor(
          (Date.parse(info.fundingDate) - Date.parse(info.firstInstalment)) /
            86400000
        )
      );
    },
    paymentAmount: () => {
      let info = store.getters['dealCalculator/getStep3Info'];
      let netLoanAmount = parseFloat(info.netLoanAmount.replace(/,/g, ''));
      let upfrontValue = parseFloat(info.upfrontValue.replace(/,/g, ''));
      return (
        (netLoanAmount + upfrontValue) /
        info.numberOfInstalments
      ).toFixed(2);
    },
  },

  methods: {
    incrementValue(index) {
      switch (this.info.frequency) {
        case 'monthly':
          return {
            increment: index,
            frequency: 'months',
          };
        case 'quarterly':
          return {
            increment: index * 3,
            frequency: 'months',
          };

        case 'yearly':
          return {
            increment: index,
            frequency: 'years',
          };
        default:
          return '';
      }
    },
    changePaymentData() {
      let $this = this;
      this.updateGrossAmount().then(() => {
        $this.calculateGrossTotal().then(() => {
          $this.calculateTotal().then(() => {
            $this.calculateTotalOfDeal();
            $this.checkIfTotal();
          });
        });
      });

      this.calculateTimetable();
    },
    mapPaymentEntries() {
      let $this = this;
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

        this.paymentEntries.push({
          index: i,
          paymentDate: paymentDate,
          paymentAmount: $this.paymentAmount,
          interestPeriod: this.getInterestPeriod(paymentDate),
          interestPeriodMonths: this.getInterestPeriodMonths(paymentDate),
          interestCharged: interest,
          grossAmount: Math.round(
            parseFloat(this.paymentAmount) + parseFloat(interest)
          ),
        });
      }

      let paymentAmountTotal =
        parseFloat($this.paymentAmount) *
        parseInt(this.info.numberOfInstalments);
      let diff = this.installmentValue - paymentAmountTotal;
      this.paymentEntries[this.paymentEntries.length - 1].paymentAmount = (
        parseFloat($this.paymentAmount) + diff
      ).toFixed(2);
    },
    calculateTimetable() {
      let $this = this;
      this.paymentEntries.map((item) => {
        let interest = $this.calculateInterestCharged(
          item.paymentDate,
          item.paymentAmount
        );
        item.interestPeriod = $this.getInterestPeriod(item.paymentDate);
        item.interestCharged = interest;
        item.grossAmount = Math.round(
          parseFloat(item.paymentAmount) + interest
        );
      });
    },
    getInterestPeriod(paymentDate) {
      let diffTime = Math.abs(
        Date.parse(paymentDate) - Date.parse(this.info.fundingDate)
      );
      let diffDays = Math.ceil(diffTime / 86400000);
      return paymentDate !== ''
        ? Number.parseFloat(diffDays / 365, 2).toFixed(1)
        : 0;
    },
    getInterestPeriodMonths(paymentDate) {
      let diffTime = Math.abs(
        Date.parse(paymentDate) - Date.parse(this.info.fundingDate)
      );
      let diffDays = Math.ceil(diffTime / 86400000);
      return Math.ceil(diffDays / 30);
    },
    addPaymentEntry() {
      this.paymentEntries.push({
        index: this.paymentEntries.length,
        paymentDate: '',
        paymentAmount: 0,
        interestPeriod: 0,
        interestCharged: 0,
        grossAmount: 0,
      });
      this.$v.paymentEntries.$touch();
    },
    calculateTotal() {
      let $this = this;
      $this.total = 0;
      return new Promise(function (resolve, reject) {
        Calculator.getTotal($this.paymentEntries, 'paymentAmount').then((result) => {
          $this.total += result;
        });
        resolve(true);
      });
    },
    checkIfTotal() {
      this.totalPaymentsError = this.total > this.installmentValue;
    },
    calculateGrossTotal() {
      let $this = this;
      return new Promise(function (resolve, reject) {
        Calculator.getTotal($this.paymentEntries, 'grossAmount').then((result) => {
          $this.grossTotal += result;
        });
        resolve(true);
      });
    },
    calculateTotalOfDeal() {
      this.totalOfDeal = 0;
      this.totalOfDeal = (
        this.grossTotal +
        (1.5 / 100) * parseFloat(this.info.contractValue) +
        parseFloat(this.legalCost) +
        parseFloat(this.insuranceExpense)
      ).toFixed(3);
      this.calculateCosts();
    },
    calculateCosts() {
      this.costs = 0;
      this.costs = (
        (1.5 / 100) * parseFloat(this.info.contractValue) +
        parseFloat(this.legalCost) +
        parseFloat(this.insuranceExpense)
      ).toFixed(3);
    },
    removePaymentEntry(index) {
      this.paymentEntries.splice(index, 1);
      this.calculateTotal();
      this.calculateGrossTotal();
      this.calculateTotalOfDeal();
      this.checkIfTotal();
      this.calculateTimetable();
      this.updateGrossAmount();
    },
    calculateInterestCharged(paymentDate, installmentAmount) {
      if (typeof paymentDate == 'undefined' || paymentDate === '') return 0;

      let diffTime = Math.abs(
        Date.parse(paymentDate) - Date.parse(this.info.fundingDate)
      );
      let diffDays = Math.ceil(diffTime / 86400000);

      let interest =
        parseFloat(installmentAmount) /
          Math.pow(1 - parseFloat(this.interestRate) / 100, diffDays / 365) -
        1 -
        parseFloat(installmentAmount);
      return Math.round(interest);
    },
    updateGrossAmount() {
      let $this = this;
      return new Promise(function (resolve, reject) {
        $this.paymentEntries.map((item) => {
          item.grossAmount =
            parseFloat(item.paymentAmount) + parseFloat(item.interestCharged);
        });
        resolve(true);
      });
    },
    nextStep() {
      this.$v.paymentEntries.$touch();
      if (!this.$v.paymentEntries.$invalid) {
        store.dispatch('dealCalculator/addStep4Info', {
          legalCost: this.legalCost,
          insuranceExpense: this.insuranceExpense,
          paymentEntries: this.paymentEntries,
          interestRate: this.interestRate,
          total: this.total,
          grossTotal: this.grossTotal,
          totalOfDeal: this.totalOfDeal,
          costs: this.costs,
        });
        let $this = this;
        let dealCalculatorState = store.getters['dealCalculator/getState'];
        let data = this.prepareDealSubmitData();
        data['click_save'] = 0;

        if (dealCalculatorState.dealId === '') {
          DealRepository.dealcalculatorSave(data)
            .then((response) => {
              store.dispatch('dealCalculator/dealId', response.data.id);
              $this.$loading(false);
            })
            .catch((error) => {
              console.error(error);
              $this.$loading(false);
            });
        } else {
          data['id'] = dealCalculatorState.dealId;
          DealRepository.dealcalculatorUpdate(data)
            .then((response) => {
              $this.$loading(false);
            })
            .catch((error) => {
              console.error(error);
              $this.$loading(false);
            });
        }
        store.dispatch('dealCalculator/nextStep');
      }
    },
    saveLater() {
      this.$v.paymentEntries.$touch();
      if (!this.$v.paymentEntries.$invalid) {
        store.dispatch('dealCalculator/addStep4Info', {
          legalCost: this.legalCost,
          insuranceExpense: this.insuranceExpense,
          paymentEntries: this.paymentEntries,
          interestRate: this.interestRate,
          total: this.total,
          grossTotal: this.grossTotal,
          totalOfDeal: this.totalOfDeal,
          costs: this.costs,
        });

        let $this = this;
        let dealCalculatorState = store.getters['dealCalculator/getState'];
        let data = this.prepareDealSubmitData();
        data['click_save'] = 1;
        this.$loading(true);

        // add real user id
        if (User.isAgent() && data['user_type'] === BorrowerTypes.ATHLETE)
          data['user_id'] = data['athlete'].id;

        DealRepository.dealcalculatorSave(data)
          .then((response) => {
            setTimeout(() => {
              this.$loading(false);
              $this.showSuccessMessage = true;
              setTimeout(() => {
                store.dispatch('dealCalculator/resetDeal');
                $this.$router.push('/');
              }, 1000);
            }, 1000);
          })
          .catch((error) => {
            console.error(error);
            $this.$loading(false);
          });
      }
    },
  },
  filters: {
    twoDecimals(number) {
      return number.toFixed(2);
    },
  },
};
</script>

<style scoped>
.transparent-input {
  background: transparent;
  border-color: transparent;
}

.datepicker-payment ::v-deep input {
  margin-top: 0 !important;
}
</style>
