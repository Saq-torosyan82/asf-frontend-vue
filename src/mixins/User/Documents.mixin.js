import RepositoryFactory from '../../repositories/RepositoryFactory';
const UserRepository = RepositoryFactory.get('user');

export default {
  data() {
    return {
      documents: {},
    };
  },
  methods: {
    getUserDocuments() {
      let $this = this;
      $this.$loading(true);
      UserRepository.getUserDocuments()
        .then((response) => {
          $this.documents = response.data;
          $this.$loading(false);
        })
        .catch((error) => {
          console.error(error);
          $this.$loading(false);
        });
    },
  },
};
