export function focus (el: Element) {
  if (el.tagName.toLowerCase() === 'input') {
    (el as HTMLInputElement).focus()
    return
  }

  const len = el.children?.length
  /*
  *  只查询子一级元素是否含有input
  */
  for (let i = 0; i < len; i++) {
    if (el.children.item(i)?.tagName.toLowerCase() === 'input') {
      focus(el.children.item(i) as Element)
      break
    }
  }
}
