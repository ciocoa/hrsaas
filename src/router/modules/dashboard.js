import Layout from '@/layout'
// 首页
export default {
  path: '/',
  redirect: '/dashboard',
  component: Layout,
  children: [
    {
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard'),
      meta: { title: '首页', icon: 'dashboard' }
    }
  ]
}
