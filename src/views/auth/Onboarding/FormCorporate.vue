<template>
  <div>
    <div v-if="this.currentStep == 2">
      <SelectInput
        label="Sport"
        name="Sport"
        errorMsg="Sport is required."
        :error="
          !this.validatorProps.form.corporate.step2.corpSport.required &&
          this.validatorProps.form.corporate.step2.corpSport.$dirty
        "
      >
        <select
          v-model="wizardData.corporate.step2.corpSport"
          @change="fetchDataBySport"
        >
          <option value="" disabled selected hidden>
            Choose from the list
          </option>
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
       v-if="wizardData.corporate.step2.corpSport.has_country && countries.length > 0"
        label="Country"
        name="Country"
        errorMsg="Country is required."
        :error="
          !this.validatorProps.form.corporate.step2.corpSportCountry.required &&
          this.validatorProps.form.corporate.step2.corpSportCountry.$dirty
        "
      >
        <select
          v-model="wizardData.corporate.step2.corpSportCountry"
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
        v-if="wizardData.corporate.step2.corpSport.has_league && leagues.length > 0"
        label="League"
        name="League"
        errorMsg="League is required."
        :error="
          !this.validatorProps.form.corporate.step2.corpLeague.required &&
          this.validatorProps.form.corporate.step2.corpLeague.$dirty
        "
      >
        <select
          v-model="wizardData.corporate.step2.corpLeague"
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
          v-if="wizardData.corporate.step2.corpSport.has_club && clubs.length > 0"
        label="Team"
        name="Team"
        errorMsg="Team is required."
        :error="
          !this.validatorProps.form.corporate.step2.corpClub.required &&
          this.validatorProps.form.corporate.step2.corpClub.$dirty
        "
      >
        <select v-model="wizardData.corporate.step2.corpClub">
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

    <div v-if="this.currentStep == 3">
      <CustomInput
        label="Position"
        name="position"
        errorMsg="Position is required."
        :error="
          !this.validatorProps.form.corporate.step3.corpPosition.required &&
          this.validatorProps.form.corporate.step3.corpPosition.$dirty
        "
      >
        <input
          type="text"
          placeholder="Position"
          v-model="wizardData.corporate.step3.corpPosition"
        />
      </CustomInput>

      <CustomInput
        label="Phone number"
        name="phone-number"
        errorMsg="Phone number is required."
        :error="
          !this.validatorProps.form.corporate.step3.corpPhone.required &&
          this.validatorProps.form.corporate.step3.corpPhone.$dirty
        "
      >
        <vue-tel-input
          v-model="wizardData.corporate.step3.corpPhone"
        ></vue-tel-input>
      </CustomInput>
      <CustomInput
        label="Office number"
        name="office-number"
        errorMsg="Office number is required."
        :error="
          !this.validatorProps.form.corporate.step3.corpOfficePhone.required &&
          this.validatorProps.form.corporate.step3.corpOfficePhone.$dirty
        "
      >
        <vue-tel-input
          v-model="wizardData.corporate.step3.corpOfficePhone"
        ></vue-tel-input>
      </CustomInput>
    </div>

    <div v-if="this.currentStep == 4">
      <SelectInput
        label="Country"
        name="country"
        errorMsg="Country is required."
        :error="
          !this.validatorProps.form.corporate.step4.corpCountry.required &&
          this.validatorProps.form.corporate.step4.corpCountry.$dirty
        "
      >
        <select v-model="wizardData.corporate.step4.corpCountry">
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
        errorMsg="Street address is required."
        :error="
          !this.validatorProps.form.corporate.step4.corpStreetAddress
            .required &&
          this.validatorProps.form.corporate.step4.corpStreetAddress.$dirty
        "
      >
        <input
          type="text"
          placeholder="Street address"
          v-model="wizardData.corporate.step4.corpStreetAddress"
        />
      </CustomInput>
      <b-row>
        <b-col
          ><CustomInput label="State (optional)" name="state">
            <input
              type="text"
              placeholder="State"
              v-model="wizardData.corporate.step4.corpState"
            /> </CustomInput
        ></b-col>
        <b-col
          ><CustomInput
            label="City"
            name="City"
            errorMsg="City is required."
            :error="
              !this.validatorProps.form.corporate.step4.corpCity.required &&
              this.validatorProps.form.corporate.step4.corpCity.$dirty
            "
          >
            <input
              type="text"
              placeholder="City"
              v-model="wizardData.corporate.step4.corpCity"
            /> </CustomInput
        ></b-col>
        <b-col
          ><CustomInput
            label="ZIP - Post code"
            name="zipcode"
            errorMsg="City is required."
            :error="
              !this.validatorProps.form.corporate.step4.corpZIP.required &&
              this.validatorProps.form.corporate.step4.corpZIP.$dirty
            "
          >
            <input
              type="text"
              placeholder="Post code"
              v-model="wizardData.corporate.step4.corpZIP"
            /> </CustomInput
        ></b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
