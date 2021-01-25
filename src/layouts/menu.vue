<template>
  <div class="menu-container" :class="isCollapse ? '' : 'menus'">
    <router-link class="plate" :class="isCollapse ? 'plate-collapse' : ''" to="/">
      <i class="plate-icon el-icon-s-help"></i>
      <span class="plate-name" v-show="!isCollapse">{{platename}}</span>
    </router-link>
    <el-menu :collapse="isCollapse" :unique-opened='true' :router='true'>
      <template v-for="route in routes" :key="route.path">

        <el-submenu :index="route.path">
          <template #title>
            <i class="iconfont menu-icon" :class="route.meta.icon"></i>
            <span class="menu-title">{{t(route.meta.title)}}</span>
          </template>

          <template v-if="route.children && route.children.length > 0">

            <el-menu-item v-for="subRoute in route.children"
              :key="subRoute.path"
              :index='route.path + "/" + subRoute.path'
            >
              <template #title>
                <i class="iconfont menu-icon" :class="subRoute.meta.icon"></i>
                <span class="menu-title">{{t(subRoute.meta.title)}}</span>
              </template>
            </el-menu-item>

          </template>

        </el-submenu>

      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { routesStore } from '@/store/modules/routes'
import { defineComponent } from 'vue'
import { projectSetting } from '@/settings/projectSetting'
import VueTypes from 'vue-types'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  props: {
    isCollapse: VueTypes.bool.isRequired
  },
  setup () {
    const platename = projectSetting.plateName

    const routes = routesStore.getDynamicRoutes

    const { t } = useI18n()

    return { platename, routes, t }
  }
})
</script>

<style lang="scss" scoped>
@import '~@/design/_handler.scss';
.menu-container{
  display: flex;
  flex-direction: column;
  border-right: 1px solid;
  @include bg-color('bg-color-default');
  @include border-color('border-color-default');
  @include color('text-color-default');
  /deep/ .el-submenu__title{
    @include color('text-color-default');
  }
  /deep/ .el-menu-item{
    @include color('text-color-default');
    @include bg-color('bg-color-default-heavy')
  }
  /deep/ .el-submenu__title i{
    @include color('text-color-default');
  }
  /deep/ .el-menu-item i{
    @include color('text-color-default');
  }
}
.plate{
  height: 50px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-bottom: 1px solid;
  @include color('text-color-default');
  @include border-color('border-color-default');
  padding: 0 20px;
  font-size: 18px;
  &-icon {
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
    vertical-align: middle;
  }
}
.plate-collapse{
  justify-content: center;
}
.menus{
  width: 200px;
  overflow: hidden;
}
.menu-icon{
  margin-right: 5px;
  width: 20px;
  display: inline-block;
  text-align: center;
}
</style>
