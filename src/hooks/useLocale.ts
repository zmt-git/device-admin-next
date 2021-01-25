import { LocalesType, LocalesDropList } from '@/types/locales/locales'
import { getLocaleCache, setLocaleCache } from '@/utils/auth/auth'
import { projectSetting } from '@/settings/projectSetting'
import { useI18n } from 'vue-i18n'

export function useLocale () {
  const dropList: LocalesDropList[] = [
    { name: 'English', value: 'en' },
    { name: '繁體中文', value: 'zh-TW' },
    { name: '简体中文', value: 'zh-CN' }
  ]

  const getLocale: LocalesType = getLocaleCache() || projectSetting.locale

  const { locale, t } = useI18n()

  function setLocale (l: LocalesType) {
    locale.value = l
    setLocaleCache(l)
  }

  return { setLocale, t, getLocale, dropList }
}
