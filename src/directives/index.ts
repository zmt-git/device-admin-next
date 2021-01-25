import { App } from 'vue'
import { focus } from './focus'
export function setupDirectives (app: App) {
  app.directive('focus', focus)
}
