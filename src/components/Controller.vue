<template>
   <div class="all">

     <audio  src="../../static/audio/redking.wav" hidden="hidden" id="audio" ></audio>

     <div  class="header">

       <div class="box">
<!--         <i style="float: left;margin-top: 6px;margin-left: 5px;opacity: 0.7" class="iconfont icon-shezhi" @mouseenter="showSet()"></i>-->
         <h3 style="position:relative">

           <div class="quickset" @mouseenter="quickSetShow=true" @mouseleave="quickSetShow=false">
             <span style='float:right;margin-right:5px;padding-bottom: 5px' id="settingzz2"> <i   class="iconfont icon-shezhi1" style="font-size: 20px;"></i></span>
             <ul v-show="quickSetShow">
               <li @click="customShow.all=!customShow.all"><i class="iconfont icon-xianshi" v-if="customShow.all"></i><i class="iconfont icon-biyan" v-if="!customShow.all"></i>所有版块</li>
               <li @click="customShow.common=!customShow.common"><i class="iconfont icon-xianshi" v-if="customShow.common"></i><i class="iconfont icon-biyan" v-if="!customShow.common"></i>常用网址</li>
               <li @click="customShow.recommend=!customShow.recommend"><i class="iconfont icon-xianshi" v-if="customShow.recommend"></i><i class="iconfont icon-biyan" v-if="!customShow.recommend"></i>推荐板块</li>
               <li @click="customShow.history=!customShow.history"><i class="iconfont icon-xianshi" v-if="customShow.history"></i><i class="iconfont icon-biyan" v-if="!customShow.history"></i>访问历史</li>
               <li @click="customShow.remind=!customShow.remind"><i class="iconfont icon-xianshi" v-if="customShow.remind"></i><i class="iconfont icon-biyan" v-if="!customShow.remind"></i>功能指南</li>
               <li style="font-weight: bold;opacity: 0.7; color: rgba(244,90,141,1);">显示设置</li>
               <div style="border-top: 1px solid white;margin-bottom: 10px;"></div>
               <li id="settings4" style="font-weight: bold;opacity: 1; ">所有设置</li>

             </ul>
           </div>
           <div class="timezz" @mouseenter="timeshow=true" @mouseleave="timeshow=false">
             <span style='float:right'  id="time"> Time:{{simpleTime}}</span>
              <span class="timeset" v-if="timeshow">
                日期：{{fullTime}} <br><br>
                时间：{{simpleTime}}<br><br>
                天气：开发中...
              </span>
           </div>
           <div style='float:right;margin-right:50px' ></div>&nbsp;
           <div class="mine" @mouseenter="myset=true" @mouseleave="myset=false">
                  <span  v-html="users"></span>
             <ul v-show="myset">
               <li>
                 <a href="/blog/" target="_blank"> Our博客</a>
               </li>
               <li id="settingzz">
                 个性自定义
               </li>
               <li>
                 <a href="/user/register.jsp" target="_blank">注册</a>
               </li>
               <li>
                 <a href="/user/login.jsp" target="_blank">登录</a>
               </li>
             </ul>
           </div>
         </h3>
       </div>
     </div>

     <Dialog :show="showDialog" @close="closeDialog()" :dialogTitle="dialogTitle" :dialogContent="dialogContent"></Dialog>
     <SmartTip @close="tip.show=false" :show="tip.show" :msg="tip.msg" :button="tip.button"></SmartTip>
   </div>
</template>

