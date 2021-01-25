import { encryptByMd5 } from '@/utils/encryption/md5Encryption'
export function setLock (password: string) {
  const result = encryptByMd5(password)
  localStorage.setItem('lock', result)
}

export function getLock (): string {
  const result = localStorage.getItem('lock')
  if (result) return result
  return ''
}

export function removeLock () {
  localStorage.removeItem('lock')
}
