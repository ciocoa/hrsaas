import store from '@/store'
import axios from 'axios'
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'
import { getToken, setToken } from '@/utils/auth'

let requestData
let loadingE

const service = axios.create()
// 请求拦截
service.interceptors.request.use(
  request => {
    // console.log('request', request)
    // token配置
    request.headers['AUTHORIZE_TOKEN'] = getToken()
    /* 下载文件*/
    if (request.isDownLoadFile) {
      request.responseType = 'blob'
    }
    if (request.isUploadFile) {
      request.headers['Content-Type'] = 'multipart/form-data'
    }
    requestData = request
    if (request.bfLoading) {
      loadingE = ElLoading.service({
        lock: true,
        text: '数据载入中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.1)'
      })
    }
    /*
     *params会拼接到url上
     * */
    if (request.isParams) {
      request.params = request.data
      request.data = {}
    }
    return request
  },
  err => {
    Promise.reject(err)
  }
)
// 响应拦截
service.interceptors.response.use(
  res => {
    if (requestData.afHLoading && loadingE) {
      loadingE.close()
    }
    // 如果是下载文件直接返回
    if (requestData.isDownLoadFile) {
      return res.data
    }
    const { success, message, data } = res.data

    if (success) {
      return data
    } else {
      ElMessage({
        message,
        type: 'error',
        duration: 2 * 1000
      })
      return Promise.reject(new Error(message))
    }
  },
  err => {
    if (loadingE) loadingE.close()
    ElMessage({
      message: err,
      type: 'error',
      duration: 2 * 1000
    })
    return Promise.reject(err)
  }
)

export default function khReqMethod({
  url,
  data,
  method,
  isParams,
  bfLoading,
  afHLoading,
  isUploadFile,
  isDownLoadFile,
  baseURL,
  timeout,
  isAlertErrorMsg
}) {
  return service({
    url: url,
    method: method ?? 'post',
    data: data ?? {},
    isParams: isParams ?? false,
    bfLoading: bfLoading ?? true,
    afHLoading: afHLoading ?? true,
    isUploadFile: isUploadFile ?? false,
    isDownLoadFile: isDownLoadFile ?? false,
    isAlertErrorMsg: isAlertErrorMsg ?? true,
    baseURL: baseURL ?? import.meta.env.VITE_APP_BASE_URL, // 设置基本基础url
    timeout: timeout ?? 5000 // 配置默认超时时间
  })
}
