const systemTitle = 'message.system.title' // 系统名称，用于显示在左上角模块，以及浏览器标题上使用,使用配置项

const wxConf = {
  corpid: "ww532800ca7953106e",
  agentid: '1000088',
  redirectUri: 'https://www.to0-ai.com/davin/',
  codeScanningLoginUrl: "https://open.work.weixin.qq.com/wwopen/sso/qrConnect",
  authorizedLoginUrl: "https://open.weixin.qq.com/connect/oauth2/authorize"
};

const dResCloud = "https://www.to0-ai.com/d_res";

const publicKey = `
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAybhjHZ8h4wwmC8KwQvrW
nbhcX26jp+KQdFnfOaRXpTJQeVshkIJ32mEoF0dI9xQlTmACy9payQHhCp41QTav
t83jsiEPlavngJkWZbwKaUuXFdNA7Jjw04+uDyI7FsBkGcNN2KIFa8WTiqpGV4GJ
zwMViTpZY3zQAKWoKLThr1zB0LvHHOmJySBiQYbYn8YtH/HKzVowunJQJJoWF7RA
unob6EjsbrqIRjaaxDMKFuZxv9euC1ViLPeXlR9XF1yEdk/r8+bazEOik4hzb/55
SYWSyCrE/hGvknF0Drp41Z+/+SyjEvokUxoAQg7kLlcJboY4wdvDtJBROxQ7XORz
+wIDAQAB`;

export {
  systemTitle,
  dResCloud,
  publicKey,
  wxConf
}