<template>
    <div class="mask" id="masks"></div>
</template>

<script>
    export default {
        name: "Masks"
    }
</script>

<style scoped>
  .mask{
    transition: all 0.5s;
    position: fixed;
    bottom: 0px;
    right:-600px;
    width:900px;
    height: 40px;
    z-index: -2;
     /*background-color: red;*/
    background-image: -webkit-linear-gradient(left, rgba(0,0, 0, 0) 0%, rgba(0,0, 0, 1) 100%);
    background-image: -moz-linear-gradient(left, rgba(0,0, 0, 0) 0%, rgba(0,0, 0, 1) 100%);
    background-image: -o-linear-gradient(left, rgba(0,0, 0, 0) 0%, rgba(0,0, 0, 1) 100%);
    background-image: linear-gradient(left, rgba(0,0, 0, 0) 0%, rgba(0,0, 0, 1) 100%);



    /*transition: all 0.5s;*/
    /*position: fixed;*/
    /*bottom: -250px;*/
    /*right:0px;*/
    /*width:100%;*/
    /*height: 500px;*/
    /*z-index: -999;*/
    /* !*background-color: red;*!*/
    /*background-image: -webkit-linear-gradient(top, rgba(0,0, 0, 0) 0%, rgba(0,0, 0, 1) 100%);*/
    /*background-image: -moz-linear-gradient(top, rgba(0,0, 0, 0) 0%, rgba(0,0, 0, 1) 100%);*/
    /*background-image: -o-linear-gradient(top, rgba(0,0, 0, 0) 0%, rgba(0,0, 0, 1) 100%);*/
    /*background-image: linear-gradient(top, rgba(0,0, 0, 0) 0%, rgba(0,0, 0, 1) 100%);*/
  }
</style>
