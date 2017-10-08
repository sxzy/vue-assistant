/**
 * Created by kimmy on 2017/5/13.
 * 鼠标点击外部事件，用于收起下拉框等操作，示例： v-myclickoutside = 'handler'
 */

export default {
  install (Vue) {
    let myNode = []
    document.body.addEventListener('mousedown', (e) => {
      for (let i = myNode.length; i--;) {
        myNode[i].handlerfn(e, myNode[i])
      }
    })
    Vue.directive('myclickoutside', {
      bind (el, binding, vnode) {
        // id 这里用长度加随机数，防止删除了一些组件后，再次生成的id重复
        el.id = myNode.push(el) - 1 + Math.round(Math.random() * 100).toString()
        const handlefn = (e) => {
          // 是否在组件内部
          if (el.contains(e.target)) {
            return false
          } else {
            // 执行处理
            vnode.context[binding.expression]()
          }
        }
        el.handlerfn = handlefn
      },
      unbind (el) {
        let len = myNode.length
        for (let i = 0; i < len; i++) {
          if (myNode[i].id === el.id) {
            myNode.splice(i, 1)
            break
          }
        }
      }
    })
  }
}
