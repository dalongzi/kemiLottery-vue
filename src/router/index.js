/** 
 * 路由器
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path:'/',
      meta: {
        showcommon: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: ()=>import(/* webpackChunkName: 'login' */ '@/pages/Login/Login.vue')
    },
    {
      path: '/RoleManage',
      name: 'RoleManage',
      component: ()=>import(/* webpackChunkName: 'role' */ '@/pages/Role/Role.vue'),
      meta: {
        showcommon: true
      }
    },
    {
      path: '/accountManager',
      name: 'accountManager',
      component: ()=>import(/* webpackChunkName: 'role' */ '@/pages/User/User.vue'),
      meta: {
        showcommon: true
      }
    },
    {
      path: '/PermissionManage',
      name: 'PermissionManage',
      component: ()=>import(/* webpackChunkName: 'role' */ '@/pages/Jurisdiction/Jurisdiction.vue'),
      meta: {
        showcommon: true
      }
    },
    {
      path: '/LotteryList',
      name: 'LotteryList',
      component: ()=>import(/* webpackChunkName: 'role' */ '@/pages/LotteryList/LotteryList.vue'),
      meta: {
        showcommon: true
      }
    }
  ]
})