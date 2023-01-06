const state = {
    userHash: '',
    userType: ''
};

export const editUser = {
    namespaced: true,
    state: state,
    actions: {
        setHash({commit}, hash) {
            commit('SET_HASH', hash);
        },
        setType({commit}, type) {
            commit('SET_TYPE', type);
        },


    },
    mutations: {
        SET_HASH(state, hash) {
            state.userHash = hash;
        },
        SET_TYPE(state, type) {
            state.userType = type;
        },

    },
    getters: {
        getHash: state => {
            return state.userHash;
        },
        getType: state => {
            return state.userType;
        }
    }
};