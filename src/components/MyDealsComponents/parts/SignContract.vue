<template>
  <div>
    <h5 class="counterparties-header">Sign the contract</h5>
    <slot></slot>
    <a href="#" @click.prevent="viewFile(contractUrl)"> See the contract</a>
    <br />
    <router-link :to="'/sign-contract'" class="button">
      Sign the contract
    </router-link>

    <BaseModal
      :modalType="'view-file'"
      v-show="previewFile"
      @closed="closePreview"
    >
      <embed :type="fileMime" :src="previewFile" width="100%" height="600" />
    </BaseModal>
  </div>
</template>

<script>
import store from '@/store';

import BaseModal from '../../BaseModal';
import DownloadMixin from '@/mixins/User/download.mixin';

export default {
  name: 'SignContract',
  mixins: [DownloadMixin],
  components: {
    BaseModal,
  },
  computed: {
    contractUrl() {
      return store.getters['dealDetail/getContractUrl'];
    },
  },
  methods: {
    signContract() {
      store.dispatch('dealDetail/signContractFlag', true);
    },
  },
};
</script>

<style scoped>
.button {
  font-size: 14px;
  margin-bottom: 0;
}
</style>
