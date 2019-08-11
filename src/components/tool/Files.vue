<template>
    <div id="files" @mouseleave="detail.showDetail=false">
        <div class="classifyA">
           <ul>
             <li v-for="(item,index) in webs" @mouseenter.self="showcContent(index,item.isNull)" @click="editDir(index)" :key="index">
               <i class="iconfont icon-wenjianjia1"></i>
               <span v-if="!item.isEdit">{{item.classify }}</span>
               <input  class="edit" @blur="saveDir(index)" v-if="item.isEdit" type="text"  v-model="item.classify" autofocus @keydown.13="toBlur($event)">
               <i v-if="!item.isNull" class="iconfont icon-moreinfo-copy tubiao" ></i>
             </li>
             <div @mouseenter="detail.showDetail=false" @click="addDir()" style="text-align: center;color: black;margin-top: 5px;cursor: default"><i class="iconfont icon-wangpanxinjianwenjianjia-copy"></i>&nbsp;&nbsp;&nbsp;<span>新建</span></div>
             <div  style="text-align: center;color: black;margin-top: 5px;cursor: default"><span><span style="color: red;font-weight: bold">单击文字重命名</span><br>
               注意：最后一个文件夹不能删除，但你可以把它命名为空的文字，这样就不会显示<br>
               </span></div>
           </ul>
        </div>
      <div  :style="top" class="content classifyB" v-if="detail.showDetail">

        <ul>
          <li v-for="(item,index) in webs[detail.index].content"><a :href="item.url" target="_blank"> <img width="18px" :src="item.img" alt=""> {{item.name}}</a><i @click="update(detail.index,index)" class="iconfont icon-xiugai"></i><i @click="deleteWeb(detail.index,index)" class="iconfont icon-delete"></i></li>
          <li @click="addWeb(detail.index)" style="text-align: center"><i class="iconfont icon-xinjian"></i>&nbsp;&nbsp;&nbsp;<span>新增</span></li>
          <li @click="deleteDir(detail.index)" style="text-align: center"><i class="iconfont icon-wenjianjiashanchu"></i>&nbsp;&nbsp;&nbsp;<span>删除文件夹</span></li>
        </ul>

      </div>

      <Dialog :show="dialog.show" @button="closeDialog()" @close="initVal()" :dialogTitle="dialog.title" :dialogContent="dialog.content" :dialogBtn="dialog.btn"></Dialog>
      <Tips :message="tips.message" :show="tips.show"></Tips>
    </div>
</template>

