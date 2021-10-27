import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'

/** 提示 */
export const elMsg = (message, type) => {
  ElMessage({
    message: message || '成功',
    type: type || 'success',
    showClose: true,
    center: false
  })
}

/** 通知 */
export const elNotify = (title, message, type, duration) => {
  ElNotification({
    title: title || '通知',
    message: message,
    type: type || 'success',
    duration: duration || 2500,
    position: 'top-right',
    offset: 40
  })
}

/** 确认弹窗 */
export const elConfirm = async (message, type) => {
  await ElMessageBox.confirm(message || '确定要删除吗', {
    showClose: false,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: type || 'warning'
  })
}
