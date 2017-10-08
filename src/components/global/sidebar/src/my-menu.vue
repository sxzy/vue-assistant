<template>
  <div class='sideBar togglehide' ref='barPart'>
    <div class='menuCover' @click='toggleMenu' ref='cover'></div>
    <ul class='menu'>
      <li class='list-title'><slot name="menu-title"></slot></li>
      <slot></slot>  
    </ul>
  </div>
</template>
<script>
export default {
  name: 'my-menu',
  props: {
    myVisible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    myVisible () {
      this.toggleShow()
    }
  },
  methods: {
    toggleMenu () {
      this.$emit('update:myVisible', !this.myVisible)
      // console.log(this.myVisible)
    },
    toggleShow () {
      let target = this.$refs.barPart
      let test = target.classList.contains('togglehide')
      if (!test) {
        target.classList.add('togglehide')
        this.$emit('closeBar') // 关闭导航标签的回调
        let OpenMenu = target.querySelectorAll('.openMenu')
        let OpenIcon = target.querySelectorAll('.openIcon')
        this.$refs.barPart.style.left = -this.$refs.barPart.offsetWidth + 'px'
        for (let i = 0; i < OpenMenu.length; i++) {
          OpenMenu[i].classList.remove('openMenu')
          OpenMenu[i].style.display = 'none'
        }
        for (let i = 0; i < OpenIcon.length; i++) {
          OpenIcon[i].classList.remove('openIcon')
        }
      } else {
        target.removeAttribute('style')
        target.classList.remove('togglehide')
        this.$emit('openBar') // 打开导航标签的回调
        this.$refs.barPart.style.left = 0 + 'px'
      }
    }
  },
  mounted () {
    this.$refs.barPart.style.left = -this.$refs.barPart.offsetWidth + 'px'   // 初始化通过left值来隐藏侧边栏组件
    this.$on('closeByRoute', () => {
      this.$emit('update:myVisible', !this.myVisible)
    })
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
  .menuCover {
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    background: #2c3b41;
    opacity: .5;
    z-index: 1111；
  }
  .togglehide {
    span {
      display: none;
    }
    .list-title {
      display: none;
    }
    .menu {
      padding-top: 50px;
    }
    i {
      font-size: 18px;
    }
    .menuCover {
      display: none;
    }
  }
  .sideBar {
    padding: 20px 0px;
    min-width: 200px;
    background: black;
    position: absolute;
    top: 0px;
    bottom:0px;
    z-index:1000;
    transition: all ease .4s;
    overflow: auto;
    font-size: 16px;
    span {
      font-size: 1.2rem;
    }
    i {
      font-size: 1.2rem;
    }
  }
  .toggleIcon {
    width: 50px;
    height: 50px;
    background: red;
    position: absolute;
    top: 0px;
    cursor: pointer;
    transition: all ease .4s;
  }
  .menu {
    font-size: 14px;
    li {
      list-style: none;
      & > a {
      color:#b8c7ce;
      width: 100%;
      display: inline-block;
      padding: 10px;
      box-sizing: border-box;
      position: relative;
      transition: border-left ease .3s;
    }
    }
    a {
      text-decoration: none;
      color:gray;
    }
    .list-title {
      padding: 9px;
      color: white;
    }
     .treeview { 
     background: #1a2226;
     transition: all ease .3s;
     & > a {
      color:#b8c7ce;
      width: 100%;
      display: inline-block;
      padding: 10px;
      box-sizing: border-box;
      transition: border-left ease .3s;
      position: relative;
      &:hover {
         background: black;
         color: white !important;
         border-left: 3px solid white;
      }
    }
    .pull-right-container {
      position: absolute;
      margin-top: -7px;
      right:20px;
      top: 50%;
    }
  }
  .treeview-menu {
    background: #2c3b41;
    transition: height .3s ease-out;
    a {
      position: relative;
      padding: 5px 20px 5px 10px!important;
      color: #8aa4af;
      display: inline-block;
      width: 100%;
      box-sizing: border-box;
      background: #2c3b41;
      &:hover {
        color: white;
        border-left: none;
        background: #2c3b41;
      }
    }
    .treeview-menu {
      padding-left: 20px;
    }
    .treeview {
      background: #1a2226!important;
      transition: none!important;
      a {
        transition: none !important;
      }
    }
  }
  .openIcon {
    transform: rotate(-90deg);
    transition: all ease .2s;
  }
  }
</style>
