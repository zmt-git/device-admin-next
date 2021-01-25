<template>
  <transition
    name="custom"
    enter-active-class="animate__animated animate__slideInDown"
    leave-active-class="animate__animated animate__slideOutUp"
  >
    <div class='dialog' v-if="dialogVisible" @click.self="close">
      <div class="search">
        <div class="plr15 search-top">
          <div class="input-box">
            <i class="el-icon-search search-icon"></i>
            <input v-focus class="search-input" autofocus v-model="searchText" @input="search" type="text">
          </div>
          <ul class="search-result" id="result-list">
            <li class="result-empty" v-show="resultList.length === 0">
              <span>{{t('resultEmpty')}}</span>
            </li>
            <li class="search-result-item"
              :key='index'
              v-for="(item, index) in resultList"
              :class="index === currentIndex ? 'active' : ''"
              @mouseenter="currentIndex = index"
              @click="go"
            >
              <div class="route-item">
                <p class="search-result-item--title">
                  <span class="iconfont search-result-item--title--icon" :class="item.meta.icon"></span>
                  {{item.meta.title}}
                </p>
                <p class="search-result-item--des">
                  <span class="iconfont search-result-item--des--icon" :class="item.meta.parentIcon"></span>
                  {{item.meta.parentName}}
                </p>
              </div>
              <i class="iconfont icon-huiche route-icon" v-show="index === currentIndex"></i>
            </li>
          </ul>
        </div>
        <div class="msg">
          <i class="iconfont icon-plus-shiftup msg-icon "></i>
          <i class="iconfont icon-plus-shiftdown msg-icon "></i>
          <span class="msg-tit">{{t('switch')}}</span>
          <i class="iconfont icon-huiche msg-icon"></i>
          <span class="msg-tit">{{t('confirm')}}</span>
          <span class="b-icon msg-icon b-icon">Esc</span>
          <span class="msg-tit">{{t('close')}}</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, ref, Ref, watch } from 'vue'
import { routesStore } from '@/store/modules/routes'
import { RoutesList } from '@/types/router/routes'
import * as _ from 'lodash'
import VueTypes from 'vue-types'
import router from '@/router'
import { useLocale } from '@/hooks/useLocale'
function setParentName (route: RoutesList, list: RoutesList[]): void {
  const parentName = route.meta.title
  const parentIcon = route.meta.icon
  const parentPath = route.path

  for (let i = 0; i < (route.children as RoutesList[]).length; i++) {
    (route.children as RoutesList[])[i].meta.parentName = parentName;
    (route.children as RoutesList[])[i].meta.parentPath = parentPath;
    (route.children as RoutesList[])[i].meta.parentIcon = parentIcon
  }

  list.push(...route.children as RoutesList[])
}

export default defineComponent({
  props: {
    dialogVisible: VueTypes.bool.def(false)
  },
  setup (prop, ctx) {
    const list: RoutesList[] = []

    const DynamicRoutesList = _.cloneDeep(routesStore.getDynamicRoutesList)
    DynamicRoutesList.forEach(route => {
      setParentName(route, list)
    })

    const { t } = useLocale()

    const resultList: Ref<RoutesList[]> = ref([])

    const searchText = ref('')

    const currentIndex = ref(0)

    const search = _.debounce(() => {
      if (!searchText.value) {
        resultList.value = []
        return
      }
      resultList.value = list.filter(route => {
        return route.meta.title.includes(searchText.value)
      })
    }, 500)

    function close () {
      ctx.emit('close')
    }

    function go () {
      close()
      const path = resultList.value[currentIndex.value].meta.parentPath + '/' + resultList.value[currentIndex.value].path
      router.push(path)
    }

    function scrollAuto (keyCode: number) {
      const t: Element = document.getElementById('result-list') as Element
      const gap = (t.scrollHeight - t.scrollWidth) / (resultList.value.length - 8)

      if (keyCode === 38 && currentIndex.value <= resultList.value.length - 7) {
        t.scrollTop -= gap
      } else if (keyCode === 40 && currentIndex.value >= 6) {
        t.scrollTop += gap
      }
    }

    function changeIndex (e: KeyboardEvent) {
      scrollAuto(e.keyCode)
      if (e.keyCode === 38) {
        currentIndex.value--

        if (currentIndex.value <= 0) {
          currentIndex.value = 0
        }
      } else if (e.keyCode === 40) {
        currentIndex.value++

        if (currentIndex.value >= resultList.value.length) {
          currentIndex.value = resultList.value.length - 1
        }
      } else if (e.keyCode === 13) {
        go()
      } else if (e.keyCode === 27) {
        close()
      }
    }

    onUnmounted(() => {
      removeEventListener('keydown', changeIndex)
    })

    // eslint-disable-next-line
    watch(() => prop.dialogVisible, (dialogVisible, prevDialogVisible) => {
      if (!dialogVisible) {
        resultList.value = []
        searchText.value = ''
        removeEventListener('keydown', changeIndex)
      } else {
        addEventListener('keydown', changeIndex)
      }
    })

    return {
      t,
      go,
      close,
      search,
      searchText,
      resultList,
      changeIndex,
      currentIndex
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~@/design/_handler.scss';
.dialog{
  background-color: rgba(130,135,155,.6);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  color: #fff;
}
.search{
  width: 560px;
  min-height: 236px;
  max-height: 600px;
  position: absolute;
  top: 10%;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 10px;
  overflow: hidden;
  box-sizing: border-box;
  padding-top: 15px;
  @include bg-color('bg-color-default');
  display: flex;
  flex-direction: column;
  &-input{
    flex: 1;
    height: 56px;
    background-color: transparent;
    outline: 0;
    font-size: 26px;
    border: 0;
    @include color('text-color-default')
  }
}
.input-box{
  display: flex;
  align-items: center;
  border-style: solid;
  border-width: 2px;
  @include color('text-color-default');
  @include border-color('border-color-default');
  box-sizing: border-box;
  padding: 0 15px;
}
.search-icon{
  font-size: 30px;
  padding: 0 5px;
}
.msg{
  display: flex;
  align-items: center;
  box-shadow: 0px 5px 5px 5px #ccc;
  padding: 10px 15px;
  &-icon{
    @include color('text-color-default');
    @include border-color('border-color-default');
    border: 1px solid;
    font-size: 16px;
    padding: 2px;
    margin-right: 5px;
    border-radius: 2px;
  }
  &-tit{
    margin-right: 20px;
    @include color('text-color-default');
  }
}
.b-icon{
  font-size: 13px;
}
.search-top{
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.route-item{
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.route-icon{
  font-size: 20px;
}
.search-result{
  flex: 1;
  overflow: auto;
  &-item{
    height: 56px;
    border-radius: 5px;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    padding: 0 10px;
    @include bg-color('bg-color-default-light');
    @include color('text-color-default');
    margin: 5px 0px;
    &--title{
      font-size: 16px;
      margin-bottom: 3px;
      &--icon{
        font-size: 14px;
      }
    }
    &--des{
      font-size: 10px;
      @include color('text-color-default');
      padding-left: 20px;
      &--icon{
        font-size: 10px;
      }
    }
  }
}
.active{
  @include color('text-color-default');
  @include bg-color('bg-color-default-heavy');
}

.result-empty{
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
  font-size: 14px;
}
@media screen and (max-width: 560px) {
  .search{
    width: 100%;
  }
}
</style>
