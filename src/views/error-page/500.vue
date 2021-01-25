<template>
  <div class="error-page">
    <img src="../../assets/errorImages/500.png" alt="页面出错">
    <p class="text">500</p>
    <div>
      <el-button type='success' size='small' icon='el-icon-back' @click="goBack">返回上一页</el-button>
      <el-button type='primary' size='small' icon='el-icon-s-home' @click="backIndex">返回首页</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { back } from './backIndex'
import { defineComponent } from 'vue'
export default defineComponent({
  setup () {
    const { backIndex, goBack } = back()
    return { backIndex, goBack }
  }
})
</script>

<style lang="scss" scoped>
@import './errorPage.scss'
</style>
