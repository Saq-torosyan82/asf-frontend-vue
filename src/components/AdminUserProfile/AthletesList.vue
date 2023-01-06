<template>
  <div class="athleteList">
    <div class="colored-header">
      <h5>Professional Athlete</h5>
      <!-- <div class="actions">
        <a href="#" class="filter">
          <icon name="filter" />
        </a>
      </div> -->
    </div>
    <div class="items" v-if="athletes">
      <ListItemWithImage
        v-for="(athlete, index) in athletes"
        :key="index"
        :text="athlete.name"
        :label="athlete.type"
        :avatar="athlete.avatar"
        :delete="false"
      >
        <div class="actions">
          <a href="#" @click.prevent="edit(athlete.id)">
            <icon name="edit" />
          </a>
          <a href="#" @click.prevent="showConfirmModal(athlete.id)">
            <icon name="delete" />
          </a>
        </div>
      </ListItemWithImage>
    </div>
    <div v-else class="no-items">
      <p>No Athletes yet</p>
    </div>
    <BaseModal
        :modal-type="'delete-user'"
        @delete="deleteUser"
        @closed="closeConfirmModal"
        v-if="confirmModal"
    ></BaseModal>
  </div>
</template>
<script>
import store from '@/store';

import '@/assets/styles/adminMain.css';
import ListItemWithImage from '@/components/ListItemWithImage.vue';
import BaseModal from "../BaseModal";

import RepositoryFactory from '@/repositories/RepositoryFactory';
import DisableAccountMixin from "@/mixins/User/DisableAccount.mixin";
import DeleteUserMixin from "../../mixins/User/DeleteUser.mixin";
const AdminRepository = RepositoryFactory.get('admin');
const UserRepository = RepositoryFactory.get('user');

export default {
  name: 'AthletesList',
  components: {
    ListItemWithImage,
    BaseModal
  },
  mixins: [DisableAccountMixin, DeleteUserMixin],
  mounted() {
    this.getUsers();
  },
  data() {
    return {
      athletes: null,
    };
  },
  methods: {
    getUsers() {
      let $this = this;
      $this.$loading(true);
      AdminRepository.getAthletes(2)
        .then((response) => {
          $this.athletes = response.data;
          store.dispatch('adminAthletes/storeAthletes', response.data);
          $this.$loading(false);
        })
        .catch((error) => {
          console.error(error);
          $this.athletes = null;
          $this.$loading(false);
        });
    },
    deleteUser() {
      let $this = this;
      this.disableUserAccount(this.userId).then(() => {
        $this.getUsers();
        $this.confirmModal = false;
        $this.$loading(false);
      });
    },
    edit(hash) {
      store.dispatch('editUser/setHash', hash);
      store.dispatch('editUser/setType', 'athlete');
      this.$emit('editAthlete', hash);
    },
  },
};
</script>
<style scoped>
.no-items {
  text-align: center;
  margin-top: 20px;
}
/* .items {
  padding: 0 20px;
} */
.item {
  margin-top: 15px;
}
.item:last-of-type {
  margin-bottom: 15px;
}
</style>
