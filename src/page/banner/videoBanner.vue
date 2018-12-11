<template>
    <div class="swiper-container common-wrap" :style="{height:height}">
        <div class="swiper-wrapper" id="videoSwiper">
            <div class="swiper-slide" v-for="(item,index) in videoList" :key="index">
                <img class="video_payImg" :src="videoPoster" v-if="isShowImg" @click="isShowVideo"/>
                <div class="video_pay" v-if="isShowImg && index == 0" @click="isShowVideo"></div>
                <div class="video" v-if="index == 0 && isVideo ">
                    <video id="mainVideo" class="myVideo" preload="none" webkit-playsinline="true" x5-playsinline="true" playsinline="true" controls="controls" width="100%" height="100%" style="max-height: 480px;" fristplay="no">
                        <source :src="item" type="video/mp4">
                        暂时不支持播放该视频
                    </video>
                    <div id="mainVideoClose" class="video_close" @click="videoEnd">退出播放</div>
                </div>
                <img :src="item" alt="" v-else>
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
        <span ref="span"></span>
    </div>
</template>

<script>
import Swiper from 'swiper'
import '@/common/swiper.min.css'
export default {
    data() {
        return {
            isVideo: null,
            videoPoster:this.videoList[1],
            isShowImg:true,
            video:null
        }
    },
    props:['videoList','height'],
    created(){
    },
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
                    let video = document.getElementById("mainVideo");
                    if(this.activeIndex == 1) {
                        video.pause()
                        _this.isShowImg = true
                        video.style.marginLeft = '9999px'
                        _this.$emit('listenShow',true);
                    }
                },
            },
        })
        this.isVideo = (this.videoList[0].indexOf(".mp4") != -1);
        console.log(this.isShowImg)
    },
    methods: {
        isShowVideo() {
            this.$messagebox.confirm('', { 
                message: '播放本视频将消耗您的流量，建议在WiFi环境下播放', 
                title: '', 
                confirmButtonText: '立即播放', 
                cancelButtonText: '下次再看' 
                }).then(action => { 
                if (action == 'confirm') {     //确认的回调
                    let video = document.getElementById("mainVideo");
                    this.video = video
                    let videoSwiper = document.getElementById("videoSwiper");
                    let videoNext = document.getElementById("mainVideoClose")
                    this.isShowImg = false;
                    video.play();
                    console.log(1)
                    this.$emit('listenShow',false);
                    videoSwiper.style.zIndex = 50
                    videoNext.style.zIndex = 80
                    video.style.marginLeft = 0
                    this.videoListen(video)
                }
                }).catch(err => { 
                if (err == 'cancel') {     //取消的回调
                    console.log(2);
                } 
            });
        },
        videoListen(video) {
            if(this.isVideo) {
                video.addEventListener("ended",() => {
                    console.log("播放完毕")
                    this.$nextTick(function(){
                        this.isShowImg = true;
                        videoSwiper.style.zIndex = 0;
                        video.pause();
                        this.$emit('listenShow',true);
                        video.style.marginLeft = '9999px';
                        console.log(video.style.marginTop)
                        this.exitFullscreen();
                    })
                })
            }
        },
        videoEnd() {
            this.isShowImg = true;
            // console.log(this.video.currentTime)
            this.video.currentTime = 0;
            this.video.pause();
            this.video.style.marginLeft = '9999px';
            this.$emit('listenShow',true);
        },
        exitFullscreen() {
            var de = document;
            if (de.exitFullscreen) {
                de.exitFullscreen();
            } else if (de.mozCancelFullScreen) {
                de.mozCancelFullScreen();
            } else if (de.webkitCancelFullScreen) {
                de.webkitCancelFullScreen();
            }
        }
    },
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
.myVideo {
    margin-top: 60px
}
.video {
    height: 600px;
    background-color: #000;
    z-index: 200;
}
.video_pay{
    z-index: 12;
    position: absolute;
    display: inline-block;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    width: 76px;
    height: 76px;
   	background: url(../../assets/img/pay.png) no-repeat center;
    background-size: 76px 76px;
}
.video_close {
    color: #000;
    font-size: 24px;
    margin-top: 10px;
    margin: 10px auto;
    text-align: center;
    border: 1px solid #fff;
    width: 140px;
    background-color: #fff;
    border-radius: 16px
}

</style>
