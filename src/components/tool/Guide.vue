<template>
    <div id="guide" v-show="show">
      <div style="position:absolute;left:0px;top:35%">
        <img src="http://img02.taobaocdn.com:80/tfscom/TB1oyqtdoCF3KVjSZJnXXbnHFXa" alt="" width="200px">
        <span style="color: white;font-size: 30px">鼠标移到最左边显示设置</span>
      </div>

      <div style="position:absolute;right:0px;top:35%">
        <span style="color: white;font-size: 30px">鼠标向下滚动显示控制台</span>
        <img src="http://img01.taobaocdn.com:80/tfscom/TB16Zyib7xz61VjSZFtXXaDSVXa" alt="" width="200px">
      </div>
          <button class="btn" @click="trigerFather()">我知道了</button>
    </div>
</template>

<script>
    export default {
        name: "Guide",
      props:['show'],
      methods:{
        trigerFather(){
          this.$emit("button");
        }
      }
    }
</script>

<style scoped>
  #guide{
    position: fixed;
    width: 100%;
    height: 100%;
    left:0px;
    top:0px;
    background-color: rgba(0,0,0,0.5);
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgba(0,0,0,0.6);
  }

  .btn{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    width: 200px;
    height: 40px;
    background-color: transparent;
    border: 2px solid rgba(244,90,141,1);
    color: white;
    outline: none;
    transition: all 0.5s;
  }

  .btn:hover{
    background-color: rgba(244,90,141,1);
  }
</style>