//import SquareButton from "@/components/SquareButton.vue";
import CustomInput from '@/components/CustomInput.vue';
import SelectInput from '@/components/SelectInput.vue';
import { VueTelInput } from 'vue-tel-input';
import RepositoryFactory from '../../../repositories/RepositoryFactory';
const SystemRepository = RepositoryFactory.get('system');

export default {
  name: 'FormInitial',
  components: {
    //SquareButton,
    CustomInput,
    SelectInput,
    VueTelInput,
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
      this.wizardData.corporate.step2.corpSportCountry = '';
      this.wizardData.corporate.step2.corpLeague = '';
      this.wizardData.corporate.step2.corpClub = '';

      if (
          this.wizardData.corporate.step2.corpSport !== '' &&
          this.wizardData.corporate.step2.corpSport.has_country &&
          this.wizardData.corporate.step2.corpSport.has_club &&
          this.wizardData.corporate.step2.corpSport.has_league
      ) {
        this.fetchCountriesBySport();
      } else if (
          this.wizardData.corporate.step2.corpSport !== '' &&
          this.wizardData.corporate.step2.corpSport.has_country
      ) {
        this.getCountriesBySport();
      }

      if (
          this.wizardData.corporate.step2.corpSport !== '' &&
          this.wizardData.corporate.step2.corpSport.has_club &&
          !this.wizardData.corporate.step2.corpSport.has_league
      ) {
        this.getClubsBySport(this.wizardData.corporate.step2.corpSport.id);
      }
    },

    fetchDataByCountry() {
      if (!this.wizardData.corporate.step2.corpSport.has_league) {
        this.fetchClubsByCountryAndSport();
      } else {
        this.fetchLeaguesByCountryAndSport();
      }
    },

    fetchClubsByCountryAndSport() {
      // Clean Up
      this.clubs = [];
      this.wizardData.corporate.step2.corpClub = '';

      let countryId = this.wizardData.corporate.step2.corpSportCountry,
          sportId = this.wizardData.corporate.step2.corpSport.id;
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
      this.wizardData.corporate.step2.corpLeague =
          this.wizardData.corporate.step2.corpClub = '';

      var countryId = this.wizardData.corporate.step2.corpSportCountry,
          sportId = this.wizardData.corporate.step2.corpSport.id;

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

    getClubsBySport(sportId) {
      //cleanup
      this.clubs = [];
      this.wizardData.corporate.step2.corpClub = '';

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

    getCountriesBySport() {
      // Clean Up
      this.countries = this.leagues = this.clubs = [];
      this.wizardData.corporate.step2.corpLeague =
          this.wizardData.corporate.step2.corpSportCountry =
              this.wizardData.corporate.step2.corpClub =
                  '';

      var sportId = this.wizardData.corporate.step2.corpSport.id;
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
    getCountries() {
      let $this = this;
      SystemRepository.getCountries()
        .then((response) => {
          $this.allCountries = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    getSports() {
      let $this = this;
      SystemRepository.getSports()
        .then((response) => {
          $this.sports = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    fetchCountriesBySport() {
      // Clean Up
      this.countries = this.leagues = this.clubs = [];
      this.wizardData.corporate.step2.corpLeague =
        this.wizardData.corporate.step2.corpSportCountry =
        this.wizardData.corporate.step2.corpClub =
          '';

      let $this = this;
      var sportId = this.wizardData.corporate.step2.corpSport.id;
      SystemRepository.getCountriesBySport(sportId)
        .then((response) => {
          $this.countries = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchLeaguesByCountry() {
      // Clean Up
      this.clubs = this.leagues = [];
      this.wizardData.corporate.step2.corpLeague =
        this.wizardData.corporate.step2.corpClub = '';

      var countryId = this.wizardData.corporate.step2.corpSportCountry,
        sportId = this.wizardData.corporate.step2.corpSport.id;

      let $this = this;
      SystemRepository.getLeaguesByCountryAndSport(countryId, sportId)
        .then((response) => {
          this.leagues = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchClubsByCountryAndLeague() {
      //cleanup
      this.clubs = [];
      this.wizardData.corporate.step2.corpClub = '';

      var countryId = this.wizardData.corporate.step2.corpSportCountry,
        leagueId = this.wizardData.corporate.step2.corpLeague;

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
    this.getCountries();
    this.getSports();
  },
};
</script>
