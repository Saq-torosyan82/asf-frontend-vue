<template>
  <div class="athleteList">
    <div class="colored-header">
      <h5>Sports Agent</h5>
      <!-- <div class="actions">
        <a href="#" class="filter">
          <icon name="filter" class="dark" />
        </a>
      </div> -->
    </div>
    <div class="items">
      <div v-if="agents">
        <DropdownListItemWithImage
          v-for="(agent, index) in agents"
          :key="index"
          :text="agent.name"
          :label="agent.athletes.length + ' Agents'"
          :delete="true"
          :items="agent.athletes"
          :avatar="agent.avatar"
          @edit="edit(agent.id)"
          @delete="showConfirmModal(agent.id)"
        />
      </div>
      <div class="no-items" v-else>
        <p>No Agents yet</p>
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
import BaseModal from "../BaseModal";
import DeleteUserMixin from "@/mixins/User/DeleteUser.mixin";

import RepositoryFactory from '@/repositories/RepositoryFactory';
const AdminRepository = RepositoryFactory.get('admin');

export default {
  components: {
    DropdownListItemWithImage,
    BaseModal
  },
  mixins: [DeleteUserMixin],
  mounted() {
    this.getUsers();
  },
  data() {
    return {
      agents: null,
    };
  },
  methods: {
    getUsers() {
      let $this = this;
      $this.$loading(true);
      AdminRepository.getAgents(3)
        .then((response) => {
          $this.agents = response.data;
          store.dispatch('adminAgents/storeAgents', response.data);
          $this.$loading(false);
        })
        .catch((error) => {
          console.error(error);
          $this.agents = null;
          $this.$loading(false);
        });
    },
    edit(hash) {
      store.dispatch('editUser/setHash', hash);
      store.dispatch('editUser/setType', 'agent');
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
  background: #ffb95a;
}
/* .items {
  padding: 0 20px;
} */
.itemWrap {
  margin-top: 15px;
}
.itemWrap:last-of-type {
  margin-bottom: 15px;
}
</style>
