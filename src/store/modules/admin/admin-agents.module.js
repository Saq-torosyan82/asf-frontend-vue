const state = {
    agents:[]
};

export const adminAgents = {
    namespaced: true,
    state: state,
    actions: {
        storeAgents({commit}, payload) {
            commit('STORE_AGENTS', payload);
        },


    },
    mutations: {
        STORE_AGENTS(state, payload) {
            state.agents = payload;
        },

    },
    getters: {
        getAgents: (state) => {
            return state.agents;
        }
    }
};