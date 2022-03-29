// 提示信息仅在开发环境生效
import { createI18n, LocaleMessages, VueMessageType } from 'vue-i18n'
import store from '@/store/index'

const files = import.meta.globEager('./modules/*.ts')

const messages: any = {}
Object.keys(files).forEach((c: string) => {
  const module = files[c].default
  const moduleName: string = c.replace(/^\.\/(.*)\/(.*)\.\w+$/, '$2')
  messages[moduleName] = module
})

// const lang = store.state.app.lang || navigator.userLanguage || navigator.language // 初次进入，采用浏览器当前设置的语言，默认采用中文
let code = localStorage.getItem("language") || "";
let tempNavigator: any = window.navigator;
let lang = (code || tempNavigator.language || tempNavigator.userLanguage || tempNavigator.browserLanguage).toLowerCase();
lang = lang.startsWith("en") ? "en" : lang;
const locale = lang in messages ? lang : 'ja';

// import moment from 'moment';
// import 'moment/locale/zh-cn';
// moment.locale(locale);
localStorage.setItem('language', locale);
console.log('init language is: ', lang, 'language is', locale);
document.getElementsByTagName('html')[0].setAttribute('lang', locale);

/** 国际化主函数，调用vue-i18n插件生成 */
export default createI18n({
  __VUE_I18N_LEGACY_API__: false,
  __VUE_I18N_FULL_INSTALL__: false,
  globalInjection: true,
  locale: locale,
  fallbackLocale: locale,
  messages
});