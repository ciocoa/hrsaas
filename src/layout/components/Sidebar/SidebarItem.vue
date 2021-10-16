<template lang="pug">
template(v-if="!item.hidden")
  template(v-if="showSidebarItem(item.children, item)")
    Link(v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)")
      el-menu-item(:index="resolvePath(onlyOneChild.path)" :class="{ 'submenu-title-noDropdown': !isNest }")
        item(:icon="onlyOneChild.meta?.icon || item.meta?.icon")
        template(#title) {{ onlyOneChild.meta?.title }}
  el-sub-menu(v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body)
    template(#title)
      item(v-if="item.meta" :icon="item.meta && item.meta.icon")
      span {{ item.meta.title }}
    sidebar-item(v-for="child in item.children" :base-path="resolvePath(child.path)" :item="child" :key="child.path" :is-nest="true")
</template>

<script setup>
/*初始化参数比如引入组件，proxy,state等*/
import { getCurrentInstance, onMounted } from 'vue'
import Link from './Link'
import Item from './Item'
import { isExternal } from '@/utils/validate'
import path from 'path'
let { proxy } = getCurrentInstance()
defineProps({
  //每一个router Item
  item: {
    type: Object,
    required: true
  },
  //用于判断是不是子Item,设置响应的样式
  isNest: {
    type: Boolean,
    default: false
  },
  //基础路径，用于拼接
  basePath: {
    type: String,
    default: ''
  }
})
onMounted(() => {
  // console.log("我挂载了");
  // console.log(proxy.item);
})
//显示sidebarItem 的情况
proxy.onlyOneChild = null
let showSidebarItem = (children = [], parent) => {
  const showingChildren = children.filter(item => {
    if (item.hidden) {
      return false
    } else {
      // Temp set(will be used if only has one showing child)
      proxy.onlyOneChild = item
      return true
    }
  })
  if (showingChildren.length === 1 && !parent?.alwaysShow) {
    return true
  }
  if (showingChildren.length === 0) {
    proxy.onlyOneChild = { ...parent, path: '', noChildren: true }
    return true
  }
  return false
}
let resolvePath = routePath => {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(proxy.basePath)) {
    return proxy.basePath
  }
  return path.resolve(proxy.basePath, routePath)
}
</script>
