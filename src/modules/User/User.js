import store from "@/store";
import UserService from "../../services/user.service";
import UserTypes from "../../enums/modules/UserType";
import BorrowerTypes from "../../enums/modules/BorrowerType";

export default {
    isAdmin() {
        return this.getUserType() === UserTypes.ADMIN;
    },
    isAvailableToEdit() {
        if (this.isAdmin() || this.isAgent()) {
            return true;
        }
    },
    getBorrowerTypeFromStore() {
        if (store && store.getters['user/getUserProfile'].account) {
            return store.getters['user/getUserProfile'].account.borrower_type;
        }

        return '';
    },
    getUserTypeFromStore() {
        if (store && store.getters['user/getUserProfile'].account) {
            return store.getters['user/getUserProfile'].account.user_type;
        }

        return '';
    },
    isLender() {
        if (this.isAdmin()) {
            return this.getUserTypeFromStore() === UserTypes.LENDER;
        }
        return this.getUserType() === UserTypes.LENDER;
    },
    isBorrower() {
        return this.getUserType() === UserTypes.BORROWER;
    },
    isAthlete() {
        if ((this.isAdmin() || this.isAvailableToEdit()) && this.getBorrowerTypeFromStore() === BorrowerTypes.ATHLETE) {
            return true;
        }
        return this.getBorrowerType() === BorrowerTypes.ATHLETE;
    },
    isCorporate() {
        if (this.isAdmin()) {
            return this.getBorrowerTypeFromStore() === BorrowerTypes.CORPORATE;
        }
        return this.getBorrowerType() === BorrowerTypes.CORPORATE;
    },
    isAgent() {
        if (this.isAdmin()) {
            return this.getBorrowerTypeFromStore() === BorrowerTypes.AGENT;
        }
        return this.getBorrowerType() === BorrowerTypes.AGENT;
    },
    getBorrowerType() {
        let user = UserService.getUserInfo();
        if (user.user_type === UserTypes.BORROWER)
            return user.borrower_type;

        return '';
    },
    getUserType() {
        let user = UserService.getUserInfo();
        if (user === null) {
            return "";
        }
        return user.user_type;
    }

}

