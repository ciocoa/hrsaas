<template lang="pug">
#Sidebar
  logo(:collapse="!isCollapse" v-if="settings.sidebarLogo")
  el-scrollbar(wrap-class="scrollbar-wrapper reset-menu-style")
    el-menu(mode="vertical" :active-text-color="variables.menuActiveText" :text-color="variables.menuText" :background-color="variables.menuBg" :collapse-transition="false" :default-active="activeMenu" :collapse="!isCollapse" :unique-opened="false")
      sidebar-item(v-for="route in routes" :key="route.path" :item="route" :base-path="route.path")
</template>

<script setup>
import { computed } from 'vue'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
//导入配置文件
import settings from '@/settings'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()
const route = useRoute()
let routes = computed(() => store.state.permission.routes)
const isCollapse = computed(() => store.getters.sidebar.opened)
const variables = computed(() => {
  return {
    menuText: '#fff',
    menuActiveText: '#409EFF',
    subMenuActiveText: '#f4f4f5',
    menuBg: 'transparent',
    menuHover: '#263445',
    subMenuBg: '#1f2d3d',
    subMenuHover: '#001528',
    sideBarWidth: '210px'
  }
})
const activeMenu = computed(() => {
  const { meta, fullPath } = route
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) return meta.activeMenu
  return fullPath
})
</script>

<style lang="scss">
.reset-menu-style {
  background: url('@/assets/common/leftnavBg.png') no-repeat 0 100%;
  .el-menu {
    border: none;
    height: 100%;
    width: 100% !important;
    a {
      li {
        .svg-icon {
          color: #fff;
          font-size: 18px;
          vertical-align: middle;
          .icon {
            color: #fff;
          }
        }
        span {
          color: #fff;
        }
        &:hover {
          .svg-icon {
            color: #43a7fe;
          }
          span {
            color: #43a7fe;
          }
        }
      }
    }
  }
}
</style>
