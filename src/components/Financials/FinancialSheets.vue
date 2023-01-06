<template>
  <div class="sheets">
    <p v-if="numbersIn" class="numbers-in-message">
      * numbers are in {{ numbersIn }}s
    </p>
    <b-tabs content-class="">
      <b-tab
        v-for="(tab, key) in tabs.items"
        :key="key"
        :title="key"
        :active="key === sheetFirstItem"
        @click="tabChanged(key)"
      >
        <SheetTableBody
          :sheet-data="tab"
          :tab-id="tab.id"
          :seasons="tabs.seasons"
          :leagues="tabs.leagues"
          :positions="tabs.positions"
        />
      </b-tab>
      <b-tab
        v-if="userIsAdmin && showDocTab"
        :title="lastTab"
        @click="tabChanged(lastTab)"
      >
        <Documents :changedClub="changedClub" />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import store from '@/store';
import Documents from '@/components/Financials/sheets/Documents';
import SheetTableBody from './sheets/SheetTableBody';

import User from '@/modules/User/User';

export default {
  name: 'Sheets',
  components: {
    SheetTableBody,
    Documents,
  },
  data() {
    return {
      sheetFirstItem: '',
      showDocTab: false,
      numbersIn: '',
    };
  },
  props: {
    changedClub: Boolean,
    lastTab: {
      type: String,
      default: '',
    },
  },
  methods: {
    tabChanged(key) {
      this.$emit('tabChanged', key);
    },
  },
  computed: {
    userIsAdmin() {
      return !!User.isAdmin();
    },
    tabs() {
      return store.getters['Financials/getTabs'];
    },
  },
  watch: {
    tabs() {
      this.showDocTab = true;
      this.$emit('financialDataChanged', this.tabs);
      this.sheetFirstItem = Object.keys(this.tabs.items)[0];
      this.numbersIn = this.tabs.numbers_in;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .nav-tabs,
::v-deep .nav-tabs .nav-link.active,
::v-deep .nav-tabs .nav-item.show .nav-link {
  border-color: white;
  border-bottom: none;
  margin-bottom: 0;
}
::v-deep .nav-tabs a.nav-link.active {
  font-weight: 700;
  color: #253242;
}
::v-deep .nav-tabs a {
  font-size: 14px;
  font-weight: 400;
  color: #707d8c;
  background-color: #f6f6f6;
  margin-right: 8px;
  border: none;
}
::v-deep .nav-tabs a:hover {
  border: none;
}
.sheets .tabs::v-deep .tab-content.tab-content {
  background-color: white;
  border-radius: 0 8px 8px 8px;
}

.sheets {
  position: relative;
  max-width: 100%;
  ::v-deep {
    .tab-content {
      max-width: 100%;
      overflow-x: scroll;
    }
    table {
      td {
        min-width: 70px;
      }
    }
  }
}
.numbers-in-message {
  position: absolute;
  top: 17px;
  right: 0;
  font-size: 14px;
  margin-bottom: 0;
}
@media screen and (max-width: 870px) {
  .sheets .numbers-in-message {
    top: unset;
    bottom: -23px;
  }
}
</style>
