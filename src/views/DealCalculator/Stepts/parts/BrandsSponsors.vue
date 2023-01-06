<template>
  <div>
    <h3 class="sectionHeading">Choose your {{ sponsorsOrBrandsIdentifier }}</h3>
    <div class="radio__wrapper">
      <div
        v-if="
          $v.sponsorsOrBrandsIdentifier.$error &&
          $v.sponsorsOrBrandsIdentifier.$dirty
        "
        class="alert alert-danger"
        role="alert"
      >
        Deal type is required
      </div>

      <div class="radio__input">
        <input
          type="radio"
          v-model="sponsorsOrBrandsIdentifier"
          checked
          name="deal_type"
          value="brands"
          class="radio-input"
          @click="getItems('brands')"
        /><label>Sportswear Brands</label>
      </div>
      <div class="radio__input">
        <input
          type="radio"
          v-model="sponsorsOrBrandsIdentifier"
          name="deal_type"
          value="sponsors"
          class="radio-input"
          @click="getItems('sponsors')"
        /><label>Commercial Sponsors</label>
      </div>
    </div>
    <!-- <h3 class="sectionHeading">Choose your commercial sponsor</h3> -->

    <div v-if="itemsToShow">
      <div class="search-input">
        <input
          @keyup="search('sponsorsOrBrands')"
          v-model="searchQuery"
          placeholder="Search..."
          type="text"
        /><Icon name="search-icon" />
      </div>
      <hr />
    </div>

    <div v-if="itemsToShow" class="selectionBody">
      <div
        v-for="(item, index) in itemsToShow"
        :key="index"
        class="selectionItem"
        @click="nextStep(item)"
      >
        <div class="image">
          <img
            :src="
              item.logo && item.logo !== ''
                ? item.logo
                : '../../../../assets/img/dashboard/league.png'
            "
          />
        </div>
        <p>{{ item.name }}</p>
      </div>
      <div class="selectionItem">
        <div class="image">
          <a href="#" @click.prevent="showAddItemModal">
            <Icon name="add-plus-icon-cyrcle" />
          </a>
        </div>
      </div>
    </div>
    <BaseModal
      @closed="hideAddItemModal"
      @update-list="getItems(sponsorsOrBrandsIdentifier)"
      v-if="addItemModal"
      :modal-type="
        sponsorsOrBrandsIdentifier === 'brands' ? 'add-brand' : 'add-sponsor'
      "
    ></BaseModal>
  </div>
</template>
<script>
import store from '@/store';
// import { mapGetters } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import RepositoryFactory from '../../../../repositories/RepositoryFactory';
import Icon from '@/components/Icon';
const DealRepository = RepositoryFactory.get('deal-steps-repository');
import SearchMixin from '@/mixins/DealCalculator/Search.mixin';
import BaseModal from '../../../../components/BaseModal';

export default {
  name: 'BrandsSponsors',
  components: {
    Icon,
    BaseModal,
  },
  mounted() {
    this.sponsorsOrBrandsIdentifier =
      store.getters['dealCalculator/getSBIdentifier'];
    this.getItems(this.sponsorsOrBrandsIdentifier);
  },
  mixins: [SearchMixin],
  data: function () {
    return {
      sponsorsOrBrands: null,
      sponsorsOrBrandsIdentifier: 'brands',
      addItemModal: false,
    };
  },
  validations() {
    return {
      sponsorsOrBrandsIdentifier: { required },
    };
  },
  methods: {
    showAddItemModal() {
      this.addItemModal = true;
    },
    hideAddItemModal() {
      this.addItemModal = false;
    },
    getItems(type) {
      this.addItemModal = false;
      let $this = this;
      $this.searchQuery = '';
      if (type === 'brands') {
        DealRepository.getBrands()
          .then((response) => {
            $this.sponsorsOrBrands = response.data.data;
            $this.itemsToShow = response.data.data;
          })
          .catch((error) => {
            $this.sponsorsOrBrands = [];
            console.error(error);
          });
      } else if (type === 'sponsors') {
        DealRepository.getSponsors()
          .then((response) => {
            $this.sponsorsOrBrands = response.data.data;
            $this.itemsToShow = response.data.data;
          })
          .catch((error) => {
            $this.sponsorsOrBrands = [];
            console.error(error);
          });
      }
    },
    nextStep(item) {
      store.dispatch('dealCalculator/addSponsorOrBrand', {
        sponsorsOrBrandsIdentifier: this.sponsorsOrBrandsIdentifier,
        sponsorOrBrand: item,
      });
      store.dispatch('dealCalculator/addTvHolder', null);
      store.dispatch('dealCalculator/nextStep');
    },
  },
};
</script>

<style lang="scss" scoped>
.selectionItem img {
  max-width: 100%;
}

.search-input input {
  width: 200px;
  height: 35px;
  border: 1px solid #d9dfe5;
  font-size: 14px;
  font-family: Mulish;
  font-weight: 600;
  color: #707d8c;
  border-radius: 10px;
  padding-left: 12px;
}

.search-input {
  position: relative;
  width: 200px;
  margin-top: 25px;
}
.search-input svg {
  position: absolute;
  right: 15px;
  top: 9px;
}

.add-item-wrapper {
  display: inline-block;
  margin-left: 30px;
}

.add-item-wrapper .button {
  padding: 6px 31px;
  margin: 0px;
}
</style>
