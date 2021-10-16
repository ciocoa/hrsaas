/**
 * 指令：
 * dom 指令作用的 dom 对象
 * options 指令中变量的解释
 * 图片地址加载失败，触发事件 onerror
 */
export const imagerror = {
  inserted(dom, options) {
    dom.onerror = () => (dom.src = options.value)
  }
}
