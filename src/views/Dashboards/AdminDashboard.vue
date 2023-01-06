<template>
  <div class="content">
    <HeaderNavigation>Dashboard</HeaderNavigation>
    <div class="grid">
      <LiveDealsBoard
        @showDealDetail="showDetail"
        v-if="loaded"
        class="component-no-padding all-deals"
      />

      <LendersChart v-if="loaded" class="lenders-stats component" />

      <BorrowersChart v-if="loaded" class="borrowers-stats component" />

      <TotalMoneyChart v-if="loaded"></TotalMoneyChart>

      <TotalReceivedChart v-if="loaded"></TotalReceivedChart>

      <DealsByCountry v-if="loaded" class="component deals-country" />

      <DealsByType v-if="loaded" class="component deals-by-type" />

      <DealsBySport v-if="loaded" class="component deals-by-sport" />
    </div>
  </div>
</template>

<script>
import store from '@/store';

import HeaderNavigation from '@/components/HeaderNavigation.vue';
import LendersChart from '@/components/AdminDashboard/LendersChart';
import BorrowersChart from '@/components/AdminDashboard/BorrowersChart';
import LiveDealsBoard from '@/components/AdminDashboard/LiveDealsBoard';
import DealsByType from '@/components/AdminDashboard/DealsByType';
import DealsBySport from '@/components/AdminDashboard/DealsBySport';
import DealsByCountry from '@/components/AdminDashboard/DealsByCountry';
import TotalMoneyChart from '@/components/DashboardComponents/TotalMoneyChart';
import TotalReceivedChart from '@/components/DashboardComponents/TotalReceivedChart';

import GetDealDetailMixin from '@/mixins/Deal/GetDealDetail.mixin';

import RepositoryFactory from '../../repositories/RepositoryFactory';
const UserRepository = RepositoryFactory.get('user');

export default {
  name: 'AdminDashboard',
  mixins: [GetDealDetailMixin],
  components: {
    HeaderNavigation,
    TotalMoneyChart,
    TotalReceivedChart,
    LendersChart,
    BorrowersChart,
    LiveDealsBoard,
    DealsByType,
    DealsBySport,
    DealsByCountry,
  },
  mounted() {
    this.dashboardInfo = store.getters['dashboard/getDashboard'];
    this.loaded = true;
  },
  data() {
    return {
      dashboardInfo: {},
      loaded: false,
    };
  },
  methods: {
    showDetail(id) {
      this.getDealDetail(id);
      this.$router.push('admin/deals');
    },
  },
};
</script>
<style lang="scss" scoped>
.grid {
  height: auto;
  margin-bottom: 30px;
}
/* Components */
.lenders-stats {
  grid-area: lenders-stats;
}
.borrowers-stats {
  grid-area: borrowers-stats;
}
.total-received {
  grid-area: total-received;
}
.total-borrow {
  grid-area: total-borrow;
}
.all-deals {
  grid-area: all-deals;
}
.deals-country {
  grid-area: deals-country;
}
.deals-by-type {
  grid-area: deals-by-type;
}
.deals-by-sport {
  grid-area: deals-by-sport;
}
</style>
