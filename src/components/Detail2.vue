<ul id="myTab" class="nav nav-tabs" style="position: relative">

  <li :class="{active:index==controlWeb.activeIndex}" v-for="(item,index) in mywebOrdered" v-if="index<4" @click="activeLi(index)"><a href="javascript:void(0)" data-toggle="tab">{{item.classify}}</a></li>

  <div class="moreWebz" @mouseenter="morewebsShow=true" @mouseleave="morewebsShow=false" v-if="mywebOrdered.length>4">
    <span> More <i class="iconfont icon-jiantou2"></i></span>
    <ul v-if="morewebsShow" >
      <li :class="{active:index==controlWeb.activeIndex}" v-for="(item,index) in mywebOrdered" v-if="index>=4" @click="activeLi(index)"><a href="javascript:void(0)" data-toggle="tab">{{item.classify}}</a></li>
    </ul>
  </div>
</ul>




