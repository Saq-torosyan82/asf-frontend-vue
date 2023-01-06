<template>
  <div class="calculator">
    <h3 v-if="!hideDealType" class="sectionHeading">Choose the deal type</h3>
    <div v-if="!hideDealType" class="radio__wrapper">
      <div
        v-if="$v.form.deal_type.$error && $v.form.deal_type.$dirty"
        class="alert alert-danger"
        role="alert"
      >
        Deal type is required
      </div>

      <div v-for="(type, index) in dealTypes" :key="index" class="radio__input">
        <input
          type="radio"
          v-model="form.deal_type"
          name="deal_type"
          :value="type.value"
          @change="setClubType"
          class="radio-input"
        /><label>{{ type.label }}</label>
      </div>
    </div>

    <div v-if="form.deal_type === futureDealType">
      <div
        v-if="$v.form.quoteType.$error && $v.form.quoteType.$dirty"
        class="alert alert-danger"
        role="alert"
      >
        Deal type is required
      </div>

      <h3 class="sectionHeading" :class="!hideDealType ? 'mt-48' : ''">
        Choose the quote type
      </h3>
      <div class="radio__wrapper">
        <div class="radio__input">
          <input
            type="radio"
            v-model="form.quoteType"
            name="quote_type"
            :value="'existing'"
            class="radio-input"
          /><label>Existing (Live)</label>
        </div>
        <div class="radio__input">
          <input
            type="radio"
            v-model="form.quoteType"
            name="quote_type"
            :value="'future'"
            class="radio-input"
          /><label>Future deal</label>
        </div>
      </div>
    </div>

    <!--=========================================================-->
    <div v-if="userType === 'agent'" class="wrapper">
      <h3
        class="sectionHeading"
        :class="form.deal_type === futureDealType ? 'mt-48' : ''"
      >
        Choose user type
      </h3>
      <div class="radio__wrapper">
        <div
          v-if="$v.form.user_type.$error && $v.form.user_type.$dirty"
          class="alert alert-danger"
          role="alert"
        >
          User type is required
        </div>

        <div class="radio__input">
          <input
            type="radio"
            v-model="form.user_type"
            name="user_type"
            :value="'agent'"
            class="radio-input"
            @change="checkUserType"
          /><label>Agent</label>
        </div>
        <div class="radio__input">
          <input
            type="radio"
            v-model="form.user_type"
            name="user_type"
            :value="'athlete'"
            class="radio-input"
            @change="checkUserType"
          /><label>Profesional Athlete</label>
        </div>
      </div>

      <h3 v-if="chooseAthlete" class="sectionHeading">Choose Athlete</h3>
      <div v-if="chooseAthlete" class="athleteSelectWrapper">
        <div
          v-if="$v.form.athlete.$error && $v.form.athlete.$dirty"
          class="alert alert-danger"
          role="alert"
        >
          Choose type is required
        </div>
        <CustomInput>
          <multiselect
            v-model="form.athlete"
            label="name"
            track-by="name"
            placeholder="Athlete"
            :multiple="false"
            @input="getAthleteProfile"
            :options="athletes"
          ></multiselect>
        </CustomInput>
      </div>
    </div>
    <!--=========================================================-->

    <h3
      class="sectionHeading"
      :class="
        !hideDealType ||
        form.deal_type === futureDealType ||
        userType === 'agent'
          ? 'mt-48'
          : ''
      "
    >
      Choose contract type
    </h3>

    <div
      v-if="$v.form.contract_type.$error && $v.form.contract_type.$dirty"
      class="alert alert-danger"
      role="alert"
    >
      Contract type is required
    </div>

    <div class="radio__wrapper">
      <div
        v-for="(type, index) in contractTypes"
        :key="index"
        class="radio__input"
      >
        <input
          type="radio"
          name="contract_type"
          @change="selectClubType"
          v-model="form.contract_type"
          :value="type.value"
          class="radio-input"
        />
        <label>{{ type.label }}</label>
      </div>
    </div>
    <div class="wrapper">
      <h3 v-if="chooseClubType" class="sectionHeading mt-48">
        Choose team type
      </h3>

      <div
        v-if="$v.form.club_type.$error && $v.form.club_type.$dirty"
        class="alert alert-danger"
        role="alert"
      >
        Team type is required
      </div>

      <div v-if="chooseClubType" class="radio__wrapper">
        <div class="radio__input">
          <input
            type="radio"
            name="club_type"
            v-model="form.club_type"
            :value="'buying'"
            class="radio-input"
          />
          <label>{{
            isCorporate ? 'You are the buying team' : 'Buying'
          }}</label>
        </div>
        <div class="radio__input">
          <input
            type="radio"
            name="club_type"
            v-model="form.club_type"
            :value="'selling'"
            class="radio-input"
          />
          <label>
            {{ isCorporate ? 'You are the selling team' : 'Selling' }}
          </label>
        </div>
      </div>

      <div
        v-if="form.contract_type === mediaRightsType"
        class="sport-input-wrapper"
      >
        <div
          v-if="$v.form.sport.$error && $v.form.sport.$dirty"
          class="alert alert-danger"
          role="alert"
        >
          Sport is required
        </div>
        <h3 class="sectionHeading">Sport</h3>
        <SelectInput>
          <select v-model="form.sport">
            <option
              v-for="(sport, index) in sports"
              :key="index"
              :value="sport"
            >
              {{ sport.name }}
            </option>
          </select>
        </SelectInput>
      </div>
    </div>

    <div class="calculator-footer">
      <a class="next-step" @click.prevent="nextStep">Choose the second party</a>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import { required, requiredIf } from 'vuelidate/lib/validators';
