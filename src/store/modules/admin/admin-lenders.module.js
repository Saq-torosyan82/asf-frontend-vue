const state = {
    lenders: []
};

export const adminLenders = {
    namespaced: true,
    state: state,
    actions: {
        storeLenders({commit}, payload) {
            commit('STORE_LENDERS', payload);
        },


    },
    mutations: {
        STORE_LENDERS(state, payload) {
            state.lenders = payload;
        },

    },
    getters: {
        getLenders: (state) => {
            return state.lenders;
        }
    }
};