import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
const orginPush = VueRouter.prototype.push
const orginReplace = VueRouter.prototype.replace
// 重写router.push 方法
VueRouter.prototype.push = function name (options, resolve, reject) {
  if (resolve && reject) {
    orginPush.call(this, options, resolve, reject)
  } else {
    orginPush.call(this, options, () => {}, () => {})
  }
}
// 重写router.replce 方法
VueRouter.prototype.replace = function name (options, resolve, reject) {
  if (resolve && reject) {
    orginReplace.call(this, options, resolve, reject)
  } else {
    orginReplace.call(this, options, () => {}, () => {})
  }
}
Vue.use(VueRouter)

const routes = [
  // home路由
  {
    name: 'home',
    path: '/home',
    component: () => import('@/views/Home/Home.vue')
  },
  // 商品详情页
  {
    name: 'detail',
    path: '/detail/:skuId',
    component: () => import('@/views/Detail/Detail.vue')
  },
  // 搜索路由
  {
    name: 'search',
    path: '/search',
    component: () => import('@/views/Search/Search.vue')
  },
  // 登录页面
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/Login/index.vue')
  },
  // 添加到购物车页面
  {
    name: 'addShopCart',
    path: '/addShopCart',
    component: () => import('@/views/addShopCart/index.vue')
  },
  // 注册页面
  {
    name: 'register',
    path: '/register',
    component: () => import('@/views/Register')
  },
  // 去购物车页面
  {
    name: 'shopCart',
    path: '/shopCart',
    component: () => import('@/views/ShopCart')
  },
  // 支付
  {
    name: 'pay',
    path: '/pay',
    component: () => import('@/views/Pay')
  },
  {
    name: 'trade',
    path: '/trade',
    component: () => import('@/views/Trade')
  },
  // 重定向 home页面
  {
    path: '/',
    redirect: '/home'
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
router.beforeEach((to, from, next) => {
  if (localStorage.getItem('TOKEN')) {
    store.dispatch('Login/getUserInfo')
  }
  next()
})
export default router
