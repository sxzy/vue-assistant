<template>
  <div class="editFood">
    <div class="headerPart">
        <h1 class="myTitle">编辑食物</h1>
      </div>
      <div class="editPart">
          <input type="text" placeholder="记得吃好穿好长胖胖~~" v-model="editFood" >
      </div>
      <div class="fixBottom spacing confirm slideIn dataPlan">
        <a href="javascript:;" class="weui-btn weui-btn_primary" @click="savechange">确定</a>
      </div>
  </div>
</template>
<script>
// import Bus from '@/services/bus'
export default {
  props: ['userinfo'],
  data () {
    return {
      editFood: '',
      foodList: [],
      index: ''
    }
  },
  watch: {
    editFood (val) {
      console.log(val, 'ss3')
    }
  },
  methods: {
    savechange () {
      // Bus.$emit('save', {
      //   food: this.editFood
      // })
      console.log(this.foodList)
      this.foodList[this.index].title = this.editFood
      localStorage.setItem('food', JSON.stringify(this.foodList))
      this.$router.push({path: 'EatWhat'})
    }
  },
  mounted () {
    this.foodList = JSON.parse(localStorage.getItem('food') || '[]')
    this.editFood = this.foodList[window.index].title
    this.index = window.index
    // Bus.$on('transferData', (data) => {
    //   console.log(this)
    //   console.log(this.editFood, '这是1')
    //   this.editFood = data.food
    //   this.index = data.index
    //   console.log(this.editFood, '这是2')
    // })
    // console.log(this.editFood, 'hahahkkak卡卡')
    this.$nextTick(() => {
      // 设置颜色
      this.$el.querySelector('.myTitle').style.color = this.userinfo.color
      this.$el.querySelector('.weui-btn_primary').style.background = this.userinfo.color
      this.$el.querySelector('.editPart input').style.borderColor = this.userinfo.color
    })
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
.editFood {
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
        .editPart {
          text-align: center;
          input {
            border: none;
            outline: none;
            border-bottom: 1px solid green;
            width: 90%;
            font-size: 1.6rem;
            padding-bottom: 5px;
          }
        }
         .fixBottom {
          position: fixed;
          bottom: 0px; 
          width: 100%;   
        }
}
</style>

