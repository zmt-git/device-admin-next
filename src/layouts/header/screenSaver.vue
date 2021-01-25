<template>
  <transition name="el-zoom-in-top">
    <div class="saver" v-if="show">
      <div class="time" :class="unlock ? 'blur' : ''">
        <div class="time-header" @click="unlock = true">
          <i class="el-icon-lock"></i>
          <span>{{t('unlock')}}</span>
        </div>

        <div class="time-section">
          <div class="time-section-item"><span>{{hour}}</span></div>
          <div class="time-section-item"><span>{{minute}}</span></div>
        </div>

        <div class="time-footer">
          {{time}} {{week}}
        </div>
      </div>
      <div class="unlock" v-show="unlock">
        <div class="unlock-box">
          <div class="avatar">
            <el-avatar :size="60" src="https://empty">
              <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
            </el-avatar>
            <h3 class="username">{{name}}</h3>
          </div>
          <input v-focus class="input" type="password" v-model="password" :placeholder="t('lockPlaceholder')" @keyup.enter="setLock">
          <div class="btn">
            <span @click="unlock = false">{{t('back')}}</span>
            <span @click="logout">{{t('login')}}</span>
            <span @click="setLock">{{t('enter')}}</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, watch, ref, onUnmounted } from 'vue'
import VueTypes from 'vue-types'
import { useLocale } from '@/hooks/useLocale'
import { getWeek, timestapToTime } from '@/utils/dateUtils'
import { userStore } from '@/store/modules/user'
import router from '@/router'
import { encryptByMd5 } from '@/utils/encryption/md5Encryption'
import { getLock, removeLock } from '@/utils/cache/lock'
import { ElMessage } from 'element-plus'
export default defineComponent({
  props: {
    show: VueTypes.bool.def(false)
  },

  setup (prop, ctx) {
    const { t } = useLocale()
    const unlock = ref(false)
    const password = ref('')
    const name = computed(() => userStore.getUserInfo?.name)
    const date = ref(new Date())
    const week = computed(() => getWeek(date.value))
    const time = computed(() => timestapToTime(date.value.getTime(), 'yyyy-MM-dd'))
    const hour = computed(() => date.value.getHours().toString().padStart(2, '0'))
    const minute = computed(() => date.value.getMinutes().toString().padStart(2, '0'))
    let timer: NodeJS.Timer | null = null

    watch(() => prop.show, (n, o) => {
      if (o) {
        timer && clearInterval(timer)
        password.value = ''
      } else {
        timer = setInterval(() => {
          date.value = new Date()
        }, 1000)
      }
    })

    onUnmounted(() => {
      timer && clearInterval(timer)
    })

    async function logout () {
      await userStore.logout()
      router.push('/login')
    }

    function setLock () {
      if (!password.value) {
        ElMessage.error(t('passwordEmpty'))
        return
      }
      if (getLock() === encryptByMd5(password.value)) {
        unlock.value = false
        removeLock()
        ctx.emit('close')
      } else {
        ElMessage.error(t('passwordError'))
      }
    }

    return {
      t,
      name,
      week,
      time,
      hour,
      logout,
      unlock,
      minute,
      setLock,
      password
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~@/design/_handler.scss';

$color: #bababa;
.saver{
  background-color: rgba(0,0,0,1);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  color: $color;
}
.time{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 10px;
  &-header{
    font-size: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }
  &-section{
    flex: 1;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &-item{
      width: 40%;
      height: 70%;
      margin: 0 5%;
      border-radius: 5%;
      background-color: #141313;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      font-size: 32em;
    }
  }
  &-footer{
    font-size: 20px;
    text-align: center;
  }
}
.unlock{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.1);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  &-box{
    width: 260px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
.avatar{
  margin-bottom: 20px;
}
.input{
  width: 100%;
  height: 30px;
  margin-bottom: 20px;
  outline: 0;
  background-color: transparent;
  border: 1px solid;
  @include border-color('border-color-default');
  @include color('text-color-default');
  text-indent: 10px;
}
.input::-webkit-input-placeholder{
  @include color('text-color-default-light');
}
.btn{
  width: 100%;
  display: flex;
  justify-content: space-between;
  @include color('text-color-default-light');
  cursor: pointer;
}
.blur{
  filter: blur(20px);
}
@media screen and (max-width: 1550px) {
  .time-section-item{
    font-size: 28em;
  }
}
@media screen and (max-width: 1330px) {
  .time-section-item{
    font-size: 24em;
  }
}
@media screen and (max-width: 1150px) {
  .time-section-item{
    font-size: 20em;
  }
}
@media screen and (max-width: 1050px) {
  .time-section-item{
    font-size: 18em;
  }
}
@media screen and (max-width: 900px) {
  .time-section-item{
    font-size: 14em;
  }
}
@media screen and (max-width: 700px) {
  .time-section-item{
    font-size: 10em;
  }
}
@media screen and (max-width: 500px) {
  .time-section-item{
    font-size: 50px;
  }
}
</style>
