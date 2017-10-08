/* 用于模拟dispatch,  找到父组件， 并且触发父组件方法 如果_componentTag 找不到，那就打印vue 的￥parent 看是什么咯 */
export default {
  methods: {
    dispatch (componentName, eventName, params = []) {
      let parent = this.$parent || this.$root
      let name = parent.$options._componentTag

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options._componentTag
        }
      }
      if (parent) {
        parent.$emit(eventName, params)
      }
    }
  }
}
