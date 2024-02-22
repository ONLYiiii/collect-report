import personal from './modules/personal'

export default [
  ...personal,
  {
    path: '/home',
    name: 'home',
    component: () => import('@/components/Home.vue'),
  },
]
