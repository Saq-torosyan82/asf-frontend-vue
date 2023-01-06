import RepositoryFactory from '../../repositories/RepositoryFactory';
const UserRepository = RepositoryFactory.get('user');

export default {
  mounted() {
    this.getSponsorships();
  },
  data() {
    return {
      sponsorships: [],
      isShow: false,
    };
  },
  methods: {
    getSponsorships() {
      let $this = this;
      $this.isShow = false;
      $this.$loading(true);
      UserRepository.getSponsorships()
        .then((response) => {
          $this.sponsorships = response.data;
          $this.$loading(false);
        })
        .catch((error) => {
          console.error(error);
          $this.$loading(false);
        });
    },
    removeSponsor(key) {
      this.sponsorships.splice(key, 1);
    },
  },
};
