import 'lib-flexible';
import Vue from 'vue';
import App from './App';
import router from './router';
import './router/router.interceptor';
import './filters';
import './services';

Vue.config.productionTip = process.env.NODE_ENV === 'production';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
});