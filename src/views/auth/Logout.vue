<template>
  <a href="#" @click.prevent="logout">Sign out</a>
</template>

<script>
import TokenService from '../../services/token.service';
import RepositoryFactory from '../../repositories/RepositoryFactory';
import store from '@/store';
const AuthRepository = RepositoryFactory.get('logout');
export default {
  name: 'Logout',
  methods: {
    logout() {
      AuthRepository.logout().then(() => {
        TokenService.removeToken();
        // this.$router.push('/login');
        window.location.href = '/login';
      });
    },
  },
};
</script>

<style scoped></style>
