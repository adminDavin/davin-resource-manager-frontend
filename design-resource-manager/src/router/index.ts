import { reactive } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Modules from './modules/index';
import store from '@/store';
import browser_utils from '@/utils/browser_utils';


const router = createRouter({
  history: createWebHashHistory(),
  routes: reactive([
    ...Modules
  ])
})

const whiteList = ['/login', '/waiting'];

// 路由跳转前的监听操作
router.beforeEach((to, _from, next) => {
  if (to.fullPath.slice(0, 12) == '/res_preview') {
    next();
  };
  if (!browser_utils.isEmpty(store.state.user.token) || !browser_utils.isObjEmpty(store.state.user.info)) { // 验证是否已经登录
    if (to.path == whiteList[1]) { // 如果已经登录 但是将要跳转到过度页面 默认跳转至首页
      next('/dashboard');
    } else { // 其他情况 不做跳转处理
      if (to.path == '/') {
        next('/dashboard');
      } else {
        next();
      }
    }
  } else {  // 没有登录的情况下
    let params = browser_utils.queryParams(document.location.toString(), true);
    if (browser_utils.isEmpty(params['code'])) { // 如果请求路径参数中不包含code
      if (to.path == whiteList[0]) { // 当前已经是即将跳转至登录页面 不做跳转处理
        next();
      } else { // 没有登录且请求参数中不包含code的情况下 默认跳转至登录页面
        next("/login");
      }
    } else { // 请求路径中包含code的情况 
      if (to.path == whiteList[1]) { // 当前即将跳转至登录过度页面 不做跳转处理
        next();
      } else {  // 没有登录但请求参数中包含code的情况下 默认跳转至登录过度页面
        next("/waiting");
      }
    }
  }
});

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