<template>

   <div class="all_search">
     <!-- 这是搜索框 -->
     <input id="dataFromBd" type="text" style="display:none">
     <input id="dataFrominput" type="text" v-model="inputValueTemp" style="display:none">
     <div id="search">
       <div class="go sousuo">
         <img id="logo" src="../../static/image/logo/logo4.png" alt="" width="40px"  style="margin-left: -40px;margin-top: 2px">
         <img id="sousuo_img" :src="soImg" alt=""  :height="'20px'" style="margin-left: 7px;margin-top: 9px">
         <form :action="baseQueryLink.action" id="forms" target="_blank">
           <input  :name="baseQueryLink.name" v-model="inputValue" type="text" id="wd" class="input" maxlength="100" autocomplete="off" @blur="hideAssociatez()" @focus="showAssociate()" @keyup.38="upPage()"  @keyup.13="enterIn()" @keyup.40="downPage()" @keydown.40='downLongPress()' @keydown.38="upLongPress()"  @keyup="getAssociateFromBaidus($event)">
           <input style="display:none"/>
         </form>
         <div class="query" style="cursor: default" @click="goSubmit"><i class="iconfont icon-jiantou" style="color:rgba(238,10,69,0.8);font-weight: bolder"></i></div>
       </div>
       <!-- 关键词联想 -->
       <div class="associate" v-if="dataHistoryShow">
<!--         这是全能搜索-->
         <ul v-if="dataHistoryShow" style="margin-bottom:0px">
           <li style="">
             <a :href="'/query?key='+inputValue+'&web=影视'" target="_blank"><i class="iconfont icon-dianying"></i>影视</a>
             <a :href="'/query?key='+inputValue+'&web=音乐'" target="_blank"><i class="iconfont icon-yinle"></i>音乐</a>
             <a :href="'/query?key='+inputValue+'&web=图片'" target="_blank"><i class="iconfont icon-huanbeijing"></i>图片</a>
             <a :href="'/query?key='+inputValue+'&web=购物'" target="_blank"><i class="iconfont icon-gouwu"></i>购物</a>
             <a :href="'/query?key='+inputValue+'&web=资源'" target="_blank"><i class="iconfont icon-ziyuan"></i>资源</a>
             <a :href="'/query?key='+inputValue+'&web=翻译'" target="_blank"><i class="iconfont icon-fanyi"></i>翻译</a>
           </li>
         </ul>
<!--         这是搜索的历史记录-->
         <ul v-if="dataHistoryShow" class="dataHistory">
           <li  id="dataHistory" v-for="(item,index) in newinputHistory" v-if="index<25" :class="{'associateActive':index==currentIndex}"><a :href="[baseQueryLink.action+'?'+baseQueryLink.name+'='+item]" target="_blank" @click="changeInputValue(item)">{{item}}</a><i id="removeHistory" class="iconfont icon-shanchu" @click="removeHistory(item,index)"></i></li>
           <li v-if="showWuhen"><i @click="showWuhenM()" id="wuhen" class="iconfont icon-yanjing-shi"></i><i @click="clearHitory()" id="clearHistory" class="iconfont icon-eliminate"></i></li>
         </ul>
         <ul class="associate_ul" id="associate_ul" v-if="associate_show">
           <li v-for="(item,index) in associateData"  :class="{'associateActive':(index+searchHistoryLength)==currentIndex}">
              <a :key='index' :href="[baseQueryLink.action+'?'+baseQueryLink.name+'='+item]" target="_blank" @click="changeInputValue(item)">{{item}}</a>
            </li>
          </ul>
         <ul>
           <li v-if="associate_show" id="translate"><a href="">{{translate}}</a></li>
         </ul>
       </div>
     </div>
     <!-- 切换搜索引擎 -->
     <div class="se">
       <ul>
         <li id="se_1" @click="changeSerach($event)"><img src="../assets/image/small/se_1.png" alt="" width="20px" height="20px"><span>百度</span></li>
         <li id="se_2" @click="changeSerach($event)"><img src="../assets/image/small/se_2.png" alt="" width="20px" height="20px"><span>必应</span></li>
         <li id="se_3" @click="changeSerach($event)"><img src="../assets/image/small/se_3.png" alt="" width="20px" height="20px"><span>搜狗</span></li>
         <li id="se_4" @click="changeSerach($event)"><img src="../assets/image/small/se_4.png" alt="" width="20px" height="20px"><span>360搜索</span></li>
         <li id="se_5" @click="changeSerach($event)"><img src="../assets/image/small/se_5.png" alt="" width="20px" height="20px"><span>Google</span></li>
         <li id="se_6" @click="changeSerach($event)"><img src="../assets/image/small/se_6.png" alt="" width="20px" height="20px"><span>全能搜</span></li>
       </ul>

     </div>
<!--=================================================================================================-->

     <div class="content_top"  v-if="showCommon" v-show="customeShowz.all">