<script>
  import  Dialog from './Dialog';
  import  Tips from './Tips'
  import  {saveUser} from "../../api/userapi";

  export default {
      name: "Files",
      props:['mywebs'],
      components:{
          Dialog,Tips
      },
        data(){
          return {
            websTemp:[],
           timer:true,
            detail:{showDetail:false,height:0,index:0},//这是二级目录网址的控制变量
            dialog:{show:false,title:'',content:'',btn:''},//这是对话框的属性
            webTemp:{name:'',url:'',img:'../../static/image/common/web.png',click:1},//记录用户的输入
            webTempStr:'',//这是为了冻结webTemp
            addIndex:null,//记录当前增加网址的webs索引，以便正确赋值
            updateWeb:{fatherIndex:null,index:null},//记录当前修改网址的父索引和子索引
            deleteIndex:null,//记录删除文件夹的索引
            tips:{message:'',show:''}
          }
        },
      computed:{
          webs:{
            get(){
              return this.$store.state.mywebs;
            }
          },
          top:{
            get(){
              return 'top:'+this.detail.height+'px'
            }
          }
      },
      watch:{
        webs:{
          handler(newval,oldval){
            //存储到数据库中
            if(this.$store.state.user!=null){
              let b=this.$store.state.user;
              b.web=this.webs;
              this.$store.commit("changeUser",b);
              //存储数据到web中
             if(this.timer){
               this.timer=false;
               this.saveWebz(b);
               let c=setTimeout(()=>{
                 this.timer=true;
                 clearTimeout(c);
               },10000)
             }
            }

            this.websTemp=this.webs;
          },
          immediate:true,
          deep:true
        }
      },
      created(){

      },
      methods:{
        async saveWebz(b){
        let {data:c}= await saveUser(b);
        this.tips.message="您的收藏已同步！";
        this.tips.show=true;
        let a=setTimeout(()=>{this.tips.show=false;clearTimeout(a)},1500);
        },
        toBlur(event){
          event.target.blur();
        },
        initVal(){

          this.deleteIndex=null;
          this.addIndex=null;
          this.updateWeb.fatherIndex=null;
          this.updateWeb.index=null;
          this.dialog.show=false;
        },
        addDir(){
          this.websTemp.push({classify:"文件名",content:[],isNull:true,isEdit:true});
          this.$store.commit("changeMywebs",this.websTemp);
          // this.$store.state.mywebs.push({classify:"文件名",content:[],isNull:true,isEdit:true});
          let b=JSON.stringify(this.$store.state.mywebs);
          localStorage.setItem("mywebsLocal",b);
        },
        saveDir(index){//编辑离焦后保存
          this.websTemp[index].isEdit=false;
          this.$store.commit("changeMywebs",this.websTemp);
          // this.$store.state.mywebs[index].isEdit=false;
          let b=JSON.stringify(this.$store.state.mywebs);
          localStorage.setItem("mywebsLocal",b);
        },
        editDir(indexs){
          this.websTemp[indexs].isEdit=true;
          this.$store.commit("changeMywebs",this.websTemp);
          // this.$store.state.mywebs[indexs].isEdit=true;
          setTimeout(()=>{
            $(".edit").focus();
          },500);
          this.websTemp.forEach((item,index)=>{
            if(index!=indexs){
              item.isEdit=false;
            }
          });
          this.$store.commit("changeMywebs",this.websTemp);

          let b=JSON.stringify(this.$store.state.mywebs);
          localStorage.setItem("mywebsLocal",b);
        },
        deleteDir(index){//删除文件夹
          this.dialog.title="危险操作";
          this.dialog.content="删除文件夹后不可恢复，且其下的网址都会被删除，是否确认进行？";
          this.dialog.btn="我了解";
          this.dialog.show=true;
          this.deleteIndex=index;

        },
        addWeb(index){//新增网址
          //显示对话框
          // alert(index);
          this.dialog.title="新增网址";
          this.dialog.content="<div style='padding-left: 20px;padding-right: 20px'>\n" +
            "         图标：<br><input disabled type='text' class='form-control' value='默认'>\n" +
            "         站名：<input id='zhanming' type='text'  class='form-control' placeholder='输入网站名'>\n" +
            "         网址： <input id='wangzhi' type='text'  class='form-control' placeholder='注意：必须http://或者https://开头' value='http://'>\n" +
            "       <span class='text-danger'>注意：网址必须以http://或者https://开头</span>></div>";
          this.dialog.btn="执行";
          this.dialog.show=true;
          this.addIndex=index;
    },
        closeDialog(){

          this.webTemp.url=$("#wangzhi").val();
          this.webTemp.name=$("#zhanming").val();

          let index=this.addIndex;
          if(index!=null){//保存网址
            //将临时数据转换成字符串来冻结防止改变
            this.webTempStr=JSON.stringify(this.webTemp);
            this.websTemp[index].content.push(JSON.parse(this.webTempStr));
            this.$store.commit("changeMywebs",this.websTemp);
            // this.$store.state.mywebs[index].content.push(this.webTemp);
            this.addIndex=null;
          }

          let updateFatherIndex=this.updateWeb.fatherIndex;
          let updateIndex=this.updateWeb.index;
          if(updateFatherIndex!=null&&updateIndex!=null){//修改网址
            this.webTempStr=JSON.stringify(this.webTemp);
            this.websTemp[updateFatherIndex].content[updateIndex].name=JSON.parse(this.webTempStr).name;
            this.websTemp[updateFatherIndex].content[updateIndex].url=JSON.parse(this.webTempStr).url;

            this.$store.commit("changeMywebs",this.websTemp);
            // this.webs[updateFatherIndex].content[updateIndex].img=this.webTemp.img;
            this.updateWeb.fatherIndex=null;
            this.updateWeb.index=null;
          }


          let deleteIndex=this.deleteIndex;

          if(deleteIndex!=null){//删除文件夹
            //判断是否是最后一个，是就弹出
            if(deleteIndex==this.websTemp.length-1){
              this.dialog.show=false;

              this.deleteIndex=null;
              this.dialog.show=false;
              this.tips.message="注意:最后一个文件夹不能删除，但可以重新命名，你可以把它命名为空文字";
              this.tips.show=true;
              let a=setTimeout(()=>{this.tips.show=false;clearTimeout(a)},4000);
            }else {
              this.websTemp=this.websTemp.filter((item,index)=>{
                if(deleteIndex!=index){
                  return true;
                }
              });

              this.$store.commit("changeMywebs",this.websTemp);
              this.deleteIndex=null;
              this.dialog.show=false;
              this.tips.message="操作成功，部分效果需要刷新后才能生效";
              this.tips.show=true;
              let a=setTimeout(()=>{this.tips.show=false;clearTimeout(a)},2000)
            }



          }
          let b=JSON.stringify(this.$store.state.mywebs);
          localStorage.setItem("mywebsLocal",b);
          this.dialog.show=false;
        },
        update(fatherindex,index){//修改网址
          this.dialog.title="修改网址";
          let img=this.websTemp[fatherindex].content[index].img;
          let name=this.websTemp[fatherindex].content[index].name;
          let url=this.websTemp[fatherindex].content[index].url;



          this.$store.commit("changeMywebs",this.websTemp);
          this.dialog.content="<div style='padding-left: 20px;padding-right: 20px'>\n" +
            "         图标：<br><input disabled type='text' class='form-control' value='默认(当前不可修改，后续开放)'>\n" +
            "         站名：<input id='zhanming' type='text'  class='form-control' placeholder='输入网站名' value='"+name+"'>\n" +
            "         网址： <input id='wangzhi' type='text'  class='form-control' placeholder='注意：必须http://或者https://开头'  value='"+url+"'>\n" +
            "       <span class='text-danger'>注意：网址必须以http://或者https://开头</span>></div>";
          this.dialog.btn="执行";
          this.dialog.show=true;
          this.updateWeb.fatherIndex=fatherindex;
          this.updateWeb.index=index;
        },
        deleteWeb(fatherindex,index){//删除这个网址
          // alert(index);
          this.websTemp[fatherindex].content.splice(index,1);

          this.$store.commit("changeMywebs",this.websTemp);
          let b=JSON.stringify(this.$store.state.mywebs);
          localStorage.setItem("mywebsLocal",b);
        },
        showcContent(index,isNull){

            this.detail.height=0;
            this.detail.showDetail=true;
            this.detail.index=index;

    }
      },
      filters:{
        myreverse:function(val){
          return val.reverse();
        }
      }
    }
