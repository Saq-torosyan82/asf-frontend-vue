import {saveExcel} from "@progress/kendo-vue-excel-export";
import Utils from "@/services/utils";

export default {
  data() {
    return {
      xlsx_fields: {
        '  ': 'col1',
        ' ': 'col2',
        '   ': 'col3',
        '     ': 'col4',
        '': 'col5',
        '    ': 'col6',
      },

      columns: [
        { field: 'col1', title: ' '},
        { field: 'col2', title: ' '},
        { field: 'col3', title: ' '},
        { field: 'col4', title: ' '},
        { field: 'col5', title: ' '},
        { field: 'col6', title: ' '},
      ],
      xlsx_data: [],
      xlsx_meta: [
        [
          {
            key: 'charset',
            value: 'utf-8',
          },
        ],
      ],
    };
  },

  computed: {},
  methods: {
    exportExcel (fileName) {
      saveExcel({
        data: this.xlsx_data,
        fileName: fileName,
        columns: this.columns
      });
    },
    completeXlsx() {
      this.xlsx_data = [];

      this.xlsx_data.push({
        col1:
          'Deal value:  ' +
          this.currency +
          ' ' +
            this.$options.filters.roundingUp(this.$options.filters.numFormat(this.info.netLoanAmount)),
        col2: '',
        col3:
          'Amount paid upfront:  ' +
          this.currency +
          ' ' +
            this.$options.filters.roundingUp(this.$options.filters.numFormat(this.info.upfrontValue)),
        col4: '',
        col5: 'Frequency:  ' + this.info.frequency,
        col6: '',
      });

      this.xlsx_data.push({
        col1:
          'Funding date: ' +
          this.$moment(this.info.fundingDate).format('DD/MM/YYYY'),
        col2: '',
        col3:
          'Indicative legal cost:  ' +
          this.currency +
          ' ' +
            this.$options.filters.roundingUp(this.$options.filters.numFormat(this.legalCost)),
        col4: '',
        col5: 'Indicative interest rate: ' + this.interestRate + ' %',
        col6: '',
      });

      this.emptyRow();

      this.xlsx_data.push({
        col1: '',
        col2: 'Payment dates',
        col3: 'Payment installments',
        col4: 'Of which interest',
        col5: 'Of which principal',
        col6: '',
      });

      this.paymentEntries.map((item, key) => {
        this.xlsx_data.push({
          col1: key + 1,
          col2: this.$moment(item.paymentDate).format('DD/MM/YYYY'),
          col3:
            this.currency +
            ' ' +
            this.$options.filters.numFormat(item.paymentAmount),
          col4:
            this.currency +
            ' ' +
            this.$options.filters.numFormat(item.interestCharged),
          col5:
            this.currency +
            ' ' +
            this.$options.filters.numFormat(item.grossAmount),
          col6: '',
        });
      });

      this.emptyRow();

      this.xlsx_data.push({
        col1: 'Total',
        col2: '',
        col3: this.currency + ' ' + this.$options.filters.roundingUp(this.$options.filters.numFormat(this.total)),
        col4:
          this.currency +
          ' ' +
            this.$options.filters.roundingUp(this.$options.filters.numFormat(this.interestChargeTotal)),
        col5:
          this.currency +
          ' ' +
            this.$options.filters.roundingUp(this.$options.filters.numFormat(this.info.netLoanAmount + this.getTotalFees())),
        col6: '',
      });

      this.emptyRow();

      this.xlsx_data.push({
        col1: 'Underwriting fee',
        col2: '',
        col3: '',
        col4: '',
        col5: '',
        col6:
          this.currency +
          ' ' +
            this.$options.filters.roundingUp(this.underwritingFee),
      });

      this.xlsx_data.push({
        col1: 'Legal Fee',
        col2: '',
        col3: '',
        col4: '',
        col5: '',
        col6:
          this.currency +
          ' ' +
            this.$options.filters.roundingUp(this.$options.filters.numFormat(
            this.getFeesAmount(this.feesLegalAndPrincipal)
          )),
      });

      this.xlsx_data.push({
        col1: 'Total fees',
        col2: '',
        col3: '',
        col4: '',
        col5: '',
        col6:
          this.currency +
          ' ' +
            this.$options.filters.roundingUp(this.$options.filters.numFormat(this.getTotalFees())),
      });

      this.emptyRow();

      this.xlsx_data.push({
        col1: 'Total amount payable',
        col2: '',
        col3: '',
        col4: '',
        col5: '',
        col6:
          this.currency +
          ' ' +
            this.$options.filters.roundingUp(this.$options.filters.numFormat(this.total + this.getTotalFees())),
      });

      this.xlsx_data.push({
        col1: 'Recommended transfer fee',
        col2: '',
        col3: '',
        col4: '',
        col5: '',
        col6:
            this.currency +
            ' ' +
            this.$options.filters.roundingUp(this.$options.filters.numFormat(Utils.parseNum(this.info.guaranteedContractAmount) + this.interestChargeTotal + this.getTotalFees())),
      });
    },
    emptyRow() {
      this.xlsx_data.push({
        col1: '',
        col2: '',
        col3: '',
        col4: '',
        col5: '',
        col6: '',
      });
    },
  },
};
