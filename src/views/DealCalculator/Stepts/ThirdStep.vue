<template>
  <div class="contact-info">
    <h3 class="sectionHeading">
      {{
        (() => {
          if (step1Data.club_type == 'buying')
            return 'What currency are you expecting to buy in?';
          if (step1Data.club_type == 'selling')
            return 'What currency are you expecting to sell in?';
          else return 'What currency is your contract in?';
        })()
      }}
    </h3>

    <div
      v-if="$v.form.currency.$error && $v.form.currency.$dirty"
      class="alert alert-danger"
      role="alert"
    >
      Currency is required
    </div>
    <div class="radio__input">
      <input
        type="radio"
        v-model="form.currency"
        name="currency"
        checked
        value="EUR"
        @change="touch('currency')"
        class="radio-input"
      />
      <label>€ EUR</label>
    </div>
    <div class="radio__input">
      <input
        type="radio"
        v-model="form.currency"
        name="currency"
        @change="touch('currency')"
        value="GBP"
        class="radio-input"
      />
      <label>£ GBP</label>
    </div>
    <div class="radio__input">
      <input
        type="radio"
        v-model="form.currency"
        name="currency"
        @change="touch('currency')"
        value="USD"
        class="radio-input"
      />
      <label>$ USD</label>
    </div>

    <h3 class="inputHeading">
      {{
        (() => {
          if (step1Data.club_type == 'buying')
            return 'What is the expected purchase / contract price?';
          if (step1Data.club_type == 'selling')
            return 'What is the expected sale / contract price?';
          else return 'What is your gross contract value?';
        })()
      }}
    </h3>
    <CustomInput
      :error="$v.form.contractValue.$error && $v.form.contractValue.$dirty"
      errorMsg="Field is required and should be greater than 0"
    >
      <input
        v-money="money"
        min="0"
        @keyup="calculateNetLoanAmount"
        @keydown="touch('contractValue')"
        v-model.lazy="form.contractValue"
        placeholder="0,000,000"
      />
    </CustomInput>

    <div>
      <h3 class="sectionHeading mt-48">
        Will the contract be fully guaranteed?
      </h3>
      <div
        v-if="
          $v.form.contractFullyGuaranteed.$error &&
          $v.form.contractFullyGuaranteed.$dirty
        "
        class="alert alert-danger"
        role="alert"
      >
        Field is required
      </div>
      <div class="">
        <div class="radio__input">
          <input
            v-model="form.contractFullyGuaranteed"
            type="radio"
            :value="true"
            class="radio-input"
            @click="touch('contractFullyGuaranteed')"
            @change="calculateNetLoanAmount"
          />
          <label>Yes</label>
        </div>
        <div class="radio__input">
          <input
            type="radio"
            v-model="form.contractFullyGuaranteed"
            :value="false"
            class="radio-input"
            @click="touch('contractFullyGuaranteed')"
            @change="calculateNetLoanAmount"
          />
          <label>No</label>
        </div>
      </div>
    </div>

    <div v-if="form.contractFullyGuaranteed === false">
      <h3 class="inputHeading">What is the guaranteed contract amount?</h3>
      <CustomInput
        :error="
          $v.form.guaranteedContractAmount.$error &&
          $v.form.guaranteedContractAmount.$dirty
        "
        errorMsg="Guaranteed contract amount should be greater than 0"
      >
        <input
          v-money="money"
          @keyup="calculateNetLoanAmount"
          @keydown="touch('guaranteedContractAmount')"
          min="0"
          v-model="form.guaranteedContractAmount"
          placeholder="0,000,000"
        />
      </CustomInput>

      <h3 class="inputHeading">
        What is the performance related contract value amount?
      </h3>
      <CustomInput>
        <input
          v-money="money"
          @keyup="calculateNetLoanAmount"
          v-model="form.performanceRelatedContractAmount"
          min="0"
          placeholder="0,000,000"
        />
      </CustomInput>
    </div>

    <div v-if="dealType !== futureDealType">
      <h3 class="sectionHeading mt-48">
        Have you borrowed against your contract already ?
      </h3>
      <div class="sectionBody">
        <div class="radio__input">
          <input
            type="radio"
            v-model="form.borrowed"
            :value="true"
            @change="calculateNetLoanAmount"
            class="radio-input"
          />
          <label>Yes</label>
        </div>
        <div class="radio__input">
          <input
            type="radio"
            v-model="form.borrowed"
            :value="false"
            @change="calculateNetLoanAmount"
            class="radio-input"
          />
          <label>No</label>
        </div>
      </div>
    </div>

    <div v-if="form.borrowed === true && dealType !== futureDealType">
      <h3 class="inputHeading">How much have you borrowed ?</h3>
      <CustomInput
        :error="$v.form.borrowedAmount.$error && $v.form.borrowedAmount.$dirty"
        errorMsg="Amount you borrowed should be greater than 0"
      >
        <input
          v-money="money"
          @keyup="calculateNetLoanAmount"
          @keydown="touch('borrowedAmount')"
          min="0"
          v-model="form.borrowedAmount"
          placeholder="0,000,000"
        />
      </CustomInput>
    </div>

    <h3 class="inputHeading">How much will be paid upfront? (optional)</h3>
    <CustomInput
      :error="$v.form.upfrontValue.$error && $v.form.upfrontValue.$dirty"
      errorMsg="Field is required and cannot be a negative"
    >
      <input
        v-money="money"
        @keyup="calculateNetLoanAmount"
        v-model="form.upfrontValue"
        placeholder="0,000,000"
        @keydown="touch('upfrontValue')"
      />
    </CustomInput>

    <h3 class="inputHeading">
      {{
        (() => {
          if (step1Data.club_type == 'buying')
            return 'Net Purchase price to be financed';
          if (step1Data.club_type == 'selling')
            return 'Net Amount to be financed';
          else return 'Net amount due';
        })()
      }}
    </h3>
    <CustomInput
      :error="$v.form.netLoanAmount.$error && $v.form.netLoanAmount.$dirty"
      errorMsg="Net loan amount should be greater than 0"
    >
      <input
        v-money="money"
        disabled
        readonly
        v-model="form.netLoanAmount"
        placeholder="0,000,000"
      />
    </CustomInput>

    <h3 class="inputHeading">What is the date of the first payment due?</h3>
    <CustomInput
      :error="$v.form.firstInstalment.$error && $v.form.firstInstalment.$dirty"
      errorMsg="Field is required."
    >
      <datepicker
        v-model="form.firstInstalment"
        :disabled-dates="firstInstalmentDateConfig"
        format="dd/MM/yyyy"
        placeholder="dd/MM/yyyy"
        @change="touch('firstInstalment')"
      ></datepicker>
    </CustomInput>
    <h3 class="sectionHeading">What are the frequency of your instalments?</h3>
    <div
      v-if="$v.form.frequency.$error && $v.form.frequency.$dirty"
      class="alert alert-danger"
      role="alert"
    >
      Instalments frequency is required
    </div>
    <div class="">
      <div class="radio__input">
        <input
          type="radio"
          v-model="form.frequency"
          name="frequency"
          value="monthly"
          class="radio-input"
        />
        <label>Monthly</label>
      </div>
      <div class="radio__input">
        <input
          type="radio"
          v-model="form.frequency"
          name="frequency"
          value="quarterly"
          class="radio-input"
        />
        <label>Quarterly</label>
      </div>
      <div class="radio__input">
        <input
          type="radio"
          v-model="form.frequency"
          name="frequency"
          value="semianual"
          class="radio-input"
        />
        <label>Semiannual</label>
      </div>
      <div class="radio__input">
        <input
          type="radio"
          v-model="form.frequency"
          name="frequency"
          value="yearly"
          class="radio-input"
        />
        <label>Yearly</label>
      </div>
      <div class="radio__input">
        <input
          type="radio"
          v-model="form.frequency"
          name="frequency"
          value="custom"
          class="radio-input"
        />
        <label>Custom</label>
      </div>
    </div>
    <h3 class="inputHeading">Number of instalments</h3>
    <CustomInput
      :error="
        $v.form.numberOfInstalments.$error && $v.form.numberOfInstalments.$dirty
      "
      :errorMsg="
        form.numberOfInstalments < 1
          ? 'Instalments frequency is required'
          : 'Maximum amount for a deal is 5 years'
      "
    >
      <input
        type="number"
        v-model="form.numberOfInstalments"
        @change="touch('numberOfInstalments')"
        placeholder="0"
      />
    </CustomInput>

    <div v-if="dealType !== futureDealType">
      <h3 class="inputHeading">Contract start date</h3>
      <CustomInput
        :error="$v.form.contractDate.$error && $v.form.contractDate.$dirty"
        errorMsg="Field is required."
      >
        <datepicker
          v-model="form.contractDate"
          format="dd/MM/yyyy"
          placeholder="dd/MM/yyyy"
          @focusin="showSchedule = false"
          @focusout="showPayments"
        ></datepicker>
      </CustomInput>
    </div>

    <h3 class="inputHeading">
      Date in which you require to receive funds from funder
    </h3>
    <CustomInput
      :error="$v.form.fundingDate.$error && $v.form.fundingDate.$dirty"
      errorMsg="Field is required."
    >
      <datepicker
        v-model="form.fundingDate"
        :disabled-dates="fundingDateConfig"
        format="dd/MM/yyyy"
        placeholder="dd/MM/yyyy"
        @focusout="showPayments"
      ></datepicker>
    </CustomInput>

    <br />
    <div v-if="isLiveDealType && !$v.form.$invalid && showSchedule">
      <LiveDealInformation :instant-calc="true"></LiveDealInformation>
    </div>

    <div class="calculator-footer" v-if="!isLiveDealType">
      <a class="next-step" @click="nextStep()">Calculate payment schedule</a>
    </div>
  </div>
