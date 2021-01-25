<template>
  <div class="login">
    <div class="form-container">
      <p class="login-tit">设备管控平台</p>
      <el-form :model="ruleForm" status-icon label-width="0px" :rules='rules' ref="form" class="login-form">
        <el-form-item label="" prop="username">
          <el-input
            v-model="ruleForm.username"
            autocomplete="off"
            placeholder="用户名"
            clearable
            tabindex='1'
            @keyup.enter="submitForm"
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            placeholder="密码"
            tabindex='2'
            clearable
            @keyup.enter="submitForm"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <el-button class="btn" size='small' type="primary" :disabled='disabled' :loading='loading' @click="submitForm">登录</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { userStore } from '@/store/modules/user'
import router from '@/router'
import { computed, defineComponent, reactive, ref } from 'vue'
export default defineComponent({
  setup () {
    const form = ref()

    const ruleForm = reactive({
      username: '',
      password: ''
    })

    const rules = {
      username: [{ required: true, message: '请输入用户名', trigger: 'change' }],
      password: [{ required: true, message: '请输入密码', trigger: 'change' }]
    }

    const disabled = computed(() => {
      return (!ruleForm.username || !ruleForm.password)
    })

    const loading = ref(false)

    function submitForm () {
      form.value.validate(async (valid: boolean) => {
        loading.value = true
        if (valid) {
          await userStore.login(ruleForm)
            .then(res => {
              console.log(res)
              router.push('/')
            })
            .catch(e => console.log(e))
          loading.value = false
        }
      })
    }

    return {
      form,
      rules,
      loading,
      ruleForm,
      disabled,
      submitForm
    }
  }
})
</script>

<style lang="scss" scoped>
$color1: #1abfec;
.login{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-size: cover;
  background-image: url('../../assets/bg/loginBg.png');
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.form-container{
  width: 300px;
  height: 350px;
  margin-right: 100px;
  background-color: rgba(22, 56, 120, .9);
  border: 1px solid $color1;
  border-radius: 10px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  /deep/ .el-button--primary {
    color: $color1;
    border: 1px solid $color1;
    background-color: #1abfec26;
    border-color: $color1;
    transition: all .3s;
  }
  /deep/ .is-disabled{
    color: #1abfec82;
    border: 1px solid $color1;
    background-color: #1abfec26;
    border-color: #1abfec26;
    transition: all .3s;
  }
}
@media screen and (max-width: 500px) {
  .login{
    justify-content: center;
  }
  .form-container{
    margin-right: 0;
  }
}
.login-tit{
  text-align: center;
  font-size: 26px;
  margin: 30px;
  color: $color1;
}
.login-form{
  margin-top: 10px;
  /deep/ .el-form-item__label{
    color: #fff;
  }
  /deep/ .el-input__inner{
    width: 250px;
    background-color: #1a449400;
    border: 1px solid $color1;
    color: $color1;
  }
  /deep/ .el-input__suffix i{
    color: $color1;
  }

  /deep/ .el-input__inner::placeholder{
    color: rgba(255, 255, 255, 0.418);
  }
}
.btn{
  width: 250px;
}
</style>
