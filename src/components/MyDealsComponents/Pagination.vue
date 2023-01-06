<template>
  <div class="pagination inline">
    <a
      href="#"
      v-if="pagination.current_page > 1"
      class="prev"
      @click.prevent="getNextPage(pagination.current_page - 1)"
      ><Icon name="pagination-arrow"
    /></a>
    <div class="pages inline">
      <a
        href="#"
        v-for="(page, key) in pagination.total_pages"
        :key="key"
        :class="page === pagination.current_page ? 'current' : ''"
        @click.prevent="getNextPage(page)"
        >{{ page }}</a
      >
    </div>
    <a
      href="#"
      v-if="pagination.current_page < pagination.total_pages"
      @click.prevent="getNextPage(pagination.current_page + 1)"
      class="next"
      ><Icon name="pagination-arrow"
    /></a>
  </div>
</template>

<script>
import store from '@/store';
import DealMixin from '@/mixins/Deal/Deal.mixin';
import Icon from '@/components/Icon';
export default {
  components: {
    Icon,
  },
  mixins: [DealMixin],
  computed: {
    pagination() {
      return store.getters['Deals/getPagination'];
    },
    type() {
      return store.getters['Deals/getType'];
    }
  },
  methods: {
    getNextPage(page) {
      store.dispatch('Deals/setPage', page);
      this.requestTabInfoByType(this.type);
    },
  },
};
</script>

<style scoped>
.pagination {
  width: 100%;
  margin-top: 20px;
  text-align: center;
  justify-content: center;
}
.pages a {
  font-size: 18px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 4px;
  color: #253242;
}
.pages a:not(.current):hover {
  background-color: #edf0f3;
}
.pages a.current {
  background-color: var(--primary);
  color: white;
  margin: 0 7px;
}
.pagination svg {
  height: 15px;
  width: 15px;
}
.pagination .prev {
  margin-right: 15px;
}
.pagination .next {
  transform: rotate(180deg);
  margin-left: 15px;
}
</style>
