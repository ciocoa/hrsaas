/** 是否是外部连接 */
export const isExternal = value => /^(https?:|mailto:|tel:)/.test(value)

/** 已过时间 */
export const timeAgo = time => {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) return pluralize(~~(between / 60), ' minute')
  else if (between < 86400) return pluralize(~~(between / 3600), ' hour')
  else return pluralize(~~(between / 86400), ' day')
}
// 时间是复数则显示复数标签
const pluralize = (time, label) => {
  if (time === 1) return time + label
  return time + label + 's'
}

/** 数字格式化（10000 => 10k） */
export const numberFormatter = (num, digits) => {
  const si = [
    { value: 1e18, symbol: 'E' },
    { value: 1e15, symbol: 'P' },
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'G' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value)
      return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
  }
  return num.toString()
}

/** 数字格式化（10000 => "10,000"） */
export const toThousandFilter = num =>
  (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))

/** 首字母大写 */
export const uppercaseFirst = str => str.charAt(0).toUpperCase() + str.slice(1)

/** 时间解析 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) return null
  if ((time + '').length === 10) time = +time * 1000
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') date = time
  else date = new Date(parseInt(time))
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) value = '0' + value
    return value || 0
  })
  return timeStr
}

/** 时间格式化 */
export const formatTime = (time, option) => {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()
  const diff = (now - d) / 1000
  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

/** 获取当前格式化日期 */
export const getNowFormatDate = () => {
  const date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let strDate = date.getDate()
  if (month >= 1 && month <= 9) month = '0' + month
  if (strDate >= 0 && strDate <= 9) strDate = '0' + strDate
  return year + '-' + month + '-' + strDate
}

/** 数字格式化 */
export const nFormatter = (num, digits) => {
  const si = [
    { value: 1e18, symbol: 'E' },
    { value: 1e15, symbol: 'P' },
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'G' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}
/** html 转 text */
export const html2Text = val => {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/** 到千过滤 */
export const toThousandslsFilter = num =>
  (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))

/** 银行卡号格式化 */
export const formatBankNo = (BankNo, callback) =>
  '10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99'

/** 获取字符串长度 */
export const getStrleng = (str, max) => {
  var myLen = 0
  for (var i = 0; i < str.length && myLen <= max * 2; i++) {
    if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128) myLen++
    else myLen += 2
  }
  return myLen
}

/** 上传图片类型控制 */
export const updatedImg = (file, obj, callback, func) => {
  if (file.size < 10100000) {
    var fileName = file.name
    var suffix = fileName.substring(fileName.lastIndexOf('.') + 1).toUpperCase()
    if (suffix === 'PDF' || suffix === 'JPG' || suffix === 'JPEG' || suffix === 'PNG' || suffix === 'GIF') {
      return true
    } else {
      var tipType = '文件类型有误,请重新上传'
      callback(tipType)
      return false
    }
  } else {
    var tipSize = '图片大小超过5M,请重新上传'
    callback(tipSize)
    return false
  }
}

/** 上传文档类型控制 */
export const updatedFile = (file, obj, callback, func) => {
  if (file.size < 10100000) {
    var fileName = file.name
    var suffix = fileName.substring(fileName.lastIndexOf('.') + 1).toUpperCase()
    if (
      suffix === 'DOC' ||
      suffix === 'DOCX' ||
      suffix === 'XLS' ||
      suffix === 'XLSX' ||
      suffix === 'PDF' ||
      suffix === 'ZIP' ||
      suffix === 'RAR'
    ) {
      return true
    } else {
      var tipType = '文件类型有误,请重新上传'
      callback(tipType)
      return false
    }
  } else {
    var tipSize = '文件大小超过5M,请重新上传'
    callback(tipSize)
    return false
  }
}

/** 上传文件类型控制 */
export const importFile = (file, obj, callback, func) => {
  if (file.size < 10100000) {
    var fileName = file.name
    var suffix = fileName.substring(fileName.lastIndexOf('.') + 1).toUpperCase()
    if (suffix === 'XLS' || suffix === 'XLSX') {
      return true
    } else {
      var tipType = '文件类型有误,请重新上传'
      callback(tipType)
      return false
    }
  } else {
    var tipSize = '文件大小超过10M,请重新上传'
    callback(tipSize)
    return false
  }
}

/** 最小高度 */
export const minHeight = resfile => document.body.clientHeight - 180 + 'px'

/** 日期格式化 */
export const formatDate = (date, fmt = 'yyyy-MM-dd') => {
  if (!(date instanceof Array)) {
    date = new Date(date)
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}
// 补零函数
const padLeftZero = str => ('00' + str).substr(str.length)

/** 获取 blob 流 */
export const getBlob = response => {
  const blob = new Blob([response.data], {
    type: 'application/vnd.ms-excel'
  })
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  var filename = decodeURI(response.headers.filename)
  // link.download = filename + '.xls'
  link.download = filename
  link.click()
}

/** 图片 blob 流转为可用 src */
export const imgHandle = obj => window.URL.createObjectURL(obj)

/** 列表数据转为树形数据 */
export const tranListToTree = (list, value) => {
  const arr = []
  list.forEach(ele => {
    if (ele.pid === value) {
      const child = tranListToTree(list, ele.id)
      if (child.length) ele.children = child
      arr.push(ele)
    }
  })
  return arr
}
