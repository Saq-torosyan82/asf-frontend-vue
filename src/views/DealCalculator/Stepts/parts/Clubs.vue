<template>
  <div>
    <h3 class="sectionHeading">Choose your Team</h3>
    <div class="search-input">
      <input
        @keyup="search('clubs')"
        v-model="searchQuery"
        placeholder="Search..."
        type="text"
      /><IconSearch />
    </div>
    <hr />
    <div v-if="clubs" class="selectionBody">
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
          <a href="#" @click.prevent="showAddClubModal">
            <Icon name="add-plus-icon-cyrcle" />
          </a>
        </div>
      </div>
    </div>
    <!--  Add League Modal  -->
    <BaseModal
      @closed="hideAddClubModal"
      @update-clubs-list="getClubs()"
      v-if="addClubModal"
      :modal-type="'add-club'"
    ></BaseModal>
  </div>
</template>

<script>
import store from '@/store';
import RepositoryFactory from '../../../../repositories/RepositoryFactory';
const DealRepository = RepositoryFactory.get('deal-steps-repository');
import SearchMixin from '@/mixins/DealCalculator/Search.mixin';
import IconSearch from '@/assets/icons/search.svg';
import BaseModal from '../../../../components/BaseModal';
import Icon from '@/components/Icon';

export default {
  name: 'Clubs',
  mixins: [SearchMixin],
  components: { IconSearch, BaseModal, Icon },
  mounted() {
    this.getClubs();
  },
  data: () => {
    return {
      logoDefault: '../../../../assets/img/dashboard/league.png',
      clubs: null,
      addClubModal: false,
    };
  },
  methods: {
    showAddClubModal() {
      this.addClubModal = true;
    },
    hideAddClubModal() {
      this.addClubModal = false;
    },
    getClubs() {
      this.addClubModal = false;
      let $this = this;
      let league = store.getters['dealCalculator/getLeague'];
      if (league) {
        DealRepository.getClubs(league.id)
          .then((response) => {
            $this.clubs = response.data.data;
            $this.itemsToShow = response.data.data;
          })
          .catch((error) => {
            $this.clubs = [];
            console.error(error);
          });
      }
    },
    next(club) {
      store.dispatch('dealCalculator/addClub', club);
      store.dispatch('dealCalculator/nextStep');
    },
  },
};
</script>

<style scoped>
.selectionItem img {
  max-width: 100%;
}

.add-club-wrapper {
  display: inline-block;
  margin-left: 30px;
}

.add-club-wrapper .button {
  padding: 6px 31px;
  margin: 0px;
}
</style>
