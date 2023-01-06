<template>
  <div class="deal-criteria">
    <div
      v-for="(deal, index) in dealCriteria"
      :key="index"
      class="panel component-no-padding hasRibbon"
    >
      <div class="ribbon"></div>
      <div @click="toggleBlock(index)" class="criteria-header">
        Credit Criteria {{ index + 1 }}
      </div>

      <div
        class="criteria-wrapper"
        :class="accordion.includes(index) ? 'show' : ''"
      >
        <CustomInput
          v-if="Array.isArray(dealTypes)"
          :error="
            $v.dealCriteria.$each[index].type.$error &&
            $v.dealCriteria.$each[index].type.$dirty
          "
          errorMsg="Field is required."
          label="Deal type"
        >
          <multiselect
            v-model="dealCriteria[index].type"
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
                $v.dealCriteria.$each[index].country.$error &&
                $v.dealCriteria.$each[index].country.$dirty
              "
              errorMsg="Field is required."
              label="Country"
            >
              <multiselect
                v-model="dealCriteria[index].country"
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
                $v.dealCriteria.$each[index].currency.$error &&
                $v.dealCriteria.$each[index].currency.$dirty
              "
              errorMsg="Field is required."
              label="Currency"
            >
              <multiselect
                v-model="dealCriteria[index].currency"
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
          :error="
            $v.dealCriteria.$each[index].sport.$error &&
            $v.dealCriteria.$each[index].sport.$dirty
          "
          errorMsg="Field is required."
          label="Sport"
        >
          <multiselect
            label="name"
            v-model="dealCriteria[index].sport"
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
                $v.dealCriteria.$each[index].min_amount.$error &&
                $v.dealCriteria.$each[index].min_amount.$dirty
              "
              errorMsg="Minimum amount is required"
              label="Minimum amount"
            >
              <multiselect
                label="name"
                v-model="dealCriteria[index].min_amount"
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
                $v.dealCriteria.$each[index].max_amount.$error &&
                $v.dealCriteria.$each[index].max_amount.$dirty
              "
              errorMsg="Maximum amount is required"
              label="Maximum amount"
            >
              <multiselect
                v-model="dealCriteria[index].max_amount"
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
                $v.dealCriteria.$each[index].min_tenor.$error &&
                $v.dealCriteria.$each[index].min_tenor.$dirty
              "
              errorMsg="Minimum amount is required"
              label="Minimum tenor"
            >
              <multiselect
                label="name"
                v-model="dealCriteria[index].min_tenor"
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
                $v.dealCriteria.$each[index].max_tenor.$error &&
                $v.dealCriteria.$each[index].max_tenor.$dirty
              "
              errorMsg="Maximum amount is required"
              label="Maximum tenor"
            >
              <multiselect
                v-model="dealCriteria[index].max_tenor"
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
                $v.dealCriteria.$each[index].min_interest_rate.$error &&
                $v.dealCriteria.$each[index].min_interest_rate.$dirty
              "
              errorMsg="Minimum interest rate is required"
              label="Minimum interest rate"
            >
              <multiselect
                v-model="dealCriteria[index].min_interest_rate"
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
                $v.dealCriteria.$each[index].interest_range.$error &&
                $v.dealCriteria.$each[index].interest_range.$dirty
              "
              errorMsg="Interest rate range is required"
              label="Interest rate range"
            >
              <multiselect
                v-model="dealCriteria[index].interest_range"
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
              v-model="dealCriteria[index].note"
              class="form-control text-area"
              name=""
              id=""
              cols="20"
              rows="10"
            ></textarea>
          </div>
        </b-row>
        <div class="buttons">
          <a href="#" @click.prevent="saveDealCriteria(index)" class="button"
            >Save</a
          >
          <a
            href="#"
            @click.prevent="deleteCriteria(index)"
            class="button delete"
            >Delete</a
          >
        </div>
      </div>
    </div>
    <a
      href="#"
      @click.prevent="addDealCriteria"
      class="button add-deal-criteria"
      >Add credit criteria</a
    >
  </div>
</template>

