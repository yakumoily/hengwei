import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Carousel, CarouselItem, Pagination, Message } from 'element-ui'
import '@/assets/reset.css'
import '@/mock/mock.js'
Vue.component(Carousel.name, Carousel)
Vue.component(CarouselItem.name, CarouselItem)
Vue.component(Pagination.name, Pagination)
Vue.prototype.$message = Message
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
