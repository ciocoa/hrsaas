import Layout from '@/layout'
// 设置
export default {
  path: '/setting',
  redirect: '/setting',
  component: Layout,
  children: [
    {
      path: '',
      name: 'setting',
      component: () => import('@/views/setting'),
      meta: { title: '设置', icon: 'setting' }
    }
  ]
}
