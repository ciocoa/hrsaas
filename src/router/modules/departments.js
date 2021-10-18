import Layout from '@/layout'
// 部门
export default {
  path: '/departments',
  redirect: '/departments',
  component: Layout,
  children: [
    {
      path: '',
      name: 'departments',
      component: () => import('@/views/departments'),
      meta: { title: '部门', icon: 'tree' }
    }
  ]
}
