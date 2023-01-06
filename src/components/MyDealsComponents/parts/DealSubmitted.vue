<template>
  <div class="offer-main">
    <div v-if="criterias.length > 0">
      <h5 class="offer-header">Choose the offer</h5>
      <p class="offer-note">
        Below is a list of Lenders whose criteria match your deal. You’ll
        receive their Term sheets in 2 to 3 days.
      </p>
      <div class="all-offers">
        <div v-for="(criteria, key) in criterias" :key="key" class="offer">
          <p>{{ criteria }}</p>
          <img src="@/assets/img/document-default.png" alt="" />
          <input class="" type="radio" disabled="disabled" />
          <a href="#">View</a>
          <a href="#">
            <img src="@/assets/img/documents_icon.png" alt="" />Download</a
          >
        </div>
      </div>
      <div class="buttons-part">
        <a href="#">Accept Term Sheet</a>
        <a href="#">Reject all Term Sheets</a>
      </div>
    </div>
    <div v-else class="">
      <hr />
      <h1 class="counterparties-header">Your deal is submitted to lenders</h1>
      <p class="text">
        Admin has reviewed your document and approved them. <br />
        You will see here the list of offers from lenders.
      </p>
    </div>
  </div>
</template>

<script>
import store from '@/store';
export default {
  name: 'DealSubmitted',
  components: {},
  computed: {
    criterias: () => {
      return store.getters['dealDetail/getLenderCriterias'];
    },
  },
};
</script>
<style lang="scss" src="@/assets/styles/deal-submitted.scss" scoped></style>
