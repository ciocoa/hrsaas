import request from '@/utils/request'

/**
 * 请求组织架构
 * @returns
 */
export const getDepartments = () =>
  request({
    url: '/company/department',
    method: 'GET'
  })
