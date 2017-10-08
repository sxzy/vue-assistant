<template>
<div class="info">
  <!-- 头像区域 -->
  <transition name="slide">
    <div class="head-field" v-show="appear">
      <span class="head-field-pic">
         <span class="img-hover" @click.stop="uploadHeadImg">
            <img :src="userinfo.headUrl" v-autofix/>
          </span>
        </span>
    </div>
  </transition>
  <input type="file" accept="image/*"  @change="handleFile" class="hiddenInput" />
  
  <div class="info-field">
      <transition name="slide-1">
        <p v-show="appear">K.K</p>
      </transition>
      <transition name="slide-2">
        <p v-show="appear">wanna to be a Brilliant gentle</p>
      </transition>
      <transition name="slide-3">
        <p v-show="appear">And a pretty girl</p>
      </transition>
  </div>
</div>
</template>

<script>
export default {
  name: 'info',
  components: {
  },
  props: ['userinfo'],
  data () {
    return {
      appear: false
    }
  },
  beforeRouteLeave (to, from, next) {
    this.appear = false
    setTimeout(() => {
      next()
    }, 800)
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
      this.appear = true
    })
  },
  methods: {
    handleFile (e) {
      this.$bus.$emit('loading')
      let $target = e.target || e.srcElement
      let file = $target.files[0]
      var reader = new FileReader()
      reader.onload = (data) => {
        let res = data.target || data.srcElement
        let img = new Image()
        img.onload = () => {
          // 回调更新父组件数据
          this.saveImg(res.result).then(() => {
            // 本地实在太快了，为了让你们看到loading效果, 加个延时
            setTimeout(() => {
              this.$bus.$emit('unload')
              this.$emit('update-userinfo', {headUrl: res.result})
            }, 1500)
          })
        }
        img.src = res.result
      }
      reader.readAsDataURL(file)
    },
    // 打开图片上传
    uploadHeadImg () {
      this.$el.querySelector('.hiddenInput').click()
    },
    // 保存上传图片
    saveImg (dataUrl) {
      return this.$axios.get('./static/api.json')
        .then((data) => {
          localStorage.setItem('headImg', dataUrl)
        })
        .catch((data) => {
          console.log(data)
          this.$bus.$emit('unload')
        })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .info {
    .slide-enter-active,
    .slide-leave-active {
      transform: translateY(0);
      transition: transform 1s;
    }
    .slide-enter,
    .slide-leave-to/* .fade-leave-active in below version 2.1.8 */
    {
      transform: translateY(-50px);
    }
    
    @for $i from 1 to 4 {
      .slide-#{$i}-enter-active {
        transform: translateY(0);
        opacity: 1;
        transition: transform 1s, opacity 1s;
        transition-delay: ($i - 1s) / 5;
      }
      .slide-#{$i}-leave-active {
        transform: translateY(0);
        opacity: 1;
        transition: transform .5s, opacity .5s;
      }
      .slide-#{$i}-enter,
      .slide-#{$i}-leave-to {
        opacity: 0;
        transform: translateY(50px);
      }
    }
    .head-field {
      text-align: center;
      padding: 20px 0;
      margin-top: 50px;
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
    .info-field {
      text-align: center;
      font-size: 16px;
      color: #999;
    }

    /* 隐藏的输入框 */
    .hiddenInput {
      opacity: 0;
      position: absolute;
    }
  }

</style>
