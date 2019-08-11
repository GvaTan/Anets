<template>

    <div id="alrams"><h4 style="border-left: 5px solid white;padding-left: 10px;height: 20px;line-height: 20px">Task Alram(任务闹钟)</h4>
      <h6 style=" margin-top:25px;color:rgba(255,255,255,0.5)">说明：由于网页的特殊性，如果你不打开此网页，闹钟不会生效，此闹钟的作用是任务闹钟，当你在浏览网页的时候时刻提醒着你，而不需要你刻意去看时间甚至错过时间</h6>
      <br>

      <div>
         <h5 style="color: rgba(244,90,141,1)">我的：</h5>
        <div>
           <table class="table table-bordered">
               <thead>
                  <tr>
                    <th>类型</th><th>时间</th><th>周期</th><th>音乐</th><th>备注</th><th>状态</th><th>操作</th>
                  </tr>
               </thead>
             <tbody>
                 <tr v-for="(item,index) in myAlarmsObj">
                    <td>{{item.name}}</td><td>{{item| mytimeFilter}}</td><td>{{item.scope}}</td><td>{{item.music}}</td><td>{{item.description}}</td><td><button @click="changeState(index)">{{item | forbidden}}</button></td><td><button @click="deleteAlarm(index)">移除</button></td>
                 </tr>
             </tbody>
           </table>
        </div>
      </div>


      <div style="width: 100%;margin:auto;border:1px dashed white;margin-bottom: 30px"></div>
      <div v-for="(item,index) in alarm">
        <button @click="newAlarm(item.name)">新建{{item.name}}</button>
        <p style="color:rgba(255,255,255,0.5)" v-html="item.discription"></p>
        <br>
        <br>
      </div>


      <div id="dialog" v-if="dialog.show">

        <form  action='' role='form' class='form-horizontal'>
          <h3 style="padding-bottom: 20px">{{dialog.title}}：</h3>
          <i  @click="dialog.show=false"  id="dialog_close" class=" iconfont icon-guanbi" ></i>
          <div class='form-group' v-if="dialog.showHour">
            <label for='hour' class='col-md-2 control-label'>时：</label>
            <div class='col-md-3' >
              <input id='hour' type='number' class='form-control' v-model.number='myAlarm.hour' min='0' max='24' @input='limitHour()'>
            </div>
          </div>
          <br>
          <div class='form-group'>
            <label for='minute' class='col-md-2 control-label'>分：</label>
            <div class='col-md-3'>
              <input id='minute' type='number' class='form-control' v-model.number='myAlarm.minute' min='0' max='60' @input='limitMinute()'>
            </div>
          </div>
          <div class='form-group'>
            <label for='minute' class='col-md-2 control-label' style='margin-top: 10px'>周期:</label>
            <div class='col-md-11' style='margin-top: 15px'>
              <ul id="week" style="background-color: red">
                <li   v-for='(item,index) in alarm[0].scope' :key='index'   @click.prevent='pushScope(item,index)'><button>{{item}}</button></li>
              </ul>
            </div>

          </div>
          <div class='form-group'>
            <label for='minute' class='col-md-3 control-label' style='margin-top: 10px;margin-left:-15px'>当前所选:</label>
            <div class='col-md-9' style='margin-top: 15px'>
              {{this.myAlarm.scope}}
            </div>
          </div>
          <div class='form-group'>
            <label for='des' class='col-md-2 control-label' style='margin-top: 10px'>备注:</label>
            <div class='col-md-10' style='margin-top: 10px'>
              <input id='des' type='text' class='form-control' v-model='myAlarm.description'>
            </div>

          </div>
          <button style="margin-left: 170px" @click.prevent="confirm()">确定</button>
        </form>
      </div>

      <Dialog :show="dialog.show" @button="" @close="closeDialog()" :dialogTitle="dialog.dialogTitle" :dialogContent="dialog.dialogContent" :dialogBtn="dialog.dialogBtn"></Dialog>
    </div>


</template>

