<template>
  <div id="app">

     <router-view name="home"/>
    <router-view name="history"/>
    <router-view name="clock"/>
    <router-view name="query"/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
  width:1020px;
  height:100px;

  margin:auto;
  /*position: relative;*/

}
</style>
