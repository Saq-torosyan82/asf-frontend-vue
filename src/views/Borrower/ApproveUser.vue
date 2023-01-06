<template>
  <div class="content">
    <h1>Approving account</h1>
  </div>
</template>
<script>
import RepositoryFactory from "../../repositories/RepositoryFactory";
const UserRepository = RepositoryFactory.get('user');

export default {
  name: 'ApproveUser',
  components: {

  },
  data: () => {
    return {
      form: {
        uid: '',
      },
    };
  },
  created() {
    this.form.uid = this.$route.query.uid;
  },
  mounted() {
    this.approve();
  },
  methods: {
    approve() {
      let $this = this;
        $this.$loading(true);
        UserRepository.approveUser(this.form).then((response) => {
          $this.$loading(false);
          this.$router.push('/');
        }).catch((error) => {
          console.error(error);
          $this.$loading(false);
          this.$router.push('/');
        })
      }
  },
};
</script>
