<template>
  <div class="value-split-list-content">
    <table>
      <thead>
        <tr>
          <td>Value</td>
          <td v-for="col in valueSplitListCol" :key="col">
            {{ col }}
          </td>
        </tr>
      </thead>
      <tbody>
        <tr class="tr-label">
          <td>{{ revenueSplitList.label }}</td>
          <td v-for="col in valueSplitListCol" :key="col"></td>
        </tr>
        <tr
          v-for="(key, index) in Object.keys(revenueSplitList.items)"
          :key="index"
        >
          <td>{{ revenueSplitList.items[key].label || '--' }}</td>
          <td v-for="(col, index) in valueSplitListCol" :key="col">
            <span
              :class="
                setNegativePercentage(
                  index,
                  revenueSplitList.items[key].percentages
                ) && 'red-label'
              "
            >
              {{
                formatPercentage(index, revenueSplitList.items[key].percentages)
              }}</span
            >
          </td>
        </tr>
      </tbody>
      <tbody v-for="(value, index) in valueSplitList" :key="index">
        <tr class="tr-label">
          <td>{{ value.label }}</td>
          <td v-for="col in valueSplitListCol" :key="col"></td>
        </tr>
        <tr v-for="(row, index) in value.items" :key="index">
          <td>{{ row.label }}</td>
          <td v-for="(col, index) in valueSplitListCol" :key="col">
            <span :class="setNegativeNumber(row.amounts[index]) && 'red-label'">
              {{ formatNumber(row.amounts[index]) }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    valueSplitListCol: {
      type: Array,
      default: new Array(),
    },
    revenueSplitList: {
      type: Object,
      default: new Object(),
    },
    valueSplitList: {
      type: Array,
      default: new Array(),
    },
  },
  methods: {
    setNegativePercentage(index, value) {
      const tmp = value[index].slice(0, value[index].length - 1);
      return !isNaN(parseFloat(tmp)) && parseFloat(tmp) < 0;
    },
    formatPercentage(index, value) {
      const tmp = value[index].slice(0, value[index].length - 1);
      let result = '--';

      if (this.setNegativePercentage(index, value)) {
        result = `(${Math.abs(parseFloat(tmp))})%`;
      } else {
        if (!isNaN(parseFloat(tmp))) {
          result = value[index];
        }
      }

      return result;
    },
    setNegativeNumber(value) {
      return !isNaN(parseFloat(value)) && parseFloat(value) < 0;
    },
    formatNumber(value) {
      if (this.setNegativeNumber(value)) {
        return `(${Math.abs(value)})`;
      } else {
        return value;
      }
    },
  },
};
</script>
