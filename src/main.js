// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery';
import  '../node_modules/bootstrap/dist/css/bootstrap.css';
import animate from 'animate.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import Vuex from 'vuex'
import logger from 'vuex/dist/logger'
import VueLazyLoad from 'vue-lazyload'
Vue.use(Vuex);

//使用图片懒加载
Vue.use(VueLazyLoad,{
  preLoad:1.3,
  error:'http://img03.taobaocdn.com:80/tfscom/TB1I_UadliE3KVjSZFMXXbQhVXa',
  loading:'http://img03.taobaocdn.com:80/tfscom/TB1LFUbdgKG3KVjSZFLXXaMvXXa',
  attempt:1
});
//状态盒
const state={
  bgUrl:"https://up.enterdesk.com/edpic_source/8c/f0/f0/8cf0f01bf0409b28ae76597bdace4cf6.jpg",
  dataHistory:null,
  mywebs:null,
  mywebsSort:null,
  user:null,
  customShow:{},
  alarm:[

    {name:"日内闹钟",discription:"日内闹钟指的是，在每一天时，根据你设置的时分响铃<br>场景:上课？休息？有其他事情？看网页怕忘记时间？在这里可以设置。<br>栗子：" +
        "比如，我在电脑办公处理一些事情，有时候错过了吃饭的时间，你可以提醒自己",
      hour:0,minute:0,scope:["周一","周二","周三","周四","周五","周六","周日"],music:["default"],task:"我有很重要的事情要去做"
    },

    {name:"时内闹钟",discription:"时内闹钟指的是，在每一个小时，都会根据你设置的分而闹铃<br>场景:适合于外汇，股票，区块链投资者，他们需要精确的入场时间，当周期在1小时之内时<br>栗子：" +
      "比如，你设置了29分响铃，那么每个小时的29分都会响铃，以便提示你该听下浏览网页的工作，去看盘了！！",
      hour:0,minute:0,scope:["周一","周二","周三","周四","周五"],music:["default"],task:"我有很重要的事情要去做"
  }
  ],
  myAlarm:[],
  uiMode:{
    static:false,
    simple:false
  },
  showSet:true

};
//突变
const mutations={
   changeBgUrl(state,bg){//state是自动放入的，默认指的就是当前的state
      state.bgUrl=bg;
   },
  changeCustomeShow(state,bgs){//state是自动放入的，默认指的就是当前的state
    state.customShow=bgs;
  },
  changeShowSet(state,flag){
    state.showSet=flag;
  },
  changeMywebs(state,web){//state是自动放入的，默认指的就是当前的state
    state.mywebs=web;
  },
  changeMywebsSort(state,web){//state是自动放入的，默认指的就是当前的state
    state.mywebsSort=web;
  },
  changeUser(state,user){
     state.user=user;
  },
  changeMyAlarm(state,myalarm){
     state.myAlarm=myalarm;
  },
  changeUiMode(state,mode){
    state.uiMode=mode;
  }
};

let store=new Vuex.Store({
  state:state,
  strict:true,//只能通过mutation更改状态
  mutations:mutations,
  plugins:[logger()]
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({

  el: '#app',
  router,
  components: { App},
  template: '<App/>',
  store:store
})
