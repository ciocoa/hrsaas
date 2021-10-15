<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo" />
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo" />
      </router-link>
    </transition>
  </div>
</template>

<script setup>
import { toRefs, reactive } from 'vue'
import setting from '@/settings'
defineProps({
  collapse: {
    type: Boolean,
    required: true
  }
})
const state = reactive({
  title: setting.title,
  logo: 'src/assets/common/logo.png'
})
//export to page for
let { logo } = toRefs(state)
</script>

<style lang="scss">
/*
   vue3.0 过度效果
   enter-> enter-from
   leave-> leave-from
  */
.sidebarLogoFade-enter-active {
  transition: opacity 2s;
}
.sidebarLogoFade-enter-from,
.sidebarLogoFade-leave-to {
  opacity: 0;
}
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  overflow: hidden;
  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    & .sidebar-logo {
      width: 140px;
      height: 36px;
      vertical-align: middle;
      margin-right: 12px;
    }
  }
  &.collapse {
    .sidebar-logo {
      margin-right: 0;
      width: 32px;
      height: 32px;
    }
  }
}
</style>
