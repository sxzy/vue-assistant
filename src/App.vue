<template>
  <div id="app">
    <!-- 仔细想想，加载动画应该是一个全局的东西哦 -->
    <mt-spinner class="g-loading" type="double-bounce" v-show="loading" :color="loadingColor"></mt-spinner>
    <app-header>
      <i class="iconfont icon-menu" @click="toggleShowMenu"></i>
      <!-- <mt-button icon="back" @click="toggleShowMenu">back</mt-button> -->
    </app-header>
    <!-- 侧边栏 -->
      <my-menu :my-visible.sync = "visible">
      <!-- 这里的按钮可以自己去封装定义 -->
      <!-- <p slot='toggleBtn'>点我点我</p> -->
      <template slot="menu-title">我的个人助手小系统呀</template>
      <menu-item route='/'><i slot='icon' class=' iconfont icon-403010'></i>首页</menu-item>
      <menu-item route='/DatePlan'><i slot='icon' class=' iconfont icon-403010'></i>DatePlan</menu-item>
      <menu-item route='/EatWhat'><i slot='icon'  class=' iconfont icon-chi'></i>今天吃什么</menu-item>
      <menu-item route='/memo'><i slot='icon'  class=' iconfont icon-beiwanglu'></i>备忘录</menu-item>
      <menu-item route='/when'><i slot='icon'  class=' iconfont icon-fangjia'></i>什么时候放假</menu-item>
      <menu-item route='/icon'><i slot='icon'  class=' iconfont icon-pinrenpinkongxin'></i>抛硬币</menu-item>
      <!-- <menu-item route='/mirror'><i slot='icon'  class=' iconfont icon-jingzi'></i>照镜子</menu-item>  -->
      <my-submenu>
        <i slot="icon" class=' iconfont icon-jizhang'></i><template slot="submenu-title"></i>记记账</template>
        <menu-item route='/money'><i slot="icon" class=' fa fa-circle-o'></i>记账首页</menu-item>
        <menu-item route='/moneyRecord'><i slot="icon" class='fa fa-circle-o'></i>添加记账</menu-item>
        <my-submenu>
          <i slot="icon" class='fa fa-circle-o'></i><template slot="submenu-title">这是有下拉菜单</template>
          <menu-item><i slot="icon" class=' fa fa-circle-o'></i>我是第一个</menu-item>
          <menu-item><i slot="icon" class=' fa fa-circle-o'></i>我是第二个</menu-item>
        </my-submenu>
         <my-submenu>
          <i slot="icon" class='fa fa-circle-o'></i><template slot="submenu-title">这是有下拉菜单</template>
          <menu-item><i slot="icon" class=' fa fa-circle-o'></i>我是第一个</menu-item>
          <menu-item><i slot="icon" class='fa fa-circle-o'></i>我是第二个</menu-item>
          <my-submenu>
            <i slot="icon" class='fa fa-circle-o'></i><template slot="submenu-title">这是有下拉菜单</template>
            <menu-item><i slot="icon" class=' fa fa-circle-o'></i>我是第一dddddd个</menu-item>
            <menu-item><i slot="icon" class=' fa fa-circle-o'></i>我是第二ddddddddddddd个</menu-item>
          </my-submenu>
        </my-submenu>
      </my-submenu>
    </my-menu>
    <router-view :userinfo="userinfo" @update-userinfo="updateUserinfo"></router-view>
  </div>
</template>

<script>
import appHeader from '@/components/header'

export default {
  name: 'app',
  components: {
    appHeader
  },
  data () {
    return {
      visible: false,  // 侧边栏是否打开
      loading: false,
      userinfo: {
        headUrl: './static/img/head.jpg',  // 头像链接
        color: ''
      },
      loadingColor: '#26a2ff'  // loading 的颜色
    }
  },
  created () {
    // 绑定设置主题的事件，一旦触发修改主题，则将当前字体颜色改为对应颜色
    this.$bus.$on('set-theme', (color) => {
      this.loadingColor = color
      this.userinfo.color = color
    })
  },
  mounted () {
    // 绑定loading事件
    this.getAllData()
    this.$bus.$on('loading', () => {
      this.loading = true
    })
    this.$bus.$on('unload', () => {
      this.loading = false
    })
  },
  methods: {
    // 打开侧边栏
    toggleShowMenu () {
      console.log('我被点了')
      this.visible = true
    },
    setTheme () {
      this.loadingColor = this.userinfo.color
    },
    getAllData () {
      // 假装调用接口获取并设置个人数据 颜色 头像
      let color = localStorage.getItem('themeColor') || '#f04134'
      color && this.$bus.$emit('set-theme', color)
      this.userinfo.headUrl = localStorage.getItem('headImg') || this.userinfo.headUrl
    },
    // 更新头像数据
    updateUserinfo (obj) {
      this.userinfo = Object.assign(this.userinfo, obj)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
html {
  font-size: 62.5%;
}
body {
  position: absolute;
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100%;
}
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
             "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
             SimSun, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .g-loading {
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -14px;
    margin-top: -14px;
  }
}
</style>
