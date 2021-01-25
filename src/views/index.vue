<template>
  <div class="index">
    <search @reset="reset" @confirm='confirm'>
      <el-form :inline='true' size='small'>
        <el-form-item label="测试">
          <el-input v-model="searchValue" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
    </search>
  </div>
</template>

<script lang="ts">
import Search from '@/components/search/search.vue'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  components: { Search },
  setup () {
    const searchValue = ref('')
    function reset () {
      console.log(searchValue.value)
    }

    function confirm () {
      console.log(searchValue.value)
    }

    return {
      confirm,
      reset,
      searchValue
    }
  }
})
</script>
<style lang="scss" scoped>
@import '~@/design/_handler.scss';
.index{
  width: 100%;
  height: 100%;
}
</style>
