<template>
  <div class="filter-content">
    <div class="filter-section">
      <div class="filter-input-content">
        <v-autocomplete
          v-model="filterType"
          :items="listFilterDealType"
          solo
          flat
          hide-details
          :label="filterType || 'Deal Type'"
        />
        <v-autocomplete
          v-model="filterBorrower"
          :items="listFilterBorrower"
          solo
          flat
          hide-details
          :label="filterBorrower || 'Borrower'"
        />
        <v-autocomplete
          v-model="filterLender"
          :items="listFilterLender"
          solo
          flat
          hide-details
          :label="filterLender || 'Lender'"
        />
        <v-autocomplete
          v-model="filterObligorRisk"
          :items="listFilterObligorRisk"
          solo
          flat
          hide-details
          :label="filterObligorRisk || 'Obligor Risk'"
        />
        <v-autocomplete
          v-model="filterCountry"
          :items="listFilterCountry"
          solo
          flat
          hide-details
          :label="filterCountry || 'Country'"
        />
        <v-autocomplete
          v-model="filterDealStatus"
          :items="listFilterDealStatus"
          solo
          flat
          hide-details
          :label="filterDealStatus || 'Deal Status'"
        />
      </div>
    </div>
    <span class="btn-reset" @click="onReSetFilter">Reset</span>
  </div>
</template>
<script>
export default {
  name: 'AdminDealsByTypeFilters',
  props: {
    listFilterDealType: {
      type: Array,
      default: new Array(),
    },
    listFilterBorrower: {
      type: Array,
      default: new Array(),
    },
    listFilterLender: {
      type: Array,
      default: new Array(),
    },
    listFilterObligorRisk: {
      type: Array,
      default: new Array(),
    },
    listFilterCountry: {
      type: Array,
      default: new Array(),
    },
    listFilterDealStatus: {
      type: Array,
      default: new Array(),
    },
  },
  data() {
    return {
      filterType: '',
      filterBorrower: '',
      filterLender: '',
      filterObligorRisk: '',
      filterCountry: '',
      filterDealStatus: '',
      listFilteredValues: {},
    };
  },
  methods: {
    setFilterList(value, key) {
      this.listFilteredValues = { ...this.listFilteredValues, [key]: value };
      this.$emit('setFilterDealsList', this.listFilteredValues);
    },
    onReSetFilter() {
      this.filterType = '';
      this.filterLender = '';
      this.filterCountry = '';
      this.filterObligorRisk = '';
      this.filterBorrower = '';
      this.filterDealStatus = '';
      this.listFilteredValues = {};
    },
  },
  watch: {
    filterType() {
      this.setFilterList(this.filterType, 'Deal Type');
    },
    filterBorrower() {
      this.setFilterList(this.filterBorrower, 'Borrower');
    },
    filterLender() {
      this.setFilterList(this.filterLender, 'Lender');
    },
    filterObligorRisk() {
      this.setFilterList(this.filterObligorRisk, 'Obligor Risk');
    },
    filterCountry() {
      this.setFilterList(this.filterCountry, 'Country');
    },
    filterDealStatus() {
      this.setFilterList(this.filterDealStatus, 'Deal Status');
    },
  },
};
</script>
<style
  lang="scss"
  scoped
  src="@/assets/styles/admin/filter-content.scss"
></style>
