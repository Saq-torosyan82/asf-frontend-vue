<template>
  <div class="content">
    <!--    <EditModal v-show="showModal" @closed="showModal = false" />-->
    <NotificationMessage type="sucess" v-if="showNotification"
      >A cool message</NotificationMessage
    >
    <HeaderNavigation>Deals</HeaderNavigation>

    <v-row no-gutters :style="{ minHeight: '90vh' }">
      <v-col cols="12" md="6">
        <DealsList :show-users="false" @showDealDetail="getDealDetail" />
      </v-col>
      <v-col cols="12" md="6">
        <DealDetails v-if="showDealDetail" @removed="showDealDetail = false" />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <Footer class="footer" />
    </v-row>
  </div>
</template>

<script>
import store from '@/store';
import HeaderNavigation from '@/components/HeaderNavigation.vue';
import Footer from '@/components/Footer.vue';
import NotificationMessage from '@/components/NotificationMessage.vue';
import DealDetails from '../components/MyDealsComponents/DealDetails';
import DealsList from '../components/MyDealsComponents/DealsList';

import RepositoryFactory from '../repositories/RepositoryFactory';
const DealRepository = RepositoryFactory.get('deal');
import GetDealDetailMixin from '@/mixins/Deal/GetDealDetail.mixin';
import ExportPDFMixin from '@/mixins/DealCalculator/ExportPDF.mixin';
import DealMixin from '@/mixins/Deal/Deal.mixin';
import { horizontalScroll } from '../main';

export default {
  name: 'Deals',
  mixins: [GetDealDetailMixin, DealMixin, ExportPDFMixin],
  components: {
    HeaderNavigation,
    Footer,
    NotificationMessage,
    DealDetails,
    DealsList,
  },
  mounted() {
    this.showDealDetail = Object.keys(this.deal).length !== 0;
    horizontalScroll();
    let dealId = this.$route.query.id;
    if(dealId) this.getDealDetail(dealId);
  },
  data() {
    return {
      showNotification: false,
      showDealDetail: false,
    };
  },
  computed: {
    updateDealFlag: () => {
      return store.getters['dealDetail/getUpdateDealFlag'];
    },
    deal: () => {
      return store.getters['dealDetail/getState'];
    },
  },
  watch: {
    updateDealFlag(value) {
      if (value) {
        this.getDealDetail();
      }
    },
    deal() {
      this.showDealDetail = Object.keys(this.deal).length !== 0;
    },
  },
};
</script>
<style scoped>

.export-pdf-link {
  margin-left: 115px;
  position: absolute;
  bottom: 133px;
}

.pdf-header .line {
  display: block;
  width: 700px;
  height: 3px;
  float: right;
  background-color: #3a9eba;
  margin-top: 13px;
}

.pdf-header {
  width: 100%;
  padding: 30px 0;
}

.pdf-footer .head {
  font-weight: bold;
  font-size: 12px;
  color: black;
  letter-spacing: 0.1em;
}
.pdf-footer {
  text-align: center;
  font-size: 8px;
  color: black;
  margin-top: 100px;
  letter-spacing: 0.1em;
}

.deal-card-wrapper:hover {
  cursor: pointer;
  background-color: #f3f7fc;
}
/* .counterparties {
  grid-area: counterparties;
}
.grid.grid {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas:
    'dealcompletion counterparties'
    'footer footer';
} */
.deal-completion {
  margin-right: 10px;
}
.counterparties {
  margin-left: 10px;
}
@media screen and (max-width: 960px) {
  .deal-completion {
    margin: 0;
  }
  .counterparties {
    margin-left: 0;
    margin-top: 30px;
  }
}

.info:hover {
  cursor: pointer;
}
</style>

<style lang="scss" src="@/assets/styles/dashboardInitial.scss" scoped></style>
