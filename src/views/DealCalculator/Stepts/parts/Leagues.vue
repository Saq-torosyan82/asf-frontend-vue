<template>
  <div>
    <div v-if="leagues && !chooseClub">
      <h3 class="sectionHeading">Choose your League</h3>
      <div class="search-input" v-if="itemsToShow">
        <input
          @keyup="search('leagues')"
          v-model="searchQuery"
          placeholder="Search..."
          type="text"
        /><IconSearch />
      </div>
      <hr />
      <div class="selectionBody">
        <div
          v-for="(item, index) in itemsToShow"
          :key="index"
          class="selectionItem"
          @click="next(item)"
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
            <a href="#" @click.prevent="showAddLeagueModal">
              <Icon name="add-plus-icon-cyrcle" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <div v-if="chooseClub">
      <Clubs></Clubs>
    </div>

    <!--  Add League Modal  -->
    <BaseModal
      @closed="hideAddLeagueModal"
      @update-leagues-list="getLeagues()"
      v-if="addLeagueModal"
      :modal-type="'add-league'"
    ></BaseModal>
  </div>
</template>

<script>
import store from '@/store';
import RepositoryFactory from '../../../../repositories/RepositoryFactory';
import SearchMixin from '@/mixins/DealCalculator/Search.mixin';
import IconSearch from '@/assets/icons/search.svg';
import BaseModal from '@/components/BaseModal';
import { MEDIA_RIGHTS } from "../../../../enums/dealCalculator/ContractTypes";

const DealRepository = RepositoryFactory.get('deal-steps-repository');

import Clubs from './Clubs';
import Icon from '@/components/Icon';

export default {
  name: 'Leagues',
  mixins: [SearchMixin],
  components: { Clubs, IconSearch, BaseModal, Icon },
  mounted() {
    this.getLeagues();
  },
  data: () => {
    return {
      leagues: null,
      chooseClub: false,
      addLeagueModal: false,
    };
  },
  computed: {
    contractType: () => {
      return store.getters['dealCalculator/getContractType'];
    },
    sport: () => {
      return store.getters['dealCalculator/getSport'];
    },
    mediaRightsType() {
      return MEDIA_RIGHTS;
    },
  },
  methods: {
    showAddLeagueModal() {
      this.addLeagueModal = true;
    },
    hideAddLeagueModal() {
      this.addLeagueModal = false;
    },
    getLeagues() {
      this.addLeagueModal = false;
      let $this = this;
      let response = null;
      if(this.sport) {
        response = DealRepository.getLeaguesBySportId(this.sport.id);
      }else {
        response = DealRepository.getLeagues();
      }
      response.then((response) => {
            $this.leagues = response.data.data;
            $this.itemsToShow = response.data.data;
      }).catch((error) => {
            $this.leagues = [];
            console.error(error);
          });

    },
    next(league) {
      store.dispatch('dealCalculator/addleague', league);
      if(this.contractType === this.mediaRightsType && this.sport && this.sport.has_league) {
        this.$emit('closeLeagues', true);
      }else {
        this.chooseClub = true;
      }

    },
  },
};
</script>

<style scoped>
.selectionItem img {
  max-width: 100%;
}

/* .search-input {
  display: inline-block;
} */

.add-league-wrapper {
  display: inline-block;
  margin-left: 30px;
}

.add-league-wrapper .button {
  padding: 6px 31px;
  margin: 0px;
}
</style>
