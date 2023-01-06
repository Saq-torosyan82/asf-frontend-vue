import localStorageService from '../services/localstorage.service';
export default (to, from, next) => {
  const userInfo = localStorageService.get('userInfo');
  if (!userInfo || userInfo.user_type !== 'admin') {
    next({ name: 'Dashboard' });
    return false;
  }
};
