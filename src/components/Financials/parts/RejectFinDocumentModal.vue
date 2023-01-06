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
import { required } from 'vuelidate/lib/validators';
import CustomInput from '../../CustomInput';
import FinancialMixin from '@/mixins/Financial/Financial.Mixin';
import store from '@/store';

export default {
  name: 'RejectFinDocumentModal',
  components: {
    CustomInput,
  },
  mixins: [FinancialMixin],
  data() {
    return {};
  },
  validations() {
    return {
      form: {
        reason: { required },
      },
    };
  },
  props: {
    docData: Object,
  },
  methods: {
    submit() {
      let $this = this;
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        $this.$loading(true);
        $this.isRejectedDocument = false;
        this.docData.reason = this.form.reason;
        $this.changeStatus(this.docData);
        $this.$emit('closed');
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
