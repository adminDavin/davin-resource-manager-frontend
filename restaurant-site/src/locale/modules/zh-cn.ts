import zhCN from 'ant-design-vue/es/locale/zh_CN'; // 中文
import system from './zh_CN/system';
import common from './zh_CN/common';
import menu from './zh_CN/menu';
const lang = {
  el: zhCN, // element内部国际化
  message: {
    language: '中文',
    ...system,
    ...common,
    ...menu
  }
}

export default lang