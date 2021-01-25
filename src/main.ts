import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from './router'
import { setupElement } from '@/setup/element'
import { setupStore } from '@/store'
import { setupI18n } from '@/setup/i18n'
import { setupDirectives } from '@/directives'
import './registerServiceWorker'
import '@/design/reset.scss'

const app = createApp(App)

setupRouter(app)

setupElement(app)

setupStore(app)

setupI18n(app)

setupDirectives(app)

router.isReady().then(() => { app.mount('#app') })
