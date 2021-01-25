import { RoutesList, RawRouteComponent } from '@/types/router/routes'
import Layout from '@/layouts/layout.vue'

export function getComponent (component: string): RawRouteComponent {
  return () => import(`@/views/${component}.vue`)
}

export function generateRouter (routes: RoutesList[]): RoutesList[] {
  routes.forEach(route => {
    if ((route.component as string).toLowerCase() === 'layout') {
      route.component = Layout
    } else {
      route.component = getComponent(route.component as string)
    }
    if (route.children && route.children.length) {
      route.children = generateRouter(route.children)
    }
    return true
  })
  return routes
}
