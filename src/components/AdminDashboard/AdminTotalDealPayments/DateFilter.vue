<template>
  <div class="date-filter-content">
    <v-menu
      v-model="menu1"
      :close-on-content-click="false"
      :nudge-right="10"
      transition="scale-transition"
      offset-y
      max-width="290px"
      class="data-picker-content"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="startDateFormatted"
          :label="startDateFormatted || 'Start Date'"
          v-bind="attrs"
          v-on="on"
          solo
          flat
          clearable
          hide-details
          persistent-hint
          readonly
          append-icon="mdi-calendar"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="startDate"
        no-title
        @input="menu1 = false"
      ></v-date-picker>
    </v-menu>
    <v-menu
      v-model="menu2"
      :close-on-content-click="false"
      :nudge-right="10"
      transition="scale-transition"
      offset-y
      max-width="290px"
      class="data-picker-content"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="endDateFormatted"
          :label="endDateFormatted || 'End Date'"
          v-bind="attrs"
          v-on="on"
          solo
          flat
          clearable
          hide-details
          persistent-hint
          readonly
          append-icon="mdi-calendar"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="endDate"
        no-title
        @input="menu2 = false"
      ></v-date-picker>
    </v-menu>
  </div>
</template>
<script>
import moment from 'moment';
export default {
  data() {
    return {
      menu1: false,
      menu2: false,
      startDate: null,
      endDate: null,
      startDateFormatted: '',
      endDateFormatted: '',
    };
  },

  methods: {
    setFilterList(value, key) {
      this.listFilteredValues = {
        ...this.listFilteredValues,
        [key]: value ? new Date(value).getTime() : '',
      };

      this.$emit('setFilterDealsList', this.listFilteredValues);
    },
    parseDate(date) {
      if (!date) return null;
      const [month, day, year] = date.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    },
  },
  watch: {
    startDate() {
      this.startDateFormatted = moment(this.startDate).format('DD.MM.YYYY');
    },
    endDate() {
      this.endDateFormatted = moment(this.endDate).format('DD.MM.YYYY');
    },
    startDateFormatted() {
      this.setFilterList(
        this.startDateFormatted ? this.startDate : '',
        'start_date'
      );
    },
    endDateFormatted() {
      this.setFilterList(this.endDateFormatted ? this.endDate : '', 'end_date');
    },
  },
};
</script>
<style lang="scss" scoped>
.date-filter-content {
  display: flex;
  gap: 20px;
  max-width: 440px;
  .v-text-field {
    border: 1px solid #4289da;
  }
}
</style>
