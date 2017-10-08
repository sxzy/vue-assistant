<template>
  <div class="selectIcon">
      <div class="tabPart">
          <div class="part" :class="{hightlight: highlight === 'output'}"  @click="tab('output')">支出</div>
          <div class="part" :class="{hightlight: highlight === 'income'}" @click="tab('income')">收入</div>
      </div>
       <div class="consumeList">
          <!-- <div class="weui-cells__title" style="font-size:1rem;"><span><span>昨天  星期六</span> <span style="float:right">支出 62.00</span></span></div> -->
          <div class="weui-cells" style="font-size:1.1rem;">
            <div class="weui-cell" v-for="(key, index) in iconList.length" :key="index" >
                <div class="weui-cell__hd" >
                  <span class="shoppingicon"><i class="iconfont" :class="iconList[index].iconClass"></i></span></div>
                <div class="weui-cell__bd" @click="confirmDelete(index)">
                    <span>{{iconList[index].title}}</span>
                </div>
                <div class="weui-cell__ft"><input class="weui-switch" type="checkbox" v-model="iconList[index].type"></div>
            </div>
           </div>
      </div>
      <div class="fixBottom spacing confirm slideIn dataPlan">
        <input href="javascript:;" class="weui-btn weui-btn_primary" placeholder="添加新类别" @mouseleave="showDialog" v-model="newItem">
      </div>
      <!-- 弹窗提示框 -->
      <div class="js_dialog hideDialog" id="iosDialog1"  v-bind:class="{ showDialog: confirmShow }" @click="hideDialog">
        <div class="weui-mask"></div>
        <div class="weui-dialog" >
            <div class="weui-dialog__hd" v-show="dialogType === 'add'"><strong class="weui-dialog__title">添加新项目</strong></div>
            <div class="weui-dialog__hd" v-show="dialogType === 'delete'"><strong class="weui-dialog__title">删除项目</strong></div>
            <div class="weui-dialog__bd"  v-show="dialogType === 'add'">新添加的项目会显示在项目列表的顶端，确定添加新项目吗？</div>
            <div class="weui-dialog__bd" v-show="dialogType === 'delete'">真的要删除当前的项目吗？该分类下的数据将会被删除</div>
            <div class="weui-dialog__ft">
                <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click="hideDialog">取消</a>
                <a  v-show="dialogType === 'add'" href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="addItems">确定</a>
                <a v-show="dialogType === 'delete'" href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="deleteItems">确定</a>
            </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      highlight: 'output',
      iconList: [],
      outputIcon: [],
      showIcon: [],
      incomeIcon: [],
      confirmShow: false,
      newItem: '',
      activeIndex: '',
      dialogType: ''
    }
  },
  watch: {
    highlight (val) {
      console.log('aaaaa')
      if (val === 'output') {
        this.iconList = this.outputIcon
      } else {
        this.iconList = this.incomeIcon
      }
    },
    outputIcon: {
      handler: function (val) { localStorage.setItem('outputIcon', JSON.stringify(val)) },
      deep: true
    },
    incomeIcon: {
      handler: function (val) { localStorage.setItem('incomeIcon', JSON.stringify(val)) },
      deep: true
    }
  },
  methods: {
    tab (name) {
      this.highlight = name
      console.log(this.outputIcon)
      // this.iconList = this.outputIcon
    },
    fetchData () {
      console.log('jajjaja')
    },
    showDialog (index) {
      this.confirmShow = true
      this.dialogType = 'add'
    },
    hideDialog () {
      this.confirmShow = false
    },
    addItems () {
      let newItemObj = {name: 'star', iconClass: 'icon-xing', type: 'checked'}
      newItemObj.title = this.newItem
      if (this.highlight === 'output') {
        this.outputIcon.unshift(newItemObj)
      } else {
        this.incomeIcon.unshift(newItemObj)
      }
    },
    confirmDelete (index) {
      this.confirmShow = true
      this.activeIndex = index
      this.dialogType = 'delete'
    },
    deleteItems () {
      if (this.highlight === 'output') {
        this.outputIcon.splice(this.activeIndex, 1)
      } else {
        this.incomeIcon.splice(this.activeIndex, 1)
      }
    },
    // 获取最原始的icon的list列表 请求数据 待对接
    getIconList () {
      this.outputIcon = JSON.parse(localStorage.getItem('outputIcon') || '[]')
      this.incomeIcon = JSON.parse(localStorage.getItem('incomeIcon') || '[]')
      console.log(this.incomeIcon.length, '这是一个长度的问题')
      console.log(this.outputIcon, this.incomeIcon, '这是输出的icon', '这是输入的icon')
      if (this.incomeIcon.length === 0) {
        this.incomeIcon = [
      {name: 'pay', title: '薪资', iconClass: 'icon-zhifuxinshui', type: true},
      {name: 'getmoney', title: '奖金', iconClass: 'icon-jiangxuejinv', type: true},
      {name: 'shorttime', title: '兼职', iconClass: 'icon-jianzhizhongdiangong', type: true},
      {name: 'rate', title: '投资收益', iconClass: 'icon-touzihouhuodeshouyi', type: true}]
        this.outputIcon = [
      {name: 'shopping', title: '购物', iconClass: 'icon-gouwu', type: true},
      {name: 'money', title: '理财', iconClass: 'icon-licai', type: true},
      {name: 'traffic', title: '交通', iconClass: 'icon-jiaotong', type: true},
      {name: 'fun', title: '娱乐', iconClass: 'icon-yule', type: true},
      {name: 'meal', title: '餐饮', iconClass: 'icon-icon', type: true},
      {name: 'travel', title: '旅行', iconClass: 'icon-lvyou', type: true},
      {name: 'medical', title: '医疗', iconClass: 'icon-yiliao', type: true},
      {name: 'specialMoney', title: '礼金', iconClass: 'icon-lijin', type: true},
      {name: 'shopping', title: '购物', iconClass: 'icon-gouwu', type: true},
      {name: 'money', title: '理财', iconClass: 'icon-licai', type: true},
      {name: 'traffic', title: '交通', iconClass: 'icon-jiaotong', type: true},
      {name: 'fun', title: '娱乐', iconClass: 'icon-yule', type: true},
      {name: 'meal', title: '餐饮', iconClass: 'icon-icon', type: true},
      {name: 'travel', title: '旅行', iconClass: 'icon-lvyou', type: true},
      {name: 'medical', title: '医疗', iconClass: 'icon-yiliao', type: true},
      {name: 'specialMoney', title: '礼金', iconClass: 'icon-lijin', type: true},
      {name: 'beauty', title: '美容', iconClass: 'icon-meirong', type: true}]
        localStorage.setItem('outputIcon', JSON.stringify(this.outputIcon))
        localStorage.setItem('incomeIcon', JSON.stringify(this.incomeIcon))
      }
      this.highlight = 'output'
      this.iconList = this.outputIcon
    }
  },
  mounted () {
    // 这里我将icon的list给保存下来了
    setTimeout(() => this.getIconList(), 1000)
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
  .selectIcon {
    padding: 4rem 2rem;
    box-sizing: border-box;
      .tabPart {
        display: flex;
        padding: 1.2rem 2rem;
        color: white;
        position: fixed;
        top: 4rem;
        z-index: 20;
        width: 100%;
        background: #a9f0a9;
        box-sizing: border-box;
        left: 0;
      .part {
        flex: 1;
        border: 1px solid #1AAD19;
        // background: red;
        color: #1AAD19;
        text-align: center;   
      }
      .hightlight {
        background: #1AAD19; 
        color: white;   
      }
    }
    .shoppingicon {
      display: inline-block;
      width: 4rem;
      height: 4rem;
      text-align: center;
      line-height: 4rem;
      border-radius: 50%;
      background: #f8f5f5;
      border: 1px solid #f8f5f5;
      margin:0.5rem 1rem 0.5rem -1.5rem;
      color: gray;
        i {
          font-size: 2.5rem;
          color: green;
        }
      }
      .consumeList {
        margin-top: 4rem;
      }
      .fixBottom {
        position: fixed;
        bottom: 0px; 
        width: 100%;
        left: 0px;   
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