</script>

<style scoped>
#files{
  /*z-index: 999;*/
  position: relative;
  width:150px;
  margin-left: 0px;
  background-color: white;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.4);
}
li{
  cursor: default;
}

  .classifyA{
    /*width: ;*/
  }
  .classifyA i{
    color: rgba(244,90,141,1);
    font-weight: bold;
  }
.classifyA  ul{
  list-style: none;
  padding: 5px 0px 0px 0px;
  height:700px;
  overflow:auto;

}
.classifyA ul li{
  padding-left: 10px;
  width:100%;
  height: 30px;
  line-height: 30px;
  /*overflow: hidden;*/
  transition: all 0.3s;
  position: relative;
  /*background-color: red;*/
}

.classifyA ul li input{
  display: inline-block;
  width: 100px;
  height: 30px;
}
.classifyB  ul{
  width:180px;
  height:700px;
  overflow:auto;
  list-style: none;
  padding: 5px 0px 0px 0px;

}

.classifyB ul li{
  padding-left: 10px;
  width:100%;
  height: 30px;
  line-height: 30px;
  /*overflow: hidden;*/
  transition: all 0.3s;
  position: relative;
  /*background-color: red;*/
}
.classifyB ul li a{
  display: inline-block;
  width: 100px;
}

.content{
  position: absolute;
  padding-top: 5px;
  left:150px;
  width: 150px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 1px 1px 1px rgba(0,0,0,0.4);
}
.classifyA ul li span {
  margin-left: 15px;
}
.classifyA ul li:hover{
  background-color: rgba(0,0,0,0.1);
}

  .tubiao{
    margin-top: 2px;
    position: absolute;
    right: 1px;
  }
</style>
