import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home/Home.vue'
import BeeSilver from '@/views/BeeSilver/BeeSilver.vue'
import MyNFT from '@/views/MyNFT/MyNFT.vue'
import BeePurple from '@/views/BeePurple/BeePurple.vue'
Vue.use(Router)

const router = new Router({
  mode: 'history', // 配置路由模式
  base: __dirname, // 配置应用根路径
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [
    {
      name: 'index',
      path: '/index',
      component: Home
    },
     {
      name: 'BeeSilver',
      path: '/beeSilver',
      component: BeeSilver
    }, {
      name: 'MyNFT',
      path: '/myNFT',
      component: MyNFT
    },{
      name: 'BeePurple',
      path: '/beePurple',
      component: BeePurple
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
})
export default router
