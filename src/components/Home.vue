<template>
    <div class="kkkk">
<!--      <img id="beijing0" oncontextmenu="return false" onselectstart="return false" ondragstart="return false" v-if="false">-->
<!--      <div id="beijing0"></div>-->
      <div  class="all">
        <Search :common="mywebs" @count="countClick"></Search>
        <Controller></Controller>
        <Masks></Masks>

        <Settings :mywebs="mywebs" ></Settings>

        <Dialog :show="showDialog" @close="closeDialog()" :dialogTitle="dialogTitle" :dialogContent="dialogContent"></Dialog>
<!--        <Guide @button="hideGuide()" :show="showGuide"></Guide>-->
        <Notice @button="hideNotice()" :show="notice.show" :title="notice.title" :message="notice.message"></Notice>


        <TipRight :show="tipRight.show" :msg="tipRight.msg"></TipRight>
      </div>
    </div>
</template>

<script>
    import Search from './Search';
    import Masks from './Masks';
    import Controller from './Controller';
    import  Settings from './Settings';
    import Dialog from './tool/Dialog';
    import {getSession,login} from "../api/userapi";
    import Cookies from 'js-cookie';
    import Guide from './tool/Guide';
    import  Notice from './tool/Notice'
    import TipRight from './tool/TipRight'
    export default {
        name: "Home",
        components:{
            Search,Masks,Controller,Settings,Dialog,Guide,Notice,TipRight
        },
      computed:{
          bg:{
            get(){
              return this.$store.state.bgUrl;
            }
          }

      },
        data(){
          return {
            tipRight:{show:false,msg:""},
            notice:{show:false,title:"7-31：蒲公英动态壁纸||满天星动态壁纸||蝴蝶动态壁纸上线（所有设置>壁纸查看）",message:"0:壁纸上传不了的问题出现了很久，很抱歉，现在已经修复，你可以重新上传试试！！<br>" +
                "1:网站更新了UI，如果你的显示不正常，请在浏览器-设置中，清除浏览历史记录，确保重新加载！！<br>" +
                "2:更新56张精美壁纸，在所有设置>壁纸查看<br>3:解决 访问历史 的严重错误！！你现在可以重新尝试！！" +
                "<br>3:上线了以三款动态壁纸，后续会有更多动态壁纸！！<br>"},
            existBg:false,
          showDialog:false,
            dialogTitle:'你好',
            dialogContent:'i am a dialog',
            webs:[
              {classify:"常用",content:[
                  {name:"哔哩哔哩",url:"http://www.bilibili.com",img:'../../static/image/common/bilibili.png',click:1},
                  {name:"京东",url:"http://www.jd.com",img:'../../static/image/common/jd.png',click:1},
                  {name:"QQ空间",url:"http://qzone.qq.com",img:'../../static/image/common/kj.png',click:1},
                  {name:"淘宝",url:"http://www.taobao.com",img:'../../static/image/common/taobao.png',click:1},
                  {name:"腾讯视频",url:"http://v.qq.com",img:'../../static/image/common/txsp.png',click:1},
                  {name:"芒果TV",url:"http://www.mgtv.com",img:'../../static/image/common/mg.png',click:1},
                  {name:"百度网盘",url:"http://pan.baidu.com",img:'../../static/image/common/bdtp.png',click:1},
                  {name:"QQ邮箱",url:"http://mail.qq.com",img:'../../static/image/common/mailqq.png',click:1},
                  {name:"微博",url:"http://www.weibo.com",img:'../../static/image/common/weibo.png',click:1},
                  {name:"知乎",url:"http://www.zhihu.com",img:'../../static/image/common/zf.png',click:1},
                  {name:"有道翻译",url:"http://fanyi.youdao.com",img:'../../static/image/common/yd.png',click:1},
                  {name:"优酷",url:"http://www.youku.com",img:'../../static/image/common/youku.png',click:1},
                  {name:"腾讯课堂",url:"http://ke.qq.com",img:'../../static/image/common/kt.png',click:1},
                  {name:"支付宝",url:"http://www.alipay.com",img:'../../static/image/common/zfb.png',click:1}
                ],isNull:false,isEdit:false},
              {classify:"设置里面可以自定义网址",content:[],isNull:true,isEdit:false},
              {classify:"福利",content:[
                  {name:"密码azbm",url:"https://pan.baidu.com/s/1pQ60a54grupskhEX1s8XAA",img:'http://anets.cn.img.800cdn.com/static/image/common/web.png',click:1}
                ],isNull:true,isEdit:false}
            ],
            bgs:[
              'http://anets.cn/upload/wallpaper/dist/821564393347447.jpg',
              'http://anets.cn/upload/wallpaper/dist/821564393347447.jpg',

              'http://anets.cn/upload/wallpaper/dist/821561906216027.jpg',
              'http://anets.cn/upload/wallpaper/dist/821561906092693.jpg',
              'http://anets.cn/upload/wallpaper/dist/821561906298916.jpg',
              'http://anets.cn/upload/wallpaper/dist/821561906416430.jpg',
              'http://anets.cn/upload/wallpaper/dist/821561906390454.jpg',
              'http://anets.cn/upload/wallpaper/dist/821561906034932.jpg',
              'http://anets.cn/upload/wallpaper/dist/821561905985875.jpg',
              'http://anets.cn/upload/wallpaper/dist/821561898196397.jpg',
              'http://anets.cn/upload/wallpaper/dist/821561906461430.jpg',
              'http://anets.cn/upload/wallpaper/dist/821561906982886.jpg',
              'http://anets.cn/upload/wallpaper/dist/821561907133081.jpg',
              'http://anets.cn/upload/wallpaper/dist/821561907104179.jpg',
              'http://anets.cn/upload/wallpaper/dist/821561907158361.jpg',
              'http://anets.cn/upload/wallpaper/dist/721561907719518.jpg',
              'http://anets.cn/upload/wallpaper/dist/721561907734090.jpg',
              'http://anets.cn/upload/wallpaper/dist/721561907787222.jpg',
              'http://anets.cn/upload/wallpaper/dist/821562326970970.jpg',
              'http://anets.cn/upload/wallpaper/dist/821564393347447.jpg',
              'http://anets.cn/upload/wallpaper/dist/821564396190005.jpg',
              'http://anets.cn/upload/wallpaper/dist/821564396206692.jpg',
              'http://anets.cn/upload/wallpaper/dist/821564396218612.jpg',
              'http://anets.cn/upload/wallpaper/dist/821564396218612.jpg',
              'http://anets.cn/upload/wallpaper/dist/821564396232689.jpg',
              'http://anets.cn/upload/wallpaper/dist/821564396243867.jpg',
              'http://anets.cn/upload/wallpaper/dist/821564396277329.jpg',
              'http://anets.cn/upload/wallpaper/dist/821564396398163.jpg',
              'http://anets.cn/upload/wallpaper/dist/821564396596363.jpg',
              'http://anets.cn/upload/wallpaper/dist/821564396506593.jpg',
              'http://anets.cn/upload/wallpaper/dist/821564396476030.jpg',
              'http://anets.cn/upload/wallpaper/dist/821564396548557.jpg',
              'http://anets.cn/upload/wallpaper/dist/821564396625210.jpg',
              'http://anets.cn/upload/wallpaper/dist/821564396649485.jpg',
              'http://anets.cn/upload/wallpaper/dist/821564396666033.jpg',
              'http://anets.cn/upload/wallpaper/dist/821564396680571.jpg',
              'http://anets.cn/upload/wallpaper/dist/821564396613867.jpg',
              'http://anets.cn/upload/wallpaper/dist/821564397738231.jpg',
              'http://anets.cn/upload/wallpaper/dist/821564397759706.jpg',
              'http://anets.cn/upload/wallpaper/dist/821564397816312.jpg',
              'http://anets.cn/upload/wallpaper/dist/821564397865748.jpg',
              'http://anets.cn/upload/wallpaper/dist/821564398009160.jpg',
              'http://anets.cn/upload/wallpaper/dist/821564397838971.jpg'
            ]

          }
        },
      computed:{
          mywebs:{
            get(){
              return  this.$store.state.mywebs;
            }
          },
          bg:{
            get(){
              return this.$store.state.bgUrl;
            }
          }
      },
        created(){
          //初始化ui模式
          if(localStorage.getItem("uiMode")!=null){
            let mode=JSON.parse(localStorage.getItem("uiMode"));
            this.$store.commit("changeUiMode",mode);

          }

          //获取用户session中的user
          this.getSessionUser();

          // 如果有本地数据就用本地的
          //检测本地网址顺序记录，若有，赋值重新排序
          let mywebsLocal=localStorage.getItem("mywebsLocal");//从本地取出数据
          if(mywebsLocal!=null){
            // this.$store.state.mywebs=null;//清空再重新赋值
            this.$store.commit("changeMywebs",null);
            // this.$store.state.mywebs=JSON.parse(mywebsLocal);
            this.$store.commit("changeMywebs",JSON.parse(mywebsLocal));
          }else{
            // 判断用户是否为空，为空就用本地的
            this.$store.commit("changeMywebs",this.webs);
          }
          //this.listenScroll();//监听滚动
          this.initBg();//初始化背景


         //显示公告
          Cookies.set('notice7', '', { expires: -1 });
          Cookies.set('notice1', '', { expires: -1 });
          Cookies.set('notice0', '', { expires: -1 });
          Cookies.set('notice8', '', { expires: -1 });
          Cookies.set('notice4', '', { expires: -1 });
          Cookies.set('notice6', '', { expires: -1 });
          if( Cookies.get("notice2")!=null&& Cookies.get("notice2")!=''){
            // alert(2);
          }else{
            setTimeout(()=>{
              this.notice.show=true;
              Cookies.set('notice2', 'value', { expires: 3650 });
            },1000);

          }



        },
      watch:{
          bg:{
            handler(newval,oldval){
              this.showBg();
            },
            deep:true
          }
      },
      mounted(){
          this.showBg();
      },
        methods:{
          hideNotice(){
            this.notice.show=false;
          },
          //自动登录
         async autoLogin(){
           this.tipRight.msg="获取cookie中...";
            if(localStorage.getItem("user")==null||localStorage.getItem("user")==''||localStorage.getItem("user")=='null'){
              // 如果没有cookie就不处理
              this.tipRight.msg="当前用户未登陆，权限受限，无法云同步";
              let a=setTimeout(()=>{this.tipRight.show=false;clearTimeout(a)},5000)
            }else{
              this.tipRight.msg="登陆中...";
               let b=JSON.parse(localStorage.getItem("user"));

              let {data:user}= await login(b.usermail,b.password);
              this.tipRight.msg="登陆成功！"+b.usermail;

              if(user!=null&&user!=''&&user!="null"&&user!=undefined){

                this.$store.commit("changeUser",user);
                if(user.web!=null&&user.web!=''){
                  //改变为用户的网址
                  this.$store.commit("changeMywebs",JSON.parse(user.web));
                  //存储user
                  localStorage.setItem("mywebsLocal",user.web);
                }
                this.tipRight.msg="获取会话标识成功！云同步开启！"+b.usermail;
                let a=setTimeout(()=>{this.tipRight.show=false;clearTimeout(a)},2000)
                this.getSessionUser();
              }else{

                this.tipRight.msg="自动登陆失败！请手动登陆。"+b.usermail;
                let a=setTimeout(()=>{this.tipRight.show=false;clearTimeout(a)},2000)
              }

            }
          },
         async getSessionUser(){

           let {data:user}=await getSession();
           if(user!=null&&user!='null'){
             if(user.web!=null&&user.web!=''){
               //改变为用户的网址
               this.$store.commit("changeMywebs",JSON.parse(user.web));
               //存储user
               localStorage.setItem("mywebsLocal",user.web);
             }
               this.$store.commit("changeUser",user);
               //初始化常用

              // Cookies.set("user",JSON.stringify(user));
               localStorage.setItem("user",JSON.stringify(user));
           }else{
             //没有session，说明用户没登录
             this.tipRight.msg="正在自动登陆";
             this.tipRight.show=true;
             this.autoLogin();
           }
          },
          countClick(index,index1){//加点击次数，并且重新排序
            this.mywebs[index].content[index1].click+=1;
              //  重新排序---选择排序算法
            let time=setTimeout(()=>{
              let arr=this.mywebs[index].content;
              // let arr=this.commonObject;
              let length=arr.length;
              for(let i=0;i<length-1;i++){//循环每一项,不包括最后一项
                //得到一项，就与其他项比较,假设当前第0项，要和第一项，当最后一项比较
                for(let j=i+1;j<length;j++){
                  if(arr[i].click<arr[j].click){//如果第0项的click小于第1项，那么交换位置
                    let temp=arr[i];
                    arr[i]=arr[j];
                    arr[j]=temp;
                  }
                }
              }//排序完毕
              this.mywebs[index].content=arr;
              //把结果存到本地存储中
              let b=JSON.stringify(this.mywebs);
              localStorage.setItem("mywebsLocal",b);
              clearTimeout(time);
            },1500);
          },
          closeDialog(){
           this.showDialog=false;
          },
          initBg(){

            let existBg=localStorage.getItem("bgUrl");
            if(existBg==null||existBg==''){
              // this.$store.state.bgUrl="http://anets.cn.img.800cdn.com/Public/upload/myUploadImg/common/original/82154761346590278.jpg";
               /*background:url('http://anets.cn.img.800cdn.com/upload/bg/3.jpg');*/
        //一天更换一张壁纸
              let url='';
              let bgsLength=42;

              if(localStorage.getItem("day")==null){
                let day=new Date().getDate();
                localStorage.setItem("day",day);

                url=this.bgs[Math.ceil(Math.random()*bgsLength)];

                localStorage.setItem("oldbgurl",url);
                //选用默认的

              }else{
                let oldday=localStorage.getItem("day");
                let newday=new Date().getDate()+"";
                if(oldday==newday){//同一天
                  url= localStorage.getItem("oldbgurl");
                }else{//不同天
                  let day=new Date().getDate();
                  localStorage.setItem("day",day);
                  url=this.bgs[Math.ceil(Math.random()*bgsLength)];
                  localStorage.setItem("oldbgurl",url);

                }
              }
              this.$store.commit("changeBgUrl",url);
              $("body").css("background-image",url);
            }else{
              // this.$store.state.bgUrl=existBg;
              this.$store.commit("changeBgUrl",existBg);
              let url="url('"+existBg+"')";
              //选用用户保存的
              $("body").css("background-image",url);
            }


          },
          showBg(){
            //当背景数据改变的时候调用
            let url=this.$store.state.bgUrl;
            // let bg="url('"+url+"')";
            // $("#beijing0").css("src",url);
            if(localStorage.getItem("wallpaper")!=null){
              localStorage.setItem("bgUrl",url);
            }


            let url2="url('"+url+"')";

            $("body").css("background-image",url2);


            //判断是否是手机
            var system ={};
            var p = navigator.platform;
            system.win = p.indexOf("Win") == 0;
            system.mac = p.indexOf("Mac") == 0;
            system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
            if(system.win||system.mac||system.xll){

            }else{
              //手机
              $("body").css("background-image",'url(./static/image/bg/bgs.jpg)');
              $("body").css("background-repeat",'repeat');
              $("body").css("background-size",'auto');
            }


          }

        }
    }



</script>

<style>
  /*body{*/
  /*  margin:0px;*/
  /*  padding: 0px;*/

  /*  background-color: rgba(32,32,32,1);;*/
  /*  background-repeat: no-repeat;*/
  /*  background-attachment: fixed;*/
  /*  background-size: cover;*/
  /*}*/
  body {
    background-color: rgba(32,32,32,1);
    /*background:url("http://anets.cn.img.800cdn.com/upload/bg/3.jpg");*/
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size:cover;

  }
.all{


}
</style>