<!--       <div class="proverb"><span style="color: rgba(119,119,119,0.5)">当你感到悲哀痛苦时，最好是去学些什么东西。学习会使你永远立于不败之地。</span></div>-->
       <div class="webz" v-if="customeShowz.history">
         <!--   访问历史    -->
         <div class="history" v-if="customeShowz.history" >
           <ul>
             <li  v-for="(item,index) in websHistory" @click="setWebsHistory2(item,index)">
               <a :href="item.url" target="_blank">
                 <img :src="item.img" width="54px" alt="" >
                 <span>{{item.name}}</span>
               </a>
             </li>
           </ul>
         </div>
       </div>
        <!--  分割线  -->
       <div class="lines" v-if="customeShowz.history"></div>
       <!-- 这是面板 -->
       <div id="common" class="common" @mouseenter="enterCommon()" @mouseleave="leaveCommon()" v-if="customeShowz.common">
         <!--       这是面板导航-->
         <ul id="myTab" class="nav nav-tabs" style="position: relative">
           <div class="proverb" style="position:absolute;right:0px;top:10px;font-size: 12px"><span style="color: rgba(119,119,119,0.5)">{{saying}}</span></div>
           <li :class="{active:index==controlWeb.activeIndex}" v-for="(item,index) in mywebOrdered" v-if="index<4" @click="activeLi(index)"><a href="javascript:void(0)" data-toggle="tab">{{item.classify}}</a></li>

           <div class="moreWebz" @mouseenter="morewebsShow=true" @mouseleave="morewebsShow=false" v-if="mywebOrdered.length>4">
             <span> More <i class="iconfont icon-jiantou2"></i></span>
             <ul v-if="morewebsShow" >
               <li :class="{active:index==controlWeb.activeIndex}" v-for="(item,index) in mywebOrdered" v-if="index>=4" @click="activeLi(index)"><a href="javascript:void(0)" data-toggle="tab">{{item.classify}}</a></li>
             </ul>
           </div>
         </ul>
         <!--       这是面板内容-->
         <div id="myTabContent" class="tab-content" v-if="customeShowz.common">
           <div :class="{active:index==controlWeb.activeIndex,'tab-pane':true,'fade':true,'in':true}" v-for="(item,index) in mywebOrdered"  :id="'web'+index" style="position: relative" >
             <ul>
               <li v-for="(item1,index1) in item.content" @click="triggerCount(index,index1)" v-if="index1<28">
                 <a :href="item1.url" target="_blank">
                   <img :src="item1.img"  width="20px">
                   <span>{{item1.name}}</span>
                 </a>
               </li>

             </ul>
             <div class="webmore" @mouseenter="webmore.ulshow=true" @mouseleave="webmore.ulshow=false">
               <ul  v-if="webmore.ulshow" id="len">
                 <li v-for="(item1,index1) in item.content" @click="triggerCount(index,index1)" v-if="index1>=28" @mouseenter="changeHeight(item.content.length)">
                   <a :href="item1.url" target="_blank" style="color: white">
                     <img :src="item1.img" alt="" width="20px">
                     <span>{{item1.name}}</span>
                   </a>
                 </li>
               </ul>
               <i  v-if="item.content.length>28" class="iconfont  icon-gengduo1" style="position: absolute;left:-25px;bottom:3px;color:rgba(244,90,141,1);font-size: 30px;font-weight: bolder;"></i>
             </div>
           </div>
         </div>

       </div>
       <!--  分割线  -->
       <div class="lines" v-if="customeShowz.recommend"></div>



       <Recommend @history="setWebsHistory" :show="customeShowz.recommend"></Recommend>

       <Remind :show="customeShowz.remind"></Remind>

     </div>











<!--   ===============================================================================================-->
     <div class="contrlShow" ></div>
     <div class="mask2"></div>
     <Dialog :show="showDialog" @button="confirm()" @close="closeDialog()" :dialogTitle="dialogTitle" :dialogContent="dialogContent" :dialogBtn="dialogBtn"></Dialog>
     <SmartTip :show="smartTip.show" :button="smartTip.button" :msg="smartTip.msg" @close="closeSmartTips()"></SmartTip>
     <img v-if="dbclickimgtip" src="http://img01.taobaocdn.com:80/tfscom/TB1arFTe8Cw3KVjSZFuXXcAOpXa" alt="" width="500px" style="position:fixed;bottom:300px;right:0px;">
   </div>

</template>

