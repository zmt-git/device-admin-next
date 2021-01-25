import { defineComponent } from 'vue'
import { Size } from '@/enums/components'

export type Component = ReturnType<typeof defineComponent>;

interface Formatter {
  (row: any, column: any, cellValue: any, index: number): void
}

export interface TableColumn {
  prop: string
  label: string
  width?: number
  minWidth?: number
  sortable?: boolean
  popover?: boolean
  formatter?: Formatter
  showOverflowTooltip?: boolean,
  customStyle?: boolean
}

export interface TableConfig {
  height?: string
  maxHeight?: string
  stripe?: boolean
  border?: boolean
  size?: Size
  highlightCurrentRow?: boolean,
  selection?: boolean
}