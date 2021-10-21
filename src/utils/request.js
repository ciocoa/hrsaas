import axios from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
import { getTimeStamp } from '@/utils/auth'
import store from '@/store'
import router from '@/router'

let loadingE
const timeout = 5000
const currentTime = Date.now()
const timeStamp = getTimeStamp()
const IsCheckTimeOut = () => (currentTime - timeStamp) / 1000 > timeout

const service = axios.create()
// 请求拦截
service.interceptors.request.use(
  req => {
    if (store.getters.token) {
      if (IsCheckTimeOut()) {
        store.dispatch('user/logout')
        router.push(`/login`)
        return Promise.reject(new Error('令牌已失效'))
      }
      req.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    // 请求数据 tips
    if (req.bfLoading) {
      loadingE = ElLoading.service({
        lock: true,
        text: '数据载入中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.1)'
      })
    }
    // params会拼接到url上
    if (req.isParams) {
      req.params = req.data
      req.data = {}
    }
    return req
  },
  err => Promise.reject(err)
)
// 响应拦截
service.interceptors.response.use(
  res => {
    if (loadingE) loadingE.close()
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
    if (loadingE) loadingE.close()
    if (err.response && err.response.data && err.response.data.code === 10002) {
      await store.dispatch('user/logout')
      router.push('/login')
    }
    ElMessage({
      message: err,
      type: 'error',
      duration: 2 * 1000
    })
    return Promise.reject(err)
  }
)

export default ({ url, data, method, isParams, bfLoading, isAlertErrorMsg, baseURL }) =>
  service({
    url: url,
    data: data ?? {},
    method: method ?? 'POST',
    isParams: isParams ?? false,
    bfLoading: bfLoading ?? false,
    isAlertErrorMsg: isAlertErrorMsg ?? true,
    baseURL: baseURL ?? import.meta.env.VITE_APP_BASE_URL
  })
