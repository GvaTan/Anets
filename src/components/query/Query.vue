<template>
    <div id="query">
<!--      用户至简不凡体验-->
<!--输入框，各大搜索引擎通用-->
      <div class="engin">
        <div class="logo" style="margin-left: -5px;margin-right:10px"><a :href="queryLink" target="_blank"><img src="http://www.anets.cn/static/img/logo4.53d14cc.png" alt="" width="30px"></a></div>
        <input type="text" class="query_input form-control" v-model="inputValue" @keydown.13="search()">
        <i class="iconfont icon-jiantou" @click="search()" style="color: rgba(244,90,141,1);margin-left:-25px;margin-top:5px;font-weight: bolder"></i>
        <div class="classify" @mouseenter="classify.show=true" @mouseleave="classify.show=false">
           <button><span>{{classify.value.name}}</span><i class="iconfont icon-jiantou1" style="color: white;font-size: 10px;margin-left:8px"></i></button>
           <ul class="detail" v-if="classify.show">
              <li :class="{bg:value.isSelected}" v-for="(value,key,index) in dataz" @click="changeClassify(key)">{{key}}</li>
          </ul>
        </div>

        <div class="classifyB" >
          <ul class="detail">
            <li :class="{bg2:item.isSelected}" v-for="(item,index) in classify.value.detail.content" @click="changeEngin(index)" v-html="$options.filters.filterA(item)"> </li>
          </ul>
        </div>
      </div>
      <!--全局搜索---当你在此处搜索，切换引擎后，不必重新输入-->

      <div class="sex">
        <div id="drag" class="drag"></div>
      </div>

      <iframe :src="iframes.searchhref" frameborder="0" width="100%" height="100%"></iframe>
    </div>
</template>

