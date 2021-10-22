<template lang="pug">
el-card
  el-tabs
    el-tab-pane(label="角色管理")
      el-row(style="width: 60px")
        el-button(icon="el-icon-plus" size="small" type="primary" @click="showDialog = true") 新增角色
      el-table(stripe border :data="roleList.rows" style="margin-top: 15px")
        el-table-column(type="index" align="center" label="序号" width="120")
        el-table-column(prop="name" align="center" label="角色名称" width="240")
        el-table-column(prop="description" align="center" label="描述")
        el-table-column(align="center" label="操作" width="240")
          template(#default="{ row }")
            el-button(size="small" type="success") 分配权限
            el-button(size="small" type="primary" @click="editRole(row.id)") 编辑
            el-button(@click="delRole(row.id)" size="small" type="danger") 删除
      el-row(justify="center" align="middle" style="height: 60px")
        el-pagination(:current-page="rolePage.page" :page-size="rolePage.size" :total="rolePage.total" @current-change="changePage" layout="prev, pager, next" background)
    el-tab-pane(label="公司信息")
      el-alert(title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改！" type="info" show-icon :closable="false")
      el-form(label-width="120px" style="margin-top: 50px")
        el-form-item(label="公司名称")
          el-input(v-model="companyInfo.data.name" disabled style="width: 400px")
        el-form-item(label="公司地址")
          el-input(v-model="companyInfo.data.companyAddress" disabled style="width: 400px")
        el-form-item(label="公司邮箱")
          el-input(v-model="companyInfo.data.mailbox" disabled style="width: 400px")
        el-form-item(label="备注")
          el-input(v-model="companyInfo.data.remarks" disabled style="width: 400px" type="textarea" :rows="3" resize="none")
  role-panel(ref="rolePanelRef" v-model:show-dialog="showDialog" @refreshRole="refRoleList")
</template>

<script setup>
import RolePanel from './components/RolePanel'
import { getCompanyInfo, getRoleList, deleteRole } from '@/api/setting'
import { ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { ElMessage, ElMessageBox } from 'element-plus'
const store = useStore()
const rolePanelRef = ref(null)
const roleList = reactive({ rows: [] })
const rolePage = reactive({ page: 1, size: 10, total: 0 })
const companyInfo = reactive({ data: { name: '', companyAddress: '', mailbox: '', remarks: '' } })
const showDialog = ref(false)
const refRoleList = async () => {
  const { total, rows } = await getRoleList(rolePage)
  rolePage.total = total
  roleList.rows = rows
}
const changePage = newPage => {
  rolePage.page = newPage
  refRoleList()
}
const refCompanyInfo = async () => (companyInfo.data = await getCompanyInfo(store.getters.userInfo.companyId))
const delRole = async id => {
  try {
    await ElMessageBox.confirm('确认删除该角色吗')
    await deleteRole(id)
    refRoleList()
    ElMessage({ message: '删除角色成功', type: 'success' })
  } catch (error) {
    console.log(`角色信息操作错误：${error}`)
  }
}
const editRole = async id => {
  rolePanelRef.value.refRoleDetail(id)
  showDialog.value = true
}
onMounted(refRoleList(), refCompanyInfo())
</script>
