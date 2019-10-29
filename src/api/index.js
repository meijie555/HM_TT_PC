import axios from 'axios'
import local from '../utils/local'
import router from '../router'
// 配置axios  baseurl  作用：设置基准地址 （前面相同的一段地址）
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

// 配置请求头
// if (local.getUser()) {
//   axios.defaults.headers.Authorization = `Bearer ${local.getUser().token}`
// }

// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 发送请求前做什么
  const user = local.getUser() || {}
  config.headers.Authorization = `Bearer ${user.token}`
  return config
}, function (error) {
  // 错误信息处理
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  // 发送请求前做什么
  return response
}, function (error) {
  // 错误信息处理
  if (error.response.status === 401) {
    return router.push('/login')
  }
  return Promise.reject(error)
})

export default axios
