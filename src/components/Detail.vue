<template>
    <div>
                   <div class="details">
                        <div v-for="(item,index) in commonData">
                          <h4>{{item.classify}}</h4>
                          <ul>
                            <li v-for="(item1,index1) in item.content">
                              <a :href="item1.url" target="_blank">
                                <img :src="item1.img" alt="" width="32px" height="32px">
                                <span>
                                <b>{{item1.name}}</b>
                                <p>{{item1.url}}</p>
                              </span>
                              </a>
<!--                              <i class="iconfont icon-zhuti"></i>-->
                            </li>
                          </ul>
                        </div>
                   </div>
    </div>
</template>

<script>
    export default {
        name: "Detail",
        data(){
          return {

          }
        },
       created() {
          console.log(1111111111);
       },
      computed:{
        commonData:{
         get(){
           return this.$store.state.mywebs;
         }
    }
      }
    }
</script>

<style scoped>
  .details{
    margin-top:50px;
    margin-left: 4%;
    width: 94%;
    height: 800px;
    /*background-color:red;*/
    padding-top: 20px;
    padding-bottom: 20px;
    overflow: auto;

  }
  .details ul{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: 10px;
  }
  .details h4{
    margin-left:50px;
    padding-left: 10px;
    margin-bottom: 10px;
    margin-top: 30px;
    border-left: 5px solid rgba(244,90,141,1);
  }

  .details ul li{
    margin-left: 50px;
    margin-top: 10px;
    width: 309px;
    height: 64px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: rgba( 241,242,249,0);
    box-shadow: 1px 1px 1px rgba(255,255,255,0.1);
    border: 1px solid rgba(238,10,69,0);
    transition:all 0.5s;
  }
  .details ul li:hover{
    /*background-color: rgba( 241,242,249,1);*/
    border: 1px solid rgba(238,10,69,0.7);
    border-radius: 3px;
  }
  .details ul li a{
    font-family: "PingFangSC-Regular","Helvetica Neue","Microsoft Yahei","微软雅黑";
    color:white;
  }
  .details ul li a *{
    float: left;
  }
  .details ul li span{
    width:200px;
    height: 32px;
    overflow: hidden;
    /*background-color: red;*/
    display: flex;
    flex-direction: column;
    margin-left: 20px;
  }

  .details ul li:hover span b{
    color: rgba(238,10,69,1);
  }
  .details ul li span b{
    color:white;
    font-size: 11px;
    font-weight: bold;
  }
  .details ul li:hover span p{
    color: rgba(255,255,255,0.5);
  }
  .details ul li span p{
    font-size: 9px;
    color: silver;
    font-weight: 400;
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
