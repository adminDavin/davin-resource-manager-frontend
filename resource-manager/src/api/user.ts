import request from '@/utils/system/request'

/** 登录api */
export function loginApi(data: any) {
  return request({
    url: `/oauth/token?grant_type=password&username=${data.name}&password=${data.password}&client_id=oauth2-client&client_secret=oauth2-secret-8888&scope=all`,
    method: 'post',
    baseURL: '/api/davin/uaa',
    data
  })
}

/** 获取用户信息Api */
export function getInfoApi(data: object) {
  return request({
    url: '/authorizer/info',
    method: 'post',
    baseURL: '/api/davin/uaa',
    headers: {"userId": 'sdff'},
    data
  })
}