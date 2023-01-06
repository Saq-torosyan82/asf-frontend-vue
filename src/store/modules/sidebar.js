const types = {
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  OPEN_SIDEBAR: 'OPEN_SIDEBAR',
  CLOSE_SIDEBAR: 'CLOSE_SIDEBAR',
};

// initial state
// shape: [{ id, quantity }]
const state = {
  sidebarOpen: false,
};

// getters
const getters = {
  sidebarOpen: (state) => state.sidebarOpen,
};

// actions
const actions = {
  toggleSidebar({ commit }) {
    commit(types.TOGGLE_SIDEBAR);
  },
  closeSidebar({ commit }) {
    commit(types.CLOSE_SIDEBAR);
  },
  openSidebar({ commit }) {
    commit(types.OPEN_SIDEBAR);
  },
};

// mutations
const mutations = {
  [types.TOGGLE_SIDEBAR](state) {
    state.sidebarOpen = !state.sidebarOpen;
  },
  [types.CLOSE_SIDEBAR](state) {
    state.sidebarOpen = false;
  },
  [types.OPEN_SIDEBAR](state) {
    state.sidebarOpen = true;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
