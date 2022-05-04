import { reqGoodsList } from '@/api'
const state = {
  searchInfo: {}
}
const getters = {
  goodsList (state) {
    return state.searchInfo.goodsList
  },
  attrsList (state) {
    return state.searchInfo.attrsList
  },
  trademarkList (state) {
    return state.searchInfo.trademarkList
  }
}
const mutations = {
  GET_GOODSLIST (state, val) {
    state.searchInfo = val
  }
}
const actions = {
  // 获取banner存与仓库
  async getGoodsLst ({ commit }, params) {
    const res = await reqGoodsList(params)
    if (res.code === 200) {
      commit('GET_GOODSLIST', res.data)
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
