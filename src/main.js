import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
import router from './router'
import store from './store'
app.use(store)

// 导入 全局样式
import '@/styles/index.scss'

// 导入 element-plus
import ElementPlus from 'element-plus'
import locale from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
app.use(ElementPlus, { size: 'mini', locale })

// 导入全局 mixin
import elementMixin from '@/mixins/elementMixin'
app.mixin(elementMixin)
import commonMixin from '@/mixins/commonMixin'
app.mixin(commonMixin)

// https://github.com/anncwb/vite-plugin-svg-icons/blob/main/README.zh_CN.md
import 'virtual:svg-icons-register'

// 注册全局组件
import components from '@/components'
app.use(components)

// 导入 moment-mini 并挂载全局过滤器
import momentMini from 'moment-mini'
app.config.globalProperties.$momentMini = momentMini

// 导入 router  intercept
import './permission'

// 导入自定义指令
import * as directives from '@/directives'
Object.keys(directives).forEach(key => app.directive(key, directives[key]))

app.use(router).mount('#app')
