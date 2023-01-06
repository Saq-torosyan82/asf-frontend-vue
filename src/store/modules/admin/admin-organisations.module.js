const state = {
    organisations: []
};

export const adminOrganisations = {
    namespaced: true,
    state: state,
    actions: {
        storeOrganisations({commit}, payload) {
            commit('STORE_ORGANISATIONS', payload);
        },


    },
    mutations: {
        STORE_ORGANISATIONS(state, payload) {
            state.organisations = payload;
        },

    },
    getters: {
        getOrganisations: (state) => {
            return state.organisations;
        }
    }
};