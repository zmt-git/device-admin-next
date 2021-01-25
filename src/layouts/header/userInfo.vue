<template>
  <transition
    name='info'
    enter-active-class="animate__animated animate__slideInRight"
    leave-active-class="animate__animated animate__slideOutRight"
  >
    <div class="custom-dialog" v-if="show" @click.self="close">
      <div class="info">
        <div class="info-header">
          <span>{{t('userInfo')}}</span>
          <span class="el-icon-close close" @click="close"></span>
        </div>
        <ul class="list">
          <li class="list-item">
            <span>用户名</span><span>{{username}}</span>
          </li>
          <li class="list-item">
            <span>名称</span><span>{{name}}</span>
          </li>
          <li class="list-item">
            <span>切换主题</span>
            <el-switch
              class="header-item"
              v-model="themed"
              active-value='light'
              inactive-value='dark'
              @change="setTheme"
              active-color="rgba(22, 56, 120, 0.9)"
              inactive-color="#f0f0f0">
            </el-switch>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import VueTypes from 'vue-types'
import { useTheme } from '@/hooks/useTheme'
import { useLocale } from '@/hooks/useLocale'
import { userStore } from '@/store/modules/user'

export default defineComponent({
  props: {
    show: VueTypes.bool.def(false)
  },

  setup (prop, ctx) {
    const { themed, setTheme } = useTheme()

    const name = computed(() => userStore.getUserInfo?.name)
    const username = computed(() => userStore.getUserInfo?.username)

    const { t } = useLocale()

    function close () {
      ctx.emit('close')
    }

    return {
      username,
      name,
      t,
      themed,
      setTheme,
      close
    }
  }
})
</script>
<style lang="scss" scoped>
@import '~@/design/_handler.scss';

.info{
  width: 340px;
  height: 100%;
  float: right;
  display: flex;
  flex-direction: column;
  @include bg-color('bg-color-default');
  &-header{
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 10px;
    border-bottom: 1px solid;
    @include border-color('border-color-default')
  }
}
.list{
  flex: 1;
  box-sizing: border-box;
  padding: 0 10px;
  &-item{
    height: 44px;
    @include color('text-color-default');
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.close{
  cursor: pointer;
}
</style>
