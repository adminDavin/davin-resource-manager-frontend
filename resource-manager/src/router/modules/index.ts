import type { Route } from '../index.type'
import { defineAsyncComponent } from 'vue';

const route: Route[] = [
  {
    path: "/",
    name: "鉴权中心",
    component: () => import(/* webpackChunkName: 'auth_center' */ "@/views/main/auth_center/index.vue"),
    meta: { title: "dd" }
  },
]

export default route