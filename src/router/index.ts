import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/login',
      component: () => import('@/views/Login/index.vue')
    }
    // {
    //   path: '/login/callback',
    //   component: () => import('@/views/Login/Callback.vue')
    // },
    // {
    //   path: '/',
    //   component: () => import('@/views/Layout/index.vue'),
    //   children: [
    //     {
    //       path: '/home',
    //       component: () => import('@/views/Home/index.vue')
    //     },
    //     {
    //       path: '/user',
    //       component: () => import('@/views/User/index.vue')
    //     },
    //     {
    //       path: '/article',
    //       component: () => import('@/views/Article/index.vue')
    //     },
    //     {
    //       path: '/notify',
    //       component: () => import('@/views/Notify/index.vue')
    //     }
    //   ]
    // },
    // {
    //   path: '/user/patient',
    //   component: () => import('@/views/User/Patient.vue')
    // },
    // {
    //   path: '/user/consult',
    //   component: () => import('@/views/User/Consult.vue')
    // },
    // {
    //   path: '/user/consult/:id',
    //   component: () => import('@/views/User/ConsultDetail.vue')
    // },
    // {
    //   path: '/consult/fast',
    //   component: () => import('@/views/Consult/Fast.vue')
    // },
    // {
    //   path: '/consult/dep',
    //   component: () => import('@/views/Consult/Dep.vue')
    // },
    // {
    //   path: '/consult/illness',
    //   component: () => import('@/views/Consult/Illness.vue')
    // },
    // {
    //   path: '/consult/pay',
    //   component: () => import('@/views/Consult/Pay.vue')
    // },
    // {
    //   path: '/room',
    //   component: () => import('@/views/Room/index.vue')
    // },
    // {
    //   path: '/order/pay',
    //   component: () => import('@/views/Order/Pay.vue')
    // },
    // {
    //   path: '/order/pay/result',
    //   component: () => import('@/views/Order/PayResult.vue')
    // },
    // {
    //   path: '/order/:id',
    //   component: () => import('@/views/Order/Detail.vue')
    // },
    // {
    //   path: '/order/logistics/:id',
    //   component: () => import('@/views/Order/Logistics.vue')
    // }
  ]
})

export default router
