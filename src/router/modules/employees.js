import Layout from '@/layout'
// 员工
export default {
  path: '/employees',
  redirect: '/employees',
  component: Layout,
  children: [
    {
      path: '',
      name: 'employees',
      component: () => import('@/views/employees'),
      meta: { title: '员工', icon: 'people' }
    }
  ]
}
