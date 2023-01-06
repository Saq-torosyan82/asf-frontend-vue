<template>
  <div class="value-list-content tb-blue">
    <div>
    <table>
      <thead>
        <tr>
          <td>{{ valueList.label }}</td>
          <td v-for="col in valueListCol" :key="col">{{ col }}</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in valueList.items" :key="index">
          <td>{{item.label}}</td>
          <td v-for="(amount, index) in item.amounts" :key="index">{{getValidValue(amount)}}</td>
          <td v-if="item.growth">{{item.growth}}</td>
          <td>{{item.ranking || ''}}</td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>
<script>
import numeral from "numeral";

export default {
  props: {
    valueListCol: {
      type: Array,
      default: new Array(),
    },
    valueList: {
      type: Object,
      default: new Object(),
    },
    forPrint: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    arrayReverse() {
      if (!this.forPrint) {
        let len = this.valueList.items.length;
        for (let i = 0; i < len; i++) {
          this.valueList.items[i].amounts = this.valueList.items[i].amounts.reverse();
        }
      }
    },
    getValidValue(value) {
      let validValue = value;
      if (typeof value === 'number' && value !== 0) {
        validValue = numeral(value).value().toFixed(2);
      }
      return validValue;
    },
  },
  mounted() {
    this.arrayReverse()
  },
  watch: {
    valueList() {
      this.arrayReverse()
    }
  },
};
</script>
