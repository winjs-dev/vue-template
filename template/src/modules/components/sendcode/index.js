/**
 *
 * @authors liwb (you@example.org)
 * @date    2017/2/15 10:30
 * @version $ IIFE
 */

/* name module */

import SendCode from './src/sendcode.vue';

SendCode.install = function (Vue) {
  Vue.component(SendCode.name, SendCode);
};

export default SendCode;