<script>
    export default {
        name: "Alarm",
      data(){
          return {
            dialog:{show:false,dialogTitle:"",dialogBtn:"",showHour:true},
            myAlarms: [],//这个数组内容为字符串，为的是防止数组里的变量的依赖变化
            myAlarmsObj:[],//这个是解析后的值
            myAlarm:{name:"日内闹钟",hour:0,minute:0,scope:[],music:["default"],state:1,description:"我有一件很重要的事情去做"},
            active:{0:false,1:false,2:false,3:false,4:false,5:false,6:false},
            currentIndex:0
          }
      },
      created(){
          //初始化历史闹钟数据
        if(localStorage.getItem("clock")!=null){
          let history=JSON.parse(localStorage.getItem("clock"));
          this.myAlarmsObj=history;
        }
      },
      filters:{
        mytimeFilter(item){
          if(item.name=="日内闹钟"){
            return  item.hour+":"+item.minute;
          }else{
            return  item.minute+"分";
          }
        },
        forbidden(item){
          if(item.state==1){
            return "禁用";
          }else{
            return "开启";
          }
        }
      },
      computed:{
          alarm:{
            get(){
              return this.$store.state.alarm;
            }
          }
      },
      watch:{
          myAlarms:{
            handler(newval,oldval){
               // 循环数组，解析每个字符串为对象
              if(this.myAlarms.length!=0){
                //初始化数组
                this.myAlarmsObj=[];
                //把历史添加进数组中
                if(localStorage.getItem("clock")!=null){
                  let history=JSON.parse(localStorage.getItem("clock"));
                  this.myAlarmsObj=[...this.myAlarmsObj,...history];
                }
                for(let i=0;i<newval.length;i++){
                  this.myAlarmsObj.unshift(JSON.parse(newval[i]));
                }
                  this.myAlarms=[];
              }



              //更新状态值中对象
              this.$store.commit("changeMyAlarm",this.myAlarmsObj);
              // alert(4);

              // localStorage.removeItem("clock");
              localStorage.setItem("clock",JSON.stringify(this.myAlarmsObj));
            }

          },
        myAlarmsObj:{
            //将值放入状态盒中
            handler(newval,oldval){
              // alert(newval[0].state);
              // alert(2);
              // this.$store.commit(changeMyAlarm(newval));

              this.$store.commit("changeMyAlarm",newval);
              // alert(1);
              // console.log(1);
              // alert(newval[0].state);
              localStorage.setItem("clock",JSON.stringify(newval));
            },
          deep:true
        }
      },
      methods:{
        deleteAlarm(index){
          // alert(this.myAlarmsObj.length);
          this.myAlarmsObj.splice(index,1);
          // alert(this.myAlarmsObj.length);
        },
        changeState(index){
          if(this.myAlarmsObj[index].state==1){
            this.myAlarmsObj[index].state=0;
          }else{
            this.myAlarmsObj[index].state=1
          }
        },
        closeDialog(){
          this.dialog.show=false;
        },
        limitHour(){

          if(this.myAlarm.hour>24){
            this.myAlarm.hour=24;
          }
          if(this.myAlarm.hour<0){
            this.myAlarm.hour=0;
          }
        },
        limitMinute(){
          if(this.myAlarm.minute>60){
            this.myAlarm.minute=60;
          }
          if(this.myAlarm.minute<0){
            this.myAlarm.minute=0;
          }
        },
        pushScope(item1,index1){


          if(this.active[index1]==false){
            var str="#week li:eq("+index1+")";
            $(str).addClass("bg");
            this.active[index1]=true;
            this.myAlarm.scope.push(item1);
          }else{
            var str="#week li:eq("+index1+")";
            $(str).removeClass("bg");
            this.active[index1]=false;
            //删除数组中的该项
            this.myAlarm.scope.forEach((item,index)=>{
              if(item==item1){
                // alert(index);
                this.myAlarm.scope.splice(index,1);
              }
            });
          }
        },
        newAlarm(name){
          if(name=="日内闹钟"){
            this.dialog.show=true;
            this.dialog.showHour=true;
            this.dialog.title="新建日内闹钟"
            this.myAlarm.name="日内闹钟";
          }else if(name=="时内闹钟"){
            this.dialog.show=true;
            this.dialog.title="新建时内闹钟"
            this.dialog.showHour=false;
            this.myAlarm.name="时内闹钟";
          }else{}
        },
        confirm(){//当确定新建的时候
          // 关闭对话框
          // alert(1);
          this.dialog.show=false;
          //把新建的闹钟放入数组之中


          this.myAlarms.unshift(JSON.stringify(this.myAlarm));
          // alert(this.myAlarms.length)

          // 初始化星期
          this.myAlarm.scope=[];
          //初始化按钮激活样式
          this.active["0"]=false;
          this.active["1"]=false;
          this.active["2"]=false;
          this.active["3"]=false;
          this.active["4"]=false;
          this.active["5"]=false;
          this.active["6"]=false;
        }
      }

    }
</script>

<style scoped>
#alrams{
  float: left;
  width:700px;
  height:500px;
  color:white;
  background-color:transparent;
}

.bg{
  background-color: rgba(244,90,141,1);
  border-radius: 5px;
  color: white;
}
button{
  outline: none;
  border: 1px solid rgba(244,90,141,1);
  background-color: transparent;
  transition: all 0.2s;
  border-radius: 3px;
}
button:hover{
  background-color: rgba(244,90,141,1);
}
ul{
  list-style: none;
}
  li{

    float: left;
  }


  #dialog{
    position: fixed;
    left:0px;
    top:0px;
    width: 100%;
    height: 100%;
    background-color:rgba(0,0,0,0.4);
  }

#dialog form{
  position: absolute;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
  background-color: black;
  padding: 30px;
  border-radius: 10px;
}

  #dialog_close{
    position: absolute;
    right: -15px;
    top:-15px
  }

  #myul li{
     float: none;
  }
</style>
