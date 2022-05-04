// 获取三级列表存与仓库
import { reqCategoryList } from '@/api'
const state = {
  categoryList: []
}
const getters = {
}
const mutations = {
  GET_CATEGROYLIST (state, val) {
    state.categoryList = val
  }
}
const actions = {
  async getCategroyList ({ commit }) {
    const res = await reqCategoryList()
    if (res.code === 200) {
      commit('GET_CATEGROYLIST', res.data)
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
