import { ActionContext } from 'vuex'

export interface userState {
  token: string,
  info: any,
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
  userInfoChange(state: userState, res: any) {
    sessionStorage.setItem("userId", res.id);
    sessionStorage.setItem("identifyId", res.identifyId);
    sessionStorage.setItem("tenantId", res.tenantId);
    sessionStorage.setItem("token", res.id);
    state.info = res
  },
  loginOutChange(state: userState, res: any) {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("identifyId");
    sessionStorage.removeItem("tenantId");
    sessionStorage.removeItem("token");
    state.info = null;
  }
}

// actions
const actions = {
  storeUserInfo({ commit }: ActionContext<userState, userState>, params: any) {
    return new Promise((resolve, reject) => {
      commit('userInfoChange', params)
    })
  },
  loginOut({ commit }: ActionContext<userState, userState>, params: any) {
    return new Promise((resolve, reject) => {
      commit('loginOutChange', params)
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
