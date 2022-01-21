const showLogo: Boolean = true; // 是否显示Logo顶部模块
const systemTitle = 'message.system.title' // 系统名称，用于显示在左上角模块，以及浏览器标题上使用,使用配置项
const wxCorpId = "ww8f30d79285ccb1e0";
const wxSecret = "-gqeIU-Wi0QTif9h6qaIsGhfYOQ2tQtgqwbgnnycsdU";
// https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=ID&corpsecret=SECRET
const wxAccessTokenUrl = `https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${wxCorpId}&corpsecret=${wxSecret}`

const wxConf = {
  corpid: "ww8f30d79285ccb1e0",
  secret: {
    common: '-gqeIU-Wi0QTif9h6qaIsGhfYOQ2tQtgqwbgnnycsdU',
    contact: 'YOUR_CONTACT_SECRET',
    external: 'YOUR_EXTERNAL_CONTACT_SECRET'
  },
  'redirectUri': 'https://www.to0-ai.com/',
  agentid: '1000002'
};

export {
  systemTitle,
  wxCorpId,
  wxSecret,
  wxAccessTokenUrl,
  wxConf
}