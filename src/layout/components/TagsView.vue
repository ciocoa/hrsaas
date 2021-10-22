<template lang="pug">
.tags-view-container(ref="containerRef")
  router-link.tags-view-item(v-for="tag in visitedViews" ref="refTag" :key="tag.path" :class="isActive(tag) ? 'active' : ''" :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }" tag="span" @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''" @contextmenu.prevent="openMenu(tag, $event)") {{ tag.title }}
    span.el-icon-close(v-if="!isAffix(tag)" @click.prevent.stop="closeSelectedTag(tag)")
  ul.contextmenu(v-show="visible" :style="{ left: left + 'px', top: top + 'px' }")
    li(@click="refreshSelectedTag(selectedTag)") 刷新
    li(v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)") 关闭
    li(@click="closeOthersTags") 关闭其他
    li(@click="closeAllTags(selectedTag)") 关闭所有
</template>

<script setup>
import path from 'path'
import { onMounted, watch, ref, toRefs, reactive, computed, nextTick } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
const store = useStore()
const route = useRoute()
const router = useRouter()
const state = reactive({
  visible: false,
  top: 0,
  left: 0,
  selectedTag: {},
  affixTags: []
})
const visitedViews = computed(() => store.state.tagsView.visitedViews)
const routes = computed(() => store.state.permission.routes)
watch(route, () => addTags())
watch(
  () => state.visible,
  value => {
    if (value) document.body.addEventListener('click', closeMenu)
    else document.body.removeEventListener('click', closeMenu)
  }
)
onMounted(() => {
  initTags(), addTags()
})
const isActive = item => item.path === route.path
const isAffix = tag => tag.meta && tag.meta.affix
const filterAffixTags = (routes, basePath = '/') => {
  let tags = []
  routes.forEach(item => {
    if (item.meta && item.meta.affix) {
      const tagPath = path.resolve(basePath, item.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: item.name,
        meta: { ...item.meta }
      })
    }
    if (item.children) {
      const tempTags = filterAffixTags(item.children, item.path)
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      }
    }
  })
  return tags
}
const initTags = () => {
  const affixTags = (state.affixTags = filterAffixTags(routes.value))
  for (const tag of affixTags) {
    if (tag.name) store.dispatch('tagsView/addVisitedView', tag)
  }
}
const addTags = () => {
  if (route.name) store.dispatch('tagsView/addView', route)
  return false
}
const refTag = ref(null)
const refScrollPane = ref(null)
const moveToCurrentTag = () => {
  nextTick(() => {
    for (const tag of tag.value.tag) {
      if (tag.to.path === route.path) {
        refScrollPane.value.moveToTarget(tag)
        if (tag.to.fullPath !== route.fullPath) {
          store.dispatch('tagsView/updateVisitedView', route)
        }
        break
      }
    }
  })
}
const refreshSelectedTag = view => {
  store.dispatch('tagsView/delCachedView', view).then(() => {
    nextTick(() => {
      router.replace({ path: '/redirect=' + view.fullPath })
    })
  })
}
const closeSelectedTag = view => {
  store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
    if (isActive(view)) toLastView(visitedViews, view)
  })
}
const closeOthersTags = () => {
  router.push(state.selectedTag)
  store.dispatch('tagsView/delOthersViews', state.selectedTag).then(() => moveToCurrentTag())
}
const closeAllTags = view => {
  store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
    if (state.affixTags.some(tag => tag.path === view.path)) return
    toLastView(visitedViews, view)
  })
}
const toLastView = (visitedViews, view) => {
  const latestView = visitedViews.slice(-1)[0]
  if (latestView) router.push(latestView.fullPath)
  else {
    if (view.name === 'Dashboard') router.replace({ path: '/redirect' + view.fullPath })
    else router.push('/')
  }
}
const containerRef = ref(null)
const openMenu = (tag, e) => {
  const menuMinWidth = 105
  const offsetLeft = containerRef.value.getBoundingClientRect().left // container margin left
  const offsetWidth = containerRef.value.offsetWidth // container width
  const maxLeft = offsetWidth - menuMinWidth // left boundary
  const left = e.clientX - offsetLeft + 15 // 15: margin right
  if (left > maxLeft) state.left = maxLeft
  else state.left = left
  state.top = e.clientY
  state.visible = true
  state.selectedTag = tag
}
const closeMenu = () => (state.visible = false)
let { visible, top, left, selectedTag } = toRefs(state)
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: $tagViewHeight;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 3px;
    &:first-of-type {
      margin-left: 10px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      background-color: #42b983;
      color: #fff;
      border-color: #42b983;
      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 2px;
      }
    }
  }
}
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-item {
  .el-icon-close {
    width: 16px;
    height: 16px;
    vertical-align: 2px;
    border-radius: 50%;
    text-align: center;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transform-origin: 100% 50%;
    &:before {
      transform: scale(0.6);
      display: inline-block;
      vertical-align: -3px;
    }
    &:hover {
      background-color: #b4bccc;
      color: #fff;
    }
  }
}
</style>
