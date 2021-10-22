<template lang="pug">
el-row(justify="space-between" align="middle" style="height: 40px; width: 100%")
  el-col(:span="12")
    span {{ treeData.name }}
  el-col(:span="12")
    el-row(justify="end")
      el-col(:span="6") {{ treeData.manager }}
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
  treeData: {
    type: Object,
    required: true
  },
  isRoot: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['addDepts', 'editDepts', 'delDepts'])
const operateDepts = type => {
  if (type === 'add') emit('addDepts', props.treeData)
  else if (type === 'edit') emit('editDepts', props.treeData)
  else {
    ElMessageBox.confirm('确定要删除该部门吗')
      .then(() => delDepartments(props.treeData.id))
      .then(() => {
        emit('delDepts')
        ElMessage({ message: '删除部门成功', type: 'success' })
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
