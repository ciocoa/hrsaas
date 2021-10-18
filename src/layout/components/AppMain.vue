<template lang="pug">
router-view(v-slot="{ Component }")
  transition(name="fade-transform" mode="out-in")
    .app-main(:class="{ 'show-tag-view': setting.needTagsView }" :key="key")
      keep-alive(:include="cachedViews")
        component(:is="Component" :key="key")
</template>

<script setup>
import setting from '@/settings'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()

const key = computed(() => route.path)
const cachedViews = computed(() => store.state.app.cachedViews)
</script>

<style lang="scss" scoped>
.app-main {
  padding: 10px;
  /*50 = navbar  */
  height: calc(100vh - #{$navBarHeight});
  width: 100%;
  position: relative;
  overflow: auto;
}
.show-tag-view {
  height: calc(100vh - #{$navBarHeight} - #{$tagViewHeight}) !important;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
