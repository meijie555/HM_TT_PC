import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'
import local from '@/utils/local'
import Article from '@/views/article'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '*',
    component: NotFound
  }, {
    path: '/login',
    component: Login
  }, {
    path: '/',
    component: Home,
    // 二级路由
    children: [{
      path: '/',
      component: Welcome
    }, {
      path: '/article',
      component: Article
    }, {
      path: '/image',
      component: null
    }, {
      path: '/publish',
      component: null
    }, {
      path: '/comment',
      component: null
    }, {
      path: '/fans',
      component: null
    }, {
      path: '/setting',
      component: null
    }]
  }]
})

router.beforeEach((to, from, next) => {
  // 判断是否登录 如果不是登录页面，并且没有登录信息（token）， 跳转登录页面
  // 其他一律放行
  const user = local.getUser()
  if (to.path !== '/login' && !user) return next('/login')
  next()
})

export default router
