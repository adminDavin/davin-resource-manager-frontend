import request from '@/utils/system/request';
import bu from '@/utils/browser_utils';

const cb = '/api/v1/';

const listTenant = (identifyId: number, callback: Function) => {
  let opt: object = bu.getOptions(`${cb}tenant`, `/list-by-identify?identifyId=${identifyId}`);
  request(opt).then((res: any) => callback(identifyId, res.data));
}

const login = (options: any, callback: Function) => {
  let opt: object = bu.postOptions(`${cb}user/auth`, `/login`, options);
  request(opt).then((res: any) => listTenant(res.data.id, callback));
}

const getUserInfo = (identifyId: number, tenantId: number, callback: Function) => {
  let opt: object = bu.getOptions(`${cb}user/info`, `/get-by-identify?identifyId=${identifyId}&tenantId=${tenantId}`);
  request(opt).then((res: any) => callback(res.data, callback));
}

const wecomLogin = (data: any, callback: Function) => {
  let url = '/token?grant_type=password&client_id=oauth2-client&client_secret=oauth2-secret-8888&scope=all'
  let purl = `${url}&username=${data.name}&password=${data.password}`
  let opt: object = bu.postOptions('/api/davin/uaa/oauth', purl, data);
  request(opt).then((res: any) => getUserInfoByUserId({ userId: res.userId, tenantId: res.tenantId }, callback));
}

const getUserInfoByUserId = (data: any, callback: Function) => {
  let content = { 'content': data };
  let opt: any = bu.postOptions('/api/davin/uaa', '/authorizer/info', content);
  request(opt).then((res: any) => callback(res));
}

export default {
  login,
  listTenant,
  wecomLogin,
  getUserInfo
}