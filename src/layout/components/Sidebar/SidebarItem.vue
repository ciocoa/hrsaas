<template lang="pug">
template(v-if="!item.hidden")
  template(v-if="showSidebarItem(item.children, item)")
    component(v-if="onlyOneChild.meta" :is="type" v-bind="linkProps")
      el-menu-item(:index="resolvePath(onlyOneChild.path)" :class="{ 'submenu-title-noDropdown': !isNest }")
        svg-icon(:icon-class="(onlyOneChild.meta?.icon || item.meta?.icon)" className="nav-icon")
        template(#title) {{ onlyOneChild.meta?.title }}
</template>

<script setup>
import { isExternal } from '@/utils/filters'
import { ref, computed } from 'vue'
import { resolve } from 'path'

const props = defineProps({
  /** 每一个router Item */
  item: { type: Object, required: true },
  /** 用于判断是不是子Item,设置响应的样式 */
  isNest: { type: Boolean, default: false },
  /** 基础路径，用于拼接 */
  basePath: { type: String, default: '' }
})
// 显示 sidebarItem 的情况
const onlyOneChild = ref(null)
const showSidebarItem = (children = [], parent) => {
  const showingChildren = children.filter(item => {
    if (item.hidden) return false
    else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild.value = item
      return true
    }
  })
  if (showingChildren.length === 1 && !parent?.alwaysShow) return true
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noChildren: true }
    return true
  }
  return false
}
const to = computed(() => resolvePath(onlyOneChild.value.path))
const type = computed(() => {
  if (isExternal(to.value)) return 'a'
  return 'router-link'
})
const linkProps = computed(() => {
  if (isExternal(to.value)) return { href: to.value, target: '_blank', rel: 'noopener' }
  return { to: to.value }
})
const resolvePath = routePath => {
  if (isExternal(routePath)) return routePath
  if (isExternal(props.basePath)) return props.basePath
  return resolve(props.basePath, routePath)
}
</script>
