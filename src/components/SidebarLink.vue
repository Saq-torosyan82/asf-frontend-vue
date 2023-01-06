<template>
  <router-link :to="to" class="menu-link">
    <Icon :name="getIconName" />
    <slot />
  </router-link>
</template>

<script>
import Icon from '@/components/Icon.vue';

export default {
  props: {
    to: { type: String, required: true },
    icon: { type: String, required: true },
    color: { type: String, default: '#777777' },
  },
  components: { Icon },
  data() {
    return {
      isActive: false,
    };
  },
  computed: {
    getIconName() {
      if (this.$route.path === this.to) {
        return this.icon + '-active';
      } else {
        return this.icon;
      }
    },
  },
  mounted() {},
};
</script>
<style scoped>
/* DESKTOP ONLY */
@media only screen and (min-width: 751px) {
  a.menu-link {
    padding: 10px 0 10px 28px;
    display: block;
    display: flex;
    align-items: center;
    text-decoration: none;
  }
  a.menu-link svg {
    margin-right: 15px;
    margin-bottom: 0;
  }

  a.menu-link.selected {
    background-color: rgba(255, 255, 255, 0.17);
    font-weight: bold;
  }
  a.menu-link:hover {
    background-color: rgba(255, 255, 255, 0.07);
    color: white;
  }
}
/* MOBILE ONLY */
@media only screen and (max-width: 750px) {
}
/* GLOBAL */
a.menu-link {
  font-size: 14px;
  color: white;
}
</style>
