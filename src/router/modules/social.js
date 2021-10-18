import Layout from '@/layout'
// 社保
export default {
  path: '/social',
  redirect: '/social',
  component: Layout,
  children: [
    {
      path: '',
      name: 'social',
      component: () => import('@/views/social'),
      meta: { title: '社保', icon: 'table' }
    }
  ]
}
