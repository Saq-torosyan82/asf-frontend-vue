<template>
  <div class="athleteList">
    <div class="colored-header">
      <h5>Professional Coach</h5>
      <!-- <div class="actions">
        <a href="#" class="filter">
          <icon name="filter" class="dark" />
        </a>
      </div> -->
    </div>
    <div class="items">
      <div v-if="coaches">
        <DropdownListItemWithImage
          v-for="(coach, index) in coaches"
          :key="index"
          :text="coach.name"
          :delete="true"
          :avatar="coach.avatar"
          @edit="edit(coach.id)"
          @delete="showConfirmModal(coach.id)"
        />
      </div>
      <div class="no-items" v-else>
        <p>No Coaches yet</p>
      </div>
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
import DropdownListItemWithImage from '@/components/DropdownListItemWithImage.vue';
import BaseModal from '../BaseModal';
import DeleteUserMixin from '@/mixins/User/DeleteUser.mixin';

import RepositoryFactory from '../../repositories/RepositoryFactory';
const AdminRepository = RepositoryFactory.get('admin');

export default {
  name: 'CoachesList',
  components: {
    DropdownListItemWithImage,
    BaseModal,
  },
  mixins: [DeleteUserMixin],
  mounted() {
    this.getUsers();
  },
  data() {
    return {
      coaches: null,
    };
  },
  methods: {
    getUsers() {
      let $this = this;
      $this.$loading(true);
      AdminRepository.getAthletes(7)
        .then((response) => {
          $this.coaches = response.data;
          store.dispatch(
            'adminOrganisations/storeOrganisations',
            response.data
          );
          $this.$loading(false);
        })
        .catch((error) => {
          console.error(error);
          $this.coaches = null;
          $this.$loading(false);
        });
    },
    edit(hash) {
      store.dispatch('editUser/setHash', hash);
      store.dispatch('editUser/setType', 'coach');
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
.colored-header {
  background: #76e150;
}
/* .items {
  padding: 0 20px;
  max-height: 800px;
  overflow-y: auto;;
} */
.itemWrap {
  margin-top: 15px;
}
.itemWrap:last-of-type {
  margin-bottom: 15px;
}

::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #76e150;
}
</style>
