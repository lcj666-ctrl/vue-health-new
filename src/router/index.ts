import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/login',
      component: () => import('@/views/Login/index.vue')
    },
    // {
    //   path: '/login/callback',
    //   component: () => import('@/views/Login/Callback.vue')
    // },
    {
      path: '/',
      redirect: '/home',
      component: () => import('@/views/Layout/index.vue'),
      children: [
        {
          path: '/home',
          component: () => import('@/views/Home/index.vue'),
          meta: { title: '首页' }
        },
        {
          path: '/article',
          component: () => import('@/views/Article/index.vue'),
          meta: { title: '健康百科' }
        },
        {
          path: '/notify',
          component: () => import('@/views/Notify/index.vue'),
          meta: { title: '消息通知' }
        },
        {
          path: '/user',
          component: () => import('@/views/User/index.vue'),
          meta: { title: '个人中心' }
        }
      ]
    }
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

// 访问权限控制
// router.beforeEach((to) => {
//   // 用户仓库
//   const store = useUserStore()
//   // 不需要登录的页面，白名单
//   const wihteList = ['/login']
//   // 如果没有登录且不在白名单内，去登录
//   if (!store.user?.token && !wihteList.includes(to.path)) return '/login'
//   // 否则不做任何处理
// })
NProgress.configure({
  showSpinner: false
})
router.beforeEach(async (to) => {
  NProgress.start()
  // console.log('路由拦截', to)
  document.title = `优医问诊-${to.meta.title || ''}`
  const store = useUserStore()
  //   // 不需要登录的页面，白名单
  const wihteList = ['/login', '/register']
  if (!store.user?.token && !wihteList.includes(to.path)) {
    // 将用户重定向到登录页面
    // return { name: '/login' }
    return '/login'
  }
})
router.afterEach((to) => {
  // 修改标题
  document.title = `优医问诊-${to.meta.title || ''}`
  NProgress.done()
})
export default router
