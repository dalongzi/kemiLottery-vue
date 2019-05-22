import Vue from 'vue'

var api = {
  signin: "/signin", // 登录接口
  showAllPermission: "/system/permission/showAllPermission",  // 查询所有权限
  findAllRoles: "/system/role/findAllRoles",  // 查询所有的角色
  addNewRole: "/system/role/addNewRole",  // 新增角色
  deleteRole: "/system/role/deleteRole",  // 删除角色
  updateRoleInfo: "/updateRoleInfo",  // 编辑角色
}

Vue.prototype.$api = api;

export default api