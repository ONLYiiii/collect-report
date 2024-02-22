import License from '@/views/License.vue'

export default [
  {
    path: '/',
    redirect: 'report',
  },
  {
    path: '/report',
    name: 'report',
    component: License,
  }
]
