<template>
  <div>
    <div v-if="!editLenderView" class="athleteList">
      <div class="colored-header">
        <h5>Lenders</h5>
        <!-- <div class="actions">
          <a href="#" class="filter">
            <icon name="filter" class="dark" />
          </a>
        </div> -->
      </div>
      <div class="items" v-if="lenders">
        <ListItemWithImage
          v-for="(lender, index) in lenders"
          :key="index"
          :text="lender.name"
          :label="lender.type"
          :avatar="lender.avatar"
          :delete="false"
        >
          <div class="actions">
            <a href="#" @click.prevent="editLender(lender.id)">
              <icon name="edit" />
            </a>
            <a href="#" @click.prevent="showConfirmModal(lender.id)">
              <icon name="delete" />
            </a>
          </div>
        </ListItemWithImage>
      </div>
      <div v-else class="no-items">
        <p>No Lenders yet</p>
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
import ListItemWithImage from '@/components/ListItemWithImage.vue';
import DisableAccountMixin from '@/mixins/User/DisableAccount.mixin';
import DeleteUserMixin from '../../mixins/User/DeleteUser.mixin';
import RepositoryFactory from '../../repositories/RepositoryFactory';
import BaseModal from '../BaseModal';
const AdminRepository = RepositoryFactory.get('admin');
const UserRepository = RepositoryFactory.get('user');

export default {
  name: 'LendersList',
  components: {
    ListItemWithImage,
    BaseModal,
  },
  mixins: [DisableAccountMixin, DeleteUserMixin],
  mounted() {
    this.getUsers();
  },
  data() {
    return {
      lenders: null,
      editLenderView: false,
    };
  },
  methods: {
    getUsers() {
      let $this = this;
      $this.$loading(true);
      AdminRepository.getLenders()
        .then((response) => {
          $this.lenders = response.data;
          store.dispatch('adminLenders/storeLenders', response.data);
          $this.$loading(false);
        })
        .catch((error) => {
          console.error(error);
          $this.lenders = null;
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
    editLender(hash) {
      store.dispatch('editUser/setHash', hash);
      store.dispatch('editUser/setType', 'lender');
      this.$emit('editLender', hash);
    },
  },
};
</script>
<style lang="scss" scoped>
.no-items {
  text-align: center;
  margin-top: 20px;
}
.colored-header {
  background: #0d4e9a;
}
/* .items {
  padding: 0 20px;
  max-height: 800px;
  overflow-y: auto;;
} */
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #0d4e9a;
}
.item {
  margin-top: 15px;
}
.item:last-of-type {
  margin-bottom: 15px;
}
</style>
