import { App } from 'vue'
import { getSokcet } from '../axios/handler'
export function setupSocket(app: App) {
  app.config.globalProperties = getSokcet()
}