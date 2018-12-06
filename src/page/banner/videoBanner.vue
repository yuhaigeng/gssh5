<template>
    <div class="swiper-container common-wrap" :style="{height:height}">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in videoList" :key="index">
                <video-player class="video-player vjs-custom-skin"
                    ref="videoPlayer"
                    :playsinline="false"
                    :options="playerOptions"
                    @play="onPlayerPlay($event)" 
                    @pause="onPlayerPause($event)"
                    v-if="index == 0 && isVideo"
                    >
                </video-player>
                <img  :src="item" alt="" v-else>
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
        <span ref="span"></span>
    </div>
</template>

<script>
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
import Swiper from 'swiper'
import '@/common/swiper.min.css'
export default {
data() {
    return {
        playerOptions: {
        // playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "video/mp4",
          src: this.videoList[0] //你的视频地址（必填）
        }],
        poster: this.videoList[1], //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: '暂时不支持播放该视频', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true  //全屏按钮
        }
      },
      isVideo: null,
      videoObj:null,
    }
},
props:['videoList','height'],
mounted(){
    let _this = this;
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        autoplay: false,
        loop: false,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        on: {
            slideChangeTransitionEnd: function(){
                if(this.activeIndex == 0) {
                    console.log(_this.playerOptions.poster)
                }
                if(this.activeIndex == 1) {
                    let video = _this.videoObj;
                    video && video.pause()
                }
            },
        },
    })
    this.isVideo = (this.videoList[0].indexOf(".mp4") != -1);
},
methods: {
    onPlayerPlay(player) {
        this.videoObj = player;
        console.log("开始播放")
        // MessageBox.confirm('', { 
        //     message: true ? '播放本视频将消耗您的流量，建议在WiFi环境下播放' : '商品介绍视频将帮助您更清晰了解商品，但也将耗费较多流量，建议在WiFi环境下查看。',
        //     title: '', 
        //     confirmButtonText: '立即播放', 
        //     cancelButtonText: '下次再看' 
        // })
    },
    onPlayerPause(player){
        console.log("暂停播放")
    },
  },
computed: {
    player() {
        return this.$refs.videoPlayer.player
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