<script>
    import Cookies from 'js-cookie';
    import  {getDataFromYoudao} from "../api/translate";
    import axios from 'axios'
    import  Dialog from './tool/Dialog'
    axios.defaults.baseURL = '/api';
    import  Recommend from './Recommend';
    import Remind from './Remind';
    import SmartTip from './tool/SmartTip'


    export default {
        name: "Search",
        props:['common'],
        computed:{
          customShow:{
            get(){
                  return this.$store.state.customShow;
            }
          },
          associateLength:{
            get(){
              return this.searchHistoryLength+this.searchBaiduLength;
            }
          },
          newinputHistory:{
            get(){

                return this.searchHistory;

            }
          },
          mywebs:{
            get(){
              return this.$props.common;
            }
          },
           uiModeFromState:{
            get(){

              return this.$store.state.uiMode;

            }
          }
        },
      components:{
          Dialog,SmartTip, Recommend,Remind
      },
        data(){
         return {
           canrun:true,//滚动事件节流
           sayings:[
             '时间在变，人也在变，回不去就是回不去了',
             '你还有好多未完成的梦，你有什么理由停下脚步。',
             '没有人会让我输。除非我不想赢。',
             '学会忘记痛苦，为阳光记忆腾出空间。',
             '人生只有一次，不要总演配角。就算不是最耀眼的一个，但我有我的独特。',
             '阳光总是无私的，它总是照亮那些需要温暖的人。',
             '智者的梦再美，也不如愚人实干的脚印。',
             '一心向前，从不恋旧。',
             '追悔过去，不如把握现在，成就未来。',
             '乐观地对待失败，成功就会向你招手。',
             '野心是对梦想最好的致敬。',
             '最怕的东西，最应该去突破。',
             '你不要失望，荡气回肠是为了最美的平凡。',
             '生命不在于我们得到过什么，而在于我们做过什么！',
             '每个不满意的现在，都有个不努力的曾经。',
             '有能力的人影响别人，没能力的人，受人影响。',
             '人生没有彩排，每天都是现场直播。',
             '每天醒来，面朝阳光，努力向上，相信日子会变得单纯而美好。',
             '对于最有能力的领航人风浪总是格外的汹涌。',
             '现代社会已不是大鱼吃小鱼的年代，而是快鱼吃慢鱼的年代。',
             '先变成更喜欢的自己，然后遇到一个不需要取悦的人。',
             '星星为什么看起来如此渺小，是因为它把自己放得太高。',
             '成功的门往往虚掩着，只要你勇敢去推，它就会豁然洞开。',
             '我想我会保持微笑，继续走完我未走完的路。',
           ],
           saying:'',
           morewebsShow:false,
            customeShowz:{},
           websHistory:[
             {name:"哔哩哔哩",url:"http://www.bilibili.com",img:'../../static/image/common/bilibili.png',click:1},
             {name:"腾讯视频",url:"http://v.qq.com",img:'../../static/image/common/txsp.png',click:1},
             {name:"微博",url:"http://www.weibo.com",img:'../../static/image/common/weibo.png',click:1},
             {name:"网易云音乐",url:"https://music.163.com/",img:'../../static/image/common/wyy.png',click:1,description:"专注于发现与分享的音乐产品"},
             {name:"淘宝",url:"https://www.taobao.com/",img:'../../static/image/common/taobao.png',click:1,description:"亚洲较大的网上交易平台"}
           ],//网址访问历史
           dbclickimgtip:false,
           webmore:{ulshow:false,ishow:false},
           uiMode:this.$store.state.uiMode,
           smartTip:{show:false,msg:"",button:""},
           mywebOrdered:null,
           controlWeb:{mywebsLength:0,showMore:false,activeIndex:0},//控制网址的显示，包括更多的显示，数组的长度和激活样式的位置
           isStorage:true,//记录历史，非无痕模式
           isClear:false,
           isWuhen:false,
           showDialog:false,
           dialogBtn:null,
           showWuhen:false,//是否显示无痕设置
           dialogTitle:'',
           dialogContent:'',
             mypink:"rgba(238,10,69,1)",
             associateData:'',
             translate:'',//处理后的翻译
             inputValue:'',//存放input值
            inputValueTemp:'',//这是当按键为上下键时存储input临时值
            associate_show:false,//控制联想li标签是否显示
             baseQueryLink:{action:'/query',name:"key"},//根据cookie获取用户喜好的搜索引擎链接
             soImg:'../../static/image/small/se_1.png',//搜索引擎图片地址
             baseTranslateLink:'http://fanyi.youdao.com/translate?&doctype=json&type=AUTO&i=',
             currentIndex:-1,//这是记录当前选中的li索引，用来与真实索引比较，相同则添加样式
             dataHistory:null,
             dataHistoryStr:'',
             inputHistory:[],
             searchHistory:null,
             searchHistoryLength:0,//历史搜索长度
             searchBaiduLength:0,//关键词联想长度
             dataHistoryShow:false,
             isUp:true,//记录键按下后是否释放
             isExcute:true,
             isExcuteUp:true,
             countDownAndUpTime:0,
             startTime:0,
             isRecordTime:true,
             searchFlag:true,//防止历史搜索还没搜索完多次执行造成卡顿
             commoning: [],//这是排序后的网址
             showCommon:true,//控制常用是否显示
             isInCommon:false,//这是判断鼠标是否在common上
             isInControlShow:false,
             commonFlag:0,//这是为了防止2个数据改变重复执行
           taskTime:0,
           taskTimer1:null,
           taskTimer2:null,
           isAloneSearch:false,//是否是单独的搜索框没有common
           db:{dbTime:null,dbCount:0,flag:false}

         }
        },
       created(){
        //初始化mywebs数据，控制显示
         let mywebs=this.$props.common;
         this.mywebOrdered=mywebs;
         // 获得分类长度
         let classifyALength=mywebs.length;
         this.controlWeb.mywebsLength=classifyALength;
         if(classifyALength>=7){
           this.controlWeb.showMore=true;
         }
         //获取历史激活的面板
         if(localStorage.getItem("activeIndex")!=null){
           this.controlWeb.activeIndex=localStorage.getItem("activeIndex");
         }else{
           this.controlWeb.activeIndex=0;
         }
         //获取历史访问网址
         let webHistory= localStorage.getItem("webHistory");
         if(webHistory!=null){
           this.websHistory=JSON.parse(webHistory);
         }
         //检测双击事件
         this.dbClick();

         //监听滚动事件
         // window.onscroll = function () {
         //
         //   var a = document.documentElement.scrollTop || document.body.scrollTop;//滚动条y轴上的距离
         //   var b = document.documentElement.clientHeight || document.body.clientHeight;//可视区域的高度
         //   var c = document.documentElement.scrollHeight || document.body.scrollHeight;//可视化的高度与溢出的距离（总高度）
         //   if(a + b == c){
         //     alert('已滚动到底部!')
         //   }
         // }
         $(document).on("mousewheel DOMMouseScroll",  ($event)=>{
           if(this.canrun==false){
             return
           }


           let e=$event;
           this.canrun=false;
           return this.myscroll(e);
         });

         // $(document).bind('mousewheel', ($event)=>{
         //   if(($event.pageY-$event.clientY)==0){
         //     // alert(1)
         //     this.showCommon=false;
         //   }else{
         //     // alert($event.pageY-$event.clientY);
         //     this.showCommon=true;
         //   }
         // });


       },
      mounted(){

        this.showSousuo(this);
        this.changeColor(this.mypink);
        // console.log(JSON.parse(localStorage.getItem('inputHistory')));
       if(this.inputHistory!=[]){

           this.dataHistoryStr=localStorage.getItem('dataHistoryStr');
           this.dataHistory=JSON.parse(localStorage.getItem('dataHistory'));
           this.inputHistory=JSON.parse(localStorage.getItem('inputHistory'));
           this.searchHistory=this.inputHistory;

       }

       if(this.uiMode.simple==true){

         this.aloneSearch();
       }

        //初始化句子
        let sayingLength=this.sayings.length-1;
        this.saying=this.sayings[Math.ceil(Math.random()*sayingLength)];



      },
      watch:{
        customShow:{
          handler(newval,oldval){
            this.customeShowz=newval;
          },deep:true,immediate:true
        },
        uiModeFromState:{
          handler(newval,oldval){
            this.uiMode=newval;
          },deep:true,immediate:true
        },
        uiMode:{
          handler(newval,oldval){
            // alert(newval.simple);
            // alert(newval.static);
            //如果是静态模式
            if(newval.static==true){

              this.originalSearch();
            }
            //如果是极简模式
            if(newval.simple==true){
              this.aloneSearch();

            }
            //如果是动态模式
            // 有设置处理
          },
          deep: true,immediate:true
        },
        isInControlShow:{
          handler(newval,oldval){
            //如果在控制上，有2中情况1种是从commn移到控制上，一种是从外面移到控制上，无论是什么，都需要显示
            //  if(newval==true){
            //     this.originalSearch();
            //  }else{
            //    //如果不在控制上，有2中情框，一种是在common上，由common控制，一种是不在common上，不在common上设置延时检测，如果还是不在common上就影藏
            //      let a=setTimeout(()=>{
            //        if(this.isInCommon==true){
            //          // this.originalSearch();
            //          clearTimeout(a);
            //        }else{
            //          this.aloneSearch();
            //          clearTimeout(a);
            //        }
            //      },2000)
            //
            //
            //  }
          }
        },
        isInCommon:{
           handler(newval,oldval){
             // if(newval==false){
             //   if(this.isInControlShow==true){
             //     this.originalSearch();
             //
             //   }else{
             //     let a=setTimeout(()=>{
             //       if(this.isInControlShow==true){
             //         this.originalSearch();
             //         clearTimeout(a);
             //       }else{
             //         this.aloneSearch();
             //         clearTimeout(a);
             //       }
             //     },2000)
             //   }
             // }else{
             //    if(this.showCommon==false){
             //      this.originalSearch();
             //    }
             // }
           }
        },
        mywebs:{//深度检测网址顺序的变化
          handler(newval,oldval){
            // alert(newval[0].content[0].name);
            setTimeout(()=>{
              this.mywebOrdered=null;
              this.mywebOrdered=newval;
            },3000);
            // alert(newval[0].name);
          },
          deep:true,
          immediate:true
        },
          //检测历史记录数组变化
        searchHistory(newval,oldval){
          if(newval==null){
            this.searchHistoryLength=0;
            this.showWuhen=false;

          }else{
            if(newval.length==0){
              this.showWuhen=false;
              this.searchHistoryLength=0;
            }else{
              this.searchHistoryLength=this.searchHistory.length;
              // this.showWuhen=true;
              // localStorage.setItem("isStoreHistory","false");
            }
          }
        },
        inputValueTemp(newval,oldval){
          // 历史记录搜索功能
          if(newval!=''){
            this.searchHistory=[];
            let result=this.inputHistory.find(item=>item.indexOf(newval)!=-1);
            if(result!=undefined&&result!=null){
              this.searchHistory.push(result);
              // console.log(this.dataHistoryShow);
            }
          }
        },
        inputValue:{
          handler(newVal,oldVal){
            if(newVal!=''){
              // alert(1);
              this.showWuhen=false;
              this.dataHistoryShow=true;
              this.getTranslate(newVal);
              let times=setInterval( ()=> {
                let datas=$("#dataFromBd").val();
                if(datas!=''){
                  let newData=datas.split(',');
                  this.associateData=newData;
                  // alert(this.associateData);
                  clearInterval(times);
                  this.associate_show=true;
                }else{

                  this.associateData='';
                  clearInterval(times);
                  setTimeout(()=>{
                    this.associate_show=true;
                    // setTimeout(()=>{
                    //   $("#translate").css('margin-top',"-10px");
                    //   // this.dataHistoryShow=false;
                    // },300);
                  },300)
                }
              },200);




            }else{
              // alert(1);
              this.showWuhen=true;
              $("#dataFromBd").val('');
              this.associateData='';
              this.associate_show=false;
              this.searchHistory=this.inputHistory;

            }
          },
          immediate:true
        },
        dataHistoryStr:{

          //对搜索历史重新排序
          handler(newval,oldval){
            // alert(this.inputHistory);
            let max=0;

            for(let key in this.dataHistory){//找出索引最大值
              if(this.dataHistory[key]>=max){
                max=this.dataHistory[key];
              }
            }
            this.inputHistory=[];
            for(let i=1;i<=max;i++){
              for(let key in this.dataHistory){
                if(this.dataHistory[key]==i){
                  if(key!=''){
                    this.inputHistory.unshift(key);
                  }
                }
              }
            }

          },
          deep:true,
          immediate: true
        },
        associateData(newval,oldval){
          this.searchBaiduLength=newval.length;
        },
        inputHistory(newval,oldval){
          // alert(this.inputHistory);
          if(this.inputHistory!=[]){
            // alert(1);
            localStorage.setItem('inputHistory',JSON.stringify(this.inputHistory));
            localStorage.setItem('dataHistory',JSON.stringify(this.dataHistory));
            localStorage.setItem('dataHistoryStr',this.dataHistoryStr);

          }
        }
      },
      methods:{
          myscroll(e){



            let a= setTimeout(()=>{
              this.canrun=true;
              clearTimeout(a);
            },300);

            var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
              (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1));              // firefox
            if (delta > 0&&(e.pageY-e.clientY)==0) {
              // 向上滚
              this.showCommon=false;
              return  true;

            } else if (delta < 0) {
              // alert($event.pageY-$event.clientY);
              // 向下滚
              // alert("wheeldown");
              if(this.showCommon==false){
                this.showCommon=true;
                return false
              }else{
                return  true;
              }



            }
          },
        activeLi(index){
          this.controlWeb.activeIndex=index;
          localStorage.setItem("activeIndex",index);
        },
        triggerCount(index,index1){//当常用网址被点击，把点击事件传给父组件计数


            if(localStorage.getItem("sort")==null){

            }else{
              this.$emit('count',index,index1);
            }

            let webs=this.websHistory;
            let length=webs.length;
          if(length==0){
            //把历史压进栈中
            this.websHistory.unshift(this.mywebs[index].content[index1]);

          }else{

            //遍历检测是否有重名
            let isEqual=-1;
            for(let i=0;i<length;i++){
                if(webs[i].name==this.mywebs[index].content[index1].name){
                  isEqual=i;
                }
            }
            if(isEqual==-1){//如果没有相同的网址
              this.websHistory.unshift(this.mywebs[index].content[index1]);
            }else{//如果有相同的，移动到第一位
              //把这一项移动到最前面
              this.websHistory.splice(isEqual,1);
              this.websHistory.unshift(this.mywebs[index].content[index1]);
            }
            //检测是否超过数量限制
            while(this.websHistory.length>11){
              this.websHistory.pop();
            }

          }
          //存入本地
          localStorage.setItem("webHistory",JSON.stringify(this.websHistory));
        },
        confirm(){
          //如果点击的是清除，那么确定执行的逻辑是
          if(this.isClear){
            this.dataHistory={};
            this.dataHistoryStr='';
            this.inputHistory=[];
             this.searchHistory=[];
             this.showDialog=false;
          }
          //如果点击的是无痕，那么确定执行的逻辑是
          if(this.isWuhen){
            localStorage.setItem("isStorage",'false');//如果开启无恒，改为true就行
         this.showDialog=false;
            this.searchHistory=[];
          }
        },
        closeDialog(){
          this.showDialog=false;
        },
        showWuhenM(){

          this.dialogTitle="确定开启无痕浏览";
          this.dialogContent="开启后将不在记录以后的搜索历史，但保留以前的搜索历史，若不想保留，请执行清除操作，若需关闭无痕，请在设置中关闭";
          this.dialogBtn="确定";
          this.showDialog=true;
          this.isWuhen=true;
          this.isClear=false;
        },
        clearHitory(){
          this.dialogTitle="确定清除所有搜索记录";
          this.dialogContent="清除后不可恢复";
          this.dialogBtn="确定";
          this.showDialog=true;
          this.isWuhen=false;
          this.isClear=true;
        },//用户点击无痕或者清除记录时
          //当用户删除历史记录时
        removeHistory(itemz,index){
          // alert(itemz);
          this.searchHistory=this.searchHistory.filter(item=>item!=this.searchHistory[index]);
          delete(this.dataHistory[itemz]);
          this.dataHistoryStr=JSON.stringify(this.dataHistory);
          localStorage.setItem('inputHistory',JSON.stringify(this.inputHistory));
          localStorage.setItem('dataHistory',JSON.stringify(this.dataHistory));
          localStorage.setItem('dataHistoryStr',this.dataHistoryStr);

        },
        downLongPress(){

          if(this.isRecordTime){//flag标志，确保长按无数次来回执行中只执行一次
            this.startTime=new Date();//计算刚开始按第一次执行开始时间
            this.isRecordTime=false;//表明执行了一次，告诉不再执行，除非keyup赋值为true
          }else{
            this.countDownAndUpTime=new Date() -this.startTime;//也就是当keydown中长按来回执行时，不停的计算长按的时间
          }

          // console.log(this.countDownAndUpTime);
          if(this.countDownAndUpTime>500){//如果这个时间满足某个条件，就执行一件事
              if(this.isExcute){
                this.isExcute=false;//为了在长按keydown无数次执行中，只执行一次，同样需要flag标志标志
                this.isUp=false;
                let time= setInterval(()=>{
                  if(this.isUp==false){
                    this.downPages();
                    this.isExcuteUp=false;
                  }else {
                    this.isExcuteUp=true;
                    clearInterval(time);
                  }
                },150);
              }
          }

        },
        upLongPress(){

          if(this.isRecordTime){//flag标志，确保长按无数次来回执行中只执行一次
            this.startTime=new Date();//计算刚开始按第一次执行开始时间
            this.isRecordTime=false;//表明执行了一次，告诉不再执行，除非keyup赋值为true
          }else{
            this.countDownAndUpTime=new Date() -this.startTime;//也就是当keydown中长按来回执行时，不停的计算长按的时间
          }

          // console.log(this.countDownAndUpTime);
          if(this.countDownAndUpTime>500){//如果这个时间满足某个条件，就执行一件事
            if(this.isExcute){
              this.isExcute=false;//为了在长按keydown无数次执行中，只执行一次，同样需要flag标志标志
              this.isUp=false;
              let time= setInterval(()=>{
                if(this.isUp==false){
                  this.upPages();
                  this.isExcuteUp=false;
                }else {
                  this.isExcuteUp=true;
                  clearInterval(time);
                }
              },150);
            }
          }

        },
        upPage(){
          this.countDownAndUpTime=new Date()-this.startTime;
          // console.log(this.countDownAndUpTime);
          this.isRecordTime=true;
          this.isUp=true;
          this.isExcute=true;
          if(this.isExcuteUp){
            this.upPages();
          }
        },
        upPages(){
          if(this.currentIndex>=0){
            if(this.currentIndex==0){
              // alert(this.inputValueTemp);
              this.inputValue=this.inputValueTemp;
              this.currentIndex=-1;
            }else{
              this.currentIndex-=1;
              let nowIndex=this.currentIndex;
              let historyLength=this.searchHistoryLength;
              if(nowIndex<historyLength){
                this.inputValue=this.searchHistory[nowIndex];
              }else{
                this.inputValue=this.associateData[nowIndex-historyLength];
              }
              // console.log(nowIndex);
            }

          }else{
            // alert(2);
            this.currentIndex=this.associateLength-1;
            let nowIndex=this.currentIndex;
            let historyLength=this.searchHistoryLength;
            this.inputValue=this.associateData[nowIndex-historyLength];
          }
        },
        downPage(){

          this.countDownAndUpTime=new Date()-this.startTime;
          // console.log(this.countDownAndUpTime);
          this.isRecordTime=true;
          this.isUp=true;
          this.isExcute=true;
           if(this.isExcuteUp){
             this.downPages();
           }
        },
        downPages(){

          this.currentIndex+=1;

          let nowIndex=this.currentIndex;
          let historyLength=this.searchHistoryLength;

          if(nowIndex<historyLength){
            // console.log(this.searchHistory);
            this.inputValue=this.searchHistory[nowIndex];
          }else{
            this.inputValue=this.associateData[nowIndex-historyLength];
          }




          if(this.currentIndex>=this.associateLength){
            this.currentIndex=-1;
             this.inputValue=this.inputValueTemp;
          }
        },
        showAssociate(){

          if(this.inputValue==''){
            this.associate_show=false;
            this.dataHistoryShow=true;
          }else{
            this.associate_show=true;
            this.dataHistoryShow=true;
          }

          if(this.isAloneSearch==true){
            $(".mask2").css("background-color","rgba(0,0,0,0.7)");
          }else{
            if(localStorage.getItem("jujiao")==null){
              $(".mask2").css("background-color","rgba(0,0,0,0.7)");
              this.showCommon=false;
            }else{

            }

          }

        },
        enterIn(){
          $("#forms").submit();
          let item= this.inputValue;
          if(localStorage.getItem("isStorage")==null||localStorage.getItem("isStorage")==''||localStorage.getItem("isStorage")=='true'){
            if(this.dataHistory==null){
              this.dataHistory={};
              this.dataHistory[item]=1;
              console.log(this.dataHistory);
            }else if(this.dataHistory[item]==undefined){
              this.dataHistory[item]=1;//如果没有值就放值并赋值为1，代表访问过一次

              this.dataHistoryStr=JSON.stringify(this.dataHistory);
              console.log(this.dataHistory);
            }else{
              let index=this.dataHistory[item];
              this.dataHistory[item]=index+1;//有值的话次数加1个
              this.dataHistoryStr=JSON.stringify(this.dataHistory);
              // console.log("不为空");
              console.log(this.dataHistory);
            }
          }
          // console.log(this.dataHistory['item']);
          // alert(2);

          // alert(this.dataHistory);
          $("#wd").blur();
          setTimeout(()=>{
            this.associate_show=false;
          },1000);
        },
        hideAssociatez(){

          this.hideAssociate(this);
          if(this.isAloneSearch==true){
            $(".mask2").css("background-color","rgba(0,0,0,0)");
          }else{
            if(localStorage.getItem("jujiao")==null){
              $(".mask2").css("background-color","rgba(0,0,0,0)");
              this.showCommon=true;
            }

          }
        },
        hideAssociate(vue_this){

          $('body').bind('click',function (e) {
            console.log("============");
            if(e.target.parentNode.parentNode==null){

              if(localStorage.getItem("isStorage")==null||localStorage.getItem("isStorage")==''||localStorage.getItem("isStorage")=='true'){
                let item= e.target.innerHTML;
                if(vue_this.dataHistory[item]==undefined){
                  vue_this.dataHistory[item]=1;//如果没有值就放值并赋值为1，代表访问过一次
                  vue_this.dataHistoryStr=JSON.stringify(vue_this.dataHistory);
                }else{
                  let index=vue_this.dataHistory[item];
                  vue_this.dataHistory[item]=index+1;//有值的话次数加1个
                  vue_this.dataHistoryStr=JSON.stringify(vue_this.dataHistory);

                }
              }

              return;
            }
            if(e.target.parentNode.parentNode.id=="associate_ul"){
             setTimeout(function(){
               vue_this.dataHistoryShow=false;
               vue_this.associate_show=false;
               $('body').unbind('click');
             },1000);
              // console.log(e.target.id);
              // vue_this.dataHistory.push(this.inputValue);

            }else if(e.target.id=="wd"){
              console.log('wd');
              $('body').unbind('click');
              // console.log(e.target.id);
            }else{
              // alert(1);
              // console.log(e.target.id);
              //当点击删除历史时不让面板消失
              if(e.target.id=="removeHistory"){
                vue_this.dataHistoryShow=true;
                vue_this.associate_show=true;
              }else if(e.target.id=="wuhen"){
                // alert(2);
                vue_this.dataHistoryShow=true;
                vue_this.associate_show=true;
              }else if(e.target.id=="clearHistory"){
                vue_this.dataHistoryShow=true;
                vue_this.associate_show=true;
              }else{
                vue_this.dataHistoryShow=false;
                vue_this.associate_show=false;
              }
             // console.log(e.target.id);


              $('body').unbind('click');
            }
          });

          //
        },
        changeInputValue(value){
          this.inputValue=value;
          // 历史记录搜索功能
          // alert(1);
          if(localStorage.getItem("isStorage")==null||localStorage.getItem("isStorage")==''||localStorage.getItem("isStorage")=='true'){
            let item= this.inputValue;



            if(this.dataHistory==null){
              this.dataHistory={};
              this.dataHistory[item]=1;
            }else if(this.dataHistory[item]==undefined){
              this.dataHistory[item]=1;//如果没有值就放值并赋值为1，代表访问过一次
              this.dataHistoryStr=JSON.stringify(this.dataHistory);

            }else{
              let index=this.dataHistory[item];
              this.dataHistory[item]=index+1;//有值的话次数加1个
              this.dataHistoryStr=JSON.stringify(this.dataHistory);
              // console.log("不为空");
            }




          }


        },
        changeColor(color){

           },
        changeSousuo(se_id){
          if(se_id=="se_1"){
            this.baseQueryLink.action="https://www.baidu.com/s";
            this.baseQueryLink.name="wd";
          }else if(se_id=="se_2"){
            this.baseQueryLink.action="https://cn.bing.com/search";
            this.baseQueryLink.name="q";
          }else if(se_id=="se_3"){
            // 搜狗
            this.baseQueryLink.action="https://www.sogou.com/web";
            this.baseQueryLink.name="query";
          }else if(se_id=="se_4"){
            // 360
            this.baseQueryLink.action="https://www.so.com/s?ie=utf-8&fr=none&src=360sou_newhome";
            this.baseQueryLink.name="q";
          }
          else if(se_id=="se_5"){
            // google
            this.baseQueryLink.action="https://www.google.com.hk/search";
            this.baseQueryLink.name="q";
          }else if(se_id=="se_6"){
            // google
            this.baseQueryLink.action="/query";
            this.baseQueryLink.name="key";
          }
        },
        showSousuo() {
          var se_id = Cookies.get('se_id'); //获取cookie

          if (se_id!='undefined') {
             this.soImg="../../static/image/small/" + se_id + ".png";
             this.changeSousuo(se_id);
          } else {
            this.soImg="../../static/image/small/" + "se_6" + ".png";
          }
          $(".sousuo #sousuo_img").click(function () {
            $(".se").slideDown("slow");
          });
        },
        goSubmit(){
          $("#forms").submit();
          let item= this.inputValue;
          if(this.dataHistory[item]==undefined){
            this.dataHistory[item]=1;//如果没有值就放值并赋值为1，代表访问过一次
           this.dataHistoryStr=JSON.stringify(this.dataHistory);
          }else{
            let index=this.dataHistory[item];
           this.dataHistory[item]=index+1;//有值的话次数加1个
            this.dataHistoryStr=JSON.stringify(this.dataHistory);

          }

        },
        async getAssociateFromBaidus(event){
             let target=event.currentTarget||event.target;
             if(event.keyCode=='38'||event.keyCode=='40'){
                 return;
             }
             this.currentIndex=-1;
             this.inputValueTemp=this.inputValue;
             let value=this.inputValue;
             // this.associate_show=false;
             $("#dataFromBd").val('');


        },
        async getTranslate(value){
          // alert(1);
          // let value=$("#wd").val();
          if(value!=''){
            // console.log("--------------ss");
            let {data:datas}=await getDataFromYoudao(value);
            // console.log('输入框的值'+value);
            //  console.log("结果"+datas.translateResult[0][0].tgt);
            this.translate=datas.translateResult[0][0].tgt;
            // alert(2);
          }
        },
        changeSerach(event){
          let se_id=event.currentTarget.id||event.target.id;
          this.soImg="../../static/image/small/" + se_id + ".png";
          // 存cookie
          // $.cookie("se_id", se_id, {path: "/", expires: 10 * 1000000});
          Cookies.set('se_id', se_id, { expires: 365 });
          // alert(1111);
          this.changeSousuo(se_id);
          // alert( se_id);

          $(".se").slideUp("slow");
          if (se_id == "se_5") {
            alert("谷歌搜索需要翻墙哦！")
          }
        },
        aloneSearch(){//这是搜索框单独存在时的样式

             $("#search").css("margin-left","-320px");
             $("#search").css("margin-top","-50px");
             this.showCommon=false;
             this.isAloneSearch=true;

        },
        originalSearch(){//这是搜索框原始的样式


             $("#search").css("margin-left","0px");
             $("#search").css("margin-top","0px");
             this.showCommon=true;
             this.isAloneSearch=false;


        },
        enterControl(){
          // if(this.uiMode.dynamic==true){
          //   this.isInControlShow=true;
          //   this.originalSearch();
          //   clearTimeout(this.taskTimer2);
          //   clearTimeout(this.taskTimer1);
          //   $(".mask2").css("background-color","rgba(0,0,0,0)");
          // }

        },
        leaveControl(){
          // if(localStorage.getItem('showControl')==null||localStorage.getItem('showControl')=="false"){
          //   if(this.uiMode.dynamic==true){
          //     this.isInControlShow=false;
          //     this.taskTimer1= setTimeout(()=>{
          //       if(this.isInCommon==false){
          //         this.aloneSearch();
          //       }
          //     },5000);
          //   }
          // }


        },
        enterCommon(){
          if(localStorage.getItem('smartTip2')==null){
            this.smartTip.show=true;
            this.dbclickimgtip=true;
            this.smartTip.button="我已经知道了双击鼠标切换效果";
            this.smartTip.msg="非常重要：鼠标双击试试隐藏------这样的动态效果部分浏览器不支持，建议双击鼠标来回切换效果";
          }

          // if(localStorage.getItem('showControl')==null||localStorage.getItem('showControl')==false){
          //   if(this.uiMode.dynamic==true){
          //     this.isInCommon=true;
          //     clearTimeout(this.taskTimer1);
          //     clearTimeout(this.taskTimer2);
          //     $(".mask2").css("background-color","rgba(0,0,0,0)");
          //   }
          // }



        },
        leaveCommon(){
          // if(localStorage.getItem('showControl')==null||localStorage.getItem('showControl')==false){
          //   if(this.uiMode.dynamic==true){
          //     this.isInCommon=false;
          //     this.taskTimer2=setTimeout(()=>{
          //       if(this.isInControlShow==false){
          //         this.aloneSearch();
          //       }
          //     },5000);
          //   }
          // }


        },
        dbClick(){//检测鼠标双击事件
          $(document).bind('click',()=>{
             console.log(this.db.dbCount);
             if(this.db.dbTime==null){
               this.db.dbTime=new Date();
               $(document).unbind('click');

             }else{

               var interval=new Date()-this.db.dbTime;


               if(interval<250){
                 this.dbclickimgtip=false;
                 this.db.dbCount=2;
                 this.db.dbTime=new Date();
                 // this.db.flag=!this.db.flag;
                 //在静态模式，与极简模式来回切换
                // this.uiMode.dynamic=false;
                 if(this.uiMode.simple==false){
                   this.uiMode.static=false;
                   this.uiMode.simple=true;
                 }else{
                   this.uiMode.static=true;
                   this.uiMode.simple=false;
                 }


                 this.$store.commit("changeUiMode",this.uiMode);

                 localStorage.setItem("uiMode",JSON.stringify(this.uiMode));
                 // alert(this.$store.state.uiMode.dynamic);
                 // alert(this.uiMode.dynamic);

               }else{
                 this.db.dbCount=1;
                 this.db.dbTime=new Date();
               }

               $(document).unbind('click');
             }
            this.dbClick();
          });
        },
        closeSmartTips(){
          this.smartTip.show=false;
          if(localStorage.getItem('smartTip2')!=null){
            localStorage.setItem("sortTip","true");
          }

          localStorage.setItem('smartTip2',"true");


        },
        changeHeight(length){
          if(length>38){
            $("#len").css("height","500px");
            $("#len").css("overflow","auto");
          }

        },
        setWebsHistory(obj){

          let webs=this.websHistory;
          let length=webs.length;
          if(length==0){
            //把历史压进栈中
            this.websHistory.unshift(obj);

          }else{

            //遍历检测是否有重名
            let isEqual=-1;
            for(let i=0;i<length;i++){
              if(webs[i].name==obj.name){
                isEqual=i;
              }
            }
            if(isEqual==-1){//如果没有相同的网址
              this.websHistory.unshift(obj);
            }else{//如果有相同的，移动到第一位
              //把这一项移动到最前面
              this.websHistory.splice(isEqual,1);
              this.websHistory.unshift(obj);
            }
            //检测是否超过数量限制
            while(this.websHistory.length>11){
              this.websHistory.pop();
            }

          }
          //存入本地
          localStorage.setItem("webHistory",JSON.stringify(this.websHistory));
        },
        setWebsHistory2(obj,index){


          let a=setTimeout(()=>{
            clearTimeout(a);
            this.websHistory.splice(index,1);
            this.websHistory.unshift(obj);
            //存入本地
            localStorage.setItem("webHistory",JSON.stringify(this.websHistory));
          },1500);
        }
      }
    }




