const state = {
  account: {},
  address: {},
  company: {},
  contact: {},
  social_media: {},
  professional: {},
  user: {},
  stats: {},
};

export const dashboard = {
  namespaced: true,
  state: state,
  actions: {
    addDashboard({ commit }, payload) {
      commit('STORE_DASHBOARD', payload);
    },
  },
  mutations: {
    STORE_DASHBOARD(state, payload) {
      if (payload.stats) {
        state.stats = payload.stats;
      }
      if (payload.account) {
        state.account = payload.account;
      }
      if (payload.address) {
        state.address = payload.address;
      }
      if (payload.social_media) {
        state.social_media = payload.social_media;
      }
      if (payload.professional) {
        state.professional = payload.professional;
      }
      if (payload.company) {
        state.company = payload.company;
      }
      if (payload.contact) {
        state.contact = payload.contact;
      }
      if (payload.user) {
        state.user = payload.user;
      }
    },
  },
  getters: {
    getLenders: (state) => {
      return state.stats.lenders;
    },
    getAccount: (state) => {
      return state.account;
    },
    getBorrowers: (state) => {
      return state.stats.borrowers;
    },
    getDeals: (state) => {
      return state.stats.deals;
    },
    getMoney: (state) => {
      return state.stats.money;
    },
    getSport: (state) => {
      return state.stats.sport;
    },
    getSocialMedia: (state) => {
      return state.social_media;
    },
    getDealsByCounty: (state) => {
      return state.stats.country.data;
    },
    getDashboard: (state) => {
      return state;
    },
  },
};
