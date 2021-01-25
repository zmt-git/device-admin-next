import type { Router } from 'vue-router'
import { getToken, removeToken } from '@/utils/auth/auth'
import { routesStore } from '@/store/modules/routes'
import { errorRouter } from '@/router/routes/stableRoutes'

const whiteLists: string[] = ['/login', '/401', '/404', '/500']

export function createPermissionGuard (router: Router) {
  router.beforeEach(async (to, from, next) => {
    if (getToken()) {
      if (to.path === '/login') {
        next({ path: '/' })
      } else {
        if (routesStore.getLoadMenu) {
          next()
        } else {
          try {
            routesStore.commitLoadMenu(false)

            await routesStore.getDynamicRoutesAction()

            routesStore.getDynamicRoutes.forEach(route => {
              router.addRoute(route)
            })

            errorRouter.forEach(route => {
              router.addRoute(route)
            })

            routesStore.commitLoadMenu(true)

            next()
          } catch (e) {
            console.log(e)
            routesStore.commitLoadMenu(false)

            removeToken()

            next({ path: '/login' })
          }
        }
      }
    } else {
      if (whiteLists.includes(to.path)) {
        next()
      } else {
        next({ path: '/login' })
      }
    }
  })
}
