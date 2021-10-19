/**
 * 列表数据转为树形数据
 * @param {Array} list 列表数据
 * @param {String} value 初始匹配的 ID
 */
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
