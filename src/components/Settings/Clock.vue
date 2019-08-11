<template>

    <div class="all">
      <div class="left">
        <img id="logo" src="../../../static/image/logo/logo3.png" alt="帝网组织" width="200px">
      </div>
      <div class="right">
        <!--       <h4 style="border-left: 5px solid white;padding-left: 10px;height: 20px;line-height: 20px;color:white">Time</h4>-->
        <canvas id="canvas" width="500px" height="500px" style=""></canvas>
        <Alarms></Alarms>
      </div>
    </div>


</template>

<script>
    import Alarms from './Alarm.vue' ;
    export default {
        name: "Alarm",
      components:{
          Alarms
      },
        mounted() {
          // this.canvas();
          this.countTime();
          // alert(1);
          setInterval(()=>{
            this.countTime();
          },10);
          this.initCanvas();
        },
      data(){
          return {
            simpleTime:'',
            fullTime:'',
            second:0,
            ms:0,
            minutes:0,
            hour:0,
            draw:null,
            englishWeek:''
          }
      },
      watch:{
        ms(newval,oldval){
          this.canvas(this.draw);
        }
      },
      methods:{
        countTime(){
          // alert(1);
          var time=new Date();
          var y=time.getFullYear();
          var mon=time.getMonth()+1;
          var d=time.getDate();
          var w=time.getDay();
          var week="";
          var englishWeek='';
          var h=time.getHours();
          var h_str=h+'';
          var h_lenth=h_str.length;

          var min=time.getMinutes();
          var min_str=min+'';
          var min_lenth=min_str.length;
          // alert(min_lenth);
          var s=time.getSeconds();
          var s_str=s+'';
          var s_lenth=s_str.length;
          // console.log(s);



          // alert(min);
          if(w==0){
            week="日";
            englishWeek="Sunday";

          }else if(w==1){
            week="一";
            englishWeek="Monday";
          }else if(w==2){
            week="二";
            englishWeek="Tuesday";
          }else if(w==3){
            week="三";
            englishWeek="Wednesday";
          }else if(w==4){
            week="四";
            englishWeek="Thursday";
          }else if(w==5){
            week="五";
            englishWeek="Friday";
          }else{
            week="六";
            englishWeek="Saturday";
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

          let ms=time.getMilliseconds();
          var simpleTime=hours+":"+minutes+":"+seconds;
          var fullTime=y+"年"+mon+"月"+d+"日"+" "+"星期"+week+" "+hours+":"+minutes+":"+seconds+" "+ms;
          this.simpleTime=simpleTime;
          this.fullTime=fullTime;
          this.second=s;
          this.minutes=min;
          this.hour=h;
          this.englishWeek=englishWeek;
          // 获取毫秒数

          this.ms=ms;
          // console.log(ms);
          // $("#stime").html(simpleTime);
          // $("#fulltime").html(fullTime);
        },
       initCanvas(){
          //获取画布的dom对象
          let canvas=document.getElementById("canvas");
          let draw=canvas.getContext('2d');
          this.draw=draw;
          // this.canvas(draw);
        },
        canvas(draws){


          let draw=draws;
          draw.clearRect(0,0,500,500);
          //画文字时间和星期
          draw.fillStyle="rgba(255,255,255,0.5)";
          draw.font="16px 黑体";
          draw.fillText(this.simpleTime,217,300);
          draw.fillText(this.englishWeek,225,320);
          draw.fillStyle="rgba(255,255,255,0.6)";
          draw.fillText(this.fullTime,130,490);
          //时刻度
          for(var i=0;i<12;i++){
             draw.save();
             draw.lineWidth=4;
             draw.strokeStyle="white";
             draw.translate(250,250);
             draw.rotate(i*30*Math.PI/180);

             draw.beginPath();
             draw.moveTo(0,170);
             draw.lineTo(0,190);
             draw.closePath();
             draw.stroke();
             draw.restore();
          }
          //分刻度
          for(let i=0;i<60;i++){
            draw.save();
              draw.translate(250,250);
              draw.rotate(i*6*Math.PI/180);
              draw.lineWidth=2;
              draw.strokeStyle="white";
              draw.beginPath();

              draw.moveTo(0,190);
              draw.lineTo(0,180);
              draw.closePath();
              draw.stroke();

            draw.restore();
          }


          //画时阵
          draw.save();
           draw.strokeStyle="white";
           draw.translate(250,250);
           let hours=this.hour+this.minutes/60;
           draw.rotate( hours*30*Math.PI/180);
           draw.lineWidth=6;
           draw.beginPath();
           draw.moveTo(0,0);
           draw.lineTo(0,-90);
           draw.closePath();
           draw.stroke();
          draw.restore();
          //画分针
          draw.save();
          draw.translate(250,250);

          draw.rotate(this.minutes*6*Math.PI/180);
          draw.strokeStyle="white";
          draw.lineWidth=3;
          draw.beginPath();
          draw.moveTo(0,0);
          draw.lineTo(0,-130);
          draw.closePath();
          draw.stroke();
          draw.restore();
          //画秒针
          draw.save();
          draw.translate(250,250);
          //1000ms只执行100次，1s画 10次，共6度，也就是每次画0.6度
          let mss=this.second+this.ms/1000;
          draw.rotate(mss*6*Math.PI/180);
          // console.log(this.ms);
          draw.strokeStyle="white";
          draw.lineWidth=1;
          draw.beginPath();
          draw.moveTo(0,15);
          draw.lineTo(0,-180);
          draw.closePath();
          draw.stroke();
          draw.restore();

          //画中心原点
          // draw.fillStyle="rgba(255,255,255,1)";
          // draw.lineWidth=2;
          // draw.beginPath();
          // draw.arc(250,250,4,0,360,false);
          // draw.closePath();
          // draw.fill();
          //画渐变
          draw.arc(250,250,5,0,360,false);
          var jb=draw.createRadialGradient(250,250,0,250,250,5);
          jb.addColorStop(0,"black");
          jb.addColorStop(1,"white");
          draw.fillStyle=jb;
          draw.fill();
        }
      }
    }
</script>

<style scoped>
  .all{
    /*position: fixed;*/
    width: 1500px;
    height: 100%;
    background-color: black;
    display: flex;
    flex-direction: row;
  }
  .left{
    float: left;
    position: fixed;
    width:100px;
    height: 90%;
    top: 5%;
    bottom: 5%;
    /*border-right: 1px solid rgba(255,255,255,0.5);*/
  }

  .left #logo{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
  }

  .right{

    width:80%;
    height: 90%;
    position: absolute;
    left: 100px;
    top:5%;
    margin-left: 150px;
    overflow: auto;

  }
  .right ul{
    list-style: disc;
    color: white;

  }
</style>