import DealTypes from '../../../enums/dealCalculator/DealTypes';
import ContractTypes from '../../../enums/dealCalculator/ContractTypes';
import StepsNavigationMixin from '@/mixins/DealCalculator/StepsNavigation.mixin';
import { FUTURE } from '@/enums/dealCalculator/DealTypes';
import { MEDIA_RIGHTS } from '../../../enums/dealCalculator/ContractTypes';
import Multiselect from 'vue-multiselect';
import CustomInput from '@/components/CustomInput.vue';
import SelectInput from '../../../components/SelectInput';
import { BUYING, SELLING } from '../../../enums/dealCalculator/Common';
import {
  PLAYER_ADVANCE,
  PLAYER_TRANSFER,
  AGENT_FEES,
} from '../../../enums/dealCalculator/ContractTypes';
import { LIVE } from '../../../enums/dealCalculator/DealTypes';
import UserService from '@/services/user.service.js';

import RepositoryFactory from '../../../repositories/RepositoryFactory';
import BorrowerType from '../../../enums/modules/BorrowerType';
import User from '../../../modules/User/User';
import { EventBus } from '../../../main';
const UserRepository = RepositoryFactory.get('user');
const SystemRepository = RepositoryFactory.get('system');

export default {
  components: {
    Multiselect,
    CustomInput,
    SelectInput,
  },
  name: 'FirstStep',
  mixins: [StepsNavigationMixin],

  mounted() {
    this.getSports();
    this.form = store.getters['dealCalculator/getFirstStepInfo'];
    this.getUserProfile();
    this.hideDealType = store.getters['dealCalculator/getHideDealType'];
    store.dispatch('dealCalculator/hideDealType', false);

    store.dispatch('editUser/setHash', '');

    if (this.form.athlete !== '') {
      this.chooseAthlete = true;
    }

    if (User.isAgent()) {
      if (!this.form.user_type) {
        this.form.user_type = BorrowerType.AGENT;
        this.form.contract_type = AGENT_FEES;
        this.form.athlete = '';
        this.form.club_type = '';
        this.contractTypes = [];
        this.contractTypes.push(ContractTypes[this.userType][2]);
      } else {
        this.contractTypes = [];
        if (this.form.user_type === BorrowerType.ATHLETE) {
          this.contractTypes.push(ContractTypes[this.userType][0]);
          this.contractTypes.push(ContractTypes[this.userType][1]);
          if (this.form.contract_type === PLAYER_ADVANCE) {
            this.chooseClubType = true;
          } else {
            this.chooseClubType = false;
          }
        } else {
          this.contractTypes.push(ContractTypes[this.userType][2]);
        }
      }

      this.getAthletes();
    } else {
      this.getContractTypes();
    }
  },
  data() {
    return {
      hideDealType: false,
      chooseAthlete: false,
      chooseClubType: false,
      athletes: [],
      contractTypes: [],
      form: {
        deal_type: '',
        contract_type: '',
        user_type: '',
        athlete: null,
        club_type: '',
        sport: '',
        quoteType: '',
      },
      professional: null,
      dealTypes: DealTypes.types,
      sports: [],
    };
  },
  watch: {
    contractType(newValue) {
      if (
        this.isBorrower &&
        !this.isCorporate &&
        newValue === PLAYER_TRANSFER &&
        this.form.deal_type === LIVE
      ) {
        this.chooseClubType = true;
        this.form.club_type = SELLING;
      } else if (
        this.form.user_type === BorrowerType.ATHLETE &&
        newValue === PLAYER_ADVANCE
      ) {
        this.chooseClubType = true;
        this.form.club_type = '';
      } else if (this.isCorporate && newValue === PLAYER_ADVANCE) {
        this.chooseClubType = true;
        this.form.club_type = '';
      } else {
        this.form.club_type = '';
        this.chooseClubType = this.isBorrower && newValue === PLAYER_TRANSFER;
      }
    },
  },
  computed: {
    isBorrower() {
      return UserService.isBorrower();
    },
    futureDealType() {
      return FUTURE;
    },
    mediaRightsType() {
      return MEDIA_RIGHTS;
    },
    isCorporate() {
      return User.isCorporate();
    },
    isAgent() {
      return User.isAgent();
    },
    userType() {
      var $userInfo = this.$localStorage.get('userInfo');
      if ($userInfo === null) {
        // SEEMEk: this is an error
        return '';
      }

      return $userInfo['borrower_type'];
    },
    contractType() {
      return this.form.contract_type;
    },
  },
  validations() {
    return {
      form: {
        deal_type: { required },
        contract_type: { required },
        user_type: {
          required: requiredIf(function () {
            return (
              this.$localStorage.get('userInfo')['borrower_type'] ===
              BorrowerType.AGENT
            );
          }),
        },
        quoteType: {
          required: requiredIf(function (form) {
            return form.contract_type === this.futureDealType;
          }),
        },
        sport: {
          required: requiredIf(function (form) {
            return form.contract_type === this.mediaRightsType;
          }),
        },
        athlete: {
          required: requiredIf(function (form) {
            return form.user_type === BorrowerType.ATHLETE;
          }),
        },
        club_type: {
          required: requiredIf(function (form) {
            return (
              this.chooseClubType && form.deal_type === this.futureDealType
            );
          }),
        },
      },
    };
  },
  methods: {
    getSports() {
      SystemRepository.getSports()
        .then((response) => {
          this.sports = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getAthletes() {
      if (!User.isAgent()) return false;

      let $this = this;
      UserRepository.getUserAthletes()
        .then((response) => {
          $this.athletes = response.data.data;
        })
        .catch((error) => {
          console.error(error);
          $this.athletes = [];
        });
    },
    setClubType() {
      if (
        this.isBorrower &&
        !this.isCorporate &&
        this.form.contract_type === PLAYER_TRANSFER &&
        this.form.deal_type === LIVE
      ) {
        this.chooseClubType = false;
        this.form.club_type = SELLING;
      } else if (
        this.form.contract_type === PLAYER_TRANSFER &&
        this.form.deal_type !== LIVE
      ) {
        this.chooseClubType = true;
        this.form.club_type = '';
      } else if (
        this.form.contract_type === PLAYER_TRANSFER &&
        this.isCorporate
      ) {
        this.chooseClubType = true;
        this.form.club_type = '';
      } else {
        this.form.club_type = '';
      }

      if (this.form.deal_type !== this.futureDealType) {
        this.form.quoteType = '';
      }
    },
    getUserProfile() {
      let $this = this;
      UserRepository.getUserProfile()
        .then((response) => {
          store.dispatch('user/storeUserInfo', response.data);
          $this.professional = store.getters['user/getProfessional'];
          $this.loaded = true;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getUserProfileById(id) {
      let $this = this;
      UserRepository.getUserProfileById(id)
        .then((response) => {
          store.dispatch('user/storeUserInfo', response.data);
          $this.professional = store.getters['user/getProfessional'];
          $this.loaded = true;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getAthleteProfile() {
      this.getUserProfileById(this.form.athlete.id);
    },
    getContractTypes() {
      this.contractTypes = ContractTypes[this.userType];
    },
    jumpToStep2() {
      return (
        (this.form.contract_type === PLAYER_ADVANCE && this.professional) ||
        (this.isAgent &&
          this.form.user_type === 'athlete' &&
          this.form.contract_type === PLAYER_ADVANCE) ||
        (this.form.contract_type === PLAYER_TRANSFER &&
          this.form.club_type === BUYING)
      );
    },
    nextStep() {
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        store.dispatch('dealCalculator/addFirstStepInfo', this.form);
        store.dispatch('dealCalculator/addClub', null);
        store.dispatch('dealCalculator/addleague', null);
        store.dispatch('dealCalculator/addTvHolder', null);
        store.dispatch('dealCalculator/addSponsorOrBrand', {
          sponsorsOrBrandsIdentifier: 'brand',
          sponsorOrBrand: null,
        });

        if (this.jumpToStep2()) {
          store.dispatch('dealCalculator/addClub', this.professional.club);
          store.dispatch('dealCalculator/addleague', this.professional.league);
          store.dispatch('dealCalculator/jumpToStep', 2);
        }

        store.dispatch('dealCalculator/nextStep');
      }
    },
    checkUserType() {
      if (this.form.user_type === 'agent') this.form.contract_type = AGENT_FEES;
      if (this.form.user_type === 'athlete') {
        this.form.contract_type = PLAYER_ADVANCE;
        this.form.club_type = BUYING;
        this.contractTypes = [];
        this.contractTypes.push(ContractTypes[this.userType][0]);
        this.contractTypes.push(ContractTypes[this.userType][1]);
      } else {
        if (this.form.contract_type === '') {
          this.form.contract_type = AGENT_FEES;
        }

        this.form.athlete = '';
        this.form.club_type = '';
        this.contractTypes = [];
        this.contractTypes.push(ContractTypes[this.userType][2]);
      }

      this.chooseAthlete = this.form.user_type === 'athlete';
    },
    selectClubType() {
      if (
        this.userType === 'agent' &&
        this.form.contract_type === PLAYER_ADVANCE
      ) {
        this.form.club_type = BUYING;
      }
    },
  },
};
</script>

<style scoped>
.sport-input-wrapper {
  width: 50%;
  margin-top: 50px;
}
.sport-input-wrapper .sectionHeading {
  margin-bottom: 15px;
}
.athleteSelectWrapper {
  width: 30%;
}
.athleteSelectWrapper .alert {
  width: 100%;
}
.alert {
  width: 30%;
}
</style>
<style src="@/assets/styles/multiselect.css"></style>
