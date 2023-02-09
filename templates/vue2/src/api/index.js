/*
 * @Author: Humphrey humphrey_cn@163.com
 * @Date: 2023-02-06 13:31:59
 * @LastEditors: Humphrey humphrey_cn@163.com
 * @LastEditTime: 2023-02-06 13:41:01
 * @Description: 接口请求全局化配置
 */
const files = require.context('./', false, /\.js$/)

let api = {}

files.keys().forEach(key => {
  if (['./index.js'].includes(key)) return
  const name = key.replace(/\.|\/|js/g, '')
  api[name] = files(key).default || files(key)
})

export default Vue => {
  console.log(Vue)
  Vue.prototype.$api = api
}
/*
自动引入 api 文件夹下的文件
文件名即接口调用名
文件内需有返回值
 例:
    有文件home.js 内有接口 getGoods
    页面内调用为
    this.$api.demo.login()
*/
