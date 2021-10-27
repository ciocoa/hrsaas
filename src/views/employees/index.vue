<template lang="pug">
page-tools(:show-before="true")
  template(#before)
    span 共{{ tableData.pages.total }}条记录
  template(#after)
    el-button(size="small" type="warning") 导入
    el-button(size="small" type="danger") 导出
    el-button(size="small" type="primary" icon="el-icon-plus" @click="tableData.showDialog = true") 新增员工
el-card(v-loading="tableData.loading" element-loading-text="Loading...")
  el-table(border :data="tableData.rows")
    el-table-column(sortable align="center" label="序号" type="index")
    el-table-column(sortable align="center" label="姓名" prop="username")
    el-table-column(sortable align="center" label="手机号" prop="mobile")
    el-table-column(sortable align="center" label="工号" prop="workNumber")
    el-table-column(sortable align="center" label="聘用形式" prop="formOfEmployment" :formatter="employmentFormat")
    el-table-column(sortable align="center" label="部门" prop="departmentName")
    el-table-column(sortable align="center" label="入职时间" prop="timeOfEntry" :formatter="timeOfEntryFormat")
    el-table-column(sortable align="center" label="是否在职" prop="inServiceStatus" :formatter="inServiceFormat")
    el-table-column(sortable align="center" label="状态" prop="enableState")
      template(#default="{row}")
        el-switch(:value="row.enableState === 1")
    el-table-column(sortable align="center" label="操作"  fixed="right" width="280")
      template(#default="{row}")
        el-button(type="text" size="small") 查看
        el-button(type="text" size="small") 转正
        el-button(type="text" size="small") 调岗
        el-button(type="text" size="small") 离职
        el-button(type="text" size="small") 角色
        el-button(type="text" size="small" @click="deleteEmployee(row.id)") 删除
  el-row(justify="center" align="middle" style="height: 60px")
    el-pagination(@current-change="changePage" :current-page="tableData.pages.page" :page-size="tableData.pages.size" :total="tableData.pages.total" layout="prev, pager, next" background)
employee-panel(v-model:show-dialog="tableData.showDialog" @addEmployees="refEmployeeList")
</template>

<script setup>
import EmployeePanel from './components/EmployeePanel'
import { formatDate } from '@/utils/filters'
import { elMsg, elConfirm } from '@/utils/message'
import EmployeeEnum from '@/api/constant/employees'
import { delEmployee, getEmployeeList } from '@/api/employees'
import { reactive, onMounted } from 'vue'

const tableData = reactive({
  loading: false,
  showDialog: false,
  rows: [],
  pages: { page: 1, size: 10, total: 0 }
})
const changePage = newPage => {
  tableData.pages.page = newPage
  refEmployeeList()
}
const refEmployeeList = async () => {
  tableData.loading = true
  const { total, rows } = await getEmployeeList(tableData.pages)
  tableData.pages.total = total
  tableData.rows = rows
  tableData.loading = false
}
onMounted(refEmployeeList())
const employmentFormat = (row, column, cellValue, index) => {
  const obj = EmployeeEnum.hireType.find(item => item.id === cellValue)
  return obj ? obj.value : '未知'
}
const timeOfEntryFormat = (row, column, cellValue, index) => formatDate(cellValue)
const inServiceFormat = (row, column, cellValue, index) => {
  const obj = EmployeeEnum.workingState.find(item => item.id === cellValue)
  return obj ? obj.value : '未知'
}
const deleteEmployee = async id => {
  try {
    await elConfirm('确定删除该员工吗')
    await delEmployee(id)
    refEmployeeList()
    elMsg('删除成功')
  } catch (error) {
    console.log(error.message)
  }
}
</script>
