/** 
 * 数据管理
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    permissionData: [],
    levelOfPermissions: [],
    theSecondaryPermissions: {}
  },
  mutations: {
    GETPERMISSIONDATA(state,data){
      state.permissionData = data;
    },
    GETLEVELOFPERMISSIONS(state,data){
      state.levelOfPermissions = data;
    },
    GETTHESECONDARYPERMISSIONS(state,data){
      state.theSecondaryPermissions = data;
    }
  },
  actions: {
    getPermissionData({commit},data){
      commit('GETPERMISSIONDATA',data);
    },
    getLevelOfPermissions({commit},data){
      commit('GETLEVELOFPERMISSIONS',data);
    },
    getTheSecondaryPermissions({commit},data){
      commit('GETTHESECONDARYPERMISSIONS',data);
    }
  }
})