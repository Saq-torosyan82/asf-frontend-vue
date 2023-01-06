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
          v-model="filterCounterparty"
          :items="listFilterCounterparty"
          solo
          flat
          hide-details
          :label="filterCounterparty || 'Counterparty'"
        />
        <v-autocomplete
          v-model="filterStatus"
          :items="listFilterStatus"
          solo
          flat
          hide-details
          :label="filterStatus || 'Status'"
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
    listFilterCounterparty: {
      type: Array,
      default: new Array(),
    },
    listFilterStatus: {
      type: Array,
      default: new Array(),
    },
  },
  data() {
    return {
      filterType: '',
      filterBorrower: '',
      filterLender: '',
      filterCounterparty: '',
      filterStatus: '',
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
      this.filterCounterparty = '';
      this.filterBorrower = '';
      this.filterStatus = '';
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
    filterCounterparty() {
      this.setFilterList(this.filterCounterparty, 'Counterparty');
    },
    filterStatus() {
      this.setFilterList(this.filterStatus, 'Status');
    },
  },
};
</script>
<style
  lang="scss"
  scoped
  src="@/assets/styles/admin/filter-content.scss"
></style>
