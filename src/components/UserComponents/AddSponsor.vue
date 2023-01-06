<template>
  <div>
    <div v-if="error" class="alert alert-danger" role="alert">
      {{ privateErrorMessage !== '' ? privateErrorMessage : errorMessage }}
    </div>
    <SelectInput v-if="isCorporate" label="Sponsor Type" name="">
      <select v-model="sponsor.type">
        <option
            v-for="(type, key) in sponsorTypes"
            :key="key"
            class="option"
            :value="key"
        >
          {{ type }}
        </option>
      </select>
    </SelectInput>

    <SelectInput label="Sponsor" name="">
      <select v-model="sponsor.id">
        <option
          v-for="(sponsor, key) in sponsors"
          :key="key"
          class="option"
          :value="sponsor.id"
        >
          {{ sponsor.name }}
        </option>
      </select>
    </SelectInput>
    <a href="#" @click.prevent="addSponsor" class="button">Save</a>
  </div>
</template>

<script>
import SelectInput from '../SelectInput';
import User from '@/modules/User/User';
import RepositoryFactory from '../../repositories/RepositoryFactory';
const UserRepository = RepositoryFactory.get('user');

export default {
  name: 'AddSponsor',
  props: ['errorMessage'],
  data() {
    return {
      sponsor: {
        id:'',
        type: 'sponsor'
      },
      sponsors: null,
      sponsorTypes: [],
      error: false,
      privateErrorMessage: ''
    };
  },
  mounted() {
    this.getData();
    if(this.isCorporate) {
      this.sponsor.type = '';
    }
    this.privateErrorMessage = '';
    this.error = false;
  },
  components: {
    SelectInput,
  },
  computed: {
    isCorporate() {
      return User.isCorporate();
    },
    isAthlete() {
      return User.isAthlete();
    }
  },
  methods: {
    getData() {
      if(this.isCorporate) {
        this.getClubSponsors();
      }else {
        this.getSponsors();
      }
    },
    getSponsors() {
      UserRepository.getAllSponsorships()
        .then((response) => {
          this.sponsors = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getClubSponsors() {
      UserRepository.getClubSponsors()
          .then((response) => {
            this.sponsors = response.data.sponsors;
            this.sponsorTypes = response.data.types;
          })
          .catch((error) => {
            console.error(error);
          });
    },
    addSponsor() {
      let $this = this;
      if($this.sponsor.id !== '' && $this.sponsor.type !== '') {
        $this.$loading(true);
        UserRepository.addSponsor($this.sponsor)
            .then((response) => {
              $this.$loading(false);
              $this.$emit('sponsorAdded', true);
              $this.sponsor = {
                id:'',
                type: 'sponsor'
              };
              $this.error = false;
            })
            .catch((error) => {
              if (error.response.status === 409) {
                $this.error = true;
                $this.privateErrorMessage = error.response.data.message;
              }
              $this.$loading(false);
            });
      }else {
        this.error = true;
        this.privateErrorMessage = 'Sponsor type and sponsor are required';
      }

    },
  },
};
</script>

<style scoped>
a.button {
  display: inline-block;
  margin: 24px 0 12px;
  padding: 14px 40px;
  border-radius: 4px;
  color: #ffffff;
  background-color: #3a9eba;
}
</style>
