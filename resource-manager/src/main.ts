import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router/index'
import store from './store'

// 提示信息仅在开发环境生效
import { createI18n, LocaleMessages, VueMessageType } from 'vue-i18n'

const files= import.meta.globEager('./modules/*.ts')

let messages: LocaleMessages<VueMessageType> = {}
Object.keys(files).forEach((c: string) => {
  const module = files[c].default
  const moduleName: string = c.replace(/^\.\/(.*)\/(.*)\.\w+$/, '$2')
  messages[moduleName] = module
})

const lang = navigator.language // 初次进入，采用浏览器当前设置的语言，默认采用中文
const locale = lang.indexOf('en') !== -1 ? 'en' : 'zh-cn'

/** 国际化主函数，调用vue-i18n插件生成 */
const i18n = createI18n({
  __VUE_I18N_LEGACY_API__: false,
  __VUE_I18N_FULL_INSTALL__: false,
  locale: locale,
  fallbackLocale: 'zh-cn',
  
})


let app = createApp(App)
app.use(router)
app.use(store)
app.use(i18n)
app.mount('#app')
