<template>
  <div>
    <div class="content">
      <HeaderNavigation
        buttonText="Invite a lender"
        button-link="/lender-register"
      >
        User profile
        <div class="search-profiles">
          <SearchProfiles @editProfile="editUser"></SearchProfiles>
        </div>
      </HeaderNavigation>

      <div class="column-container">
        <OrganizationList @editCompany="editUser" class="column" />
        <AthletesList @editAthlete="editUser" class="column" />
        <CoachesList @editAthlete="editUser" class="column" />
        <AgenciesList @editAgent="editUser" class="column" />
        <LawyersList @editAgent="editUser" class="column" />
        <FinancialManagersList @editAgent="editUser" class="column" />
        <MarketingAgencyList @editAgent="editUser" class="column" />
        <LendersList @editLender="editUser" class="column" />
      </div>
    </div>
  </div>
</template>
<script>
import store from '@/store';
import '@/assets/styles/adminMain.css';
import HeaderNavigation from '@/components/HeaderNavigation.vue';
import AthletesList from '@/components/AdminUserProfile/AthletesList.vue';
import AgenciesList from '@/components/AdminUserProfile/AgenciesList.vue';
import LendersList from '@/components/AdminUserProfile/LendersList.vue';
import OrganizationList from '@/components/AdminUserProfile/OrganizationList.vue';
import SearchProfiles from '@/views/Admin/SearchProfiles';
import CoachesList from '@/components/AdminUserProfile/CoachesList';
import LawyersList from '@/components/AdminUserProfile/LawyersList';
import FinancialManagersList from '@/components/AdminUserProfile/FinancialManagersList';
import MarketingAgencyList from '@/components/AdminUserProfile/MarketingAgencyList';

export default {
  name: 'UserProfile',
  components: {
    HeaderNavigation,
    AthletesList,
    AgenciesList,
    LendersList,
    OrganizationList,
    SearchProfiles,
    CoachesList,
    LawyersList,
    FinancialManagersList,
    MarketingAgencyList,
  },

  mounted() {
    store.dispatch('editUser/setHash', '');
    store.dispatch('editUser/setType', '');
  },

  methods: {
    editUser(hash) {
      this.$router.push('/admin/user-edit');
    },
  },
};
</script>
<style scoped>
/* User profile layout */
.search-profiles {
  width: 300px;
  float: right;
  margin-right: 50px;
}

.column-container {
  display: grid;
  /* grid-template-columns: repeat(4, 1fr); */
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: auto;
  width: 100%;
  margin-top: 20px;
}
.column {
  height: 100%;
  width: 100%;
  background-color: white;
  border-radius: 10px;
}
@media only screen and (min-width: 1401px) {
  .column-container {
    gap: 20px;
  }
}
@media only screen and (max-width: 1400px) {
  .column-container {
    gap: 10px;
  }
}
</style>
