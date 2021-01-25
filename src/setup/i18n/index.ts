import { App } from 'vue'
import type { I18nOptions, I18n } from 'vue-i18n'
import { createI18n } from 'vue-i18n'
import en from '@/locales/en'
import zhCN from '@/locales/zh-CN'
import zhTW from '@/locales/zh-TW'
import { projectSetting } from '@/settings/projectSetting'

const { locale, fallbackLocale, availableLocales } = projectSetting
const messages = {
  en,
  'zh-CN': zhCN,
  'zh-TW': zhTW
}

const localeData: I18nOptions = {
  legacy: false,
  locale: locale,
  fallbackLocale: fallbackLocale,
  messages: messages,
  availableLocales: availableLocales,
  sync: true,
  silentTranslationWarn: true,
  missingWarn: false,
  silentFallbackWarn: true
}

let i18n: I18n

export function setupI18n (app: App) {
  i18n = createI18n(localeData) as I18n
  app.use(i18n)
}

export function getI18n (): I18n {
  return i18n
}
