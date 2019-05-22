/** 
 * 数据管理
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    permissionData: {}
  },
  mutations: {
    GETPERMISSIONDATA(state,data){
      state.permissionData = data;
    }
  },
  actions: {
    getPermissionData({commit},data){
      commit('GETPERMISSIONDATA',data);
    }
  }
})