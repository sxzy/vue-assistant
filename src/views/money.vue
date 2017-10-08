<template>
  <div class="money">
    <back-top　:scrollmyself = 'true'></back-top>
      <div class="detailPart">
          <div class="timePicker">
              <div class="top">{{year}}年</div>
              <div @click='openMonth' class="bottom" style="cursor:pointer">{{month}}月<i class="iconfont icon-arrowdownb" style="font-size:1.5rem"></i></div>
          </div>
          <div class="moneyDetail">
              <div class="income">
                  <div class="top">支出（元）</div>
                  <div class="bottom">{{outCome}}</div>
              </div>
              <div class="outCome">
                  <div class="top">收入（元）</div>
                  <div class="bottom">{{inCome}}</div>
              </div>
          </div>
      </div>
      <div class="tabPart">
          <div class="part" :class="{hightlight: highlight === 'detail'}" 
           :style="{background: highlight === 'detail' ? hoverColor : '', color: highlight === 'detail' ? '#fff' : hoverColor}"
           @click="tab('detail')">明细</div>
          <div class="part" :class="{hightlight: highlight === 'report'}" 
           :style="{background: highlight === 'report' ? hoverColor : '', color: highlight === 'report' ? '#fff' : hoverColor}"
          @click="tab('report')">报表</div>
      </div>
      <div class="consumeList" v-show="highlight === 'detail'"  v-for="(item, index) in showConsumeList" :key="index">
          <div class="weui-cells__title" style="font-size:1rem;"><span><span>{{item.date}}</span> <span style="float:right">收入：{{item.income}}，支出：{{item.outcome}}</span></span></div>
          <div class="weui-cells" style="font-size:1.1rem;">
            <div class="weui-cell"  style="padding:2px 15px" @click="editList(singleitem)"  v-for="singleitem in item['list']" :key="singleitem.type">
                <div class="weui-cell__hd" ><span class="shoppingicon" :class="{'outcome': singleitem.type === '支出'}"><i class="iconfont" :class="iconList[singleitem.icontype]"></i></span></div>
                <div class="weui-cell__bd">
                    <span>{{iconName[singleitem.icontype]}}</span>
                </div>
                <div class="weui-cell__ft">{{singleitem.money}}</div>
            </div>
           </div>
      </div>
      <div class="reportPart"  v-show="highlight === 'report'">报表部分</div>
      <div class="fixBottom spacing confirm slideIn dataPlan">
        <a href="javascript:;" class="weui-btn weui-btn_primary" @click="recordMoney"> <span style="font-size: 2rem">+</span> 记一笔 </a>
      </div>
      <mt-datetime-picker ref="picker"  type="date" v-model="pickerDateValue"  @confirm="handleConfirmDate" 
      :startDate = "new Date()"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日">
      </mt-datetime-picker> 
      <!-- <mt-picker :slots="slots"   :showToolbar="true" @change="onValuesChange" ></mt-picker> -->
  </div>
