<template>
  <div v-if="sport.has_club || sport.has_country || sport.has_league">
    <h3 class="section-header">{{ header }}</h3>
    <div class="clubs">
      <div v-for="(club, index) in clubs" :key="index" class="club">
        <img :src="club.logo" />
        <p class="clubs-label">{{ club.name }}</p>
      </div>
    </div>
    <div v-if="clubs.length <= 0" class="no-clubs">
      <p class="no-clubs">There are no previous clubs.</p>
    </div>
    <div class="add-new-team">
      <a href="#" @click.prevent="addNewClub" class="link-text">+ Add team</a>
    </div>
    <AddPrevTeamsModal
      v-if="addTeam"
      @closeModal="closeModal"
    ></AddPrevTeamsModal>
  </div>
</template>

<script>
import store from '@/store';
import AddPrevTeamsModal from './AddPrevTeamsModal';

import RepositoryFactory from '../../repositories/RepositoryFactory';
const SystemRepository = RepositoryFactory.get('system');

export default {
  name: 'Clubs',
  data() {
    return {
      addTeam: false,
      sport: {},
    };
  },
  mounted() {
    this.getSports();
  },
  components: {
    AddPrevTeamsModal,
  },
  props: {
    clubs: {
      required: true,
    },
    header: String,
  },
  computed: {
    sportId() {
      return store.getters['user/getSportId'];
    },
  },
  methods: {
    addNewClub() {
      this.addTeam = true;
    },
    closeModal() {
      this.addTeam = false;
      this.$emit('teamAdded', true);
    },
    getSports() {
      let self = this;
      SystemRepository.getSportById(this.sportId)
        .then((response) => {
          store.dispatch('user/storeUserSport', response.data.data[0]);
          self.sport = response.data.data[0];
        })
        .catch((error) => {
          console.error(error);
          self.sport = null;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
/* .clubs {
  margin-top: 25px;
} */
.add-new-team {
  margin-top: 15px;
}
.no-clubs {
  font-size: 14px;
  margin-top: 10px;
  color: #93a0ae;
  font-weight: 600;
}
</style>
