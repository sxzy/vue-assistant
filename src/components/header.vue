<template>
  <div class="hello">
    <!-- 头部 -->
    <mt-header title="Home">
      <div style="display: inline-block" slot="left">
        <!-- <router-link to="/" slot="left">
          <mt-button icon="back">back</mt-button>
        </router-link> -->
        <slot></slot>
      </div>
      
      <!-- 更多菜单 -->
      <g-dropdown slot="right">
        <!-- 定义按钮样式 <tag slot="btn">btn</tag>-->
        <mt-button icon="more"  slot="btn"></mt-button>
        <g-dropdown-item @click="sayhello">再怎么</g-dropdown-item>
        <g-dropdown-item @click="sayhello">点也是</g-dropdown-item>
        <g-dropdown-item @click="sayhello">没用的</g-dropdown-item>
      </g-dropdown>
    </mt-header>
  </div>
</template>

<script>
export default {
  name: 'hello',
  components: {
    // dropdown
  },
  created () {
    this.$bus.$on('set-theme', (color) => {
      this.$el.querySelector('.mint-header').style.backgroundColor = color
    })
  },
  data () {
    return {
      theme: '#2e3238'
    }
  },
  methods: {
    sayhello () {
      console.log('hello word')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .mint-header {
    background-color: #2e3238;
  }

</style>
