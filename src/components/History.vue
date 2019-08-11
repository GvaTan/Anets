<template>
    <div class="all">
      <div class="left">
        <img id="logo" src="../../static/image/logo/logo3.png" alt="帝网组织" width="200px">
      </div>
      <div class="right">
         <ul>
           <li  v-for="(item,index) in inputHistory"><a target="_blank" :href="['https://www.baidu.com/s?wd='+item]">{{item}}</a></li>
<!--           <li  id="dataHistory" v-for="(item,index) in newinputHistory" :class="{'associateActive':index==currentIndex}"><a :href="[baseQueryLink.action+'?'+baseQueryLink.name+'='+item]" target="_blank" @click="changeInputValue(item)">{{item}}</a><i id="removeHistory" class="iconfont icon-shanchu" @click="removeHistory(index)"></i></li>-->
         </ul>
      </div>
    </div>
</template>

<script>
    export default {
      name: "History",
      data(){
          return {
            inputHistory:[]
          }
      },
      mounted() {
          if(localStorage.getItem('inputHistory')){
            this.inputHistory=JSON.parse(localStorage.getItem('inputHistory'));
          }
      }
    }
</script>

<style scoped>
.all{
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: black;
  display: flex;
  flex-direction: row;
}
  .left{
    float: left;
    position: fixed;
    width:20%;
    height: 80%;
    top: 10%;
    bottom: 10%;
    border-right: 1px solid rgba(255,255,255,0.5);
  }

  .left #logo{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
  }

  .right{

    width:80%;
    height: 80%;
    position: absolute;
    left: 20%;
    top:10%;
    margin-left: 150px;
    overflow: auto;

  }
.right ul{
  list-style: disc;
  color: white;

}
</style>
