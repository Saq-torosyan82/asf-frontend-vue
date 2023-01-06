import AuthenticationRepository from "./Authentication/AuthenticationRepository";
import RegisterRepository from "./Authentication/RegisterRepository";
import UserRepository from "./Users/UserRepository";
import LogOutRepository from "./Authentication/LogOutRepository";
import DealStepsRepository from "./DealCalculator/DealStepsRepository";
import DealRepository from "./DealCalculator/DealRepository";
import SystemRepository from "./System/SystemRepository";
import OnboardingRepository from "./Onboarding/OnboardingRepository";
import AdminRepository from "./Admin/AdminRepository";
import FinancialRepository from "./Financials/FinancialRepository";
import NewsRepository from "./News/NewsRepository";

const repositories = {
    'authentification': AuthenticationRepository,
    'logout': LogOutRepository,
    'register': RegisterRepository,
    'user': UserRepository,
    'deal-steps-repository': DealStepsRepository,
    'deal': DealRepository,
    'system': SystemRepository,
    'onboarding': OnboardingRepository,
    'admin': AdminRepository,
    'financial': FinancialRepository,
    'news': NewsRepository
};

export default {
    get: name => repositories[name]
}
