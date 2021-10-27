<template lang="pug">
.upload-excel
  .btn-upload
    el-button(v-loading="loading" size="mini" type="primary" @click="handleUpload") 点击上传
    input.excel-upload-input(ref="inputRef" type="file" accept=".xlsx, .xls" @change="handleClick")
  .drop(@drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover")
    i.el-icon-upload
    span 将文件拖到此处
</template>

<script setup>
import { elMsg } from '@/utils/message'
import { isExcel } from '@/utils/filters'
import xlsx from 'xlsx'
import { ref, reactive } from 'vue'
const inputRef = ref(null)
const props = defineProps({
  beforeUpload: Function,
  onSuccess: Function
})
const data = reactive({
  loading: false,
  excelData: {
    header: null,
    results: null
  }
})
const getHeaderRow = sheet => {
  const headers = []
  const range = xlsx.utils.decode_range(sheet['!ref'])
  const R = range.s.r
  for (let C = range.s.c; C <= range.e.c; ++C) {
    const cell = sheet[xlsx.utils.encode_cell({ c: C, r: R })]
    let hdr = 'UNKNOWN ' + C
    if (cell && cell.t) hdr = xlsx.utils.format_cell(cell)
    headers.push(hdr)
  }
  return headers
}
const generateData = ({ header, results }) => {
  data.excelData.header = header
  data.excelData.results = results
  props.onSuccess && props.onSuccess(data.excelData)
}
const readerData = rawFile => {
  data.loading = true
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => {
      const workbook = xlsx.read(e.target.result, { type: 'array' })
      const firstSheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[firstSheetName]
      const header = getHeaderRow(worksheet)
      const results = xlsx.utils.sheet_to_json(worksheet)
      generateData({ header, results })
      data.loading = false
      resolve()
    }
    reader.readAsArrayBuffer(rawFile)
  })
}
const upload = rawFile => {
  inputRef.value = null
  if (!props.beforeUpload) return readerData(rawFile)
  if (props.beforeUpload(rawFile)) readerData(rawFile)
}
const handleDrop = e => {
  e.stopPropagation()
  e.preventDefault()
  if (data.loading) return
  const files = e.dataTransfer.files
  if (files.length !== 1) return elMsg('Only support uploading one file!', 'error')
  const rawFile = files[0]
  if (!isExcel(rawFile)) return elMsg('Only supports upload .xlsx, .xls, .csv suffix files', 'error')
  upload(rawFile)
  e.stopPropagation()
  e.preventDefault()
}
const handleDragover = e => {
  e.stopPropagation()
  e.preventDefault()
  e.dataTransfer.dropEffect = 'copy'
}
const handleUpload = () => {
  inputRef.value.click()
}
const handleClick = e => {
  const files = e.target.files
  const rawFile = files[0]
  if (!rawFile) return
  upload(rawFile)
}
</script>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    line-height: 160px;
    text-align: center;
  }
  .drop {
    line-height: 80px;
    color: #bbb;
    i {
      margin-top: 20px;
      font-size: 60px;
      display: block;
    }
  }
}
</style>
