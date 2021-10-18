<template lang="pug">
#Sidebar
  logo(:collapse="!isCollapse" v-if="settings.sidebarLogo")
  el-scrollbar.scrollbar-wrapper
    el-menu(mode="vertical" :active-text-color="variables.menuActiveText" :text-color="variables.menuText" :background-color="variables.menuBg" :collapse-transition="false" :default-active="activeMenu" :collapse="!isCollapse" :unique-opened="false")
      sidebar-item(v-for="route in routes" :key="route.path" :item="route" :base-path="route.path")
</template>

<script setup>
import settings from '@/settings'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()

const routes = computed(() => store.getters.routes)
const isCollapse = computed(() => store.getters.sidebar.opened)
const variables = computed(() => {
  return {
    menuText: '#fff',
    menuActiveText: '#74d68c',
    subMenuActiveText: '#dbad14',
    menuBg: 'transparent',
    menuHover: '#43a7fe',
    subMenuBg: '#1f2d3d',
    subMenuHover: '#43a7fe',
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

<style lang="scss" scoped>
.scrollbar-wrapper {
  background: url('@/assets/common/leftnavBg.png') no-repeat 0% 90%;
  .el-menu {
    border: none;
    height: 100%;
    width: 100% !important;
  }
}
</style>
