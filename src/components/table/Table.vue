<template>
  <el-table
    :data="tableData"
    :border='config.border'
    :stripe='config.stripe'
    :size='config.size'
    :height='config.height ? config.height : null'
    :max-height='config.maxHeight ? config.maxHeight : null'
    :highlight-current-row='config.highlightCurrentRow ? config.highlightCurrentRow : false'
    @selection-change="handleSelectionChange"
    style="width: 100%">
    <el-table-column v-if="config.selection" type="selection" width="55"></el-table-column>
    <template :key="index" v-for="(column, index) in columns">
      <el-table-column
        :prop="column.prop"
        :label="column.label"
        :width="column.width ? column.width : null"
        :min-width="column.minWidth ? column.minWidth : null"
        :sortable="column.sortable ? column.sortable : false"
        :formatter="column.formatter ? column.formatter : null"
        :show-overflow-tooltip="column.showOverflowTooltip ? column.showOverflowTooltip : false"
      >
      </el-table-column>
    </template>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template #default="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TableConfig } from '../types'
import VueTypes from 'vue-types'
import { Size } from '@/enums/components'

const tableConfig: TableConfig = {
  border: true,
  size: Size.mini,
  stripe: true,
  highlightCurrentRow: true,
  selection: true
}

export default defineComponent({
  props: {
    columns: VueTypes.array,
    tableData: VueTypes.array.isRequired,
    config: VueTypes.object.def(tableConfig)
  },

  setup (prop, ctx) {
    function handleSelectionChange (val: object[]) {
      if (!tableConfig.selection) return
      ctx.emit('select', val)
    }

    return { handleSelectionChange }
  }
})
</script>
