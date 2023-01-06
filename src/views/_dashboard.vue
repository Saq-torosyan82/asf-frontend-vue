<template>
  <component :is="dashboard" @refreshDashboard="refreshDashboard"></component>
</template>

<script>
import store from '@/store';
import UserTypes from '../enums/modules/UserType';
import BorrowerTypes from '../enums/modules/BorrowerType';

import AdminDashboard from './Dashboards/AdminDashboard';
import AgentDashboard from './Dashboards/AgentDashboard';
import AthleteDashboard from './Dashboards/AthleteDashboard';
import CorporateDashboard from './Dashboards/CorporateDashboard';
import LenderDashboard from './Dashboards/LenderDashboard';

import RepositoryFactory from '../repositories/RepositoryFactory';

const UserRepository = RepositoryFactory.get('user');

export default {
  name: 'Dashboard',
  components: {
    AdminDashboard,
    AgentDashboard,
    AthleteDashboard,
    CorporateDashboard,
    LenderDashboard,
  },
  data: function () {
    return {
      dashboard: false,
    };
  },
  created() {
    this.getDashboard();
    store.dispatch('Deals/setPage', 1);
  },

  methods: {
    getDashboard() {
      this.$loading(true);
      let $this = this;
      let user = null;

      UserRepository.getMyBasicInfo()
        .then((response) => {
          user = response.data.data;
          if (user) {
            $this.$store.dispatch('user/storeUserBasicInfo', user);
            $this.$localStorage.set('userInfo', user);

            // check if onboarding is finished
            if (
              user.user_type === UserTypes.BORROWER &&
              user.borrower_type === ''
            )
              $this.$router.push('/onboarding');
          }
        })
        .catch((error) => {
          console.error(error);
          $this.$loading(false);
        });

      UserRepository.getUserDashboard()
        .then((response) => {
          store.dispatch('dashboard/addDashboard', response.data);
          let userProfile = response.data;
          userProfile.stats = null;
          store.dispatch('user/storeUserInfo', response.data);
        })
        .then(() => {
          if (user.user_type === UserTypes.ADMIN) {
            $this.dashboard = AdminDashboard;
          } else if (user.user_type === UserTypes.LENDER) {
            $this.dashboard = LenderDashboard;
          } else if (
            user.user_type === UserTypes.BORROWER &&
            user.borrower_type === BorrowerTypes.CORPORATE
          ) {
            $this.dashboard = CorporateDashboard;
          } else if (
            user.user_type === UserTypes.BORROWER &&
            user.borrower_type === BorrowerTypes.AGENT
          ) {
            $this.dashboard = AgentDashboard;
          } else if (
            user.user_type === UserTypes.BORROWER &&
            user.borrower_type === BorrowerTypes.ATHLETE
          ) {
            $this.dashboard = AthleteDashboard;
          } else {
            $this.dashboard = false;
          }
          $this.$loading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }, // getDashboard
    refreshDashboard() {
      UserRepository.getUserDashboard()
        .then((response) => {
          store.dispatch('dashboard/addDashboard', response.data);
          let userProfile = response.data;
          userProfile.stats = null;
          store.dispatch('user/storeUserInfo', response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, // refreshDashboard
  },
};
</script>

<style lang="scss" src="@/assets/styles/adminDashboard.scss"></style>
