import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './locale'

let app = createApp(App)
app.use(router)
app.use(store)
app.use(i18n)
app.use(ElementPlus, {size: 'mini'})
app.mount('#app')