</script>

<style scoped>
.all_search{
  margin:auto;
  padding-top: 20%;
  position: relative;
  width: 1010px;
  height: 300px;
  transition: all 0.5s;


}
  .associateActive{
    background-color: rgba(244,90,141,0.2);
    padding-left: 5px;
    transition:all 0.4s;
  }
  #translate{
    transition: all 0.5s;
    width: 100%;
    border-left: 5px solid rgba(238,10,69,0.5);

  }
  #translate a{
    display: block;
    color: rgba(255,255,255,0.8);
    text-decoration: none;
    padding-left: 10px;
  }
  .associate{
    position:relative;
    z-index:4;
    /*left:210px;*/
    background-color: rgba(0,0,0,0.8);
    width: 600px;
    margin: auto;
  }
  #associate_ul{
    padding-bottom: 0px;
    margin-bottom: 0px;
    transition: all 0.5s;
  }
  .associate_ul li a{
   display: block;
    text-decoration: none;
    color: white;
    padding-left: 10px;
 }
  .associate_ul li a:hover{
    background-color: rgba(255,255,255,0.07);
  }
  .associate_ul li a:visited{
    color:rgba(238,10,69,0.7);
    /*text-decoration: none;*/
    /*background-color: red;*/
  }
  .associate ul{
    color: white;
    list-style: none;
    padding-left: 0px;
    z-index: 999;
    padding-top: 0px;
  }
  .associate_ul li{
    height:25px;
    line-height: 25px;
    margin-top: 0px;

  }
  .dataHistory{

    padding-bottom: 0px;
    margin-bottom: 0px;
  }
  #dataHistory{
  }
  #dataHistory a{
    display: block;
    padding-left: 10px;
  }
  #dataHistory i{
    color: rgba(255,255,255,0);
    float: right;
    margin-top:-20px;
    margin-right: 10px;
  }
  #dataHistory:hover i{
    color: rgba(255,255,255,0.7);
  }
  #dataHistory i:hover{
    color: rgba(255,255,255,1);
  }

  #search{
    width:100%;
    height: 110px;
    /*position: fixed;*/

    /*background-color:rgba(0,0,0,1);*/
    margin: auto;
    /*top:25%;*/
    transition: all 0.5s;

    /*-webkit-transform: translate(0%, -250%);*/
    /*-ms-transform: translate(0%, -250%);*/
    /*transform: translate(0%, -250%)*/


  }


  .go{
    transition: all 0.5s;
    width:600px;
    height: 38px;
    background-color: rgba(255,255,255,0.8);
    margin:auto;
    display: flex;
    flex-direction: row;
    border-radius: 2px;
    /*border-bottom: 0.5px solid rgba(238,10,69,0.2);*/
    box-shadow: 1px 1px 1px rgba(0,0,0,0.15);
    /*background-color: yellow;*/
    /*margin-top: 20px;*/

  }
  .go input{

    width:545px;
    height: 38px;
    line-height: 38px;
    border: 0;
    background-color: rgba(255,255,255,0);
    outline: none;
    color: #f11456;
    font-size: 20px;
    font-weight: bold;
    padding-left: 10px;
    padding-right: 10px;
    transition: all 0.2s;



    /*---focus---*/

    /*background-color: transparent;*/
    /*border-bottom: 2px solid rgba(255,255,255,1);*/
    /*margin-left: -12px;*/
    /*color:white;*/
    /*---------*/

  }

  .go .engine{
    transition: all 0.5s;
    width: 38px;
    line-height: 38px;

  }

  .go .query{
    width:40px;
    height: 38px;
    line-height: 38px;
  }
  .content_top{
    width: 100%;
    background-color: red;
    background-color: rgba(255,255,255,0.865);
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 10px;
    padding-bottom: 30px;
   border-radius: 5px;
    position: relative;
  }


