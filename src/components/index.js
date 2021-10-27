import PageTools from './PageTools'
import SvgIcon from './SvgIcon'
import UploadExcel from './UploadExcel'

export default app => {
  app.component('page-tools', PageTools), app.component('svg-icon', SvgIcon), app.component('upload-excel', UploadExcel)
}
