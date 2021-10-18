import Layout from '@/layout'
// 权限
export default {
  path: '/permission',
  redirect: '/permission',
  component: Layout,
  children: [
    {
      path: '',
      name: 'permission',
      component: () => import('@/views/permission'),
      meta: { title: '权限', icon: 'lock' }
    }
  ]
}
