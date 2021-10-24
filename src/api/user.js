import request from '@/utils/request'

/**
 * 请求登录
 * @param {Object} data 登录的请求体
 * @returns
 */
export const loginReq = data =>
  request({
    url: '/sys/login',
    method: 'post',
    data
  })

/**
 * 请求用户信息
 * @returns
 */
export const getUserInfo = () =>
  request({
    url: '/sys/profile',
    method: 'post'
  })

/**
 * 请求用户头像
 * @param {String} id 需要获取头像的用户ID
 * @returns
 */
export const getUserDetailById = id =>
  request({
    url: `/sys/user/${id}`
    // params: { id: id }
  })
