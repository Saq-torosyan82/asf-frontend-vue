<template>
  <DealCompletion
    :show-users="showUsers"
    @getDeals="getTabItems"
    @getAgents="getTabItems"
    @getAthletes="getTabItems"
  >
    <template v-slot:current-deals>
      <div class="tab-header">
        <a
          href="#"
          v-if="!isLender"
          @click.prevent="setDealType(live)"
          class="link-text"
        >
          + Add new deal
        </a>
        |
        <a href="#" @click.prevent="exportExcel('current-deals')"  class="link-text">
          Export xls
        </a>
        |
        <a class="link-text" @click="downloadPdf('live')">Export PDF</a>
      </div>

      <span v-if="type === 'current' || type === 'live'">

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

        <Pagination v-if="pagination.total_pages > 1"></Pagination>
      </span>

      <router-link
        to="/deals"
        class="link-text all-deals"
        v-if="currentRouteName != 'Deals'"
        >All deals</router-link
      >
    </template>
    <template v-slot:future-deals>
      <div class="tab-header">
        <a
          href="#"
          v-if="!isLender"
          @click.prevent="setDealType(future)"
          class="link-text"
        >
          + Add new deal
        </a>
        |
        <a href="#" @click.prevent="exportExcel('quotes')"  class="link-text">
          Export xls
        </a>
        |
        <a class="link-text" @click="downloadPdf('quotes')">Export PDF</a>
      </div>
      <span v-if="type === 'quotes'">

        <span
          class="deal-card-wrapper"
          v-for="(deal, key) in deals"
          :key="key"
          @click="showDealDetail(deal.id)"
        >
          <FutureDeal :deal="deal"></FutureDeal>
        </span>

        <p v-if="deals.length == 0">There are no future deals.</p>
        <Pagination v-if="pagination.total_pages > 1"></Pagination>
        <router-link
          to="/deals"
          class="link-text all-deals"
          v-if="currentRouteName != 'Deals'"
          >All deals</router-link
        >
      </span>
    </template>
    <template v-slot:past-deals>
      <p>There are no past deals.</p>
    </template>
    <template v-slot:missed-deals>
      <div class="tab-header">
        <LinkToDealCalculator v-if="displayAddNewLink && !isLender">
          + Add new deal
        </LinkToDealCalculator>
        |
        <a href="#" @click.prevent="exportExcel('past-deals')"  class="link-text">
          Export xls
        </a>
        |
        <a class="link-text" @click="downloadPdf('missed')">Export PDF</a>
      </div>
      <span v-if="type === 'missed'">

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

        <Pagination v-if="pagination.total_pages > 1"></Pagination>
        <router-link
          to="/deals"
          class="link-text all-deals"
          v-if="currentRouteName != 'Deals'"
          >All deals</router-link
        >
      </span>
      <p v-if="deals.length == 0">There are no missed deals.</p>
    </template>

    <template v-if="showUsers && isAgency && isAgent" v-slot:agents>
      <div v-if="agents.length > 0" class="agents-list">
        <div v-for="(agent, key) in agents" :key="key" class="agent inline">
          <div class="avatar">
            <img v-if="agent.avatar" v-auth-image="agent.avatar" alt="" />
            <img v-else src="@/assets/img/person-default.png" alt="" />
          </div>
          <div class="agent-info">
            <p class="name">{{ agent.first_name }} {{ agent.last_name }}</p>
            <label>Phone number</label>
            <p class="agent-phone">{{ agent.phone }}</p>
          </div>
          <div class="actions inline">
            <a href="#" @click.prevent="edit(agent.id)" class="edit"
              ><icon name="edit-icon" />Edit</a
            >
            <a
              href="#"
              @click.prevent="showAreYouSureModal(agent.id)"
              class="delete"
              ><icon name="delete-small" />Delete</a
            >
          </div>
        </div>
      </div>
      <div v-else>
        <p>There are no agents</p>
      </div>
      <BaseModal
        :modal-type="'delete-agent'"
        @delete="deleteAgent"
        @closed="closeAreYouSureModal"
        v-if="confirmModal"
      ></BaseModal>
    </template>

    <template v-if="showUsers && isAgency && isAgent" v-slot:athletes>
      <div class="tab-header">
        <a href="#" @click.prevent="addAthleteModal = true" class="link-text"
          >+ Add athlete</a
        >
      </div>
      <div v-if="athletes.length > 0" class="agents-list">
        <div v-for="(athlete, key) in athletes" :key="key" class="agent inline">
          <div class="avatar">
            <img v-if="athlete.avatar" v-auth-image="athlete.avatar" alt="" />
            <img v-else src="@/assets/img/person-default.png" alt="" />
          </div>
          <div class="agent-info">
            <p class="name">{{ athlete.name }}</p>
            <p class="agent-phone">{{ athlete.club }}</p>
            <p v-if="athlete.agent_name !== ''" class="">
              Agent: {{ athlete.agent_name }}
            </p>
          </div>
          <div class="actions inline">
            <a
              href="#"
              @click.prevent="editAthlete(athlete.id)"
              class="edit link-text"
              ><icon name="edit-icon" />Edit</a
            >
            <a
              href="#"
              @click.prevent="showConfirmModal(athlete.id)"
              class="delete link-text"
              ><icon name="delete-small" />Delete</a
            >
          </div>
        </div>
      </div>
      <div v-else>
        <p>There are no athletes</p>
      </div>
      <BaseModal
        v-if="addAthleteModal"
        @closed="athleteAdded"
        :modal-type="'add-athlete'"
      ></BaseModal>
      <BaseModal
        :modal-type="'delete-user'"
        @delete="deleteUser"
        @closed="closeConfirmModal"
        v-if="confirmModal"
      ></BaseModal>
    </template>
  </DealCompletion>
