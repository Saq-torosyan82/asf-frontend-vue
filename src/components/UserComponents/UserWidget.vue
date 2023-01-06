<template>
  <div class="user-widget-container">
    <div class="top">&nbsp;&nbsp;&nbsp; Users</div>
    <div class="body">
      <div
        v-for="(item, index) in users"
        :key="index"
        :data-id="index.id"
        :class="['user-item', item.isVisible ? activeClass : 'hidden']"
      >
        <div>
          <img :src="item.avatar" alt="image" />
          <span>{{ item.first_name }} {{ item.last_name }}</span>
        </div>
        <span class="delete-user" @click="() => showModal(item.id)"
          >Delete</span
        >
      </div>

      <div v-if="users.length < 1">You have no linked regular users.</div>

      <BaseModal
        :modal-type="'remove-regular-user'"
        :user-id="selectedUserId"
        v-if="showRemoveRegularUser"
        @closed="closeModal()"
        v-on:removeUser="removeUserLine($event)"
      ></BaseModal>
    </div>
  </div>
</template>

<script>
import BaseModal from '../BaseModal';
import RepositoryFactory from '@/repositories/RepositoryFactory';

const UserRepository = RepositoryFactory.get('user');

export default {
  name: 'NewsWidget',
  components: {
    BaseModal,
  },
  data() {
    return {
      users: [],
      selectedUserId: null,
      showRemoveRegularUser: false,
    };
  },
  mounted() {
    this.getCompanyUsers();
  },
  methods: {
    showModal(id) {
      this.selectedUserId = id;
      this.showRemoveRegularUser = true;
    },
    closeModal() {
      this.showRemoveRegularUser = false;
    },
    getCompanyUsers() {
      let $this = this;
      $this.$loading(true);
      UserRepository.getCompanyUsers()
        .then((res) => {
          // this.users = res.data.data;
          if (res.data.data.length === 0) {
            // this.$emit('displayUserWidget', false)
            console.log('no data here');
          }
          $this.$loading(false);
        })
        .catch((err) => {
          console.error(err.message);
          $this.$loading(false);
        });
    },
    removeUserLine($id) {
      const removeIndex = this.users.map((item) => item.id).indexOf($id);
      ~removeIndex && this.users.splice(removeIndex, 1);
      this.closeModal();
    },
  },
};
</script>

<style lang="scss" scoped>
.user-widget-container {
  grid-area: user-widget-container;
}

::-webkit-scrollbar-thumb {
  background: #a0a0a0;
}

::-webkit-scrollbar-track {
  background: #fff;
}

.user-widget-container {
  .top {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: bold;
    height: 39px;
    background: var(--main-gradient);
    color: #fff;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .body {
    background: #fff;
    height: 240px;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 10px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

    .user-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 15px;

      span {
        font-size: 14px;
        font-weight: 400;
        color: #253242;
      }

      .delete-user {
        font-weight: 700;
        color: #0b61c4;
        cursor: pointer;
      }
    }

    img {
      border: 4px solid #dbe7f4;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
</style>
