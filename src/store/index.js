import Vue from 'vue'
import Vuex from 'vuex'
import TypeNav from '@/store/TypeNav.js'
import Home from '@/store/Home.js'
import Search from '@/store/Search.js'
import Detail from '@/store/Detail.js'
import Login from '@/store/Login.js'
import ShopCart from '@/store/ShopCart'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    TypeNav,
    Home,
    Search,
    Detail,
    Login,
    ShopCart
  }
})
