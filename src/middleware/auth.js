import localStorageService from '../services/localstorage.service';
export default (to, from, next) => {
    const auth = localStorageService.get('user');
    if(!auth){
        next({ name: 'Login' });
        return false;
    }
}