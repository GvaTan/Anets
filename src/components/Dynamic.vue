<template>
    <div>
      <button @click="closeDynamic()">关闭动态壁纸特效</button>
      <ul>
<!--        //蝴蝶特效-->
        <li @click="butterfyShow('butterfly','http://anets.cn/upload/wallpaper/dist/821564397969788.jpg')">
          <a href="javaScript:void(0)" ><img v-lazy="'http://anets.cn/upload/wallpaper/thumbnail/821564397969788.jpg'" alt="" width="240px" height="135px"></a>
          <span>蝴蝶飞舞</span>
        </li>
<!--        //蒲公英特效-->
        <li @click="butterfyShow('dandelion','http://anets.cn/upload/wallpaper/dist/821564396521078.jpg')">
          <a href="javaScript:void(0)" ><img v-lazy="'http://anets.cn/upload/wallpaper/thumbnail/821564396521078.jpg'" alt="" width="240px" height="135px"></a>
          <span>蒲公英</span>
        </li>

        <!--        满天星-->
        <li @click="butterfyShow('star','http://anets.cn/upload/wallpaper/dist/821564566324107.jpg')">
          <a href="javaScript:void(0)" ><img v-lazy="'http://anets.cn/upload/wallpaper/thumbnail/821564566324107.jpg'" alt="" width="240px" height="135px"></a>
          <span>满天星</span>
        </li>

        <!--        雨滴效果-->
        <li @click="butterfyShow('rain','rain')">
          <a href="javaScript:void(0)" ><img v-lazy="'http://anets.cn/upload/wallpaper/thumbnail/821564566324107.jpg'" alt="" width="240px" height="135px"></a>
          <span>琉璃雨</span>
        </li>
        <!--        雨滴效果-->
        <li @click="butterfyShow('rain','rain1')">
          <a href="javaScript:void(0)" ><img v-lazy="'http://anets.cn/upload/wallpaper/thumbnail/821564566324107.jpg'" alt="" width="240px" height="135px"></a>
          <span>琉璃雨2</span>
        </li>
        <!--        雨滴效果-->
        <li @click="butterfyShow('rain','rain2')">
          <a href="javaScript:void(0)" ><img v-lazy="'http://anets.cn/upload/wallpaper/thumbnail/821564566324107.jpg'" alt="" width="240px" height="135px"></a>
          <span>琉璃雨3</span>
        </li>

      </ul>
    </div>
</template>

<script>
  import {butterfly,dandelion,star,raining,raining1,rain,rain1,rain2} from '../../static/js/butterfly'
    export default {
        name: "Dynamic",
      data(){
          return {
            dynamicWallpaper:{type:null,img:null}
          }
      },
      created() {

          if(localStorage.getItem("rain")){
            switch (localStorage.getItem("rain")) {
              case "rain":
                $("body").append(rain);
                raining1();
                break;
              case "rain1":
                $("body").append(rain1);
                raining1();
                break;
              case "rain2":
                $("body").append(rain2);
                raining();
                break;
              default:
                break;
            }

          }




          let a=localStorage.getItem("dynamic");
           if(a!=null){
             let wallpaper=JSON.parse(a);
             switch (wallpaper.type) {
               case "butterfly":

                 //引入动态蝴蝶
                 this.loadStyles("butterfly","./static/css/style.css");
                 $("body").append(butterfly);
                 break;


               case 'dandelion':
                 this.loadJs("dandelionJs","./static/js/all.js");
                 $("body").append(dandelion);
                 break;


               case 'star':
                 this.loadStyles("starCss","./static/css/star.css");
                 $("body").append(star);
                 break;


               default:
                 break;
             }


             let wall=localStorage.getItem("bgUrl");
             //改变壁纸
             if(wall==null){
               wall=wallpaper.img;
             }
             this.$store.commit("changeBgUrl",wall);
             localStorage.setItem("wallpaper",'true');
           }





      },
      methods:{
        loadStyles(id,url) {
          var link = document.createElement("link");
          link.type = "text/css";
          link.rel = "stylesheet";
          link.href = url;
          link.id=id;
          link.media="screen";
          document.getElementsByTagName("head")[0].appendChild(link);
        },removeById(id){
         if(document.getElementById(id)!=null){
           document.getElementById(id).remove();
         }
        },
        loadJs(id,url) {
          var link = document.createElement("script");
          link.type = "text/javascript";
          link.id=id;
          link.src = url;
          document.getElementsByTagName("head")[0].appendChild(link);
        },
        butterfyShow(type,img){
          this.dynamicWallpaper.type=type;
          this.dynamicWallpaper.img=img;


         switch (type) {
           case 'butterfly':
             this.removeAll();
             this.loadStyles("butterflyCss","./static/css/style.css");
             $("body").append(butterfly);
             break;

           case 'dandelion':
             this.removeAll();
             this.loadJs("dandelionJs","./static/js/all.js");
             $("body").append(dandelion);
             break;
           case 'star':
             this.removeAll();
             this.loadStyles("starCss","./static/css/star.css");
             $("body").append(star);
             break;
           case 'rain':
             // $("body").append(rain);
             // raining();
             alert("雨滴效果耗内存，如果你电脑配置太低，请不要使用，不然容易造成访问卡顿");
             this.removeAll();
             localStorage.setItem("rain",img);
             location.reload(false);
             return;
             break;
           default:
             break;
         }




          localStorage.setItem("dynamic",JSON.stringify(this.dynamicWallpaper));

          //改变壁纸
          this.$store.commit("changeBgUrl",img);
          localStorage.setItem("wallpaper",'true');
        },
        closeDynamic(){
          //移除蝴蝶
           this.removeAll();

        },
        removeAll(){
          this.removeButterFly();
          this.removeDandelion();
          this.removeStar();
          this.removeRain();
          if(localStorage.getItem("dynamic")){
            localStorage.removeItem("dynamic");
          }
        },
        removeButterFly(){
          //移除蝴蝶
          this.removeById("butterflyCss");
          this.removeById("butterfly");
        },
        removeDandelion(){
          //移除蒲公英
          this.removeById("dandelion");
          this.removeById("dandelionJs");
        },
        removeStar(){
          this.removeById("star");
          this.removeById("starCss");
        },removeRain(){

          this.removeById("rain");
          if(localStorage.getItem("rain")){
            localStorage.removeItem("rain");
            location.reload(false);
          }
        }

      }

    }
</script>

<style scoped>
  ul{
    list-style: none;
    padding: 0px;
    margin: 0px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  ul li{
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-left: 5px;
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
</style>
