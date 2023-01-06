import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from './router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import Vuelidate from 'vuelidate';
import VueTelInput from 'vue-tel-input';
import { telProps } from '@/assets/js/telInputConfig.js';
//import "vue-tel-input/dist/vue-tel-input.css";
import VueTinyLazyloadImg from 'vue-tiny-lazyload-img'
import '@/assets/styles/Tel-Input.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import store from './store';
import TokenService from './services/token.service';
import setupInterceptors from './services/setupInterceptors';
import localStorageService from './services/localstorage.service';
import numeral from 'numeral';
import numFormat from 'vue-filter-number-format';
import VueLoading from 'vuejs-loading-plugin';
import money from 'v-money';
import AsyncComputed from 'vue-async-computed';
import VueAuthImage from 'vue-auth-image';
import VueAuthHref from 'vue-auth-href';

import 'material-design-icons-iconfont/dist/material-design-icons.css';
import vuetify from './plugins/vuetify';
import HighchartsVue from 'highcharts-vue';
import CountryFlag from 'vue-country-flag';

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(HighchartsVue);
Vue.use(VueTelInput, telProps);
Vue.use(AsyncComputed);
Vue.use(VueTinyLazyloadImg);

Vue.use(Vuelidate);
Vue.filter('numFormat', numFormat(numeral));

Vue.filter('roundingUp', function(value) {
  if (typeof value === 'string') {
    return Math.ceil(Number(value.replace(/,/g, '')));
  }else {
    return Math.ceil(Number(value));
  }
});

Vue.use(require('vue-moment'));

Vue.use(money, { precision: 4 });
Vue.component('country-flag', CountryFlag);

// overwrite defaults
Vue.use(VueLoading, {
  dark: true,
  text: 'Wait please ...',
  loading: false,
});

const authHeader = 'Bearer ' + TokenService.getLocalAccessToken();

const options = {
  token: () => TokenService.getLocalAccessToken(),
  dotsAnimation: true,
};
Vue.use(VueAuthHref, options);
Vue.use(VueAuthImage);

axios.defaults.headers.common['Authorization'] = authHeader;

setupInterceptors(store);
Vue.prototype.$localStorage = localStorageService;

Vue.config.productionTip = false;
Vue.component('icon', require('./components/Icon.vue').default);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');

export const horizontalScroll = () => {
  const slider = document.querySelector('.nav-tabs')
  let isDown = false
  let startX
  let scrollLeft

  if (slider) {
    slider.addEventListener('mousedown', (e) => {
      isDown = true
      startX = e.pageX - slider.offsetLeft
      scrollLeft = slider.scrollLeft
    })
    slider.addEventListener('mouseleave', () => {
      isDown = false
    })
    slider.addEventListener('mouseup', () => {
      isDown = false
    })
    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - slider.offsetLeft
      const walk = (x - startX) * 3
      slider.scrollLeft = scrollLeft - walk
    })
  }
}
