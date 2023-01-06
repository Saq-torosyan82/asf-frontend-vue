<template>
  <div class="athleteList">
    <div class="colored-header">
      <h5>Sports Lawyer</h5>
      <!-- <div class="actions">
        <a href="#" class="filter">
          <icon name="filter" class="dark" />
        </a>
      </div> -->
    </div>
    <div class="items">
      <div v-if="lawyers">
        <DropdownListItemWithImage
          v-for="(lawyer, index) in lawyers"
          :key="index"
          :text="lawyer.name"
          :delete="true"
          :avatar="lawyer.avatar"
          @edit="edit(lawyer.id)"
          @delete="showConfirmModal(lawyer.id)"
        />
      </div>
      <div class="no-items" v-else>
        <p>No Lawyers yet</p>
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
  name: 'LawyersList',
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
      lawyers: null,
    };
  },
  methods: {
    getUsers() {
      let $this = this;
      $this.$loading(true);
      AdminRepository.getAgents(4)
        .then((response) => {
          $this.lawyers = response.data;
          store.dispatch(
            'adminOrganisations/storeOrganisations',
            response.data
          );
          $this.$loading(false);
        })
        .catch((error) => {
          console.error(error);
          $this.lawyers = null;
          $this.$loading(false);
        });
    },
    edit(hash) {
      store.dispatch('editUser/setHash', hash);
      store.dispatch('editUser/setType', 'lawyer');
      this.$emit('editAgent', hash);
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
