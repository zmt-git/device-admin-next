import CryptoES from 'crypto-es'

export function encryptByMd5 (str: string): string {
  return CryptoES.MD5(str).toString()
}
