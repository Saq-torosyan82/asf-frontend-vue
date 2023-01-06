<template>
  <div>
    <component v-if="loaded" :is="userEdit"></component>
  </div>
</template>

<script>
import UserTypes from '../enums/modules/UserType';
import BorrowerTypes from '../enums/modules/BorrowerType';

import AdminDashboard from './Dashboards/AdminDashboard';
import LenderDashboard from './Dashboards/LenderDashboard';
import LenderEdit from '@/views/Users/LenderEdit';
import AgentEdit from './Users/AgentEdit';
import AthleteEdit from './Users/AthleteEdit';
import CompanyEdit from './Users/CompanyEdit';
import RepositoryFactory from '../repositories/RepositoryFactory';

const UserRepository = RepositoryFactory.get('user');

export default {
  name: 'UserEdit',
  components: {
    AdminDashboard,
    LenderDashboard,
    AgentEdit,
    AthleteEdit,
    CompanyEdit,
    LenderEdit,
  },
  data() {
    return {
      userEdit: false,
      loaded: false,
    };
  },
  mounted() {
    this.getUserEdit();
  },
  methods: {
    getUserEdit() {
      this.$loading(true);
      let $this = this;
      let user = null;
      UserRepository.getMyBasicInfo()
        .then((response) => {
          user = response.data.data;
          if (user.user_type === UserTypes.ADMIN) {
            $this.userEdit = AdminDashboard;
          } else if (user.user_type === UserTypes.LENDER) {
            $this.userEdit = LenderEdit;
          } else if (
            user.user_type === UserTypes.BORROWER &&
            user.borrower_type === BorrowerTypes.CORPORATE
          ) {
            $this.userEdit = CompanyEdit;
          } else if (
            user.user_type === UserTypes.BORROWER &&
            user.borrower_type === BorrowerTypes.AGENT
          ) {
            $this.userEdit = AgentEdit;
          } else if (
            user.user_type === UserTypes.BORROWER &&
            user.borrower_type === BorrowerTypes.ATHLETE
          ) {
            $this.userEdit = AthleteEdit;
          } else {
            $this.userEdit = false;
          }
          $this.$loading(false);
          $this.loaded = true;
        })
        .catch((error) => {
          console.error(error);
          $this.$loading(false);
          $this.loaded = false;
        });
    },
  },
};
</script>

<style scoped></style>
