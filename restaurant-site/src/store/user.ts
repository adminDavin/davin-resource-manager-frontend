import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'user', // id必填，且需要唯一
  state: () => {
    return {
      name: '张三',
      age: 18,
      gender: '男',
      token: ""
    }
  },
  actions: {
    updateName(name: string) {
      this.name = name
    },
    async login(account: string, pwd: string) {
      // const { data } = await api.login(account, pwd)
      // return data
      this.updateName(account + "sss");
      return { "username": account }
    }
  },
  getters: {
    fullName: (state) => {
      return state.name + '丰'
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'my_user',
        storage: localStorage,
        paths: ['name', 'age']
      }
    ]
  }
});

