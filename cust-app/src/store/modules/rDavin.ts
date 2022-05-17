import request from '@/utils/system/request';
import { ActionContext } from 'vuex';

export interface rDavin {
  token: string,
  info: object,
  authorization: string
  tokenInfo: any,
  tenantId: number,
  userId: number
}
const state = (): rDavin => ({
  token: '', // 登录token
  info: {},  // 用户信息
  authorization: '',
  tokenInfo: {},
  tenantId: 3,
  userId: 1
})

// mutations
const mutations = {
  tokenChange(state: rDavin, token: any) {
    console.log(`${token['token_type']} ${token['access_token']}`);
    state.tokenInfo = token
    state.authorization = `${token['token_type']} ${token['access_token']}`
    state.token = token['access_token']
    state.tenantId = token['tenantId']
    state.userId = token['userId']
    localStorage.setItem('tenantId', token['tenantId']);
    localStorage.setItem('userId', token['userId']);
  },
  infoChange(state: rDavin, info: object) {
    state.info = info
  }
}

// actions
const actions = {
  // login by login.vue
  login({ commit }: ActionContext<rDavin, rDavin>, data: any) {
    return new Promise((resolve, reject) => {
      request({
        url: `/oauth/token?grant_type=password&username=${data.name}&password=${data.password}&client_id=oauth2-client&client_secret=oauth2-secret-8888&scope=all`,
        method: 'post',
        baseURL: '/api/davin/uaa',
        data
      }).then(res => {
          commit('tokenChange', res);
        }).catch(err => {
          reject(err)
        })
    })
  }
}

export default {
  namespaced: true,
  rDavinState: state,
  actions: actions,
  mutations: mutations
}
