<template>

    <div id="baseSet">
      <h4>无痕浏览</h4>
      <div class="content">
        <button @click="openWuhen()">开启</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button @click="closeWuhen()">关闭</button>
      </div>

      <h4>网址自动排序</h4>
      <h6>面板中的网址会根据你点击的次数自动排序，次数高者排在前面</h6>
      <div class="content">
        <button @click="openSort()">开启</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button @click="closeSort()">关闭</button>
      </div>

      <h4>UI模式</h4>
      <div class="content">
       <button @click="modeT()">默认模式</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button @click="modeJ()">极简模式</button>
      </div>

      <h4>聚焦模式</h4>
      <div class="content">
        <button @click="openJujiao()">开启</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button @click="closeJujiao()">关闭</button>
      </div>
      <Tips :message="tips.message" :show="tips.show"></Tips>
    </div>


</template>

<script>
  import Tips from '../tool/Tips';
  export default {
        name: "BaseSet",
    components:{Tips},
    data(){
          return {
            tips:{message:"",show:false},
            uiMode:{
              static:false,
              simple:false
            }
          }
    },
      methods:{
        closeJujiao(){
          localStorage.setItem("jujiao",'true');

          this.tips.message="A网导航提示：已关闭";
          this.tips.show=true;
          let a=setTimeout(()=>{this.tips.show=false;clearTimeout(a)},3000);
        },
        openJujiao(){
          localStorage.removeItem("jujiao");
          this.tips.message="A网导航提示：已开启";
          this.tips.show=true;
          let a=setTimeout(()=>{this.tips.show=false;clearTimeout(a)},3000);
        },
          closeWuhen(){//关闭无痕模式

            localStorage.setItem("isStorage",'true');//关闭无痕
            this.tips.message="A网导航提示：已关闭";
            this.tips.show=true;
            // alert(this.tips.show);
            let time=setTimeout(()=>{
              // alert(this.tips.show);
              this.tips.show=false;
              clearTimeout(time);
            },3000);
          },
          openWuhen(){//开启无痕模式
            localStorage.setItem("isStorage",'false');
            this.tips.message="A网导航提示：已开启";
            this.tips.show=true;
            let time=setTimeout(()=>{
              this.tips.show=false;
              clearTimeout(time);
            },3000);
          },
        modeT(){//ui模式--静态模式
          this.tips.message="A网导航提示：静态模式已开启";
          this.tips.show=true;
          let a=setTimeout(()=>{this.tips.show=false;clearTimeout(a)},3000);

          this.uiMode.static=true;
          this.uiMode.simple=false;
          this.$store.commit("changeUiMode",this.uiMode);

          localStorage.setItem("uiMode",JSON.stringify(this.$store.state.uiMode));
        },
        modeJ(){//ui模式--极简模式
          this.tips.message="A网导航提示：极简模式已开启";
          this.tips.show=true;
          let a=setTimeout(()=>{this.tips.show=false;clearTimeout(a)},3000);

          this.uiMode.static=false;
          this.uiMode.simple=true;
          this.$store.commit("changeUiMode",this.uiMode);

          localStorage.setItem("uiMode",JSON.stringify(this.$store.state.uiMode));
        },
        openSort(){
          localStorage.setItem("sort","true");
          this.tips.message="A网导航提示：已开启";
          this.tips.show=true;
          let a=setTimeout(()=>{this.tips.show=false;clearTimeout(a)},3000);
        },
        closeSort(){
          localStorage.removeItem("sort");
          this.tips.message="A网导航提示：已关闭";
          this.tips.show=true;
          let a=setTimeout(()=>{this.tips.show=false;clearTimeout(a)},3000);
        }
      }
    }
</script>

<style scoped>
  #baseSet h4{
    padding-left: 10px;
    height: 25px;
    line-height: 25px;
    border-left: 5px solid white;
  }

  .content{
    margin-top: 20px;
  }
  .content button{
    outline: none;
    border: 1px solid rgba(244,90,141,1);
    background-color: transparent;
    transition: all 0.2s;
    border-radius: 3px;
  }
  .content button:hover{
    background-color: rgba(244,90,141,1);
  }
</style>
