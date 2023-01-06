import store from '@/store';
import RepositoryFactory from '../../repositories/RepositoryFactory';
import hardcodedvalues from '../../enums/dealCalculator/hardcodedvalues';
const DealRepository = RepositoryFactory.get('deal');

export default {

    methods: {
     async getDealDetail(id) {
         const $this = this;
         if (id === null) {
             $this.showDealDetail = false;
             store.dispatch('dealDetail/showDealDetail', false);
             $this.$loading(false);
         } else {
         $this.showDealDetail = false;
         $this.$loading(true);
         await DealRepository.getDealDetail(id)
             .then((response) => {
                 store.dispatch('dealCalculator/dealId', response.data.data.id);

                 store.dispatch('dealCalculator/addFirstStepInfo', {
                     deal_type: response.data.data.deal_type,
                     contract_type: response.data.data.contract_type,
                 });

                 store.dispatch('dealCalculator/addStep2Info', {
                     tvHolder: response.data.data.criteria_data.tvHolder,
                     sponsorsOrBrandsIdentifier:
                     response.data.data.criteria_data.sponsorsOrBrandsIdentifier,
                     sponsorOrBrand: response.data.data.criteria_data.sponsorOrBrand,
                     league: response.data.data.criteria_data.league,
                     club: response.data.data.criteria_data.club,
                 });

                 store.dispatch('dealCalculator/addStep3Info', {
                     currency: response.data.data.currency,
                     contractValue: String(response.data.data.contract_amount),
                     upfrontValue: String(response.data.data.upfront_amount),
                     firstInstalment: response.data.data.first_installment,
                     frequency: response.data.data.frequency,
                     numberOfInstalments: response.data.data.payments_data.length + 1,
                     fundingDate: response.data.data.funding_date,
                     netLoanAmount: response.data.data.contract_data ? response.data.data.contract_data.net_amount : '',
                 });

                 store.dispatch('dealCalculator/addStep4Info', {
                     legalCost: response.data.data.fees_data.legalCost,
                     costs: response.data.data.fees_data.costs,
                     insuranceExpense: response.data.data.fees_data.insuranceExpense,
                     paymentEntries: response.data.data.payments_data,
                     interestRate: response.data.data.interest_rate,
                     total: response.data.data.contract_amount,
                     grossTotal: response.data.data.gross_amount,
                     totalOfDeal: response.data.data.deal_amount,
                 });

                 store.dispatch('dealDetail/setDeal', response.data.data);
                 store.dispatch('dealDetail/updateDealFlag', false);
                 store.dispatch('dealDetail/showDealDetail', true);
                 $this.showDealDetail = true;
                 $this.$loading(false);
             })
             .catch((error) => {
                 console.error(error);
                 $this.showDealDetail = false;
                 store.dispatch('dealDetail/showDealDetail', false);
                 $this.$loading(false);
             });
     }
    },
  },
};
