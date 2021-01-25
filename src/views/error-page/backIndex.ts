import router from '@/router'
export function back () {
  function backIndex () {
    router.replace('/')
  }

  function goBack () {
    router.go(-1)
  }

  return { backIndex, goBack }
}
