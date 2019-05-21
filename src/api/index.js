import Vue from 'vue'

var api = {
  signin: "/signin", // 登录接口
}

Vue.prototype.$api = api;

export default api