.content_top .webz{
  width:100%;
  height: 118px;
  margin-top: 13px;
}
.content_top .history{
  position:absolute;
   padding-right: 10px;
   height: 100px;
   margin-bottom: 10px;
  left: 50%;
  transform: translateX(-50%);

}
.content_top .history ul{

  padding: 0px;
  margin:auto;


  display: flex;
  flex-direction: row;
}
.content_top .history ul li{
  list-style: none;
  padding: 10px 10px;
  margin-left:10px;
  display: flex;
  justify-content: center;
  justify-items: center;
  transition: all 0.5s;
  border-radius: 5px;
}
.content_top .history ul li a{
 width: 58px;
  display: flex;
  flex-direction: column;
  color: #777;
  text-decoration: none;
  text-align: center;
}
.content_top .history ul li a span{
}
.content_top .history ul li a img{

  opacity: 0.8;
}
.content_top .history ul li:hover a img{
  opacity: 1;
}
.content_top .history ul li:hover{
  background-color: rgba(0,0,0,0.05);
}
.content_top .history ul li a span{
  margin-top: 5px;
}
  .lines{
    width:100%;
    height: 1px;
    margin-top: 30px;
    margin: auto;
    border-bottom: 1px dashed #777;
  }
  .common{

    width:100%;

    background-color:  rgba(255,255,255,0);
    /*position: fixed;*/
    margin: auto;
    margin-top: 10px;
    display: block;
    padding-bottom: 10px;
    transition: all 0.5s;
    /*top: 40%;*/
    /*left:50%;*/
    /*-webkit-transform: translate(-50%, 0%);*/
    /*-ms-transform: translate(-50%, 0%);*/
    /*transform: translate(-50%,0%);*/
    /*z-index:-2;*/
    /*background-color: red;*/
  }
