import { defRequest } from '@/utils/network/axios'
import { LoginParams } from './model'

enum Api {
  Login = '/system/login'
}
// 登录
// eslint-disable-next-line
export function login (params: LoginParams): Promise<any> {
  return defRequest.request({
    url: Api.Login,
    method: 'POST',
    params
  })
}