<script>
    import '../../static/js/Controller';
    import  Dialog from './tool/Dialog';
    import  SmartTip from './tool/SmartTip';
    export default {
      name: "Controller",
      components:{
        Dialog,SmartTip
      },
      computed:{
        users:{
          get(){
            if(this.$store.state.user!=null&&this.$store.state.user!=''){
              return "<a href='./me' style='color:purple' target='_blank'>"+this.$store.state.user.name+"</a>";
            }else{
              return "<a href='./me' style='color:purple' target='_blank'>离线</a>";
            }

          }
        },
        myAlarms:{
          get(){
            return this.$store.state.myAlarm;
          }
        }
       },
      data(){
        return {
          quickSetShow:false,
          timeshow:false,
          myset:false,
          showDialog:false,
          dialogTitle:'',
          dialogContent:'',
          simpleTime:'',
          fullTime:'',
          second:'',
          week:'',
          hour:null,
          minute:null,
          timer:null,
          showCommon:true,
          alarm:true,
          tip:{show:false,msg:'',button:''},
          customShow:{remind:true,history:true,recommend:true,all:true,common:true}
        }
      },
      watch:{
        minute(newval,oldval){

            // console.log(newval);

            //循环闹钟

          let temp=this.myAlarms;
          if(temp!=null&&temp!=[]){
             for(let i=0;i<temp.length;i++){
                let everyAlarm=temp[i];
                if(everyAlarm.name=="日内闹钟"&&everyAlarm.state==1&&this.hour==everyAlarm.hour){
                   for(let j=0;j<everyAlarm.scope.length;j++){
                     if(everyAlarm.scope[j]==this.week&&newval==everyAlarm.minute){
                         this.alarms();
                     }
                   }
                }else{
                  if(newval==everyAlarm.minute&&everyAlarm.state==1){
                    // alert(1);
                    for(let j=0;j<everyAlarm.scope.length;j++){
                      if(everyAlarm.scope[j]==this.week){
                        this.alarms();
                      }
                    }
                  }



                }
             }
          }


        },
        customShow:{
          handler(newval,oldval){

               // alert(newval.history);
               localStorage.setItem("customShow2",JSON.stringify(newval));
            this.$store.commit("changeCustomeShow",this.customShow);

          },deep:true
        }
      },
      mounted(){
        let timer1=setTimeout(()=>{
          setInterval(()=>{
            this.countTime();
          },500);
        },3000);


      },
      created(){
        if(localStorage.getItem("clock")!=null){
          let history=JSON.parse(localStorage.getItem("clock"));
          this.$store.commit("changeMyAlarm",history);
        }

        if(localStorage.getItem("customShow2")!=null){

          this.customShow=JSON.parse(localStorage.getItem("customShow2"));
          // alert(this.customShow.history)
          this.$store.commit("changeCustomeShow",this.customShow);

        }else{
          this.$store.commit("changeCustomeShow",this.customShow);
        }
      },
      methods:{
        alarms(){
          if(this.alarm){
            let timer4=setTimeout(()=>{

              document.getElementById("audio").play();
              this.timer=setInterval(()=>{
                document.getElementById("audio").play();
              },1000);
              this.dialogTitle="Task Alarm : "+this.simpleTime;
              this.dialogContent="The time is running out,you have to hurry";
              this.showDialog=true;
              clearInterval(timer4);
            },0);
          }
        },
        closeDialog(){
          this.showDialog=false;

          // alert(1);
          clearInterval(this.timer);
          this.timer=null;
          this.alarm=false;
          document.getElementById("audio").pause();
          let  id=setTimeout(()=>{
            this.alarm=true;
            clearTimeout(id);
          },1000*65)
        },
      countTime(){
        // alert(1);
        var time=new Date();
        var y=time.getFullYear();
        var mon=time.getMonth()+1;
        var d=time.getDate();
        var w=time.getDay();
        var week="";
        var hourzzz=time.getHours();
        this.hour=hourzzz;
        var h= hourzzz+"";
        var h_lenth=h.length;


        var minutezzz=time.getMinutes();
        this.minute=minutezzz;
        var min=minutezzz+"";
        var min_lenth=min.length;
        // alert(min_lenth);

        var secondzzz=time.getSeconds();
        this.second=secondzzz;
        var s=secondzzz+"";
        var s_lenth=s.length;

        // alert(min);
        if(w==0){
          week="日";
          this.week="周日"
        }else if(w==1){
          week="一";
          this.week="周一"
        }else if(w==2){
          week="二";
          this.week="周二"
        }else if(w==3){
          week="三";
          this.week="周三"
        }else if(w==4){
          week="四";
          this.week="周四"
        }else if(w==5){
          week="五";
          this.week="周五"
        }else{
          week="六";
          this.week="周六"
        }

        var minutes;
        if(min_lenth==1){
          minutes="0"+min;
        }else{
          minutes=min;
        }
        var seconds;
        if(s_lenth==1){
          seconds="0"+s;
        }else{
          seconds=s;
        }

        var hours;
        if(h_lenth==1){
          hours="0"+h;
        }else{
          hours=h;
        }


        var simpleTime=hours+":"+minutes+":"+seconds;
        var fullTime=y+"年"+mon+"月"+d+"日"+" "+"星期"+week;
        this.simpleTime=simpleTime;
        this.fullTime=fullTime;

        // $("#stime").html(simpleTime);
        // $("#fulltime").html(fullTime);
        }
      }
    }
