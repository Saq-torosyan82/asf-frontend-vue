<template>
  <div>
    <div v-if="this.currentStep == 2">
      <SelectInput
        label="Country"
        name="country"
        errorMsg="Country is required"
        :error="
          !this.validatorProps.form.athlete.step2.athleteCountry.required &&
          this.validatorProps.form.athlete.step2.athleteCountry.$dirty
        "
      >
        <select v-model="wizardData.athlete.step2.athleteCountry">
          <option value="" disabled selected hidden>
            Choose your country from the list
          </option>
          <option
            v-for="(country, i) in allCountries"
            :key="'country-' + i"
            class="option"
            :value="country.id"
          >
            {{ country.name }}
          </option>
        </select>
      </SelectInput>
      <CustomInput
        label="Street address"
        name="street-address"
        errorMsg="Street name is required."
        :error="
          !this.validatorProps.form.athlete.step2.athleteStreetAddress
            .required &&
          this.validatorProps.form.athlete.step2.athleteStreetAddress.$dirty
        "
      >
        <input
          type="text"
          placeholder="Street address"
          v-model="wizardData.athlete.step2.athleteStreetAddress"
        />
      </CustomInput>
      <b-row>
        <b-col
          ><CustomInput label="State (optional)" name="state">
            <input
              type="text"
              placeholder="State"
              v-model="wizardData.athlete.step2.athleteState"
            /> </CustomInput
        ></b-col>
        <b-col
          ><CustomInput
            label="City"
            name="City"
            errorMsg="City is required."
            :error="
              !this.validatorProps.form.athlete.step2.athleteCity.required &&
              this.validatorProps.form.athlete.step2.athleteCity.$dirty
            "
          >
            <input
              type="text"
              placeholder="City"
              v-model="wizardData.athlete.step2.athleteCity"
            /> </CustomInput
        ></b-col>
        <b-col
          ><CustomInput
            label="ZIP - Post code"
            name="zipcode"
            errorMsg="Zip code is required."
            :error="
              !this.validatorProps.form.athlete.step2.athleteZip.required &&
              this.validatorProps.form.athlete.step2.athleteZip.$dirty
            "
          >
            <input
              type="text"
              placeholder="Post code"
              v-model="wizardData.athlete.step2.athleteZip"
            /> </CustomInput
        ></b-col>
      </b-row>
    </div>
    <div v-if="this.currentStep == 3">
      <CustomInput
        label="Phone number"
        name="office-number"
        errorMsg="Phone number is required."
        :error="
          !this.validatorProps.form.athlete.step3.athletePhoneNumber.required &&
          this.validatorProps.form.athlete.step3.athletePhoneNumber.$dirty
        "
      >
        <vue-tel-input
          v-model="wizardData.athlete.step3.athletePhoneNumber"
        ></vue-tel-input>
      </CustomInput>
    </div>

    <div v-if="this.currentStep == 4">
      <SelectInput
        label="Sport"
        name="Sport"
        errorMsg="Sport is required."
        :error="
          !this.validatorProps.form.athlete.step4.sport.required &&
          this.validatorProps.form.athlete.step4.sport.$dirty
        "
      >
        <select
          v-model="wizardData.athlete.step4.sport"
          @change="fetchDataBySport"
        >
          <option value="" disabled selected>Choose from the list</option>
          <option
            v-for="(sport, i) in sports"
            :key="'sport-' + i"
            class="option"
            :value="sport"
          >
            {{ sport.name }}
          </option>
        </select>
      </SelectInput>

      <SelectInput
        v-if="wizardData.athlete.step4.sport.has_country && countries.length > 0"
        label="Country"
        name="Country"
        errorMsg="Country is required."
        :error="
          !this.validatorProps.form.athlete.step4.sportCountry.required &&
          this.validatorProps.form.athlete.step4.sportCountry.$dirty
        "
      >
        <select
          v-model="wizardData.athlete.step4.sportCountry"
          @change="fetchDataByCountry"
        >
          <option value="" disabled selected hidden>
            Choose from the list
          </option>
          <option
            v-for="(country, i) in countries"
            :key="'country-' + i"
            class="option"
            :value="country.id"
          >
            {{ country.name }}
          </option>
        </select>
      </SelectInput>

      <SelectInput
        v-if="wizardData.athlete.step4.sport.has_league && leagues.length > 0"
        label="League"
        name="League"
        errorMsg="League is required."
        :error="
          !this.validatorProps.form.athlete.step4.sportLeague.required &&
          this.validatorProps.form.athlete.step4.sportLeague.$dirty
        "
      >
        <select
          v-model="wizardData.athlete.step4.sportLeague"
          @change="fetchClubsByCountryAndLeague"
        >
          <option value="" disabled selected hidden>
            Choose from the list
          </option>
          <option
            v-for="(league, i) in leagues"
            :key="'league-' + i"
            class="option"
            :value="league.id"
          >
            {{ league.name }}
          </option>
        </select>
      </SelectInput>
      <SelectInput
        v-if="wizardData.athlete.step4.sport.has_club && clubs.length > 0"
        label="Team"
        name="Team"
        errorMsg="Team is required."
        :error="
          !this.validatorProps.form.athlete.step4.sportClub.required &&
          this.validatorProps.form.athlete.step4.sportClub.$dirty
        "
      >
        <select v-model="wizardData.athlete.step4.sportClub">
          <option value="" disabled selected hidden>
            Choose from the list
          </option>
          <option
            v-for="(club, i) in clubs"
            :key="'club' + i"
            class="option"
            :value="club.id"
          >
            {{ club.name }}
          </option>
        </select>
      </SelectInput>
    </div>
  </div>
