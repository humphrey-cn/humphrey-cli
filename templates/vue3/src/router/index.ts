/*
 * @Author: Humphrey humphre_ch@163.com
 * @Date: 2023-01-29 11:18:35
 * @LastEditors: Humphrey humphrey_cn@163.com
 * @LastEditTime: 2023-02-02 09:43:40
 * @Description: 路由配置
 */
import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/demo', // 示例
    name: 'demo',
    component: async () =>
      await import(/* webpackChunkName: "demo" */ '../views/demo/index.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: async () =>
      await import(/* webpackChunkName: "home" */ '../views/home/index.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(), // 路由模式 createWebHistory() history模式，需要后台配置
  routes, // 路由规则
})

export default router
