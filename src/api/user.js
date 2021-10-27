import request from '@/utils/request'
/**
 * 请求登录
 * @param {Object} data 登录数据
 */
export const loginReq = data => request({ url: '/sys/login', method: 'POST', data })
/**
 * 获取用户信息
 */
export const getUserInfo = () => request({ url: '/sys/profile', method: 'POST' })
/**
 * 获取用户头像
 * @param {Number} id 用户ID
 */
export const getUserDetailById = id => request({ url: `/sys/user/${id}` })
