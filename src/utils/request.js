import { ElLoading, ElMessage } from 'element-plus'
import axios from 'axios'
import { getTimeStamp } from '@/utils/auth'
import store from '@/store'
import router from '@/router'

let reqData
let loadingE
let timeout = 3600
let currentTime = Date.now()
let timeStamp = getTimeStamp()
const IsCheckTimeOut = () => (currentTime - timeStamp) / 1000 > timeout

const service = axios.create()
// 请求拦截
service.interceptors.request.use(
  req => {
    // token配置
    if (store.getters.token) {
      if (IsCheckTimeOut()) {
        store.dispatch('user/logout')
        router.push(`/login`)
        return Promise.reject(new Error('令牌已失效'))
      }
      req.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    // 若是下载文件
    if (req.isDownLoadFile) req.responseType = 'blob'
    // 若是上传文件
    if (req.isUploadFile) req.headers['Content-Type'] = 'multipart/form-data'
    reqData = req
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
    if (reqData.afHLoading && loadingE) loadingE.close()
    // 如果是下载文件直接返回
    if (reqData.isDownLoadFile) return res.data
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

export default ({
  url,
  data,
  method,
  isParams,
  bfLoading,
  afHLoading,
  isUploadFile,
  isDownLoadFile,
  isAlertErrorMsg,
  baseURL
}) =>
  service({
    url: url,
    data: data ?? {},
    method: method ?? 'POST',
    isParams: isParams ?? false,
    bfLoading: bfLoading ?? true,
    afHLoading: afHLoading ?? true,
    isUploadFile: isUploadFile ?? false, // 是否上传文件
    isDownLoadFile: isDownLoadFile ?? false, // 是否下载文件
    isAlertErrorMsg: isAlertErrorMsg ?? true, // 是否弹出错误信息
    baseURL: baseURL ?? import.meta.env.VITE_APP_BASE_URL // 设置基本基础url
  })
