<template>
  <div class="step-three">
    <div v-for="(item, key) in form" :key="key" class="deal-criteria">
      <CustomInput
        :error="
          $v.form.$each[key].dealType.$error &&
          $v.form.$each[key].dealType.$dirty
        "
        errorMsg="Field is required."
        label="Deal Type"
      >
        <multiselect
          v-model="form[key].dealType"
          label="name"
          track-by="name"
          placeholder="Deal type"
          :multiple="false"
          :options="dealTypes"
        ></multiselect>
      </CustomInput>

      <b-row>
        <b-col>
          <CustomInput
            :error="
              $v.form.$each[key].country.$error &&
              $v.form.$each[key].country.$dirty
            "
            errorMsg="Field is required."
            label="Region"
          >
            <multiselect
              v-model="form[key].country"
              label="name"
              track-by="name"
              placeholder="Choose from the list"
              :multiple="true"
              :options="countries"
            ></multiselect>
          </CustomInput>
        </b-col>
        <b-col>
          <CustomInput
            :error="
              $v.form.$each[key].currency.$error &&
              $v.form.$each[key].currency.$dirty
            "
            errorMsg="Field is required."
            label="Currency"
          >
            <multiselect
              v-model="form[key].currency"
              label="name"
              track-by="name"
              placeholder="Choose from the list"
              :multiple="true"
              :options="currency"
            ></multiselect>
          </CustomInput>
        </b-col>
      </b-row>

      <CustomInput
        :error="
          $v.form.$each[key].sport.$error && $v.form.$each[key].sport.$dirty
        "
        errorMsg="Field is required."
        label="Sport"
      >
        <multiselect
          v-model="form[key].sport"
          label="name"
          track-by="name"
          placeholder="Choose from the list"
          :multiple="true"
          :options="sports"
        ></multiselect>
      </CustomInput>

      <b-row>
        <b-col>
          <CustomInput
            :error="
              $v.form.$each[key].minAmount.$error &&
              $v.form.$each[key].minAmount.$dirty
            "
            errorMsg="Field is required."
            label="Minimum amount"
          >
            <multiselect
              v-model="form[key].minAmount"
              label="name"
              track-by="name"
              placeholder="Choose from the list"
              :options="minAmount"
            ></multiselect>
          </CustomInput>
        </b-col>
        <b-col>
          <CustomInput
            :error="
              $v.form.$each[key].maxAmount.$error &&
              $v.form.$each[key].maxAmount.$dirty
            "
            errorMsg="Field is required."
            label="Maximum amount"
          >
            <multiselect
              v-model="form[key].maxAmount"
              label="name"
              track-by="name"
              placeholder="Choose from the list"
              :options="maxAmount"
            ></multiselect>
          </CustomInput>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <CustomInput
            :error="
              $v.form.$each[key].minTenor.$error &&
              $v.form.$each[key].minTenor.$dirty
            "
            errorMsg="Field is required."
            label="Minimum tenor"
          >
            <multiselect
              v-model="form[key].minTenor"
              label="name"
              track-by="name"
              placeholder="Choose from the list"
              :options="minTenor"
            ></multiselect>
          </CustomInput>
        </b-col>
        <b-col>
          <CustomInput
            :error="
              $v.form.$each[key].maxTenor.$error &&
              $v.form.$each[key].maxTenor.$dirty
            "
            errorMsg="Field is required."
            label="Maximum tenor"
          >
            <multiselect
              v-model="form[key].maxTenor"
              label="name"
              track-by="name"
              placeholder="Choose from the list"
              :options="maxTenor"
            ></multiselect>
          </CustomInput>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <CustomInput
            :error="
              $v.form.$each[key].minInterestRate.$error &&
              $v.form.$each[key].minInterestRate.$dirty
            "
            errorMsg="Field is required."
            label="Minimum interest rate"
          >
            <multiselect
              v-model="form[key].minInterestRate"
              label="name"
              track-by="name"
              placeholder="Choose from the list"
              :options="minInterestRate"
            ></multiselect>
          </CustomInput>
        </b-col>
        <b-col>
          <CustomInput
            :error="
              $v.form.$each[key].interestRange.$error &&
              $v.form.$each[key].interestRange.$dirty
            "
            errorMsg="Field is required."
            label="Interest rate range"
          >
            <multiselect
              v-model="form[key].interestRange"
              label="name"
              track-by="name"
              placeholder="Choose from the list"
              :options="interestRange"
            ></multiselect>
          </CustomInput>
        </b-col>
      </b-row>
      <CustomInput label="Additional information (optional)">
        <input type="text" v-model="form[key].additionalInfo" placeholder="" />
      </CustomInput>
    </div>

    <a
      href="#"
      @click.prevent="addNewDealCriteria()"
      class="link-text deal-criteria"
      >+ Add new Deal Criteria</a
    >

    <div class="completeForm">
      <SquareButton @click.native="next()" background="#3a9eba" color="white"
        >Complete onboarding</SquareButton
      >
    </div>
  </div>
