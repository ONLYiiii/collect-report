import Report from '@/views/Report.vue'
import pdf from '@/views/pdf.vue'

export default [
  {
    path: '/',
    redirect: 'report',
  },
  {
    path: '/report',
    name: 'report',
    component: Report,
  },
  {
    path: '/report/pdf',
    name: 'pdf',
    component: pdf,
  },
]
