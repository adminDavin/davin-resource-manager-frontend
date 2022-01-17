import { reactive } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Modules from './modules/index';


const router = createRouter({
  history: createWebHashHistory(),
  routes: reactive([
    ...Modules
  ])
})

// 路由跳转前的监听操作
router.beforeEach((to, _from, next) => {
  console.log("router jump start", to, _from);
  // NProgress.start();
  console.log(to, _from);
  next();
  // if (store.state.user.token || whiteList.indexOf(to.path) !== -1) {
  //   to.meta.title ? (changeTitle(to.meta.title)) : ""; // 动态title
  //   next()
  // } else {
  //   next("/login"); // 全部重定向到登录页
  //   to.meta.title ? (changeTitle(to.meta.title)) : ""; // 动态title
  // }
});

// 路由跳转后的监听操作
router.afterEach((to, _from) => {
  console.log("router jump finished", to, _from);
  // const keepAliveComponentsName = store.getters['keepAlive/keepAliveComponentsName'] || []
  // const name = to.matched[to.matched.length - 1].components.default.name
  // if (to.meta && to.meta.cache && name && !keepAliveComponentsName.includes(name)) {
  //   store.commit('keepAlive/addKeepAliveComponentsName', name)
  // }
  // NProgress.done();
});

export default router;