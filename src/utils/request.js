import axios from 'axios'
import { ElMessage } from 'element-plus'
import { getTimeStamp } from '@/utils/auth'
import store from '@/store'
import router from '@/router'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 10000
})

const TimeOut = 5400
const CheckTimeOut = () => (Date.now() - getTimeStamp()) / 1000 > TimeOut

service.interceptors.request.use(
  async req => {
    if (store.getters.token) {
      if (CheckTimeOut()) {
        await store.dispatch('user/logout')
        router.push(`/login`)
        return Promise.reject(new Error('令牌已失效'))
      }
      req.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return req
  },
  err => Promise.reject(err)
)

service.interceptors.response.use(
  res => {
    const { success, message, data } = res.data
    if (success) return data
    else {
      ElMessage({
        message,
        type: 'error',
        duration: 2 * 1000
      })
      return Promise.reject(new Error(message))
    }
  },
  async err => {
    if (err.response && err.response.data && err.response.data.code === 10002) {
      await store.dispatch('user/logout')
      router.push('/login')
    }
    ElMessage({
      message: err.message,
      type: 'error',
      duration: 2 * 1000
    })
    return Promise.reject(err)
  }
)

export default service
