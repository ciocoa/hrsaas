import { createRouter, createWebHashHistory } from 'vue-router'
import approvals from './modules/approvals'
import attendances from './modules/attendances'
import dashboard from './modules/dashboard'
import departments from './modules/departments'
import employees from './modules/employees'
import { page401, page404 } from './modules/error-page'
import login from './modules/login'
import permission from './modules/permission'
import salarys from './modules/salarys'
import setting from './modules/setting'
import social from './modules/social'
/**
 * 静态路由
 */
export const constantRoutes = [login, dashboard, page401, page404]
/**
 * 动态路由
 */
export const asyncRoutes = [
  approvals,
  attendances,
  departments,
  employees,
  permission,
  salarys,
  social,
  setting,
  // 404 page must be placed at the end !!!
  // using pathMatch install of "*" in vue-router 4.0
  { path: '/:pathMatch(.*)', redirect: '/404', hidden: true }
]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: constantRoutes
})

export default router
