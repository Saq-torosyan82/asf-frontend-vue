<template>
  <div class="filter-input-content">
    <div class="filter-1">
      <v-autocomplete
        v-model="filterCountry"
        :items="listFilterCountry"
        solo
        flat
        hide-details
        :label="filterCountry || 'Country'"
      />
      <v-autocomplete
        v-model="filterDealType"
        :items="listFilterDealType"
        solo
        flat
        hide-details
        :label="filterDealType || 'Deal Type'"
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
        v-model="filterBorrower"
        :items="listFilterBorrower"
        solo
        flat
        hide-details
        :label="filterBorrower || 'Borrower'"
      />
      <v-autocomplete
        v-model="filterObligorRisk"
        :items="listFilterObligorRisk"
        solo
        flat
        hide-details
        :label="filterObligorRisk || 'Obligor Risk'"
      />
    </div>
    <div class="filter-2">
      <v-autocomplete
        v-model="filterStatus"
        :items="listFilterStatus"
        solo
        flat
        hide-details
        :label="filterStatus || 'Status'"
      />
      <button @click="resetFilter" class="button">Reset</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DealsFilter',
  props: {
    listFilterCountry: {
      type: Array,
      default: new Array(),
    },
    listFilterDealType: {
      type: Array,
      default: new Array(),
    },
    listFilterSport: {
      type: Array,
      default: new Array(),
    },
    listFilterBorrower: {
      type: Array,
      default: new Array(),
    },
    listFilterObligorRisk: {
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
      filterDealType: '',
      filterBorrower: '',
      filterSport: '',
      filterObligorRisk: '',
      filterCountry: '',
      filterStatus: '',
      listFilteredValues: {},
    };
  },
  methods: {
    setFilterList(value, key) {
      this.listFilteredValues = { ...this.listFilteredValues, [key]: value };
      this.$emit('setFilterDealsList', this.listFilteredValues);
    },
    resetFilter() {
      this.filterDealType = '';
      this.filterBorrower = '';
      this.filterSport = '';
      this.filterObligorRisk = '';
      this.filterCountry = '';
      this.filterStatus = '';
      this.listFilteredValues = {};
    },
  },
  watch: {
    filterDealType() {
      this.setFilterList(this.filterDealType, 'Deal Type');
    },
    filterBorrower() {
      this.setFilterList(this.filterBorrower, 'Borrower');
    },
    filterSport() {
      this.setFilterList(this.filterSport, 'Sport');
    },
    filterObligorRisk() {
      this.setFilterList(this.filterObligorRisk, 'Obligor Risk');
    },
    filterCountry() {
      this.setFilterList(this.filterCountry, 'Country');
    },
    filterStatus() {
      this.setFilterList(this.filterStatus, 'Status');
    },
  },
};
</script>
<style lang="scss" scoped>
/*
.filter-input-content {
  display: grid;
  margin-top: 55px;
  grid-gap: 30px 37px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  padding-right: 20px;
  }
*/
.button {
  color: #ffffff;
  padding: 8px 0;
  background-color: var(--primary);
  border-radius: 4px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 700;
  width: 100px;
}

.filter-input-content {
  display: flex;
  justify-content: space-between;
  gap: 10px;

  .v-autocomplete {
    max-width: 110px;
    border: 1px solid var(--primary);

    ::v-deep {
      .v-input__control {
        min-height: 36px;
      }
      .v-input__append-inner {
        padding-left: 0;
      }
      .v-input__slot.v-input__slot {
        font-size: 12px;
        padding: 0 0 0 5px !important;
        .v-select__slot {
          input {
            color: #253242;
            text-transform: capitalize;
          }
        }

        .v-label {
          color: #707d8c;
          font-size: 13px;
        }
        .v-icon {
          padding-top: 2px;
          font-size: 20px;
        }
      }
    }
  }
  .filter-1 {
    margin: 0 auto;
    max-width: 100%;
    display: flex;
    flex-flow: row;
    gap: 10px;
  }
  .filter-2 {
    display: flex;
    flex-flow: row;
    gap: 10px;
  }
}
</style>
