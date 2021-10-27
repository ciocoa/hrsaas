import request from '@/utils/request'
/**
 * 获取部门列表
 */
export const getDepartments = () => request({ url: '/company/department' })
/**
 * 获取部门详情
 * @param {String} id 部门ID
 */
export const getDepartDetail = id => request({ url: `/company/department/${id}` })
/**
 * 添加部门
 * @param {Object} data 部门数据
 */
export const addDepartments = data => request({ url: '/company/department', method: 'POST', data })
/**
 * 更新部门
 * @param {Object} data 部门数据
 */
export const updateDepartments = data => request({ url: `/company/department/${data.id}`, method: 'PUT', data })
/**
 * 删除部门
 * @param {String} id 部门ID
 */
export const delDepartments = id => request({ url: `/company/department/${id}`, method: 'DELETE' })
