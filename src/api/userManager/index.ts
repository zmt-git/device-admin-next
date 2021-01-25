import { defRequest } from '@/utils/network/axios'

enum Api {
  GetUserInfo = '/userManager/getUserToken'
}

// 获取token用户信息
// eslint-disable-next-line
export function getUserInfo (): Promise<any> {
  return defRequest.request({
    url: Api.GetUserInfo,
    method: 'GET'
  })
}
