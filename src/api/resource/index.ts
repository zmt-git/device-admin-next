import { defRequest } from '@/utils/network/axios'

enum Api {
  GetRoutes = '/resourceManager/getRoute'
}

// 获取用户路由
// eslint-disable-next-line
export function getUserRoutes (): Promise<any> {
  return defRequest.request({
    url: Api.GetRoutes,
    method: 'GET'
  })
}
