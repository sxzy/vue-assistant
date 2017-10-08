<template>     
    <!-- 設置顏色 -->
    <mt-popup v-model="changColor" position="bottom" class="color-panel">
      <div class="color-items">
          <span class="color-item" v-for="(item, $index) in colors"  :key="$index" @click="chooseColor(item)">
            <span class="color-cycle" :class="'bg-color' + ($index + 1)"></span>
            </span>
      </div>
    </mt-popup>
</template>

<script>
export default {
  data () {
    return {
      changColor: false,
      colors: ['#f04134', '#00a854', '#108ee9', '#f5317f', '#f56a00', '#7265e6', '#ffbf00', '#00a2ae', '#2e3238']
    }
  },
  mounted () {
  },
  methods: {
    // 假装调用接口设置颜色
    chooseColor (color) {
      this.$axios.get('./static/api.json')
        .then((data) => {
          this.$bus.$emit('set-theme', color)
          this.changColor = false
          localStorage.setItem('themeColor', color)
        })
        .catch((data) => {
          console.log(data)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
    @import '~@/assets/mixin.scss';
    .color-panel {
      width: 100%;
      padding: 10px;
      .color-items {
        display: inline-block;
        width: 100%;
      }

      .color-item {
        display: inline-block;
        width: 20%;
        text-align: center;
        margin: 10px 0;
        .color-cycle {
          display: inline-block;
          width: 4.5rem;
          height: 4.5rem;
          border-radius: 50%;
          box-shadow: 2px 2px 5px #666;
        }
      }
      @for $i from 1 to 10 {
        .bg-color#{$i} {
          background-color: nth($colors, $i)
        }
      }
     
    }
</style>
