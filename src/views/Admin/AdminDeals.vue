<template>
  <div class="content">
    <HeaderNavigation>Deals</HeaderNavigation>

    <div class="deal-container">
      <div v-if="showDeal">
        <v-row no-gutters>
          <v-col cols="12" lg="8">
            <LiveDealsBoard
              class="component-no-padding admin-live-deals"
              @showDealDetail="getDealDetail"
            />
          </v-col>
          <v-col cols="12" lg="4">
            <DealDetails
              @closeDeal="closeDeal"
              :class="showDeal && 'showDealDetail'"
            />
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <v-row no-gutters>
          <v-col>
            <LiveDealsBoard
              class="component-no-padding admin-live-deals"
              :class="!showDeal && 'expand'"
              @showDealDetail="getDealDetail"
            />
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import LiveDealsBoard from '@/components/AdminDashboard/LiveDealsBoard.vue';
import HeaderNavigation from '@/components/HeaderNavigation.vue';
import DealDetails from '@/components/MyDealsComponents/DealDetails.vue';
import GetDealDetailMixin from '@/mixins/Deal/GetDealDetail.mixin';
import RepositoryFactory from '@/repositories/RepositoryFactory';
const DealRepository = RepositoryFactory.get('deal');

export default {
  components: {
    LiveDealsBoard,
    HeaderNavigation,
    DealDetails,
  },
  mixins: [GetDealDetailMixin],
  data() {
    return {};
  },
  mounted() {
    let dealId = this.$route.query.id;
    if(dealId) this.getDealDetail(dealId);
  },
  computed: {
    updateDealFlag: () => {
      return store.getters['dealDetail/getUpdateDealFlag'];
    },
    contractSigningFlag: () => {
      return store.getters['dealDetail/getSignContractFlag'];
    },
    showDeal: () => {
      return store.getters['dealDetail/getShowDealDetail'];
    },
  },
  watch: {
    updateDealFlag(value) {
      if (value) {
        this.getDealDetail();
      }
    },
  },
  methods: {
    closeDeal() {
      store.dispatch('dealDetail/showDealDetail', false);
    },
  },
};
</script>
<style lang="scss" scoped>
.deal-container {
  ::v-deep {
    .component-no-padding {
      .tableWrap {
        max-height: 800px;
      }
    }
    .showDealDetail {
      margin-left: 10px;
      width: 100%;
      padding: 10px;
    }
    @media screen and (max-width: 1264px) {
      .component-no-padding {
        .tableWrap {
          max-height: 700px;
        }
      }
      .showDealDetail {
        margin-left: 0;
        margin-top: 15px;
      }
    }
    @media screen and (max-width: 600px) {
      .component-no-padding {
        .tableWrap {
          max-height: 400px;
        }
      }
    }
  }
}
</style>
