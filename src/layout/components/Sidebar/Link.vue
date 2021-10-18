<template lang="pug">
component(:is="type" v-bind="linkProps(to)")
  slot
</template>

<script setup>
import { isExternal } from '@/utils/validate'
import { computed } from 'vue'
const props = defineProps({
  to: {
    type: String,
    required: true
  }
})
const isExternalValid = computed(() => isExternal(props.to))
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
</script>
