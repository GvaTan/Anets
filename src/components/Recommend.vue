<template>
   <div>
     <div  v-for="(item,index) in recommend" :key="index" v-if="show">
       <div class="recommen">
         <div class="title">
           <ul>
             <li>{{item.classify}}</li>
           </ul>
         </div>
         <div class="left">
           <ul>
             <li v-for="(value,key,index1) in  item.content" :key="index1" @click="changeData(index,key,$event)" :class="{mycolor:index1==0}">{{key}}</li>
           </ul>
         </div>
         <div class="right">

           <ul :id="index" v-for="(value2,key2,index2) in recommend[index].content" :key="index2" v-if="index2==0">
             <li v-for="(value3,key3,index3) in value2" :key="index3" @click.stop="websHistory(index,key2,$event,index3)">
               <a :href="value3.url" target="_blank">
                 <img :src="value3.img"  width="20px">
                 <span>{{value3.name}}</span>

               </a>
               <i class="iconfont icon-zhuti" @click.stop="collectWeb(value3)"></i>
             </li>
           </ul>


         </div>
       </div>

       <div class="lines"></div>
     </div>
     <div class="collect" v-if="collect.show">
       <i class="iconfont  icon-guanbi"  style="position: absolute;right: -20px;top:-20px;color: white" @click="collect.show=false"></i>
       <h3>添加到我的收藏夹</h3>
       <h5>请单击选中你要收藏的位置</h5>
       <ul>
         <li v-for="(item,index) in webs"  @click="selectItem(index)" :class="{actives:index==collect.currentIndex}"><i class="iconfont icon-wenjianjia1" style="color: crimson"></i>
           <span style="margin-left: 20px" v-if="!item.isEdit">{{item.classify}}<i @click="update(index)" class="iconfont icon-xiugai" style="float: right"></i></span>
           <input v-if="item.isEdit" type="text" class="form-control" style="display: inline-block;width:100px;height: 30px" v-model="dir.classify" autofocus @blur="blur(index)" @keydown.13="blur(index)">
         </li>


         <div @mouseenter="detail.showDetail=false" @click="addDir()" style="text-align: center;color: black;margin-top: 5px;cursor: default"><i class="iconfont icon-wangpanxinjianwenjianjia-copy"></i>&nbsp;&nbsp;&nbsp;<span>新建</span></div>
       </ul>
       <div style="margin-top: 30px">
         <button @click="saveItem()">确认添加</button><button @click="collect.show=false">不了</button>
       </div>
     </div>
     <Tips :message="tip.message" :show="tip.show"></Tips>
   </div>
</template>

