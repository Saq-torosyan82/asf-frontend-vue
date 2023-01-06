import store from '@/store';
import RepositoryFactory from '../../repositories/RepositoryFactory';
import User from '@/modules/User/User';
const DealRepository = RepositoryFactory.get('deal');
const UserRepository = RepositoryFactory.get('user');

const STATUS_CANCEL = 'cancel';

export default {
  data() {
      return {
          agents: [],
          athletes: [],
      }
  },
  filters: {
    currency(value) {
      switch (value) {
        case 'USD':
          return '$';
        case 'GBP':
          return '£';
        default:
          return '€';
      }
    },
  },
  computed: {
    pagination() {
      return store.getters['Deals/getPagination'];
    },
    type() {
      return store.getters['Deals/getType'];
    },
    athlete: () => {
        return store.getters['dealDetail/getAthlete'];
    },
  },
  methods: {
      updateInformation(dealCalculatorStep) {
          this.$router.push('/dealcalculator');
          if(this.athlete) {
              store.dispatch('dealCalculator/setAthlete', this.athlete);
              store.dispatch('editUser/setHash', this.athlete.id);
          }
          store.dispatch('dealCalculator/jumpToStep', dealCalculatorStep);
          store.dispatch('dealCalculator/setResume', true);
          store.dispatch('dealCalculator/nextStep');
      },
      requestTabInfoByType(type) {
          switch (type) {
              case 'missed':
                  this.getLenderMissedDeals();
                  break;
              case 'current':
                  this.getCurrentDeals();
                  break;
              case 'quotes':
                  this.getQuotes();
                  break;
              case 'agents':
                  this.getAgents();
                  break;
              case 'athletes':
                  this.getAthletes();
                  break;
              default:
                  this.getDeals();
                  break;
          }
      },
    cancelDeal() {
      let $this = this;
      $this.$loading(true);
      DealRepository.updateDealStatus(this.dealId, STATUS_CANCEL, {})
        .then((response) => {
          $this.$loading(false);
          store.dispatch('dealDetail/updateDealFlag', true);
        })
        .catch((error) => {
          $this.$loading(false);
          console.error(error);
        });
    },
    async getDeals() {
      let $this = this;
      $this.$loading(true);
      await DealRepository.getDeals($this.type,$this.pagination.per_page,$this.pagination.current_page)
        .then((response) => {
          $this.$loading(false);
          store.dispatch('Deals/storeDeals', response.data.data);
          store.dispatch('Deals/setPagination', response.data.meta.pagination);
        })
        .catch((error) => {
          console.error(error);
          $this.$loading(false);
        });
    },
    async getLenderMissedDeals() {
      let $this = this;
      $this.$loading(true);
      await DealRepository.getLenderMissedDeals($this.pagination.per_page,$this.pagination.current_page)
          .then((response) => {
            $this.$loading(false);
            store.dispatch('Deals/storeDeals', response.data.data);
            store.dispatch('Deals/setPagination', response.data.meta.pagination);
          })
          .catch((error) => {
            console.error(error);
            $this.$loading(false);
          });
    },
      async getQuotes() {
          let $this = this;
          $this.$loading(true);
          await DealRepository.getQuotes($this.pagination.per_page,$this.pagination.current_page)
              .then((response) => {
                  $this.$loading(false);
                  store.dispatch('Deals/storeDeals', response.data.data);
                  store.dispatch('Deals/setPagination', response.data.meta.pagination);
              })
              .catch((error) => {
                  console.error(error);
                  $this.$loading(false);
              });
      },
    async getCurrentDeals() {
      let $this = this;
      $this.$loading(true);
      await DealRepository.getCurrentDeals($this.pagination.per_page,$this.pagination.current_page)
          .then((response) => {
            $this.$loading(false);
            store.dispatch('Deals/storeDeals', response.data.data);
            store.dispatch('Deals/setPagination', response.data.meta.pagination);
          })
          .catch((error) => {
            console.error(error);
            $this.$loading(false);
          });
    },
      async getAgents() {
          let $this = this;
          $this.$loading(true);
          await UserRepository.getAgents().then((response) => {
              $this.agents = response.data.data;
              $this.$loading(false);
          }).catch((error) => {
              console.error(error);
              $this.agents = [];
              $this.$loading(false);
          });
      },
      async getAthletes() {
          let $this = this;
          $this.$loading(true);
          await UserRepository.getUserAthletes().then((response) => {
              $this.athletes = response.data.data;
              $this.$loading(false);
          }).catch((error) => {
              console.error(error);
              $this.athletes = [];
              $this.$loading(false);
          });
      },
    displayNewDealLink() {
      if (User.isBorrower() || User.isAdmin()) return true;

      return false;
    },
  },
};
