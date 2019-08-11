<template>
    <div id="power">
      <img src="../../../static/image/logo/logo3.png" alt="" class="logo" width="200px">
      <div class="logos"></div>
      <div class="content">
<!--        <p></p>-->
        <table >
           <tbody>

           <tr class="myactive">
             <td>原作</td>
             <td>Anets（A网）</td>
           </tr>
           <tr class="myactive">
             <td>本网站名称</td>
             <td>A网导航（百度搜索排名前十，若忘记网址，可以百度）</td>
           </tr>
           <tr>
             <td>网站主机</td>
             <td>Anets.cn（永久，推荐使用）|Anets.top（临时）| hellnets.com（目前可以访问）</td>
           </tr>
           <tr>
             <td>现阶段维护</td>
             <td>GvaTan</td>
           </tr>

           <tr class="myactive">
             <td>监督</td>
             <td> Selina   &nbsp; &nbsp;Lx</td>
           </tr>
           <tr>
             <td>作画</td>
             <td>EvaFoo</td>
           </tr>
           <tr class="myactive">
             <td>出演</td>
             <td>TCH   &nbsp; &nbsp;SYX  &nbsp; &nbsp;   LYR &nbsp; &nbsp;   XSY &nbsp;    FSY  &nbsp; &nbsp;   CSF  &nbsp; &nbsp;   HGW</td>
           </tr>
           <tr>
             <td>鸣谢</td>
             <td>A网 &nbsp; &nbsp;&nbsp; 帝网组织</td>
           </tr>
           </tbody>
        </table>
      </div>
      <p style="margin-left:250px;margin-top:50px">COPYRIGHT © 2018-2025, POWERED BY ANETS </p>
    </div>
</template>

<script>
    export default {
        name: "Power"
    }
</script>

<style scoped>

  .logo{
    margin-left: 300px;
  }
.logos{
   /*background-color: red;*/
  width: 250px;
  height: 230px;
  position: absolute;
  top:0px;
  left:300px;
}

#power{
  width:800px;
}
table{
  width: 100%;
}

  table tr{

    height: 51px;
    line-height: 51px;
    border-top: 1px solid white;
  }

table tr td{
  height: 51px;
  line-height: 51px;
  text-align: left;
}
table tr td:first-child{
  width: 298px;
}
  table tr:last-child{
    border-bottom: 1px solid white;
  }
</style>
