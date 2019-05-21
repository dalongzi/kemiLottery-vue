/** 
* 入口JS
*/
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './utils/myaxios'
import './api'

// 引入reset-css
import 'reset-css'

// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

new Vue({
  router,
  el: "#app",
  render: h => h(App)
});