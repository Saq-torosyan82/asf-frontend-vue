const state = {
    step: 1,
    dealId: '',
    step1: {
        deal_type: "",
        contract_type: "",
        user_type: "",
        athlete: '',
        club_type: '',
        sport: '',
    },
    step2: {
        tvHolder: null,
        sponsorsOrBrandsIdentifier: 'brands',
        sponsorOrBrand: null,
        league: null,
        club: null
    },
    step3: {
        currency: '',
        contractValue: '',
        upfrontValue: '',
        firstInstalment: '',
        frequency: '',
        numberOfInstalments: 0,
        fundingDate: '',
        netLoanAmount: '',
        guaranteedContractAmount: '',
        performanceRelatedContractAmount: '',
        borrowedAmount: '',
        contractFullyGuaranteed: '',
        borrowed: '',
    },
    step4: {},
    step6: {},
    step7: {},
    documents: {},
    is_resume: false,
    hideDealType: false,
    interest_rates: {}
};

export const dealCalculator = {
    namespaced: true,
    state: state,
    actions: {
        nextStep({commit}) {
            commit('NEXT_STEP');
        },
        prevStep({commit}) {
            commit('PREV_STEP');
        },
        jumpToStep({commit}, step) {
            commit('JUMP_TO_STEP', step);
            switch (step) {
                case 1:
                    commit('CLEAR_STEP2_INFO');
                    commit('CLEAR_STEP3_INFO');
                // eslint-disable-next-line no-fallthrough
                case 2:
                    commit('CLEAR_STEP3_INFO');


            }
        },
        addFirstStepInfo({commit}, payload) {
            commit('STORE_FIRST_STEP_INFO', payload);
        },
        dealId({commit}, id) {
            commit('DEAL_ID', id);
        },
        addTvHolder({commit}, payload) {
            commit('SET_TV_HOLDER', payload);
        },
        addSponsorOrBrand({commit}, paylaod) {
            commit('SET_SPONSOR_OR_BRAND', paylaod);
        },
        addleague({commit}, paylaod) {
            commit('SET_LEAGUE', paylaod);
        },
        addClub({commit}, paylaod) {
            commit('SET_CLUB', paylaod);
        },
        addStep2Info({commit}, paylaod) {
            commit('SET_STEP2_INFO', paylaod);
        },
        addStep3Info({commit}, paylaod) {
            commit('SET_STEP3_INFO', paylaod);
        },
        addStep4Info({commit}, paylaod) {
            commit('SET_STEP4_INFO', paylaod);
        },
        addStep6Info({commit}, paylaod) {
            commit('SET_STEP6_INFO', paylaod);
        },
        addStep7Info({commit}, paylaod) {
            commit('SET_STEP7_INFO', paylaod);
        },
        addDocuments({commit}, payload) {
            commit('SET_DOCUMENTS', payload);
        },
        setResume({commit}, value) {
            commit('SET_RESUME', value);
        },
        hideDealType({commit}, value) {
            commit('SET_HIDE_DEAL_TYPE', value);
        },
        setDealType({commit}, value) {
            commit('SET_DEAL_TYPE', value);
        },
        setAthlete({commit}, athlete) {
            commit('SET_ATHLETE', athlete);
        },
        resetDeal({commit}) {
            commit('RESET_DEAL');
        },
        setInterestRates({commit}, payload) {
            commit('SET_INTEREST_RATES', payload);
        }
    },
    mutations: {
        NEXT_STEP(state) {
            if (state.step <= 4) state.step += 1;
        },
        PREV_STEP(state) {
            if (state.step >= 2) state.step -= 1;
        },
        JUMP_TO_STEP(state, step) {
            state.step = step;
        },
        DEAL_ID(state, id) {
            state.dealId = id;
        },
        SET_ATHLETE(state, athlete) {
            state.step1.athlete = athlete;
        },
        SET_RESUME(state, value) {
            state.is_resume = value;
        },
        SET_HIDE_DEAL_TYPE(state, value) {
            state.hideDealType = value;
        },
        SET_DEAL_TYPE(state, value) {
            state.step1.deal_type = value;
        },
        STORE_FIRST_STEP_INFO(state, payload) {
            state.step1.deal_type = payload.deal_type;
            state.step1.contract_type = payload.contract_type;
        },
        SET_TV_HOLDER(state, payload) {
            state.step2.tvHolder = payload;
        },
        SET_SPONSOR_OR_BRAND(state, payload) {
            state.step2.sponsorsOrBrandsIdentifier = payload.sponsorsOrBrandsIdentifier;
            state.step2.sponsorOrBrand = payload.sponsorOrBrand;
        },
        SET_LEAGUE(state, payload) {
            state.step2.league = payload;
        },
        SET_CLUB(state, payload) {
            state.step2.club = payload;
        },
        SET_STEP2_INFO(state, payload) {
            state.step2 = payload;
        },
        SET_STEP3_INFO(state, payload) {
            state.step3 = payload;
        },
        SET_STEP6_INFO(state, payload) {
            state.step6 = payload;
        },
        SET_STEP7_INFO(state, payload) {
            state.step7 = payload;
        },
        SET_STEP4_INFO(state, payload) {
            state.step4 = payload;
        },
        SET_DOCUMENTS(state, payload) {
            state.documents = payload
        },
        CLEAR_STEP2_INFO(state) {
            state.step2 = {
                tvHolder: null,
                sponsorsOrBrandsIdentifier: 'brands',
                sponsorOrBrand: null,
                league: null,
                club: null
            };
        },
        CLEAR_STEP3_INFO(state) {
            state.step3 = {
                currency: '',
                contractValue: '0',
                upfrontValue: '0',
                firstInstalment: '',
                frequency: '',
                numberOfInstalments: 1,
                fundingDate: ''
            };
        },
        RESET_DEAL(state) {
            state.step = 1;
            state.dealId = '';
            state.step1 = {
                deal_type: "",
                contract_type: "",
                user_type: "",
                athlete: '',
                club_type: '',
            };
            state.step2 = {
                tvHolder: null,
                sponsorsOrBrandsIdentifier: 'brands',
                sponsorOrBrand: null,
                league: null,
                club: null
            };
            state.step3 = {
                currency: '',
                contractValue: '0',
                upfrontValue: '0',
                firstInstalment: '',
                frequency: '',
                numberOfInstalments: 1,
                fundingDate: ''
            };
            state.step4 = {};
            state.step6 = {};
            state.step7 = {};
        },
        SET_INTEREST_RATES(state, payload) {
            state.interest_rates = payload;
        },
    },
    getters: {
        getState: state => {
            return state;
        },
        getStep: state => {
            return state.step;
        },
        getFirstStepInfo: state => {
            return state.step1;
        },
        getContractType: state => {
            return state.step1.contract_type;
        },
        getSport: state => {
            return state.step1.sport;
        },
        getAthlete: state => {
            return state.step1.athlete;
        },
        getUserType: state => {
            return state.step1.user_type;
        },
        getDealType: state => {
            return state.step1.deal_type;
        },
        getQuoteType: state => {
            return state.step1.quoteType;
        },
        getTvHolder: state => {
            return state.step2.tvHolder;
        },
        getSBIdentifier: state => {
            return state.step2.sponsorsOrBrandsIdentifier;
        },
        getLeague: state => {
            return state.step2.league;
        },
        getClub: state => {
            return state.step2.club;
        },
        getSponsorOrBrand: state => {
            return state.step2.sponsorOrBrand;
        },
        getStep3Info: state => {
            return state.step3;
        },
        getStep2Info: state => {
            return state.step2;
        },
        getDealId: state => {
            return state.dealId;
        },
        getDocuments: state => {
            return state.documents;
        },
        getHideDealType: state => {
            return state.hideDealType;
        },
        getInterestRates: state => {
            return state.interest_rates;
        }
    }
};
