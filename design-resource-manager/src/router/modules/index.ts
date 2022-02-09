import type { Route } from '../index.type'
import { defineAsyncComponent } from 'vue';

const route: Route[] = [
  {
    path: "/",
    redirect: '/design_resource',
    component: () => import(/* webpackChunkName: 'home' */ "@/views/main/index.vue"),
    meta: {},
  },
  {
    path: "/design_resource",
    redirect: '/design_resource/manage',
    component: () => import(/* webpackChunkName: 'design_resource_index' */ "@/views/main/design_resource/index.vue"),
    meta: {},
    children: [
      {
        path: "manage",
        component: () => import(/* webpackChunkName: 'design_resource_manager' */ "@/views/main/design_resource/manager/index.vue"),
        meta: { }
      },
      {
        path: "search",
        component: () => import(/* webpackChunkName: 'design_resource_search' */ "@/views/main/design_resource/search/index.vue"),
        meta: { }
      },
    ]
  },
  {
    path: '/res_preview',
    component: () => import(/* webpackChunkName: 'res_preview' */ "@/views/main/res_preview/index.vue"),
    meta: {},
    children: [
      {
        path: "image",
        component: () => import(/* webpackChunkName: 'res_preview_image' */ "@/views/main/res_preview/image/index.vue"),
        meta: { }
      },
      {
        path: "doc",
        component: () => import(/* webpackChunkName: 'res_preview_doc' */ "@/views/main/res_preview/doc/index.vue"),
        meta: { }
      },
      {
        path: "excel",
        component: () => import(/* webpackChunkName: 'res_preview_excel' */ "@/views/main/res_preview/excel/index.vue"),
        meta: { }
      },
      {
        path: "ppt",
        component: () => import(/* webpackChunkName: 'res_preview_ppt' */ "@/views/main/res_preview/ppt/index.vue"),
        meta: { }
      },
      {
        path: "pdf",
        component: () => import(/* webpackChunkName: 'res_preview_ppt' */ "@/views/main/res_preview/pdf/index.vue"),
        meta: { }
      },
      {
        path: "others",
        component: () => import(/* webpackChunkName: 'res_preview_others' */ "@/views/main/res_preview/others/index.vue"),
        meta: { }
      },
    ]
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
    path: "/waiting",
    component: () => import(/* webpackChunkName: 'waiting' */ "@/views/main/auth_center/waiting.vue"),
    meta: { }
  }
  , {
    path: "/login",
    component: () => import(/* webpackChunkName: 'auth_center' */ "@/views/main/auth_center/index.vue"),
    meta: { }
  }
]

export default route