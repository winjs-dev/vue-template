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

const Hello = () => import(/* webpackChunkName: "Hello" */ '@views/hello/index.vue');

const routes = [
  {
    path: '/',
    name: 'hello',
    component: Hello
  },
  {
    path: '*', redirect: '/'
  }
];

const router = new Router({
  mode: 'hash',
  routes
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
