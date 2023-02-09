/*
 * @Author: Humphrey humphrey_cn@163.com
 * @Date: 2023-02-06 13:27:50
 * @LastEditors: Humphrey humphrey_cn@163.com
 * @LastEditTime: 2023-02-06 13:30:47
 * @Description: 示例话 Aioxs， 配置请求、响应拦截
 */

import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 3000,
})

// 请求拦截器
axiosInstance.interceptors.request.use(
  config => {
    return config
  },
  // 请求失败
  error => {
    return Promise.reject(error)
  },
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  response => {
    // 统一处理接口响应错误，比如 token 过期无效、服务端异常等
    return response.data.data
  },
  error => {
    return Promise.reject(error)
  },
)

export default axiosInstance
