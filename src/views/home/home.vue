<template>
  <div class="home">
     <div>
       <!-- 头像区域 -->
       <div class="head-field">
         <span class="head-field-pic" @click="JumpInfo">
         <span class="img-hover">
            <img :src="userinfo.headUrl" v-autofix="name"/>
          </span>
        </span>
       </div>

       <div class="grid">
          <div class="grid-item" @click="jumpTo('DatePlan')"><i class="icon iconfont icon-rili" ></i><br><span class="grid-item-text">dataplan</span>
         </div><div class="grid-item" @click="jumpTo('EatWhat')"><i class="icon iconfont icon-fan " ></i><br><span class="grid-item-text">今天吃什么</span>
         </div><div class="grid-item" @click="jumpTo('memo')"><i class="icon iconfont icon-beiwanglu " ></i><br><span class="grid-item-text">备忘录</span>
         </div><div class="grid-item" @click="jumpTo('when')"><i class="icon iconfont icon-shiliangzhinengduixiang9 " ></i><br><span class="grid-item-text">什么时候放假</span>
          </div><div class="grid-item" @click="jumpTo('icon')"><i class="icon iconfont icon-yingbi" ></i><br><span class="grid-item-text">抛硬币</span>
          </div><div class="grid-item" @click="jumpTo('money')"><i class="icon iconfont icon-jizhang" ></i><br><span class="grid-item-text">记记账</span>
          </div><div class="grid-item" @click="changColor"><i class="icon iconfont icon-pifu" @click="changColor"></i><br><span class="grid-item-text">皮肤</span>
         </div><div class="grid-item"><i class="icon iconfont icon-shezhi" ></i><br><span class="grid-item-text">设置</span>
         </div>
       </div>

       <!--当前页弹出内容 -->
       <!-- 設置顏色 -->
       <set-color :chang-color="changColor" ref="colorPanel"></set-color>

     </div>
  </div>
</template>

<script>
import setColor from './setColor.vue'
export default {
  name: 'home',
  components: {
    setColor
  },
  props: ['userinfo'],
  data () {
    return {
      name: 'kimmy'
    }
  },
  created () {
    // 解决从浏览器回退触发不了指令的问题
    this.name = 'trigger'
    setTimeout(() => {
      this.name = 'kimmy'
    }, 0)
  },
  watch: {
    // 设置颜色页面就在该view下, 因而改变颜色这里也需要监听
    'userinfo.color' () {
      this.setTheme()
    }
  },
  mounted () {
    this.setTheme()
  },
  methods: {
    // 设置颜色页面就在该view下, 因而改变颜色这里需要监听, 故设置主题的方法要封装复用
    setTheme () {
      this.$el.querySelector('.grid').style.color = this.userinfo.color
    },
    // 打开设置颜色上升框
    changColor () {
      this.$refs.colorPanel.changColor = true
    },
    // 跳转到对应页面
    jumpTo (page) {
      this.$router.push({name: page})
    },
    // 跳转到个人信息页
    JumpInfo () {
      this.$router.push({name: 'info'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
  .home {
    .mint-header {
        background-color: #2e3238;
    }
    .head-field {
      text-align: center;
      padding: 20px 0;
      .head-field-pic {
        display: inline-block;
        width: 100%;
        .img-hover {
          // css 宽高等比例
          display: inline-block;
          width: 30%;
          height: 0;
          padding-bottom: 30%;
          border-radius: 50%;
          overflow: hidden;
        }       
      }
    }
    // 网格
    .grid {
        word-spacing: -6px;
        position: relative;
        &:before {
            content: " ";
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 1px;
            border-top: 1px solid #D9D9D9;
            -webkit-transform: scaleY(.5);
            -ms-transform: scaleY(.5);
            transform: scaleY(.5);
            top: -1px;
        }
        .grid-item {
            // 微信这里用了before 和 after来做底线， 这样就不用因为高度偏差导致换行了？
            display: inline-block;
            text-align: center;
            width: 33.33%;
            padding: 20px 10px;
            box-sizing: border-box;
            position: relative;
            .grid-item-text {
              // color: #666;
              display: inline-block;
              padding-top: 10px;
            }
            .iconfont {
                font-size: 2.4rem;
            }

            &:before {
                // 它意思就是要0.5px咯
                content: " ";
                position: absolute;
                right: 0;
                top: 0;
                width: 1px;
                height: 100%;
                border-right: 1px solid #D9D9D9;
                color: #D9D9D9;
                -webkit-transform: scaleX(.5);
                -ms-transform: scaleX(.5);
                transform: scaleX(.5);
                right: -1px;
            }
            &:after {
                content: " ";
                position: absolute;
                left: 0;
                width: 100%;
                height: 1px;
                border-top: 1px solid #D9D9D9;
                -webkit-transform: scaleY(.5);
                -ms-transform: scaleY(.5);
                transform: scaleY(.5);
                bottom: -1px;
            }

        }
    }
}

  


</style>
