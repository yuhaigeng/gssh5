<template>
    <div class="swiper-container " :style="{height:bannerHeight}">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in imgList" :key="index"  @click="jumpRouter(item.jumpType, item.linkUrl, item.adTime)">
                <!-- 第一张喝醉后一张不使用懒加载 解决 与swiper 冲突 -->
                <img :src="item.adLogo" alt=""  v-if="index==0||index==(imgList.length-1)">
                <img v-lazy="item.adLogo" v-else>
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
    </div>
</template>
<script>
import Swiper from 'swiper'
import '@/common/swiper.min.css'
import { getSystem , getMessage , getIsLogin , getTokenId , getUserData, getSecretKey } from "../../common/common.js";
export default {
 data() {
    return {
      isLogin:getIsLogin(),
    }
 },
 props:['imgList'],
 mounted(){
  var mySwiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    autoplay:{
        delay: 5000,
        disableOnInteraction : false,
    },
    loop: true,

    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
  })
 },
 computed:{
   bannerHeight(){
     return '280px'
   }
 },
 methods:{
    jumpRouter:function(type,code,tit){
      if(this.isLogin){
         code =  code.trim()
        if (type) {
          if (type == 1) {
            let codeArr = code.split("&");
            return this.$router.push({path:'more',query:{typeCode:codeArr[1]}})
          }else if (type == 2) {
            return this.$router.push({path:'detail/'+code})
          }else if (type == 3) {
            return this.$router.push({path:'details',query:{typeCode:code,title:tit}})
          }else if(type == 4){
            return this.$router.push({path:'onlineCoupon'})
          }
        }
        return null;
      }else{
        return this.$router.push({path:'login'})
      }
    }
  }
}
</script>


<style scoped>

.swiper-slide {
    background: url(../../../static/img/pic_logo@2x.png) center no-repeat;
    background-size: auto
}
.swiper-slide img{
    width: 100%;
    height: 100%
}

</style>
