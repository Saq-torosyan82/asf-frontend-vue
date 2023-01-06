<template>
  <div class="athleteList">
    <div class="colored-header">
      <h5>Sports Organization</h5>
      <!-- <div class="actions">
        <a href="#" class="filter">
          <icon name="filter" class="dark" />
        </a>
      </div> -->
    </div>
    <div class="items">
      <div v-if="organisations">
        <DropdownListItemWithImage
          v-for="(organisation, index) in organisations"
          :key="index"
          :text="organisation.name"
          :label="organisation.users.length + ' Agents'"
          :delete="true"
          :items="organisation.users"
          :avatar="organisation.avatar"
          @edit="edit(organisation.id)"
          @delete="showConfirmModal(organisation.id)"
        />
      </div>
      <div class="no-items" v-else>
        <p>No Organization yet</p>
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

import RepositoryFactory from '../../repositories/RepositoryFactory';
import DeleteUserMixin from '@/mixins/User/DeleteUser.mixin';
const AdminRepository = RepositoryFactory.get('admin');
const UserRepository = RepositoryFactory.get('user');

export default {
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
      organisations: null,
    };
  },
  methods: {
    getUsers() {
      let $this = this;
      $this.$loading(true);
      AdminRepository.getOrganisations()
        .then((response) => {
          $this.organisations = response.data;
          store.dispatch(
            'adminOrganisations/storeOrganisations',
            response.data
          );
          $this.$loading(false);
        })
        .catch((error) => {
          console.error(error);
          $this.organisations = null;
          $this.$loading(false);
        });
    },
    edit(hash) {
      store.dispatch('editUser/setHash', hash);
      store.dispatch('editUser/setType', 'corporate');
      this.$emit('editCompany', hash);
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
