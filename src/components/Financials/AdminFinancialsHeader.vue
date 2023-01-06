<template>
  <div class="financials-header">
    <SelectInput>
      <select v-model="sport">
        <option
          v-for="(sport, index) in sports"
          :key="index"
          :value="sport.id"
          selected
        >
          {{ sport.name }}
        </option>
      </select>
    </SelectInput>
    <SelectInput>
      <select v-model="country" @change="getLeaguesByCountryAndSport">
        <option value="" disabled selected>Country</option>
        <option
          class="option"
          v-for="(country, index) in countries"
          :key="index"
          :value="country.id"
        >
          {{ country.name }}
        </option>
      </select>
    </SelectInput>
    <SelectInput>
      <select v-model="league" @change="getClubs">
        <option value="" disabled selected>League</option>
        <option
          class="option"
          v-for="(league, index) in leagues"
          :key="index"
          :value="league.id"
        >
          {{ league.name }}
        </option>
      </select>
    </SelectInput>
    <SelectInput class="club">
      <select v-model="club" @change="getClubFinancials">
        <option value="" disabled selected>Club</option>
        <option
          class="option"
          v-for="(club, index) in clubs"
          :key="index"
          :value="club.id"
        >
          {{ club.name }}
        </option>
      </select>
    </SelectInput>

    <CurrencySelect
      :default-currency="defaultCurrency"
      class="currency-select"
      @selectedCurrency="onSelectedCurrency"
    />
    <router-link class="view-reports-button" :to="'snapshot-report/' + club" :disabled="!club"
                 :event="club ? 'click' : ''">
      <Icon name="view-reports" />
      View reports
    </router-link>
  </div>
</template>

<script>
import store from '@/store';
import Icon from '@/components/Icon';
import SelectInput from '@/components/SelectInput';
import CurrencySelect from '@/components/Financials/CurrencySelect';

import RepositoryFactory from '../../repositories/RepositoryFactory';
const SystemRepository = RepositoryFactory.get('system');
const FinancialRepository = RepositoryFactory.get('financial');
import FinancialMixin from '@/mixins/Financial/Financial.Mixin';

export default {
  components: {
    Icon,
    SelectInput,
    CurrencySelect,
  },
  mixins: [FinancialMixin],
  data() {
    return {
      leagues: [],
      clubs: [],
      sports: [],
      defaultCurrency: '',
      selectedCurrency: '',
    };
  },
  mounted() {
    this.getSports();
    this.league = '';
    this.club = '';
    this.country = '';
  },
  asyncComputed: {
    async countries() {
      let response = await SystemRepository.getCountries();
      return response.data.data;
    },
    async leagues() {
      let response = await SystemRepository.getLeagues();
      return response.data.data;
    },
  },
  computed: {
    country: {
      get() {
        return store.getters['Financials/getFilterCountry'];
      },
      set(value) {
        store.commit('Financials/updateFilterCountry', value);
      },
    },
    sport: {
      get() {
        return store.getters['Financials/getFilterSport'];
      },
      set(value) {
        store.commit('Financials/updateFilterSport', value);
      },
    },
    league: {
      get() {
        return store.getters['Financials/getFilterLeague'];
      },
      set(value) {
        store.commit('Financials/updateFilterLeague', value);
      },
    },
    club: {
      get() {
        return store.getters['Financials/getFilterClub'];
      },
      set(value) {
        store.commit('Financials/updateFilterClub', value);
      },
    },
  },
  methods: {
    getLeaguesByCountryAndSport() {
      this.leagues = [];
      this.clubs = [];
      this.club = '';
      this.league = '';
      this.$emit('changeLeagueCountry');
      this.setDefaultCurrency();
      if (this.country !== '' && this.sport !== '') {
        let $this = this;
        $this.$loading(true);
        SystemRepository.getLeaguesByCountryAndSport(this.country, this.sport)
          .then((response) => {
            $this.leagues = response.data.data;
            $this.$loading(false);
          })
          .catch((error) => {
            console.error(error);
            $this.leagues = [];
            $this.$loading(false);
          });
      }
    },
    getClubs() {
      this.setDefaultCurrency();
      this.clubs = [];
      this.club = '';
      this.$emit('changeLeagueCountry');
      if (this.league !== '') {
        let $this = this;
        $this.$loading(true);
        SystemRepository.getClubsByCountryAndLeague(this.country, this.league)
          .then((response) => {
            $this.clubs = response.data.data;
            $this.$loading(false);
          })
          .catch((error) => {
            console.error(error);
            $this.clubs = [];
            $this.$loading(false);
          });
      }
    },
    getClubFinancials() {
      let $this = this;
      FinancialRepository.getClubFinancials(this.club, this.selectedCurrency)
        .then((response) => {
          store.dispatch('Financials/storeData', response.data);

          if (!$this.selectedCurrency) {
            $this.setDefaultCurrency(response.data.defaultCurrency);
          }

          $this.getDocuments($this.club);
          $this.$emit('clubChanged', $this.club);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    onSelectedCurrency(currency) {
      this.selectedCurrency = currency;
      this.getClubFinancials();
    },
    getSports() {
      let $this = this;
      SystemRepository.getSports()
        .then((response) => {
          $this.sports = response.data.data;
          this.sport = $this.sports[0].id;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    setDefaultCurrency(currency = '') {
      this.defaultCurrency = currency;
    },
  },
};
</script>

<style lang="scss" scoped>
.financials-header {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  min-height: 110px;
  padding: 25px 40px;
  border-radius: 10px;
  background-color: #ffffff;
  gap: 13px;
}
.financials-header img {
  width: 56px;
  height: 56px;
}
.financials-header .user-information {
  margin-left: 20px;
}
.financials-header .user-information h5 {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 4px;
}
.financials-header .user-information p {
  font-size: 14px;
  color: #707d8c;
  margin: 0;
}
.club {
  margin-right: auto !important;
}
/* .currency-select {
  margin: 0 24px 0 auto;
} */
.view-reports-button {
  display: inline-flex;
  align-items: center;
  padding: 9px 20px;
  border-radius: 4px;
  background-color: #3a9eba;
  color: white;
  font-size: 14px;
  font-weight: 700;
  gap: 7px;
  white-space: nowrap;
}
select {
  min-width: 120px;
  padding-right: 63px;
  margin-top: 0;
}
.input-wrap:last-child {
  margin-right: 0;
}

.v-autocomplete {
  max-width: 110px;
  border: 1px solid var(--primary);

  ::v-deep {
    .v-input__control {
      min-height: 36px;
    }
    .v-input__append-inner {
      padding-left: 0;
    }
    .v-input__slot.v-input__slot {
      font-size: 12px;
      padding: 0 0 0 5px !important;
      .v-select__slot {
        input {
          color: #253242;
          text-transform: capitalize;
        }
      }

      .v-label {
        color: #707d8c;
        font-size: 13px;
      }
      .v-icon {
        padding-top: 2px;
        font-size: 20px;
      }
    }
  }
}
</style>
