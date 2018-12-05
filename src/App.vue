<template>
    <div>
		<transition name="router-fade" mode="out-in">
			<keep-alive>
			    <router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
    	</transition>
    	<transition name="router-fade" mode="out-in">
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</transition>
    </div>
</template>

<script>
export default {
  name: 'App',

}
</script>

<style>
@import "./common/rest.css";
@keyframes backOpacity{
   0%   { opacity: 1 }
   25%  { opacity: .5 }
   50%  { opacity: 1 }
   75%  { opacity: .5 }
   100% { opacity: 1 }
}

.animation_opactiy{
    animation: backOpacity 2s ease-in-out infinite;
}
/* .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
}
.router-fade-enter, .router-fade-leave-active {
    opacity: 0;
} */

html{ overflow: auto;}
[v-cloak] {
  display: none;
}
.empty{width: 100%;height: 87px;}
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
    max-width: 750px;
	width: 100%;
	margin: 0 auto;
	height: 87px;
	border-bottom: 1px solid #d8d8d8;
	position: fixed;
	background: #f6f6f6;
	z-index: 3;
	top: 0;
	left: 0;
	right: 0;
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
    line-height: 100px;
    font-size: 30px;
    cursor: pointer;
    background: #FFF;
    margin-bottom: 10px
}
.footer-wrap {
    width: 100%;
    height: 98px;
    background: #FFF;
    position: fixed;
    border-top: 1px solid #bababa;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 6
}
.common-wrap{
    max-width: 750px;
    width: 100%;
    margin: 0 auto;
}
img[lazy="loaded"]{
    opacity: 1;
    transition: opacity .3s ease-in .1s;
}
img[lazy="error"] {
  background: url(assets/img/default_huodong_pic.png) no-repeat center;
}
img[lazy="loading"] {
  background: url(assets/img/default_huodong_pic.png) no-repeat center;
}
.mint-indicator-mask {
    z-index: 990;
    opacity: 0.6;
    background: #000
}
.mint-indicator-wrapper {
    padding: 40px !important
}
.mint-indicator-spin {
    height: 48px;
}
.mint-indicator-text {
    font-size: 24px
}
</style>
