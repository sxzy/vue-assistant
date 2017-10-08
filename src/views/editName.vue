<template>
  <div class="editName">
     <div class="headerPart">
        <h1 class="myTitle">编辑昵称</h1>
        <p class="info">记得给自己选个头像哦~</p>
      </div>
      <div class="editPart"><input type="text" placeholder="记录点什么呢~~" v-model="name"></div>
      <div class="fixBottom spacing confirm slideIn dataPlan">
        <a href="javascript:;" class="weui-btn weui-btn_primary" @click="setName">添加</a>
      </div>
      <div class=iconPart>
        <img :src='"static/image/head/"+icon' alt="" v-for="icon in icons" :key=icon>
      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      icons: ['alligator.png', 'deer.png', 'donkey.png', 'horse.png', 'mouse.png', 'pig.png', 'rabbit.png', 'seal.png', 'snake.png'],
      name: ''
    }
  },
  methods: {
    setName () {
      localStorage.setItem('name', JSON.stringify(this.name))
      this.$router.push({path: '/'})
    }
  },
  mounted () {
    this.name = JSON.parse(localStorage.getItem('name') || '[]')
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
    .editName {
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
                border-bottom: 1px solid #3cc51f;
                width: 90%;
                font-size: 1.7rem;
              }
        }
        .fixBottom {
          position: fixed;
          bottom: 0px; 
          width: 100%;   
        }
        .iconPart {
            padding: 1rem;
             img {
                 width: 2rem;
                 height: 2rem;
             }
        }
       
    }
</style>
