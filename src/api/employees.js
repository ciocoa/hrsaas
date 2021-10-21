import request from '@/utils/request'

/**
 * 请求简单员工列表
 * @returns
 */
export const getEmployeeSimple = () =>
  request({
    url: '/sys/user/simple',
    method: 'GET'
  })
