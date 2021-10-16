<template lang="pug">
.sidebar-logo-container(:class="{ collapse: collapse }")
  transition(name="sidebarLogoFade")
    router-link.sidebar-logo-link(v-if="collapse" key="collapse" to="/")
      img.sidebar-logo(v-if="logo" :src="logo")
    router-link.sidebar-logo-link(v-else key="expand" to="/")
      img.sidebar-logo(v-if="logo" :src="logo")
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
let { logo } = toRefs(state)
</script>

<style lang="scss" scoped>
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
  height: 64px;
  line-height: 64px;
  text-align: center;
  overflow: hidden;
  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    & .sidebar-logo {
      width: 140px;
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
