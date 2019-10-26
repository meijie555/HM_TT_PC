import axios from 'axios'
// 配置axios  baseurl  作用：设置基准地址 （前面相同的一段地址）
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

export default axios
