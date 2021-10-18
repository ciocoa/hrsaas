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
import { reactive } from 'vue'

const props = reactive({ label: 'name' })
const company = reactive({ name: '传智播客教育科技股份有限公司', manager: '负责人' })
const data = reactive([
  { name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
  { name: '行政部', manager: '刘备' },
  { name: '人事部', manager: '孙权' }
])
</script>

<style lang="scss" scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
