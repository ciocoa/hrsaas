import { createStore } from 'vuex'
import getters from './getters'

const modulesFiles = import.meta.globEager('./modules/*.js')
// 简单的方式
let modules = {}
for (const path in modulesFiles) {
  const moduleName = path.replace(/(.*\/)*([^.]+).*/gi, '$2')
  modules[moduleName] = modulesFiles[path].default
}

// 复杂的方式
// const modules = Object.keys(modulesFiles).reduce((modules, modulePath) => {
//   // const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
//   const moduleName = modulePath.replace(/(.*\/)*([^.]+).*/gi, '$2')
//   const value = modulesFiles[modulePath]
//   modules[moduleName] = value.default
//   return modules
// }, {})

export default createStore({
  modules,
  getters
})
