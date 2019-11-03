import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'
import axios from '@/api'
import '@/styles/index.less'
// import myBreadcrumb   23 from '@/components/my_Breadcrumb'
import plugin from '@/components/index'

Vue.prototype.$axios = axios
// Vue.component('my-Breadcrumb', myBreadcrumb)
Vue.use(plugin)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
