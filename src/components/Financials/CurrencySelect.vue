<template>
  <div class="currency-select">
    <h3>
      Currency:
    </h3>
    <SelectInput>
      <select @change="onSelectCurrency($event)">
        <option value=""></option>
        <option v-for="(currency, key) in currencies" :value="currency.value"  :key="key" :selected="currency.value == selectedCurrency">{{ currency.label }}</option>
      </select>
    </SelectInput>
  </div>
</template>

<script>
import store from "@/store";
import SelectInput from "@/components/SelectInput.vue";
export default {
  components: {
    SelectInput,
  },
  props: {
    defaultCurrency: {
      type: String,
      default: new String(),
    },
  },
  data() {
    return {
      selectedCurrency: '',
    };
  },
  computed: {
    currencies() {
        return store.getters['Financials/getCurrencies'];
    }
  },
  watch: {
    defaultCurrency() {
      this.selectedCurrency = this.defaultCurrency
    }
  },
  methods: {
    onSelectCurrency(event) {
      this.$emit('selectedCurrency', event.target.value);
    }
  },
};
</script>

<style scoped>
.currency-select {
  display: inline-flex;
  align-items: center;
  gap: 16px;
}
.currency-select h3 {
  font-size: 14px;
  margin: 0;
}
.currency-select select {
  padding: 8px 12px;
  margin: 0;
  min-width: 100px;
}
.currency-select ::v-deep.custom-arrow {
  border-left: 0.4em solid transparent;
  border-right: 0.4em solid transparent;
  border-top: 0.4em solid #253242;
  top: 8px;
  right: 8px;
}
</style>
