import { projectSetting } from '@/settings/projectSetting'
import { LocalesType } from '@/types/locales/locales'

export function getToken (): string {
  const result = sessionStorage.getItem(projectSetting.sessionKey)
  if (result) return result
  return ''
}

export function setToken (value: string) {
  sessionStorage.setItem(projectSetting.sessionKey, value)
}

export function removeToken () {
  return sessionStorage.removeItem(projectSetting.sessionKey)
}

export function setLocaleCache (c: LocalesType) {
  localStorage.setItem('locale', c)
}

export function getLocaleCache (): LocalesType {
  const result = localStorage.getItem('locale') as LocalesType

  if (result) return result

  setLocaleCache('zh-CN')

  return 'zh-CN'
}
