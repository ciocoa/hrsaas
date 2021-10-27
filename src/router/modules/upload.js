import Layout from '@/layout'
// 上传
export default {
  path: '/upload',
  hidden: true,
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/upload')
    }
  ]
}
