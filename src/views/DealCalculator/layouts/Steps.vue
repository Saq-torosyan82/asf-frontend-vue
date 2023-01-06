<template>
  <div class="steps">
    <div
      v-for="(stepObject, index) in steps"
      :key="index"
      class="step"
      :class="[
        currentStep > stepObject.step ? 'complete' : '',
        currentStep == stepObject.step ? 'current' : '',
      ]"
    >
      <p class="step-number">{{ stepObject.step }}<icon name="completed" /></p>
      <p class="step-name" @click="changeStep(stepObject.step)">
        {{ stepObject.label }}
      </p>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import {
  PLAYER_ADVANCE,
  PLAYER_TRANSFER,
} from '../../../enums/dealCalculator/ContractTypes';
import RepositoryFactory from '@/repositories/RepositoryFactory';
import User from '@/modules/User/User';
import { LIVE } from '@/enums/dealCalculator/DealTypes';
const SystemRepository = RepositoryFactory.get('system');
export default {
  name: 'Steps',
  data: function () {
    return {
      leagueSelected: false,
      steps: [
        {
          step: 1,
          label: 'Deal information',
        },
        {
          step: 2,
          label: 'Second party',
        },
        {
          step: 3,
          label: 'Contract information',
        },
      ],
      steps2: [
        {
          step: 1,
          label: 'Deal information',
        },
        {
          step: 3,
          label: 'Contract information',
        },
        {
          step: 4,
          label: 'Payment schedule',
        },
      ],
    };
  },
  mounted() {
    this.addAdditionalSteps(this.currentStep);
    this.getCompanyName();
    this.addRemovePaymentSchedule();
  },
  computed: {
    currentStep() {
      return store.getters['dealCalculator/getStep'];
    },
    contractType() {
      return store.getters['dealCalculator/getContractType'];
    },
    userType() {
      return store.getters['dealCalculator/getUserType'];
    },
    club: () => {
      return store.getters['dealCalculator/getClub'];
    },
    tvHolder: () => {
      return store.getters['dealCalculator/getTvHolder'];
    },
    sponsorOrBrand: () => {
      return store.getters['dealCalculator/getSponsorOrBrand'];
    },
    isAgent() {
      return User.isAgent();
    },
    playerAdvance: () => {
      return PLAYER_ADVANCE;
    },
    isCorporate() {
      return User.isCorporate();
    },
    dealType() {
      return store.getters['dealCalculator/getDealType'];
    },
    isLiveDealType() {
      return this.dealType === LIVE;
    },
  },
  watch: {
    currentStep(step) {
      this.addAdditionalSteps(step);
      this.addRemovePaymentSchedule();
    },
    club() {
      this.getCompanyName();
    },
    tvHolder() {
      this.getCompanyName();
    },
    sponsorOrBrand() {
      this.getCompanyName();
    },
  },
  methods: {
    addRemovePaymentSchedule() {
      if (!this.isLiveDealType && typeof this.steps[3] === 'undefined') {
        this.steps.push({
          step: 4,
          label: 'Payment schedule',
        });
      }
    },
    getCompanyName() {
      if (this.club !== null) {
        if (this.jumpToStep2()) {
          let $this = this;
          $this.$loading(true);
          if (this.isObject(this.club)) {
            this.steps[1].label = this.club.name;
            $this.$loading(false);
          } else {
            SystemRepository.getClubById(this.club)
              .then((response) => {
                store.dispatch('dealCalculator/addClub', response.data.data[0]);
                SystemRepository.getLeagueById($this.club.league_id).then(
                  (response) => {
                    store.dispatch(
                      'dealCalculator/addleague',
                      response.data.data[0]
                    );
                    $this.$loading(false);
                  }
                );
              })
              .catch((error) => {
                this.steps[1].label = 'Second party';
                $this.$loading(false);
              });
          }
        }
        this.steps[1].label = this.club.name;
      } else if (this.tvHolder !== null) {
        this.steps[1].label = this.tvHolder.name;
      } else if (this.sponsorOrBrand !== null) {
        this.steps[1].label = this.sponsorOrBrand.name;
      }
    },
    isObject(val) {
      return typeof val === 'object';
    },
    jumpToStep2() {
      return (
        this.contractType === PLAYER_ADVANCE ||
        (this.contractType === PLAYER_TRANSFER && this.isCorporate) ||
        (this.isAgent &&
          this.form &&
          this.form.user_type === 'athlete' &&
          this.form.contract_type === PLAYER_ADVANCE &&
          typeof this.club !== 'object')
      );
    },
    changeStep(step) {
      if (step < this.currentStep) {
        store.dispatch('dealCalculator/jumpToStep', step);
        this.getCompanyName();
      }
    },
    addAdditionalSteps(step) {
      if (step > 4 && (this.steps.length === 4 || this.steps.length === 3)) {
        this.steps.push({
          step: 5,
          label: 'Document upload',
        });

        this.steps.push({
          step: 6,
          label: 'Confirmations',
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
