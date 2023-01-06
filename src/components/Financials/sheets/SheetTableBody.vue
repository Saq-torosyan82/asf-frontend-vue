<template>
  <div>
    <SheetsTable>
      <thead>
      <tr v-if="positions">
        <td>League Position</td>
        <td v-for="(position, key) in positions" :key="key">
          <span>{{ position }}</span>
        </td>
      </tr>
      <tr v-if="leagues">
        <td>League</td>
        <td v-for="(league, key) in leagues" :key="key">
          <span>{{ league }}</span>
        </td>
      </tr>
      <tr>
        <td>Category</td>
        <td v-for="(season, key) in seasons" :key="key">
          <a v-if="season.type === 'actual'" href="#"> <Icon name="upload-link" /> Interim {{ season.label }}</a>
          <span v-else>{{ season.label }}</span>
        </td>
      </tr>
      </thead>
      <tbody>
      <template v-for="groups in sheetData.items">
          <tr v-for="(data, dataKey) in groups" :key="dataKey" :class="data.style === 'bold' ? 'bold' : ''">
            <td >{{ data.label }}</td>
            <td v-for="(value, key) in data.amounts" :key="key + dataKey">
              <span>{{ getValidValue(value) }}</span>
            </td>
          </tr>
      </template>
      <template v-if="sheetData['Revenue_Breakup_%'] !== undefined">
        <tr class="bold">
          <td colspan="6">{{sheetData['Revenue_Breakup_%']['label']}}</td>
        </tr>
        <tr v-for="(data, dataKey) in sheetData['Revenue_Breakup_%']['items']" :key="data.label + dataKey" :class="data.style === 'bold' ? 'bold' : ''">
          <td>{{ data.label }}</td>
          <td v-for="(value, key) in data['values']" :key="key + dataKey">
            <span>{{ getValidValue(value) }}</span>
          </td>
        </tr>
      </template>
      <tr v-if="sheetData['EBIT_margin_%'] !== undefined" class="bold">
        <td>{{sheetData['EBIT_margin_%'][0]['label']}}</td>
        <td v-for="(value, key) in sheetData['EBIT_margin_%'][0]['values']" :key="key">
          <span>{{ getValidValue(value) }}</span>
        </td>
      </tr>
      </tbody>
    </SheetsTable>
  </div>
</template>

<script>
import store from "@/store";
import Icon from "@/components/Icon.vue";
import SheetsTable from "../SheetsTable.vue";
import RepositoryFactory from "../../../repositories/RepositoryFactory";
const FinancialRepository = RepositoryFactory.get('financial');
import FinancialMixin from "@/mixins/Common/Financial.mixin";
import numeral from "numeral";


export default {
  name: 'SheetTableBody',
  mixins: [FinancialMixin],
  props: {
    sheetData: {
      type: Object,
      required: true,
    },
    seasons: {
      type: Array,
      required: true,
    },
    leagues: {
      type: Array,
    },
    positions: {
      type: Array,
    },
    tabId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      uploadDocumentsModal: false
    }
  },
  components: {
    Icon,
    SheetsTable,
  },
  computed: {
    club() {
      return store.getters['Financials/getFilterClub'];
    }
  },
  methods: {
    getValidValue(value) {
      let validValue = '';
      if (typeof value === 'number' && value !== 0) {
        validValue = value > 0 ? numeral(value).value().toFixed(2) : `(${numeral(Math.abs(value)).value().toFixed(2)})`;
      } else {
        validValue = value === 0 || value === '0%' ? '-' : value;
      }
      return validValue;
    },
  }
};
</script>

<style scoped>
thead {
  width: calc( 100% - 7px );
  min-width: 830px;
}
tbody {
  display: block;
  max-height: 650px;
  min-width: 830px;
  overflow: auto;
  scrollbar-width: thin;
}
tbody::-webkit-scrollbar-track {
  background: #ffffff;
  border-radius: 10px;
}
tbody::-webkit-scrollbar-thumb {
  background: #b6c3d1;
  border-radius: 10px;
}
tbody::-webkit-scrollbar {
  width: 4px;
}
thead, tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed
}
td:first-child {
  width: 20%;
}
td a {
  text-transform:capitalize;
  cursor: default;
}
table tr.bold {
  border-top: 1px solid #e0e3e4
}
</style>