</template>

<script>
import store from '@/store';
import DealCompletion from '../DashboardComponents/DealCompletion';
import LinkToDealCalculator from '../common/LinkToDealCalculator';
import BaseModal from '../BaseModal';

import RepositoryFactory from '../../repositories/RepositoryFactory';
const DealRepository = RepositoryFactory.get('deal');
const UserRepository = RepositoryFactory.get('user');
import DealStatuses from '../../enums/deal/dealStatuses';
import DealMixin from '@/mixins/Deal/Deal.mixin';
import DeleteUserMixin from '../../mixins/User/DeleteUser.mixin';
import GetDealDetailMixin from '@/mixins/Deal/GetDealDetail.mixin';
import { FUTURE, LIVE } from '@/enums/dealCalculator/DealTypes';

import Completed from '../DashboardComponents/DealCard/Types/Completed';
import Pagination from '@/components/MyDealsComponents/Pagination';
import Live from '../DashboardComponents/DealCard/Types/Live';
import Started from '../DashboardComponents/DealCard/Types/Started';
import Accepted from '../DashboardComponents/DealCard/Types/Accepted';
import InProgress from '../DashboardComponents/DealCard/Types/InProgress';
import NotStarted from '../DashboardComponents/DealCard/Types/NotStarted';
import FutureDeal from '../DashboardComponents/DealCard/Types/FutureDeal';
import User from '../../modules/User/User';
import moment from "moment";
import { saveExcel } from '@progress/kendo-vue-excel-export';
import LogoImage from '@/assets/icons/sidebar/logo-sidebar.svg';

