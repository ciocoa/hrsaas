<template>
  <svg-icon :icon-class="icon" className="nav-icon" />
</template>
<script setup>
defineProps({
  icon: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  elIcon: {
    type: Boolean,
    default: false
  }
})
</script>
