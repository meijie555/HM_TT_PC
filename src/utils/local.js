const KEY = 'hm-toutiao-pc'
const local = {
  setUser (user) {
    // 存储token
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
  },
  getUser () {
    // 获取
    return JSON.parse(window.sessionStorage.getItem(KEY))
  },
  delUser () {
    // 删除
    window.sessionStorage.removeItem(KEY)
  }
}

export default local
