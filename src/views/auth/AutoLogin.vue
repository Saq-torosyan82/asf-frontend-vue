<template>
  <div>
    <h1>Auto login</h1>
    <BaseModal v-if="showError" :modal-type="'error'">
      <ErrorSvg></ErrorSvg>
      <h3>{{errorMessage}}</h3>
    </BaseModal>
  </div>
</template>

<script>
import store from '@/store';
import RepositoryFactory from '../../repositories/RepositoryFactory';
import TokenService from '../../services/token.service';
import axios from 'axios';
import Repository from '../../repositories/RepositoryFactory';
import ErrorSvg from '@/assets/img/dashboard/error.svg';
import BaseModal from "../../components/BaseModal";
const AuthRepository = RepositoryFactory.get('authentification');
const UserRepository = Repository.get('user');

export default {
  name: 'AutoLogin',
  components: {
    BaseModal,
    ErrorSvg
  },
  created() {
    this.form.token = this.$route.query.token;
    this.form.uid = this.$route.query.uid;
    if (this.isToken()) {
      this.$router.push('/login');
    } else {
      this.autoLoginCall();
    }
  },
  mounted() {},
  data: () => {
    return {
      form: {
        token: '',
        uid: '',
      },
      showError: false,
      errorMessage: ''
    };
  },
  methods: {
    isToken() {
      return !(
        typeof this.token === 'undefined' || typeof this.uid === 'undefined'
      );
    },
    autoLoginCall() {
      let $this = this;
      $this.$loading(true);
      let autologinResponse = '';
      AuthRepository.autoLogin(this.form)
        .then((response) => {
          store.dispatch('auth/doLogin', response.data);
          autologinResponse = response;

          UserRepository.getMyBasicInfo()
            .then((response) => {
              $this.$store.dispatch('user/storeUserInfo', response.data.data);
              $this.$localStorage.set('userInfo', response.data.data);

              // set token for auth image
              var authHeader = 'Bearer ' + TokenService.getLocalAccessToken();
              axios.defaults.headers.common['Authorization'] = authHeader;

              if (autologinResponse.data.redirect_after !== '') {
                $this.$router.push('/' + autologinResponse.data.redirect_after);
                $this.$loading(false);
              } else if (!autologinResponse.data.is_onboarderd) {
                $this.$router.push('/onboarding');
                $this.$loading(false);
              } else {
                $this.$router.push('/');
                $this.$loading(false);
              }
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error.response.data.message);
          $this.errorMessage = error.response.data.message;
          $this.showError = true;
          setTimeout(() => {
            $this.showError = false;
            $this.errorMessage = '';
            $this.$router.push('/login');
          }, 1000);
          $this.$loading(false);
          $this.$localStorage.set('autologinError', {
            messages: error.response.data,
          });
        });
    },
  },
};
</script>

<style scoped></style>
