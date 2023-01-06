<template>
  <div class="modal-wrapper">
    <div class="modal-base">
      <div v-if="serverError" class="alert alert-danger" role="alert">
        UPS! something goes wrong
      </div>
      <CustomInput
        :error="$v.form.reason.$error && $v.form.reason.$dirty"
        errorMsg="Reason is required."
        label="Reason of rejection"
      >
        <textarea v-model="form.reason" class="form-control"></textarea>
      </CustomInput>
      <hr />
      <a href="#" @click.prevent="submit" class="button">Submit</a>
      <a href="#" @click.prevent="$emit('closed')" class="button-reject"
        >Go back</a
      >
    </div>
  </div>
</template>

<script>
import store from '@/store';
import RepositoryFactory from '../../../repositories/RepositoryFactory';
import { required } from 'vuelidate/lib/validators';
const DealRepository = RepositoryFactory.get('deal');
import CustomInput from '../../CustomInput';

export default {
  name: 'RejectDocumentsModal',
  components: {
    CustomInput,
  },
  props: ['offerId'],
  data() {
    return {
      serverError: false,
      form: {
        reason: '',
      },
    };
  },
  computed: {
    dealId: () => {
      return store.getters['dealDetail/getDealId'];
    },
  },
  validations() {
    return {
      form: {
        reason: { required },
      },
    };
  },
  methods: {
    submit() {
      let $this = this;
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        $this.$loading(true);
        DealRepository.rejectDeal(this.dealId, { offer_id: $this.offerId })
          .then((response) => {
            $this.$loading(false);
            $this.$emit('closed');
          })
          .catch((error) => {
            console.error(error);
            $this.$loading(false);
            $this.serverError = true;
          });
      }
    },
  },
};
</script>

<style scoped>
.button {
  display: inline-block;
  padding: 17px 32px;
  color: white;
  background-color: #3a9eba;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}
.button-reject {
  display: inline-block;
  padding: 17px 32px;
  color: #3a9eba;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}
</style>

<style lang="scss" src="@/assets/styles/modal.scss" scoped></style>
