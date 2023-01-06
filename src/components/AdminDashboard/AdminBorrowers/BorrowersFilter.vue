<template>
  <div class="filter-content">
    <div class="filter-section">
      <div class="filter-input-content">
        <v-autocomplete
          v-model="filterType"
          :items="listFilterType"
          solo
          flat
          hide-details
          :label="filterType || 'Type'"
        />
        <!-- <v-autocomplete
      v-model="filterSubtype"
      :items="listFilterSubtype"
      solo
      flat
      hide-details
      :label="filterSubtype || 'Subtype'"
    /> -->
        <v-autocomplete
          v-model="filterCountry"
          :items="listFilterCountry"
          solo
          flat
          hide-details
          :label="filterCountry || 'Country'"
        />
      </div>
    </div>
    <span class="btn-reset" @click="onReSetFilter">Reset</span>
  </div>
</template>
<script>
export default {
  name: 'BorrowersFilter',
  props: {
    listFilterType: {
      type: Array,
      default: new Array(),
    },
    listFilterCountry: {
      type: Array,
      default: new Array(),
    },
    // listFilterSubtype: {
    //   type: Array,
    //   default: new Array(),
    // },
  },
  data() {
    return {
      filterType: '',
      filterCountry: '',
      // filterSubtype: '',
      listFilteredValues: {},
    };
  },
  methods: {
    setFilterList(value, key) {
      this.listFilteredValues = { ...this.listFilteredValues, [key]: value };
      this.$emit('setFilterList', this.listFilteredValues);
    },
    onReSetFilter() {
      this.filterType = '';
      this.filterCountry = '';
      this.listFilteredValues = {};
    },
  },
  watch: {
    filterType() {
      this.setFilterList(this.filterType, 'Type');
    },
    filterCountry() {
      this.setFilterList(this.filterCountry, 'Country');
    },
    // filterSubtype() {
    //   this.setFilterList(this.filterSubtype, 'Subtype');
    // },
  },
};
</script>
<style
  lang="scss"
  scoped
  src="@/assets/styles/admin/filter-content.scss"
></style>
