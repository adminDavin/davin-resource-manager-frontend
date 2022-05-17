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

export default {
  login,
  listTenant, 
  getUserInfo
}