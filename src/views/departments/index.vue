<template lang="pug">
.departments-container 
  el-card.tree-card
    tree-tools(:tree-node="company" :is-root="true")
    el-tree(:data="data" :props="props" default-expand-all)
      template(#default="{data}")
        tree-tools(:tree-node="data")
</template>

<script setup>
import TreeTools from './components/TreeTools'
import { tranListToTree } from '@/utils/toTree'
import { getDepartments } from '@/api/departments'
import { reactive, onMounted } from 'vue'

const props = reactive({ label: 'name' })
const company = reactive({ name: '', manager: '负责人' })
const data = reactive([])
onMounted(async () => {
  const result = await getDepartments()
  company.name = result.companyName
  data.push(...tranListToTree(result.depts, ''))
})
</script>

<style lang="scss" scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
