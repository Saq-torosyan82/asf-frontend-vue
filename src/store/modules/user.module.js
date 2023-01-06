const state = {
    borrower_type: "",
    first_name: null,
    id: "",
    last_name: null,
    object: "",
    user_type: "",
    user_sports: "",
    user_athletes: [],
    user_profile: {

    },
    photo: "",
    agentPhoto: "",
    sport: {}
};

export const user = {
    namespaced: true,
    state: state,
    actions: {
        storeUserInfo({commit}, payload) {
            commit('STORE_USER_INFO', payload);
        },
        storeUserBasicInfo({commit}, payload) {
            commit('STORE_USER_BASIC_INFO', payload);
        },
        storeUserProfile({commit}, payload) {
            commit('STORE_USER_PROFILE', payload);
        },
        storeUserSports({commit}, payload) {
            commit('STORE_USER_SPORTS', payload);
        },
        storeUserAthletes({commit}, payload) {
            commit('STORE_USER_ATHLETES', payload);
        },
        storeUserPhoto({commit}, payload) {
            commit('STORE_USER_PHOTO', payload);
        },
        storeAgentPhoto({commit}, payload) {
            commit('STORE_AGENT_PHOTO', payload);
        },
        storeUserSport({commit}, payload) {
            commit('STORE_SPORT', payload);
        }

    },
    mutations: {
        STORE_USER_INFO(state, payload) {
            state.user_profile = payload;
        },
        STORE_USER_BASIC_INFO(state, payload) {
            state.borrower_type = payload.borrower_type;
            state.email = payload.email;
            state.first_name = payload.first_name;
            state.id = payload.id;
            state.last_name = payload.last_name;
            state.object = payload.object;
            state.user_type = payload.user_type;
        },
        STORE_USER_PROFILE(state, payload) {
            state.user_profile = payload;
        },
        STORE_USER_SPORTS(state, payload) {
            state.user_sports = payload;
        },
        STORE_USER_ATHLETES(state, payload) {
            state.user_athletes = payload;
        },
        STORE_USER_PHOTO(state, payload) {
            state.photo = payload;
        },
        STORE_AGENT_PHOTO(state, payload) {
            state.agentPhoto = payload;
        },
        STORE_SPORT(state, payload) {
            state.sport = payload;
        }
    },
    getters: {
        getType: state => {
            return state.type;
        },
        getUserInfo: state => {
            return state.user_profile;
        },
        getUserProfile: state => {
            return state.user_profile;
        },
        getUserSports: state => {
            return state.user_sports;
        },
        sports: state => {
            return state.user_sports;
        },
        getUserAthletes: state => {
            return state.user_athletes;
        },
        getUserPhoto: state => {
            return state.photo;
        },
        getAgentPhoto: state => {
            return state.agentPhoto;
        },
        getFirstLastName: state => {
            return state.first_name+' '+ state.last_name;
        },
        getProfessional: state => {
            return state.user_profile.professional;
        },
        getPrevClubs: state => {
           return state.user_profile.professional.previous_clubs;
        },
        getSportId: state => {
            return state.user_profile.professional.sport_id;
        },
        getSport: state => {
            return state.sport;
        },
        getDealCriteria: state => {
            return state.user_profile.deal_criteria;
        },
    }
};