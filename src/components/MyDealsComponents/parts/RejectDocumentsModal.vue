<template>
  <div class="modal-wrapper">
    <div class="modal-base">
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
import GetDealDetailMixin from '@/mixins/Deal/GetDealDetail.mixin';

export default {
  name: 'RejectDocumentsModal',
  components: {
    CustomInput,
  },
  mixins: [GetDealDetailMixin],
  data() {
    return {
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
        DealRepository.updateDealStatus(
          this.dealId,
          'reject-documents',
          this.form
        )
          .then((response) => {
            $this.form.reason = '';
            $this.$emit('closed');
            $this.getDealDetail(this.dealId);
            store.dispatch('dealDetail/updateDealFlag', true);
            $this.$loading(false);
          })
          .catch((error) => {
            $this.$loading(false);
            console.error(error);
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
