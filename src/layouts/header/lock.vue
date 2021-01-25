<template>
  <transition name="custom"
    enter-active-class="animate__animated animate__slideInDown"
    leave-active-class="animate__animated animate__slideOutUp">
    <div class="lock" v-if="lock" @click.self="close">
      <div class="lock-content"  :class="isFullscreen ? 'fullscreen' : ''">
        <div class="header">
          <h3>{{t('lock')}}</h3>
          <div class="icon-box">
            <i class="iconfont screen-icon" :class="icon" @click="isFullscreen = !isFullscreen"></i>
            <i class="el-icon-close" @click="close"></i>
          </div>
        </div>
        <div class="content">
          <div class="avatar">
            <el-avatar :size="60" src="https://empty">
              <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
            </el-avatar>
            <h3 class="username">{{name}}</h3>
          </div>
          <p class="msg">{{t('password')}}</p>
          <input v-focus class="input" type='password' v-model="password" @keyup.enter="lockFn">
          <el-button class="btn" type='primary' :disabled='disabled' size='small' @click="lockFn">{{t('lock')}}</el-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import VueTypes from 'vue-types'
import { useLocale } from '@/hooks/useLocale'
import { userStore } from '@/store/modules/user'
import { setLock } from '@/utils/cache/lock'

export default defineComponent({
  props: {
    lock: VueTypes.bool.def(false)
  },
  setup (prop, ctx) {
    const { t } = useLocale()

    const isFullscreen = ref(false)

    const icon = computed(() => {
      if (isFullscreen.value) {
        return 'icon-noFullscreen'
      } else {
        return 'icon-fullscreen'
      }
    })

    const password = ref('')

    const name = computed(() => userStore.getUserInfo?.name)

    watch(() => prop.lock, (n) => {
      if (!n) {
        password.value = ''
      }
    })

    const disabled = computed(() => {
      if (!password.value) {
        return true
      } else {
        return false
      }
    })

    function close () {
      ctx.emit('close')
    }

    function lockFn () {
      setLock(password.value)
      ctx.emit('close')
      ctx.emit('lockFn')
    }

    return {
      t,
      lockFn,
      name,
      icon,
      close,
      disabled,
      password,
      isFullscreen
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~@/design/_handler.scss';

.lock{
  background-color: rgba(130,135,155,.6);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  @include color('text-color-default');
  &-content{
    width: 400px;
    height: 300px;
    position: absolute;
    top: 10%;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 10px;
    overflow: hidden;
    box-sizing: border-box;
    @include bg-color('bg-color-default');
    display: flex;
    flex-direction: column;
  }
}
@media screen and (max-width: 560px) {
  .lock{
    width: 100%;
  }
}
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 10px 20px;
  border-bottom: 1px solid;
  @include border-color('border-color-default');
}
.fullscreen{
  width: 100%;
  height: 100%;
  top: 0;
}
.content{
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 20px;
  padding-bottom: 50px;
  /deep/ .el-button--primary {
    @include color('text-color-default');
    @include border-color('border-color-default');
    @include bg-color('bg-color-default');
  }
  /deep/ .is-disabled{
    @include color('text-color-default-disabled');
    @include border-color('border-color-default-disabled');
    @include bg-color('bg-color-default-disabled');
  }
}
.screen-icon{
  margin-right: 15px;
}
.icon-box{
  cursor: pointer;
  font-size: 18px;
}
.input{
  height: 32px;
  width: 100%;
  outline: 0;
  border: 1px solid;
  @include border-color('border-color-default');
  @include color('text-color-default');
  background-color: transparent;
  margin-bottom: 20px;
  text-indent: 20px;
}
.btn{
  width: 100%;
}
.msg{
  width: 100%;
  margin-bottom: 10px;
}
.avatar{
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.username{
  margin-top: 10px;
}
</style>
