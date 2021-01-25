import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios'
import { NAxiosOptions } from '@/types/utils/networks'
import { getToken } from '@/utils/auth/auth'
import { projectSetting } from '@/settings/projectSetting'
import { errorHandler, successHandler } from './handler'

class NAxios {
  private axiosInstance: AxiosInstance

  private readonly option: NAxiosOptions

  constructor (opt: NAxiosOptions) {
    this.option = opt
    this.axiosInstance = axios.create(opt)
    this.setupInterceptors()
  }

  createAxios (opt: NAxiosOptions): void {
    this.axiosInstance = axios.create(opt)
  }

  getAxios (): AxiosInstance {
    return this.axiosInstance
  }
  // eslint-disable-next-line
  setHeaders (headers: any): void {
    if (!this.axiosInstance) return

    Object.assign(this.axiosInstance.defaults.headers, headers)
  }

  setupInterceptors () {
    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      if (!projectSetting.ignoreToken) {
        config.headers.token = getToken()
      }
      return config
    }, e => {
      return Promise.reject(e)
    })

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        successHandler(response)
        return response.data
      },
      // eslint-disable-next-line
      (e: any) => {
        errorHandler(e)
        return Promise.reject(e)
      }
    )
  }

  // eslint-disable-next-line
  request (requsetConfig: any): Promise<any> {
    return this.axiosInstance(requsetConfig)
  }
}

export default NAxios
