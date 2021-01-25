<template>
  <div class="search">
    <div class="search-header">
      <slot></slot>
    </div>
    <div class="search-footer">
      <el-button :size='size' type="default" @click="reset">重置</el-button>
      <el-button :size='size' type="primary" @click="confirm">查询</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VueTypes from 'vue-types'

export default defineComponent({
  props: {
    size: VueTypes.string.def('mini')
  },
  setup (prop, ctx) {
    function reset () {
      ctx.emit('reset')
    }

    function confirm () {
      ctx.emit('confirm')
    }

    return {
      reset,
      confirm
    }
  }
})
</script>

<style lang="scss" scoped>
@import '~@/design/_handler.scss';
.search{
  box-sizing: border-box;
  padding: 10px;
  @include bg-color('bg-color-default-light');
  &-footer{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 10px;
  }
}
</style>
