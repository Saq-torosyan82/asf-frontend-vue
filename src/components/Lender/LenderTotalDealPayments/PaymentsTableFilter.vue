<template>
  <div class="filter-input-content">
    <v-autocomplete
      v-model="filterBorrower"
      :items="listFilterBorrower"
      solo
      flat
      hide-details
      :label="filterBorrower || 'Borrower'"
    />
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
    filterBorrower() {
      this.setFilterList(this.filterBorrower, 'Borrower');
    },
    reset() {
      this.resetFilter(this.reset);
    },
  },
};
</script>
<style lang="scss" scoped>
.filter-input-content {
  width: 160px;
  margin-left: 20px;

  .v-autocomplete {
    border: 1px solid #4289da;
    ::v-deep {
      .v-input__slot {
        font-size: 14px;
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
</style>
