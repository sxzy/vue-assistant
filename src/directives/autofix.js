/**
 * Created by kimmy on 2017/10/06.
 * 图片自动根据宽高比例压缩，并在父div偏移，达到定位居中的功能
 */

export default {
  install (Vue) {
    Vue.directive('autofix', {
      bind (el, binding, vnode) {
      },
      update (el, binding, vnode) {
        console.log('carry', binding)
        let img = new Image()
        let boxWidth = el.parentNode.offsetWidth
        img.onload = () => {
          // 以长度小的边为基准， 按比例缩放，然后偏移最长边和当前边框长度差的一半
          if (img.width < img.height) {
            el.style.height = Math.floor(img.height / img.width * boxWidth) + 'px'
            el.style.width = boxWidth + 'px'
            el.style.marginTop = -(el.offsetHeight - boxWidth) / 2 + 'px'
          } else {
            el.style.width = Math.floor(img.width / img.height * boxWidth) + 'px'
            el.style.height = boxWidth + 'px'
            el.style.marginLeft = -(el.offsetWidth - boxWidth) / 2 + 'px'
          }
        }
        img.src = el.src
      },
      unbind (el) {
      }
    })
  }
}
