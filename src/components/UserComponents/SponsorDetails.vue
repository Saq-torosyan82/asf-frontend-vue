<template>
  <div class="deal">
    <template v-if="sponsor.type != 'main_partner'">
      <label v-if="sponsor.type != 'sponsor'"
        >{{ sponsor.type | capitalizeFirstLetter }} sponsor</label
      >
      <!-- <label v-else>{{ sponsor.type | capitalizeFirstLetter }}</label> -->
    </template>

    <template v-if="sponsor.name != null">
      <img :src="sponsor.logo" alt="" />
      <p class="label">{{ sponsor.name }}</p>

      <span v-if="sponsor.start_date !== null">
        <p class="sponsor-exp">
          <span>
            {{ sponsor.start_date | moment('MMM YYYY') }}
          </span>
          <template v-if="sponsor.end_date !== null">
            to
            <span>
              {{ sponsor.end_date | moment('MMM YYYY') }}
            </span>
          </template>
        </p>
      </span>
      <!-- <p>{{ sponsor.end_date | moment('MMMM YYYY') }}</p> -->

      <!-- <span v-if="sponsor.start_date !== null">
        <label>Starts</label> <p>{{ sponsor.start_date | moment('MMMM YYYY') }}</p>
      </span> -->

      <!-- <span v-if="sponsor.end_date !== null">
        <label>Expires</label> <p>{{ sponsor.end_date | moment('MMMM YYYY') }}</p>
      </span> -->
    </template>

    <div v-if="sponsor.name != null" @click="removeSponsor" class="remove-icon">
      <Icon name="delete" />
    </div>
  </div>
</template>

<script>
import User from '@/modules/User/User';

import Icon from '@/components/Icon';
import RepositoryFactory from '../../repositories/RepositoryFactory';
const UserRepository = RepositoryFactory.get('user');

export default {
  name: 'SponsorDetails',
  components: { Icon },
  props: {
    sponsor: Object,
  },
  filters: {
    capitalizeFirstLetter(string) {
      if (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    },
  },
  methods: {
    userIsCorporate() {
      if (User.isCorporate()) return true;

      return false;
    },
    removeSponsor() {
      let $this = this;
      $this.$loading(true);
      UserRepository.deleteSponsorships($this.sponsor.id)
        .then((response) => {
          $this.$emit('sponsorRemoved', true);
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

<style lang="scss" scoped>
.deal:nth-child(-n + 5) {
  margin-top: 0px;
}
ul {
  padding-left: 0;
}

.deal {
  position: relative;
  cursor: pointer;
  &:hover {
    .remove-icon {
      display: initial;
    }
  }
  label {
    display: block;
    margin-top: auto;
    // margin-bottom: 5px;
  }
  img {
    object-fit: contain;
  }
  .add-sponsor {
    margin-top: 10px;
    p.label {
      color: var(--primary);
    }
  }
}
.remove-icon {
  display: none;
  position: absolute;
  top: -5px;
  right: -5px;
  cursor: pointer;
}
.sponsor-exp {
  min-height: 33px;
  margin-bottom: 0;
  span {
    white-space: nowrap;
  }
}
</style>
