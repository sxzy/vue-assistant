<template>
<transition name='slide-fade'>
    <div class='page-component-up' v-show='isShow' @click='getTop'>
    <i class='tri'></i>
  </div>
</transition>
</template>
<script>
export default {
  name: 'BackTop',
  props: {
    scrollmyself: {
      type: Boolean,  // 这是选择滚动对象的props值，如果滚动的对象是当前组件的父元素，就设置scrollObj为true.如果没有设置就默认为window对象
      default: false
    }
  },
  data () {
    return {
      isShow: false,
      target: ''
    }
  },
  methods: {
    addhoverClass (e) {
      if (e.type === 'mouseover') {
        this.$el.classList.add('hover')
      } else if (e.type === 'mouseout') {
        this.$el.classList.remove('hover')
      }
    },
    showIcon () {
      if (this.target.scrollTop > 100) {
        this.isShow = true
        this.$el.addEventListener('mouseover', this.addhoverClass)
        this.$el.addEventListener('mouseout', this.addhoverClass)
      } else if (this.target.scrollTop < 100) {
        this.isShow = false
      }
    },
    getTop () {
      let timer = setInterval(() => {
        let top = this.target.scrollTop
        let speed = Math.ceil(top / 5)
        this.target.scrollTop = top - speed
        if (top === 0) {
          clearInterval(timer)
        }
      }, 20)
    }
  },
  mounted () {
    // 通过这个target来判断当前的滚动监听对象是谁
    if (this.scrollmyself) {
      this.target = this.$el.parentNode
    } else {
      this.target = document.body
    }
    this.target.addEventListener('scroll', this.showIcon)
  },
  beforeDestroy () {
    this.target.removeEventListener('scroll', this.showIcon)
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
  .slide-fade-enter-active {
     transition: all .1s ease;
  }
  .slide-fade-leave-active {
    transition: all .1s cubic-bezier(1.0, 0.3, 0.8, 1.0);
    opacity: 0;
  }
  .slide-fade-enter, .slide-fade-leave-to
   /* .slide-fade-leave-active 在低于 2.1.8 版本中 */ {
  // transform: translateY(-20px);
    opacity: 0;
  }
  .page-component-up {
    background-color: #4eb1fb;
    position: fixed;
    right: 3rem;
    bottom: 12rem;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    cursor: pointer;
    opacity: .4;
    transition: .3s;
    text-align: center;
    z-index: 999;
  }
  .tri {
    width: 0;
    height: 0;
    border: 12px solid transparent;
    border-bottom-color: #dfe6ec;
    text-align: center;
  }
  .hover {
    background-color: red;
  }
</style>
