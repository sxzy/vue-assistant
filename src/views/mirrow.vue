<template>
  <div class="mirrow">
     <div class="headerPart">
        <h1 class="myTitle" @click="editName">你的昵称</h1>
        <p class="info">为宅生活量身打造</p>
      </div>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
    .mirrow {
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
