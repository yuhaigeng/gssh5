<template>
 <div class="">
<div class="gonggao-wrap sprite icon_voice">
            <div class="gonggao">
                <div class="swiper-container banner2">
                    <ul class="swiper-wrapper">
                        <li class="swiper-slide" v-for="(item,index) in gonggaoList" :key="index" v-text="item.content">
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
 data() {
 return {
     gonggaoList:[{
                    content:'这是公告一'
                },{
                    content:'这是公告二'
                }]
 }
 },
 mounted(){
     var swiper = new Swiper('.banner2', {
                autoplay: true,
                direction: 'vertical',
                loop: true,
                delay: 1000
            })
 }
}
</script>

<style scoped>
.sprite {
        background-image: url(../../assets/img/sprite.png);
        background-repeat: no-repeat;
    }
    .icon_voice {
        background-position: -1084px -444px;
    }
    .gonggao-wrap {
        width: 100%;
        height: 50px;
        overflow: hidden;
    }
    .gonggao li {
        text-indent: 70px;
        line-height: 50px;
        font-size: 26px;
        color: #f66b0c;
    }
</style>
