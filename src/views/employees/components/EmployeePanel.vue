<template lang="pug">
el-dialog(title="新增员工" v-model="showDialog" :show-close="false")
  el-form(label-width="100px" ref="formRef" :model="data" :rules="formRules")
    el-form-item(label="姓名" prop="username" :rules="formRules.length14")
      el-input(v-model="data.username" style="width: 80%" placeholder="请输入姓名")
    el-form-item(label="手机" prop="mobile" :rules="formRules.checkPhone")
      el-input(v-model="data.mobile" style="width: 80%" placeholder="请输入手机号")
    el-form-item(label="入职时间" prop="timeOfEntry" :rules="formRules.notNull")
      el-date-picker(v-model="data.timeOfEntry" style="width: 80%" placeholder="请选择入职时间")
    el-form-item(label="聘用形式" prop="formOfEmployment" :rules="formRules.notNull")
      el-select(v-model="data.formOfEmployment" style="width: 80%" placeholder="请选择")
        el-option(v-for="item in EmployeeEnum.hireType" :key="item.id" :label="item.value" :value="item.id")
    el-form-item(label="工号" prop="workNumber" :rules="formRules.notNull")
      el-input(v-model="data.workNumber" style="width: 80%" placeholder="请输入工号")
    el-form-item(label="部门" prop="departmentName" :rules="formRules.notNullChange")
      el-input(v-model="data.departmentName" style="width: 80%" placeholder="请选择部门" @focus="refDepartments")
      el-tree(v-if="showTree" v-loading="loading" :data="treeData" :props="{ label: 'name' }" @node-click="selectNode" default-expand-all)
    el-form-item(label="转正时间" prop="correctionTime" :rules="formRules.notNull")
      el-date-picker(v-model="data.correctionTime" style="width: 80%" placeholder="请选择转正时间")
  template(#footer)
    el-row(justify="center")
      el-col(:span="8")
        el-button(type="primary" size="small" @click="btnOK") 确定
        el-button(size="small" @click="btnCancel") 取消        
</template>
<script setup>
import { ref, reactive, toRefs } from 'vue'
import { addEmployee } from '@/api/employees'
import { getDepartments } from '@/api/departments'
import { tranListToTree } from '@/utils/filters'
import { elMsg } from '@/utils/message'
import EmployeeEnum from '@/api/constant/employees'
defineProps({
  showDialog: { type: Boolean, default: false }
})
const formRef = ref(null)
const formData = reactive({
  data: {
    username: '',
    mobile: '',
    formOfEmployment: '',
    workNumber: '',
    departmentName: '',
    timeOfEntry: '',
    correctionTime: ''
  },
  treeData: [],
  showTree: false,
  loading: false
})
const { data, treeData, showTree, loading } = toRefs(formData)
const refDepartments = async () => {
  formData.showTree = true
  formData.loading = true
  const { depts } = await getDepartments()
  formData.treeData = tranListToTree(depts, '')
  formData.loading = false
}
const selectNode = node => {
  formData.data.departmentName = node.name
  formData.showTree = false
}
const emit = defineEmits(['addEmployees', 'update:showDialog'])
const btnOK = async () => {
  try {
    await formRef.value.validate()
    await addEmployee(formData.data)
    emit('addEmployees')
    elMsg('操作成功')
    emit('update:showDialog', false)
  } catch (error) {
    console.log(error.message)
  }
}
const btnCancel = () => {
  formData.data = {
    username: '',
    mobile: '',
    formOfEmployment: '',
    workNumber: '',
    departmentName: '',
    timeOfEntry: '',
    correctionTime: ''
  }
  formRef.value.resetFields()
  emit('update:showDialog', false)
}
</script>
