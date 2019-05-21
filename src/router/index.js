/** 
 * 路由器
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    
    {
      path: '/login',
      name: 'login',
      component: ()=>import(/* webpackChunkName: 'login' */ '@/pages/Login/Login.vue')
    }
  ]
})