.contrlShow{
  width:100%;
  height:700px;
  background-color: transparent;
  position: absolute;
  z-index: -1;
}
  #myTabContent{

  }
  #myTabContent ul{
    width:100%;
    padding-left: 0px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  #myTabContent ul li{
    font-size: 17px;
    width: 134px;
    height: 40px;
    line-height: 40px;
    list-style: none;
    /*float: left;*/
    /*background-color: red;*/

    padding-left: 20px;
    margin-top: 5px;
    overflow: hidden;
    opacity:1;
    transition: all 0.5s;
  }

  #myTabContent ul li a{
    font-size: 14px;
    display: block;
    color:#777;
    text-decoration: none;
  }

  #myTabContent ul li:hover{
    background-color: rgba(0,0,0,0.02);
    opacity: 1;
  }
  #myTabContent ul li:hover a{
    text-decoration: none;
   color:rgba(244,90,141,1);
  }
  #myTabContent ul li a span{
    margin-left: 20px;
  }
#myTabContent ul li img{
  opacity: 0.5;
  transition: all 0.5s;
}
#myTabContent ul li:hover img{
  opacity: 1;
}
  .se{
    display: none;
    cursor: default;
    background-color: rgba(0,0,0,0.7);
    color: white;
    /*position: fixed;*/
    top: 28%;
    /*left: 34.25%;*/
    z-index: 3;


  }
  .se ul{
    width: 100px;
    padding-left: 0px;
    list-style: none;
  }
  .se ul li{
    margin-top: 10px;
    padding-left: 5px;
  }
  .se ul li:hover{
    background-color: rgba(255,255,255,0.1);
  }
  .se ul li span{
    margin-left: 15px;
  }

  .icon-yanjing-shi{
    opacity: 0.5;
    margin-left: 530px;

  }

  .icon-eliminate{
    opacity: 0.5;
    margin-left: 10px;
  }

  .icon-yanjing-shi:hover{

    opacity: 1;
  }
  .icon-eliminate:hover{
    opacity: 1;

  }

  .mask2{
    position:fixed;
    width:100%;
    height:100%;
    left:0px;
    top:0px;
    z-index:-11;
    background-color: rgba(0,0,0,0);
    transition: all 0.3s;
  }
  .webmore{
    position: absolute;
    left:970px;bottom:-8px;
    width:160px;

    background-color: rgba(0,0,0,0.7);
    border-radius: 5px;
    color: white;
  }

