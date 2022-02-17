const showLogo: Boolean = true; // 是否显示Logo顶部模块
const systemTitle = 'message.system.title' // 系统名称，用于显示在左上角模块，以及浏览器标题上使用,使用配置项

const wxConf = {
  corpid: "ww532800ca7953106e",
  agentid: '1000088',
  redirectUri: 'https://www.to0-ai.com/davin/',
  codeScanningLoginUrl: "https://open.work.weixin.qq.com/wwopen/sso/qrConnect",
  authorizedLoginUrl: "https://open.weixin.qq.com/connect/oauth2/authorize"
};

const officeOnlineShow = 'https://view.officeapps.live.com/op/view.aspx?src=';
const previewUrl = 'https://to0-ai.com/api/res_m/res_info/preview';

export {
  systemTitle,
  officeOnlineShow,
  previewUrl,
  wxConf
}