export default {
  name: 'DealsList',
  components: {
    DealCompletion,
    LinkToDealCalculator,
    Pagination,
    FutureDeal,
    BaseModal,
    LogoImage
  },
  mixins: [DealMixin, GetDealDetailMixin, DeleteUserMixin],
  created() {},
  mounted() {
    this.requestTabInfoByType(this.type);
    setTimeout(() => {
      this.getAllDeals()
    }, 1000);
  },
  props: {
    showUsers: {
      default: true,
    },
  },
  data() {
    return {
      confirmModal: false,
      addAthleteModal: false,
      deleteAgentId: '',
      columns: [
        { field: 'Type'},
        { field: 'Status'},
        { field: 'Reason'},
        { field: 'Start date'},
        { field: 'End date'},
        { field: 'Currency'},
        { field: 'Contract amount'},
        { field: 'Net amount'},
        { field: 'Paid back'},
      ],
      allDealsByType: []
    };
  },
  computed: {
    isAgency() {
      return store.getters['dashboard/getAccount'].isAgency;
    },
    isAgent() {
      return User.isAgent();
    },
    isLender() {
      return User.isLender();
    },
    currentRouteName() {
      return this.$route.name;
    },
    future() {
      return FUTURE;
    },
    live() {
      return LIVE;
    },
    type() {
      return store.getters['Deals/getType'];
    },
    deals() {
      const testings = store.getters['Deals/getDeals'];
      return testings;
    },
    xlsx_data() {
      const deals = this.allDealsByType;
      let data = [];
      deals.forEach((deal) => {
        data.push({
          'Type': deal.type_label,
          'Status': deal.status_label,
          'Reason': deal.reason_label,
          'Start date': moment(deal.start_date).format('DD.MM.YYYY'),
          'End date': moment(deal.finish_date).format('DD.MM.YYYY'),
          'Currency': deal.currency,
          'Contract amount': deal.contract_amount,
          'Net amount': deal.net_amount,
          'Paid back': deal.paid_back,
        });
      });
      return data;
    },
    displayAddNewLink() {
      return this.displayNewDealLink();
    },
    pagination() {
      return store.getters['Deals/getPagination'];
    },
    isRedirected() {
      return store.getters['Deals/isRedirected'];
    },
  },

  methods: {
    exportExcel (fileName) {
      saveExcel({
        data: this.xlsx_data,
        fileName: fileName+'.xlsx',
        columns: this.columns
      });
    },
    downloadPdf(type) {
      if (type === 'live' && this.isLender) {
        type = this.type = 'current';
      }
      DealRepository.exportDeals(this.getRequestParameters(type)).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', type+'-deals.pdf');
        document.body.appendChild(link);
        link.click();
      });
    },
    getRequestParameters(type) {
      switch (type) {
        case 'missed':
          return '?type=missed';
        case 'current':
          return '?type=current';
        case 'quotes':
          return '?type=quotes';
        case 'live':
          return '?search=deal_type:live';
        default:
          return '?search=deal_type:'+type+'';
      }
    },
    athleteAdded() {
      this.getAthletes();
      this.addAthleteModal = false;
    },
    deleteUser() {
      let $this = this;
      $this.$loading(true);
      UserRepository.deleteUserAthlete(this.userId)
        .then((response) => {
          this.getAthletes();
          $this.confirmModal = false;
          $this.$loading(false);
        })
        .catch((error) => {
          console.error(error);
          $this.$loading(false);
        });
    },
    setDealType(type) {
      store.dispatch('dealCalculator/resetDeal');
      store.dispatch('dealCalculator/setDealType', type);
      store.dispatch('dealCalculator/hideDealType', true);
      this.$router.push({ path: '/dealcalculator' }).catch(() => true);
    },
    edit(hash) {
      store.dispatch('editUser/setHash', hash);
      store.dispatch('editUser/setType', 'agent');
      this.$router.push({ path: 'agent/edit' });
    },
    editAthlete(hash) {
      store.dispatch('editUser/setHash', hash);
      store.dispatch('editUser/setType', 'athlete');
      this.$router.push('/agent/athlete-edit');
    },
    showDealDetail(id) {
      this.$emit('showDealDetail', id);
    },
    getTabItems(type) {
      store.dispatch('Deals/setPage', 1);
      store.dispatch('Deals/setType', type);
      this.requestTabInfoByType(type);
    },
    showAreYouSureModal(agentId) {
      this.confirmModal = true;
      this.deleteAgentId = agentId;
    },
    closeAreYouSureModal() {
      this.confirmModal = false;
      this.deleteAgentId = '';
    },
    deleteAgent() {
      let $this = this;
      UserRepository.deleteAgent(this.deleteAgentId)
        .then((response) => {
          $this.requestTabInfoByType($this.type);
          $this.confirmModal = false;
          $this.deleteAgentId = '';
        })
        .catch((error) => {
          console.error(error);
          $this.confirmModal = false;
          $this.deleteAgentId = '';
        });
    },
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
    getAllDeals() {
      let $this = this;
      if ($this.type === 'quotes') {
        DealRepository.getQuotes($this.pagination.total, 1)
          .then((response) => {
            $this.allDealsByType = response.data.data;
          })
          .catch((error) => {
            $this.allDealsByType = [];
            console.error(error);
          });
      } else if ($this.type === 'missed') {
        DealRepository.getLenderMissedDeals( $this.pagination.total, 1)
          .then((response) => {
            $this.allDealsByType = response.data.data;
          })
          .catch((error) => {
            $this.allDealsByType = [];
            console.error(error);
          });
      } else if ($this.type === 'current') {
        DealRepository.getCurrentDeals( $this.pagination.total, 1)
          .then((response) => {
            $this.allDealsByType = response.data.data;
          })
          .catch((error) => {
            $this.allDealsByType = [];
            console.error(error);
          });
      } else {
        DealRepository.getDeals($this.type, $this.pagination.total, 1)
          .then((response) => {
            $this.allDealsByType = response.data.data;
          })
          .catch((error) => {
            $this.allDealsByType = [];
            console.error(error);
          });
      }
    },
  },
  watch: {
    type() {
      setTimeout(() => {
        this.getAllDeals();
      }, 800);
    }
  },
};
</script>

<style lang="scss">
/*
*
*
*
TO DO:
1. Add card styles scoped
2. Progress bar color on different cards
*
*
*/


.pdf-header .line {
  display: block;
  width: 700px;
  height: 3px;
  float: right;
  background-color: #3a9eba;
  margin-top: 13px;
  margin-bottom: 20px;
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
.agents-list {
  .agent {
    width: 100%;
    justify-content: space-between;
    gap: 10px;
    margin-top: 15px;
    .agent-info {
      align-items: center;
      flex-grow: 1;
      p {
        margin-bottom: 0;
        font-size: 12px;
      }
      .name {
        font-weight: 600;
      }
      .agent-phone {
        font-size: 12px;
      }
      .athlete-agent {
        font-size: 12px;
      }
    }
    .actions {
      gap: 10px;
      flex-wrap: wrap;
      justify-content: flex-end;
      width: fit-content;

      /* a {
        font-size: 14px;
        font-weight: 700;
        &.delete{
          color: ;
        }
      } */
    }
  }
}
.agents-list .agent .avatar {
  width: 60px;
  height: auto;
  max-height: 60px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 2px solid #dbe7f4;
  overflow: hidden;
}

.agents-list .agent .avatar img {
  max-width: 100%;
}

.deal-card-wrapper:hover {
  cursor: pointer;
}
/* .counterparties {
  grid-area: counterparties;
} */
/* .grid.grid {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas:
    'dealcompletion counterparties'
    'footer footer';
} */
a.link-text.delete {
  color: #eb5757 !important;
}
.info:hover {
  cursor: pointer;
}
:v-deep .tab-pane.athletes {
  padding-right: 0;
}
</style>
