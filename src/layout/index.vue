<template lang="pug">
.layout-wrapper(:class="classObj")
  sidebar.sidebar-container(v-if="settings.showLeftMenu")
  .main-container
    div 
      navbar
      tags-view(v-if="settings.needTagsView")
    app-main
</template>

<script setup>
import settings from '@/settings'
import ResizeHook from './hook/ResizeHandler'
import { Sidebar, Navbar, AppMain, TagsView } from './components'
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const opened = computed(() => store.getters.sidebar.opened)
const classObj = computed(() => {
  return { closeSidebar: !opened.value, hideSidebar: !settings.showLeftMenu }
})
ResizeHook()
</script>

<style lang="scss" scoped>
.layout-wrapper {
  overflow: hidden;
  //display: flex;
  //align-content: start;
  //justify-content: start;
}
.main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: $sideBarWidth;
  position: relative;
}
.sidebar-container {
  transition: width 0.28s;
  width: $sideBarWidth !important;
  background: $menuBg;
  height: 100%;
  position: fixed;
  font-size: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}
.closeSidebar {
  .sidebar-container {
    width: 54px !important;
  }
  .main-container {
    margin-left: 54px !important;
  }
}
.hideSidebar {
  .sidebar-container {
    width: 0 !important;
  }
  .main-container {
    margin-left: 0;
  }
}
</style>
