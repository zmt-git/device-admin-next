import NAxios from './axios'
import { projectSetting } from '@/settings/projectSetting'

export const defRequest = new NAxios({
  baseURL: projectSetting.apiUrl,
  timeout: projectSetting.timeout
})

defRequest.setHeaders({
  'Content-Type': 'application/json'
})
