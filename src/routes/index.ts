import { lazy } from 'react'

const router = [
  {
    path: '/home',
    component: lazy(() => import('@pages/Home'))
  }
]
export default router
