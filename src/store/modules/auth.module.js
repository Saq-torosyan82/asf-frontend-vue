import localStorageService from '../../services/localstorage.service';
const user = localStorageService.get('user');

const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null };


export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        doLogin({commit}, state) {
            localStorageService.set('user', state);
            commit('loginSuccess', state);
        },
        loginFailures({commit}) {
            localStorageService.remove('user');
            commit('loginFailure');
        }
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        registerSuccess(state) {
            state.status.loggedIn = false;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
        }
    }

}