const state = {
    athletes: []
};

export const adminAthletes = {
    namespaced: true,
    state: state,
    actions: {
        storeAthletes({commit}, payload) {
            commit('STORE_ATHLETES', payload);
        },


    },
    mutations: {
        STORE_ATHLETES(state, payload) {
            state.athletes = payload;
        },

    },
    getters: {
        getAthletes: (state) => {
            return state.athletes;
        }
    }
};