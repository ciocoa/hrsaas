import { constantRoutes } from '@/router'

/**
 * isSettingPermission: 是否设置了权限
 * routes: 过滤后的异步路由和静态路由集合
 * addRoutes: 过滤后的异步路由
 */
const state = {
  isSettingPermission: false,
  routes: [],
  addRoutes: []
}

const mutations = {
  M_routes: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  M_isSettingPermission: (state, data) => {
    state.isSettingPermission = data
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
