<template>
  <div class="when">
     <div class="headerPart">
        <h1 class="myTitle">今天是{{weekNum}}</h1>
        <p class="info">今天放假啦~~~赶紧去happy吧</p>
      </div>
  </div>
</template>
<script>
  export default {
    props: ['userinfo'],
    data () {
      return {
        weekNum: ''
      }
    },
    methods: {
      getWeek () {
        let week = []
        week[0] = '星期日'
        week[1] = '星期一'
        week[2] = '星期二'
        week[3] = '星期三'
        week[4] = '星期四'
        week[5] = '星期五'
        week[6] = '星期六'
        let d = new Date()
        let weekNow = d.getDay()
        return week[weekNow]
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.weekNum = this.getWeek()
        // 设置颜色
        this.$el.querySelector('.myTitle').style.color = this.userinfo.color
      })
    }
  }
</script> 
<style lang="scss" rel="stylesheet/scss">
    .when {
        .headerPart {
            padding: 4rem 0;
            color: red;
            text-align: center;
            .myTitle {
                color: #3cc51f;
                font-size: 34px;
                font-weight: 400;
            }
            .info {
                color: gray;
                font-size: 1.7rem;
            }
        }
    }
</style>
