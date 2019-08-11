<template>
  <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
    <div id="smartTip" v-if="show">
      <p> {{msg}}</p>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "SmartTip",
    props:["show","msg"],
    methods:{

    }
  }
</script>

<style scoped>
  #smartTip{
    color: white;
    position:fixed;
    bottom: 100px;
    padding-left: 20px;
    padding-right: 20px;
    height: 30px;
    line-height: 30px;
    right:0px;
    background-color: rgba(0,0,0,0.8);
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    display: flex;
    flex-direction: row;
  }
  button{
    outline: none;
    border: 1px solid rgba(244,90,141,1);
    background-color: transparent;
    transition: all 0.2s;
    height: 25px;
    line-height: 25px;
    margin-top: 1px;
    border-radius: 3px;
    margin-right: 20px;
  }
  button:hover{
    background-color: rgba(244,90,141,1);
  }
</style>
