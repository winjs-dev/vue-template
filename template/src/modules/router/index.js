/**
 *
 * @authors liwb (you@example.org)
 * @date    2016/10/24 17:33
 * @version $ 路由
 */

/* name module */

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

//component
import hello from '../views/hello';

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'hello',
      component: hello
    }
  ]
});