<script>
  import Tips from './tool/Tips'
    export default {
        name: "Recommen",
      components:{Tips},
  props:["show"],
      data(){
          return{
            collect:{show:false,currentIndex:null},//收藏网址显示
            itemTemp:{name:"",url:"",img:'',click:1},//临时记录所选网址
            dir:{classify:"新文件夹",content:[],isNull:true,isEdit:true},//新目录
            tip:{message:"",show:false},//提示
            dataWebs:[],
            //推荐的内容
            recommend:[
              {
                classify:"娱乐",content:{
                  "影音":[
                    {name:"哔哩哔哩",url:"http://www.bilibili.com",img:'../../static/image/common/bilibili.png',click:1,description:"二次元动漫站"},
                    {name:"腾讯视频",url:"http://v.qq.com",img:'../../static/image/common/txsp.png',click:1,description:"中国领先的在线视频媒体平台"},
                    {name:"芒果TV",url:"http://www.mgtv.com",img:'../../static/image/common/mg.png',click:1,description:"湖南卫视在线视频媒体平台"},
                    {name:"优酷",url:"http://www.youku.com",img:'../../static/image/common/youku.png',click:1,description:"阿里巴巴文化娱乐集团大优酷事业群下的视频平台"},
                    {name:"MvCat",url:"http://www.mvcat.com/",img:'../../static/image/common/mvcat.png',click:1,description:"http://www.mvcat.com/"},
                    {name:"爱奇艺",url:"http://www.iqiyi.com/",img:'../../static/image/common/aqy.png',click:1,description:"拥有海量、优质、高清的网络视频"},
                    {name:"时光网",url:"http://www.mtime.com/",img:'../../static/image/common/sgw.png',click:1,description:"http://www.mtime.com/"},
                    {name:"搜狐视频",url:"https://tv.sohu.com/",img:'../../static/image/common/sh.png',click:1,description:"拥有海量、优质、高清的网络视频"},
                    {name:"飘花",url:"https://www.piaohua.com/",img:'../../static/image/common/ph.png',click:1,description:"https://www.piaohua.com/"},
                    {name:"场库",url:"https://www.vmovier.com/",img:'../../static/image/common/ck.png',click:1,description:"https://www.vmovier.com/"},
                    {name:"私人官网",url:"http://www.aaqqw.com/",img:'../../static/image/common/aaqqw.png',click:1,description:"http://www.aaqqw.com/"},
                    {name:"音悦Tai ",url:"http://www.yinyuetai.com/",img:'../../static/image/common/yyt.png',click:1,description:"让娱乐更美好"},
                    {name:"网易云音乐",url:"https://music.163.com/",img:'../../static/image/common/wyy.png',click:1,description:"专注于发现与分享的音乐产品"},
                    {name:"QQ音乐",url:"https://y.qq.com/",img:'../../static/image/common/qqyy.png',click:1,description:"腾讯公司推出的网络音乐服务"},
                    {name:"虾米音乐",url:"https://www.xiami.com/",img:'../../static/image/common/xm.png',click:1,description:"专业音乐内容发现平台"},
                    {name:"酷狗音乐",url:"http://www.kugou.com/",img:'../../static/image/common/kg.png',click:1,description:"最新最全的在线正版音乐网站"},
                    {name:"酷我音乐",url:"http://www.kuwo.cn/",img:'../../static/image/common/kw.png',click:1,description:"听音乐，用酷我"}
                  ],
                  "游戏直播":[
                    {name:"斗鱼",url:"https://www.douyu.com/",img:'../../static/image/common/dy.png',click:1,description:"https://www.douyu.com/"},
                    {name:"虎牙",url:"https://www.huya.com/",img:'../../static/image/common/hy.png',click:1,description:"https://www.huya.com/"},
                    {name:"4399游戏",url:"http://www.4399.com/",img:'../../static/image/common/4399.png',click:1,description:"http://www.4399.com/"},
                    {name:"7k7k游戏",url:"http://www.7k7k.com/",img:'../../static/image/common/7k7k.png',click:1,description:"http://www.7k7k.com/"}
                  ],
                  "小说漫画":[
                    {name:"起点中文网",url:"https://www.qidian.com/",img:'../../static/image/common/qd.png',click:1,description:"阅文集团旗下网站"},
                    {name:"纵横中文网",url:"http://www.zongheng.com/",img:'../../static/image/common/zh.png',click:1,description:"最热门的免费小说网"},
                    {name:"言情小说吧",url:"https://www.xs8.cn/",img:'../../static/image/common/yq.png',click:1,description:"专业-言情"},
                    {name:"红袖添香",url:"https://www.hongxiu.com/",img:'../../static/image/common/hxtx.png',click:1,description:"阅文集团旗下网站"},
                    {name:"潇湘书院",url:"http://www.xxsy.net/",img:'../../static/image/common/xx.png',click:1,description:"免费言情小说"},
                    {name:"晋江文学城",url:"http://www.jjwxc.net/",img:'../../static/image/common/jj.png',click:1,description:"都市言情小说"},
                    {name:"17K",url:"https://www.17k.com/",img:'../../static/image/common/17k.png',click:1,description:"一起免费看小说"},
                    {name:"逐浪网",url:"http://www.zhulang.com/",img:'../../static/image/common/zl.png',click:1,description:"连尚文学旗下网咋"},
                    {name:"有妖气 ",url:"http://www.u17.com/",img:'../../static/image/common/yyq.png',click:1,description:"中国唯一且最大的纯原创漫画网站"},
                    {name:"动漫之家",url:"https://manhua.dmzj.com/",img:'../../static/image/common/dmzj.png',click:1,description:"动漫之家漫画网提供海量漫画"},
                    {name:"网易漫画",url:"https://163.bilibili.com/",img:'../../static/image/common/wymh.png',click:1,description:"一款全新漫画万能聚合神器"},
                    {name:"动漫屋",url:"http://cnc.dm5.com/",img:'../../static/image/common/dmw.png',click:1,description:"为看漫画的人而生"}
                  ]
                }
              },
              {
                classify:"生活",content:{
                  "购物":[
                    {name:"淘宝",url:"https://www.taobao.com/",img:'../../static/image/common/taobao.png',click:1,description:"亚洲较大的网上交易平台"},
                    {name:"京东",url:"https://www.jd.com/",img:'../../static/image/common/jd.png',click:1,description:"专业综合网上购物商城"},
                    {name:"天猫",url:"https://www.tmall.com",img:'../../static/image/common/tm.png',click:1,description:"引领更好的生活趋势-理想生活"},
                    {name:"唯品会",url:"https://www.vip.com/",img:'../../static/image/common/wph.png',click:1,description:"品牌特卖"},
                    {name:"聚划算",url:"https://ju.taobao.com/",img:'../../static/image/common/jhs.png',click:1,description:"淘宝旗下"},
                    {name:"当当网",url:"http://book.dangdang.com/",img:'../../static/image/common/dd.png',click:1,description:"图书商城"},
                    {name:"1号店",url:"https://www.yhd.com/",img:'../../static/image/common/1hd.png',click:1,description:"全球超市,轻松到家!"},

                    {name:"苏宁",url:"https://www.suning.com/",img:'../../static/image/common/sn.png',click:1,description:"送货更准时,好货更超值"},
                    {name:"亚马逊",url:"https://www.amazon.cn/",img:'../../static/image/common/ymx.png',click:1,description:"天天低价,正品行货"},
                    {name:"亚马逊国际",url:"https://www.amazon.com/",img:'../../static/image/common/ymxgj.png',click:1,description:"国际亚马逊官网"},
                    {name:"网易考拉",url:"https://www.kaola.com/",img:'../../static/image/common/wykl.png',click:1,description:"国内领先的跨境购物商城"},
                    {name:"凡客",url:"http://www.vancl.com/",img:'../../static/image/common/fk.png',click:1,description:"互联网快时尚品牌,网上购物首选品牌,"},
                    {name:"国美",url:"https://www.gome.com.cn/",img:'../../static/image/common/gm.png',click:1,description:"国美控股集团旗下大型综合性购物平台"}
                  ],
                  "社交":[
                    {name:"微博",url:"http://www.weibo.com",img:'../../static/image/common/weibo.png',click:1,description:"随时随地发现新鲜事"},
                    {name:"微信",url:"https://wx.qq.com/",img:'../../static/image/common/wx.png',click:1,description:"https://wx.qq.com/"},
                    {name:"QQ空间",url:"http://qzone.qq.com",img:'../../static/image/common/kj.png',click:1,description:"http://qzone.qq.com"},
                    {name:"百度贴吧",url:"https://tieba.baidu.com/index.html",img:'../../static/image/common/tb.png',click:1,description:"http://www.weibo.com"},
                    {name:"天涯社区",url:"http://www.tianya.cn/",img:'../../static/image/common/ty.png',click:1,description:"http://www.tianya.cn/"},
                    {name:"水木社区",url:"http://www.newsmth.net/nForum/#!mainpage",img:'../../static/image/common/sm.png',click:1,description:"http://www.newsmth.net"},
                    {name:"西祠胡同",url:"http://www.xici.net/",img:'../../static/image/common/ht.png',click:1,description:"http://www.xici.net/"},
                    {name:"V2EX",url:"https://www.v2ex.com/",img:'../../static/image/common/v2ex.png',click:1,description:"https://www.v2ex.com/"},
                    {name:"猫扑",url:"http://www.mop.com/",img:'../../static/image/common/mp.png',click:1,description:"http://www.mop.com/"},
                    {name:"豆瓣",url:"https://www.douban.com/",img:'../../static/image/common/db.png',click:1,description:"https://www.douban.com/"}

                  ]
                }
              },
              {
                classify:"学习",content:{
                  "网络课堂":[
                    {name:"慕课",url:"https://www.mooc.cn/",img:'../../static/image/common/mooc.png',click:1,description:"https://www.mooc.cn/"},
                    {name:"网易公开课",url:"https://open.163.com/",img:'../../static/image/common/wygkk.png',click:1,description:"https://open.163.com/"},
                    {name:"网易云课堂",url:"https://study.163.com/",img:'../../static/image/common/wyykt.png',click:1,description:"https://study.163.com/"},
                    {name:"腾讯",url:"https://ke.qq.com/",img:'../../static/image/common/kt.png',click:1,description:"https://ke.qq.com/"},
                    {name:"多贝公开课",url:"http://www.duobei.com/",img:'../../static/image/common/dbgkk.png',click:1,description:"http://www.duobei.com/"},
                    {name:"极客学院",url:"http://www.jikexueyuan.com/",img:'../../static/image/common/jk.png',click:1,description:"http://www.jikexueyuan.com/"},
                    {name:"百度传课",url:"https://chuanke.baidu.com/",img:'../../static/image/common/dbgkk.png',click:1,description:"https://chuanke.baidu.com/"},
                    {name:"邢帅教育",url:"https://www.xsteach.com/",img:'../../static/image/common/xsjy.png',click:1,description:"https://www.xsteach.com/"},
                  ]
                }
              },
              {
                classify:"工作",content:{
                  "设计":[
                    {name:"iconfont",url:"http://iconfont.cn/",img:'../../static/image/common/icon.png',click:1,description:"http://iconfont.cn/"},
                    {name:"nicetool",url:"http://www.nicetool.net/",img:'../../static/image/common/zan.png',click:1,description:"http://www.nicetool.net/"},
                    {name:"veer",url:"https://www.veer.com/",img:'../../static/image/common/vv.png',click:1,description:"https://www.veer.com/"},
                    {name:"gratiso",url:"https://gratisography.com/",img:'../../static/image/common/xj.png',click:1,description:"https://gratisography.com/"},
                    {name:"千库网",url:"http://588ku.com/",img:'../../static/image/common/iC.png',click:1,description:"http://588ku.com/"},
                    // {name:"优设导航",url:"http://hao.shejidaren.com/",img:'../../static/image/common/yy.png',click:1,description:"http://hao.shejidaren.com/"},
                    {name:"设计导航",url:"http://hao.shejidaren.com/",img:'../../static/image/common/yyyy.png',click:1,description:"http://hao.shejidaren.com/"},
                    {name:"UI设计",url:"http://hao.xueui.cn/",img:'../../static/image/common/sj.png',click:1,description:"http://hao.xueui.cn/"},
                    {name:"牛大师",url:"http://www.niudana.com/",img:'../../static/image/common/niu.png',click:1,description:"http://www.niudana.com/"},
                    {name:"饭团",url:"http://hao.psefan.com/",img:'../../static/image/common/ft.png',click:1,description:"http://hao.psefan.com/"}
                  ]
                }
              },{
                classify:"下载",content:{
                  "网盘":[
                    {name:"百度网盘",url:"https://pan.baidu.com/",img:'../../static/image/common/bdtp.png',click:1,description:"https://pan.baidu.com/"}
                  ],
                  "壁纸":[
                    {name:"Haven",url:"https://wallhaven.cc/",img:'../../static/image/common/haven.png',click:1,description:"https://wallhaven.cc/"},
                    {name:"GoodFon",url:"https://www.goodfon.com/",img:'../../static/image/common/good.png',click:1,description:"https://www.goodfon.com/"},
                    {name:"电脑壁纸",url:"http://lab.mkblog.cn/wallpaper/",img:'../../static/image/common/paper.png',click:1,description:"http://lab.mkblog.cn/wallpaper/"},
                    // {name:"Dtgraphy",url:"http://desktopography.net/",img:'../../static/image/common/link.png',click:1,description:"http://desktopography.net/"},
                    {name:"Hippopx",url:"https://www.piqsels.com/zh",img:'../../static/image/common/pq.png',click:1,description:"https://www.piqsels.com/zh"},
                    {name:"Dtgraphy",url:"http://desktopography.net/",img:'../../static/image/common/de.png',click:1,description:"http://desktopography.net/"},
                    {name:"Wallpaper",url:"http://wallpapers.net/",img:'../../static/image/common/wall.png',click:1,description:"http://wallpapers.net/"},
                    {name:"Pexels",url:"https://www.pexels.com/",img:'../../static/image/common/pex.png',click:1,description:"https://www.pexels.com/"},
                    {name:"次元图库",url:"http://tu.prdsarea.com/",img:'../../static/image/common/cytk.png',click:1,description:"http://tu.prdsarea.com/"}
                  ],
                  "资源":[
                    {name:"磁力猫",url:"http://www.cilimao.at",img:'../../static/image/common/clm.png',click:1,description:"http://www.cilimao.at"},
                    {name:"58网盘",url:"http://www.58wangpan.com/",img:'../../static/image/common/58wp.png',click:1,description:"http://www.58wangpan.com/"},
                    // {name:"蜘蛛",url:"http://www.zhizhu10.com/",img:'../../static/image/common/link.png',click:1,description:"http://www.zhizhu10.com/"},
                    {name:"转盘",url:"https://www.quzhuanpan.com/",img:'../../static/image/common/zp.png',click:1,description:"https://www.quzhuanpan.com/"},
                    // {name:"磁力吧",url:"https://www.cl8.biz/",img:'../../static/image/common/link.png',click:1,description:"https://www.cl8.biz/"},
                    {name:"磁力库",url:"https://www.btku1.com/",img:'../../static/image/common/bt.png',click:1,description:"https://www.btku1.com/"}
                  ],
                  "发现":[
                    {name:"鹏少资源",url:"https://www.jokerps.com/",img:'../../static/image/common/ps.png',click:1,description:"https://www.jokerps.com/"}

                  ]
                }
              },
              {
                classify:"工具",content:{

                  "邮箱":[
                    {name:"QQ邮箱 ",url:"http://mail.qq.com",img:'../../static/image/common/mailqq.png',click:1,description:"http://mail.qq.com"},
                    {name:"163邮箱 ",url:"https://mail.163.com/",img:'../../static/image/common/163yx.png',click:1,description:"https://mail.163.com/"},
                    {name:"126邮箱 ",url:"https://mail.126.com/",img:'../../static/image/common/126yx.png',click:1,description:"https://mail.126.com/"},
                    {name:"新浪邮箱 ",url:"http://mail.sina.com.cn/",img:'../../static/image/common/xlyx.png',click:1,description:"http://mail.sina.com.cn/"},
                    {name:"139邮箱 ",url:"https://mail.10086.cn/",img:'../../static/image/common/139yx.png',click:1,description:"https://mail.10086.cn/"},
                    {name:"网易企业邮箱 ",url:"https://qiye.163.com/login/",img:'../../static/image/common/wyqy.png',click:1,description:"https://qiye.163.com/login/"},
                    {name:"腾讯企业邮箱 ",url:"https://exmail.qq.com/",img:'../../static/image/common/txqy.png',click:1,description:"https://exmail.qq.com/"},
                    {name:"搜狐邮箱 ",url:"https://mail.sohu.com/fe/#/login",img:'../../static/image/common/shyx.png',click:1,description:"https://mail.sohu.com/fe/#/login"},
                    {name:"21CN ",url:"https://mail.21cn.com/w2/",img:'../../static/image/common/21cn.png',click:1,description:"https://mail.21cn.com/w2/"},
                    {name:"Gmail ",url:"http://www.gmail.com/",img:'../../static/image/common/gmail.png',click:1,description:"http://www.gmail.com/"},
                    {name:"Outlook ",url:"https://outlook.live.com/owa/",img:'../../static/image/common/outlook.png',click:1,description:"https://outlook.live.com/owa/"}
                  ],
                  "其他":[
                    {name:"VIP视频解析 ",url:"http://www.5ifxw.com/vip/",img:'../../static/image/common/link.png',click:1,description:"http://www.5ifxw.com/vip/"},
                    {name:"影视搜索",url:"http://ifkdy.com/",img:'../../static/image/common/link.png',click:1,description:"http://ifkdy.com/"},
                    {name:"音乐搜索",url:"http://music.ifkdy.com/",img:'../../static/image/common/link.png',click:1,description:"http://music.ifkdy.com/"},
                    {name:"文件转换器",url:"https://convertio.co/zh/",img:'../../static/image/common/link.png',click:1,description:"https://convertio.co/zh/"}
                  ]
                }
              },
              {
                classify:"金融",content:{
                  "支付":[
                    {name:"新支付宝",url:"https://www.alipay.com/",img:'../../static/image/common/zfb.png',click:1,description:"全球领先的独立第三方支付平台"},
                    {name:"财付通",url:"https://www.tenpay.com/v2/",img:'../../static/image/common/cft.png',click:1,description:"会支付，会生活"},
                    {name:"工商银行",url:"http://www.icbc.com.cn/",img:'../../static/image/common/gs.png',click:1,description:"一流数字生态银行"},
                    {name:"浦发银行",url:"https://www.spdb.com.cn/",img:'../../static/image/common/pf.png',click:1,description:"让金融为美好生活创造价值"},
                    {name:"中信银行",url:"http://www.citicbank.com/",img:'../../static/image/common/zx.png',click:1,description:"中信集团旗下最大子公司"},
                    {name:"邮政银行",url:"http://www.psbc.com/",img:'../../static/image/common/yz.png',click:1,description:"历史悠久的一家普惠银行"},
                    {name:"农业银行",url:"http://www.abchina.com/cn/",img:'../../static/image/common/ly.png',click:1,description:"提供各种公司银行和零售银行产品和服务"},
                    {name:"建设银行",url:"http://www.ccb.com/cn/home/indexv3.html",img:'../../static/image/common/js.png',click:1,description:"中央管理的大型国有银行"},
                    {name:"交通银行",url:"http://www.bankcomm.com/BankCommSite/default.shtml",img:'../../static/image/common/jt.png',click:1,description:"首家全国性股份制商业银行"},
                    {name:"中国银行",url:"http://www.boc.cn/",img:'../../static/image/common/zg.png',click:1,description:"中国国际化和多元化程度最高的银行"}
                  ],
                  "投资":[
                    {name:"暂无，待更新 ",url:"http://anets.cn",img:'../../static/image/common/link.png',click:1,description:"让钱生钱"},


                  ]
                }
              }


            ],
            currentIndex:-1
          }
      },
      computed:{
          webs:{
            get(){
              return this.$store.state.mywebs;
            }
          }
      },
      mounted(){
        this.loadStyles("./static/css/recommend.css");
      },
      methods:{
        changeData(index,key,event){

         this.dataWebs=this.recommend[index].content[key];
         this.currentIndex=index;
         let content="";
          for(let index in this.dataWebs){
            content+="<li><a href='"+this.dataWebs[index].url+"' target='_blank'><img src='"+this.dataWebs[index].img+"'  width='20px'><span style='margin-left: 24px'>"+this.dataWebs[index].name+"</span></a>" +
              "<i class='iconfont icon-zhuti' @click.stop='collectWeb("+this.dataWebs[index]+")'></i></li>"
          }

          $("#"+index).html(content);


          var target=event.target||event.currentTarget;
          $(target).css("color","rgba(119,119,119,1)");
          $(target).siblings().css("color","rgba(119,119,119,0.7)");



          //准备把搜索历史放入栈中
          $("#"+index+" li").bind('click',($event)=>{
            var target=$event.target||$event.currentTarget;
            var obj;
            if(target.tagName=='SPAN'){
              obj=$(target).parent().parent();
            }else if(target.tagName=='IMG'){
              obj=$(target).parent().parent();
            }else if(target.tagName=='A'){
              obj=$(target).parent();
            }else{
              obj=null;
            }


            this.$emit("history",this.recommend[index].content[key][obj.index()]);

          })

          //准备收藏网址功能
          $("#"+index+" li i").bind('click',($event)=>{
            var target=$event.target||$event.currentTarget;
            this.collectWeb(this.recommend[index].content[key][$(target).parent().index()]);
          })

        },
        loadStyles(url) {
          var link = document.createElement("link");
          link.type = "text/css";
          link.rel = "stylesheet";
          link.href = url;
          link.id="css1";
          document.getElementsByTagName("head")[0].appendChild(link);
        },
        removeStyles() {
          document.getElementById("css1").remove();
        },
        websHistory(index,key2,event,index3){
          var target=event.target||event.currentTarget;
          var obj;
          if(target.tagName=='SPAN'){
            obj=$(target).parent().parent();
          }else if(target.tagName=='IMG'){
            obj=$(target).parent().parent();
          }else if(target.tagName=='A'){
            obj=$(target).parent();
          }else{
            obj=null;
          }
          //把访问历史压入栈中
          this.$emit("history",this.recommend[index].content[key2][obj.index()]);
        },
        collectWeb(item1){
          //初始化收藏数据
          this.collect.show=true;
          this.itemTemp.img=item1.img;
          this.itemTemp.name=item1.name;
          this.itemTemp.url=item1.url;
        },
        selectItem(index){
          //选中功能
          this.collect.currentIndex=index;
        },
        saveItem(){
          //保存收藏功能
          if(this.collect.currentIndex==null){
            this.tip.message="你忘记选中了收藏的位置";
            this.tip.show=true;
            let a=setTimeout(()=>{this.tip.show=false;clearTimeout(a)},2000);
            return;
          }
          let str=JSON.stringify(this.itemTemp);
          this. webs[this.collect.currentIndex].content.push(JSON.parse(str));
          let str2=JSON.stringify(this.webs);
          this.$store.commit("changeMywebs",JSON.parse(str2));
          localStorage.setItem("mywebsLocal",JSON.stringify(this.webs));
          this.tip.message="添加成功！";
          this.tip.show=true;
          let a=setTimeout(()=>{this.tip.show=false;clearTimeout(a)},2000);
          this.collect.show=false;
        },
        addDir(){
          //新增文件夹功能
          let str=JSON.stringify(this.dir);
          this.webs.push(JSON.parse(str));
          this.$store.commit("changeMywebs",this.webs);
          // localStorage.setItem("mywebsLocal",JSON.stringify(this.webs));
        },
        blur(index){
          let str=JSON.stringify(this.dir);
          this.webs[index].classify=JSON.parse(str).classify;
          this.webs[index].isEdit=false;
          this.$store.commit("changeMywebs",this.webs);
        },
        update(index){
          this.dir.classify=this.webs[index].classify;
          this.webs.forEach((item,index2)=>{
            if(index!=index2){
              item.isEdit=false;
            }
          });
          this.webs[index].isEdit=true;
        }
      }
    }
