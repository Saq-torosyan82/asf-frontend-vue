import User from "../modules/User/User";
import localStorageService from "../services/localstorage.service";

export default (to, from, next) => {
    if(User.isAdmin() || User.isLender()){
        next('/deals');
        return false;
    }
}