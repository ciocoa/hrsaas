<template lang="pug">
.dashboard-container
  .dashboard-text name:::::: {{ username }}
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const username = computed(() => store.getters.userInfo.username)
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