</template>
<script>
//import SquareButton from "@/components/SquareButton.vue";
import store from "@/store";
import CustomInput from '@/components/CustomInput.vue';
import SelectInput from '@/components/SelectInput.vue';
import { VueTelInput } from 'vue-tel-input';

import RepositoryFactory from '../../../repositories/RepositoryFactory';
const SystemRepository = RepositoryFactory.get('system');

export default {
  name: 'FormAthlete',
  components: {
    //SquareButton,
    CustomInput,
    SelectInput,
    VueTelInput,
  },
  computed: {
    userProfile() {
      return store.getters['user/getUserInfo'];
    },
  },
  props: {
    wizardData: {
      type: Object,
      required: true,
    },
    validatorProps: {
      type: Object,
      required: true,
    },
    currentStep: { type: Number, required: true },
  },
  data() {
    return {
      allCountries: [],
      sports: [],
      countries: [],
      leagues: [],
      clubs: [],
    };
  },
  methods: {
    fetchDataBySport() {
      // Clean
      this.wizardData.athlete.step4.sportCountry = '';
      this.wizardData.athlete.step4.sportLeague = '';
      this.wizardData.athlete.step4.sportClub = '';

      if (
          this.wizardData.athlete.step4.sport !== '' &&
          this.wizardData.athlete.step4.sport.has_country &&
          this.wizardData.athlete.step4.sport.has_club &&
          this.wizardData.athlete.step4.sport.has_league
      ) {
        this.fetchCountriesBySport();
      } else if (
          this.wizardData.athlete.step4.sport !== '' &&
          this.wizardData.athlete.step4.sport.has_country
      ) {
        this.getCountriesBySport();
      }

      if (
          this.wizardData.athlete.step4.sport !== '' &&
          this.wizardData.athlete.step4.sport.has_club &&
          !this.wizardData.athlete.step4.sport.has_league
      ) {
        this.getClubsBySport(this.wizardData.athlete.step4.sport.id);
      }
    },
    fetchDataByCountry() {
      if (!this.wizardData.athlete.step4.sport.has_league) {
        this.fetchClubsByCountryAndSport();
      } else {
        this.fetchLeaguesByCountryAndSport();
      }
    },

    fetchClubsByCountryAndSport() {
      // Clean Up
      this.clubs = [];
      this.wizardData.athlete.step4.sportClub = '';

      let countryId = this.wizardData.athlete.step4.sportCountry,
          sportId = this.wizardData.athlete.step4.sport.id;
      let $this = this;
      $this.$loading(true);
      SystemRepository.getClubsByCountryAndSport(countryId, sportId)
          .then((response) => {
            this.clubs = response.data.data;
            $this.$loading(false);
          })
          .catch((error) => {
            console.error(error);
            $this.$loading(false);
          });
    },

    fetchLeaguesByCountryAndSport() {
      // Clean Up
      this.clubs = this.leagues = [];
      this.wizardData.athlete.step4.sportLeague =
          this.wizardData.athlete.step4.sportClub = '';

      var countryId = this.wizardData.athlete.step4.sportCountry,
          sportId = this.wizardData.athlete.step4.sport.id;

      let $this = this;
      $this.$loading(true);
      SystemRepository.getLeaguesByCountryAndSport(countryId, sportId)
          .then((response) => {
            this.leagues = response.data.data;
            $this.$loading(false);
          })
          .catch((error) => {
            console.error(error);
            $this.$loading(false);
          });
    },

    initData() {
      SystemRepository.getCountries()
        .then((response) => {
          this.allCountries = response.data.data;
        })
        .catch((error) => {
          this.allCountries = [];
          console.error(error);
        });

      SystemRepository.getSports()
        .then((response) => {
          this.sports = response.data.data;
        })
        .catch((error) => {
          this.sports = [];
          console.error(error);
        });
    },

    fetchCountriesBySport() {
      // Clean Up
      this.countries = this.leagues = this.clubs = [];
      this.wizardData.athlete.step4.sportLeague =
        this.wizardData.athlete.step4.sportCountry =
        this.wizardData.athlete.step4.sportClub =
          '';

      let $this = this;
      $this.$loading(true);
      var sportId = this.wizardData.athlete.step4.sport.id;
      SystemRepository.getCountriesBySport(sportId)
        .then((response) => {
          $this.countries = response.data.data;
          $this.$loading(false);
        })
        .catch((error) => {
          console.error(error);
          $this.$loading(false);
        });
    },
    // is duplicated of fetchCountriesBySport , is temporary because need some changes in api
    getCountriesBySport() {
      // Clean Up
      this.countries = this.leagues = this.clubs = [];
      this.wizardData.athlete.step4.sportLeague =
          this.wizardData.athlete.step4.sportCountry =
              this.wizardData.athlete.step4.sportClub =
                  '';

      var sportId = this.wizardData.athlete.step4.sport.id;
      let $this = this;
      $this.$loading(true);
      SystemRepository.getCountriesBySportId(sportId)
          .then((response) => {
            this.countries = response.data;
            $this.$loading(false);
          })
          .catch((error) => {
            console.error(error);
            $this.$loading(false);
          });
    },
    fetchLeaguesByCountry() {
      // Clean Up
      this.clubs = this.leagues = [];
      this.wizardData.athlete.step4.sportLeague =
        this.wizardData.athlete.step4.sportClub = '';

      var countryId = this.wizardData.athlete.step4.sportCountry,
        sportId = this.wizardData.athlete.step4.sport;

      let $this = this;
      SystemRepository.getLeaguesByCountryAndSport(countryId, sportId)
        .then((response) => {
          this.leagues = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getClubsBySport(sportId) {
      //cleanup
      this.clubs = [];
      this.wizardData.athlete.step4.sportClub = '';

      let $this = this;
      $this.$loading(true);
      SystemRepository.getClubsBySport(sportId)
          .then((response) => {
            this.clubs = response.data.data;
            $this.$loading(false);
          })
          .catch((error) => {
            console.error(error);
            $this.$loading(false);
          });
    },
    fetchClubsByCountryAndLeague() {
      //cleanup
      this.clubs = [];
      this.wizardData.athlete.step4.sportClub = '';

      var countryId = this.wizardData.athlete.step4.sportCountry,
        leagueId = this.wizardData.athlete.step4.sportLeague;

      let $this = this;
      SystemRepository.getClubsByCountryAndLeague(countryId, leagueId)
        .then((response) => {
          this.clubs = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  mounted() {
    this.initData();
  },
};
</script>
