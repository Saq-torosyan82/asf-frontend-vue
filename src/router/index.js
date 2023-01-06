import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/_dashboard';
import DashboardLayout from '../views/layout/DashboardLayout.vue';
import AuthLayout from '../views/layout/AuthLayout.vue';
// import Dashboard  from "../views/Dashboard.vue";

import VueRouteMiddleware from 'vue-route-middleware';

// Middlewares
import AuthMiddleware from '../middleware/auth';
import AuthentificatedUserMiddleware from '../middleware/authentificatedUser';
import AdminMiddleware from '../middleware/admin';
import DealcalculatorMiddleware from '../middleware/dealcalculator';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    meta: {
      middleware: [AuthMiddleware],
    },
    children: [


      {
        path: '/user/verification/approve',
        name: 'ApproveUser',
        component: () => import('../views/Borrower/ApproveUser.vue'),
        meta: {
          title: 'SportsFi | Approve user',
        },
      },
      {
        path: '/user/verification/reject',
        name: 'RejectUser',
        component: () => import('../views/Borrower/RejectUser.vue'),
        meta: {
          title: 'SportsFi | Reject user',
        },
      },

      {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
          title: 'SportsFi | Dashboard',
        },
      },
      {
        path: '/dealcalculator',
        name: 'DealCalculator',
        component: () => import('../views/DealCalculator.vue'),
        meta: {
          middleware: [AuthMiddleware, DealcalculatorMiddleware],
          title: 'SportsFi | Deal Calculator',
        },
      },
      {
        path: '/deals',
        name: 'Deals',
        component: () => import('../views/_deals.vue'),
        meta: {
          middleware: [AuthMiddleware],
          title: 'SportsFi | Deals',
        },
      },

      {
        path: '/add-athlete',
        name: 'AddAthlete',
        component: () => import('../views/AddAthlete.vue'),
        meta: {
          title: 'SportsFi | Add athlete',
        },
      },
      {
        path: '/edit',
        name: 'UserEdit',
        component: () => import('../views/UserEdit.vue'),
        meta: {
          title: 'SportsFi | Edit user',
        },
      },
      {
        path: '/athlete/deal',
        name: 'AthleteDeal',
        component: () => import('../views/AthleteDeal.vue'),
        meta: {
          title: 'SportsFi | Deals',
        },
      },

      {
        path: '/admin/user-profiles',
        name: 'AdminUserProfiles',
        component: () => import('../views/Admin/UserProfiles.vue'),
        meta: {
          middleware: [AuthMiddleware, AdminMiddleware],
          title: 'SportsFi | User profiles',
        },
      },
      {
        path: '/admin/user-edit',
        name: 'AdminUserEdit',
        component: () => import('../views/Admin/UserEdit.vue'),
        meta: {
          middleware: [AuthMiddleware, AdminMiddleware],
          title: 'SportsFi | Edit user',
        },
      },
      {
        path: '/agent/edit',
        name: 'AdminUserEdit',
        component: () => import('../views/Users/AgentEdit.vue'),
        meta: {
          middleware: [AuthMiddleware],
          title: 'SportsFi | Edit user',
        },
      },
      {
        path: '/agent/athlete-edit',
        name: 'AgentEditAthlete',
        component: () => import('../views/Agent/EditAthlete.vue'),
        meta: {
          middleware: [AuthMiddleware],
          title: 'SportsFi | Athlete edit',
        },
      },
      {
        path: '/admin/agency',
        name: 'AdminAgency',
        component: () => import('../views/Admin/Agency.vue'),
        meta: {
          title: 'SportsFi | Agency',
        },
      },

      {
        path: '/admin/country-deal-by-continent',
        name: 'AdminCountryDealByContinent',
        component: () =>
          import('../views/Admin/AdminCountryDealByContinent.vue'),
        meta: {
          middleware: [AuthMiddleware],
          title: 'SportsFi | Deals by country',
        },
      },
      {
        path: '/admin/lenders',
        name: 'AdminLenders',
        component: () => import('../views/Admin/AdminLenders.vue'),
        meta: {
          title: 'SportsFi | Lenders',
        },
      },
      {
        path: '/admin/borrowers',
        name: 'AdminBorrowers',
        component: () => import('../views/Admin/AdminBorrowers.vue'),
        meta: {
          title: 'SportsFi | Borrowers',
        },
      },
      {
        path: '/admin/deals-by-type',
        name: 'AdminDealsByType',
        component: () => import('../views/Admin/AdminDealsByType.vue'),
        meta: {
          title: 'SportsFi | Deals by type',
        },
      },
      {
        path: '/admin/deals-by-sport',
        name: 'AdminDealsBySport',
        component: () => import('../views/Admin/AdminDealsBySport.vue'),
        meta: {
          title: 'SportsFi | Deals by sport',
        },
      },
      {
        path: '/admin/total-deal-overview',
        name: 'AdminTotalDealOverview',
        component: () => import('../views/Admin/AdminTotalDealOverview.vue'),
        meta: {
          title: 'SportsFi | Deal Overview',
        },
      },
      {
        path: '/admin/total-deal-payments',
        name: 'AdminTotalDealPayments',
        component: () => import('../views/Admin/AdminTotalDealPayments.vue'),
        meta: {
          title: 'SportsFi | Deal Payments',
        },
      },
      {
        path: '/admin/deals',
        name: 'AdminDeals',
        component: () => import('../views/Admin/AdminDeals.vue'),
        meta: {
          title: 'SportsFi | Deals',
        },
      },
      {
        path: '/admin/partners',
        name: 'AdminPartners',
        component: () => import('../views/Admin/AdminPartners.vue'),
        meta: {
          title: 'SportsFi | Partners',
        },
      },
      {
        path: '/sign-contract',
        name: 'SignContract',
        component: () => import('../views/ContractSigning.vue'),
        meta: {
          title: 'SportsFi | Sign contract',
        },
      },
      {
        path: '/admin/financials',
        name: 'AdminFinancials',
        component: () => import('../views/Admin/AdminFinancials.vue'),
        meta: {
          title: 'SportsFi | Financials',
        },
      },
      {
        path: '/admin/snapshot-report/:clubId',
        name: 'AdminSnapshot',
        component: () => import('../views/Admin/AdminSnapshot.vue'),
        props: true,
        meta: {
          title: 'SportsFi | Financials',
        },
      },

      {
        path: '/about',
        name: 'About',
        component: () => import('../views/static/About.vue'),
        meta: {
          title: 'SportsFi | About',
        },
      },
      {
        path: '/inbox',
        name: 'Inbox',
        component: () => import('../views/Inbox/Inbox.vue'),
        meta: {
          title: 'SportsFi | Inbox',
        },
      },
      {
        path: '/financials',
        name: 'Financials',
        component: () => import('../views/Financials/Financials.vue'),
        meta: {
          title: 'SportsFi | Financials',
        },
      },
      {
        path: '/snapshot-report',
        name: 'FinancialsSnapshot',
        component: () => import('@/views/Financials/SnapshotReport.vue'),
        meta: {
          title: 'SportsFi | Snapshot report',
        },
      },
      {
        path: '/lender/total-deal-payments',
        name: 'LenderTotalDealPayments',
        component: () => import('../views/Lender/LenderTotalDealPayments.vue'),
        meta: {
          title: 'SportsFi | Deal Payments',
        },
      },
      {
        path: '/help',
        name: 'Help',
        component: () => import('@/views/Help.vue'),
        meta: {
          title: 'SportsFi | Help',
        },
      },
      {
        path: '/news',
        name: 'News',
        component: () => import('@/views/News.vue'),
        meta: {
          title: 'SportsFi | News',
        },
      },
    ],
  },
  {
    path: '/lender-register',
    name: 'LenderRegister',
    component: () => import('../views/auth/LenderOnboarding.vue'),
    meta: {
      middleware: [AuthMiddleware, AdminMiddleware],
      title: 'SportsFi | Lender register',
    },
  },


  {
    path: '/auth',
    name: 'AuthLayout',
    component: AuthLayout,
    meta: {
      middleware: [AuthentificatedUserMiddleware],
    },
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import('../views/auth/Login.vue'),
        meta: {
          title: 'SportsFi | Login',
        },
      },
      {
        path: '/auto-login',
        name: 'AutoLogin',
        component: () => import('../views/auth/AutoLogin'),
        meta: {
          title: 'SportsFi | Auto-login',
        },
      },
      {
        path: '/register',
        name: 'Register Wizard',
        component: () => import('../views/auth/Register.vue'),
        meta: {
          title: 'SportsFi | Register',
        },
      },
      {
        path: '/forgot',
        name: 'ForgotPassword',
        component: () => import('../views/auth/ForgotPassword.vue'),
        meta: {
          title: 'SportsFi | Forgot password',
        },
      },
      {
        path: '/password-reset',
        name: 'PasswordReset',
        component: () => import('../views/auth/ResetPassword.vue'),
        meta: {
          title: 'SportsFi | Password reset',
        },
      },
      {
        path: '/lender/magic',
        name: 'LenderMagic',
        component: () => import('../views/LenderLogin.vue'),
        meta: {
          title: 'SportsFi | Magic link',
        },
      },
    ],
  },

  {
    path: '/auth',
    name: 'AuthOnboarding',
    component: AuthLayout,
    meta: {
      middleware: [AuthMiddleware],
    },
    children: [
      {
        path: '/onboarding',
        name: 'Onboarding',
        component: () => import('../views/auth/OnboardingWizard.vue'),
        meta: {
          title: 'SportsFi | Onboarding',
        },
      },
    ],
  },

  {
    path: '/newAccount',
    name: 'newAccount',
    component: () => import('../views/layout/newAccountLayout.vue'),
    children: [
      {
        path: '/createNewAccount',
        name: 'createNewAccount',
        component: () => import('../views/auth/createNewAccount.vue'),
        meta: {
          title: 'SportsFi | Create new account',
        },
      },
      {
        path: '/createNewPassword',
        name: 'createNewPassword',
        component: () => import('../views/auth/createNewPassword.vue'),
        meta: {
          title: 'SportsFi | Create new password',
        },
      },
    ],
  },
  {
    path: '/confirm-payment',
    name: 'ConfirmPayment',
    component: () => import('../views/Financials/ConfirmPayment'),
    meta: {
      title: 'SportsFi | Auto-login',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkExactActiveClass: 'selected',
});

router.beforeEach(VueRouteMiddleware());
const DEFAULT_TITLE = "SportsFi | Tomorrow's game today";

router.afterEach((to, from) => {
  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE;
  });
  window.scrollTo(0, 0);
});

export default router;
