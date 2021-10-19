import request from '@/utils/request'

/**
 * 请求组织架构
 */
export const getDepartments = () =>
  request({
    url: '/company/department',
    method: 'GET'
  })

/***
 * 删除部门
 */
export const delDepartments = id => {
  request({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
}

/**
 * 新增部门
 */
export const addDepartments = data => {
  request({
    url: '/company/department',
    data
  })
}
