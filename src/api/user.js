import request from '@/utils/request'

/**
 * 请求登录
 * @param {*} data 请求体
 * @returns
 */
export const loginReq = data =>
  request({
    url: '/sys/login',
    data
  })
/**
 * 请求用户信息
 * @returns Promise
 */
export const getUserInfo = () =>
  request({
    url: '/sys/profile'
  })
/**
 * 请求用户头像
 * @param {number} id 用户ID
 */
export const getUserDetailById = id => {
  request({
    url: `/sys/user/${id}`
  })
}
