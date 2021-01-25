import { Component } from 'vue'
import { RouteRecordRaw } from 'vue-router'

declare type Lazy<T> = () => Promise<T>

export type RawRouteComponent = Component | Lazy<Component>

export interface RoutesMeta {
  title: string
  icon: string
  btns?: string[],
  parentName?: string,
  parentIcon?: string,
  parentPath?: string
}
export interface RoutesList {
  path: string
  meta: RoutesMeta,
  component: string | RawRouteComponent
  children?: RoutesList[]
}