
import { reqUserLogin, userTokenInfor } from '@/api'
const state = {
  userInfo: {},
  token: localStorage.getItem('TOKEN')
}
const getters = {
}
const mutations = {
  USERINFO (state, val) {
    state.userInfo = val
  }
}
const actions = {
  async getLoginInfor ({ commit }, params) {
    const res = await reqUserLogin(params)
    if (res.code === 200) {
      localStorage.setItem('TOKEN', res.data.token)
      return 'ok'
    } else {
      return Promise.reject(res.message)
    }
  },
  async getUserInfo (context) {
    const res = await userTokenInfor()
    if (res.code === 200) {
      context.commit('USERINFO', res.data)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
