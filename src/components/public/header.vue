<template>
  <!-- home 头部  带图片的头部-->
  <div class="header-wrap common-wrap" :class="type.type == 'my' && 'my-header'">
    <!-- 左  -->
    <div class="header_left"  >
        <!-- home -->
        <slot name="homeleft"></slot>
        <!-- 返回 -->
        <div class="common_back sprite arrow_left_orange" :class="{'arrow_left_b':(type.type == 'common' && type.leftColor=='white')}" v-if="type.type == 'common'" v-text="type.left ? type.left :'' " @click="goBack"></div>
          <!-- my -->
        <slot name="myLeft"></slot>
        <!-- 跳转 -->
        <div class="common_back sprite arrow_left_orange" v-if="type.type == 'jump'" v-text="type.left ? type.left :'' " @click="jumpRouter"></div>
    </div>
    <!-- 中 -->
    <h2 class="header_tit">
        <!-- home  -->
        <slot name="homeLogo"></slot>
        <!-- 标题 -->
        <div v-text="type.title"></div>
    </h2>
    <!-- 右 -->
    <div class="header_right">
        <!-- 搜索 -->
        <router-link to="/search" v-if="type.type == 'home'" tag="div" class="common_right sprite icon_search_a"></router-link>
        <!-- 跳转路由 -->
        <router-link :to="type.jumpAfter" tag="div" v-if="type.jumpAfter" v-text="type.right"></router-link>
        <!-- 弹框 -->
        <slot name="commonAlert"></slot>
        <!-- my -->
        <slot name="myRight"></slot>
        <!-- 确认按钮 -->
        <slot name="sure"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app-header',
    props: ["type"],
    data() {
        return {
            logined:true,
        }
    },
    methods:{
        goBack:function() {
          this.$router.go(-1)
        },
        jumpRouter:function(){
            this.$router.push({path:this.type.jumpBefore , query:{type:this.type.num}})
        }
    }
  }
</script>

<style scoped >
@import "../../common/sprite.css";

.header_left,.header_right{width: 150px;height: 87px;position: absolute;font-size: 26px;line-height: 87px;z-index: 30;color: #f66b0c;top: 0;}
.header_tit{width: 100%;height: 87px;font-size: 36px;line-height: 87px;position: relative;text-align: center;}
.header_right{right: 0;  text-align: right;padding-right: 20px;}
/* 新加样式 */

.common_back{
  /* background-image: url(../../assets/img/sprite.png);
  background-position: 21px -352px;
  background-repeat: no-repeat; */
  height: 87px;
  text-indent: 55px;
  z-index: 100;
}
.common_right{
  height: 87px;
}
.my-header{
  background:none;
  border:none;
  color: #fff;
}
</style>
