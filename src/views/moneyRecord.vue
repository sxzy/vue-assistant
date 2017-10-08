<template>
  <div class="recordMoney">
      <div class="tabPart">
          <div class="part" :class="{hightlight: highlight === 'output'}"  
           :style="{background: highlight === 'output' ? hoverColor : '', color: highlight === 'output' ? '#fff' : hoverColor}"
          @click="tab('output')">支出</div>
          <div class="part" :class="{hightlight: highlight === 'income'}" 
          :style="{background: highlight === 'income' ? hoverColor : '', color: highlight === 'income' ? '#fff' : hoverColor}"
          @click="tab('income')">收入</div>
      </div>
      <div class="outputPart">
        <div class="header">
          <div class="timePicker"><input style="border: 1px solid #8391a5;" type="text" v-model=pickerFormateValue @mousedown="selectDate"></div>
          <div class="moneyPart"><input style="border:1px solid #8391a5;" type="text" placeholder="￥0.00" v-model="consumeMoney"></div>
        </div>
        <div class="consumeType" >
          <div class="iconwrap" @click="selectIcon(icon.name)" v-for="icon in showIcon" :key="icon.name" v-show="icon.type === true">
            <span class="shoppingicon" :class="{select: selectedIcon === icon.name}">
              <i class="iconfont" :class="[{selected: selectedIcon === icon.name}, icon.iconClass]"></i>
              </span>
              <span class="title">{{icon.title}}</span>
          </div>
          <div class="iconwrap" @click="selectIcon('setting')">
            <span class="shoppingicon" :class="{select: selectedIcon === 'setting'}">
              <i class="iconfont" :class="[{selected: selectedIcon === 'setting'}, 'icon-tripshezhishi']"></i>
              </span>
              <span class="title">设置</span>
          </div>
        </div>
        <!-- <div class="memo">
          <input type="text" placeholder="写点什么吧（最多50字）">
        </div> -->
      </div>
      <div class="fixBottom spacing confirm slideIn dataPlan">
        <a href="javascript:;" class="weui-btn weui-btn_primary" @click="submit" v-show= "Edittype === 'edit'"> <span style="font-size: 2rem">+</span> 确认编辑 </a>
        <a href="javascript:;" class="weui-btn weui-btn_primary weui-btn-add" @click="submit" v-show= "Edittype === 'add'"> <span style="font-size: 2rem">+</span> 记一笔 </a>
      </div>
      <mt-datetime-picker ref="picker"  type="date" v-model="pickerDateValue"  @confirm="handleConfirmDate" 
      :startDate = "new Date()"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日">
      </mt-datetime-picker> 
  </div>
