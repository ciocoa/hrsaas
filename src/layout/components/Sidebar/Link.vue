<template lang="pug">
component(:is="type" v-bind="linkProps(to)")
  slot
</template>

<script setup>
import { isExternal } from '@/utils/validate'
import { onMounted, computed, getCurrentInstance, reactive } from 'vue'
let { proxy } = getCurrentInstance()
const props = defineProps({
  to: {
    type: String,
    required: true
  }
})
const isExternalValid = computed(() => isExternal(proxy.to))
const type = computed(() => {
  if (isExternalValid.value) return 'a'
  return 'router-link'
})
const linkProps = to => {
  if (isExternalValid.value)
    return {
      href: to,
      target: '_blank',
      rel: 'noopener'
    }
  return {
    to: to
  }
}
// const state = reactive({
//   levelList: null
// })
onMounted(() => {
  // console.log(state.levelList)
  // console.log(`链接为：${props.to}`)
})
</script>
