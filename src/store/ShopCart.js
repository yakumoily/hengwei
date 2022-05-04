import { reqShopCartList } from '@/api'
const state = {
  cartList: []
}
const actions = {
  async getShopCartList ({ commit }) {
    const res = await reqShopCartList()
    console.log(res)
    commit('GET_SHOPCARTLIST', res.data[0].cartInfoList)
  }
}
const mutations = {
  GET_SHOPCARTLIST (state, val) {
    state.cartList = val
  }
}
const getters = {

}
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
