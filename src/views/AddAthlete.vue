<template>
  <div>
    <div class="user-information">
      <div
        v-if="userAlreadyAssignedError"
        class="alert alert-danger"
        role="alert"
      >
        This User is already assigned to another Agent
      </div>
      <div
        v-if="emailAlreadyTakenError"
        class="alert alert-danger"
        role="alert"
      >
        This email is already taken
      </div>
      <div class="inner-component">
        <section id="form">
          <CustomInput
            label="First Name"
            name="first-name"
            :error="
              $v.userProfile.account.first_name.$error &&
              $v.userProfile.account.first_name.$dirty
            "
            errorMsg="Valid first name is required."
          >
            <input
              type="text"
              placeholder="First Name"
              v-model="userProfile.account.first_name"
            />
          </CustomInput>
          <CustomInput
            label="Last Name"
            name="last-name"
            :error="
              $v.userProfile.account.last_name.$error &&
              $v.userProfile.account.last_name.$dirty
            "
            errorMsg="Valid last name is required."
          >
            <input
              type="text"
              placeholder="Last Name"
              v-model="userProfile.account.last_name"
            />
          </CustomInput>
          <CustomInput
            label="Email"
            name="email"
            :error="
              $v.userProfile.account.email.$error &&
              $v.userProfile.account.email.$dirty
            "
            errorMsg="Valid email is required."
          >
            <input
              type="text"
              placeholder="Enter athlete's email"
              v-model="userProfile.account.email"
            />
          </CustomInput>
          <p style="margin-top: 20px">Athlete's photo (optional)</p>
          <div class="upload">
            <div class="user-avatar"></div>
            <div class="user-info with-image">
              <a href="#" class="link-text" @click="$refs.fileInput.click()">
                <icon name="edit-icon" />Add photo
              </a>
              <input
                type="file"
                @change="uploadFile"
                accept="image/png, image/jpeg, image/png"
                ref="fileInput"
                style="display: none"
              />
            </div>
          </div>
          <CustomInput
            label="Phone Number"
            name="phone-number"
            :error="
              $v.userProfile.contact.phone.$error &&
              $v.userProfile.contact.phone.$dirty
            "
            errorMsg="Valid phone is required."
          >
            <vue-tel-input v-model="userProfile.contact.phone"></vue-tel-input>
          </CustomInput>
          <SelectInput
            label="Country"
            name="country"
            :error="
              $v.userProfile.address.country.$error &&
              $v.userProfile.address.country.$dirty
            "
            errorMsg="Valid country is required."
          >
            <select v-model="userProfile.address.country">
              <option value="" disabled selected hidden>
                Choose your country from the list
              </option>
              <option
                v-for="country in countries"
                :key="'country-' + country.id"
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
            :error="
              $v.userProfile.address.street.$error &&
              $v.userProfile.address.street.$dirty
            "
            errorMsg="Valid street is required."
          >
            <input
              type="text"
              placeholder="Street address"
              v-model="userProfile.address.street"
            />
          </CustomInput>
          <CustomInput
            label="State (optional)"
            name="state"
            :error="
              $v.userProfile.address.state.$error &&
              $v.userProfile.address.state.$dirty
            "
            errorMsg="Valid state is required."
          >
            <input
              type="text"
              placeholder="State"
              v-model="userProfile.address.state"
            />
          </CustomInput>
          <b-row>
            <b-col
              ><CustomInput
                label="City"
                name="City"
                :error="
                  $v.userProfile.address.city.$error &&
                  $v.userProfile.address.city.$dirty
                "
                errorMsg="Valid city is required."
              >
                <input
                  type="text"
                  placeholder="City"
                  v-model="userProfile.address.city"
                /> </CustomInput
            ></b-col>
            <b-col
              ><CustomInput
                label="ZIP - Post code"
                name="zipcode"
                :error="
                  $v.userProfile.address.zip.$error &&
                  $v.userProfile.address.zip.$dirty
                "
                errorMsg="Valid zip is required."
              >
                <input
                  type="text"
                  placeholder="Post code"
                  v-model="userProfile.address.zip"
                /> </CustomInput
            ></b-col>
          </b-row>

          <SelectInput label="Sport" name="Sport">
            <select
              v-model="userProfile.professional.sport"
              @change="fetchDataBySport"
            >
              <option value="" disabled selected hidden>
                Choose from the list
              </option>
              <option
                v-for="(sport, i) in allSports"
                :key="'sport-' + i"
                class="option"
                :value="sport"
              >
                {{ sport.name }}
              </option>
            </select>
          </SelectInput>
          <SelectInput
            v-if="
              userProfile.professional.sport &&
              userProfile.professional.sport.has_country
            "
            label="Country"
            name="country"
          >
            <select
              v-model="userProfile.professional.country"
              @change="fetchDataByCountry"
            >
              <option value="" disabled selected hidden>
                Choose your country from the list
              </option>
              <option
                v-for="country in allCountries"
                :key="'country-' + country.id"
                class="option"
                :value="country.id"
              >
                {{ country.name }}
              </option>
            </select>
          </SelectInput>
          <SelectInput
            v-if="
              userProfile.professional.sport &&
              userProfile.professional.sport.has_league
            "
            label="League"
            name="League"
          >
            <select
              v-model="userProfile.professional.league"
              @change="fetchClubsByCountryAndLeague"
            >
              <option value="" disabled selected hidden>
                Choose from the list
              </option>
              <option
                v-for="league in allLeagues"
                :key="'league-' + league.id"
                class="option"
                :value="league.id"
              >
                {{ league.name }}
              </option>
            </select>
          </SelectInput>
          <SelectInput
            v-if="
              userProfile.professional.sport &&
              userProfile.professional.sport.has_club
            "
            label="Team"
            name="Team"
          >
            <select v-model="userProfile.professional.club">
              <option value="" disabled selected hidden>
                Choose from the list
              </option>
              <option
                v-for="club in allClubs"
                :key="'club-' + club.id"
                class="option"
                :value="club.id"
              >
                {{ club.name }}
              </option>
            </select>
          </SelectInput>
          <a href="#" class="button" @click.prevent="createAthlete()">Save</a>
        </section>
      </div>
    </div>
    <div class="blank component"></div>
  </div>
