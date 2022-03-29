import jaJP from 'ant-design-vue/es/locale/ja_JP'; // 中文
import system from './ja_JP/system';
import common from './ja_JP/common';
import menu from './ja_JP/menu';
const lang = {
  el: jaJP,
  message: {
    language: '日本語',
    ...system,
    ...common,
    ...menu
  }
}

export default lang