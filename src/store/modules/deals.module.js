import User from '@/modules/User/User';
const state = {
  fullDeals: [],
  deals: [],
  pagination: {
    count: 5,
    current_page: 1,
    links: {},
    per_page: 5,
    total: '',
    total_pages: '',
  },
  sorting: [],
  filtering: [],
  searchQuery: '',
  orderQuery: '',
  type: User.isLender() ? 'current' : 'live',
  redirect: false
};

export const Deals = {
  namespaced: true,
  state: state,
  actions: {
    storeFullDeals({ commit }, data) {
      commit('setFullDeals', data);
    },
    storeDeals({ commit }, payload) {
      commit('STORE_DEALS', payload);
    },
    storeDealsSorting({ commit }, payload) {
      commit('STORE_DEALS_SORTING', payload);
    },
    storeDealsFiltering({ commit }, payload) {
      commit('STORE_DEALS_FILTERING', payload);
    },
    setPagination({ commit }, payload) {
      commit('SET_PAGINATION', payload);
    },
    setPage({ commit }, page) {
      commit('SET_PAGE', page);
    },
    setSearchQuery({ commit }, page) {
      commit('SET_SEARCH_QUERY', page);
    },
    setOrderQuery({ commit }, page) {
      commit('SET_ORDER_QUERY', page);
    },
    setType({ commit }, type) {
      commit('SET_TYPE', type);
    },
    toggleRedirect({ commit }) {
      commit('toggleRedirect');
    },
  },
  mutations: {
    toggleRedirect(state) {
      state.redirect = !state.redirect;
    },
    setFullDeals(state, data) {
      state.fullDeals = data;
    },
    SET_TYPE(state, type) {
      state.type = type;
    },
    STORE_DEALS(state, payload) {
      state.deals = payload;
    },
    STORE_DEALS_SORTING(state, payload) {
      state.sorting = payload;
    },
    STORE_DEALS_FILTERING(state, payload) {
      state.filtering = payload;
    },
    SET_PAGINATION(state, payload) {
      state.pagination = payload;
    },
    SET_SEARCH_QUERY(state, payload) {
      state.searchQuery = payload;
    },
    SET_ORDER_QUERY(state, payload) {
      state.orderQuery = payload;
    },
    SET_PAGE(state, page) {
      state.pagination.current_page = page;
    },
  },
  getters: {
    getDeals: (state) => {
      return state.deals;
    },
    getDealsSorting: (state) => {
      return state.sorting;
    },
    getDealsFiltering: (state) => {
      return state.filtering;
    },
    getPagination: (state) => {
      return state.pagination;
    },
    getSearchQuery: (state) => {
      return state.searchQuery;
    },
    getOrderQuery: (state) => {
      return state.orderQuery;
    },
    getFullDeals: (state) => {
      return state.fullDeals;
    },
    getType: (state) => {
      return state.type;
    },
    isRedirected: (state) => {
      return state.redirect;
    },
  },
};
