import router, { asyncRoutes } from '@/router'
import store from './store'
import settings from './settings'
import NProgress from 'nprogress'
NProgress.configure({ showSpinner: false })
import 'nprogress/css/nprogress.css'
import getPageTitle from '@/utils/getPageTitle'

// 不受权限控制的白名单
const whiteList = ['/login', '/404']
// 路由的前置守卫
router.beforeEach(async (to, from, next) => {
  // 开启进度条
  if (settings.isNeedNprogress) NProgress.start()
  // 设置页面标题
  document.title = getPageTitle(to.meta.title)

  /**
   * 正常流程如下：主要分为两点 token 和 role
   * 1.判断是否有token？ 有，如果去登录页则重定向到首页。没有，重定向到登录页
   * 2.判断是否权限筛选？是，直接放行。否，筛选动态路由后，添加动态路由然后放行
   */
  let token = ''
  if (settings.isNeedLogin) {
    token = store.getters.token
  } else {
    token = 'temp_token'
  }
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      let isPermission = store.state.permission.isSettingPermission
      if (isPermission) {
        next()
      } else {
        try {
          // 判断 vuex 中是否存在用户信息，不存在则获取用户信息
          if (!store.getters.userInfo.userId) await store.dispatch('user/getUserInfo')
          // 保存过滤后的路由到 vuex 中供菜单使用
          store.commit('permission/M_routes', asyncRoutes)
          store.commit('permission/M_isSettingPermission', true)
          asyncRoutes.forEach(route => router.addRoute(route))
          /**
           * ...to -- 路由加载完后再放行，防止白屏
           * replace: true -- 通知 VUE 本次操作后，不能通过浏览器后退按钮，返回前一个路由。等同于 vue3 中 addRoutes 被销毁了
           */
          next({ ...to, replace: true })
        } catch (err) {
          // await store.dispatch('user/resetToken')
          // next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      if (settings.isNeedNprogress) NProgress.done()
    }
  }
})

//权限过滤方法
// function filterPermissionFunc(permissionCodeArr, asyncRoutes) {
//   return new Promise((resolve) => {
//     let filterRouter = []
//     asyncRoutes.forEach(async (routeItem) => {
//       if (permissionCodeArr.includes(routeItem.code) || routeItem.hidden) {
//         //判断children
//         if (routeItem.children) {
//           routeItem.children = await filterPermissionFunc(permissionCodeArr, routeItem.children)
//         }
//         filterRouter.push(routeItem)
//       }
//     })
//     resolve(filterRouter)
//   })
// }

// 后置守卫
router.afterEach(() => {
  // 关闭进度条
  if (settings.isNeedNprogress) NProgress.done()
})
