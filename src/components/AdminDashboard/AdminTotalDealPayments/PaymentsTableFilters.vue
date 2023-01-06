<template>
  <div class="filter-container">
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
        v-model="filterBorrowerType"
        :items="listFilterBorrowerType"
        solo
        flat
        hide-details
        :label="filterBorrowerType || 'Borrower Type'"
      />
      <v-autocomplete
        v-model="filterLenderType"
        :items="listFilterLenderType"
        solo
        flat
        hide-details
        :label="filterLenderType || 'Lender Type'"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'PaymentsTableFilters',
  props: {
    listFilterBorrower: {
      type: Array,
      default: new Array(),
    },
    listFilterBorrowerType: {
      type: Array,
      default: new Array(),
    },
    listFilterLender: {
      type: Array,
      default: new Array(),
    },
    listFilterLenderType: {
      type: Array,
      default: new Array(),
    },
    reset: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      filterBorrowerType: '',
      filterBorrower: '',
      filterLender: '',
      filterLenderType: '',
      listFilteredValues: {},
    };
  },
  methods: {
    setFilterList(value, key) {
      this.listFilteredValues = { ...this.listFilteredValues, [key]: value };
      this.$emit('setFilterDealsList', this.listFilteredValues);
    },
    resetFilter(value) {
      if (value) {
        this.filterBorrowerType = '';
        this.filterBorrower = '';
        this.filterLender = '';
        this.filterLenderType = '';
      }
    },
  },
  watch: {
    filterBorrowerType() {
      this.setFilterList(this.filterBorrowerType, 'Borrower Type');
    },
    filterBorrower() {
      this.setFilterList(this.filterBorrower, 'Borrower');
    },
    filterLender() {
      this.setFilterList(this.filterLender, 'Lender');
    },
    filterLenderType() {
      this.setFilterList(this.filterLenderType, 'Lender Type');
    },
    reset() {
      this.resetFilter(this.reset);
    },
  },
};
</script>
<style lang="scss" scoped>
.filter-container {
  padding: 10px;
  overflow-x: auto;
  .filter-input-content {
    display: flex;
    gap: 15px;
    width: 600px;
    .v-autocomplete {
      border: 1px solid #4289da;
      ::v-deep {
        .v-input__slot {
          font-size: 14px;
          padding: 0 5px;
          .v-select__slot {
            input {
              color: #253242;
              text-transform: capitalize;
            }
          }

          .v-label {
            color: #707d8c;
            font-size: 14px;
          }
          .v-icon {
            font-size: 30px;
          }
        }
      }
    }
  }
}
</style>
