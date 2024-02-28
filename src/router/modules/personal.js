import Report from '@/views/Report.vue'

export default [
  {
    path: '/',
    redirect: 'report',
  },
  {
    path: '/report',
    name: 'report',
    component: Report,
  }
]
