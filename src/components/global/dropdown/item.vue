<template>
    <li class="dropdown-list-item" @click="handleClick"><i class="mintui mintui-back"></i>&nbsp;<slot></slot></li>
</template>

<script>
 /* 下拉组件子选项 绑定事件click, 传回slot数据是菜单名 */
import dispatch from '../utils/dispatch'
export default {
   name: 'g-dropdown-item',
   mixins: [dispatch],
   data () {
     return {}
   },
   methods: {
     handleClick () {
       this.$emit('click')
       this.dispatch('g-dropdown', 'childClick')
     }
   }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
.dropdown {
  position: relative;
  display: inline-block;
  height: 40px;
  .more-btn {
      width: 40px;
  }
  .dropdown-list {
    position: absolute;
    padding: 0;
    margin: 0;
    left: -110px;
    text-align: left;
    top: 40px;
    overflow: hidden;
    box-shadow: 0 -2px 4px #222;
    .dropdown-list-item {
        padding-left: 10px;
        box-sizing: border-box;
      background: #2e3238;
      list-style: none;
      display: block;
      width: 150px;
      height: 30px;
      line-height: 30px;
      color: #fbfbfb;
      border-top: 1px solid #444;
    }
  }
}
</style>
