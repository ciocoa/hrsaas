<template lang="pug">
upload-excel(:on-success="success")
</template>

<script setup>
import { formatExcelDate } from '@/utils/filters'
import { importEmployee } from '@/api/employees'
import { elMsg } from '@/utils/message'
import { useRouter } from 'vue-router'
const router = useRouter()
const success = async ({ header, results }) => {
  const userRelations = {
    入职日期: 'timeOfEntry',
    手机号: 'mobile',
    姓名: 'username',
    转正日期: 'correctionTime',
    工号: 'workNumber'
  }
  const newArr = results.map(item => {
    const userInfo = {}
    Object.keys(item).forEach(key => {
      userInfo[userRelations[key]] = item[key]
      if (userRelations[key] === 'timeOfEntry' || userRelations[key] === 'correctionTime')
        userInfo[userRelations[key]] = new Date(formatExcelDate(item[key], '/'))
    })
    return userInfo
  })
  await importEmployee(newArr)
  elMsg('导入 Excel 成功')
  router.go(-1)
}
</script>
