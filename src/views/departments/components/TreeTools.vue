<template lang="pug">
el-row(justify="space-between" align="middle" style="height: 40px; width: 100%")
  el-col(:span="12")
    span {{ treeNode.name }}
  el-col(:span="12")
    el-row(justify="end")
      el-col(:span="6") {{ treeNode.manager }}
      el-col(:span="6")
        el-dropdown
          span.el-dropdown-link 操作
            i.el-icon-arrow-down.el-icon--right
          template(#dropdown)
            el-dropdown-menu
              el-dropdown-item 添加子部门
              el-dropdown-item(v-if="!isRoot") 编辑子部门
              el-dropdown-item(v-if="!isRoot") 删除子部门
</template>
<script setup>
defineProps({
  treeNode: {
    type: Object,
    required: true
  },
  isRoot: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  .el-icon-arrow-down {
    font-size: 14px;
  }
}
</style>
