<template>
  <div v-on-clickaway="clearSuggestions" class="search-wrapper">
    <input
      type="text"
      @keyup="search"
      @focus="search"
      v-model="searchQuery"
      placeholder="Search by profile name"
    /><IconSearch />
    <div v-if="itemsToShow.length > 0" class="suggestions">
      <li>
        <ul @click="edit(item)" v-for="(item, key) in itemsToShow" :key="key">
          {{
            item.name
          }}
        </ul>
      </li>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import IconSearch from '@/assets/icons/search.svg';
import { mixin as clickaway } from 'vue-clickaway';

export default {
  name: 'SearchProfiles',
  components: { IconSearch },
  mixins: [clickaway],
  data() {
    return {
      searchQuery: '',
      itemsToShow: [],
    };
  },
  computed: {
    lenders() {
      return store.getters['adminLenders/getLenders'];
    },
    agents() {
      return store.getters['adminAgents/getAgents'];
    },
    athletes() {
      return store.getters['adminAthletes/getAthletes'];
    },
    organizations() {
      return store.getters['adminOrganisations/getOrganisations'];
    },
  },
  methods: {
    search() {
      let $this = this;
      $this.itemsToShow = [];

      if ($this.searchQuery !== '') {
        if ($this.athletes && $this.athletes.length > 0)
          $this.athletes.filter(function (elem) {
            if (
              elem.name.toLowerCase().includes($this.searchQuery.toLowerCase())
            ) {
              elem['type'] = 'athlete';
              $this.itemsToShow.push(elem);
            }
          });

        if ($this.agents && $this.agents.length > 0)
          $this.agents.filter(function (elem) {
            if (
              elem.name.toLowerCase().includes($this.searchQuery.toLowerCase())
            ) {
              elem['type'] = 'agent';
              $this.itemsToShow.push(elem);
            }
          });

        if ($this.organizations && $this.organizations.length > 0)
          $this.organizations.filter(function (elem) {
            if (
              elem.name.toLowerCase().includes($this.searchQuery.toLowerCase())
            ) {
              elem['type'] = 'corporate';
              $this.itemsToShow.push(elem);
            }
          });

        if ($this.lenders && $this.lenders.length > 0)
          $this.lenders.filter(function (elem) {
            if (
              elem.name.toLowerCase().includes($this.searchQuery.toLowerCase())
            ) {
              elem['type'] = 'lender';
              $this.itemsToShow.push(elem);
            }
          });
      } else {
        $this.itemsToShow = [];
      }
    },
    clearSuggestions() {
      this.itemsToShow = [];
    },
    edit(profile) {
      store.dispatch('editUser/setHash', profile.id);
      store.dispatch('editUser/setType', profile.type);
      this.$emit('editProfile', profile.id);
    },
  },
};
</script>

<style scoped>
.search-wrapper {
  position: relative;
}
.search-wrapper .suggestions {
  padding-top: 10px;
  border: 1px solid #d9dfe5;
  border-radius: 4px;
  background: white;
  position: absolute;
  width: 100%;
  z-index: 9;
  max-height: 400px;
  min-height: 100px;
  overflow: hidden;
  overflow-y: auto;
  margin-top: 5px;
}

.search-wrapper svg {
  position: absolute;
  right: 15px;
  top: 11.5px;
}

.search-wrapper .suggestions li {
  list-style: none;
}

.search-wrapper .suggestions li ul {
  list-style: none;
  padding: 8px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 500;
  color: #253242;
  line-height: 16px;
}

.search-wrapper .suggestions li ul:hover {
  cursor: pointer;
  background: var(--primary);
}

.search-wrapper input {
  position: relative;
  font-size: 14px;
  font-weight: 600;
  width: 100%;
  padding: 10.5px 16px;
  border: 1px solid #d9dfe5;
  border-radius: 4px;
  /* margin-top: 8px; */
  box-shadow: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: white;
}
</style>
