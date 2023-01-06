<template>
<div class="deal-completion">
   <span
       class="deal-card-wrapper"
       v-for="(deal, key) in deals"
       :key="key"
       @click="showDealDetail(deal.id)"
   >
          <component
              :is="getDealComponent(deal.status)"
              :deal="deal"
          ></component>
        </span>
</div>
</template>

<script>
import store from "@/store";

import DealMixin from '@/mixins/Deal/Deal.mixin';
import GetDealDetailMixin from '@/mixins/Deal/GetDealDetail.mixin';
import User from '@/modules/User/User';

import DealStatuses from '@/enums/deal/dealStatuses';
import Completed from "@/components/DashboardComponents/DealCard/Types/Completed";
import Pagination from "@/components/MyDealsComponents/Pagination";

import Live from "@/components/DashboardComponents/DealCard/Types/Live";
import Started from '@/components/DashboardComponents/DealCard/Types/Started';
import Accepted from '@/components/DashboardComponents/DealCard/Types/Accepted';
import InProgress from '@/components/DashboardComponents/DealCard/Types/InProgress';
import NotStarted from '@/components/DashboardComponents/DealCard/Types/NotStarted';
import FutureDeal from '@/components/DashboardComponents/DealCard/Types/FutureDeal';

export default {
  name: "LiveDeals",
  components: {
    Completed,
    Pagination,
    Live,
    Started,
    Accepted,
    InProgress,
    NotStarted,
    FutureDeal,
  },
  mixins: [DealMixin, GetDealDetailMixin],
  mounted() {
    store.dispatch('Deals/setPage', 1);
    store.dispatch('Deals/setType', this.getLiveDealsType());
    this.requestTabInfoByType(this.getLiveDealsType());
  },
  computed: {
    deals() {
      return store.getters['Deals/getDeals'];
    },
    isLender() {
      return User.isLender();
    },
  },
  methods: {
    getDealComponent(dealStatus) {
      switch (dealStatus) {
        case DealStatuses.COMPLETED:
          return Completed;
        case DealStatuses.LIVE:
          return Live;
        case DealStatuses.STARTED:
          return Started;
        case DealStatuses.ACCEPTED:
          return Accepted;
        case DealStatuses.IN_PROGRESS:
          return InProgress;
        case DealStatuses.NOT_STARTED:
          return NotStarted;
      }
    },
    showDealDetail(id) {
      this.getDealDetail(id);
      store.dispatch('Deals/toggleRedirect');
      this.$router.push({ path: '/deals' });
    },
    getLiveDealsType() {
      if (User.isLender()) {
        return 'current';
      }
      return 'live';
    }
  }
}
</script>

<style lang="scss" scoped>
.deal-completion {
  width: 50%;
}

.deal-card-wrapper:hover {
  cursor: pointer;
}
</style>