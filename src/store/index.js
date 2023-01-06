import Vue from 'vue';
import Vuex from 'vuex';
import _cloneDeep from 'lodash/cloneDeep';
import _forOwn from 'lodash/forOwn';

import { auth } from './modules/auth.module';
import { dealCalculator } from './modules/dealcalculator.module';
import { user } from './modules/user.module';
import { lenderOnboarding } from './modules/lender-onboarding.module';
import { lenderCriteria } from './modules/lender-criteria.module';
import { dealDetail } from './modules/deal-detail.module';
import { dashboard } from './modules/dashboard.module';
import { adminLenders } from './modules/admin/admin-lenders.module';
import { adminAthletes } from './modules/admin/admin-athletes.module';
import { adminAgents } from './modules/admin/admin-agents.module';
import { adminOrganisations } from './modules/admin/admin-organisations.module';
import { Deals } from './modules/deals.module';
import { Financials } from './modules/financials-module';
import { editUser } from './modules/admin/edit-user.module';
import { countryByContinent } from './modules/country-by-continent.module';
import sidebar from './modules/sidebar';

Vue.use(Vuex);

export const initialStoreModules = {
  auth,
  dealCalculator,
  lenderOnboarding,
  lenderCriteria,
  dealDetail,
  user,
  dashboard,
  adminLenders,
  adminAthletes,
  adminAgents,
  adminOrganisations,
  Deals,
  Financials,
  editUser,
  countryByContinent,
  sidebar,
};

export default new Vuex.Store({
  /**
   * Assign the modules to the store
   * using lodash deepClone to avoid changing the initial store module values
   */
  modules: _cloneDeep(initialStoreModules),
  mutations: {
    // reset default state modules by looping around the initialStoreModules
    resetState(state) {
      _forOwn(initialStoreModules, (value, key) => {
        state[key] = _cloneDeep(value.state);
      });
    },
  },
});
