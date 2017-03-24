import 'lib-flexible';
import lang from './lang/zh-cn';
import config from './config';
import Vue from 'vue';
import App from './App';
import router from './router';
import * as filters from './filters';

window.i18n = lang;
window.CT = config;

//实例化Vue的filter
// register global utility filters.
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

router.beforeEach((to, from, next) => {
  next();
});

const app = new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app');