</template>

<script>
import store from '@/store';

import CustomInput from '@/components/CustomInput.vue';
import Datepicker from 'vuejs-datepicker';
import LiveDealInformation from './parts/LiveDealInformation';
import { required, maxValue, requiredIf } from 'vuelidate/lib/validators';
import { FUTURE, LIVE } from '@/enums/dealCalculator/DealTypes';
import Frequency from '../../../enums/deal/frequency';
import RepositoryFactory from '@/repositories/RepositoryFactory';
const DealStepsRepository = RepositoryFactory.get('deal-steps-repository');
import Utils from '../../../services/utils';

let date = new Date();
date.setDate(date.getDate() + 7);
const greaterThanZero = (value) => {
  let num = value.toString();
  return parseFloat(num) > 0;
};
const greaterOrEqualZero = (value) => {
  let num = value.toString();
  return parseFloat(num) >= 0;
};

import {
  PLAYER_TRANSFER,
  ENDORSEMENT,
  AGENT_FEES,
  PLAYER_ADVANCE,
  MEDIA_RIGHTS,
} from '@/enums/dealCalculator/ContractTypes';

import RateEntity from '@/enums/modules/InterestRateEntity';

export default {
  name: 'ThirdStep',
  components: {
    CustomInput,
    Datepicker,
    LiveDealInformation,
  },
  mounted() {
    this.form = store.getters['dealCalculator/getStep3Info'];
    this.step1Data = store.getters['dealCalculator/getFirstStepInfo'];
    this.step2Data = store.getters['dealCalculator/getStep2Info'];
    this.getInterestRates();
  },
  data: function () {
    return {
      showSchedule: false,
      firstInstalmentDateConfig: {
        to: date,
        format: 'dd/M/yyyy',
      },
      fundingDateConfig: {
        to: date,
        format: 'dd/M/yyyy',
      },
      form: {
        currency: 'EUR',
        contractValue: '',
        upfrontValue: '',
        firstInstalment: '',
        frequency: '',
        numberOfInstalments: 0,
        fundingDate: '',
        netLoanAmount: '',
        guaranteedContractAmount: '',
        performanceRelatedContractAmount: '',
        borrowedAmount: '',
        contractFullyGuaranteed: '',
        borrowed: '',
      },
      money: {
        decimal: '.',
        thousands: ',',
        prefix: '',
        suffix: '',
        precision: 0,
        masked: false /* doesn't work with directive */,
      },
      step1Data: {},
      step2Data: {},
    };
  },
  watch: {
    form: {
      deep: true,
      handler() {
        this.showSchedule = false;
        this.addStep3Info().then(() => {
          this.showSchedule = true;
        });
      },
    },
  },
  computed: {
    dealType() {
      return store.getters['dealCalculator/getDealType'];
    },
    contractType() {
      return store.getters['dealCalculator/getContractType'];
    },
    futureDealType() {
      return FUTURE;
    },
    isLiveDealType() {
      return this.dealType === LIVE;
    },
    isDealFullyGuaranteed() {
      return (
        this.contractType === PLAYER_TRANSFER ||
        this.contractType === ENDORSEMENT ||
        this.contractType === AGENT_FEES ||
        this.contractType === PLAYER_ADVANCE
      );
    },
  },
  validations() {
    return {
      form: {
        currency: { required },
        contractValue: { maxValue: greaterThanZero },
        upfrontValue: { maxValue: greaterOrEqualZero },
        firstInstalment: { required },
        frequency: { required },
        numberOfInstalments: {
          maxValue: () => {
            switch (this.form.frequency) {
              case Frequency.MONTHLY:
                return (
                  this.form.numberOfInstalments <= 60 &&
                  this.form.numberOfInstalments > 0
                );
              case Frequency.QUARTERLY:
                return (
                  this.form.numberOfInstalments <= 24 &&
                  this.form.numberOfInstalments > 0
                );
              case Frequency.SEMIANUAL:
                return (
                  this.form.numberOfInstalments <= 10 &&
                  this.form.numberOfInstalments > 0
                );
              case Frequency.YEARLY:
                return (
                  this.form.numberOfInstalments <= 5 &&
                  this.form.numberOfInstalments > 0
                );
              default:
                return this.form.numberOfInstalments > 0;
            }
          },
        },
        netLoanAmount: { maxValue: greaterThanZero },
        fundingDate: { required },
        contractDate: {
          required: requiredIf(function () {
            return this.dealType !== this.futureDealType;
          }),
        },
        contractFullyGuaranteed: {
          required: requiredIf(function () {
            return this.contractType !== MEDIA_RIGHTS;
          }),
        },
        guaranteedContractAmount: {
          required: requiredIf(function () {
            return !this.form.contractFullyGuaranteed;
          }),
          maxValue: (value) => {
            if (this.form.contractFullyGuaranteed === false) {
              let num = value.toString();
              return parseFloat(num) > 0;
            }
            return true;
          },
        },
        borrowedAmount: {
          required: requiredIf(function () {
            return this.form.borrowed;
          }),
          maxValue: (value) => {
            if (this.form.borrowed) {
              let num = value.toString();
              return parseFloat(num) > 0;
            }
            return true;
          },
        },
      },
    };
  },
  methods: {
    touch(element) {
      this.$v.form[element].$touch();
    },
    showPayments() {
      this.$v.form.$touch();
      this.showSchedule = true;
    },
    submitInfo() {
      this.$v.form.$touch();
      this.calculateNetLoanAmount().then(() => {
        this.addStep3Info().then(() => {
          this.showSchedule = true;
        });
      });
    },
    rerenderScheduleComponent() {
      this.showSchedule = !this.showSchedule;
    },
    async addStep3Info() {
      await store.dispatch('dealCalculator/addStep3Info', this.form);
    },
    nextStep() {
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        this.calculateNetLoanAmount();
        store.dispatch('dealCalculator/addStep3Info', this.form);
        store.dispatch('dealCalculator/nextStep');
      }
    },
    syncContractValues() {
      this.form.performanceRelatedContractAmount = 0;

      let contractValue = Utils.parseNum(this.form.contractValue);
      let guaranteedContractAmount = Utils.parseNum(
        this.form.guaranteedContractAmount
      );
      if (guaranteedContractAmount > 0) {
        this.form.performanceRelatedContractAmount =
          contractValue - guaranteedContractAmount;
      }
    },
    async calculateNetLoanAmount() {
      let borrowedAmount = 0;
      if (
        this.form.borrowed === true &&
        this.dealType !== this.futureDealType
      ) {
        borrowedAmount = Utils.parseNum(this.form.borrowedAmount);
      }

      if (this.form.contractFullyGuaranteed) {
        this.form.netLoanAmount =
          Utils.parseNum(this.form.contractValue) - borrowedAmount -
          Utils.parseNum(this.form.upfrontValue);
      } else {
        this.syncContractValues();
        this.form.netLoanAmount =
          Utils.parseNum(this.form.guaranteedContractAmount) - borrowedAmount -
          Utils.parseNum(this.form.upfrontValue);
      }
    },
    async getInterestRates() {
      let entity_id = null;
      let entity_type = '';

      if (this.step2Data.tvHolder !== null) {
        entity_id =
          typeof this.step2Data.tvHolder === 'object'
            ? this.step2Data.tvHolder.id
            : this.step2Data.tvHolder;
        entity_type = RateEntity.MEDIA;
      } else if (this.step2Data.club !== null) {
        entity_id =
          typeof this.step2Data.club === 'object'
            ? this.step2Data.club.id
            : this.step2Data.club;
        entity_type = RateEntity.CLUB;
      } else if (this.step2Data.sponsorOrBrand !== null) {
        if (this.step2Data.sponsorsOrBrandsIdentifier === 'sponsors') {
          entity_type = RateEntity.SPONSOR;
        } else {
          entity_type = RateEntity.BRAND;
        }
        entity_id =
          typeof this.step2Data.sponsorOrBrand == 'object'
            ? this.step2Data.sponsorOrBrand.id
            : this.step2Data.sponsorOrBrand;
      }

      // SEEMEk: handle if no data !!

      DealStepsRepository.getInterestRates(entity_type, entity_id)
        .then((response) => {
          store.dispatch('dealCalculator/setInterestRates', response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped></style>
