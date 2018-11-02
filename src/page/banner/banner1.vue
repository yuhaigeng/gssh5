<template>
    <div>
        <div id="banner-wrap" class="swiper-container banner1">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,index) in imgList" :key="index">
                    <img :src="item.img" alt="">
                </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
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
                imgList: [
                    {img: "http://img.guoss.cn/gss_img_root/img_ads/974/20181023141954.jpg"},
                    {img: "http://img.guoss.cn/gss_img_root/img_ads/975/20181023142440.jpg"},
                    {img: "http://img.guoss.cn/gss_img_root/img_ads/976/20181023142657.jpg"},{img:"http://img.guoss.cn/gss_img_root/img_ads/977/20181023142753.jpg"},{img:"http://img.guoss.cn/gss_img_root/img_ads/978/20181023142900.jpg"},
                    ],
            }
        },
        mounted() {
            var mySwiper = new Swiper('.banner1', {
                autoplay: true,
                loop: true,
                // delay: 2000,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    autoplayDisableOnInteraction: false
                },
            })
        }
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
    
</style>
