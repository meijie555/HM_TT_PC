import axios from 'axios'
import local from '../utils/local'
// 配置axios  baseurl  作用：设置基准地址 （前面相同的一段地址）
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

// 配置请求头
if (local.getUser()) {
  axios.defaults.headers.Authorization = `Bearer ${local.getUser().token}`
}
export default axios
