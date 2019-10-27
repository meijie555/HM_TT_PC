import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
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
      component: Welcome
    }, {
      path: '/image',
      component: Welcome
    }, {
      path: '/publish',
      component: Welcome
    }, {
      path: '/comment',
      component: Welcome
    }, {
      path: '/fans',
      component: Welcome
    }, {
      path: '/setting',
      component: Welcome
    }]
  }]
})

export default router
