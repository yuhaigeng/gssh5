<template>
    <div class="swiper-container common-wrap" :style="{height:height}">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in imgList" :key="index">
                <img :src="item" alt="">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
    </div>
</template>
<script>
import Swiper from 'swiper'
import '@/common/swiper.min.css'
export default {

 data() {
    return {

    }
 },
 props:['imgList','height'],
 mounted(){

     var mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        autoplay:{
            delay: 5000,
        },
        loop: true,

        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
    })
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
