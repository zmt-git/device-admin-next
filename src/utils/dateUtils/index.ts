type DateFormate = 'yyyy-MM-dd hh:mm:ss' | 'yyyy-MM-dd' | 'hh:mm'
export function timestapToTime (time: number, type: DateFormate = 'yyyy-MM-dd hh:mm:ss', format = '-'): string {
  let result = ''

  if (time.toString().length === 10) {
    time = time * 1000
  }

  if (time.toString().length < 13) return result

  const date: Date = new Date(time)

  const yyyy = date.getFullYear().toString()

  const MM = (date.getMonth() + 1).toString().padStart(2, '0')

  const dd = date.getDay().toString().padStart(2, '0')

  const hh = date.getHours().toString().padStart(2, '0')

  const mm = date.getMinutes().toString().padStart(2, '0')

  const ss = date.getSeconds().toString().padStart(2, '0')

  switch (type) {
    case 'hh:mm': result = `${hh}:${mm}:${ss}`
      break
    case 'yyyy-MM-dd': result = `${yyyy}${format}${MM}${format}${dd}`
      break
    default: result = `${yyyy}${format}${MM}${format}${dd} ${hh}:${mm}:${ss}`
  }

  return result
}

export function getWeek (date: Date): string {
  const day = date.getDay()
  let week = ''

  switch (day) {
    case 1: week = '星期一'
      break
    case 2: week = '星期二'
      break
    case 3: week = '星期三'
      break
    case 4: week = '星期四'
      break
    case 5: week = '星期五'
      break
    case 6: week = '星期六'
      break
    case 0: week = '星期日'
      break
    default: week = ''
  }
  return week
}
