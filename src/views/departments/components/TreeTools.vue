<template lang="pug">
el-row(justify="space-between" align="middle" style="height: 40px; width: 100%")
  el-col(:span="12")
    span {{ treeNode.name }}
  el-col(:span="12")
    el-row(justify="end")
      el-col(:span="6") {{ treeNode.manager }}
      el-col(:span="6")
        el-dropdown(@command="operateDepts")
          span.el-dropdown-link 操作
            i.el-icon-arrow-down.el-icon--right
          template(#dropdown)
            el-dropdown-menu
              el-dropdown-item(command="add") 添加子部门
              el-dropdown-item(command="edit" v-if="!isRoot") 编辑部门
              el-dropdown-item(command="del" v-if="!isRoot") 删除部门
</template>
<script setup>
import { delDepartments } from '@/api/departments'
import { ElMessage, ElMessageBox } from 'element-plus'
const props = defineProps({
  treeNode: {
    type: Object,
    required: true
  },
  isRoot: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['delDepts', 'addDepts', 'editDepts'])
const operateDepts = type => {
  if (type === 'add') {
    // 添加
    emit('addDepts', props.treeNode)
  } else if (type === 'edit') {
    // 编辑
    emit('editDepts', props.treeNode)
  } else {
    // 删除
    ElMessageBox.confirm('确定要删除该部门吗？')
      .then(() => delDepartments(props.treeNode.id))
      .then(() => {
        emit('delDepts')
        ElMessage({ message: '删除部门成功！', type: 'success' })
      })
  }
}
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
