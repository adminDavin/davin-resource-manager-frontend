import { reactive } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Modules from './modules/index';
import store from '@/store';

const router = createRouter({
  history: createWebHashHistory(),
  routes: reactive([
    ...Modules
  ])
});

// 路由跳转前的监听操作
// router.beforeEach((to, _from, next) => {
//   next();
// });

// // 路由跳转后的监听操作
// router.afterEach((to, _from) => {
//   console.log("router jump finished", to, _from);
//   // const keepAliveComponentsName = store.getters['keepAlive/keepAliveComponentsName'] || []
//   // const name = to.matched[to.matched.length - 1].components.default.name
//   // if (to.meta && to.meta.cache && name && !keepAliveComponentsName.includes(name)) {
//   //   store.commit('keepAlive/addKeepAliveComponentsName', name)
//   // }
//   // NProgress.done();
// });

export default router;