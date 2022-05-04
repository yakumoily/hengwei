// 获取商品详情，和添加到购物车请求
import { reqGoodsInfo, reqChangeGoodsNum } from '@/api'
const state = {
  goodsInfo: {}
}
const getters = {
  skuInfo (state) {
    return state.goodsInfo.skuInfo || {}
  },
  spuSaleAttrList (state) {
    return state.goodsInfo.spuSaleAttrList
  }
}
const mutations = {
  GET_GOODSINFO (state, val) {
    state.goodsInfo = val
  }
}
const actions = {
  async getGoodsInfo ({ commit }, skuId) {
    const res = await reqGoodsInfo(skuId)
    if (res.code === 200) {
      commit('GET_GOODSINFO', res.data)
    }
  },
  // 返回添加购物车状态
  async getChangeGoodsNum ({ commit }, { skuId, skuNum }) {
    const res = await reqChangeGoodsNum(skuId, skuNum)
    if (res.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(res.message)
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
