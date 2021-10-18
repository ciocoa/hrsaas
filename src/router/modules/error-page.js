// 错误页
export const page404 = {
  path: '/404',
  name: '404',
  component: () => import('@/views/error-page/404'),
  hidden: true
}
export const page401 = {
  path: '/401',
  name: '401',
  component: () => import('@/views/error-page/401'),
  hidden: true
}
