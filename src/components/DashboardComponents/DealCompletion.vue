<template>
  <div class="deal-completion">
    <b-tabs content-class="">
      <b-tab
        @click="$emit('getDeals', firstTab)"
        title="Current deals"
        :active="dealsType === firstTab"
      >
        <slot name="current-deals"></slot>
      </b-tab>
      <b-tab
        @click="$emit('getDeals', 'quotes')"
        title="Quotes"
        class="future-deals"
        v-if="!isLender"
        :active="dealsType === 'quotes'"
      >
        <slot name="future-deals"></slot>
      </b-tab>
      <b-tab
        @click="$emit('getDeals', 'missed')"
        :active="dealsType === 'missed'"
        title="Missed deals"
        class="missed-deals"
        v-if="isLender"
      >
        <slot name="missed-deals"></slot>
      </b-tab>
      <b-tab title="Past deals" class="past-deals">
        <slot name="past-deals"></slot>
      </b-tab>

      <b-tab
          v-if="showUsers && (isAgency && isAgent)"
        @click="$emit('getAgents', 'agents')"
        title="Agents"
        :active="dealsType === 'agents'"
        class="agents"
      >
        <slot name="agents"></slot>
      </b-tab>

      <b-tab
          v-if="showUsers && (isAgency && isAgent)"
        @click="$emit('getAthletes', 'athletes')"
        :active="dealsType === 'athletes'"
        title="Athletes"
        class="athletes"
      >
        <slot name="athletes"></slot>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import store from '@/store';
import User from '@/modules/User/User';
export default {
  name: 'DealCompletion',
  components: {},
  props: {
    showUsers: {
      default: true
    }
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
    dealsType() {
      return store.getters['Deals/getType'];
    },
    firstTab() {
      if (User.isLender()) {
        return 'current';
      }
      return 'live';
    },
  },
};
</script>

<style lang="scss" scoped>
.deal-completion {
  height: fit-content;
}
.deal-completion {
  .future-deals {
    ::v-deep {
      .deal-card {
        min-height: 100px;
      }
    }
  }
}
::v-deep {
  ul.nav-tabs {
    padding-left: 0;
  }
  ::-webkit-scrollbar {
    display: none;
  }
}
/* ::v-deep { */
/* ul.nav-tabs {
    padding-left: 0;
  } */
/* .nav-tabs,
  .nav-tabs .nav-link.active,
  .nav-tabs .nav-item.show .nav-link {
    border-color: white;
    border-bottom: none;
    margin-bottom: 0;
  } */
/* .nav-tabs a.nav-link.active {
    font-weight: 700;
    color: #253242;
  } */
/* .nav-tabs a {
    font-size: 14px;
    font-weight: 400;
    color: #707d8c;
    background-color: #f6f6f6;
    margin-right: 8px;
    border: none;
  } */
/* .nav-tabs a:hover {
    border: none;
  }
} */

.deal-completion ::v-deep a.all-deals {
  margin-top: 24px;
  display: block;
}
.deal-completion .tabs::v-deep .tab-content.tab-content {
  background-color: white;
  border-radius: 0 8px 8px 8px;
  padding: 20px;
}
@media only screen and (max-width: 900px) {
  .deal-completion .tabs::v-deep .tab-content.tab-content {
    padding: 10px;
  }
}
</style>
