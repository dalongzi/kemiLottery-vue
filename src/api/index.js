import Vue from 'vue'

var api = {
  signin: "/signin", // 登录接口
  showAllPermission: "/system/permission/showAllPermission",  // 查询所有权限
}

Vue.prototype.$api = api;

export default api