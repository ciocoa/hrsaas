<template lang="pug">
page-tools(show-before)
  template(#before)
    span 你好 {{ username }}
  template(#after)
    el-button(type="primary") 导入 Excel
upload-excel
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const username = computed(() => store.getters.userInfo.username)
</script>

<style lang="scss" scoped></style>