</script>

<style scoped>

  .lines{
    width:100%;
    height: 1px;
    margin-top: 30px;
    margin: auto;
    border-bottom: 1px dashed #777;
  }
  ul{
    padding: 0px;
    margin: 0px;
    list-style: none;
  }


  ul li{
    font-size: 14px;
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



  .recommen .right ul li a{
    font-size: 14px;
    display: block;
    color:#777;
    text-decoration: none;
  }

   .recommen .right ul li:hover{
    background-color: rgba(0,0,0,0.02);
    opacity: 1;
  }
.recommen .right ul li:hover a{
    text-decoration: none;
    color:rgba(244,90,141,1);
  }
 .recommen .right ul li a span{
    margin-left: 20px;
  }
  .recommen .right ul li img{
    opacity:0;

  }
  .recommen .right ul:hover li img{
    opacity: 1;
  }
.recommen{
  width: 100%;
  color: #777;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  margin-top: 8px;
  margin-bottom: 8px;
}

  .recommen .right ul{
     display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    cursor: default;
  }
  .recommen .left{
    color: rgba(119,119,119,0.7);
  }
  .recommen .left ul li{
    cursor: default;
    width:76px;
    margin-left: 7px;

  }
  .recommen .left ul li{
    font-weight: bold;

  }
  .recommen .title ul li{
    width: 50px;
    font-weight: bold;
  }


  .icon-zhuti{
    position: absolute;
    margin-left: 110px;
    margin-top: -38px;
    cursor: default;
    opacity: 0;
    transition: all 0s;
  }

  .recommen .right ul:hover li:hover .icon-zhuti{
    opacity: 1;
  }
  .mycolor{
    color:  rgba(119,119,119,1);
  }

  button{
    outline: none;
    border: 1px solid rgba(244,90,141,1);
    background-color: rgba(244,90,141,1);
    color:white;
    transition: all 0.2s;
    height: 25px;
    line-height: 25px;
    padding-bottom: 5px;
    border-radius: 3px;
    margin-right: 20px;
  }
  button:hover{
    background-color: transparent;
    color: rgba(244,90,141,1);
  }
  .collect{
    width: 250px;
    background-color: rgba(255,255,255,1);
    border-radius: 5px;
    box-shadow: 1px 1px 5px rgba(0,0,0,0.7);
    position: fixed;
    left: 50%;
    top:50%;
    transform:translate(-50%,-50%);
    padding: 5px 10px;
    color: black;
    padding-bottom: 20px;

  }

  .collect ul{
    list-style: none;
    width:150px;
    margin-top: 20px;
    border:1px solid crimson;
    box-shadow: 1px 1px 5px rgba(0,0,0,0.3);
    border-radius: 5px;
    padding: 20px 0px;

  }

  .collect ul li{
    width:100%;
    height:30px;
    line-height: 30px;
    padding-left: 20px;
    transition: all 0.3s;
    cursor: default;
    /*background-color: red;*/
  }
  .collect ul li:hover{
    background-color: rgba(244,90,141,1);
    color: white;
  }

  .actives{
    background-color: rgba(244,90,141,1);
    color: white;
  }
</style>
