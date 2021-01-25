import { EventType } from '@/enums/event'
export interface SocketOptions {
  url: string
}

export interface SocketMsg {
  sigNum: EventType
  body: any
  protVer: string
  modeNum: string
  seq: number
  deviceCode: string
}

export interface SocketSendMsg {
  sigNum: EventType
  body: any
}

export interface NAxiosOptions {
  baseURL: string,
  timeout: number
}