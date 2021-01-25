<template>
  <div class="header">
    <!-- 搜索 -->
    <search :dialogVisible='dialogVisible' @close='dialogVisible = false'></search>
    <!-- 锁屏 -->
    <lock :lock='lockVisible' @close='lockVisible = false' @lockFn='setLock'></lock>
    <!-- 屏保 -->
    <screen-saver :show='screensaver' @close='screensaver = false'></screen-saver>
    <!-- 用户信息 -->
    <userinfo :show='infoShow' @close='infoShow = false'></userinfo>
    <!--  -->
    <el-tooltip class="item" effect="dark" :content="title" placement="bottom">
      <i class="header-icon" :class="iconName" @click="setIconName"></i>
    </el-tooltip>
    <div>
      <!-- 锁屏 -->
      <el-tooltip class="item" effect="dark" :content="t('lock')" placement="bottom">
        <i class="iconfont icon-suo2 header-item" @click="lockFn"></i>
      </el-tooltip>

      <!-- 搜索 -->
      <el-tooltip class="item" effect="dark" :content="t('search')" placement="bottom">
        <i class="iconfont icon-sousuo header-item" @click="searchFn"></i>
      </el-tooltip>

      <!-- 国际化 -->
      <el-dropdown trigger="click">
        <el-tooltip class="item" effect="dark" :content="t('globalization')" placement="bottom">
          <span class="el-dropdown-link">
            <i class="iconfont icon-in header-item"></i>
          </span>
        </el-tooltip>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="changeLocals(item)" :key="item.value" v-for="item in dropList">{{item.name}}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!-- 全屏 -->
      <el-tooltip class="item" effect="dark" :content="t(screenKey)" placement="bottom">
        <i class="iconfont header-item" :class="screenIcon" @click="toggleFullscreen"></i>
      </el-tooltip>

      <!-- 通知 -->
      <el-tooltip class="item" effect="dark" :content="t('notice')" placement="bottom">
        <i class="iconfont icon-tongzhi1 header-item"></i>
      </el-tooltip>

      <!-- 用户 -->
      <el-tooltip class="item" effect="dark" :content="t('user')" placement="bottom">
        <i class="iconfont icon-yonghu1 header-item" @click="setInfoShow"></i>
      </el-tooltip>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue'
import search from './docSearch.vue'
import lock from './lock.vue'
import screenSaver from './screenSaver.vue'
import userinfo from './userInfo.vue'
import VueTypes from 'vue-types'
import { useLocale } from '@/hooks/useLocale'
import { LocalesDropList } from '@/types/locales/locales'
import { useFullscreen } from '@/hooks/useFullscreen'
import { getLock } from '@/utils/cache/lock'
// 搜索
function useSearch () {
  const dialogVisible = ref(false)

  function searchFn () {
    dialogVisible.value = true
  }
  return { dialogVisible, searchFn }
}
// 锁屏
function useLock () {
  const lockVisible = ref(false)

  function lockFn () {
    lockVisible.value = true
  }
  return { lockVisible, lockFn }
}
// 锁屏屏保
function useScreensaver () {
  const screensaver = ref(false)

  function setLock () {
    screensaver.value = true
  }
  return { screensaver, setLock }
}
// 用户
function useUserinfo () {
  const infoShow = ref(false)

  function setInfoShow () {
    infoShow.value = true
  }
  return { infoShow, setInfoShow }
}
// 全屏
function _useFullscreen () {
  const { toggleFullscreen, isFullscreenRef } = useFullscreen()
  const screenIcon = computed(() => {
    if (isFullscreenRef.value) {
      return 'icon-noFullscreen'
    } else {
      return 'icon-fullscreen'
    }
  })

  const screenKey = computed(() => {
    if (isFullscreenRef.value) {
      return 'noFullscreen'
    } else {
      return 'fullscreen'
    }
  })
  return { toggleFullscreen, screenIcon, screenKey }
}

export default defineComponent({
  props: {
    iconName: VueTypes.string.isRequired
  },

  components: { search, lock, screenSaver, userinfo },

  setup (prop, ctx) {
    const title = computed(() => { let str: string; prop.iconName === 'el-icon-s-unfold' ? str = '展开菜单' : str = '折叠菜单'; return str })

    const { setLocale, dropList, t } = useLocale()

    const { toggleFullscreen, screenIcon, screenKey } = _useFullscreen()

    const { searchFn, dialogVisible } = useSearch()

    const { lockFn, lockVisible } = useLock()

    const { screensaver, setLock } = useScreensaver()

    const { infoShow, setInfoShow } = useUserinfo()

    function setIconName () {
      ctx.emit('setIconName')
    }

    function changeLocals (item: LocalesDropList) {
      setLocale(item.value)
    }

    onMounted(() => {
      if (getLock()) {
        screensaver.value = true
      }
    })

    return {
      setInfoShow,
      infoShow,
      searchFn,
      lockFn,
      lockVisible,
      dialogVisible,
      setIconName,
      title,
      dropList,
      changeLocals,
      t,
      toggleFullscreen,
      screenIcon,
      screenKey,
      screensaver,
      setLock
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~@/design/_handler.scss';
.header{
  height: 50px;
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid;
  @include bg-color('bg-color-default');
  @include border-color('border-color-default');
  @include color('text-color-default');
  &-icon{
    margin-right: 10px;
    font-size: 20px;
    cursor: pointer;
  }
  /deep/ .el-dropdown{
    @include color('text-color-default');
  }
}
.header-item{
  margin: 0 5px;
  cursor: pointer;
  font-size: 18px;
}
</style>
