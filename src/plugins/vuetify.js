import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';
Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#3a9eba',
        warning: '#FF6C6C',
        secondary: '#4289DA',
        accent: '#8c9eff',
        error: '#b71c1c',
        grey: '#B6C3D1',
        black: '#000000',
        white: '#ffffff',
      },
    },
    // options: { customProperties: true },
  },
});
