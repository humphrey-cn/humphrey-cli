import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/home' },
    {
        path: '/login',
        name: 'LoginView', // 登录页面
        component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
    },
    {
        path: '/home',
        name: 'HomeView', // 首页
        component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue')
    },
]

const router = new VueRouter({
    routes,
})

const whiteList = ['/login'] //白名单

router.beforeEach((to, from, next) => {
    const hasToken = localStorage.getItem('finite-management-token');
    // 确定用户是否已经登录
    if (whiteList.includes(to.path)) {
        to.path === '/login' && localStorage.removeItem('finite-management-token')
        next()
    } else {
        hasToken ? next() : next('/login')
    }
})

export default router
