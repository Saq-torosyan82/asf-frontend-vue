<template>
  <div class="wrapper">
    <TheSideNav />
    <router-view></router-view>

    <div class="background-layer"></div>
  </div>
</template>
<script>
import TheSideNav from "@/components/TheSideNav.vue";
import TokenService from "../../services/token.service";

export default {
  components: { TheSideNav },
  data: function() {
    return {
      events: ['click', 'mousemove', 'mousedown', 'scroll', 'keypress', 'load'],
      logoutTimer: null
    }
  },
  mounted() {
    let $this = this;
    this.events.forEach(function (event)  {
      window.addEventListener(event, $this.resetTimer);
    })
  },

  methods: {
    setTimer() {
      this.logoutTimer = setTimeout(() => {
        TokenService.removeToken();
        window.location.href = '/login';
      }, 30 * 60 * 1000);
    },
    resetTimer() {
      clearTimeout(this.logoutTimer);
      this.setTimer();
    }
  }
};
</script>

<style scoped>
.background-layer {
  background-color: #efefef;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -10;
}
</style>
