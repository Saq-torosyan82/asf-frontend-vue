<template>
  <div>
    <Leagues v-if="sport && sport.has_league && !chooseMedia" @closeLeagues="chooseMedia = true"></Leagues>
    <div v-if="!sport || !sport.has_league || chooseMedia" class="media-rights-wrapper">
      <h3 class="sectionHeading">Choose your Media</h3>
      <div class="search-input" v-if="itemsToShow">
        <input
            @keyup="search('tvRightsHolders')"
            v-model="searchQuery"
            placeholder="Search..."
            type="text"
        /><IconSearch />
      </div>
      <div class="selectionBody">
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
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import RepositoryFactory from '@/repositories/RepositoryFactory';
const DealStepsRepository = RepositoryFactory.get('deal-steps-repository');
import SearchMixin from '@/mixins/DealCalculator/Search.mixin';
import IconSearch from '@/assets/icons/search.svg';
import Leagues from "./Leagues";

export default {
  name: 'Media',
  components: { IconSearch, Leagues },
  mounted() {
    this.getTvRightsHolders();
  },
  mixins: [SearchMixin],
  data: function () {
    return {
      tvRightsHolders: null,
      chooseMedia: false
    };
  },
  computed: {
    contractType: () => {
      return store.getters['dealCalculator/getContractType'];
    },
    sport: () => {
      return store.getters['dealCalculator/getSport'];
    },
  },
  methods: {
    getTvRightsHolders() {
      let $this = this;
      DealStepsRepository.getTvRightsHolders()
        .then((response) => {
          $this.tvRightsHolders = response.data.data;
          $this.itemsToShow = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    nextStep(tvHolder) {
      store.dispatch('dealCalculator/addTvHolder', tvHolder);
      store.dispatch('dealCalculator/addSponsorOrBrand', {
        sponsorsOrBrandsIdentifier: '',
        sponsorOrBrand: null,
      });
      store.dispatch('dealCalculator/nextStep');
    },
  },
};
</script>

<style scoped>
.selectionItem img {
  max-width: 100%;
}
</style>