</template>

<script>
import CustomInput from '@/components/CustomInput.vue';
import SelectInput from '@/components/SelectInput.vue';
import store from '@/store';
import RepositoryFactory from '../repositories/RepositoryFactory';
const UserRepository = RepositoryFactory.get('user');
const SystemRepository = RepositoryFactory.get('system');
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'AddAthlete',
  components: {
    CustomInput,
    SelectInput,
  },
  data() {
    return {
      showModal: false,
      modalType: '',
      userProfile: {
        address: {},
        contact: {},
        professional: {},
        account: {},
      },
      allSports: [],
      allCountries: [],
      allLeagues: [],
      allClubs: [],
      countries: [],
      userAlreadyAssignedError: false,
      emailAlreadyTakenError: false,
    };
  },
  validations() {
    return {
      userProfile: {
        address: {
          country: { required },
          street: { required },
          state: {},
          city: { required },
          zip: { required },
        },
        contact: {
          phone: { required },
        },
        account: {
          email: { required },
          first_name: { required },
          last_name: { required },
        },
      },
    };
  },
  mounted() {
    this.getCountries();
    this.getSports();
  },
  computed: {
    agentHash() {
      return store.getters['editUser/getHash'];
    },
  },
  methods: {
    fetchDataBySport() {
      // Clean
      this.userProfile.professional = {
        sport: this.userProfile.professional.sport,
      };
      if (
        this.userProfile.professional.sport !== '' &&
        this.userProfile.professional.sport.has_country &&
        this.userProfile.professional.sport.has_club &&
        this.userProfile.professional.sport.has_league
      ) {
        this.fetchCountriesBySport();
      } else if (
        this.userProfile.professional.sport !== '' &&
        this.userProfile.professional.sport.has_country
      ) {
        this.getCountriesBySport();
      }

      if (
        this.userProfile.professional.sport !== '' &&
        this.userProfile.professional.sport.has_club &&
        !this.userProfile.professional.sport.has_league
      ) {
        this.getClubsBySport(this.userProfile.professional.sport.id);
      }
    },
    fetchDataByCountry() {
      if (!this.userProfile.professional.sport.has_league) {
        this.fetchClubsByCountryAndSport();
      } else {
        this.fetchLeaguesByCountryAndSport();
      }
    },
    createAthlete() {
      let $this = this;
      this.$v.userProfile.$touch();
      if (!this.$v.userProfile.$invalid) {
        UserRepository.checkEmailAvailability({
          email: this.userProfile.account.email,
        })
          .then((response) => {
            UserRepository.checkAthleteAvailability({
              first_name: this.userProfile.account.first_name,
              last_name: this.userProfile.account.last_name,
            })
              .then((response) => {
                let data = new FormData();
                let profileData = this.userProfile;
                profileData.professional.sport =
                  this.userProfile.professional.sport.id;
                data.append('nx_data', JSON.stringify(profileData));
                data.append('avatar', store.getters['user/getUserPhoto']);
                UserRepository.createUserAthlete(data)
                  .then((response) => {
                    UserRepository.getUserAthletes()
                      .then((response) => {
                        store.dispatch(
                          'user/storeUserAthletes',
                          response.data.data
                        );
                        $this.$emit('added', true);
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              })
              .catch((error) => {
                this.userAlreadyAssignedError = true;
                window.scrollTo(0, 0);
                console.error(error);
              });
          })
          .catch((error) => {
            this.emailAlreadyTakenError = true;
            window.scrollTo(0, 0);
            console.error(error);
          });
      }
    },
    getCountries() {
      let $this = this;
      SystemRepository.getCountries()
        .then((response) => {
          $this.countries = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getSports() {
      let $this = this;
      SystemRepository.getSports()
        .then((response) => {
          $this.allSports = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchCountriesBySport() {
      // Clean Up
      this.allCountries = this.allLeagues = this.allClubs = [];
      this.userProfile.professional.country =
        this.userProfile.professional.league =
        this.userProfile.professional.club =
          '';

      var sportId = this.userProfile.professional.sport.id;
      let $this = this;
      $this.$loading(true);
      SystemRepository.getCountriesBySport(sportId)
        .then((response) => {
          this.allCountries = response.data.data;
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
      this.allCountries = this.allLeagues = this.allClubs = [];
      this.userProfile.professional.country =
        this.userProfile.professional.league =
        this.userProfile.professional.club =
          '';

      var sportId = this.userProfile.professional.sport.id;
      let $this = this;
      $this.$loading(true);
      SystemRepository.getCountriesBySportId(sportId)
        .then((response) => {
          this.allCountries = response.data;
          $this.$loading(false);
        })
        .catch((error) => {
          console.error(error);
          $this.$loading(false);
        });
    },
    fetchLeaguesByCountryAndSport() {
      // Clean Up
      this.allClubs = this.allLeagues = [];
      this.userProfile.professional.league =
        this.userProfile.professional.club = '';

      var countryId = this.userProfile.professional.country,
        sportId = this.userProfile.professional.sport.id;
      let $this = this;
      $this.$loading(true);
      SystemRepository.getLeaguesByCountryAndSport(countryId, sportId)
        .then((response) => {
          this.allLeagues = response.data.data;
          $this.$loading(false);
        })
        .catch((error) => {
          console.error(error);
          $this.$loading(false);
        });
    },
    fetchClubsByCountryAndSport() {
      // Clean Up
      this.allClubs = this.allLeagues = [];
      this.userProfile.professional.league =
        this.userProfile.professional.club = '';

      var countryId = this.userProfile.professional.country,
        sportId = this.userProfile.professional.sport.id;
      let $this = this;
      $this.$loading(true);
      SystemRepository.getClubsByCountryAndSport(countryId, sportId)
        .then((response) => {
          this.allClubs = response.data.data;
          $this.$loading(false);
        })
        .catch((error) => {
          console.error(error);
          $this.$loading(false);
        });
    },
    getClubsBySport(sportId) {
      let $this = this;
      $this.$loading(true);
      SystemRepository.getClubsBySport(sportId)
        .then((response) => {
          this.allClubs = response.data.data;
          $this.$loading(false);
        })
        .catch((error) => {
          console.error(error);
          $this.$loading(false);
        });
    },
    fetchClubsByCountryAndLeague() {
      //cleanup
      this.allClubs = [];
      this.userProfile.professional.club = '';
      var countryId = this.userProfile.professional.country
          ? this.userProfile.professional.country
          : '',
        leagueId = this.userProfile.professional.league
          ? this.userProfile.professional.league
          : '';
      let $this = this;
      $this.$loading(true);

      SystemRepository.getClubsByCountryAndLeague(countryId, leagueId)
        .then((response) => {
          this.allClubs = response.data.data;
          $this.$loading(false);
        })
        .catch((error) => {
          console.error(error);
          $this.$loading(false);
        });
    },
    uploadFile(event) {
      this.$store.dispatch('user/storeUserPhoto', event.target.files[0]);
    },
  },
};
</script>

<style
  scoped
  lang="scss"
  src="@/assets/styles/user-style/user-athlete-edit.scss"
></style>
