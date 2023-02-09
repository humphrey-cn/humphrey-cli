/*
 * @Author: Humphrey humphrey_cn@163.com
 * @Date: 2022-12-16 16:55:56
 * @LastEditors: Humphrey humphrey_cn@163.com
 * @LastEditTime: 2023-02-09 10:02:56
 * @Description:
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import apiFn from './api/index.js'
import store from './store'
import componentsGlobalFn from './components-global/index.js'
import '@/styles/index.less'

componentsGlobalFn(Vue) // 全局公共组件
apiFn(Vue) // 接口

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
