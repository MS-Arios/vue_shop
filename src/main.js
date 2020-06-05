import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./plugins/element.js"
import axios from "axios"
// 导入字体图标
import "./assets/fonts/iconfont.css"

// 导入全局样式表
import "./assets/css/global.css"


Vue.config.productionTip = false

// 配置请求的根路径
axios.defaults.baseURL ="http://127.0.0.1:8888/api/private/v1/"
axios.interceptors.request.use(config => {
  // console.log(config)
  // 在最后必须return config
  config.headers.Authorization = window.sessionStorage.getItem("token")
  return config
})
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
