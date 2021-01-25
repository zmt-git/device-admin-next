import eventBus from '@/utils/eventBus/eventBus'
import { getToken } from '@/utils/auth/auth'
import { SocketMsg, SocketOptions, SocketSendMsg } from '@/types/utils/networks'
import { EventType } from '@/enums/event'
import { projectSetting } from '@/settings/projectSetting'

const heartMsg: SocketMsg = {
  protVer: '1.0',
  modeNum: 'web',
  sigNum: EventType.sokcetHeartMsg,
  seq: 1,
  deviceCode: getToken(),
  body: null
}

class Socket {
  private static instance: Socket | null = null

  private isContent = false

  private webSocketRaw!: WebSocket

  private readonly cacheUrl: string = ''

  private readonly timeout: number = projectSetting.timeout

  private readonly heartbeatTime: number = 3000

  private reconnectCount = 0

  private readonly reconnectMaxCount: number = 10

  private heartbeatTimer: null | NodeJS.Timeout = null

  private timeoutTimer: null | NodeJS.Timeout = null

  private seq = 0

  constructor (opt: SocketOptions) {
    if (Socket.instance) {
      return Socket.instance
    }

    this.cacheUrl = opt.url

    Socket.instance = this

    this.webSocketRaw = this.init()
  }

  get getContentState () {
    return this.isContent
  }

  init (): WebSocket {
    try {
      return new WebSocket(`${this.cacheUrl}/?token=${getToken()}`)
    } catch (e) {
      alert(e)
      throw new Error(e)
    }
  }

  bindSocketHandler () {
    this.webSocketRaw.onopen = () => {
      console.log('websocket is open')
      this.reconnectCount = 0
      this.isContent = true
    }

    this.webSocketRaw.onmessage = (evt) => {
      try {
        const msg: SocketMsg = JSON.parse(evt.data)

        if (msg.sigNum === EventType.sokcetHeartMsg) {
          this.heartbeat()
        }

        eventBus.emit(msg.sigNum, msg)
      } catch (e) {
        throw new Error(e)
      }
    }

    this.webSocketRaw.onclose = () => {
      Socket.instance = null
      this.isContent = false
      this.clearTimer()
    }

    this.webSocketRaw.onerror = () => {
      Socket.instance = null
      this.isContent = false
      this.clearTimer()
      this.reconnect()
    }
  }

  setSeq (): number {
    if (this.seq > 100) this.seq = 0
    this.seq++
    return this.seq
  }

  send (msg: SocketSendMsg) {
    const m: SocketMsg = {
      ...msg,
      seq: this.setSeq(),
      protVer: '1.0',
      modeNum: 'web',
      deviceCode: getToken()
    }
    this.webSocketRaw.send(JSON.stringify(m))
  }

  close () {
    this.webSocketRaw.close()
  }

  clearTimer () {
    this.heartbeatTimer && clearTimeout(this.heartbeatTimer)
    this.timeoutTimer && clearTimeout(this.timeoutTimer)
  }

  heartbeat () {
    this.clearTimer()
    this.heartbeatTimer = setTimeout(() => {
      this.send(heartMsg)

      this.timeoutTimer = setTimeout(() => {
        this.reconnect()
      }, this.timeout)
    }, this.heartbeatTime)
  }

  reconnect () {
    if (this.reconnectCount > this.reconnectMaxCount) {
      throw new Error('socket无法链接到服务器！')
    }
    this.reconnectCount++

    Socket.instance = this

    this.webSocketRaw = this.init()
  }
}

export default Socket
