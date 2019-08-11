<template>

    <div id="wallpaper">
      <h4>上传壁纸</h4>
      <a href="/user/me" target="_blank"><button>去上传</button></a>

      <h4>我的壁纸</h4>
        <a href="/user/me" v-if="noUser" target="_blank"><button>未登陆，立即登陆</button></a>
      <b v-if="tipShow1" style="color: rgba(244,90,141,1)">正在加载数据，请稍等......</b>
      <ul v-if="!noUser">
        <li v-for="(item,index) in  myWallpapers" @click="changeBg('http://anets.cn/upload/wallpaper/dist/'+item.shop_img)"><a href="javaScript:void(0)" ><img v-lazy="'/upload/wallpaper/thumbnail/'+item.shop_img" width="240px" height="135px"></a></li>
      </ul>

      <h4>动态壁纸</h4>
      <Dynamic></Dynamic>


      <h4>壁纸中心</h4>
       <b v-if="tipShow" style="color: rgba(244,90,141,1)">正在加载数据，请稍等......</b>
      <ul>
        <li v-for="(item,index) in  publicWallpaper" @click="changeBg('http://anets.cn/upload/wallpaper/dist/'+item.shop_img)"><a href="javaScript:void(0)" ><img v-lazy="'/upload/wallpaper/thumbnail/'+item.shop_img" width="240px" height="135px"></a></li>
      </ul>

    </div>


</template>

<script>
  import {getShops,getPrivateShops} from "../../api/userapi";
  import Dynamic from '../Dynamic'
  export default {
        name: "Wallpaper",
    components:{Dynamic},
      data(){
          return {
            myWallpapers:[],
            publicWallpaper:null,
            noUser:true,
            tipShow:false,
            tipShow1:false
          }
      },
      computed:{
          userz:{
            get(){
              return this.$store.state.user;
            }
          }
      },
      created(){
          this.initData();
      },
    watch:{
      userz:{
        handler(newval,oldval){
          if(newval!=null){

            this.noUser=false;
            //查询私有的商品
            this.queryPrivateShops();
          }else{
            this.noUser=true;
          }
        },deep:true,immediate:true
      }
    },
      methods:{
        async queryPrivateShops(){//查询私有商品
          this.tipShow1=true;
          let {data:shops}=await getPrivateShops();
          this.myWallpapers=shops;
          this.tipShow1=false;
         },
        changeBg(src){
          // this.$store.state.bgUrl=src;
          localStorage.setItem("wallpaper",'true');
          this.$store.commit("changeBgUrl",src);
          // alert(src);
          // console.log(this.$store.state.bgUrl);
          if(localStorage.getItem("rain")){
            localStorage.removeItem("rain");
            location.reload(false);
          }
        },
        async initData(){
          //获得公共壁纸
          this.tipShow=true;
        let {data:shops}=await getShops("","","","壁纸");
        this.publicWallpaper=shops;
          this.tipShow=false;
        console.log(this.publicWallpaper);
        }
      }
    }
</script>

<style scoped>
  h4{
    padding-left: 10px;
    height: 25px;
    line-height: 25px;
    border-left: 5px solid white;
  }
button{
    outline: none;
    border: 1px solid rgba(244,90,141,1);
    background-color: transparent;
    transition: all 0.2s;
    border-radius: 3px;
    padding: 3px 10px;
  }
   button:hover{
    background-color: rgba(244,90,141,1);
  }

a{
  color:black;
}
a:link{
  color: white;
}
a:visited{
  color:white;
}
#wallpaper{
  width:1000px;
  /*background-color: red;*/
  height: 800px;
  overflow: auto;
}

#wallpaper ul{
  list-style: none;
  padding-left: 0px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
#wallpaper ul li{
  width: 238px;
  height: 135px;
  /*float: left;*/
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  filter: contrast(100%);
  transition: all 0.5s;
}

#wallpaper ul li:hover{
  /*filter: drop-shadow(1px 1px 1px rgba(255,255,255,0.2));*/
  -webkit-filter: saturate(200%); /* Chrome, Safari, Opera */
  filter: contrast(120%)
}
#wallpaper::-webkit-scrollbar {

  width:5px;

  height:5px;

}
#wallpaper::-webkit-scrollbar-button    {
  height: 5px;
  background:rgba(239,6,66,0.5);

}

#wallpaper::-webkit-scrollbar-track     {

  background:rgba(0,0,0,0.8);


}

#wallpaper::-webkit-scrollbar-track-piece {
  background:rgba(0,0,0,0.1);


}

#wallpaper::-webkit-scrollbar-thumb{

  background:rgba(239,6,66,0.5);
  border-radius:4px;


}

#wallpaper::-webkit-scrollbar-corner {

  background:white;


}

#wallpaper::-webkit-scrollbar-resizer  {

  background:white;


}

</style>
