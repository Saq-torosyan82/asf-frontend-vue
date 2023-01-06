<template>
  <div>
    <h1 style="text-align: center">Payment Confirmation</h1>
  </div>
</template>

<script>
import store from '@/store';
import RepositoryFactory from '@/repositories/RepositoryFactory';
import TokenService from '@/services/token.service';
import axios from 'axios';
import Repository from '@/repositories/RepositoryFactory';
const AuthRepository = RepositoryFactory.get('authentification');
const UserRepository = Repository.get('user');

export default {
  name: 'ConfirmPayment',
  beforeCreate() {
    TokenService.removeToken();
  },
  created() {
    this.form.token = this.$route.query.token;
    this.form.uid = this.$route.query.uid;
    this.form.paymentHash = this.$route.query.payment;
    this.form.confirm = this.$route.query.confirm;

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
        paymentHash: '',
        confirm: '',
      },
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
      TokenService.removeToken();
      AuthRepository.autoLogin({
        token: this.form.token,
        uid: this.form.uid,
      })
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

              if ($this.form.paymentHash !== '' && $this.form.confirm !== '') {
                UserRepository.confirmPayment(
                  $this.form.paymentHash,
                  $this.form.confirm
                )
                  .then((response) => {
                    $this.$router.push('/');
                    $this.$loading(false);
                  })
                  .catch((error) => {
                    console.error(error);
                    $this.$loading(false);
                  });
              }
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error.response);
          $this.$localStorage.set('autologinError', {
            messages: error.response.data,
          });
        });
    },
  },
};
</script>

<style scoped></style>
