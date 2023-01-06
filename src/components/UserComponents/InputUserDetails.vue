<template>
  <div v-if="loaded">
    <section id="form">
      <CustomInput
        v-if="userProfile.contact"
        :label="phoneLabel"
        name="phone-number"
      >
        <vue-tel-input
          v-if="userProfile.contact.office_phone"
          v-model="userProfile.contact.office_phone"
        ></vue-tel-input>
        <vue-tel-input
          v-else
          v-model="userProfile.contact.phone"
        ></vue-tel-input>
      </CustomInput>

      <span v-if="isAthlete">
        <CustomInput label=" Date of birth" errorMsg="Field is required.">
          <datepicker
            v-model="userProfile.user.date_of_birth"
            format="dd/MM/yyyy"
            placeholder="dd/MM/yyyy"
          ></datepicker>
        </CustomInput>

        <CustomInput label="Place of birth" errorMsg="Field is required.">
          <input
            type="text"
            placeholder="Place of birth"
            v-model="userProfile.user.place_of_birth"
          />
        </CustomInput>

        <!-- <SelectInput label="Citizenship" name="country">
          <select v-model="userProfile.user.citizenship">
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
        </SelectInput> -->
        <div class="citizen-content">
          <label class="lbl-citizen-name">Citizenship</label>
          <v-autocomplete
            v-model="m_citizenship"
            :items="allCountries.map((e) => e.name)"
            solo
            flat
            hide-details
            :label="m_citizenship || 'Choose your country from the list'"
          />
        </div>

        <CustomInput label="Agent name" errorMsg="Field is required.">
          <input
            type="text"
            placeholder="Agent name"
            v-model="userProfile.professional.agent_name"
          />
        </CustomInput>
        <div class="inline mt-5">
          <div class="user-image">
            <img
              v-if="userProfile.professional.agent_avatar"
              v-auth-image="userProfile.professional.agent_avatar"
            />
            <img v-else src="@/assets/img/person-default.png" />
          </div>
          <a
            href="#"
            class="link-text"
            @click.prevent="$refs.fileInput.click()"
          >
            <icon name="edit-icon" />Change photo
          </a>
        </div>
        <input
          @change="uploadFile"
          type="file"
          ref="fileInput"
          accept="image/png, image/jpeg, image/png"
          style="display: none"
        />

        <CustomInput label="Agency name" errorMsg="Field is required.">
          <input
            type="text"
            placeholder="Agency name"
            v-model="userProfile.professional.agency_name"
          />
        </CustomInput>

        <CustomInput
          v-if="isAthlete"
          label="When athlete joined club"
          errorMsg="Field is required."
        >
          <datepicker
            v-model="userProfile.professional.club_joined_date"
            format="dd/MM/yyyy"
            placeholder="dd/MM/yyyy"
          ></datepicker>
        </CustomInput>

        <CustomInput
          label="When the contract expires"
          errorMsg="Field is required."
        >
          <datepicker
            v-model="userProfile.professional.contract_expires"
            format="dd/MM/yyyy"
            placeholder="dd/MM/yyyy"
          ></datepicker>
        </CustomInput>
      </span>

      <CustomInput
        v-if="userProfile.address"
        label="Street address"
        name="street-address"
      >
        <input
          type="text"
          placeholder="Street address"
          v-model="userProfile.address.street"
        />
      </CustomInput>
      <CustomInput
        v-if="userProfile.address"
        label="State (optional)"
        name="state"
      >
        <input
          type="text"
          placeholder="State"
          v-model="userProfile.address.state"
        />
      </CustomInput>
      <b-row v-if="userProfile.address">
        <b-col
          ><CustomInput label="City" name="City">
            <input
              type="text"
              placeholder="City"
              v-model="userProfile.address.city"
            /> </CustomInput
        ></b-col>
        <b-col
          ><CustomInput label="ZIP - Post code" name="zipcode">
            <input
              type="text"
              placeholder="Post code"
              v-model="userProfile.address.zip"
            /> </CustomInput
        ></b-col>
      </b-row>

      <SelectInput
        v-if="
          isCorporate &&
          userProfile.professional &&
          userProfile.professional.country_txt
        "
        label="Country"
        name="country"
        :no-arrow="true"
      >
        <p>
          {{ userProfile.professional.country_txt }}
        </p>
      </SelectInput>

      <SelectInput
        v-if="(isAgent || isAthlete) && allCountriesBySport.length > 0"
        label="Country"
        name="country"
      >
        <select
          v-if="userProfile.address"
          :disabled="clubInfoReadOnly"
          v-model="userProfile.address.country"
        >
          <option value="" disabled selected hidden>
            Choose your country from the list
          </option>
          <option
            v-for="country in allCountriesBySport"
            :key="'country-' + country.id"
            class="option"
            :value="country.id"
          >
            {{ country.name }}
          </option>
        </select>
      </SelectInput>

      <SelectInput
        v-if="(isAgent || isAthlete) && allCountriesBySport.length <= 0"
        label="Country"
        name="country"
      >
        <select
          v-if="userProfile.address"
          :disabled="clubInfoReadOnly"
          v-model="userProfile.address.country"
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

      <CustomInput
        v-if="isAgent && !isAthlete"
        errorMsg="Field is required."
        label="Sport"
      >
        <multiselect
          :disabled="clubInfoReadOnly"
          v-model="selectedSports"
          label="name"
          track-by="id"
          placeholder="Choose from the list"
          :multiple="true"
          :options="Array.isArray(sports) ? sports : []"
        ></multiselect>
      </CustomInput>
      <SelectInput
        v-if="isCorporate"
        label="Sport"
        name="Sport"
        :no-arrow="true"
      >
        <p>{{ sport.name }}</p>
      </SelectInput>

      <SelectInput v-if="isAthlete" label="Sport" name="Sport" :no-arrow="true">
        <p>
          {{
            userProfile.professional ? userProfile.professional.sport_txt : ''
          }}
        </p>
      </SelectInput>

      <!--  Add athlete    -->

      <SelectInput
        v-if="isAthlete && userProfile.professional && sport.has_country"
        label="Country"
        name="country"
      >
        <select
          :disabled="clubInfoReadOnly"
          v-model="userProfile.professional.country"
          @change="fetchDataByCountry"
        >
          <option value="" disabled selected hidden>
            Choose your country from the list
          </option>
          <option
            v-for="country in allCountriesBySport"
            :key="'country-' + country.id"
            class="option"
            :value="country.id"
          >
            {{ country.name }}
          </option>
        </select>
      </SelectInput>

      <SelectInput
        v-if="isCorporate && userProfile.professional && allLeagues.length > 0"
        label="League"
        name="League"
      >
        <select
          :disabled="clubInfoReadOnly"
          v-model="userProfile.professional.league"
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
        v-if="isCorporate && club.name !== ''"
        label="Team"
        name="Team"
        :no-arrow="true"
      >
        <p>{{ club.name }}</p>
      </SelectInput>

      <SelectInput
        v-if="
          isAthlete &&
          userProfile.professional &&
          sport.has_league &&
          allLeagues.length > 0
        "
        label="League"
        name="League"
      >
        <select
          :disabled="clubInfoReadOnly"
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
          isAthlete &&
          userProfile.professional &&
          sport.has_club &&
          allClubs.length > 0
        "
        label="Team"
        name="Team"
      >
        <select
          :disabled="clubInfoReadOnly"
          v-model="userProfile.professional.club"
        >
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
      <div class="home-stadium" v-if="isCorporate">
        <hr />
        <h3 class="component-header">Home stadion</h3>
        <b-row>
          <b-col>
            <CustomInput label="Stadium name" name="stadium-name">
              <input
                type="text"
                v-model="userProfile.company.stadium_name"
                placeholder="Stadium name"
              />
            </CustomInput>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <CustomInput label="Capacity" name="stadium-capacity">
              <input
                v-model="userProfile.company.stadium_capacity"
                type="text"
                placeholder="Capacity"
              />
            </CustomInput>
          </b-col>
          <b-col>
            <CustomInput label="Year opened" name="stadium-open-year">
              <datepicker
                v-model="userProfile.company.stadium_year_opened"
                minimum-view="year"
                type="year"
                format="yyyy"
                placeholder="yyyy"
              />
            </CustomInput>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <CustomInput label="City" name="stadium-city">
              <input
                type="text"
                v-model="userProfile.company.stadium_city"
                placeholder="Stadium city"
              />
            </CustomInput>
          </b-col>
        </b-row>
      </div>

      <a href="#" class="button" @click.prevent="updateUserProfile()">Save</a>
    </section>
  </div>
