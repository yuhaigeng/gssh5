<template>
    <div class="scoreGame"> 
        <app-header :type ="headerMsg"></app-header>
        
        <div class="main-wrap">
            <section id="scroll_section" class="scroll_container">
                <section>
                    <div class="main score_active">
                        <div class="score_active_main">
                            <div class="gonggao-wrap icon_ad2">
                                <div class="gonggao">
                                    <ul  class="swiper-wrapper">
                                    
                                    </ul>
                                </div>
                            </div>
                            <div class="score_active_center">
                                <div class="score_active_turntable">
                                    <!-- <img class="pointer1" src="../img/img_Pointer@2x.png" alt="" />
                                    <canvas class="item animation0 transform0" id="wheelcanvas" width="680px" height="680px"></canvas>
                                    <img class="pointer" src="../img/btn_Start draw@2x.png"/> -->
                                </div>
                            </div>
                            <p class="active_count"></p>
                        </div>
                        <div class="score_active_box score_active_rule sprite_login bg_Headline">
                            <p class="title">活动规则</p>
                            <div class="box">
                                <!--<dl>
                                    <dt>活动设置</dt>
                                    <dd>我老是哪个都按时看到过</dd>
                                </dl>
                                <dl>
                                    <dt>活动设置</dt>
                                    <dd>我老是哪个都按时看到过</dd>
                                </dl>
                                <dl>
                                    <dt>活动设置</dt>
                                    <dd>我老是哪个都按时看到过</dd>
                                </dl>-->
                            </div>
                        </div>
                        <!--<div class="score_active_box score_active_prize">
                            <p class="title"></p>
                        </div>-->
                        <div class="score_active_box score_active_matter  sprite_login bg_Headline">
                            <p class="title">注意事项</p>
                            <ul class="box">
                            </ul>
                        </div>
                        <div class="score_active_copy">
                            
                        </div>
                    </div>
                </section>
            </section>
		</div>
    </div>
</template>

<script>

import appHeader from "../../../components/public/header.vue";
import banner from "../../banner/goodsBanner.vue";
import BScroll from 'better-scroll'

import { getIsLogin , getTokenId , getUserData, getSecretKey } from "../../../common/common.js";
export default {
    name:'scoreGame',
    data() {
        return {
            headerMsg:{
                type:"common",
                title:'果币抽奖',
                left:'返回'
            },
            isLast:false,
            pageSize:this.pageSize,
            pageNo:this.pageNo,
            websiteNode:this.websiteDate['code'],
            couponList:[],

        }
    },
    components: {
        appHeader,
    },
    mounted(){
        console.log('mounted')
         if (getIsLogin()) {
            this.tokenId = getTokenId();
            const userInfo = JSON.parse(getUserData());
            
            this.userBasicParam = {
                firmId : userInfo.firmInfoid,
                source : 'firmId'+userInfo.firmInfoid,
                sign : this.$md5('firmId'+userInfo.firmInfoid+"key"+getSecretKey()).toUpperCase(),
                tokenId : getTokenId()
            }
            this.draw_prizes_activity()
        }
    },
    methods:{
        draw_prizes_activity:function(){
            let obj = Object.assign({
                    method: "draw_prizes_activity",
                    websiteNode: this.websiteNode,
                },this.userBasicParam)
            this.$ajax.get(this.HOST, {
                params:obj
            }).then(result => {
                // return JSON.parse(JSON.stringify(result));
                return result.data;

                // console.log(data);
            }).then(data => {
                console.log(data);
                if (data.statusCode == 100000) {
                    
                    
                } else {
                    console.log(data.statusStr)
                }
            });
        },
    }
}
</script>

<style scoped>
.scoreGame{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding-top: 87px;
    background-color: #ebebeb;
    z-index: 19;
}
.scroll_container{
    width: 100%;
    height: 100%;
}
.main-wrap{max-width: 750px;width: 100%;margin: 0 auto;background: #ebeaea;}
.score_active{background: #ff4812;}
.score_active_main{width: 100%;}
.active_count{width: 100%;height: 40px;margin-bottom:20px;margin-top: -32px;text-align: center;color: #FFF;line-height: 40px;font-size: 24px;}
.score_active_main .gonggao-wrap{height: 60px;background-color:#FF4813 ; opacity:0.8;}
.score_active_main .gonggao-wrap .gonggao li{color: #FFF;font-size: 28px;line-height: 64px;}
.score_active_center{height: 814px;background:url(../../../../static/img/img_bg_money@2x.png) no-repeat center ;}
.score_active_turntable{width: 750px; height: 814px; background: url(../../../../static/img/img_Lottery_turntable_a@2x.png) no-repeat center;position: relative;overflow: hidden;}
.score_active_turntable .pointer1{width: 88px;height: 120px;position: relative;left: 50%;margin-left: -44px;top:60px ;z-index: 2;}
.score_active_turntable .pointer{position: absolute;width: 180px;height: 180px;left: 50%;top: 50%;margin-left: -90px;margin-top: -90px;}
.score_active_turntable .item{width: 684px;height: 684px;position: absolute;left: 30px;top: 70px;transition: all 5s;}/*transition: all 2s;*/
.score_active_turntable .transition0{
	transition: transform 2s;
	/*-webkit-transition: -webkit-transform 2s;
	-moz-transition: -moz-transform 2s; 
	-o-transition: -o-transform 2s; */
}
.score_active_turntable .animation_name{
	animation-name: myfirst;
}
.score_active_turntable .animation0{
	animation-duration: 1s;
	animation-timing-function: linear;
	animation-iteration-count: 5;
	/*animation-play-state: paused;*/
	/*animation-play-state: running;*/
	
}
.score_active_turntable .transform0{
	transform: rotate(0deg);
}
@keyframes myfirst{
	0%   {transform: rotate(0deg)}
	50%  {transform: rotate(180deg)}
	100% {transform: rotate(360deg)}
}
.score_active_box p{height: 82px;line-height: 50px;text-align: center;color: #FFF;font-size: 30px;}
.score_active_box .box{padding: 0 54px;color: #FFFDDA;line-height: 46px;font-size: 30px;padding-bottom: 40px;}

.score_active_matter .box li span{display: inline-block; width: 20px; height: 20px;border-radius: 10px;background: #FFF; vertical-align: middle;}
.score_active_copy{height: 146px;border-top: 2px dashed #FFF;line-height: 146px;color: #FFF;padding: 0 40px;font-size: 28px;text-align: center;}

</style>
