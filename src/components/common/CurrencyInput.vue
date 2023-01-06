<template>
  <div>
    <input v-if="isInputActive" @change="$emit('change')"  :disabled="disabled" type="number" v-model="displayValue" @blur="isInputActive = false" @focus="isInputActive = true"/>
    <input v-else type="text" :disabled="disabled" v-model="displayValue" @blur="isInputActive = false" @focus="isInputActive = true"/>
  </div>
</template>

<script>
export default {
  name: "CurrencyInput",
  data() {
    return {
      isInputActive: false
    }
  },
  props: {
    value: {
      default: 0
    },
    disabled: {
      default: false
    },
    currency: {
      default: '$'
    }
  },
  computed: {
    displayValue: {
      get: function() {
        if (this.isInputActive) {
          return this.value.toString()
        } else {
          if(this.value !== '') {
            return this.currency+" " + parseFloat(this.value).toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
          }
          return this.value;
        }
      },
      set: function(modifiedValue) {
        let newValue = parseFloat(modifiedValue.replace(/[^\d.]/g, ""))
        if (isNaN(newValue)) {
          newValue = 0
        }
        this.$emit('input', newValue)
      }
    }
  }
}
</script>

<style scoped>
input {
  position: relative;
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  padding: 15.5px 16px;
  border: 1px solid #d9dfe5;
  border-radius: 4px;
  margin-top: 8px;
  box-shadow: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

</style>