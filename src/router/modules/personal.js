import Report from '@/views/Report.vue'
import pdf from '@/views/pdf.vue'

export default [
  {
    path: '/collect-report',
    redirect: '/collect-report/report',
  },
  {
    path: '/collect-report/report',
    name: 'report',
    component: Report,
  },
  {
    path: '/collect-report/report/pdf',
    name: 'pdf',
    component: pdf,
  },
]
