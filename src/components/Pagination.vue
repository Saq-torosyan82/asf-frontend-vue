<template>
  <div class="pagination inline">
    <a href="#" class="prev"><Icon name="pagination-arrow" /></a>
    <div class="pages inline">
      <a href="#">1</a>
      <a href="#" class="current">2</a>
      <a href="#">3</a>
      <a href="#">4</a>
      <a href="#">5</a>
    </div>
    <a href="#" class="next"><Icon name="pagination-arrow" /></a>
  </div>
</template>

<script>
import Icon from '@/components/Icon';
export default {
  components: {
    Icon,
  },
};
</script>

<style lang="scss" scoped>
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
  background-color: #3a9eba;
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
