import type { Route } from '../index.type'
import { defineAsyncComponent } from 'vue';

const route: Route[] = [
  {
    path: "/",
    redirect: '/home',
    component: () => import(/* webpackChunkName: 'main' */ "@/views/main/index.vue"),
    meta: {},
    children: [
      {
        path: "home",
        component: () => import(/* webpackChunkName: 'design_resource_manager' */ "@/views/main/home/index.vue"),
        meta: { }
      },
      {
        path: "concept",
        component: () => import(/* webpackChunkName: 'design_resource_manager' */ "@/views/main/concept/index.vue"),
        meta: { }
      },
      {
        path: "news_and_topic",
        component: () => import(/* webpackChunkName: 'news_and_topic' */ "@/views/main/news_and_topic/index.vue"),
        meta: { }
      },
      {
        path: "reserve",
        component: () => import(/* webpackChunkName: 'reserve' */ "@/views/main/reserve/index.vue"),
        meta: { }
      },
      {
        path: "merchant",
        component: () => import(/* webpackChunkName: 'merchant' */ "@/views/main/merchant/index.vue"),
        meta: { }
      },
    ]
  },
  // {
  //   path: "/design_resource",
  //   redirect: '/design_resource/manage',
  //   component: () => import(/* webpackChunkName: 'design_resource_index' */ "@/views/main/design_resource/index.vue"),
  //   meta: {},
  //   children: [
  //     {
  //       path: "manage",
  //       component: () => import(/* webpackChunkName: 'design_resource_manager' */ "@/views/main/design_resource/manager/index.vue"),
  //       meta: { }
  //     },
  //     {
  //       path: "search",
  //       component: () => import(/* webpackChunkName: 'design_resource_search' */ "@/views/main/design_resource/search/index.vue"),
  //       meta: { }
  //     },
  //   ]
  // },
 
  // {
  //   path: "/document",
  //   redirect: '/document/d3_force_graph',
  //   component: () => import(/* webpackChunkName: 'dashboard' */ "@/views/main/document/index.vue"),
  //   meta: { },
  //   children: [
  //     {
  //       path: "d3_force_graph",
  //       component: () => import(/* webpackChunkName: 'dashboard' */ "@/views/main/document/d3_force_graph/index.vue"),
  //       meta: { }
  //     },
  //     {
  //       path: "troisjs",
  //       component: () => import(/* webpackChunkName: 'dashboard' */ "@/views/main/document/troisjs/index.vue"),
  //       meta: { }
  //     },
  //     {
  //       path: "pathfinding",
  //       component: () => import(/* webpackChunkName: 'dashboard' */ "@/views/main/document/pathfinding/index.vue"),
  //       meta: { }
  //     },
  //     {
  //       path: "threejs_vue",
  //       component: () => import(/* webpackChunkName: 'dashboard' */ "@/views/main/document/threejs_vue/index.vue"),
  //       meta: { }
  //     },
  //     {
  //       path: "threejs_ar",
  //       component: () => import(/* webpackChunkName: 'dashboard' */ "@/views/main/document/threejs_ar/index.vue"),
  //       meta: { }
  //     }
      
  //   ]
  // },
  // {
  //   path: "/build",
  //   component: () => import(/* webpackChunkName: 'waiting' */ "@/views/build/index.vue"),
  //   meta: { }
  // },
  // {
  //   path: "/waiting",
  //   component: () => import(/* webpackChunkName: 'waiting' */ "@/views/main/auth_center/waiting.vue"),
  //   meta: { }
  // }
  // , {
  //   path: "/login",
  //   component: () => import(/* webpackChunkName: 'auth_center' */ "@/views/main/auth_center/index.vue"),
  //   meta: { }
  // }
]

export default route