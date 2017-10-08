<template>
  <div class="memo">
     <div class="headerPart">
        <h1 class="myTitle">今天记点什么</h1>
        <p class="info">除了好好学习天天向上，你能做点别的吗</p>
      </div>
      <div class="editPart"><input type="text" placeholder="记录点什么呢~~" v-model=newMemo></div>
      <div class="weui-cells">
            <div class="weui-cell weui-cell_access" v-for="(memo,index) in memos" :key=memo @click=showDialog(index)>
                <div class="weui-cell__bd">{{memo}}</div>
                <div class="weui-cell__ft" style="font-size: 0">
                    <!-- <span class="weui-badge weui-badge_dot" style="margin-left: 5px;margin-right: 5px;"></span> -->
                </div>
            </div>
        </div>
      <div class="fixBottom spacing confirm slideIn dataPlan">
        <a href="javascript:;" class="weui-btn weui-btn_primary" @click=addMemo>添加</a>
      </div>
      <!-- 删除的确定以及消失的提示框 -->
      <div class="js_dialog hideDialog" id="iosDialog1"  v-bind:class="{ showDialog: confirmShow }" @click="hideDialog">
        <div class="weui-mask"></div>
        <div class="weui-dialog" >
            <div class="weui-dialog__hd"><strong class="weui-dialog__title">删除备忘录</strong></div>
            <div class="weui-dialog__bd">真的要删除当前备忘吗?</div>
            <div class="weui-dialog__ft">
                <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click=hideDialog>取消</a>
                <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click=deleteMemo>确定</a>
            </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  props: ['userinfo'],
  data () {
    return {
      memos: [],
      newMemo: '',
      confirmShow: false,
      activeIndex: ''
    }
  },
  watch: {
    memos () {
      localStorage.setItem('memo', JSON.stringify(this.memos))
    }
  },
  mounted () {
    this.$nextTick(() => {
      // 设置颜色
      this.$el.querySelector('.myTitle').style.color = this.userinfo.color
      this.$el.querySelector('.weui-btn_primary').style.backgroundColor = this.userinfo.color
      this.$el.querySelector('.editPart input').style.borderColor = this.userinfo.color
    })
  },
  methods: {
    addMemo () {
      if (this.newMemo !== '') {
        this.memos.push(this.newMemo)
        this.newMemo = ''
      }
    },
    deleteMemo () {
      this.memos.splice(this.activeIndex, 1)
    },
    showDialog (index) {
      this.confirmShow = true
      this.activeIndex = index
    },
    hideDialog () {
      this.confirmShow = false
    }
  },
  created () {
    this.memos = JSON.parse(localStorage.getItem('memo') || '[]')
    if (this.memos.length === 0) {
      localStorage.setItem('memo', JSON.stringify(this.memos))
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
    .memo {
        .headerPart {
            padding-bottom: 2rem;
            color: red;
            text-align: center;
            .myTitle {
                color: #3cc51f;
                font-size: 3.2rem;
                font-weight: 400;
            }
            .info {
                color: gray;
                font-size: 1.6rem;
            }
        }
        .editPart {
          text-align: center;
          padding: 10px 15px;
          input {
            border: none;
            outline: none;
            height: 3rem;
            border-bottom: 1px solid #3cc51f;
            width: 100%;
            font-size: 1.6rem;
          }
        }
        .fixBottom {
          position: fixed;
          bottom: 0px; 
          width: 100%;   
        }
        .showDialog {
            opacity: 1!important;
            display: block!important;
        }
        .hideDialog {
            opacity: 0;
            display: none;
        }
    }
</style>