</script>

<style scoped>

  .all{
  }
  .quickset{
    cursor: default;
    float: right;
    padding: 0px 0px;
    /*background-color: red;*/
    margin-right: 5px;
    position: relative;
    height: 25px;
  }

  .quickset ul{
    text-align: right;
    width: 110px;
    position: absolute;
    bottom: 25px;
    padding: 20px 10px;
    padding-bottom: 10px;
    background-color: rgba(0,0,0,0.7);
    list-style: none;
    margin-left: -80px;
    font-size: 15px;
    font-family: "Helvetica Neue","Helvetica","Arial","PingFang SC","Hiragino Sans GB", "Microsoft YaHei","WenQuanYi Micro Hei", sans-serif;
  }

  .quickset ul li{
    margin-bottom: 10px;
  }
  .quickset ul li i{
    font-size: 10px;margin-right: 5px;
    margin-bottom: 5px;
  }

  .timezz{

    cursor: default;
    float: right;
    padding: 0px 0px;
    /*background-color: red;*/
    margin-right: 20px;
    position: relative;
  }

  .timezz .timeset{
    padding: 20px 10px;
    position: absolute;
    bottom: 25px;
    width:220px;
    background-color: rgba(0,0,0,0.7);
    font-size: 15px;
    margin-left: -30px;
  }
  .mine{
    padding:  0px 5px;
    height: 25px;
    /*background-color: yellow;*/
    position: absolute;
    right: 220px;
    bottom: 0px;
  }
  .mine ul{
    cursor: default;
    width: 110px;
    font-size: 15px;
    position: absolute;
    bottom: 25px;
    background-color: rgba(0,0,0,0.7);
    list-style: none;
    padding: 10px 10px;
    padding-top: 10px;
    margin-left: -10px;
  }
  .mine ul li{
    margin-bottom: 10px;
    transition: all 0.5s;
  }
  .mine ul li:hover{
    color: rgba(244,90,141,1);
  }
  .mine ul li i{
    color: white;
    transition: all 0.5s;
  }
  .mine ul li:hover i{
    color: rgba(244,90,141,1);
  }
  .header{
    position: fixed;
    width:100%;
    left: 0px;
    bottom:0;
    height: 32px;
    color: white;
    transition: all 1s;
     /*background-color: red;*/
  }

  .header .box h1{
    margin: auto;
    margin-right: 100px;
    /* text-align: right; */
  }
  .header .box #time{
    opacity: 0.9;
  }
  *{  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    padding: 0px;
    margin:0px;
    color:white;
  }



  /* ----------------------------------滚动条------------------------------ */
  /*body滚动条样式*/
  .box::-webkit-scrollbar {

    width:0px;

    height:5px;

  }
  .box::-webkit-scrollbar-button    {
    height: 5px;
    background-color:rgba(239,6,66,0.1);

  }

  .box::-webkit-scrollbar-track     {

    background:rgba(0,0,0,0.1);


  }

  .box::-webkit-scrollbar-track-piece {
    background:rgba(0,0,0,0.1);


  }

  .box::-webkit-scrollbar-thumb{

    background:rgba(239,6,66,0.4);
    border-radius:4px;


  }

  .box::-webkit-scrollbar-corner {

    background:green;


  }

  .box::-webkit-scrollbar-resizer  {

    background:green;


  }


  #setz{
    color: rgba(255,255,255,0.7);
    transition: all 0.5s;
  }
  #setz:hover{
    color: rgba(244,90,141,1);
  }
  /*body滚动条样式*/
  .details::-webkit-scrollbar {

    width:5px;

    height:5px;

  }
  .details::-webkit-scrollbar-button    {
    height: 5px;
    background:rgba(239,6,66,0.5);

  }

  .details::-webkit-scrollbar-track     {

    background:rgba(255,255,255,0.9);


  }

  .details::-webkit-scrollbar-track-piece {
    background:rgba(255,255,255,0.9);


  }

  .details::-webkit-scrollbar-thumb{

    background:rgba(239,6,66,0.5);
    border-radius:4px;


  }

  .details::-webkit-scrollbar-corner {

    background:white;


  }

  .details::-webkit-scrollbar-resizer  {

    background:white;


  }
</style>
