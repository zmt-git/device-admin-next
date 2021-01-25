import { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { stableRoutes } from './routes/stableRoutes'
import { createGuard } from './guard'
const router = createRouter({
  history: createWebHashHistory(),
  routes: stableRoutes
})

export function setupRouter (app: App) {
  createGuard(router)
  app.use(router)
}

export default router
