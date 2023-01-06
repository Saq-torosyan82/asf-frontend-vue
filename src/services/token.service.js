import localStorageService from '../services/localstorage.service';

export default {
    getLocalRefreshToken() {
        const user = localStorageService.get('user');
        if (user === null)
            return '';
        return user?.refresh_token;
    },
    getLocalAccessToken() {
        let user = localStorageService.get('user');
        if (user === null)
            return '';
        return user.access_token;
    },
    removeToken() {
        localStorageService.remove('user');
        localStorageService.remove('userInfo');
    }
}
