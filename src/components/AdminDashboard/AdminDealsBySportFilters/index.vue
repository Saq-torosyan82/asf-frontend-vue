<template>
  <div class="filter-content">
    <div class="filter-section">
      <div class="filter-input-content">
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
          v-model="filterSport"
          :items="listFilterSport"
          solo
          flat
          hide-details
          :label="filterSport || 'Sport'"
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
  name: 'AdminDealsBySportFilters',
  props: {
    listFilterLender: {
      type: Array,
      default: new Array(),
    },
    listFilterCountry: {
      type: Array,
      default: new Array(),
    },
    listFilterBorrower: {
      type: Array,
      default: new Array(),
    },
    listFilterCounterparty: {
      type: Array,
      default: new Array(),
    },
    listFilterDealStatus: {
      type: Array,
      default: new Array(),
    },
    listFilterSport: {
      type: Array,
      default: new Array(),
    },
  },
  data() {
    return {
      filterSport: '',
      filterLender: '',
      filterCountry: '',
      filterBorrower: '',
      filterCounterparty: '',
      filterDealStatus: '',
      /*listFilterSport: [
        'All Sports',
        'Football',
        'Rugby League',
        'Rugby Union',
        'Tennis',
        'Formula 1',
        'Golf',
        'Athletics',
        'NFL',
        'NBA',
        'MLB',
        'NHL',
        'Snooker',
        'Darts',
        'UFC',
        'Cricket',
        'Horse Racing',
        'Esports',
        'Boxing',
      ],*/
      listFilteredValues: {},
    };
  },
  methods: {
    setFilterList(value, key) {
      /*if (key === 'Sport' && value === 'All Sports') {
        this.listFilteredValues = { ...this.listFilteredValues, [key]: '' };
      } else {
        this.listFilteredValues = { ...this.listFilteredValues, [key]: value };
      }*/

      this.listFilteredValues = { ...this.listFilteredValues, [key]: value };

      this.$emit('setFilterDealsList', this.listFilteredValues);
    },
    onReSetFilter() {
      this.filterLender = '';
      this.filterSport = '';
      this.filterCountry = '';
      this.filterBorrower = '';
      this.filterCounterparty = '';
      this.filterDealStatus = '';
      this.listFilteredValues = {};
    },
  },
  watch: {
    filterSport() {
      this.setFilterList(this.filterSport, 'Sport');
    },
    filterLender() {
      this.setFilterList(this.filterLender, 'Lender');
    },
    filterCountry() {
      this.setFilterList(this.filterCountry, 'Country');
    },
    filterBorrower() {
      this.setFilterList(this.filterBorrower, 'Borrower');
    },
    filterCounterparty() {
      this.setFilterList(this.filterCounterparty, 'Counterparty');
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