</template>
<script>
// import bus from '@/services/bus'
export default {
  props: ['userinfo'],
  data () {
    return {
      highlight: '',
      type: '', // 收入还是支出
      selectedIcon: '', // 被选中的消费项目icon
      outputIcon: [],
      showIcon: [],
      incomeIcon: [],
      pickerDateValue: '',
      pickerFormateValue: '', // 当前这个项目的消费时间，2017-02-12
      consumeDate: '9月24日', // 当前这个项目的消费时间
      consumeMoney: '',  // 当前这个项目的消费金额,消费的金额
      consumeList: '',
      Edittype: 'add',
      hoverColor: ''
    }
  },
  watch: {
    highlight (val) {
      if (this.highlight === 'output') {
        this.showIcon = this.outputIcon
        this.type = '支出'
      } else {
        this.showIcon = this.incomeIcon
        this.type = '收入'
      }
    }
  },
  methods: {
    tab (name) {
      this.highlight = name
    },
    selectIcon (name) {
      this.selectedIcon = name
      if (name === 'setting') {
        this.$router.replace({path: '/setIcon'})
      }
    },
    getIconList () {
      this.outputIcon = JSON.parse(localStorage.getItem('outputIcon') || '[]')
      this.incomeIcon = JSON.parse(localStorage.getItem('incomeIcon') || '[]')
      console.log(this.incomeIcon, this.outputIcon, '这是新的输出icon', '这是新的输入icon')
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
      {name: 'beauty', title: '美容', iconClass: 'icon-meirong', type: true}]
        localStorage.setItem('outputIcon', JSON.stringify(this.outputIcon))
        localStorage.setItem('incomeIcon', JSON.stringify(this.incomeIcon))
      }
    },
    submit () {
    // 向后台提交这个消费项目的日期 消费类型 消费金额 以及 收入支出情况
    // editConsumeInfo 是当前正在编辑的消费信息以及消费情况
      let consumeList = []
      let newEditItem = {type: this.type, money: this.consumeMoney, date: this.pickerFormateValue, icontype: this.selectedIcon}
      let oldEditItem = JSON.parse(localStorage.getItem('editItem') || '[]')
      let editIndex = JSON.parse(localStorage.getItem('editIndex') || '[]')
      consumeList = JSON.parse(localStorage.getItem('list') || '[]')
      console.log(consumeList, '当前的消费项目的list')
      if (oldEditItem.length === 0) {
        consumeList.push(newEditItem)
      } else {
        consumeList[editIndex] = newEditItem
      }
      localStorage.setItem('list', JSON.stringify(consumeList))
      localStorage.removeItem('editItem')
      this.type = ''
      this.selectedIcon = ''
      this.consumeMoney = ''
      this.pickerFormateValue = ''
      // 判断月份字段是否已经存在
      this.$router.replace({path: '/money'})
    },
    selectDate () {
      this.$refs.picker.open()
      this.pickerFormateValue = this.setDateFormate(this.pickerDateValue)
    },
    handleConfirmDate () {
      this.pickerFormateValue = this.setDateFormate(this.pickerDateValue)
    },
    myhandle (val) {
      console.log(val, '这是从上个页面传来的数据')
    },
    setDateFormate (date) {
      let y = date.getFullYear()
      let m = (+date.getMonth()) + 1
      let d = date.getDate()
      return (y + '-' + m + '-' + d)
    }
  },
  created () {
    // 这里我将icon的list给保存下来了
    // bus.$on('get', this.myhandle)
  },
  mounted () {
    this.getIconList()
    let editItem = JSON.parse(localStorage.getItem('editItem') || '[]')
    if (editItem.length !== 0) {
      this.Edittype = 'edit'  // 当前是编辑状态
      // console.log('你有没有进来啊')
      this.type = editItem.type
      this.selectedIcon = editItem.icontype
      this.consumeMoney = editItem.money
      this.pickerFormateValue = editItem.date
      if (this.type === '支出') {
        this.highlight = 'output'
        this.showIcon = this.outputIcon
      } else {
        this.highlight = 'income'
        this.showIcon = this.incomeIcon
      }
    } else {
      this.Edittype = 'add'  // 当前是新增状态
      this.pickerFormateValue = this.setDateFormate(new Date())
      this.highlight = 'output'
      this.showIcon = this.outputIcon
      this.selectedIcon = ''
      this.consumeMoney = ''
    }

    // 设置颜色
    this.$nextTick(() => {
      this.hoverColor = this.userinfo.color
      this.$el.querySelector('.tabPart .part:not(.hightlight)').style.color = this.userinfo.color
      this.$el.querySelector('.tabPart .part:not(.hightlight)').style.borderColor = this.userinfo.color
      this.$el.querySelector('.tabPart .part').style.borderColor = this.userinfo.color
      this.$el.querySelector('.weui-btn_primary').style.backgroundColor = this.userinfo.color
      this.$el.querySelector('.weui-btn-add').style.backgroundColor = this.userinfo.color
    })
  },
  beforeDestroy () {
    // bus.$off('get', this.myhandle)
    localStorage.removeItem('editItem')
    localStorage.removeItem('editIndex')
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
.recordMoney {
  padding: 0 2rem;
  box-sizing: border-box;
  input {
    outline: none;
  }
   .tabPart {
      display: flex;
    /* border: 1px solid red; */
      margin: 1.2rem 0rem;
      color: white;
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
    .outputPart {
      .header {
        display: flex;
        padding: 1rem 0rem;
        .timePicker{
          width: 8rem;
          margin-right: 1rem;
          input {
            width: 100%;
            text-align: center;
          }
        }
        .moneyPart {
          flex: 1;
          input {
            width: 100%;
            box-sizing: border-box;
          }
        }
      }
    }
    .memo {
      input {
        width: 100%;
        box-sizing: border-box;
      }
    }
    .consumeType {
      margin: 0 -0.5rem;
      display: flex;
      flex-wrap: wrap;
      .iconwrap {
        width: 5rem;
        padding: 0 0.4rem;
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
        margin: 0.5rem;
        color: gray;
      }
      i {
        font-size: 2.5rem
      }
      .title {
        font-size: 1rem;
        width: 4rem;
        display: inline-block;
        text-align: center;
        margin: 0.5rem;
      }
    }
    .selected {
      color: black;
    }
    .select {
      background: #FFAB00 !important;
      border: #FFAB00 !important;
    }
    .fixBottom {
      position: fixed;
      bottom: 0px;
      width: 100%;  
      left: 0px;  
    }
}
</style>

