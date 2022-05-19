import type { Route } from '../index.type'
import { defineAsyncComponent } from 'vue';

const route: Route[] = [
  {
    path: "/",
    // redirect: '/r_davin',
    component: () => import(/* webpackChunkName: 'home' */ "@/views/main/index.vue"),
    meta: {},
  },
  {
    path: "/login",
    component: () => import(/* webpackChunkName: 'auth_center' */ "@/views/main/auth_center/index.vue"),
    meta: { }
  },
  {
    path: "/waiting",
    component: () => import(/* webpackChunkName: 'waiting' */ "@/views/main/auth_center/waiting.vue"),
    meta: { }
  }, 
  {
    path: "/dashboard",
    redirect: '/dashboard/design_news',
    component: () => import(/* webpackChunkName: 'dashboard' */ "@/views/main/dashboard/index.vue"),
    meta: { },
    children: [
      {
        path: "design_news",
        component: () => import(/* webpackChunkName: 'dashboard' */ "@/views/main/dashboard/design_news/index.vue"),
        meta: { }
      },
      {
        path: "design_auxiliary_tools",
        component: () => import(/* webpackChunkName: 'dashboard' */ "@/views/main/dashboard/design_auxiliary_tools/index.vue"),
        meta: { }
      },
      {
        path: "design_cloud",
        component: () => import(/* webpackChunkName: 'dashboard' */ "@/views/main/dashboard/design_cloud/index.vue"),
        meta: { }
      },
      
    ]
  },
  {
    path: "/template_info",
    redirect: '/template_info/project',
    component: () => import(/* webpackChunkName: 'template_info' */ "@/views/main/template_info/index.vue"),
    meta: {},
    children: [
      {
        path: "material",
        component: () => import(/* webpackChunkName: 'template_infomaterial' */ "@/views/main/template_info/material/index.vue"),
        meta: { }
      },
      {
        path: "project",
        component: () => import(/* webpackChunkName: 'template_infoproject' */ "@/views/main/template_info/project/index.vue"),
        meta: { }
      }
    ]
  }
]

export default route