</template>
<script>
// import bus from '@/services/bus'
export default {
  props: ['userinfo'],
  data () {
    return {
      consumeList: [
        {name: 'shopping', title: '购物', iconClass: 'icon-gouwu', money: '22', type: 'output'},
        {name: 'money', title: '理财', iconClass: 'icon-licai', money: '22', type: 'output'},
        {name: 'traffic', title: '交通', iconClass: 'icon-jiaotong', money: '22', type: 'output'},
        {name: 'fun', title: '娱乐', iconClass: 'icon-yule', money: '22', type: 'output'},
        {name: 'fun', title: '工资', iconClass: 'icon-yule', money: '22', type: 'income'}
      ], // 消费的List
      inCome: '',  // 收入
      outCome: '',  // 支出
      year: '',  // 年份
      month: '',  // 月份
      highlight: 'detail',
      // 消费类别映射表
      iconList: {
        shopping: 'icon-gouwu',
        money: 'icon-licai',
        traffic: 'icon-jiaotong',
        fun: 'icon-yule',
        meal: 'icon-icon',
        travel: 'icon-lvyou',
        medical: 'icon-yiliao',
        specialMoney: 'icon-lijin',
        beauty: 'icon-meirong',
        pay: 'icon-zhifuxinshui',
        getmoney: 'icon-jiangxuejinv',
        shorttime: 'icon-jianzhizhongdiangong',
        rate: 'icon-touzihouhuodeshouyi'
      },
      iconName: {
        shopping: '购物',
        money: '理财',
        traffic: '交通',
        fun: '工资',
        meal: '餐饮',
        travel: '旅行',
        medical: '医疗',
        specialMoney: '礼金',
        beauty: '美容',
        pay: '薪资',
        getmoney: '奖金',
        shorttime: '兼职',
        rate: '投资收益'
      },
      filterConsumeData: [],
      showConsumeList: [],
      pickerMonthValue: '',
      editIndex: '', // 当前正在编辑的条目所在的index
      slots: [
        {
          values: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        }
      ],
      showMonthPicker: false,
      pickerDateValue: '',
      hoverColor: ''  // tab背景颜色
    }
  },
  methods: {
    tab (name) {
      this.highlight = name
    },
    onValuesChange (picker, values) {
      console.log(picker, values)
    },
    openMonth () {
      console.log('eee')
      this.$refs.picker.open()
    },
    recordMoney () {
      this.$router.push({path: 'moneyRecord'})
    },
    editList (item) {
      //  点击进入编辑的页面，需要传递的参数比较多。那可不可以将这个需要用到的数据先存在一个内存里呢？
      this.$router.replace({path: '/moneyRecord'})
      let totalData = JSON.parse(localStorage.getItem('list') || '[]')
      // 点击进去之后就将数据传递到页面
      this.editIndex = this.findIndex(totalData, item)
      console.log(this.editIndex, '这是正在编辑的index', item, '正在编辑的项目')
      localStorage.setItem('editIndex', JSON.stringify(this.editIndex))
      localStorage.setItem('editItem', JSON.stringify(item))
    },
    findIndex (array, target) {
      let index = array.findIndex((item) => {
        return (item.date === target.date) && (item.type === target.type) && (item.icontype === target.icontype) && (item.money === target.money)
      })
      return index
    },
    getConsumeList (year, month) {
      // 获取当前的用户的这个月份的账单数据信息，提交的参数是月份的参数，根据这个月份的参数去获取后台数据
      this.consumeList = JSON.parse(localStorage.getItem('list') || '[]') // 获取这个月份的本地数据
      this.filterConsumeData = this.filterData(this.consumeList, year, month)
      this.sortDatabyDate()
    },
    // 通过年和月来筛选数据,返回帅选出来的数据
    filterData (data, year, month) {
      console.log(data, 'sss', year, month)
      let filterData = []
      for (let i = 0; i < data.length; i++) {
        let dateArr = data[i].date.split('-')
        if (dateArr[0] === year) {
          if (dateArr[1] === month) {
            filterData.push(data[i])
          }
        }
      }
      return filterData
    },
    handleConfirmDate (date) {
      //  选择日期时间之后将年月赋值给组件
      this.year = (date.getFullYear()).toString()
      this.month = ((+date.getMonth()) + 1).toString()
      this.getConsumeList(this.year, this.month)  // 在这里获取某一年某一月的数据
    },
    sortDatabyDate () {
      var map = []
      var dest = []
      var income = 0
      var outcome = 0
      for (let i = 0; i < this.filterConsumeData.length; i++) {
        var time = this.filterConsumeData[i].date
        if (this.filterConsumeData[i].type === '收入') {
          income = this.filterConsumeData[i].money
          outcome = 0
        } else {
          outcome = this.filterConsumeData[i].money
          income = 0
        }
        if (map.indexOf(time) === -1) {
          dest.push({
            income: +income,
            outcome: +outcome,
            sortindex: time.split('-')[2],
            date: time,
            list: [this.filterConsumeData[i]]
          })
          map.push(time)
        } else {
          for (let j = 0; j < dest.length; j++) {
            if (dest[j].date === time) {
              let oldIncome = dest[j].income
              let oldOutcome = dest[j].outcome
              dest[j].income = (+oldIncome) + (+income)
              dest[j].outcome = (+oldOutcome) + (+outcome)
              dest[j].list.push(this.filterConsumeData[i])
            }
          }
        }
      }
      console.log(dest, '这是排序之前的')
      // 再将得到的数据进行排序
      dest.sort(this.sortByfield('sortindex'))
      this.showConsumeList = dest  // 这是得到的最终的数据
      // 将得到的最终的数据，获取当前的总收入和总支出
    // 一开始先赋值为0
      this.inCome = 0
      this.outCome = 0
      for (let i = 0; i < this.showConsumeList.length; i++) {
        this.inCome = (+this.inCome) + (+this.showConsumeList[i].income)
        this.outCome = (+this.outCome) + (+this.showConsumeList[i].outcome)
      }
    },
    sortByfield (field) {
      return function (a, b) {
        return a[field] - b[field]
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      let nowTime = new Date()
      this.year = (nowTime.getFullYear()).toString()   // 日期对象如何转换成字符串形式
      this.month = (nowTime.getMonth() + 1).toString()
      this.getConsumeList(this.year, this.month)  // 就是在这里获取本月的数据

      // 设置颜色
      this.$el.querySelector('.detailPart').style.background = this.userinfo.color
      this.hoverColor = this.userinfo.color
      this.$el.querySelector('.tabPart .part:not(.hightlight)').style.color = this.userinfo.color
      this.$el.querySelector('.tabPart .part:not(.hightlight)').style.borderColor = this.userinfo.color
      this.$el.querySelector('.tabPart .part').style.borderColor = this.userinfo.color
      this.$el.querySelector('.weui-btn_primary').style.background = this.userinfo.color
    })
  }
  /* beforeDestroy () {
    console.log(this.highlight, '这是今年的数据', this, '看看组件销毁之前会发生什么')
    bus.$emit('get', {
      item: 'sss',
      date: 's'
    })
  } */
}
</script>
<style lang="scss" rel="stylesheet/scss">
  .money {
     // margin-top: 3rem;
     height: calc(100vh - 10rem);
     overflow: auto;
    .detailPart {
      display: flex;
      padding: 1rem 3rem;
      background: #1AAD19;
        .timePicker {
          width: 4rem;
          padding-right: 2rem;
          border-right: 0.1rem dotted white;
        }
        .moneyDetail {
          flex: 1;
          display: flex;
          padding-left: 2rem;
          .income {
            flex: 1;    
          }
        }
        .top {
            color: #eddfdf;
        }
        .bottom {
            color: white;
            height: 24px;
            line-height: 24px;
            // text-align: center;
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
      margin:0.5rem 1rem 0.5rem -0.8rem;
      color: #ffbb19;
    }
    .outcome {
      color: red!important;
    }
    .addIcon {
      position: fixed;
      bottom: 0px;    
    }
    .tabPart {
      display: flex;
    /* border: 1px solid red; */
      margin: 1.2rem;
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
    .fixBottom {
      position: fixed;
      bottom: 0px;
      width: 100%;    
    }
    .iconfont {
      font-size: 2.5rem;
    }
  }
</style>
