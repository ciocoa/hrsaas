<template lang="pug">
el-dialog(title="新增部门" v-model="showDialog" @close="btnCancel")
  el-form(ref="deptForm" :model="formData" :rules="rules" label-width="120px")
    el-form-item(label="部门名称" prop="name")
      el-input(v-model="formData.name" style="width: 80%" placeholder="1-50个字符")
    el-form-item(label="部门编码" prop="code")
      el-input(v-model="formData.code" style="width: 80%" placeholder="1-50个字符")
    el-form-item(label="部门负责人" prop="manager")
      el-select(v-model="formData.manager" @focus="refreshEmployeeSimple" style="width: 80%" placeholder="请选择")
        el-option(v-for="item in peoples" :key="item.id" :label="item.username" :value="item.username")
    el-form-item(label="部门介绍" prop="introduce")
      el-input(v-model="formData.introduce" style="width: 80%" placeholder="1-300个字符" type="textarea" :rows="3")
  template(#footer)
    el-row(justify="center")
      el-col(:span="8")
        el-button(type="primary" size="small" @click="btnOK") 确定
        el-button(size="small" @click="btnCancel") 取消
</template>
<script setup>
import { getDepartments, addDepartments } from '@/api/departments'
import { getEmployeeSimple } from '@/api/employees'
import { ref, reactive } from 'vue'
const props = defineProps({
  showDialog: {
    type: Boolean,
    default: false
  },
  treeNode: {
    type: Object,
    default: null
  }
})
const formData = reactive({
  name: '',
  code: '',
  manager: '',
  introduce: ''
})
const checkNameRepeat = async (rule, value, callback) => {
  const { depts } = await getDepartments()
  const isRepeat = depts.filter(item => item.pid === props.treeNode.id).some(item => item.name === value)
  isRepeat ? callback(new Error(`同级部门下已经有${value}的部门了`)) : callback()
}
const checkCodeRepeat = async (rule, value, callback) => {
  const { depts } = await getDepartments()
  const isRepeat = depts.some(item => item.code === value && value)
  isRepeat ? callback(new Error(`组织架构中已经有部门使用${value}编码`)) : callback()
}
const rules = reactive({
  name: [
    { required: true, message: '部门名称不能为空', trigger: 'blur' },
    { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: 'blur' },
    {
      trigger: 'blur',
      validator: checkNameRepeat // 自定义函数的形式校验
    }
  ],
  code: [
    { required: true, message: '部门编码不能为空', trigger: 'blur' },
    { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' },
    {
      trigger: 'blur',
      validator: checkCodeRepeat // 自定义函数的形式校验
    }
  ],
  manager: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],
  introduce: [
    { required: true, message: '部门介绍不能为空', trigger: 'blur' },
    { trigger: 'blur', min: 1, max: 300, message: '部门介绍要求1-50个字符' }
  ]
})

const peoples = reactive([])
/**
 * 刷新员工简单数据列表
 */
const refreshEmployeeSimple = async () => {
  peoples.push(...(await getEmployeeSimple()))
  console.log(peoples)
}

const emit = defineEmits(['addDepts', 'update:showDialog'])
const deptForm = ref(null)
const btnOK = () => {
  deptForm.value.validate(isOK => {
    if (isOK) {
      addDepartments({ ...formData, pid: props.treeNode.id })
      emit('addDepts')
      emit('update:showDialog', false)
    }
  })
}
const btnCancel = () => {
  deptForm.value.resetFields()
  emit('update:showDialog', false)
}
</script>