<script>
import store from '@/store';

import CustomInput from '@/components/CustomInput';
import Multiselect from 'vue-multiselect';
import UserMixin from '@/mixins/User/User.mixin';
import AccordionMixin from '@/mixins/Common/Accordion.mixin';

import RepositoryFactory from '../../repositories/RepositoryFactory';
import { required } from 'vuelidate/lib/validators';
const UserRepository = RepositoryFactory.get('user');

export default {
  name: 'DealCriteria',
  components: {
    CustomInput,
    Multiselect,
  },
  mixins: [UserMixin, AccordionMixin],
  mounted() {},
  computed: {
    dealCriteria() {
      let getDealCriteria = store.getters['user/getDealCriteria'];
      if (
        getDealCriteria &&
        getDealCriteria[0] &&
        getDealCriteria[0].currency
      ) {
        getDealCriteria[0].currency.map((item) => {
          item.name = item.name.toUpperCase();
        });
      }
      return getDealCriteria;
    },
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
      if (currency) {
        currency.map((item) => {
          item.name = item.name.toUpperCase();
        });
      }
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
        $each: {
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
        },
      },
    };
  },
  methods: {
    deleteCriteria(index) {
      let $this = this;
      $this.$loading(true);
      if ($this.dealCriteria[index].id !== '') {
        UserRepository.deleteCriteria($this.dealCriteria[index].id)
          .then(() => {
            $this.dealCriteria.splice(index, 1);
            $this.$loading(false);
          })
          .catch((error) => {
            $this.$loading(false);
            console.error(error);
          });
      } else {
        $this.dealCriteria.splice(index, 1);
        $this.$loading(false);
      }
    },
    storeCriteria() {
      let $this = this;
      $this.$loading(true);
      UserRepository.storeCriteria()
        .then(() => {
          $this.$loading(false);
        })
        .catch((error) => {
          $this.$loading(false);
          console.error(error);
        });
    },
    addDealCriteria() {
      this.dealCriteria.push({
        id: '',
        type: null,
        min_amount: null,
        max_amount: null,
        min_tenor: null,
        max_tenor: null,
        min_interest_rate: null,
        interest_range: null,
        note: '',
        currency: [],
        country: [],
        sport: [],
      });
      this.accordion.push(this.dealCriteria.length - 1);
    },
    saveDealCriteria(index) {
      let $this = this;
      let deal = $this.dealCriteria[index];
      this.$v.dealCriteria.$touch();
      if (!this.$v.dealCriteria.$invalid) {
        $this.$loading(true);
        if (deal.id !== '') {
          UserRepository.updateCriteria(deal, deal.id)
            .then(() => {
              $this.getUserProfile();
              $this.$loading(false);
            })
            .catch((error) => {
              console.error(error);
              $this.$loading(false);
            });
        } else {
          UserRepository.storeCriteria(deal)
            .then(() => {
              $this.getUserProfile();
              $this.$loading(false);
            })
            .catch((error) => {
              console.error(error);
              $this.$loading(false);
            });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
a.button {
  display: inline-block;
  margin: 24px 0 12px;
  padding: 14px 40px;
  border-radius: 4px;
  color: #ffffff;
  background-color: #3a9eba;
}
.text-area {
  min-height: 90px;
  height: 90px;
}
.panel {
  padding: 20px;
  margin-bottom: 15px;
}
.buttons {
  text-align: center;
}
.add-deal-criteria.add-deal-criteria {
  margin: 0px auto 0px;
}
.deal-criteria .panel .criteria-wrapper {
  display: none;
}
.criteria-header {
  font-weight: 700;
  font-size: 16px;
}
.criteria-header:hover {
  cursor: pointer;
}
.criteria-wrapper {
  margin-top: 10px;
}
.deal-criteria .panel .criteria-wrapper.show {
  display: block;
}

.hasRibbon {
  padding-left: 28px;
}
.ribbon {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 16px;
  background-color: #b6daff;
  border-radius: 8px 0 0 8px;
}
</style>

<style src="@/assets/styles/multiselect.css"></style>
