<template>
    <div>
        <div id="banner-wrap" class="swiper-container banner1">
            <div class="swiper-wrapper">
                <!-- <div class="swiper-slide" v-for="(item,index) in imgList" :style="{backgroundImage: 'url(' + item.img + ')'}" :key="index"></div> -->
                <div class="swiper-slide">
                    <img src="../../assets/img/fruit_banner.png" alt="">
                </div>
                <div class="swiper-slide">
                    <img src="../../assets/img/fruit_banner.png" alt="">
                </div>
                <div class="swiper-slide">
                    <img src="../../assets/img/fruit_banner.png" alt="">
                </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
        </div>
        <div class="gonggao-wrap sprite icon_voice">
            <div class="gonggao">
                <div class="swiper-container banner2">
                    <ul class="swiper-wrapper">
                        <li class="swiper-slide">
                            <p>这是公告一</p>
                        </li>
                        <li class="swiper-slide">
                            <p>这是公告二</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Swiper from 'swiper'
    
    import '@/common/swiper-3.3.1.min.css'
    
    export default {
    
        name: 'banner',
    
        data() {
    
            return {
    
                imgList: [{
    
                    img: "../../assets/img/fruit_banner.png",
    
                    img: "../../assets/img/fruit_banner.png",
    
                    img: "../../assets/img/fruit_banner.png"
    
                }, ]
    
            }
    
        },
    
        mounted() {
    
            var mySwiper = new Swiper('.banner1', {
    
                autoplay: true,
    
                loop: true,
    
                delay: 2000,
    
                pagination: {
    
                    el: '.swiper-pagination',
    
                    clickable: true,
    
                    autoplayDisableOnInteraction: false
    
                },
    
            })
    
            var swiper = new Swiper('.banner2', {
    
                autoplay: true,
    
                direction: 'vertical',
    
                loop: true,
    
                delay: 1000,
    
            })
    
        },
    
    }
</script>

<style scoped>
    #banner-wrap {
    
        width: 100%;
    
        height: 280px;
    
        overflow: hidden;
    
        position: relative;
    
    }
    
    
    
    .swiper-wrapper,
    
    .swiper-slide {
    
        width: 100%;
    
        height: 100%;
    
    }
    
    
    
    .swiper-slide img {
    
        width: 100%;
    
        height: 100%;
    
    }
    
    
    
    .sprite {
    
        background-image: url(../../assets/img/sprite.png);
    
        background-repeat: no-repeat;
    
    }
    
    
    
    .gonggao-wrap {
    
        width: 100%;
    
        height: 50px;
    
        overflow: hidden;
    
    }
    
    
    
    .icon_voice {
    
        background-position: -1084px -444px;
    
    }
    
    
    
    .banner2 {
    
        float: left;
    
    }
    
    
    
    .gonggao li {
    
        text-indent: 70px;
    
        line-height: 50px;
    
        font-size: 26px;
    
        color: #f66b0c;
    
    }
</style>
