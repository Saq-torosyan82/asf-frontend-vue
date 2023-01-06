const state = {
    step: 1,
    data: {
        lender: {},
        contact: {},
        criteria:[]
    },
    photo: "",
};

export const lenderOnboarding = {
    namespaced: true,
    state: state,
    actions: {
        nextStep({commit}) {
            commit('NEXT_STEP');
        },
        prevStep({commit}) {
            commit('PREV_STEP');
        },
        addLenderInfo({commit}, payload) {
            commit('ADD_LENDER_INFO', payload);
        },
        addContactInfo({commit}, payload) {
            commit('ADD_CONTACT_INFO', payload);
        },
        addCriteria({commit}, payload) {
            commit('ADD_CRITERIA', payload);
        },
        storeUserPhoto({commit}, payload) {
            commit('STORE_USER_PHOTO', payload);
        }
    },
    mutations: {
        NEXT_STEP(state) {
            if (state.step <= 3) state.step += 1;
        },
        PREV_STEP(state) {
            if (state.step >= 2) state.step -= 1;
        },
        ADD_LENDER_INFO(state, payload) {
            state.data.lender = payload;
        },
        ADD_CONTACT_INFO(state, payload) {
            state.data.contact = payload;
        },
        ADD_CRITERIA(state, payload) {
            state.data.criteria = payload;
        },
        STORE_USER_PHOTO(state, payload) {
            state.photo = payload;
        }
    },
    getters: {
        getStep: state => {
            return state.step;
        },
        getLenderInfo: state => {
            return state.data.lender;
        },
        getContactInfo: state => {
            return state.data.contact;
        },
        getOnboardingInfo: state => {
            return state.data;
        },
        getUserPhoto: state => {
            return state.photo;
        }
    }};