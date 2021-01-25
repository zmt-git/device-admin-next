import { App } from 'vue'
import 'element-plus/lib/theme-chalk/index.css'
import '@/design/elementRest.scss'

import ElementPlus from 'element-plus'

export function setupElement (app: App) {
  app.use(ElementPlus)
}
