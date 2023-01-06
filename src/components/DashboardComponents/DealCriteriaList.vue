<template>
  <div>
    <div class="accordion" id="accordion">
      <div
        v-for="(criteria, index) in dealCriteria"
        :key="index"
        class="accordion-item"
      >
        <div class="ribbon"></div>
        <h2 class="accordion-header" :id="criteria.id">
          <button
            class="accordion-button"
            @click.prevent="toggleBlock(index)"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="'#' + criteria.id"
            aria-expanded="true"
            :aria-controls="criteria.id"
          >
            Credit Criteria {{ index + 1 }}
          </button>
        </h2>
        <div
          :id="criteria.id"
          class="accordion-collapse collapse"
          :class="accordion.includes(index) ? 'show' : ''"
          aria-labelledby="headingOne"
          data-bs-parent="#accordion"
        >
          <div class="accordion-body">
            <div class="text-with-label">
              <label>Deal type</label>
              <p>{{ criteria.type.name }}</p>
            </div>

            <div class="row">
              <div class="col">
                <div class="text-with-label">
                  <label>Region</label>
                  <p v-for="(country, index) in criteria.country" :key="index">
                    {{ country.name }}
                  </p>
                  <br />
                </div>
              </div>
            </div>
            <div class="col">
              <div class="text-with-label">
                <label>Currency</label>
                <p v-for="(currency, index) in criteria.currency" :key="index">
                  {{ currency.name ? currency.name.toUpperCase() : '' }}
                </p>
                <br />
              </div>
            </div>

            <div class="text-with-label">
              <label>Sport</label>
              <p v-for="(sport, index) in criteria.sport" :key="index">
                {{ sport.name }}
              </p>
              <br />
            </div>

            <div class="row">
              <div class="col">
                <div class="text-with-label">
                  <label>Min amount</label>
                  <p>{{ criteria.min_amount.name }}</p>
                </div>
              </div>
              <div class="col">
                <div class="text-with-label">
                  <label>Max amount</label>
                  <p>{{ criteria.max_amount.name }}</p>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div class="text-with-label">
                  <label>Min tenor</label>
                  <p>{{ criteria.min_tenor.name }}</p>
                </div>
              </div>
              <div class="col">
                <div class="text-with-label">
                  <label>Max tenor</label>
                  <p>{{ criteria.max_tenor.name }}</p>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div class="text-with-label">
                  <label>Min interest rate</label>
                  <p>{{ criteria.min_interest_rate.name }} %</p>
                </div>
              </div>
              <div class="col">
                <div class="text-with-label">
                  <label>Interest rate range</label>
                  <p>{{ criteria.interest_range.name }} %</p>
                </div>
              </div>
            </div>

            <div class="text-with-label">
              <label>Note</label>
              <p>{{ criteria.note }}</p>
            </div>

            <a href="#" @click.prevent="editCriteria(index)"
              ><icon name="edit-icon" /> Edit</a
            >
          </div>
        </div>
      </div>
    </div>
    <a href="#" @click.prevent="addDealCriteriaModal = true" class="button"
      >Add credit criteria</a
    >
    <BaseModal
      :modalType="'edit-deal-criteria'"
      v-if="editDealCriteria"
      :deal-criteria="editDealCriteria"
      @closed="closeEditModal"
    ></BaseModal>
    <BaseModal
      :modalType="'add-deal-criteria'"
      v-if="addDealCriteriaModal"
      @closed="addDealCriteriaModal = false"
    ></BaseModal>
  </div>
</template>

<script>
import store from '@/store';
import UserMixin from '@/mixins/User/User.mixin';
import AccordionMixin from '@/mixins/Common/Accordion.mixin';
import BaseModal from '../BaseModal';

export default {
  name: 'DealCriteriaList',
  components: {
    BaseModal,
  },
  mixins: [AccordionMixin, UserMixin],
  mounted() {
    store.dispatch('lenderCriteria/getCriteria');
    store.dispatch('lenderCriteria/getCountries');
    store.dispatch('lenderCriteria/getSports');
  },
  data() {
    return {
      editDealCriteria: null,
      addDealCriteriaModal: false,
    };
  },
  computed: {
    dealCriteria() {
      let getDealCriteria = store.getters['user/getDealCriteria'];
      if (getDealCriteria[0]) {
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
    editCriteria(index) {
      this.editDealCriteria = this.dealCriteria[index];
    },
    closeEditModal() {
      this.editDealCriteria = null;
      this.getUserProfile();
    },
  },
};
</script>

<style lang="scss" scoped>
a.button {
  display: block;
  width: 200px;
  padding: 17px 0;
  margin: 30px auto 0;
  background-color: var(--primary);
  color: white;
  text-align: center;
  border-radius: 4px;
}
.accordion-header {
  font-size: 14px;
  font-weight: 700;
  .accordion-button {
    color: #253242;
    background-color: #ffffff;
    box-shadow: none;
  }
}
.accordion-item {
  position: relative;
  padding-left: 16px;
  border: none;
  border-radius: 10px;
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
}
</style>
