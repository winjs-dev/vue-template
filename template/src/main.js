import 'lib-flexible';
import lang from './lang/zh-cn';
import Vue from 'vue';
import App from './App';
import router from './router';
import fastClick from 'fastclick';

window.i18n = lang;

//实例化Vue的filter
// register global utility filters.
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    fastClick.attach(document.body);
  }, false);
}

router.beforeEach((to, from, next) => {
  next();
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
});
