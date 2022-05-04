// 引入axios.js 文件
import axios from '@/api/axios.js'
import mock from '@/api/mock.js'

// 请求三级列表
export const reqCategoryList = function () {
  return axios({ url: '/product/getBaseCategoryList', method: 'get' })
}
// 请求mock 数据
export const reqBannerList = function () {
  return mock({ url: '/banner', method: 'get' })
}
// 请求搜索商品数据
export const reqGoodsList = function (data) {
  return axios({ url: '/list', method: 'post', data })
}
// 请求商品详情数据
export const reqGoodsInfo = function (skuId) {
  return axios({ url: `item/${skuId}`, method: 'get' })
}
// 修改商品数量
export const reqChangeGoodsNum = function (skuId, skuNum) {
  return axios({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
}
// 用户注册
export const reqRegister = function (data) {
  return axios({ url: '/user/passport/register', method: 'post', data })
}
// 用户注册验证码
export const reqRegisterCode = function (phone) {
  return axios({ url: `/user/passport/sendCode/${phone}`, method: 'get' })
}
// 用户登录
export const reqUserLogin = function (data) {
  return axios({ url: '/user/passport/login', method: 'post', data })
}
// token校验用户登录信息
export const userTokenInfor = function () {
  return axios({ url: '/user/passport/auth/getUserInfo', method: 'get' })
}
// 去购物车列表信息
export const reqShopCartList = function () {
  return axios({ url: '/cart/cartList', method: 'get' })
}
// 删除购物车商品
export const reqDeleteGood = function (skuId) {
  return axios({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })
}
// 切换商品选中状态
export const reqChangeCheckdState = function (skuId, isChecked) {
  return axios({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })
}
// 退出登录
export const reqOutLogin = function () {
  return axios({ url: '/user/passport/logout', method: 'get' })
}
// 提交订单
export const reqTipTrade = function () {
  return axios({ url: '/order/auth/trade', method: 'get' })
}
