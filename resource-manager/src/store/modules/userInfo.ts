import { ActionContext } from 'vuex'

export interface userState {
  token: string,
  info: object,
  authorization: string
  tokenInfo: any,
}
const state = (): userState => ({
  token: '', // 登录token
  info: {},  // 用户信息
  authorization: '',
  tokenInfo: {},
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
    state.tokenInfo = token
    state.authorization = `${token['token_type']} ${token['access_token']}`
    state.token = token['access_token']
  },
  infoChange(state: userState, res: any) {
    sessionStorage.setItem("userId", res.id);
    sessionStorage.setItem("identifyId", res.identifyId);
    sessionStorage.setItem("tenantId", res.tenantId);
    sessionStorage.setItem("token", res.id);
    state.info = res
  }
}

// actions
const actions = {
  storeUserInfo({ commit }: ActionContext<userState, userState>, params: any) {
    return new Promise((resolve, reject) => {
      commit('infoChange', params)
    })
  },
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
