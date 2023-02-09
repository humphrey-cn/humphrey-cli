/*
 * @Author: Humphrey humphrey_cn@163.com
 * @Date: 2023-02-06 13:22:53
 * @LastEditors: Humphrey humphrey_cn@163.com
 * @LastEditTime: 2023-02-06 13:29:44
 * @Description: 公共组件统一引入
 */
// 页面直接使用 名称-global，
// 例： header
// 页面中直接使用 <header-global />
export default Vue => {
  const files = require.context('./', true, /\.vue$/)
  files.keys().forEach(key => {
    const name = key.replace(/\.|\/|index.vue/g, '')
    Vue.component(`${name}-global`, files(key).default || files(key))
  })
}
