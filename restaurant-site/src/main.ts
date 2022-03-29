import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import store from './store';
import router from './router';
import i18n from './locale';

import 'ant-design-vue/dist/antd.less';
import '@/assets/styles/base.less';

/* font-class */
import '@/assets/iconfont/iconfont.css'

/* symbol,svg */
import '@/assets/iconfont/iconfont.js'

const app = createApp(App)
app.use(Antd);
app.use(store);
app.use(router);
app.use(i18n);
app.mount('#app');
