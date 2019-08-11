<template>

    <div @mouseenter="enterSetAll()" @mouseleave="leaveSetAll()" class="allSet" v-if="allsetsz" id="setingss">
      <div id="settings" @mouseenter="enterSet()" @mouseleave="leaveSet()" v-show="!isCloseSet">
        <div @mouseenter="enterSetUlAndDetail()" @mouseleave="leaveSetUlAndDetail()">
          <ul class="sets" id="setul" @mouseleave.self="leaveSetUl()" @mouseenter.self="enterSetUl()">
            <li @mouseenter.stop="showDetail(0)"><i class="iconfont icon-shoucang1"></i><a href="">我的收藏</a></li>
            <li @mouseenter.stop="showDetail(1)"><i class="iconfont icon-shezhi"></i><a href="">基本设置</a></li>
<!--            <li @mouseenter.stop="showDetail(2)"><i class="iconfont icon-zhuti"></i><a href="">主题</a></li>-->
            <li @mouseenter.stop="showDetail(3)"><i class="iconfont icon-huanbeijing"></i><a href="">壁纸</a></li>
            <li @mouseenter.stop="showDetail(4)"><i class="iconfont icon-yinle"></i><a href="">音乐</a></li>
            <li @mouseenter.stop="showDetail(5)"><i class="iconfont icon-naozhong"></i><a href="">任务闹钟</a></li>
            <li @mouseenter.stop="showDetail(6)"><i class="iconfont icon-fankui"></i><a href="">谏言</a></li>
            <li @mouseenter.stop="showDetail(7)"><i class="iconfont icon-banquan"></i><a href="">Powered</a></li>
          </ul>
          <div class="detail" id="detail" @mouseleave.stop="leaveDetail()" @mouseenter.stop="enterDetail()" v-show="isShowDetail">
            <div id="detail_0" class="content" style="color: black">
              <Files :mywebs="mywebs"></Files>
            </div>
            <div id="detail_1" class="content">
              <BaseSet></BaseSet>
            </div>
            <div id="detail_2" class="content">
              主题
            </div>
            <div id="detail_3" class="content">
              <Wallpaper></Wallpaper>
            </div>
            <div id="detail_4" class="content">
              <Music></Music>
            </div>
            <div id="detail_5" class="content">
              <Clock></Clock>
            </div>
            <div id="detail_6" class="content">
              <!--              <Alarm></Alarm>-->
            </div>
            <div id="detail_7" class="content">
              <Power></Power>
            </div>
          </div>
        </div>
      </div>

    </div>

</template>

