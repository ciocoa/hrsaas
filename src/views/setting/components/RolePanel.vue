<template lang="pug">
el-dialog(:title="showTitle" v-model="showDialog" :show-close="false")
  el-form(ref="roleFormRef" :model="formData.data" :rules="rules" label-width="120px")
    el-form-item(label="角色名称" prop="name")
      el-input(v-model="formData.data.name" style="width: 80%")
    el-form-item(label="角色描述")
      el-input(v-model="formData.data.description" style="width: 80%")
  template(#footer)
    el-row(justify="center")
      el-col(:span="8")
        el-button(@click="btnOK" size="small" type="primary") 确定
        el-button(@click="btnCancel" size="small") 取消
</template>

<script setup>
import { getRoleList, getRoleDetail, addRole, updateRole } from '@/api/setting'
import { elMsg } from '@/utils/message'
import { ref, reactive, computed } from 'vue'
const roleFormRef = ref(null)
defineProps({ showDialog: { type: Boolean, default: false } })
const formData = reactive({ data: { id: '', name: '', description: '' } })
const checkRoleName = async (rule, value, callback) => {
  let isRepeat = false
  const { rows } = await getRoleList()
  if (formData.data.id) isRepeat = rows.filter(item => item.id !== formData.data.id).some(item => item.name === value)
  else isRepeat = rows.some(item => item.name === value)
  isRepeat ? callback(new Error('该角色已存在')) : callback()
}
const showTitle = computed(() => (formData.data.id ? '编辑角色' : '新增角色'))
const emit = defineEmits(['refreshRole', 'update:showDialog'])
const rules = reactive({
  name: [
    { required: true, message: '角色名称不能为空', trigger: 'blur' },
    { trigger: 'blur', validator: checkRoleName }
  ]
})
const refRoleDetail = async id => (formData.data = await getRoleDetail(id))
defineExpose({ refRoleDetail })
const btnOK = async () => {
  try {
    await roleFormRef.value.validate()
    if (formData.data.id) await updateRole(formData.data)
    else await addRole(formData.data)
    emit('refreshRole')
    elMsg('操作成功')
    emit('update:showDialog', false)
  } catch (error) {
    console.log(error.message)
  }
}
const btnCancel = () => {
  formData.data = { id: '', name: '', description: '' }
  roleFormRef.value.resetFields()
  emit('update:showDialog', false)
}
</script>
