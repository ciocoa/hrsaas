import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import locale from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import mixins from './mixins'
import components from './components'
import 'virtual:svg-icons-register' // https://github.com/anncwb/vite-plugin-svg-icons/blob/main/README.zh_CN.md
import './styles/index.scss'
import './permission'

const app = createApp(App)
app.mixin(mixins)
app.use(store)
app.use(ElementPlus, { size: 'mini', locale })
app.use(components)
app.use(router).mount('#app')
