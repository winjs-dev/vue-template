import 'lib-flexible';
import lang from './lang/zh-cn';
import config from './config';
import Vue from 'vue';
import App from './App';
import router from './router';
import * as filters from './filters';
import services from './services';

window.i18n = lang;
window.CT = config;

// register global utility filters.
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = process.env.NODE_ENV === 'production';

// 将services挂载到vue的原型上
// views引用的方法：this.$services.接口名（小驼峰）
Object.defineProperty(Vue.prototype, '$services', {value: services});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
});
