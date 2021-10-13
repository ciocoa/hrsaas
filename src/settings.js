const setting = {
  /**
   * @type {string}
   * @description 标题
   */
  title: '人力资源管理平台',

  /**
   * @type {boolean} true | false
   * @description 是否固定标题
   */
  fixedHeader: true,

  /**
   * @type {boolean} true | false
   * @description 是否在侧边栏显示 logo
   */
  sidebarLogo: true,

  /**
   * @type {boolean} true | false
   * @description 是否在导航栏显示标题
   */
  showTitle: false,

  /**
   * @type {boolean} true | false
   * @description 是否显示右侧面板
   */
  showLeftMenu: true,

  /**
   * @type {boolean} true | false
   * @description 是否显示下拉
   */
  ShowDropDown: true,

  /**
   * @type {boolean} true | false
   * @description 是否显示汉堡按钮
   */
  showHamburger: true,

  /**
   * @type {boolean} true | false
   * @description 是否需要登录
   */
  isNeedLogin: true,

  /**
   * @type {boolean} true | false
   * @description 是否需要进度条
   */
  isNeedNprogress: true,

  /**
   * @type {boolean} true | false
   * @description 是否需要标签视图
   */
  needTagsView: true,

  /**
   * @description 标签视图数量
   */
  tagsViewNum: 6,

  /**
   * @type {boolean} true | false
   * @description 是否启用模拟数据
   */
  openProdMock: false,

  /**
   * @type {string | array} 'serve' | ['build', 'serve']
   * @description 错误日志组件，默认仅生产环境生效，通过 ['build', 'serve'] 以在开发环境启用
   */
  errorLog: ['serve', 'build']
}

export default setting
