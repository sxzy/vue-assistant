/* 这里用来做事件中心，负责分发事件 */

export default (Vue) => {
  let eventHub = new Vue()
  Vue.prototype.$bus = {
    $on (...arg) {
      eventHub.$on(...arg)
    },
    $off (...arg) {
      eventHub.$off(...arg)
    },
    $emit (...arg) {
      eventHub.$emit(...arg)
    }
  }
}
