import RepositoryFactory from '../../repositories/RepositoryFactory';
const SystemRepository = RepositoryFactory.get('system');

const state = {
  criteria: {},
  countries: {},
  sports: {},
};

export const lenderCriteria = {
  namespaced: true,
  state: state,
  actions: {
    getCriteria({ commit }) {
      SystemRepository.getLenderCriteria()
        .then((response) => {
          commit('STORE_CRETERIA', response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getCountries({ commit }) {
      SystemRepository.getCountries()
        .then((response) => {
          commit('STORE_COUNTRIES', response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getSports({ commit }) {
      SystemRepository.getSports()
        .then((response) => {
          commit('STORE_SPORTS', response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  mutations: {
    STORE_CRETERIA(state, payload) {
      state.criteria = payload;
    },
    STORE_COUNTRIES(state, payload) {
      state.countries = payload;
    },
    STORE_SPORTS(state, payload) {
      state.sports = payload;
    },
  },
  getters: {
    getInfo: (state) => {
      return state;
    },
    getLenderTypes: (state) => {
      return state.criteria.lender_type;
    },
    getCountries: (state) => {
      return state.countries;
    },
    getDealTypes: (state) => {
      return state.criteria.deal_type;
    },
    getCurrency: (state) => {
      return state.criteria.currency;
    },
    getSports: (state) => {
      return state.sports;
    },
    getMinAmount: (state) => {
      return state.criteria.min_amount;
    },
    getMaxAmount: (state) => {
      return state.criteria.max_amount;
    },
    getMinTenor: (state) => {
      return state.criteria.min_tenor;
    },
    getMaxTenor: (state) => {
      return state.criteria.max_tenor;
    },
    getMinInterestRate: (state) => {
      return state.criteria.min_interest;
    },
    getInterestRange: (state) => {
      return state.criteria.interest_range;
    },
  },
};