</template>

<script>
import CustomInput from '@/components/CustomInput.vue';
import SelectInput from '@/components/SelectInput.vue';
import User from '../../modules/User/User';
import RepositoryFactory from '../../repositories/RepositoryFactory';
import Multiselect from 'vue-multiselect';
import store from '@/store';
import Datepicker from 'vuejs-datepicker';
import UserMixin from '@/mixins/User/User.mixin';

const UserRepository = RepositoryFactory.get('user');
const SystemRepository = RepositoryFactory.get('system');

export default {
  name: 'InputUserDetails',
  components: {
    CustomInput,
    SelectInput,
    Multiselect,
    Datepicker,
  },
  mixins: [UserMixin],
  props: {
    user: User,
    phoneLabel: String,
  },
  data() {
    return {
      m_citizenship: '',
      loaded: false,
      selectedSports: [],
      allCountries: [],
      allCountriesBySport: [],
      allLeagues: [],
      allClubs: [],
      dateFormat: {
        format: 'dd/M/yyyy',
      },
      country: {
        id: '',
        name: '',
      },
      sport: {},
      club: {
        id: '',
        name: '',
      },
      options: [],
    };
  },
  mounted() {
    this.getUserProfile();
    if (this.isAgent || this.isAthlete) {
      this.getCountries();
    }
  },
  computed: {
    isCorporate() {
      return User.isCorporate();
    },
    isAgent() {
      return User.isAgent();
    },
    isAthlete() {
      return User.isAthlete();
    },
    userProfile() {
      return store.getters['user/getUserInfo'];
    },
    clubInfoReadOnly() {
      let userInfo = store.getters['user/getUserInfo'];
      return !!(
        'is_corporate_user' in userInfo.account &&
        userInfo.account.is_corporate_user &&
        User.isCorporate()
      );
    },
    sports: {
      get: function () {
        return store.getters['user/getUserSports'];
      },
      set: function () {},
    },
  },
  methods: {
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
    processDataBeforeSend(data) {
      // fix stadium_year_opened
      if (data.company.stadium_year_opened) {
        let opened_date = data.company.stadium_year_opened;
        if (typeof opened_date == 'object') {
          opened_date = opened_date.toISOString();
        }

        data.company.stadium_year_opened = opened_date.substring(0, 4);
      }
      return data;
    },
    fetchDataByCountry() {
      if (!this.sport.has_league) {
        this.fetchClubsByCountryAndSport();
      } else {
        this.fetchLeaguesByCountryAndSport();
      }
    },
    fetchClubsByCountryAndSport() {
      // Clean Up
      this.allClubs = this.allLeagues = [];
      this.userProfile.professional.league =
        this.userProfile.professional.club = '';

      var countryId = this.userProfile.professional.country,
        sportId = this.userProfile.professional.sport;
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
    updateUserProfile() {
      if (this.isAgent && this.userProfile.company) {
        this.userProfile.company.sports_list = this.selectedSports.map(
          (x) => x.id
        );
      }
      let data = new FormData();
      let $this = this;
      $this.$loading(true);
      let nx_data = this.processDataBeforeSend(this.userProfile);
      data.append('nx_data', JSON.stringify(this.userProfile));
      // data.append('avatar', store.getters['user/getUserPhoto']);
      // if (this.isAthlete)
      //   data.append('agent_avatar', store.getters['user/getAgentPhoto']);
      data.append('_method', 'PATCH');
      UserRepository.updateUserProfile(data)
        .then((response) => {
          this.redirectUser();
          $this.$loading(false);
        })
        .catch((error) => {
          console.error(error);
          $this.$loading(false);
        });
    },

    getUserProfile() {
      let $this = this;
      UserRepository.getUserProfile()
        .then((response) => {
          if (!response.data.company)
            Object.assign(response.data, { company: {} });

          store.dispatch('user/storeUserInfo', response.data);
          if (this.isCorporate) {
            this.getCountryById();
            this.getSportById();
            this.getLeaguesByCountryAndSport();
            this.getClubById();
          }
          if (this.isAgent) {
            this.getSports();
          }
          if (this.isAthlete) {
            this.getSportById().then(() => {
              this.getCountriesBySport().then(() => {
                if (this.sport.has_league) {
                  this.fetchLeaguesByCountryAndSport(true).then(() => {
                    this.fetchClubsByCountryAndLeague(true);
                    // this.fetchDataByCountry();
                  });
                }
              });

              if (
                this.sport !== '' &&
                this.sport.has_club &&
                !this.sport.has_league
              ) {
                this.getClubsBySport(this.sport.id);
              }
            });
          }
          $this.loaded = true;
        })
        .catch((error) => {
          console.error(error);
          $this.loaded = false;
        });
    },
    getCountriesBySport() {
      let $this = this;
      return new Promise((resolve, reject) => {
        if (
          this.sport.has_country &&
          this.sport.has_club &&
          this.sport.has_league
        ) {
          SystemRepository.getCountriesBySport(
            $this.userProfile.professional.sport
          )
            .then((response) => {
              $this.allCountriesBySport = response.data.data;
              resolve(response);
            })
            .catch((error) => {
              console.error(error);
              reject(error);
            });
        } else if (this.sport.has_country) {
          SystemRepository.getCountriesBySportId(
            $this.userProfile.professional.sport
          )
            .then((response) => {
              $this.allCountriesBySport = response.data;
              resolve(response);
            })
            .catch((error) => {
              console.error(error);
              reject(error);
            });
        }
      });
    },
    getCountryById() {
      let $this = this;
      SystemRepository.getCountryById($this.userProfile.address.country)
        .then((response) => {
          $this.country.id = response.data.data[0].id;
          $this.country.name = response.data.data[0].name;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getSportById() {
      let $this = this;
      return new Promise((resolve, reject) => {
        if ($this.userProfile.professional) {
          SystemRepository.getSportById($this.userProfile.professional.sport)
            .then((response) => {
              $this.sport = response.data.data[0];
              resolve(response);
            })
            .catch((error) => {
              console.error(error);
              reject(error);
            });
        }
      });
    },
    getLeaguesByCountryAndSport() {
      let $this = this;
      SystemRepository.getLeaguesByCountryAndSport(
        $this.userProfile.professional.country,
        $this.userProfile.professional.sport
      )
        .then((response) => {
          $this.allLeagues = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getClubById() {
      let $this = this;
      SystemRepository.getClubById($this.userProfile.professional.club)
        .then((response) => {
          $this.club.id = response.data.data[0].id;
          $this.club.name = response.data.data[0].name;
        })
        .catch((error) => {
          console.error(error);
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
          var data = response.data.data;
          store.dispatch('user/storeUserSports', data);
          if (this.userProfile.company) {
            this.selectedSports = this.filterByIdsArray(
              this.userProfile.company.sports_list,
              data
            );
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    fetchLeaguesByCountryAndSport(firstCall = false) {
      // Clean Up
      return new Promise((resolve, reject) => {
        this.allClubs = this.allLeagues = [];
        if (firstCall === false) {
          this.userProfile.professional.league =
            this.userProfile.professional.club = '';
        }
        var countryId = this.userProfile.professional.country,
          sportId = this.userProfile.professional.sport;
        SystemRepository.getLeaguesByCountryAndSport(countryId, sportId)
          .then((response) => {
            this.allLeagues = response.data.data;
            resolve(response);
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      });
    },
    uploadFile(event) {
      let $this = this;
      $this.$loading(true);
      let data = new FormData();
      data.append('agent_avatar', event.target.files[0]);
      UserRepository.uploadAvatar(data)
        .then((response) => {
          $this.getUserProfile();
          $this.$loading(false);
        })
        .catch((error) => {
          console.error(error);
          $this.$loading(false);
        });
      this.$store.dispatch('user/storeAgentPhoto', event.target.files[0]);
    },
    fetchClubsByCountryAndLeague(firstCall = false) {
      //cleanup
      this.allClubs = [];
      if (firstCall === false) {
        this.userProfile.professional.club = '';
      }
      var countryId = this.userProfile.professional.country,
        leagueId = this.userProfile.professional.league;
      SystemRepository.getClubsByCountryAndLeague(countryId, leagueId)
        .then((response) => {
          this.allClubs = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    filterByIdsArray(arrayVal, arrayOfObjects) {
      let newArr = [];
      arrayOfObjects.filter((x) => {
        if (arrayVal && arrayVal.includes(x.id)) {
          newArr.push(x);
        }
      });
      return newArr;
    },
  },
  watch: {
    m_citizenship() {
      if (this.m_citizenship !== null) {
        this.userProfile.user.citizenship = this.allCountries.find(
          (e) => e.name === this.m_citizenship
        ).id;
      } else {
        this.userProfile.user.citizenship = '';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/* .agent-phone .input-wrap {
  margin-top: 10px;
} */
.user-image {
  margin-right: 10px;
  border: 6px solid #dbe7f4;
  width: 60px;
  min-width: 60px;
  height: 60px;
}
.input-wrap {
  margin-top: 10px;
}
a.button {
  color: #ffffff;
}
.home-stadium {
  h3 {
    color: #253242;
    font-size: 16px;
    margin: 25px 0 15px;
  }

  .col {
    padding-top: 0;
    padding-bottom: 0;
  }
}
.citizen-content {
  margin-top: 10px;
  .lbl-citizen-name {
    color: #93a093;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .v-autocomplete {
    border: 1px solid #d9dfe5;
    ::v-deep {
      .v-input__control {
        .v-select__slot {
          label {
            z-index: 1000;
            font-size: 14px;
          }
          input {
            font-size: 14px;
            color: black;
          }
        }
      }
    }
  }
}
</style>
<style src="@/assets/styles/multiselect.css"></style>
