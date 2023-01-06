const state = {
  data: {},
  filter: {
    sport: '',
    country: '',
    league: '',
    club: '',
  },
  documents: [],
};

export const Financials = {
  namespaced: true,
  state: state,
  actions: {
    storeData({ commit }, payload) {
      commit('STORE_DATA', payload);
    },

    storeDocuments({ commit }, payload) {
      commit('STORE_DOCUMENTS', payload);
    },
  },
  mutations: {
    STORE_DATA(state, payload) {
      state.data = payload;
    },
    STORE_DOCUMENTS(state, payload) {
      state.documents = payload;
    },
    updateFilterSport(state, payload) {
      state.filter.sport = payload;
    },
    updateFilterCountry(state, payload) {
      state.filter.country = payload;
    },
    updateFilterLeague(state, payload) {
      state.filter.league = payload;
    },
    updateFilterClub(state, payload) {
      state.filter.club = payload;
    },
  },
  getters: {
    getFilterLeague: (state) => {
      return state.filter.league;
    },
    getFilterClub: (state) => {
      return state.filter.club;
    },
    getFilterCountry: (state) => {
      return state.filter.country;
    },
    getFilterSport: (state) => {
      return state.filter.sport;
    },
    getState: (state) => {
      return state;
    },
    getDocuments: (state) => {
      return state.documents;
    },
    getDocumentsStatuses: (state) => {
      let documentsStatuses = [];
      Object.values(state.documents).forEach((e) => {
        documentsStatuses[e.label] = []
            e.items.map((doc) => {
              documentsStatuses[e.label].push({
                  id: doc.id,
                  status: doc.status,
                  status_label: doc.status_label
              });
            });
      })
      return documentsStatuses;
    },
    getClubName: (state) => {
      return state.data.club_name;
    },
    getTitle: (state) => {
      return state.data.title;
    },
    getCurrencies: (state) => {
      return state.data.currencies;
    },
    getAvatar: (state) => {
      return state.data.avatar;
    },
    getTabs: (state) => {
      return state.data;
    },
    getSports: (state) => {
      return state.data.sports;
    },
    getIsLocked: (state) => {
      return state.data.is_locked;
    },
  },
};
