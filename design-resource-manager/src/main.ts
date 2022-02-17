import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './locale'
import * as ELIcons from '@element-plus/icons-vue'
import './assets/scss/global.scss'
import AFRAME from 'aframe';

let app = createApp(App)
app.use(router)
app.use(store)
app.use(i18n)
app.use(AFRAME)
app.use(ElementPlus, { size: 'mini' })
for (let iconName in ELIcons) {
	app.component(iconName, ELIcons[iconName])
}	
app.mount('#app')
