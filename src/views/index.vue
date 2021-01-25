<template>
  <div class="index">
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup () {
    const show = ref(true)

    function tig () {
      show.value = !show.value
    }

    return {
      tig,
      show
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
