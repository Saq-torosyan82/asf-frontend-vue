<template>
  <div class="calculator">
    <div class="league-wrapper" v-show="!leagueSelected">
      <a @click="prevStep()" class="back-link"
        ><icon name="back-arrow" />Back to deal information</a
      >

      <Media v-if="contractType === contractTypes.media"></Media>

      <brands-sponsors
        v-else-if="
          contractType === contractTypes.naming ||
          contractType === contractTypes.endorsement
        "
      ></brands-sponsors>

      <Leagues v-else></Leagues>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import StepsNavigationMixin from '@/mixins/DealCalculator/StepsNavigation.mixin';
import { required } from 'vuelidate/lib/validators';
import RepositoryFactory from '../../../repositories/RepositoryFactory';
const DealStepsRepository = RepositoryFactory.get('deal-steps-repository');
const MediaRightsContractTypeIndendificator = 'media_rights';
const NamingContractTypeIdentificator = 'naming';
const EndorsementContractTypeIdentificator = 'endorsement';

import Media from './parts/Media';
import BrandsSponsors from './parts/BrandsSponsors';
import Leagues from './parts/Leagues';

export default {
  name: 'SecondStep',
  components: {
    Media,
    'brands-sponsors': BrandsSponsors,
    Leagues,
  },
  mixins: [StepsNavigationMixin],
  mounted() {
    if (this.contractType === MediaRightsContractTypeIndendificator)
      this.getTvRightsHolders();
  },
  data: function () {
    return {
      form: {},
      leagueSelected: false,
      tvRightsHolders: null,
      contractTypes: {
        media: MediaRightsContractTypeIndendificator,
        naming: NamingContractTypeIdentificator,
        endorsement: EndorsementContractTypeIdentificator,
      },
    };
  },
  validations() {
    return {
      form: {
        some: { required },
      },
    };
  },
  computed: {
    contractType: () => {
      return store.getters['dealCalculator/getContractType'];
    },
    sport: () => {
      return store.getters['dealCalculator/getSport'];
    },
  },
  methods: {
    getTvRightsHolders() {
      let $this = this;
      $this.$loading(true);
      DealStepsRepository.getTvRightsHolders()
        .then((response) => {
          $this.tvRightsHolders = response.data.data;
          $this.$loading(false);
        })
        .catch((error) => {
          console.error(error);
          $this.$loading(false);
        });
    },
  },
};
</script>

<style lang="scss">
.search-input {
  position: relative;
  width: 200px;
  margin: 0px 0 20px;
  input {
    width: 200px;
    height: 35px;
    border: 1px solid #e0e3e4;
    font-size: 14px;
    font-weight: 600;
    color: #253242;
    border-radius: 10px;
    padding-left: 12px;
    &::placeholder {
      color: #93a0ae;
    }
    &:focus {
      outline: 1px solid var(--primary);
    }
  }
  svg {
    position: absolute;
    right: 15px;
    top: 9px;
    path {
      fill: #253242;
      stroke: #253242;
    }
  }
}
</style>
