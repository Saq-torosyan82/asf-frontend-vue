<template>
  <div>
    <ul style="padding-left: 0" v-if="userAthletes.length > 0">
      <li class="deal-2" v-for="athlete in userAthletes" :key="athlete.id">
        <img v-if="athlete.avatar" v-auth-image="athlete.avatar" />
        <img v-else src="@/assets/img/person-default.png" alt="" />
        <span class="athlete-text">
          <p>{{ athlete.name }}</p>
          <p class="label">{{ athlete.club }}</p>
        </span>
        <div class="actions">
          <a href="#" class="edit" @click.prevent="edit(athlete.id)"
            ><icon name="edit-icon" />Edit</a
          >
          <a href="#" class="delete" @click="deleteUserAthlete(athlete.id)"
            ><icon name="delete-small" />Delete</a
          >
        </div>
      </li>
    </ul>
    <div v-if="userAthletes.length == 0" class="no-athletes">
      <h1>There are no athletes.</h1>
    </div>
  </div>
</template>

<script>
import RepositoryFactory from '../../repositories/RepositoryFactory';
import store from '@/store';
import BorrowerTypes from '../../enums/modules/BorrowerType';
import PlaceholderImage from '@/assets/img/editProfile/cristiano.png';
const UserRepository = RepositoryFactory.get('user');

export default {
  name: 'AthleteWidget',
  components: {},
  props: {},
  mounted() {
    this.getUserAthletes();
  },
  computed: {
    userAthletes() {
      return store.getters['user/getUserAthletes'];
    },
  },
  methods: {
    getUserAthletes() {
      UserRepository.getUserAthletes()
        .then((response) => {
          store.dispatch('user/storeUserAthletes', response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    deleteUserAthlete(id) {
      UserRepository.deleteUserAthlete(id)
        .then((response) => {
          this.getUserAthletes();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    edit(hash) {
      store.dispatch('editUser/setHash', hash);
      store.dispatch('editUser/setType', 'athlete');
      this.$router.push('/agent/athlete-edit');
    },
  },
};
</script>

<style lang="scss" scoped>
.no-athletes {
  h1 {
    margin-top: 40px;
    text-align: center;
    font-size: 14px;
    color: #93a0ae;
  }
}
.deal:nth-child(-n + 5) {
  margin-top: 0px;
}
ul {
  padding-left: 0;
}
/* .deal {
  width: 20%;
  float: left;
  margin-top: 32px;
}
.deal img {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 1px solid #e9e9e9;
}
.deal p {
  margin: 8px 0 0;
  font-size: 13px;
} */
.deal-2 p.label {
  font-size: 12px;
  font-weight: 400;
  color: #93a0ae;
}
.deal-2 {
  display: flex;
  align-items: center;
  margin-bottom: 22px;
}

.deal-2 img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #dbe7f4;
}
.deal-2 p {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 0;
}
.deal-2 .actions {
  margin-left: auto;
  width: min-content;
}
.deal-2 a {
  font-weight: 700;
  font-size: 14px;
  text-decoration: none;
  white-space: nowrap;
}

.deal-2 a.edit {
  color: var(--primary);
}
.deal-2 a.delete,
.deal-2 a.delete svg path {
  color: #f61c0d;
  fill: #f61c0d;
}

@media screen and (min-width: 1401px) {
  .athlete-text {
    margin-left: 15px;
  }
  .deal-2 a {
    margin-left: 24px;
  }
}
@media screen and (max-width: 1400px) {
  .deal-2 a {
    margin-left: 10px;
  }
  .athlete-text {
    margin-left: 5px;
  }
}
</style>
