
import { reqBannerList } from '@/api'
const state = {
  bannerList: []
}
const getters = {
}
const mutations = {
  GET_BANNERLIST (state, val) {
    state.bannerList = val
  }
}
const actions = {
  // 获取banner存与仓库
  async getBannerLst ({ commit }) {
    const res = await reqBannerList()
    if (res.code === 200) {
      commit('GET_BANNERLIST', res.data)
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
