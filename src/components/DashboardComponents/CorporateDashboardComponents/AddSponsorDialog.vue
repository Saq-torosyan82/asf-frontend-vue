<template>
  <v-dialog v-model="sponsorDialog" persistent max-width="500px">
    <v-card>
      <div class="dialog-sponsor-container">
        <div class="head-content dp-row">
          <label class="lbl-title">Choose endorsement deal</label>
          <span class="txt-close" @click="onCloseDialog">&#10005;</span>
        </div>
        <div class="filter-content">
          <div v-if="error" class="alert alert-danger" role="alert">
            {{ privateErrorMessage }}
          </div>
          <label>Sponsor Type</label>
          <v-autocomplete
            v-model="mSponsorType"
            :items="listSponsorType"
            solo
            flat
            hide-details
            :label="mSponsorType || ''"
            class="sponsor-type"
          />
          <label>Sponsor</label>
          <v-autocomplete
            v-model="mSponsor"
            :items="listSponsor"
            solo
            flat
            hide-details
            :label="mSponsor || ''"
            item-text="name"
            item-value="name"
            @change="onSelectedSponsor"
          >
            <template v-slot:item="data">
              <v-list-item-avatar :style="listSponsorStyle" rounded-xl>
                <img :src="data.item.logo" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="data.item.name"></v-list-item-title>
              </v-list-item-content>
            </template>
          </v-autocomplete>
          <label>Start date</label>
          <v-menu
            v-model="menu1"
            :close-on-content-click="false"
            :nudge-right="10"
            transition="scale-transition"
            offset-y
            max-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="startDateFormatted"
                :label="startDateFormatted || ''"
                v-bind="attrs"
                v-on="on"
                solo
                flat
                hide-details
                persistent-hint
                clearable
                readonly
                append-icon="mdi-calendar"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="startDate"
              no-title
              @input="menu1 = false"
            ></v-date-picker>
          </v-menu>
          <label>End date</label>
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="10"
            transition="scale-transition"
            offset-y
            max-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="endDateFormatted"
                :label="endDateFormatted || ''"
                v-bind="attrs"
                v-on="on"
                solo
                flat
                hide-details
                persistent-hint
                clearable
                readonly
                append-icon="mdi-calendar"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="endDate"
              no-title
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
          <a class="button" @click="onSave"> Save </a>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
import RepositoryFactory from '@/repositories/RepositoryFactory';
import moment from 'moment';
const UserRepository = RepositoryFactory.get('user');

export default {
  props: ['sponsorDialog'],
  data() {
    return {
      fullListSponsorType: {},
      listSponsorType: [],
      listSponsor: [],
      showNotification: false,
      mSponsorType: '',
      mSponsor: '',
      listSponsorStyle: {
        width: '35px',
        height: '35px',
        minWidth: '35px',
        marginTop: '5px',
        marginBottom: '5px',
        border: 'solid 1px #dbe1e8 ',
      },
      selectedSponsor: [],
      errorMessage: 'This endorsement deal is already added',
      privateErrorMessage: '',
      error: false,

      menu1: false,
      menu2: false,
      startDate: null,
      endDate: null,
      startDateFormatted: null,
      endDateFormatted: null,
    };
  },
  created() {
    this.getClubSponsors();
  },
  methods: {
    getClubSponsors() {
      let $this = this;
      $this.$loading(true);
      UserRepository.getClubSponsors()
        .then((res) => {
          this.listSponsor = [...res.data.sponsors];
          this.fullListSponsorType = { ...res.data.types };
          this.listSponsorType = Object.values(this.fullListSponsorType);
          $this.$loading(false);
        })
        .catch((error) => {
          console.error(error);
          $this.$loading(false);
        });
    },
    onSelectedSponsor() {
      this.selectedSponsor = this.listSponsor.filter(
        (sponsor) => sponsor.name === this.mSponsor
      );
    },
    onSave() {
      let $this = this;
      if (
        this.selectedSponsor.length !== 0 &&
        this.mSponsorType !== '' &&
        this.mSponsorType !== null
      ) {
        $this.$loading(true);
        const addSponsorValue = {
          id: this.selectedSponsor[0].id,
          type: Object.keys(this.fullListSponsorType).find(
            (key) => this.fullListSponsorType[key] === this.mSponsorType
          ),
          start_date: this.startDate === null ? '' : new Date(this.startDate),
          end_date: this.endDate === null ? '' : new Date(this.endDate),
        };
        UserRepository.addSponsor(addSponsorValue)
          .then((response) => {
            this.onCloseDialog();
            $this.$loading(false);
            this.$emit('onSuccessAddSponsor');
          })
          .catch((error) => {
            this.onDisplayError(error.response.data.message);
            $this.$loading(false);
          });
      } else {
        this.onDisplayError('Sponsor type and sponsor are required');
      }
    },
    onCloseDialog() {
      this.error = false;
      this.privateErrorMessage = '';
      this.$emit('handleSponsorDialog', false);
      this.mSponsorType = '';
      this.mSponsor = '';
      this.startDate = null;
      this.endDate = null;
      this.selectedSponsor = [];
    },
    onDisplayError(error) {
      this.error = true;
      this.privateErrorMessage = error;
    },
  },
  watch: {
    startDate() {
      this.startDate === null
        ? (this.startDateFormatted = null)
        : (this.startDateFormatted = moment(this.startDate).format(
            'DD/MM/YYYY'
          ));
    },
    endDate() {
      this.endDate === null
        ? (this.endDateFormatted = null)
        : (this.endDateFormatted = moment(this.endDate).format('DD/MM/YYYY'));
    },
    startDateFormatted() {
      if (this.startDateFormatted === null) this.startDate = null;
    },
    endDateFormatted() {
      if (this.endDateFormatted === null) this.endDate = null;
    },
  },
};
</script>
<style lang="scss" scoped>
.dialog-sponsor-container {
  .head-content {
    padding: 15px;
    background-color: #efefef;
    justify-content: space-between;
    align-items: center;
    .lbl-title {
      font-size: 18px;
      color: #253242;
    }
    .txt-close {
      color: #3a9eba;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
    }
  }
  .filter-content {
    padding: 20px 15px 30px;
    .alert-danger {
      font-size: 14px;
      padding: 10px;
    }
    label {
      font-size: 14px;
      color: #93a0ae;
      margin-bottom: 5px;
    }
    .v-autocomplete {
      width: 100%;
      border: 1px solid #93a0ae;
      margin-bottom: 15px;
      ::v-deep {
        .v-list-item__content {
          padding: 9px 0;
        }
        .v-input__control {
          min-height: 40px;

          .v-input__slot {
            padding: 0;
            padding-left: 5px;
            .v-select__slot {
              input {
                color: #253242;
                text-transform: none;
                padding: 0;
                font-size: 14px;
              }
            }
            .v-icon {
              font-size: 26px;
              color: #253242;
            }
          }
        }
      }
    }
    .v-text-field {
      border: 1px solid #93a0ae;
      margin-bottom: 15px;
      ::v-deep {
        .v-input__control {
          min-height: 40px;
          .v-input__slot {
            label,
            input {
              color: #253242;
              text-transform: none;
              font-size: 14px;
            }
          }
        }
      }
    }

    .div-btn {
      margin-top: 35px;
      span {
        padding: 8px 20px;
        font-size: 16px;
        font-weight: bold;
        color: white;
        border-radius: 5px;
        background-color: #3a9eba;
        cursor: pointer;
        &:hover {
          opacity: 0.7;
        }
      }
    }
  }
}
</style>
