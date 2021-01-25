import type { AxiosResponse } from 'axios'
import { projectSetting } from '@/settings/projectSetting'
import Socket from '@/utils/network/websocket/websocket'
import router from '@/router'
import { ElNotification } from 'element-plus'

let socket: Socket
// eslint-disable-next-line
export function errorHandler (e: any) {
  let status = 0
  let msg = ''
  let path = ''

  try {
    status = e.status
    msg = e.data.msg
  } catch (e) {
    if (e.toString().includes('timeout')) {
      msg = '请求超时，请稍后重试'
    } else {
      msg = '未捕获到错误类型！'
    }
  }

  ElNotification({
    title: '提示',
    type: 'error',
    message: msg
  })

  switch (status) {
    case 404: path = '/404'
      break
    case 402: path = '/login'
      break
    case 401: path = '/401'
      break
    case 500: path = '/500'
      break
    default: path = ''
  }
  if (path) {
    router.push(path)
  }
}

export function successHandler (res: AxiosResponse) {
  if (res.config.url === '/system/login') {
    socket = new Socket({ url: projectSetting.socketUrl })
  }
}

export function getSokcet () {
  return socket
}
