<template>
  <div class="content">
    <h3>Why did you decline the user ?</h3>
    <div v-if="$v.form.reason.$error && $v.form.reason.$dirty" class="alert alert-danger" role="alert">
      Reason is required
    </div>
    <div v-if="$v.form.uid.$error && $v.form.uid.$dirty" class="alert alert-danger" role="alert">
      Uid is required
    </div>
    <textarea
        v-model="form.reason"
        class="form-control"
        name=""
        id="reason"
        cols="20"
        rows="10"
        placeholder="Reason for the user decline"
    ></textarea>
    <br>

    <a href="#" class="button" @click.prevent="send">Send</a>
  </div>
</template>
<script>
import {required} from 'vuelidate/lib/validators';
import RepositoryFactory from "../../repositories/RepositoryFactory";
const UserRepository = RepositoryFactory.get('user');

export default {
  name: 'RejectUser',
  components: {

  },
  data: () => {
    return {
      form: {
        reason:'',
        uid: '',
      },
    };
  },
  validations() {
    return {
      form: {
        reason: { required },
        uid: { required },
      },
    };
  },
  created() {
    if(this.$route.query.uid && this.$route.query.uid !== '') {
      this.form.uid = this.$route.query.uid;
    }else {
      this.$router.push('/');
    }

  },
  methods: {
    send() {
      let $this = this;
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        $this.$loading(true);
        UserRepository.rejectUser(this.form).then((response) => {
          $this.$loading(false);
          this.$router.push('/');
        }).catch((error) => {
          console.error(error);
          $this.$loading(false);
        })
      }
    }
  },
};
</script>
