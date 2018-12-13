<template>
    <div class="swiper-container " :style="{height:height}">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in imgList" :key="index"  >
                <!-- 第一张和后一张不使用懒加载 解决 与swiper 冲突 -->
                <img :src="item.adLogo" alt=""  v-if="index==0||index==(imgList.length-1)" :data= "[item.jumpType,item.linkUrl,item.adTime ]"  >
                <img v-lazy="item.adLogo" v-else :data= "[item.jumpType,item.linkUrl,item.adTime ]" >
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
 props:['imgList','height','isLogin'],
 mounted(){
  var mySwiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    autoplay:{
        delay: 5000,
        disableOnInteraction : false,
    },
    on:{
      click:(e) =>{
        let data =  e.target.getAttribute('data')
        this.dataEvent(data)
      }
    },
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },

  })
 },
 methods:{
   dataEvent(arr){
      let data =  arr.split(',')
      this.$emit('listenEvent',data )
   }
  }
}
</script>


<style scoped>

.swiper-slide {
    background: url(../../assets/img/pic_logo@2x.png) center no-repeat;
    background-size: auto
}
.swiper-slide img{
    width: 100%;
    height: 100%
}

</style>
