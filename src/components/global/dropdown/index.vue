<template>
    <!-- 一个右上角会更多菜单下拉的组件 -->
    <!-- 子选项格式 
        <drop-item @click=fn>按钮示例</drop-item> fn: 回调函数
    -->
    <div class="dropdown" v-myclickoutside="handleClick">
        <!-- 按钮样式 -->
        <div class="more-btn" @click="show = true">
          <slot name="btn"></slot>
        </div>
        <ul class="dropdown-list" v-show='show'>
            <slot></slot>
        </ul>
    </div>
</template>
<script>
export default {
  name: 'g-dropdown',
  data () {
    return {
      show: false
    }
  },
  created () {
    this.$on('childClick', this.handleClick)
  },
  methods: {
    handleClick () {
      this.show = false
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
    display: inline-block;
    width: 40px;
  }
  .dropdown-list {
    position: absolute;
    z-index: 999;
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
