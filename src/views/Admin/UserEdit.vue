<template>
  <div>
    <component :is="userEdit"></component>
  </div>
</template>

<script>
import store from '@/store';

import LenderEdit from '@/views/Users/Admin/LenderEdit';
import AgentEdit from '@/views/Users/Admin/AgentEdit';
import AthleteEdit from '@/views/Users/Admin/AthleteEdit';
import CompanyEdit from '@/views/Users/Admin/CompanyEdit';
import CoachEdit from "@/views/Users/Admin/CoachEdit";
import RepositoryFactory from '@/repositories/RepositoryFactory';
import LawyerEdit from "../Users/Admin/LawyerEdit";
import FinancialManagerEdit from "../Users/Admin/FinancialManagerEdit";
import MarketingAgencyEdit from "../Users/Admin/MarketingAgencyEdit";

const UserRepository = RepositoryFactory.get('user');

export default {
  name: 'AdminUserEdit',
  components: {
    AgentEdit,
    AthleteEdit,
    CompanyEdit,
    LenderEdit,
    CoachEdit,
    LawyerEdit,
    MarketingAgencyEdit,
    FinancialManagerEdit,
  },
  data() {
    return {
      userEdit: false,
    };
  },
  computed: {
    userHash() {
      return store.getters['editUser/getHash'];
    },
    userType() {
      return store.getters['editUser/getType'];
    },
  },
  mounted() {
    this.getUserEdit();
    if (this.userHash === '') this.$router.push('/admin/user-profiles');
  },
  methods: {
    getUserEdit() {
      this.$loading(true);
      let $this = this;

      if (this.userType === 'lender') {
        $this.userEdit = LenderEdit;
      } else if (this.userType === 'corporate') {
        $this.userEdit = CompanyEdit;
      } else if (this.userType === 'agent') {
        $this.userEdit = AgentEdit;
      } else if (this.userType === 'athlete') {
        $this.userEdit = AthleteEdit;
      }else if (this.userType === 'coach') {
        $this.userEdit = CoachEdit;
      }else if (this.userType === 'lawyer') {
        $this.userEdit = LawyerEdit;
      }else if (this.userType === 'financialManager') {
        $this.userEdit = FinancialManagerEdit;
      }else if (this.userType === 'marketingAgency') {
        $this.userEdit = MarketingAgencyEdit;
      } else {
        $this.$router.push('/admin/user-profiles');
      }

      $this.$loading(false);
    },
  },
};
</script>

<style scoped></style>
