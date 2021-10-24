<template lang="pug">
page-tools(:show-before="true")
  template(#before)
    span 共166条记录
  template(#after)
    el-button(size="small" type="warning") 导入
    el-button(size="small" type="danger") 导出
    el-button(size="small" type="primary") 新增员工
el-card
  el-table(border)
    el-table-column(label="序号" sortable)
    el-table-column(label="姓名" sortable)
    el-table-column(label="工号" sortable)
    el-table-column(label="聘用形式" sortable)
    el-table-column(label="部门" sortable)
    el-table-column(label="入职时间" sortable)
    el-table-column(label="账户状态" sortable)
    el-table-column(label="操作" sortable fixed="right" width="280")
      template
        el-button(type="text" size="small") 查看
        el-button(type="text" size="small") 转正
        el-button(type="text" size="small") 调岗
        el-button(type="text" size="small") 离职
        el-button(type="text" size="small") 角色
        el-button(type="text" size="small") 删除
  el-row(justify="center" align="middle" style="height: 60px")
    el-pagination(:current-page="1" :page-size="5" :total="6" layout="prev, pager, next" background)
</template>

<script setup></script>

<style lang="scss" scoped></style>
