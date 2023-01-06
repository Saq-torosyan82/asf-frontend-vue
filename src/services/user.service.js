
import localStorageService from '../services/localstorage.service'

export default {
    getUserInfo() {
        return localStorageService.get('userInfo');
    },
    isAdmin() {
        return this.getUserInfo().user_type === 'admin';
    },
    isBorrower() {
        return this.getUserInfo().user_type === 'borrower';
    },
    isLender() {
        return this.getUserInfo().user_type === 'lender';
    }
}