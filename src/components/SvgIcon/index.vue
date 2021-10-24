<template lang="pug">
svg(:class="svgClass" aria-hidden="true")
  use(:xlink:href="iconName")
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  iconClass: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  }
  // color: {
  //   type: String,
  //   default: '#889aa4',
  // }
})
const iconName = computed(() => `#icon-${props.iconClass}`)
const svgClass = computed(() => {
  if (props.className) return `svg-icon ${props.className}`
  return 'svg-icon'
})
</script>

<style>
.sub-el-icon,
.nav-icon {
  display: inline-block;
  font-size: 15px;
  margin-right: 12px;
  position: relative;
}
.svg-icon {
  width: 1em;
  height: 1em;
  position: relative;
  top: -0.07em;
  fill: currentColor;
  vertical-align: middle;
}
</style>
