/*
 * @Author: Humphrey humphre_ch@163.com
 * @Date: 2023-01-29 10:31:37
 * @LastEditors: Humphrey humphrey_cn@163.com
 * @LastEditTime: 2023-02-02 10:03:33
 * @Description: 入口文件
 */
import { createApp } from 'vue'
import './assets/styles/index.less' // 引入基础样式
import App from './App.vue'
import router from './router' // 路由
import { store, key } from './store' // 状态管理
import componentsGlobal from './components-global/index' // 全局公共组件

const app: any = createApp(App)

componentsGlobal(app)

app.use(router).use(store, key).mount('#app')
