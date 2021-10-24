<template lang="pug">
el-card.page-tools
  el-row(justify="space-between" align="middle")
    el-col(:span="12")
      .before(v-if="showBefore")
        i.el-icon-info
        slot(name="before")
    el-col(:span="12")
      el-row(justify="end")
        slot(name="after")
</template>

<script setup>
defineProps({
  showBefore: { type: Boolean, default: false }
})
</script>

<style lang="scss" scoped>
.page-tools {
  margin: 10px 0;
  .before {
    line-height: 34px;
    i {
      margin-right: 5px;
      color: #409eff;
    }
    display: inline-block;
    padding: 0px 10px;
    border-radius: 3px;
    border: 1px solid rgba(145, 213, 255, 1);
    background: rgba(230, 247, 255, 1);
  }
}
</style>
