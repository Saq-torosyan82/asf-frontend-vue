<template>
  <div class="modal-wrapper">
    <div class="modal-base" style="overflow: auto">
      <h5>Add previous team</h5>

      <div @click="closeModal" class="close-icon">
        <icon name="close" />
      </div>

      <div
        v-for="(team, key) in form.teams"
        :key="key"
        class="previous-team-wrapper"
      >
        <SelectInput
          v-if="sport.has_country"
          label="Country"
          errorMsg="Country is required."
          :error="
            $v.form.teams.$each[key].country.$error &&
            $v.form.teams.$each[key].country.$dirty
          "
        >
          <select
            v-model="form.teams[key].country"
            @change="selectCountry(key)"
          >
            <option value>Choose from list</option>
            <option
              v-for="(country, key) in countries"
              :value="country.id"
              :key="key"
            >
              {{ country.name }}
            </option>
          </select>
        </SelectInput>
        <SelectInput
          v-if="sport.has_league"
          label="League"
          errorMsg="League is required."
          :error="
            $v.form.teams.$each[key].league.$error &&
            $v.form.teams.$each[key].league.$dirty
          "
        >
          <select v-model="form.teams[key].league" @change="getClubs(key)">
            <option value>Choose from list</option>
            <option
              v-for="(league, key) in form.teams[key].leagues"
              :value="league.id"
              :key="key"
            >
              {{ league.name }}
            </option>
          </select>
        </SelectInput>
        <SelectInput
          v-if="sport.has_club"
          label="Team"
          errorMsg="Team is required."
          :error="
            $v.form.teams.$each[key].team.$error &&
            $v.form.teams.$each[key].team.$dirty
          "
        >
          <select v-model="form.teams[key].team">
            <option value>Choose from list</option>
            <option
              v-for="(club, key) in form.teams[key].clubs"
              :value="club.id"
              :key="key"
            >
              {{ club.name }}
            </option>
          </select>
        </SelectInput>
        <hr />
      </div>
      <a href="#" @click.prevent="addPrevTeam()" class="link-text"
        >+ Add additional previous team</a
      >
      <a href="#" @click.prevent="submitData" class="submit-button">Submit</a>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import SelectInput from '../SelectInput';

import RepositoryFactory from '../../repositories/RepositoryFactory';
import { required, requiredIf } from 'vuelidate/lib/validators';
const SystemRepository = RepositoryFactory.get('system');
const UserRepository = RepositoryFactory.get('user');

export default {
  name: 'AddPrevTeamsModal',
  components: {
    SelectInput,
  },
  mounted() {
    if (this.case3) this.getClubs(0);
  },
  data() {
    return {
      form: {
        teams: [
          {
            country: '',
            league: '',
            team: '',
            leagues: [],
            clubs: [],
          },
        ],
      },
    };
  },
  validations() {
    return {
      form: {
        teams: {
          $each: {
            country: {
              required: requiredIf(function () {
                return this.sport.has_country;
              }),
            },
            league: {
              required: requiredIf(function () {
                return this.sport.has_league;
              }),
            },
            team: {
              required: requiredIf(function () {
                return this.sport.has_club;
              }),
            },
          },
        },
      },
    };
  },
  asyncComputed: {
    async countries() {
      if (this.case1) {
        let response = await SystemRepository.getCountriesBySport(
          this.sport.id
        );
        return response.data.data;
      } else if (this.case2) {
        let response = await SystemRepository.getSportCountries(this.sport.id);
        return response.data.data;
      }
      return null;
    },
  },
  computed: {
    sport() {
      return store.getters['user/getSport'];
    },
    case1() {
      return (
        this.sport.has_country === true &&
        this.sport.has_club === true &&
        this.sport.has_league === true
      );
    },
    case2() {
      return (
        this.sport.has_country === true &&
        this.sport.has_club === true &&
        this.sport.has_league === false
      );
    },
    case3() {
      return (
        this.sport.has_country === false &&
        this.sport.has_club === true &&
        this.sport.has_league === false
      );
    },
  },
  methods: {
    closeModal() {
      this.$emit('closeModal', true);
    },
    addPrevTeam() {
      this.form.teams.push({
        country: '',
        league: '',
        team: '',
        leagues: [],
        clubs: [],
      });
      if (this.case3) this.getClubs(this.form.teams.length - 1);
    },
    selectCountry(key) {
      if (this.case1) {
        this.getLeagues(key);
      } else if (this.case2) {
        this.getClubs(key);
      }
    },
    getLeagues(key) {
      let self = this;
      self.$loading(true);
      SystemRepository.getLeaguesByCountryAndSport(
        this.form.teams[key].country,
        this.sport.id
      )
        .then((response) => {
          self.form.teams[key].leagues = response.data.data;
          self.$loading(false);
        })
        .catch((error) => {
          self.form.teams[key].leagues = [];
          self.$loading(false);
          console.error(error);
        });
    },
    getClubs(key) {
      let self = this;
      self.$loading(true);
      if (this.case1) {
        SystemRepository.getClubsByCountryAndLeague(
          this.form.teams[key].country,
          this.form.teams[key].league
        )
          .then((response) => {
            self.form.teams[key].clubs = response.data.data;
            self.$loading(false);
          })
          .catch((error) => {
            self.form.teams[key].clubs = [];
            self.$loading(false);
            console.error(error);
          });
      } else if (this.case2) {
        SystemRepository.getClubsByCountryAndSport(
          this.form.teams[key].country,
          this.sport.id
        )
          .then((response) => {
            self.form.teams[key].clubs = response.data.data;
            self.$loading(false);
          })
          .catch((error) => {
            self.form.teams[key].clubs = [];
            self.$loading(false);
            console.error(error);
          });
      } else {
        SystemRepository.getClubsBySport(this.sport.id)
          .then((response) => {
            self.form.teams[key].clubs = response.data.data;
            self.$loading(false);
          })
          .catch((error) => {
            self.form.teams[key].clubs = [];
            self.$loading(false);
            console.error(error);
          });
      }
    },
    submitData() {
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        let self = this;
        self.$loading(true);
        let data = [];
        this.form.teams.map(function (item) {
          data.push(item.team);
        });
        UserRepository.addPrevTeam({
          teams: data,
        })
          .then(() => {
            self.$loading(false);
            self.closeModal();
          })
          .catch((error) => {
            self.$loading(false);
            console.error(error);
          });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.modal-base {
  margin: 4vh auto auto;
  max-height: 90%;
}
a.link-text {
  display: block;
  padding-bottom: 5px;
}
.previous-team-wrapper {
  margin: 20px 0;
  hr {
    margin: 25px 0;
  }
}
.submit-button {
  background-color: var(--primary);
  color: white;
  font-size: 14px;
  font-weight: 700;
  padding: 15px 75px;
  border-radius: 4px;
  display: block;
  margin-top: 15px;
}
</style>
<style lang="scss" src="@/assets/styles/modal.scss"></style>
