import { ThemeType } from '@/enums/theme'
export function setThemed (Theme: ThemeType) {
  localStorage.setItem('Theme', Theme)
}

export function getThemed (): ThemeType {
  const result = localStorage.getItem('Theme')
  if (result) return result as ThemeType
  return ThemeType.light
}

export function removeThemed () {
  localStorage.removeItem('Theme')
}
