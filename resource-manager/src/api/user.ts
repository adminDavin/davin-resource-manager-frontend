import request from '@/utils/system/request'

/** 登录api */
export function loginApi(data: any) {
  console.log(data);
  return request({
    url: `/oauth/token?grant_type=password&username=${data.name}&password=${data.password}&client_id=oauth2-client&client_secret=oauth2-secret-8888`,
    method: 'post',
    baseURL: '/api',
    data
  })
}

/** 获取用户信息Api */
export function getInfoApi(data: object) {
  return request({
    url: '/authorizer/info',
    method: 'post',
    baseURL: '/api',
    headers: {"userId": 'sdff'},
    data
  })
}

/** 退出登录Api */
export function loginOutApi() {
  return request({
    url: '/user/out',
    method: 'post',
    baseURL: '/mock'
  })
}

/** 获取用户信息Api */
export function passwordChange(data: object) {
  return request({
    url: '/user/passwordChange',
    method: 'post',
    baseURL: '/mock',
    data
  })
}

/** 获取登录后需要展示的菜单 */
export function getMenuApi() {
  return request({
    url: '/menu/list',
    method: 'post',
    baseURL: '/mock'
  })
}