<template>
  <div>
    <hr />
    <h5 class="component-header">Term sheet submitted</h5>
    <p class="text mb-3">
      You have submitted the term sheet <br />
      We will notify you when the borrower accepts or rejects it.
    </p>
    <a href="#" class="link-text" @click.prevent="viewFile(offer.term_sheet)"
      >See the terms</a
    >

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
import DownloadMixin from '@/mixins/User/download.mixin';
import BaseModal from '../../BaseModal';

export default {
  name: 'Terms',
  mixins: [DownloadMixin],
  components: {
    BaseModal,
  },
  computed: {
    offer: () => {
      return store.getters['dealDetail/getOffer'];
    },
  },
};
</script>

<style scoped>
p.text {
  font-size: 12px;
  margin-bottom: 0;
}
</style>
