import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/layout.vue'

export const stableRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    meta: {
      title: '首页',
      icon: ''
    },
    component: Layout,
    children: [
      {
        path: '',
        meta: {
          title: '首页',
          icon: ''
        },
        component: () => import('@/views/index.vue')
      }
    ]
  },
  {
    path: '/login',
    meta: {
      title: '登录',
      icon: ''
    },
    component: () => import('@/views/system/login.vue')
  }
]

export const errorRouter: Array<RouteRecordRaw> = [
  {
    path: '/401',
    meta: {
      title: '401',
      icon: ''
    },
    component: () => import('@/views/error-page/401.vue')
  },
  {
    path: '/404',
    meta: {
      title: '404',
      icon: ''
    },
    component: () => import('@/views/error-page/404.vue')
  },
  {
    path: '/500',
    meta: {
      title: '500',
      icon: ''
    },
    component: () => import('@/views/error-page/500.vue')
  }
]
