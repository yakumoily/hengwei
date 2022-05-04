<template>
  <div id="app">
    <Header></Header>
    <TypeNav></TypeNav>
    <router-view></router-view>
    <Footer v-if="isFooterShow"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue'
import Footer from '@/components/Footer/Footer.vue'
import TypeNav from '@/components/TypeNav/TypeNav.vue'
import { mapActions } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      isFooterShow: true
    }
  },
  components: {
    Header,
    TypeNav,
    Footer
  },
  methods: {
    // 创建getCategroyList方法 获取三级列表数据存于TypeNav仓库中
    ...mapActions('TypeNav', ['getCategroyList']),
    // 请求banner 数据
    ...mapActions('Home', ['getBannerLst'])
  },
  watch: {
    '$route.name': {
      handler (newVal) {
        if (newVal === 'home' || newVal === 'search') {
          this.isFooterShow = true
        } else {
          this.isFooterShow = false
        }
      }
    }
  },
  created () {
    this.getCategroyList()
    this.getBannerLst()
  }
}
</script>

<style>
</style>
