import store from '@/store';
import RepositoryFactory from '../../repositories/RepositoryFactory';
import User from "../../modules/User/User";
const UserRepository = RepositoryFactory.get('user');

export default {
  data() {
    return {
      loaded: false,
    };
  },
  computed: {
    userHash() {
      return store.getters['editUser/getHash'];
    },
    isAdmin() {
      return User.isAdmin();
    },
  },
  methods: {
    redirectUser() {
      if(this.isAdmin) {
        this.getProfileInfo(this.userHash);
      }else {
        this.$router.push('/');
      }
    },
    getUserProfile() {
      let $this = this;
      UserRepository.getUserProfile()
        .then((response) => {
          store.dispatch('user/storeUserInfo', response.data);
          $this.loaded = true;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getProfileInfo(hash) {
      let $this = this;
      UserRepository.getProfileInfo(hash)
        .then((response) => {
          store.dispatch('user/storeUserInfo', response.data);
          $this.$emit('editLender', hash);
          $this.loaded = true;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