</template>

<script>
import store from '@/store';
import { email, required } from 'vuelidate/lib/validators';
import RepositoryFactory from '../../../repositories/RepositoryFactory';
const OnboardingRepository = RepositoryFactory.get('onboarding');

import CustomInput from '@/components/CustomInput.vue';
import SquareButton from '@/components/SquareButton.vue';
import Multiselect from 'vue-multiselect';

export default {
  name: 'ThirdStep',
  components: {
    CustomInput,
    SquareButton,
    Multiselect,
  },
  data() {
    return {
      form: [
        {
          dealType: null,
          currency: null,
          country: null,
          sport: null,
          minAmount: null,
          maxAmount: null,
          minTenor: null,
          maxTenor: null,
          minInterestRate: null,
          interestRange: null,
          additionalInfo: '',
        },
      ],
    };
  },
  validations() {
    return {
      form: {
        $each: {
          dealType: { required },
          currency: { required },
          country: { required },
          sport: { required },
          minAmount: { required },
          maxAmount: { required },
          minTenor: { required },
          maxTenor: { required },
          minInterestRate: { required },
          interestRange: { required },
        },
      },
    };
  },
  computed: {
    dealTypes() {
      return store.getters['lenderCriteria/getDealTypes'];
    },
    currency() {
      let currency = store.getters['lenderCriteria/getCurrency'];
      currency.map((item) => {
        item.name = item.name.toUpperCase();
      });
      return currency;
    },
    countries() {
      return store.getters['lenderCriteria/getCountries'];
    },
    sports() {
      return store.getters['lenderCriteria/getSports'];
    },
    minAmount() {
      return store.getters['lenderCriteria/getMinAmount'];
    },
    maxAmount() {
      return store.getters['lenderCriteria/getMaxAmount'];
    },
    minTenor() {
      return store.getters['lenderCriteria/getMinTenor'];
    },
    maxTenor() {
      return store.getters['lenderCriteria/getMaxTenor'];
    },
    minInterestRate() {
      return store.getters['lenderCriteria/getMinInterestRate'];
    },
    interestRange() {
      return store.getters['lenderCriteria/getInterestRange'];
    },
  },
  methods: {
    addNewDealCriteria() {
      this.form.push({
        dealType: null,
        currency: null,
        country: null,
        sport: null,
        minAmount: null,
        maxAmount: null,
        minTenor: null,
        maxTenor: null,
        minInterestRate: null,
        interestRange: null,
        additionalInfo: '',
      });
    },
    next() {
      let $this = this;
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        this.$loading(true);
        store.dispatch('lenderOnboarding/addCriteria', this.form);
        let data = new FormData();
        data.append(
          'nx_data',
          JSON.stringify(store.getters['lenderOnboarding/getOnboardingInfo'])
        );
        data.append('avatar', store.getters['lenderOnboarding/getUserPhoto']);
        OnboardingRepository.registerLender(data)
          .then((response) => {
            store.dispatch('lenderOnboarding/addLenderInfo', {});
            store.dispatch('lenderOnboarding/addContactInfo', {});
            store.dispatch('lenderOnboarding/addCriteria', {});
            $this.$router.push('/');
            this.$loading(false);
          })
          .catch((error) => {
            console.error(error);
            this.$loading(false);
          });
      }
    },
  },
};
</script>

<style>
.completeForm {
  margin-top: 50px;
}
.step-three .input-wrap {
  margin-top: 10px;
}

.error .multiselect .multiselect__tags {
  border-color: #f61c0d;
}

.deal-criteria .label {
  margin-bottom: 5px !important;
}

.deal-criteria .error-message {
  margin-top: 5px;
}
</style>
<style src="@/assets/styles/multiselect.css"></style>
