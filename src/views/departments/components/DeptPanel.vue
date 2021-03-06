<template lang="pug">
el-dialog(:title="showTitle" v-model="showDialog" :show-close="false")
  el-form(ref="deptFormRef" :model="formData.data" :rules="rules" label-width="120px")
    el-form-item(label="部门名称" prop="name")
      el-input(v-model="formData.data.name" style="width: 80%" placeholder="1-50个字符")
    el-form-item(label="部门编码" prop="code")
      el-input(v-model="formData.data.code" style="width: 80%" placeholder="1-50个字符")
    el-form-item(label="部门负责人" prop="manager")
      el-select(v-model="formData.data.manager" @focus="refEmployeeSimple" style="width: 80%" placeholder="请选择")
        el-option(v-for="item in peoples" :key="item.id" :label="item.username" :value="item.username")
    el-form-item(label="部门介绍" prop="introduce")
      el-input(v-model="formData.data.introduce" style="width: 80%" placeholder="1-300个字符" type="textarea" :rows="3")
  template(#footer)
    el-row(justify="center")
      el-col(:span="8")
        el-button(@click="btnOK" size="small" type="primary") 确定
        el-button(@click="btnCancel" size="small") 取消
</template>

<script setup>
import { getDepartments, addDepartments, updateDepartments, getDepartDetail } from '@/api/departments'
import { getEmployeeSimple } from '@/api/employees'
import { elMsg } from '@/utils/message'
import { ref, reactive, computed } from 'vue'
const props = defineProps({
  showDialog: { type: Boolean, default: false },
  treeNode: { type: Object, default: null }
})
const formData = reactive({ data: { id: '', name: '', code: '', manager: '', introduce: '' } })
const checkNameRepeat = async (rule, value, callback) => {
  const { depts } = await getDepartments()
  let isRepeat = false
  if (formData.data.id)
    isRepeat = depts
      .filter(item => item.id !== formData.data.id && item.pid === props.treeNode.pid)
      .some(item => item.name === value)
  else isRepeat = depts.filter(item => item.pid === props.treeNode.id).some(item => item.name === value)
  isRepeat ? callback(new Error(`同级部门下已经有${value}的部门了`)) : callback()
}
const checkCodeRepeat = async (rule, value, callback) => {
  const { depts } = await getDepartments()
  let isRepeat = false
  if (formData.data.id) isRepeat = depts.some(item => item.id !== formData.data.id && item.code === value && value)
  else isRepeat = depts.some(item => item.code === value && value)
  isRepeat ? callback(new Error(`组织架构中已经有部门使用${value}编码`)) : callback()
}
const rules = reactive({
  name: [
    { required: true, message: '部门名称不能为空', trigger: 'blur' },
    { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: 'blur' },
    { trigger: 'blur', validator: checkNameRepeat }
  ],
  code: [
    { required: true, message: '部门编码不能为空', trigger: 'blur' },
    { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' },
    { trigger: 'blur', validator: checkCodeRepeat }
  ],
  manager: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],
  introduce: [
    { required: true, message: '部门介绍不能为空', trigger: 'blur' },
    { trigger: 'blur', min: 1, max: 300, message: '部门介绍要求1-50个字符' }
  ]
})
const peoples = reactive([])
const refEmployeeSimple = async () => peoples.push(...(await getEmployeeSimple()))
const showTitle = computed(() => (formData.data.id ? '编辑部门' : '添加子部门'))
// 回显部门详情，然后将方法暴露出去，以便父组件调用
const refDepartDetail = async id => (formData.data = await getDepartDetail(id))
defineExpose({ refDepartDetail })
const emit = defineEmits(['addDepts', 'update:showDialog'])
const deptFormRef = ref(null)
const btnOK = async () => {
  try {
    await deptFormRef.value.validate()
    if (formData.data.id) await updateDepartments(formData.data)
    else await addDepartments({ ...formData.data, pid: props.treeNode.id })
    emit('addDepts')
    elMsg('操作成功')
    emit('update:showDialog', false)
  } catch (error) {
    console.log(error.message)
  }
}
const btnCancel = () => {
  formData.data = { name: '', code: '', manager: '', introduce: '' }
  deptFormRef.value.resetFields()
  emit('update:showDialog', false)
}
</script>