<script>
  import Cookies from 'js-cookie';
    export default {
        name: "Query",
      computed:{

      },
      data(){
          return {
            classify: {show: false,value:{name:'',detail:null}},
            classifyB:{},
            inputValue: "",
            link:{baseLink: "", suffix: "",isNewWindow:null},
            iframes:{show:true,newhref:'',searchhref:""},
            dataz: {
              "网页": {
                content: [
                  {name: "百度", baseLink: "https://www.baidu.com/s?wd=", suffix: "", isSelected: true,isNewWindow:false},
                  {name: "必应", baseLink: "https://cn.bing.com/search?q=", suffix: "", isSelected: false,isNewWindow:false},
                  {name: "搜狗", baseLink: "https://www.sogou.com/sogou?query=", suffix: "", isSelected: false,isNewWindow:false},
                  {name: "好搜", baseLink: "https://www.so.com/s?ie=utf-8&q=", suffix: "", isSelected: false,isNewWindow:false},
                  {name: "YanDex", baseLink: "https://www.yandex.com/search/?text=", suffix: "", isSelected: false,isNewWindow:true},
                  {name: "谷歌(需翻墙)", baseLink: "https://www.google.com.hk/search?q=", suffix: "", isSelected: false,isNewWindow:false},
                  {name: "知乎", baseLink: "https://www.zhihu.com/search?type=content&q=", suffix: "", isSelected: false,isNewWindow:true},
                  {name: "微博", baseLink: "https://s.weibo.com/weibo/", suffix: "", isSelected: false,isNewWindow:false}
                ],
                isSelected: true
              },
              "影视": {
                content: [
                  {name: "疯狂影视", baseLink: "http://ifkdy.com/?q=", suffix: "", isSelected: false,isNewWindow:false},
                  {name: "音范丝", baseLink: "http://www.yinfans.me/?s=", suffix: "", isSelected: false,isNewWindow:false},
                  {name: "Bilibili", baseLink: "https://search.bilibili.com/bangumi?keyword=", suffix: "", isSelected: false,isNewWindow:false},
                  {name: "52影院", baseLink: "http://www.52xsba.com/seacher.php?sousuo=", suffix: "", isSelected: false,isNewWindow:false},
                  {name: "腾讯视频", baseLink: "https://v.qq.com/x/search/?q=", suffix: "", isSelected: false,isNewWindow:false},
                  {name: "优酷", baseLink: "https://so.youku.com/search_video/q_", suffix: "", isSelected: false,isNewWindow:false},
                  {name: "爱奇艺", baseLink: "http://so.iqiyi.com/so/q_", suffix: "", isSelected: false,isNewWindow:false},
                  {name: "佛系资源", baseLink: "https://www.foxizy.com/query/_", suffix: "", isSelected: true,isNewWindow:false}
                ],
                isSelected: false
              },
              "音乐": {
                content: [
                  {name: "网易云", baseLink: "https://music.163.com/#/search/m/?s=", suffix: "", isSelected: false,isNewWindow:true},
                  {name: "音悦台", baseLink: "http://so.yinyuetai.com/?keyword=", suffix: "", isSelected: true,isNewWindow:false},
                  {name: "虾米音乐", baseLink: "https://www.xiami.com/search?key=", suffix: "", isSelected: false,isNewWindow:true},
                 {name: "QQ音乐", baseLink: "https://y.qq.com/portal/search.html#page=1&searchid=1&remoteplace=txt.yqq.top&t=song&w=", suffix: "", isSelected: false,isNewWindow:true},
                  {name: "酷狗音乐", baseLink: "https://www.kugou.com/yy/html/search.html#searchType=song&searchKeyWord=", suffix: "", isSelected: false,isNewWindow:false},
                  {name: "酷我音乐", baseLink: "http://www.kuwo.cn/search/list?key=", suffix: "", isSelected: false,isNewWindow:false},
                  {name: "音乐搜索", baseLink: "http://music.ifkdy.com/?name=", suffix: "&type=netease", isSelected: false,isNewWindow:false}
                ],
                isSelected: false
              },
              "购物": {
                content: [
                  {name: "京东", baseLink: "https://search.jd.com/Search?keyword=", suffix: "&enc=utf-8", isSelected: false,isNewWindow:false},
                  {name: "淘宝", baseLink: "https://s.taobao.com/search?q=", suffix: "", isSelected: true,isNewWindow:false},
                  {name: "天猫", baseLink: "https://list.tmall.com/search_product.htm?q=", suffix: "", isSelected: false,isNewWindow:false},
                  {name: "唯品会", baseLink: "https://category.vip.com/suggest.php?keyword=", suffix: "", isSelected: false,isNewWindow:false},
                  {name: "蘑菇街", baseLink: "https://list.mogu.com/search/goods?q=", suffix: "", isSelected: false,isNewWindow:false},
                  {name: "当当", baseLink: "http://search.dangdang.com/?key=", suffix: "", isSelected: false,isNewWindow:false}
                ],
                isSelected: false
              },
              "资源": {
                content: [
                  {name: "搜搜磁力", baseLink: "http://sosocili.cc/soso/", suffix: ".html", isSelected: false,isNewWindow:true},
                  {name: "磁力猫", baseLink: "https://www.cilimao.world/search?word=", suffix: "", isSelected: true,isNewWindow:false},
                  {name: "BT蚂蚁", baseLink: "http://www.btakt.com/search/", suffix: "-first-asc-1", isSelected: false,isNewWindow:false},
                  {name: "磁力番号", baseLink: "http://cilifanhaoba.pw/q/", suffix: "/1/0/0.html", isSelected: false,isNewWindow:true},
                  //{name: "卧槽搜", baseLink: "http://www.wcs444.com/s/", suffix: "", isSelected: false,isNewWindow:false},错误
                  {name: "盘搜", baseLink: "http://www.pansoso.com/zh/", suffix: "", isSelected: false,isNewWindow:false},
                  {name: "pansou", baseLink: "http://www.pansou.com/?q=", suffix: "", isSelected: false,isNewWindow:false},
                  {name: "搜云盘", baseLink: "http://www.soyunpan.com/search/", suffix: "-0-全部-0.html", isSelected: false,isNewWindow:false},
                  {name: "58网盘", baseLink: "http://www.58wangpan.com/search/kw%20", suffix: "", isSelected: false,isNewWindow:false},
                  {name: "盘多多", baseLink: "http://www.panduoduo.net/s/name/%20", suffix: "", isSelected: false,isNewWindow:true}

                ],
                isSelected: false
              },
              "翻译": {
                content: [
                  {name: "词霸", baseLink: "http://www.iciba.com/", suffix: "", isSelected: false,isNewWindow:false},
                  {name: "海词", baseLink: "http://dict.cn/", suffix: "", isSelected: true,isNewWindow:false},
                  {name: "有道", baseLink: "http://www.youdao.com/w/eng/", suffix: "", isSelected: false,isNewWindow:false},
                  {name: "百度", baseLink: "https://fanyi.baidu.com/#zh/en/", suffix: "", isSelected: false,isNewWindow:false},
                  {name: "搜狗", baseLink: "https://fanyi.sogou.com/#auto/en/", suffix: "", isSelected: false,isNewWindow:false},
                  {name: "查查", baseLink: "http://www.ichacha.net/", suffix: ".html", isSelected: false,isNewWindow:false}


                ],
                isSelected: false
              },
              "图片": {
                content: [
                  {name: "百度图片", baseLink: "https://image.baidu.com/search/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=index&fr=&hs=0&xthttps=111111&sf=1&fmq=&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=", suffix: "", isSelected: false,isNewWindow:false},
                  {name: "回车桌面", baseLink: "https://www.enterdesk.com/search/1-0-6-0-0-0/", suffix: "", isSelected: true,isNewWindow:false},
                  {name: "搜狗图片", baseLink: "http://pic.sogou.com/pics?query=", suffix: "", isSelected: false,isNewWindow:false},
                  {name: "360图片", baseLink: "http://image.so.com/i?q=", suffix: "", isSelected: false,isNewWindow:false}


                ],
                isSelected: false
              }

            }
          }
      },
      filters:{
        filterA(val){
          if(val.isNewWindow==true){
            return val.name+"</a>"+"<i class='iconfont icon-tiaozhuan' style='margin-left: 5px'></i>";
          }else{
            return val.name;
          }
        }
      },
      created(){
          //检测路由中的值

         this.inputValue=this.$route.query.key;
         this.iframes.newhref=this.link.baseLink+this.inputValue+this.link.suffix;

          if(this.link.isNewWindow==false){
            this.iframes.searchhref=this.iframes.newhref;
          }else{
            window.open(this.iframes.newhref);
          }
          //检测是否新窗口打开
        let a=setTimeout(()=>{
          // alert(this.link.isNewWindow);
          if(this.link.isNewWindow==true){
            window.open(this.iframes.newhref);
            clearTimeout(a);
          }
        },600);
          //初始化数据和获取路由中web参数http://localhost:8080/query?key=&web=
         if(localStorage.getItem("myQuerys1")!=null){
           let b=JSON.parse(localStorage.getItem("myQuerys1"));
           if(this.$route.query.web==undefined){
             for(var key in b){
               if(key=="网页"){
                 b[key].isSelected=true;
               }else{
                 b[key].isSelected=false;
               }
             }
           }else{
             for(var key in b){
               if(key==this.$route.query.web){
                 b[key].isSelected=true;

               }else{
                 b[key].isSelected=false;
               }
             }
           }

          this.dataz=b;


         }else{//如果没有缓存数据
           let b1=this.dataz;
           if(this.$route.query.web==undefined){
             for(var key in b1){
               if(key=="网页"){
                 b1[key].isSelected=true;
               }else{
                 b1[key].isSelected=false;
               }
             }
           }else{
             for(var key in b1){
               if(key==this.$route.query.web){
                 b1[key].isSelected=true;

               }else{
                 b1[key].isSelected=false;
               }
             }
           }

           this.dataz=b1;
         }
      },
      watch:{
        dataz:{
          handler(newval,oldval){
             for(var key in newval){
                if(newval[key].isSelected==true){
                  this.classify.value.name=key;
                  this.classify.value.detail=newval[key];
                }
             }
          },
          immediate:true,deep:true
        },
        classify:{
          handler(newval,oldval){

               newval.value.detail.content.forEach((item)=>{
                 if(item.isSelected==true){
                  this.link.baseLink=item.baseLink;
                  this.link.suffix=item.suffix;
                  this.link.isNewWindow=item.isNewWindow;

                 }
               });


          },
          immediate:true,deep:true
        },
        inputValue:{
          handler(newval,oldval){
            this.iframes.newhref=this.link.baseLink+newval+this.link.suffix;
          },
          immediate:true,deep:true
        },
        link:{
             handler(newval,oldval){
               // 修改搜索链接
               this.iframes.newhref=this.link.baseLink+this.inputValue+this.link.suffix;
               if(this.link.isNewWindow==false){
                 this.iframes.searchhref=this.iframes.newhref;
               }
             },
             immediate:true,deep:true
        }
      },
      methods:{
          //搜索实现
        search(){

            if(this.link.isNewWindow==false){
              this.iframes.searchhref=this.iframes.newhref;
            }else {
              window.open(this.iframes.newhref);
            }
            this.$router.push({path:'/query',query:{key:this.inputValue}});



        },
        //切换类别
        changeClassify(key1){
          for(var key in this.dataz){
            if(key==key1){
              this.dataz[key].isSelected=true;
              //遍历当前选中的子类别网址中是否有需要新窗口打开的
              this.dataz[key].content.forEach((item)=>{
                if(item.isSelected==true&&item.isNewWindow==true){
                  let a=setTimeout(()=>{
                    window.open(this.iframes.newhref);
                    clearTimeout(a);
                  },600);
                }
              })
            }else{
              this.dataz[key].isSelected=false;
            }
          }
         //localStorage.setItem("myQuerys1",JSON.stringify(this.dataz));
        },
        //切换具体的搜索引擎
        changeEngin(index1){

          for(var key in this.dataz){
            if(key==this.classify.value.name){
              //如果是当前类别，如网页类别，说明切换的是网页类型中的数据，只需改这个
               this.dataz[key].content.forEach(((item,index)=>{
                 if(index==index1){
                   item.isSelected=true;
                   if(item.isNewWindow==true){
                     let a=setTimeout(()=>{
                       window.open(this.iframes.newhref);
                       clearTimeout(a);
                     },600);
                   }
                 }else{
                   item.isSelected=false;
                 }
               }))
            }
          }
          localStorage.setItem("myQuerys1",JSON.stringify(this.dataz));
        }
      }
    }
