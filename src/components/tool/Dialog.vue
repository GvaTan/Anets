<template>
<!--  用法举例<Dialog :show="" @button="" @close="" :dialogTitle="" :dialogContent="" :dialogBtn=""></Dialog>-->
    <div id="dialog" v-if="show" >
      <div class="dialog" style="width: 500px;">
          <div><h2>{{dialogTitle}}</h2><i  @click="trrigerClose()"  id="dialog_close" class=" iconfont icon-guanbi" ></i></div>
          <div class="dialog_content" v-html="dialogContent">
<!--            {{dialogContent}}-->
          </div>
        <div v-if="showBtn" style="width:100%;height:40px;position:relative;margin-top: 20px">
          <button @click="triggerBtn()"  style="position: absolute;left:48%;transform: translate(-50%,0)" type="button" class="btn btn-success">{{dialogBtn}}</button>
        </div>
      </div>

    </div>
</template>

<script>
    export default {
        name: "Dialog",
      props:['show','dialogTitle','dialogContent','dialogBtn'],
      data(){
          return {
            showBtn:false
          }
      },
      computed:{
          shows:{get(){

            // alert( this.$props.show);
            return this.$props.show;
            }}
      },
      methods:{
        trrigerClose(){
          // alert(333);
          this.$emit('close');
        },
        triggerBtn(){
          // alert(22);
          this.$emit('button');
        }
      },watch:{
        shows:{
            handler(){

              if(this.$props.dialogBtn==null){
                // alert(1);
                this.showBtn=false;
              }else{
                this.showBtn=true;
              }
            },
            deep:true,
            immediate: true
          }
      }
    }
</script>

<style scoped>
  *{
    color:black;
  }
#dialog{
  position:fixed;
  top:0;
  left: 0;
  background-color: rgba(0,0,0,0.4);
  z-index: 999;
  width: 100%;
  height: 100%;
}

  .dialog{

    position: absolute;
    padding-left: 10px;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: rgba(255,255,255,1);
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    box-shadow: 1px 1px 2px rgba(0,0,0,0.5);
  }


  #dialog_close{
    position: absolute;
    right: -30px;
    top:-30px;
    color:white;
  }
  .dialog_content{
    padding-bottom: 10px;
    padding-top: 10px;
  }
</style>
