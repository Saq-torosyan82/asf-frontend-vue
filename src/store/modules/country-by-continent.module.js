import countryContinent from '@/assets/js/countryContinent.json';
const state = {
  continent: '',
  data: countryContinent,
};
export const countryByContinent = {
  namespaced: true,
  state: state,
  actions: {
    getCountryByContinent({ commit }, continent) {
      commit('setCountryByContinent', continent);
    },
  },
  mutations: {
    setCountryByContinent(state, continent) {
      state.continent = continent;
    },
  },
  getters: {
    fullCountryByContinent: (state) => {
      return state.data;
    },
    countryByContinent: (state) => {
      return state.data
        .filter((e) => e.continent === state.continent)
        .map((e) => e.country);
    },
  },
};
