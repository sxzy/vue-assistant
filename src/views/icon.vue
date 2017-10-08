<template>
  <div class="coin">
     <div class="headerPart">
        <h1 class="myTitle">Make your Decision</h1>
        <p class="info">
            you have to believe yourself, and just click the coin to help you struggle
        </p>
      </div>
      <div class="iconPart">
        <div ref="leftIcon" class="leftCircle"></div>
        <div ref= "topIcon" class="topCircle"></div>
        <div class="infoText" @click="random">{{message}}</div>
      </div>
      <div class="footerPart">
          <div class="yes">Yes</div>
          <div class="no">no</div>
      </div>
  </div>
</template>
<script>
import untils from '@/utils/utils.js'
export default {
  props: ['userinfo'],
  data () {
    return {
      message: 'Click'
    }
  },
  mounted () {
    this.$nextTick(() => {
      // 设置颜色
      this.$el.querySelector('.myTitle').style.color = this.userinfo.color
      this.$el.querySelector('.leftCircle').style.borderColor = this.userinfo.color
      this.$el.querySelector('.topCircle').style.borderColor = untils.hexToRgba(this.userinfo.color, 0.6)
      this.$el.querySelector('.infoText').style.color = this.userinfo.color
      this.$el.querySelector('.yes').style.background = this.userinfo.color
      this.$el.querySelector('.no').style.color = this.userinfo.color
      this.$el.querySelector('.no').style.borderColor = this.userinfo.color
    })
  },
  methods: {
    random () {
      this.message = 'Wait'
      let num = Math.random()
      let leftcoin = this.$refs.leftIcon
      let rightcoin = this.$refs.topIcon
      if (leftcoin.classList.contains('rightS')) {
        leftcoin.classList.remove('rightS')
        rightcoin.classList.remove('rightT')
      }
      if (leftcoin.classList.contains('leftS')) {
        leftcoin.classList.remove('leftS')
        rightcoin.classList.remove('leftT')
      }
      setTimeout(() => {
        if (num > 0.5) {
          leftcoin.classList.add('leftS')
          rightcoin.classList.add('leftT')
        } else {
          leftcoin.classList.add('rightS')
          rightcoin.classList.add('rightT')
        }
      }, 60)
      setTimeout(() => {
        this.message = 'click'
      }, 3400)
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
    .coin {
      /* position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0; */
      // background: #f9f0e7;
      z-index: -1;
        .headerPart {
            // padding: 4rem 0;
            padding-bottom: 4rem;
            color: red;
            text-align: center;
            .myTitle {
                color: #3cc51f;
                font-size: 3.6rem;
                font-weight: 400;
            }
            .info {
                color: gray;
                font-size: 1.6rem;
                text-align: center;
                width: 80%;
                margin: 0 auto;
            }
        }
        .iconPart {
           position: relative;
           width: 100%;
           height: 13rem;
           text-align: center;
           padding-top: 1rem;
          .leftCircle {
            margin: 0 auto;
            position: absolute;
            width: 9rem;
            height: 9rem;
            border: 1.5rem solid #DE7C23;
            border-radius: 50%;
            clip: rect(0, 6rem, 12rem, 0);
            left: 50%;
            margin-left: -6rem;
          }
          .topCircle {
            margin: 0 auto;
            clip: rect(0, 4.5rem, 9rem, 0);
            margin-left:-4.5rem;
            position: absolute;
            width: 6rem;
            height: 6rem;
            left: 50%;
            border: 1.5rem solid #E7A060;
            border-radius: 50%;
            margin-top:1.5rem;
            transform: rotate(90deg);
          }
          .infoText {
            width: 3.5rem;
            height: 3.5rem;
            position: absolute;
            left: 50%;
            text-align: center;
            margin-top: 4.5rem;
            margin-left: -1.75rem;
            color: #E7A061;
            cursor: pointer;
            font-size: 2rem;
          }
          .leftS {
            transform:rotate(1080deg);
            transition: transform 3s ease;
          }
          .leftT {
            transform:rotate(-1080deg);
            transition: transform 3s ease;
          }
          .rightS {
            transform:rotate(1260deg);
            transition: transform 3s ease;
          }
          .rightT {
            transform:rotate(-1260deg);
            transition: transform 3s ease;
          }
        }
        .footerPart {
          padding: 1rem 2rem;
          overflow: auto;  
          margin-top: 30px;
         .yes {
          float: left;   
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
          background: #E7A060;
          color: #fff;
          text-align: center;
          line-height: 4rem;
          font-size: 1.4rem;
         }   
         .no {
          float:right;
          width: calc(4rem - 2px);
          height: calc(4rem - 2px);
          border-radius: 50%;
          border: 2px solid #ccc;
          background: #fff;
          // color: #fff;
          text-align: center;
          line-height: calc(4rem - 2px);
          font-size: 1.4rem;
         } 
        }
    }
</style>
