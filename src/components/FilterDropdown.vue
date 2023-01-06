<template>
  <div class="filters" :class="show ? 'show' : ''">
    <div @click="toggleDropdown()">
      <Icon name="filter-no-fill" class="filter-dropdown" />
    </div>
    <div class="below">
      <div class="colored-header">
        <h5>Filters</h5>
        <a href="#" @click.prevent="clearFilter" class="clear-filters"
          >Clear all</a
        >
      </div>

      <div class="group" v-for="(item, key) in sorting" :key="key">
        <h5 class="group-header">{{ item.label }}</h5>

        <div
          v-for="(option, index) in item.options"
          :key="index"
          class="input-wrap"
        >
          <input
            @change="filterChanged"
            v-model="query"
            :name="item.key"
            :value="{ sortedBy: option.key, orderBy: item.key }"
            type="radio"
          />
          <label for="radio">{{ option.label }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store';
import Icon from '@/components/Icon.vue';

export default {
  components: {
    Icon,
  },
  data() {
    return {
      show: false,
      query: '',
    };
  },
  computed: {
    sorting() {
      return store.getters['Deals/getDealsSorting'];
    },
  },
  methods: {
    toggleDropdown() {
      this.show = !this.show;
    },
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.show = false;
      }
    },
    filterChanged() {
      if (this.order !== '') {
        let request =
          'orderBy=' +
          this.query.orderBy +
          '&sortedBy=' +
          this.query.sortedBy +
          '';
        store.dispatch('Deals/setOrderQuery', request);
        this.$emit('orderRequest', request);
        this.show = false;
      }
    },
    clearFilter() {
      this.query = '';
      store.dispatch('Deals/setOrderQuery', '');
      this.$emit('orderRequest', '');
    },
  },
  mounted() {
    document.addEventListener('click', this.close);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.close);
  },
};
</script>

<style scoped>
.filters.show .below {
  display: initial;
}
.filters {
  position: relative;
}

.colored-header {
  width: 100%;
  height: 42px;
  /* background: linear-gradient(312.49deg, #246abe 10.15%, #4d8ad3 91.85%); */
  background: var(--main-gradient);
  display: inline-flex;
  align-items: center;
  border-radius: 10px 10px 0 0;
  padding: 0;
}
.colored-header h5 {
  font-size: 14px;
  font-weight: 700;
  color: white;
  margin: 0 0 0 15px;
}
.colored-header .clear-filters {
  margin: 2px 15px 0 auto;
  color: white;
  font-size: 13px;
  font-weight: bold;
  opacity: 0.85;
}
.colored-header .clear-filters:hover {
  opacity: 1;
}

svg {
  fill: #ffffff;
  cursor: pointer;
}
.below {
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  width: 200px;
  background-color: white;
  z-index: 10;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 11px;
}
.below .group {
  margin: 15px;
}
.below .group h5.group-header {
  font-size: 13px;
  color: #93a0ae;
  margin: 0;
}

.below .group label.selected {
  color: #4289da;
}
.below .group label {
  font-size: 13px;
  color: #93a0ae;
  margin-left: 7px;
  margin-top: 2px;
}
.below .input-wrap {
  display: inline-flex;
  align-items: center;
  margin-top: 10px;
  width: 100%;
}
</style>
