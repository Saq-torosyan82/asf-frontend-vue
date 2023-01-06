//TODO clear state when deal detail endpoint is ready !IMPORTANT
const state = {
  deal: {},
  updateDealDetail: false,
  signContract: false,
  showDealDetail: false,
};

export const dealDetail = {
  namespaced: true,
  state: state,
  actions: {
    setDeal({ commit }, deal) {
      commit("SET_DEAL", deal);
    },
    updateDealFlag({ commit }, flag) {
      commit("UPDATE_DEAL_FLAG", flag);
    },
    signContractFlag({ commit }, flag) {
      commit("SIGN_CONTRACT_FLAG", flag);
    },
    showDealDetail({ commit }, flag) {
      commit("SHOW_DEAL_DETAIL", flag);
    },
  },
  mutations: {
    SET_DEAL(state, deal) {
      state.deal = deal;
    },
    SIGN_CONTRACT_FLAG(state, flag) {
      state.signContract = flag;
    },
    UPDATE_DEAL_FLAG(state, flag) {
      state.updateDealDetail = flag;
    },
    SHOW_DEAL_DETAIL(state, flag) {
      state.showDealDetail = flag;
    },
  },
  getters: {
    getState: (state) => {
      return state.deal;
    },
    getOffer: (state) => {
      return state.deal.offer;
    },
    getLenderCriterias: (state) => {
      return state.deal.lender_criterias;
    },
    getIsMatched: (state) => {
      return state.deal.is_matched;
    },
    getOffers: (state) => {
      return state.deal.offers;
    },
    getUpdateDealFlag: (state) => {
      return state.deal.updateDealDetail;
    },
    getLastPayment: (state) => {
      return state.deal.payments_data[parseInt(state.deal.payments_data.length) - 1];
    },
    getCurrency: (state) => {
      switch (state.deal.currency) {
        case "USD":
          return "$";
        case "GBP":
          return "£";
        default:
          return "€";
      }
    },
    getDealAmount: (state) => {
      return state.deal.deal_amount;
    },
    getTotalReceivedAndTotalReceive: (state) => {
      let received = 0;
      let receive = 0;
      state.deal.payments_data.map((payment, index) => {
        if (payment.paid) {
          received = received + parseFloat(payment.paymentAmount);
        } else {
          receive = receive + parseFloat(payment.paymentAmount);
        }
      });

      return {
        received: received,
        receive: receive,
      };
    },
    idCreditAnalysisDocumentUploaded: (state) => {
        let uploaded = false;
          state.deal.user_documents.forEach((item) => {
            if(item.type === 'credit_analysis') {
              uploaded = true;
            }
          });

        return uploaded;
   },
    getContractAmount: (state) => {
      return state.deal.contract_amount;
    },
    getContract: (state) => {
      return state.deal.contract;
    },
    getUpFrontAmount: (state) => {
      return state.deal.upfront_amount;
    },
    getFrequency: (state) => {
      return state.deal.frequency;
    },
    getFundingDate: (state) => {
      return state.deal.funding_date;
    },
    getLegalCost: (state) => {
      return state.deal.fees_data.legalCost;
    },
    getInterestRate: (state) => {
      return state.deal.interest_rate;
    },
    getPaymentRates: (state) => {
      return state.deal.payments_data;
    },
    getGrossAmount: (state) => {
      return state.deal.gross_amount;
    },
    getBorrower: (state) => {
      return state.deal.borrower;
    },
    getCounterparty: (state) => {
      return state.deal.counterparty;
    },
    getContactData: (state) => {
      return state.deal.contact_data;
    },
    getlender: (state) => {
      return state.deal.lender;
    },
    getAthlete: (state) => {
      return state.deal.criteria_data.athlete;
    },
    getStatusBar: (state) => {
      return state.deal.status_bar;
    },
    getStatus: (state) => {
      return state.deal.status;
    },
    getReason: (state) => {
      return state.deal.reason;
    },
    getNextPayment: (state) => {
      return state.deal.next_payment;
    },
    getDocuments: (state) => {
      return state.deal.user_documents;
    },
    getContractUrl: (state) => {
      return state.deal.contract.current.url;
    },
    getDealId: (state) => {
      return state.deal.id;
    },
    getSignContractFlag: (state) => {
      return state.signContract;
    },
    getShowDealDetail: (state) => {
      return state.showDealDetail;
    },
    getConsentFile: (state) => {
      return state.deal.consent_data.consentFile;
    },
    getQuoteType: (state) => {
      return state.deal.quote_type;
    },
    getContractExpenseChartData: (state, getters) => {
      return {
        datasets: [
          {
            backgroundColor: ["#D9DFE5", "#90DC13"],
            data: [getters.getDealAmount, getters.getTotalReceivedAndTotalReceive.received],
          },
        ],
      };
    },
  },
};
