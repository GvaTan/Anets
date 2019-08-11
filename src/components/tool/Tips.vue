<template>
<!-- 用法举例 <Tips :message="tips.message" :show="tips.show"></Tips>-->
  <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutLeft">
    <div id="tips" v-if="show" style="color:white">{{message}}</div>
  </transition>

</template>

<script>
    export default {
        name: "Tips",
       props:['message',"show"],
      data(){
          return {
            // show1:this.show
          }
      },
      watch:{
          // show:{
          //   handler(newval,oldval){
          //     if(newval==true){
          //       let time=setTimeout(()=>{
          //         this.show1=false;
          //         clearTimeout(time);
          //       },3000);
          //     }
          //   },
          //   immediate:true
          // }
      }
    }
</script>

<style scoped>
#tips{
  position: fixed;
  /*width: 300px;*/
  top:48%;
  left:48%;
  padding:10px 20px;
  /*transform: translate(-50%,-50%);*/
  background-color: rgba(0,0,0,0.8);
}
</style>
