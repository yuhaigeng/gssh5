<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',

}
</script>

<style>
@import "./common/rest.css";

[v-cloak] { 
  display: none;
}
.empty{width: 100%;height: 87px;}
.empty1{width: 100%;height: 98px;}
.float_right{float: right;}
.float_left{float: left;}
.clearfloat:after {
    content: ".";
    display: block;
    height: 0;
    overflow: hidden;
    clear: both;
}
</style>
