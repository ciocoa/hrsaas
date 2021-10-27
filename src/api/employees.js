import request from '@/utils/request'
/**
 * 获取简化员工列表
 */
export const getEmployeeSimple = () => request({ url: '/sys/user/simple' })
/**
 * 获取员工列表
 * @param {Object} params 分页信息
 */
export const getEmployeeList = params => request({ url: '/sys/user', params })
/**
 * 添加员工
 * @param {Object} data 员工数据
 * @returns
 */
export const addEmployee = data => request({ url: 'sys/user', method: 'POST', data })
/**
 * 删除员工
 * @param {Number} id 员工ID
 */
export const delEmployee = id => request({ url: `/sys/user/${id}`, method: 'DELETE' })
