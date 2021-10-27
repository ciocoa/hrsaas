import request from '@/utils/request'
/**
 * 获取公司信息
 * @param {Number} id 公司ID
 */
export const getCompanyInfo = id => request({ url: `/company/${id}` })
/**
 * 获取角色列表
 * @param {Object} param 分页信息
 */
export const getRoleList = param => request({ url: '/sys/role', param })
/**
 * 获取角色详情
 * @param {Number} id 角色ID
 */
export const getRoleDetail = id => request({ url: `/sys/role/${id}` })
/**
 * 添加角色
 * @param {Object} data 角色数据
 */
export const addRole = data => request({ url: '/sys/role', method: 'POST', data })
/**
 * 更新角色
 * @param {Object} data 角色数据
 */
export const updateRole = data => request({ url: `/sys/role/${data.id}`, method: 'PUT', data })
/**
 * 删除角色
 * @param {Number} id 角色ID
 */
export const deleteRole = id => request({ url: `/sys/role/${id}`, method: 'DELETE' })