</script>

<style scoped>
  #query{
    width:100%;
    position: fixed;
    height:100%;
    left:0px;
    /*background:url("http://anets.cn.img.800cdn.com/upload/bg/3.jpg");*/
  }
.engin{
  width:100%;
  height: 45px;
  padding-top:7px;
  padding-left: 20px;
  /*background-color: rgba(0,0,0,1);*/
  display: flex;
  background-color: rgba(47,68,95,1);
  flex-direction: row;
}

  .engin .query_input{
    width:350px;
    height:30px;
    background-color: white;
  }

.classify{
  margin-left:70px;


}

  .classify button{
    width:80px;
    height: 30px;
    color: white;
    border: 0px;
    outline: none;
    background-color: rgba(15,31,53,1);
    border-radius: 5px;
  }

  .classify .detail{
    width:80px;
    padding: 0px;
    color: rgba(255,255,255,0.7);
    list-style: none;
    position: absolute;
    background-color: rgba(47,68,95,1) ;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .classify .detail li{

    cursor: default;
    height: 30px;
    line-height: 30px;

    width: 100%;
    text-align: center;
  }


  .classify .detail li:hover{
    color: rgba(255,255,255,1);
  }


  .classifyB ul{
    margin-top: -5px;
    height: 30px;
    list-style: none;
    color: rgba(255,255,255,0.7);
    display: flex;
    flex-direction: row;
    line-height: 30px;
    padding-left: 30px;
  }

  .classifyB ul li{
    cursor: default;
    margin-left:30px;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
  }

  .bg{
    background-color: rgba(15,31,53,1);
  }

  .bg2{
    border-bottom: 2px solid white;
    color: rgba(255,255,255,1);
  }
</style>
