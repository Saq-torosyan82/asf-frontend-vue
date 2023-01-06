<template>
  <div class="content">
    <div class="avatar">
      <img
        v-if="counterparty.avatar"
        v-auth-image="counterparty.avatar"
        alt=""
      />
      <img v-else src="@/assets/img/person-default.png" alt="" />
    </div>
    <embed :type="fileMime" :src="previewFile" width="100%" height="600" />

    <div id="signature">
      <h3>Draw your signature</h3>
      <div v-if="signatureError" class="alert alert-danger" role="alert">
        Please draw your signature
      </div>
      <vueSignature
        :w="'600px'"
        :h="'300px'"
        ref="signature"
        :sigOption="option"
      ></vueSignature>
      <hr />
      <button class="button" @click="reset">Reset</button>
    </div>

    <a href="#" @click.prevent="signContract" class="button"
      >Sign the contract</a
    >
  </div>
</template>

<script>
import store from '@/store';
import UserService from '@/services/user.service.js';
import DealStatuses from '@/enums/deal/dealStatuses';
import RepositoryFactory from '../repositories/RepositoryFactory';
import vueSignature from 'vue-signature';
import GetDealDetailMixin from '@/mixins/Deal/GetDealDetail.mixin';
import DownloadMixin from '@/mixins/User/download.mixin';
const DealRepository = RepositoryFactory.get('deal');

export default {
  name: 'ContractSigning',
  components: {
    vueSignature,
  },
  mixins: [GetDealDetailMixin, DownloadMixin],
  data() {
    return {
      option: {
        penColor: 'rgb(0, 0, 0)',
        backgroundColor: 'rgb(255,255,255)',
      },
      signatureError: false,
    };
  },
  mounted() {
    this.viewFile(this.contractUrl);
  },
  computed: {
    contractUrl() {
      return store.getters['dealDetail/getContractUrl'];
    },
    isLender() {
      return UserService.isLender();
    },
    counterparty: () => {
      return store.getters['dealDetail/getCounterparty'];
    },
    isBorrower() {
      return UserService.isBorrower();
    },
    dealId: () => {
      return store.getters['dealDetail/getDealId'];
    },
    status: () => {
      if (UserService.isLender()) {
        return DealStatuses.LENDER_SIGNED_CONTRACT;
      } else if (UserService.isBorrower()) {
        return DealStatuses.BORROWER_SIGNED_CONTRACT;
      }
      return '';
    },
  },
  methods: {
    signContract() {
      let $this = this;
      if (!$this.$refs.signature.isEmpty()) {
        $this.signatureError = false;
        $this.$loading(true);
        let data = {
          status: $this.status,
          signature: $this.$refs.signature.save(),
        };
        DealRepository.signContract($this.dealId, data)
          .then((response) => {
            $this.getDealDetail($this.dealId);
            store.dispatch('dealDetail/signContractFlag', false);
            $this.$loading(false);
            $this.$router.push('/deals');
          })
          .catch((error) => {
            console.error(error);
            $this.$loading(false);
          });
      } else {
        $this.signatureError = true;
      }
    },
    reset() {
      this.$refs.signature.clear();
    },
  },
};
</script>
<style>
#signature {
  margin: 20px 0 20px;
}
</style>

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
.avatar {
  width: 40px;
  height: 40px;
  margin: 4px 0 6px;
}

.avatar img {
  width: 40px;
  height: 40px;
  margin: 4px 0 6px;
  border-radius: 50px;
  border: 2px solid #c4c4c4;
}
</style>
