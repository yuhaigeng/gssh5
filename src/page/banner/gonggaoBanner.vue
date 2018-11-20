<template>
    <div class="gonggao" :class="{'scoreActive':type=='scoreActive'}">
        <ul class="swiper-wrapper">
            <li class="swiper-slide" v-for="(item,index) in imgList" :key="index" v-text="item.noticeTitle" ></li>
        </ul>
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
    props:['imgList','type'],
    mounted(){
        const _this = this;
        var mySwiper = new Swiper('.gonggao', {
            direction: 'vertical',
            autoplay:{
                delay: 5000,
            },
            loop: true,
            height:'50',
            on:{
                click:function () {
                    const index = this.realIndex;
                    _this.getIndex(index)
                }
            }
        })
    },
    methods:{
        getIndex:function(index){
            this.$emit('listenIndex',index)
        }
    }
}
</script>

</script>

<style scoped>
.gonggao li{text-indent: 70px;line-height: 50px;font-size: 26px;color: #f66b0c;}
.swiper-slide img{
    width: 100%;
    height: 100%
}
.scoreActive{height: 60px;}
.scoreActive li{color: #FFF;font-size: 28px;line-height: 64px;}
</style>
