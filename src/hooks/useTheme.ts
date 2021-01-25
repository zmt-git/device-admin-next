import { ref } from 'vue'
import { setThemed, getThemed } from '@/utils/cache/theme'
export function useTheme () {
  const themed = ref(getThemed())

  function setTheme () {
    window.document.documentElement.setAttribute('data-theme', themed.value)
    setThemed(themed.value)
  }

  return { themed, setTheme }
}
