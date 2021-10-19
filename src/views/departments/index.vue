<template lang="pug">
.departments-container 
  el-card.tree-card
    tree-tools(:tree-node="company" @addDepts="addDepts" :is-root="true")
    el-tree(:data="data" :props="props" default-expand-all)
      template(#default="{data}")
        tree-tools(:tree-node="data" @addDepts="addDepts" @delDepts="refreshDepartments")
    //- vue3 v-model 替代 .sync
    add-dept(v-model:show-dialog="deptsNode.showDialog" :tree-node="deptsNode.node" @addDepts="refreshDepartments")
</template>

<script setup>
import AddDept from './components/AddDept'
import TreeTools from './components/TreeTools'
import { tranListToTree } from '@/utils/toTree'
import { getDepartments } from '@/api/departments'
import { ref, reactive, onMounted } from 'vue'

const props = reactive({ label: 'name' })
const company = reactive({ name: '', manager: '负责人', id: '' })
const data = ref(null)

const deptsNode = reactive({
  node: {},
  showDialog: false
})

const addDepts = node => {
  deptsNode.showDialog = true
  deptsNode.node = node
}

/**
 * 刷新组织架构数据
 */
const refreshDepartments = async () => {
  const result = await getDepartments()
  company.name = result.companyName
  data.value = [...tranListToTree(result.depts, '')]
}
onMounted(refreshDepartments())
</script>

<style lang="scss" scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
