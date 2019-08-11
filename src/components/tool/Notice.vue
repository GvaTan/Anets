<template>
  <transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
    <div id="notic" v-if="show">
            <h2>{{title}}</h2>
      <p v-html="message"></p>
      <button class="btn" @click="triggerFather()">我了解</button>
    </div>
    </transition>
</template>

<script>
    export default {
        name: "Notice",
      props:['show','title','message'],
      methods:{
        triggerFather(){
          this.$emit("button");
        }
      }
    }
</script>

<style scoped>
#notic{
  position: fixed;
  width: 60%;
  left:20%;
  height: 300px;
  bottom: -40px;
  border-radius: 40px;
  background-color: white;
  box-shadow: 0px 0px 15px rgba(0,0,0,0.8);
  padding-left: 60px;
}
.btn{
  position: absolute;
  margin-top: 10px;
  left:50%;
  transform: translate(-50%,-50%);
  width: 200px;
  height: 40px;
  background-color: transparent;
  border: 2px solid rgba(244,90,141,1);
  color: rgba(244,90,141,1);
  outline: none;
  transition: all 0.5s;
}

.btn:hover{
  background-color: rgba(244,90,141,1);
  color: white;
}
</style>
