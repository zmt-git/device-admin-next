import type { Router } from 'vue-router'
import { createProgressGuard } from './progressGuard'
import { createPermissionGuard } from './permissionGuard'

export function createGuard (router: Router) {
  createProgressGuard(router)
  createPermissionGuard(router)
}
