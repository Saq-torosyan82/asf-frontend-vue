<template>
  <div>
    <CustomInput
      v-if="Array.isArray(dealTypes)"
      :error="$v.dealCriteria.type.$error && $v.dealCriteria.type.$dirty"
      errorMsg="Field is required."
      label="Deal type"
    >
      <multiselect
        v-model="dealCriteria.type"
        label="name"
        placeholder="Choose from the list"
        :multiple="false"
        :options="dealTypes"
      ></multiselect>
    </CustomInput>
    <b-row>
      <b-col>
        <CustomInput
          v-if="Array.isArray(countries)"
          :error="
            $v.dealCriteria.country.$error && $v.dealCriteria.country.$dirty
          "
          errorMsg="Field is required."
          label="Country"
        >
          <multiselect
            v-model="dealCriteria.country"
            label="name"
            track-by="id"
            placeholder="Choose from the list"
            :multiple="true"
            :options="countries"
          ></multiselect>
        </CustomInput>
      </b-col>
      <b-col>
        <CustomInput
          v-if="Array.isArray(currency)"
          :error="
            $v.dealCriteria.currency.$error && $v.dealCriteria.currency.$dirty
          "
          errorMsg="Field is required."
          label="Currency"
        >
          <multiselect
            v-model="dealCriteria.currency"
            label="name"
            track-by="id"
            placeholder="Choose from the list"
            :multiple="true"
            :options="currency"
          ></multiselect>
        </CustomInput>
      </b-col>
    </b-row>

    <CustomInput
      v-if="Array.isArray(sports)"
      :error="$v.dealCriteria.sport.$error && $v.dealCriteria.sport.$dirty"
      errorMsg="Field is required."
      label="Sport"
    >
      <multiselect
        label="name"
        v-model="dealCriteria.sport"
        track-by="id"
        placeholder="Choose from the list"
        :multiple="true"
        :options="sports"
      ></multiselect>
    </CustomInput>

    <b-row>
      <b-col>
        <CustomInput
          v-if="Array.isArray(minAmount)"
          :error="
            $v.dealCriteria.min_amount.$error &&
            $v.dealCriteria.min_amount.$dirty
          "
          errorMsg="Minimum amount is required"
          label="Minimum amount"
        >
          <multiselect
            label="name"
            v-model="dealCriteria.min_amount"
            track-by="id"
            placeholder="Choose from the list"
            :multiple="false"
            :options="minAmount"
          ></multiselect>
        </CustomInput>
      </b-col>
      <b-col>
        <CustomInput
          v-if="Array.isArray(maxAmount)"
          :error="
            $v.dealCriteria.max_amount.$error &&
            $v.dealCriteria.max_amount.$dirty
          "
          errorMsg="Maximum amount is required"
          label="Maximum amount"
        >
          <multiselect
            v-model="dealCriteria.max_amount"
            label="name"
            track-by="id"
            placeholder="Choose from the list"
            :multiple="false"
            :options="maxAmount"
          ></multiselect>
        </CustomInput>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <CustomInput
          v-if="Array.isArray(minTenor)"
          :error="
            $v.dealCriteria.min_tenor.$error && $v.dealCriteria.min_tenor.$dirty
          "
          errorMsg="Minimum amount is required"
          label="Minimum tenor"
        >
          <multiselect
            label="name"
            v-model="dealCriteria.min_tenor"
            track-by="id"
            placeholder="Choose from the list"
            :multiple="false"
            :options="minTenor"
          ></multiselect>
        </CustomInput>
      </b-col>
      <b-col>
        <CustomInput
          v-if="Array.isArray(maxTenor)"
          :error="
            $v.dealCriteria.max_tenor.$error && $v.dealCriteria.max_tenor.$dirty
          "
          errorMsg="Maximum amount is required"
          label="Maximum tenor"
        >
          <multiselect
            v-model="dealCriteria.max_tenor"
            label="name"
            track-by="id"
            placeholder="Choose from the list"
            :multiple="false"
            :options="maxTenor"
          ></multiselect>
        </CustomInput>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <CustomInput
          v-if="Array.isArray(minInterestRate)"
          :error="
            $v.dealCriteria.min_interest_rate.$error &&
            $v.dealCriteria.min_interest_rate.$dirty
          "
          errorMsg="Minimum interest rate is required"
          label="Minimum interest rate"
        >
          <multiselect
            v-model="dealCriteria.min_interest_rate"
            label="name"
            track-by="id"
            placeholder="Choose from the list"
            :multiple="false"
            :options="minInterestRate"
          ></multiselect>
        </CustomInput>
      </b-col>
      <b-col>
        <CustomInput
          v-if="Array.isArray(interestRange)"
          :error="
            $v.dealCriteria.interest_range.$error &&
            $v.dealCriteria.interest_range.$dirty
          "
          errorMsg="Interest rate range is required"
          label="Interest rate range"
        >
          <multiselect
            v-model="dealCriteria.interest_range"
            label="name"
            track-by="id"
            placeholder="Choose from the list"
            :multiple="false"
            :options="interestRange"
          ></multiselect>
        </CustomInput>
      </b-col>
    </b-row>
    <b-row>
      <div class="input-wrap" style="margin-top: 15px">
        <textarea
          v-model="dealCriteria.note"
          class="form-control text-area"
          name=""
          id=""
          cols="20"
          rows="10"
        ></textarea>
      </div>
    </b-row>
    <a href="#" @click.prevent="saveCriteria()" class="button">Save</a>
  </div>
</template>

<script>
import store from '@/store';
import { required } from 'vuelidate/lib/validators';
import UserMixin from '@/mixins/User/User.mixin';

import CustomInput from '@/components/CustomInput';
import Multiselect from 'vue-multiselect';

import RepositoryFactory from '../../repositories/RepositoryFactory';
const UserRepository = RepositoryFactory.get('user');

export default {
  name: 'EditDealCriteria',
  components: {
    CustomInput,
    Multiselect,
  },
  mixins: [UserMixin],
  props: {
    dealCriteria: { type: Object, required: true },
  },
  computed: {
    dealTypes() {
      return store.getters['lenderCriteria/getDealTypes'];
    },
    countries() {
      return store.getters['lenderCriteria/getCountries'];
    },
    sports() {
      return store.getters['lenderCriteria/getSports'];
    },
    currency() {
      let currency = store.getters['lenderCriteria/getCurrency'];
      currency.map((item) => {
        item.name = item.name.toUpperCase();
      });
      return currency;
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
  validations() {
    return {
      dealCriteria: {
        type: { required },
        min_amount: { required },
        max_amount: { required },
        min_tenor: { required },
        max_tenor: { required },
        min_interest_rate: { required },
        interest_range: { required },
        currency: { required },
        country: { required },
        sport: { required },
        note: {},
      },
    };
  },
  methods: {
    saveCriteria() {
      let $this = this;
      let deal = $this.dealCriteria;
      this.$v.dealCriteria.$touch();
      if (!this.$v.dealCriteria.$invalid) {
        $this.$loading(true);
        UserRepository.updateCriteria(deal, deal.id)
          .then(() => {
            $this.getUserProfile();
            $this.$loading(false);
          })
          .catch((error) => {
            console.error(error);
            $this.$loading(false);
          });
        this.$emit('close-modal');
      }
    },
  },
};
</script>

<style scoped>
a.button {
  display: inline-block;
  margin: 24px 0 12px;
  padding: 14px 40px;
  border-radius: 4px;
  color: #ffffff;
  background-color: var(--primary);
}
.text-area {
  min-height: 90px;
  height: 90px;
}
</style>

<style src="@/assets/styles/multiselect.css"></style>
