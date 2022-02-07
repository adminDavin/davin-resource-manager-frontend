import { loginApi, getInfoApi, loginOutApi } from '@/api/user'
import { ActionContext } from 'vuex'

export interface userState {
  token: string,
  info: object,
  authorization: string
  tokenInfo: any,
  tenantId: number,
  userId: number
}
const state = (): userState => ({
  token: '', // 登录token
  info: {},  // 用户信息
  authorization: '',
  tokenInfo: {},
  tenantId: 3,
  userId: 1
})

// getters
const getters = {
  token(state: userState) {
    return state.authorization
  }
}

// mutations
const mutations = {
  tokenChange(state: userState, token: any) {
    console.log(`${token['token_type']} ${token['access_token']}`);
    state.tokenInfo = token
    state.authorization = `${token['token_type']} ${token['access_token']}`
    state.token = token['access_token']
    state.tenantId = token['tenantId']
    state.userId = token['userId']
  },
  infoChange(state: userState, info: object) {
    state.info = info
  }
}

// actions
const actions = {
  // login by login.vue
  login({ commit, dispatch }: ActionContext<userState, userState>, params: any) {
    return new Promise((resolve, reject) => {
      loginApi(params)
        .then(res => {
          commit('tokenChange', res);
          let p = { tenantId: res['tenantId'], userId: res['userId'] };
          dispatch('getInfo', { content: p })
            .then(infoRes => {
              resolve(res)
            })
        }).catch(err => {
          reject(err)
        })
    })
  },
  // get user info after user logined
  getInfo({ commit }: ActionContext<userState, userState>, params: any) {
    return new Promise((resolve, reject) => {
      getInfoApi(params)
        .then(res => {
          commit('infoChange', res.data)
          resolve(res.data)
        })
    })
  },

  // login out the system after user click the loginOut button
  loginOut({ commit }: ActionContext<userState, userState>) {
    loginOutApi()
      .then(res => {

      })
      .catch(error => {

      })
      .finally(() => {
        localStorage.removeItem('tabs')
        localStorage.removeItem('vuex')
        sessionStorage.removeItem('vuex')
        location.reload()
      })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
