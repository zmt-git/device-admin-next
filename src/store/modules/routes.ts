import store from '../index'
import { RoutesList } from '@/types/router/routes'
import { RouteRecordRaw } from 'vue-router'
import { getUserRoutes } from '@/api/resource'
import { stableRoutes } from '@/router/routes/stableRoutes'
import { generateRouter } from '@/router/helper/generateRouter'
import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'

const NAME = 'routes'

@Module({ name: NAME, namespaced: true, dynamic: true, store })
class Routes extends VuexModule {
  private stableRoutes: RouteRecordRaw[] = stableRoutes

  private dynamicRoutesList: RoutesList[] = []

  private dynamicRoutes: RouteRecordRaw[] = []

  private loadMenu = false

  get getStableRoutes (): RouteRecordRaw[] {
    return this.stableRoutes
  }

  get getDynamicRoutesList (): RoutesList[] {
    return this.dynamicRoutesList
  }

  get getDynamicRoutes (): RouteRecordRaw[] {
    return this.dynamicRoutes
  }

  get getAllRoutes (): RouteRecordRaw[] {
    return [...this.stableRoutes, ...this.dynamicRoutes]
  }

  get getLoadMenu (): boolean {
    return this.loadMenu
  }

  @Mutation
  commitDynamicRoutes (dynamicRoutes: RoutesList[]) {
    this.dynamicRoutesList = dynamicRoutes
    this.dynamicRoutes = generateRouter(dynamicRoutes) as RouteRecordRaw[]
  }

  @Mutation
  commitLoadMenu (loadMenu: boolean) {
    this.loadMenu = loadMenu
  }

  @Action
  getDynamicRoutesAction () {
    return new Promise((resolve, reject) => {
      getUserRoutes()
        .then(res => {
          this.commitDynamicRoutes(res.result)
          resolve(res)
        })
        .catch(e => reject(e))
    })
  }
}

export const routesStore = getModule<Routes>(Routes)
