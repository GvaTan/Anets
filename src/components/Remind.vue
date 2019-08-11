<template>
    <div>
      <div class="remind" v-if="show">
             <p class="title" style="font-weight: bold;font-size: 20px">A网导航 | 使用指南</p>
        <ul style="padding-left:18px;">
          <li>
            自定义网址 | 自定义壁纸 | 模式设置 | 音乐播放 | 闹钟 <br>
            使用方法：右下键设置>所有设置下
          </li>
          <li>
            可以控制显示自己喜欢的板块<br>
            使用方法：右下键设置>显示设置下
          </li>
          <li>
            自定义搜索引擎：支持百度，谷歌，360，搜狗，必应...<br>
            使用方法：在输入框的左边，有搜索引擎图标，点击就可以设置
          </li>
          <li>
            更多功能：你在使用中会逐渐发现...<br>
            我们也在不断增加新功能，比如音乐播放器，频谱分析，歌词显示，个人博客，笔记...，敬请期待
          </li>
          <li>
            如果你在使用过程中出现了问题，比如上传壁纸总是错误，你可以联系qq:1632414557反馈！！
          </li>
        </ul>
      </div>
      <div class="remind tips" v-if="show">
        <p style="font-weight: bold;font-size: 30px;margin-left:100px">那么，如何把本站设置为主页了？</p>
        <ul style="padding-left:18px;list-style: none">
          <li>
            1. 点击浏览器“设置”按钮，以Chrome浏览器为例：如果不是谷歌浏览器，请访问 <a href="https://www.baidu.com/s?wd=浏览器如何设置主页" target="_blank">浏览器如何设置主页</a><br>
            <img src="http://img01.taobaocdn.com:80/tfscom/TB1ArQFa1bviK0jSZFNXXaApXXa" alt="" width="30%">
          </li>
          <li>
            2. 找到主页设置选项，填入anets.cn保存设置；<br>
            <img src="http://img04.taobaocdn.com:80/tfscom/TB1_g6abFY7gK0jSZKzXXaikpXa" alt="" width="30%">
            <br>
            <img src="http://img01.taobaocdn.com:80/tfscom/TB1dL6fbHY1gK0jSZTEXXXDQVXa" alt="" width="30%">
          </li>
          <li>
            3. 一定要先退出，再重启浏览器，检查打开页是否为某A网导航。其他浏览器设置方法相同，但“设置”按钮位置可能不同。如果有疑问，大家百度一下就知道
            <img src="http://img02.taobaocdn.com:80/tfscom/TB1F4DebG67gK0jSZFHXXa9jVXa" alt="" width="30%">
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Remind",
      props:["show"]
    }
</script>

<style scoped>
.remind{
  width: 75%;
  margin: auto;
  margin-top: 50px;
  color: #777;
  padding: 20px 30px;
  background-color: rgba(255,255,255,0.5);
  border: 1px solid rgba(244,90,141,1);
  opacity: 0.4;
}
.remind ul li{
  margin-top:20px;
}


.tips img:hover{
  width: 150%;
}
.remind:hover{
  opacity: 1;
  background-color: rgba(255,255,255,1);
  border: 1px solid rgba(244,90,141,0);
}

.remind:hover  .title{
  color:rgba(244,90,141,1)
  }
</style>
