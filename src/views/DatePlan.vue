<template>
  <div class="DatePlan">
     <div class="headerPart">
         <h1 class="myTitle">今天做点什么</h1> 
         <p style="text-align:left;margin-top: 15px;"><input class="info textPart" placeholder="好好学习，天天向上啊喂~" v-model="newTask" ></input>
         <i class="add_icon iconfont icon-icon02" @click="addTask"></i>
         <!-- <span class="add_icon" @click="addTask">+</span> -->
         </p>
      </div>
      <div class="todo">
          <div class="weui-cells__title">TODOLIST</div>
          <div class="weui-cells" >
            <div class="weui-cell" v-for="(item, index) in todoTask.length" :key="index" >
                <div class="weui-cell__hd" @click="setDone(index)"> <i class="weui-icon-circle"></i></div>
                <div class="weui-cell__bd">
                    <input v-if="editId === index" type="text" v-model=todoTask[index] @blur="clearEditId">
                    <span v-if="editId !== index"  @click="setDone(index)">{{todoTask[index]}}</span>
                </div>
                <div class="weui-cell__ft"> <i class="iconfont icon-bianji-copy" :data-id="index" @click="setEditId(index)"></i></div>
            </div>
           </div>
      </div>
      <div class="todo">
          <div class="weui-cells__title">DONELIST</div>
          <div class="weui-cells">
            <div class="weui-cell" v-for="(task, index) in doneTask" :key=task>
                <div class="weui-cell__hd"> <i class="weui-icon-success" @click="cancelDone(index)"></i></div>
                <div class="weui-cell__bd">
                    <p>
                    <span class="doneTag">{{task}}</span>
                    </p>
                </div>
                <div class="weui-cell__ft"><i style="cursor:pointer"  class="weui-icon-cancel" @click="deletetask(index)"></i></div>
            </div>
           </div>
      </div>
    <div class="fixBottom spacing confirm slideIn dataPlan">
      <a href="javascript:;" class="weui-btn weui-btn_primary" @click="show('isShow')">列表操作</a>
    </div>
    <div>
        <div class="weui-mask hideDialog" id="iosMask" v-bind:class="{ showDialog: isShow }" @click="hide"></div>
        <div class="weui-actionsheet" id="iosActionsheet"  v-bind:class="{ showDetail: isShow }">
            <div class="weui-actionsheet__menu">
                <div class="weui-actionsheet__cell"  @click="show('confirmShow', 'all')">删除所有列表</div>
                <div class="weui-actionsheet__cell"  @click="show('confirmShow', 'todo')">删除todo列表</div>
                <div class="weui-actionsheet__cell"  @click="show('confirmShow', 'done')">删除done列表</div>
            </div>
            <div class="weui-actionsheet__action">
                <div class="weui-actionsheet__cell" id="iosActionsheetCancel" @click="hide">取消</div>
            </div>
        </div>
        <!-- 删除的确定以及消失的提示框 -->
        <div class="js_dialog hideDialog" id="iosDialog1"  v-bind:class="{ showDialog: confirmShow }" @click="hide">
            <div class="weui-mask"></div>
            <div class="weui-dialog" >
                <div class="weui-dialog__hd"><strong class="weui-dialog__title">清空计划</strong></div>
                <div class="weui-dialog__bd" v-show="clearType === 'all'">真的要清空当前的所有的计划吗?</div>
                <div class="weui-dialog__bd" v-show="clearType === 'todo'">真的要清空当前的todo列表的计划吗?</div>
                <div class="weui-dialog__bd" v-show="clearType === 'done'">真的要清空当前的done列表的计划吗?</div>
                <div class="weui-dialog__ft">
                    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default">取消</a>
                    <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="clearList">确定</a>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      mypart: '哈哈哈',
      newTask: '',   // 当前要增加的任务项目名称
      todoTask: [], // 待完成的项目名称
      doneTask: [], // 已经完成的项目名称。
      editId: '', // 当前被编辑的项目的名称
      myStorage: {},
      todostorageKey: 'todo',
      donestorageKey: 'done',
      isShow: false,
      confirmShow: false,
      clearType: ''
    }
  },
  props: ['userinfo'],
  created () {
  },
  watch: {
    todoTask (val) {
      this.myStorage.save(this.todostorageKey, val)
    },
    doneTask (val) {
      this.myStorage.save(this.donestorageKey, val)
    }
  },
  methods: {
    init_storage () {
      this.myStorage = {
        fetch (key) {
          let todos = JSON.parse(localStorage.getItem(key) || '[]')
          return todos
        },
        save: function (key, list) {
          localStorage.setItem(key, JSON.stringify(list))
        }
      }
      this.todoTask = this.myStorage.fetch(this.todostorageKey)
      this.doneTask = this.myStorage.fetch(this.donestorageKey)
    },
    addTask () {
      if (this.newTask !== '') {
        this.todoTask.push(this.newTask)
        this.newTask = ''
      } else {
        alert('请填写任务之后再点击添加任务')
      }
    },
    setEditId (index) {
    //   console.log($target.target.getAttribute('data-id'))
      this.editId = index
    },
    clearEditId () {
      this.editId = ''
    },
    setDone (index) {
      this.doneTask.push(this.todoTask[index])
      this.todoTask.splice(index, 1)
    },
    // kimmy: 这里应该允许回退操作
    cancelDone (index) {
      this.todoTask.push(this.doneTask[index])
      this.doneTask.splice(index, 1)
    },
    deletetask (index) {
      this.doneTask.splice(index, 1)
    },
    show (showName, type) {
      this.isShow = false
      this.confirmShow = false
      this[showName] = true
      this.clearType = type
    },
    hide (showName) {
      this.isShow = false
      this.confirmShow = false
      this[showName] = false
    },
    clearList () {
      switch (this.clearType) {
        case 'all':
          this.todoTask = []
          this.doneTask = []
          break
        case 'todo':
          this.todoTask = []
          break
        case 'done':
          this.doneTask = []
          break
      }
    }
  },
  mounted () {
    this.init_storage()
    this.$nextTick(() => {
      // 绑定设置主题的事件，一旦触发修改主题，则将当前字体颜色改为对应颜色
      this.$el.querySelector('.myTitle').style.color = this.userinfo.color
      this.$el.querySelector('.weui-btn_primary').style.backgroundColor = this.userinfo.color
      this.$el.querySelector('.add_icon').style.color = this.userinfo.color
    })
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
    .DatePlan {
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
                font-size: 1.7rem;
            }
            .textPart {
               margin-left: 15px;
                border: none;
                border-bottom: 1px solid gray;
                height: 32px;
                line-height: 32px;
                // margin:0 10px 5px 0;
                outline: none;
                width: 80%;
            }
        }
        .add_icon {    
         font-size: 2.6rem;
         position: absolute;
         right: 17px;
         line-height: 32px;
        
        }
        .doneTag {
            text-decoration: line-through;
        }
        .weui-cell__bd {
            input {
                width: 89%;
            }
            span {
                display: inline-block;
                width: 89%;
            }
        }
        .weui-cell {
          transition: 250ms ease-out;
          transform-origin: center;
          transform: scalex(1);
          transform: translate(100%, 1);
          opacity: 1;
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
        .showDetail {
            transform: translate(0, 0);
        }
    }
</style>

