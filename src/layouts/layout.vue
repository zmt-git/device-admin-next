<template>
  <div class="layout">
    <n-menu class="menu" :isCollapse='isCollapse'></n-menu>
    <div class="container">
      <n-header :iconName='iconName' @setIconName='setIconName'></n-header>
      <div class="main">
        <router-view v-slot="{ Component }">
          <transition name="custom"
            enter-active-class="animate__animated animate__fadeInLeft"
            leave-active-class="animate__animated animate__fadeOutRight">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import NHeader from './header/header.vue'
import NMenu from './menu.vue'
import { defineComponent, onMounted, ref } from 'vue'
import { useTheme } from '@/hooks/useTheme'
import { useLocale } from '@/hooks/useLocale'
import { userStore } from '@/store/modules/user'
function setupCollapse () {
  const iconName = ref('el-icon-s-fold')
  const isCollapse = ref(false)
  function setIconName () {
    isCollapse.value = !isCollapse.value
    if (isCollapse.value) {
      iconName.value = 'el-icon-s-unfold'
    } else {
      iconName.value = 'el-icon-s-fold'
    }
  }
  return { iconName, isCollapse, setIconName }
}

export default defineComponent({
  components: { NHeader, NMenu },
  setup () {
    const { iconName, isCollapse, setIconName } = setupCollapse()

    const { setTheme } = useTheme()

    const { getLocale, setLocale } = useLocale()

    onMounted(() => {
      setTheme()

      if (!getLocale) {
        setLocale('zh-CN')
      } else {
        setLocale(getLocale)
      }

      userStore.getUserInfoAction()
    })

    return {
      iconName,
      isCollapse,
      setIconName
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~@/design/_handler.scss';

.layout{
  width: 100%;
  height: 100%;
  display: flex;
}
.container{
  flex: 1;
  display: flex;
  flex-direction: column;
}
.main{
  flex: 1;
  & div{
    position: relative;
    width: 100%;
    height: 100%;
    // @include bg-color('bg-color-default');
    @include color('text-color');
  }
}
</style>
