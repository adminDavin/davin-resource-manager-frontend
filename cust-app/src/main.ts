import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './locale'
import * as ELIcons from '@element-plus/icons-vue'
import './assets/scss/global.scss'
import uAPI  from 'uapi-json';
const settings = { auth: {username: 'USERNAME', password: 'PASSWORD', region: 'REGION'}};
const AirService = uAPI.createAirService(settings);

AirService.importPNR().catch((err) => {
  if (err instanceof uAPI.errors.Common.ValidationError) {
    console.log('Validation error occured');
  }
  if (err instanceof uAPI.errors.Request.RequestValidationError) {
    console.log('Validation error occured in request');
  }
  if (err instanceof uAPI.errors.Request.RequestValidationError.ParamsMissing) {
    console.log('Params are missing for request');
  }
});
let app = createApp(App)
app.use(router)
app.use(store)
app.use(i18n)
app.use(ElementPlus, { size: 'mini' })
for (let iconName in ELIcons) {
	app.component(iconName, ELIcons[iconName])
}	
app.mount('#app')
