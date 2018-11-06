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
html{ overflow: auto;}
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
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.hidden{display: none;}
.show{display: block;};

.footer-wrap,.header-wrap,.main-wrap {
    margin: 0 auto;
    max-width: 750px
}
.header-wrap {
    width: 100%;
    height: 87px;
    border-bottom: 1px solid #d8d8d8;
    position: fixed;
    background: #f6f6f6;
    z-index: 3;
    top: 0
}
.header_left,.header_right {
    width: 150px;
    height: 87px;
    position: absolute;
    font-size: 26px;
    line-height: 87px;
    z-index: 30;
    color: #f66b0c;
    top: 0
}

.header_tit {
    width: 100%;
    height: 87px;
    font-size: 36px;
    line-height: 87px;
    position: relative;
    text-align: center
}
.header_right {
    right: 0
}
.foot22{
  font-size: 22px;
}

.lodemore {
    width: 100%;
    height: 100px;
    text-align: center;
    line-height: 80px;
    font-size: 30px;
    cursor: pointer;
    background: #FFF;
    margin-bottom: 10px
}
</style>
