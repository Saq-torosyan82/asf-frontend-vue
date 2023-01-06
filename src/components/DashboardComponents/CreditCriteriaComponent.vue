<template>
  <div class="credit-criteria-component" ref="wraper">
    <div
      v-for="(criteria, index) in dealCriteria"
      class="credit-criteria component-no-padding"
      :key="index"
    >
      <div
        class="ribbon"
        :style="{ backgroundColor: getColor(index + 1) }"
      ></div>
      <div class="criteria-header inline" @click="toggleExpand(index)">
        <!-- <h1>Deal criteria {{ index + 1 }}</h1> -->
        <h1>{{ criteria.type.name }}</h1>
        <Icon name="arrow-down" v-show="!(expandedId === index)" />
      </div>
      <div class="criteria-body" v-show="expandedId === index">
        <b-row>
          <b-col>
            <label>Deal type</label>
            <p>{{ criteria.type.name }}</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <label>Region</label>

            <p v-for="(country, index) in criteria.country" :key="index">
              {{ country.name }}
            </p>
          </b-col>
          <b-col>
            <label>Currency</label>
            <p v-for="(currency, index) in criteria.currency" :key="index">
              {{ currency.name ? currency.name.toUpperCase() : '' }}
            </p>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <label>Sport</label>
            <p v-for="(sport, index) in criteria.sport" :key="index">
              {{ sport.name }}
            </p>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <label>Min. amount</label>
            <p>{{ criteria.min_amount.name }}</p>
          </b-col>
          <b-col>
            <label>Max. amount</label>
            <p>{{ criteria.max_amount.name }}</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <label>Min. tenor</label>
            <p>{{ criteria.min_tenor.name }}</p>
          </b-col>
          <b-col>
            <label>Max. tenor</label>
            <p>{{ criteria.max_tenor.name }}</p>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <label>Min. interest rate</label>
            <p>{{ criteria.min_interest_rate.name }} %</p>
          </b-col>
          <b-col>
            <label>Interest rate range</label>
            <p>{{ criteria.interest_range.name }} %</p>
          </b-col>
        </b-row>
        <b-row class="credit-criteria-footer">
          <b-col>
            <a href="#" class="link-text" @click.prevent="editCriteria(index)"
              ><Icon name="edit" />Edit</a
            >
          </b-col>

          <b-col>
            <a
              v-if="dealCriteria.length > 1"
              href="#"
              class="link-text delete"
              @click.prevent="deleteCriteria(index)"
              ><Icon name="delete" />Delete</a
            >
          </b-col>
        </b-row>
      </div>
      <BaseModal
        :modalType="'edit-deal-criteria'"
        v-if="editDealCriteria"
        :deal-criteria="editDealCriteria"
        @closed="closeEditModal"
      ></BaseModal>
      <BaseModal
        :modalType="'add-deal-criteria'"
        v-if="addDealCriteriaModal == true"
        @closed="addDealCriteriaModal = false"
      ></BaseModal>
    </div>

    <a
      class="add-criteria-button component-no-padding"
      @click.prevent="addDealCriteriaModal = true"
      >Add deal criteria</a
    >
  </div>
</template>

<script>
import store from '@/store';
import UserMixin from '@/mixins/User/User.mixin';
import Icon from '@/components/Icon';
import BaseModal from '../BaseModal';
import Color from '@/enums/modules/colors.js';
import RepositoryFactory from '../../repositories/RepositoryFactory';
const UserRepository = RepositoryFactory.get('user');

export default {
  mixins: [UserMixin],
  components: {
    Icon,
    BaseModal,
  },
  data() {
    return {
      expandedId: 0,
      editDealCriteria: null,
      addDealCriteriaModal: false,
    };
  },
  computed: {
    dealCriteria() {
      let getDealCriteria = store.getters['user/getDealCriteria'];
      if (
        getDealCriteria &&
        getDealCriteria[0] !== undefined &&
        getDealCriteria[0]
      ) {
        getDealCriteria[0].currency.map((item) => {
          if (item.name) {
            item.name = item.name.toUpperCase();
          }
        });
      }
      return getDealCriteria;
    },
  },
  methods: {
    getColor(id) {
      return Color[id];
    },
    toggleExpand(id) {
      this.expandedId = id;
    },
    editCriteria(index) {
      this.editDealCriteria = this.dealCriteria[index];
    },
    closeEditModal() {
      this.editDealCriteria = null;
      this.getUserProfile();
    },
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
  },
  mounted() {
    store.dispatch('lenderCriteria/getCriteria');
    store.dispatch('lenderCriteria/getCountries');
    store.dispatch('lenderCriteria/getSports');
  },
};

Color[1];
</script>

<style lang="scss" scoped>
.credit-criteria-component {
  height: fit-content;
}
.ribbon {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 16px;
  /* background-color: #b6daff; */
  border-radius: 8px 0 0 8px;
}
.add-criteria-button {
  width: 100%;
  display: inline-block;
  text-align: center;
  line-height: 58px;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
  color: var(--primary);
  &:hover {
    background-color: var(--primary);
    color: #ffffff;
  }
}
.credit-criteria {
  margin-bottom: 15px;
  position: relative;
  .col {
    padding: 0 12px 5px 12px;

    &.credit-criteria-footer {
      height: 50px;
    }
  }
  .criteria-header {
    cursor: pointer;
    justify-content: space-between;
    width: 100%;
    padding: 20px 15px 20px 28px;
    h1 {
      font-size: 14px;
      font-weight: 700;
      margin: 0;
    }
    svg {
      margin-top: 2px;
    }
  }
  .criteria-body {
    padding: 0px 15px 25px 28px;
  }

  label {
    font-size: 10px;
    color: #93a0ae;
  }
  p {
    font-size: 12px;
    margin-bottom: 10px;
  }
}
.credit-criteria-footer {
  padding-top: 10px;
  a.delete {
    color: #eb5757 !important;
  }
}
</style>
