import request from '@/utils/request'

/**
 * 获取公司信息
 * @param {Number} id 公司ID
 * @returns
 */
export const getCompanyInfo = id =>
  request({
    url: `/company/${id}`,
    method: 'GET'
  })

/**
 * 获取角色列表
 * @param {Object} param 分页信息
 * @returns
 */
export const getRoleList = param =>
  request({
    url: '/sys/role',
    method: 'GET',
    param,
    bfLoading: true
  })

/**
 * 新增角色信息
 * @param {Object} data 角色信息数据
 * @returns
 */
export const addRole = data =>
  request({
    url: '/sys/role',
    data
  })

/**
 * 更新角色信息
 * @param {Object} data 角色信息数据
 * @returns
 */
export const updateRole = data =>
  request({
    url: `/sys/role/${data.id}`,
    method: 'PUT',
    data
  })

/**
 * 获取角色详情
 * @param {Number} id 角色ID
 * @returns
 */
export const getRoleDetail = id =>
  request({
    url: `/sys/role/${id}`,
    method: 'GET'
  })

/**
 * 删除角色
 * @param {Number} id 角色ID
 * @returns
 */
export const deleteRole = id =>
  request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
