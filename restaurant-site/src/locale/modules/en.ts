import enUS from 'ant-design-vue/es/locale/en_US';
import system from './en_US/system'
import common from './en_US/common'
import menu from './en_US/menu'
const lang = {
  el: enUS, // element-plus i18 setting
  message: {
    language: 'English',
    ...system,
    ...common,
    ...menu
  }
}

export default lang