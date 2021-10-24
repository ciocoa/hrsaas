import request from '@/utils/request'

/**
 * 请求组织架构
 * @returns
 */
export const getDepartments = () =>
  request({
    url: '/company/department'
  })

/**
 * 删除部门
 * @param {String} id 删除的部门的ID
 * @returns
 */
export const delDepartments = id =>
  request({
    url: `/company/department/${id}`,
    method: 'delete'
  })

/**
 * 新增部门
 * @param {Object} data 新增部门的数据
 * @returns
 */
export const addDepartments = data =>
  request({
    url: '/company/department',
    method: 'post',
    data
  })

/**
 * 获取部门详情
 * @param {String} id 查询的部门的ID
 * @returns
 */
export const getDepartDetail = id =>
  request({
    url: `/company/department/${id}`
  })

/**
 * 编辑部门
 * @param {Object} data 部门的详细数据
 * @returns
 */
export const updateDepartments = data =>
  request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
