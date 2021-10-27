<template lang="pug">
el-dialog(title="新增员工" v-model="showDialog")
  el-form(label-width="120px" :rules="formRules")
    el-form-item(label="姓名" prop="formRules.username" :rules="formRules.length14")
      el-input(v-model="data.username" style="width: 50%" placeholder="请输入姓名")
    el-form-item(label="手机" prop="mobile" :rules="formRules.checkPhone")
      el-input(v-model="data.mobile" style="width: 50%" placeholder="请输入手机号")
    el-form-item(label="入职时间" prop="timeOfEntry" :rules="formRules.notNull")
      el-date-picker(v-model="data.timeOfEntry" style="width: 50%" placeholder="请选择入职时间")
    el-form-item(label="聘用形式" prop="formOfEmployment" :rules="formRules.notNull")
      el-select(v-model="data.formOfEmployment" style="width: 50%" placeholder="请选择")
    el-form-item(label="工号" prop="workNumber" :rules="formRules.notNull")
      el-input(v-model="data.workNumber" style="width: 50%" placeholder="请输入工号")
    el-form-item(label="部门" prop="departmentName" :rules="formRules.notNullChange")
      el-input(v-model="data.departmentName" style="width: 50%" placeholder="请选择部门")
    el-form-item(label="转正时间" prop="correctionTime" :rules="formRules.notNull")
      el-date-picker(v-model="data.correctionTime" style="width: 50%" placeholder="请选择转正时间")
  template(#footer)
    el-row(justify="center")
      el-col(:span="6")
        el-button(type="primary" size="small") 确定
        el-button(size="small") 取消        
</template>
<script setup>
import { reactive, toRefs } from 'vue'
defineProps({
  showDialog: { type: Boolean, default: false }
})
const formData = reactive({
  data: {
    username: '111',
    mobile: '',
    formOfEmployment: '',
    workNumber: '',
    departmentName: '',
    timeOfEntry: '',
    correctionTime: ''
  }
})
const { data } = toRefs(formData)
console.log(data)
</script>
