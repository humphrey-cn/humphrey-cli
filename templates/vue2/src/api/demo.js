
import axiosInstance from 'utils/axiosInstance'

// // 地址路径以 /api 开头，配置了代理，在上线时，需要配置 NG
export const login = async (data) => {
  return axiosInstance.post('/api/admin/admin/login', data)
}
