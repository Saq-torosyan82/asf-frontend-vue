<template>
  <div class="content-header">
    <span class="txt-title">{{ title }}</span>
    <div class="currency-content">
      <span class="txt-title">Currency</span>
      <v-autocomplete
        v-model="currencyType"
        :items="listCurrencyType"
        solo
        flat
        hide-details
        :label="currencyType || 'Currency'"
        @change="onSelectCurrency"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'AdminTitleAndCurrency',
  props: {
    title: {
      type: String,
      default: new String(),
    },
    defaultCurrency: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      currencyType: '',
      listCurrencyType: ['£ GBP', '$ USD', '€ EURO'],
      currencyMapping: {
        gbp: '£ GBP',
        usd: '$ USD',
        eur: '€ EURO'
      }
    };
  },
  methods: {
    onSelectCurrency() {
      let tmpCurrency = '';
      switch (this.currencyType) {
        case '£ GBP':
          tmpCurrency = 'GBP';
          break;
        case '$ USD':
          tmpCurrency = 'USD';
          break;
        case '€ EURO':
          tmpCurrency = 'EUR';
          break;
        default:
          tmpCurrency = 'no_select';
          break;
      }
      this.$emit('selectedCurrency', tmpCurrency);
    }
  },
  watch: {
    defaultCurrency() {
      if (typeof(this.currencyMapping[this.defaultCurrency]) !== 'undefined') {
        this.currencyType = this.currencyMapping[this.defaultCurrency];
      }
    }
  },
  mounted() {
    if (typeof(this.currencyMapping[this.defaultCurrency]) !== 'undefined') {
      this.currencyType = this.currencyMapping[this.defaultCurrency];
    }
  }
};
</script>
<style lang="scss" scoped>
.content-header {
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 20px;
  .txt-title {
    color: #253242;
    font-size: 16px;
  }
  .currency-content {
    display: flex;
    flex-flow: row;
    align-items: center;
    .txt-title {
      color: #253242;
      font-size: 14px;
      margin-right: 15px;
    }
    .v-autocomplete {
      max-width: 100px;
      border: 1px solid #4289da;
      ::v-deep {
        .v-input__control {
          min-height: 38px;
          .v-input__slot {
            font-size: 12px;
            padding: 0;
            padding-left: 5px;
            .v-select__slot {
              input {
                color: #253242;
                text-transform: capitalize;
                padding: 0;
              }
            }

            .v-label {
              color: #707d8c;
              font-size: 12px;
            }
            .v-icon {
              font-size: 25px;
            }
          }
        }
      }
    }
  }
}
</style>
