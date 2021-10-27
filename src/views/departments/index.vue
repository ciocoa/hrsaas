<template lang="pug">
el-card.tree-card(v-loading.lock="loading" element-loading-text="Loading...")
  tree-tools(:tree-data="company" @addDepts="addDepts" :is-root="true")
  el-tree(:data="deptsData.data" :props="{ label: 'name' }" default-expand-all)
    template(#default="{ data }")
      tree-tools(:tree-data="data" @addDepts="addDepts" @editDepts="editDepts" @delDepts="refDepartments")
  //- vue3 v-model 替代 .sync
  dept-panel(ref="deptPanelRef" v-model:show-dialog="deptsData.showDialog" :tree-node="deptsData.node" @addDepts="refDepartments")
</template>

<script setup>
import DeptPanel from './components/DeptPanel'
import TreeTools from './components/TreeTools'
import { tranListToTree } from '@/utils/filters'
import { getDepartments } from '@/api/departments'
import { ref, reactive, onMounted } from 'vue'
const company = reactive({ id: '', name: '', manager: '负责人' })
const deptsData = reactive({ showDialog: false, data: [], node: {} })
const deptPanelRef = ref(null)
const addDepts = node => {
  deptsData.showDialog = true
  deptsData.node = node
}
const editDepts = node => {
  deptsData.showDialog = true
  deptsData.node = node
  deptPanelRef.value.refDepartDetail(node.id)
}
const loading = ref(false)
const refDepartments = async () => {
  try {
    loading.value = true
    const { companyName, depts } = await getDepartments()
    company.name = companyName
    deptsData.data = [...tranListToTree(depts, '')]
  } catch (error) {
    console.log(error.message)
  } finally {
    loading.value = false
  }
}
onMounted(refDepartments())
</script>

<style lang="scss" scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
