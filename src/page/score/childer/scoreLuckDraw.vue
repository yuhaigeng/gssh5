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

import {layer} from "../../../common/layer.js"
import appHeader from "../../../components/public/header.vue";
import banner from "../../banner/goodsBanner.vue";
import BScroll from 'better-scroll'
import '@/common/layer.css'
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
            pageSize:'10',
            pageNo:'1',
            couponList:[],

        }
    },
    components: {
        appHeader,
    },
    mounted(){
        console.log('mounted')
        //this.get_score_goodsList();
        //this.get_gss_desc();
    },
    methods:{
        draw_prizes_activity:function(){
            this.$ajax.get(this.HOST, {
                params:{
                    method: "draw_prizes_activity",
                    websiteNode: "3301",
                    firmId:'132'
                }
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

</style>
