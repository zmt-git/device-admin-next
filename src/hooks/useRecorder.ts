import Recorder from 'recorder-core'

const recorderInstance = new Recorder({
  type: 'mp3',
  sampleRate:16000,
  bitRate:16
})

export function useRecorder () {
  // 获取录音请求权限
  function open (success: Function, error?:Function) {
    recorderInstance.open(() => {
      success()
    },
    (msg: string,isUserNotAllow: boolean)=> {
      error && error(msg, isUserNotAllow)
    })
  }
  // 开始录音
  function start () {
    recorderInstance.start()
  }
  // 结束录音
  function stop (success: Function, error?:Function) {
    recorderInstance.stop((blob: Blob, duration: number) => {
      success(blob, duration)
    },
    (msg: string) => {
      error && error(msg)
    })
  }

  // 暂停录音
  function pause () {
    recorderInstance.pause()
  }

  // 恢复录音
  function resume () {
    recorderInstance.resume()
  }

  return {
    recorderInstance,
    stop,
    open,
    start,
    pause,
    resume
  }

}
