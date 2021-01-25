import { App } from 'vue'
import { createStore } from 'vuex'

const store = createStore({ strict: true })

export function setupStore (app: App) {
  app.use(store)
}

export default store
