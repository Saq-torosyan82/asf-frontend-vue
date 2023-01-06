import RepositoryFactory from '../../repositories/RepositoryFactory';
const UserRepository = RepositoryFactory.get('user');

export default {
  methods: {
    deleteAccount() {
      let $this = this;
      UserRepository.deleteAccount()
        .then((response) => {
          $this.loaded = false;
          $this.$emit('closed');
        })
        .catch((error) => {
          console.error(error);
        });
    },
    disableAccount(id) {
      let $this = this;
      UserRepository.disableAccount(id)
        .then((response) => {
          $this.loaded = false;
          $this.$emit('closed');
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