.webmore:hover{
  width:170px;
  left:965px;
  bottom:-13px;
  border: 5px solid white;

}
.webmore ul{
   padding: 10px 0px;
   margin-bottom: 10px;
}


.moreWebz{
  width: 80px;
  float: left;
  height: 40px  ;
  /*background-color: yellow;*/
  padding-top: 40px;
  position: relative;

}

.moreWebz span{
  position: absolute;

  top:10px;
  left: 20px;
  cursor: default;
  color: rgba(51,122,183,1);
}
.moreWebz ul{
  width: 90px;
  position: absolute;
  left:0px;top:40px;
  z-index: 999;
  padding-top: 10px;
  padding-left: 0px;
  padding-bottom: 20px;
  list-style: none;
  background-color: rgba(0,0,0,0.7);
  text-align: center;
}
.moreWebz li{
  color: white;
  margin-top: 10px;
}

.moreWebz li a{
  color: white;
}














.webmore ul::-webkit-scrollbar {

  width:5px;

  height:5px;

}
.webmore ul::-webkit-scrollbar-button    {
  height: 5px;
  background-color:rgba(239,6,66,0.1);

}

.webmore ul::-webkit-scrollbar-track     {

  background:rgba(0,0,0,1);


}

.webmore ul::-webkit-scrollbar-track-piece {
  background:rgba(0,0,0,1);


}

.webmore ul::-webkit-scrollbar-thumb{

  background:rgba(239,6,66,0.5);
  border-radius:4px;


}

.webmore ul::-webkit-scrollbar-corner {

  background:white;


}

.webmore ul::-webkit-scrollbar-resizer  {

  background:white;


}


</style>
