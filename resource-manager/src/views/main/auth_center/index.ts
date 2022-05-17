
import { publicKey } from '@/config/index';
import md5 from 'js-md5';
import JSEncrypt from 'jsencrypt';
import { wxConf } from "@/config";

const wecomUrl = `${wxConf.codeScanningLoginUrl}?appid=${
  wxConf.corpid
}&agentid=${wxConf.agentid}&redirect_uri=${encodeURI(
  wxConf.redirectUri
)}&state=STATE`;
const autoWecomUrl = `${wxConf.authorizedLoginUrl}?appid=${
  wxConf.corpid
}&redirect_uri=${encodeURI(
  wxConf.redirectUri
)}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`;


const loginTypes = [
  {
    name: "企业微信登录",
    key: "wecom",
    type: "info",
    useCode: true,
    effect: "light",
    icon: "iconfont icon-qiyeweixin",
  },
  // {
  //   name: "微信登录",
  //   key: "wechat",
  //   type: "info",
  //   useCode: true,
  //   effect: "light",
  //   icon: "iconfont icon-wechat",
  // },
  {
    name: "账号登录",
    key: "account",
    type: "primary",
    useCode: false,
    effect: "light",
    icon: "iconfont icon-zhanghao",
  },
  // {
  //   name: "手机号码登录",
  //   key: "phone",
  //   type: "info",
  //   useCode: false,
  //   effect: "light",
  //   icon: "iconfont icon-shoujihaoma",
  // },
];

const isPhone = (loginType: any) => {
  for (let item of loginType) {
    if ("primary" == item.type && "phone" == item.key) {
      return true;
    }
  }
  return false;
};

// md5加密
const encryptorPassword = (password: string) => {
  let encryptor = new JSEncrypt();
  encryptor.setPublicKey(publicKey);
  return encryptor.encrypt(md5(password));
};

const getLoginType = (selectedLoginType: string, tempLoginType: any) => {
  let sLoginType: any = null;
  for (let item of tempLoginType) {
    item.type = selectedLoginType == item.key ? "primary" : "info";
    if (selectedLoginType == item.key) {
      sLoginType = item;
    }
  }
  return sLoginType;
}

export {
  wecomUrl,
  autoWecomUrl,
  loginTypes,
  isPhone,
  getLoginType,
  encryptorPassword
}