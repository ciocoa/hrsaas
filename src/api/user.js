import request from '@/utils/request'

/**
 * 请求登录
 * @param {*} data 请求体
 * @returns
 */
export const loginReq = data =>
  request({
    url: '/sys/login',
    method: 'POST',
    data
  })