<script>
  import Wallpaper from './Settings/Wallpaper';
  import Music from './Settings/Music';
  import Alarm from './Settings/Clock';
  import BaseSet from './Settings/BaseSet';
  import Power from './Settings/Power';
  import Files from './tool/Files';
  import Clock from './Settings/Clock'
    export default {
        name: "Settings",
      props:['mywebs'],
        data(){
          return {
            //滑动设置功能的实现：
            //当鼠标移动到侧边栏时候，就会展现设置，如果鼠标在设置里面，那么isSet=true
            //    当鼠标在ul里面（isSet=true，isInUl=true）时，显示detail，同时当鼠标从ul离开（isInUl=false）到detail(isIndetail=true)里面，设置不消失
            //    当鼠标不在ul时（isSet=true，isInUl=false）(isIndetail=false)，影藏所有detail，同时当鼠标离开设置时，设置消失
            //         最后当离开detail时，如果
             allsetsz:false,
             isInAllSet:false,
             isInSet:false,
             isInUlAndDetail:false,
             isInUl:false,
             isInDetail:false,
             isCloseDetail:false,
             showDetailflag:true
          }
        },
      components:{Wallpaper,Music,Alarm,BaseSet,Power,Files,Clock},
      computed:{
        isCloseSet:{
          get(){
            //如果不在设置里面，也不在detail里面，那么应该关闭
            if(this.isInSet==false&&this.isInDetail==false){
              $("#settings").css("left","0px");
              return true;
            }else{
              //$("#settings").css("left","-200px");
              return false;
            }
          }
        },
        isShowDetail:{
          get(){
            if(this.isInAllSet==false){
              return false;
            }else{
             if(this.isInUlAndDetail==true){
               return true;
             }else{
               return false;
             }

            }
          }
        }

      },
        watch:{
          show:{
            handler(newval,oldval){
              if(newval==true){
                // 初始化设置显示
                  this.allsetsz=false;
                  this.isInAllSet=false;
                  this.isInSet=false;
                  this.isInUlAndDetail=false;
                  this.isInUl=false;
                  this.isInDetail=false;
                  this.isCloseDetail=false;
                  this.showDetailflag=true;
              }else{
                this.allsetsz=false;

                this.isInAllSet=false;
                this.isInSet=false;
                this.isInUlAndDetail=false;
                this.isInUl=false;
                this.isInDetail=false;
                this.isCloseDetail=false;
                this.showDetailflag=true;
              }
            }
          }
        },
        methods:{
          enterSetUlAndDetail(){
            this.isInUlAndDetail=true;
          },
          leaveSetUlAndDetail(){
            this.isInUlAndDetail=false;
          },
          enterSetAll(){
            // console.log("执行了true");
            this.isInAllSet=true;
          },
          leaveSetAll(){
            this.isInAllSet=false;
            // console.log("执行了false");
          },
          showDetail(index){
            $(".sets li:eq("+index+")").addClass('activeLi');
            $("#detail_"+index).css('display','block');
            $("#detail_"+index).siblings().css('display','none');
            $(".sets li:eq("+index+")").siblings().removeClass('activeLi');

          },
          enterDetail(){
            this.isInDetail=true;
          },
          leaveSetUl(){
             this.isInUl=false;
          },
          enterSetUl(){
            this.isInUl=true;
            // console.log(this.isInUl);
          },
          leaveDetail(){
            this.isInDetail=false;
          },
          enterSet(){
            this.isInSet=true;
            // console.log(this.isInSet);
          },
          leaveSet(){
            this.isInSet=false;
            // console.log(this.isInSet);
          }
        },
        mounted() {
          this.allsetsz=true;
          //当鼠标到达左侧，使设置板块出现
          let flag=false;
          $("#settingzz").bind('click',()=>{
            if(!flag){
              $("#settings").css("left","0px");
              this.isInSet=true;
              this.isInAllSet=true;
            }else{
              $("#settings").css("left","-200px");
              this.isInSet=false;
              this.isInAllSet=false;
            }
            flag=!flag;
          });


          $("#settingzz2").bind('click',()=>{
            if(!flag){
              $("#settings").css("left","0px");
              this.isInSet=true;
              this.isInAllSet=true;
            }else{
              $("#settings").css("left","-200px");
              this.isInSet=false;
              this.isInAllSet=false;
            }
            flag=!flag;
          });
          $("#settings4").bind('click',()=>{
            if(!flag){
              $("#settings").css("left","0px");
              this.isInSet=true;
              this.isInAllSet=true;
            }else{
              $("#settings").css("left","-200px");
              this.isInSet=false;
              this.isInAllSet=false;
            }
            flag=!flag;
          })

          //检测滚动事件
          $(window).bind("mousemove",($event)=>{
            if($event.pageX<3){
              $("#settings").css("left","0px");
              this.isInSet=true;
              this.isInAllSet=true;
            }
          })
        }
    }
</script>

<style scoped>
.allSet{
  transition:all 0.5s
}
  .detail{

    color: white;
  }
  .detail>*{
    display: none;
  }

  .content{
    margin-left:30px;
    margin-right: 30px;
  }
  #settings{
    position: fixed;
    top:0;
    left: -200px;
    width:200px;
    bottom: 0;
    background-color: rgba(0,0,0,0.9);
    transition: all 0.5s;
    z-index: 2000;
  }
  .detail{
    position: fixed;
    top:0;
    left:200px;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
    padding-top:30px;
    padding-bottomp:30px;
  }
  .sets{
    list-style: none;
    padding-left: 10px;
    padding-top: 20px;
  }
  .sets li {
    transition: all 0.1s;
    height:50px;
    line-height: 50px;
    display: flex;
    flex-direction: row;
  }
  .sets li:hover{
    border-right: 3px solid rgba(238,10,69,0.8);

  }
  .activeLi{
    border-right: 3px solid rgba(238,10,69,0.8);
  }
  .sets li a{

    transition: all 0.3s;
    display: block;
    width: 100%;
    color: rgba(255,255,255,0.8);
    text-decoration: none;
    margin-left: 20px;
  }
  .sets li:hover a{
    color: rgba(244,90,141,1);
  }
  .sets li i{
    transition: all 0.5s;
    color: rgba(255,255,255,0.5);
    margin-top:2px;
  }
  .sets li:hover i{
    color: rgba(255,255,255,1);
  }
</style>
