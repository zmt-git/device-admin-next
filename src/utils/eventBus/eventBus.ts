import type { EventType } from '@/enums/event'

class EventBus {
  private eventMap: EventMap = {}

  on (type: EventType, callBack: Function) {
    if (!this.eventMap[type]) {
      this.eventMap[type] = []
    }

    const index = this.getFnIndex(type, callBack)

    if (index >= 0) return

    this.eventMap[type].push(callBack)
  }
  // eslint-disable-next-line
  emit (type: EventType, ...arg: any[]) {
    const fns = this.eventMap[type]

    if (!fns) return

    fns.forEach(fn => {
      fn(...arg)
    })
  }

  off (type: EventType, fn?: Function) {
    let fns = this.eventMap[type]

    if (!fns) return

    if (!fn) {
      fns = []
      delete this.eventMap[type]
    } else {
      const index = this.getFnIndex(type, fn)
      if (index >= 0) {
        this.eventMap[type].splice(index, 1)
      }
    }
  }

  getFnIndex (type: EventType, fn: Function) {
    return this.eventMap[type].findIndex(cd => cd === fn)
  }
}

export default new EventBus()
