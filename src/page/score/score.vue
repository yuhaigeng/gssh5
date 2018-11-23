<template>
 <div class="score">
    <!-- <div class="header-wrap">
        <div class="header_left header_back sprite arrow_left_b" @click="goBack"></div>
        <div class="index_tit header_tit" v-text="'果币商城'"></div>
    </div> -->
    <app-header :type="headerMsg"></app-header>
    <div class="main_top">
        <div class="now_score" v-html="score_info.surplusScore"></div>
        <div class="now_score_show" v-text="'可用果币'"></div>
        <!--<div class="score_msg">
            总积分<span class="font"></span>击败了<span></span>商家
        </div>-->
    </div>
    <div class="main_center">
        <ul class="main_center_top clearfloat">
            <router-link class="sprite_login icon_mine_records float_left" :to="{path: '/score/record',query:{type:'0'}}" tag="li" v-text="'果币明细'"></router-link>
            <span class="line float_left"></span>
            <router-link class="sprite_login icon_mine_detail float_right" :to="{path: '/score/record',query:{type:'1'}}" tag="li" v-text="'兑换记录'"></router-link>
        </ul>
        <div class="main_center_bottom cont cont0">
            <router-link to="/score/goodsList" >
                <dl>
                    <dt class="sprite_login icon_mine_shangpin"></dt>
                    <dd>
                        <a href="javascript:void(0)" v-text="'果币兑换商品'"></a>
                        <a href="javascript:void(0)" class="sprite arrow_left"></a>
                    </dd>
                </dl>
            </router-link>
            <router-link to="/score/exchangeCoupon" >
                <dl>
                    <dt class="sprite_login icon_mine_quan"></dt>
                    <dd>
                        <a href="javascript:void(0)" v-text="'果币兑换优惠劵'"></a>
                        <a href="javascript:void(0)" class="sprite arrow_left"></a>
                    </dd>
                </dl>
            </router-link>
            <router-link to="/score/scoreGame" >
                <dl>
                    <dt class="sprite_login icon_mine_jiang"></dt>
                    <dd>
                        <a href="javascript:void(0)" v-text="'果币抽奖'"></a>
                        <a href="javascript:void(0)" class="sprite arrow_left"></a>
                    </dd>
                </dl>
            </router-link>
            <!-- <dl data = "" class="hidden">
                <dt class="sprite_login icon_mine_te"></dt>
                <dd>
                    <a href="javascript:void(0)">果币特权</a>
                    <a href="javascript:void(0)" class="sprite arrow_left"></a>
                </dd>
            </dl> -->
        </div>
    </div>
    <!-- <transition name="fade">
        <section class="license_container" v-if="showlicenseImg" @click="showlicenseImg = false">
            <img v-lazy="imgBaseUrl + licenseImg">
        </section>
    </transition>
    <transition name="router-slid" mode="out-in">
        <router-view></router-view>
    </transition>
     -->
 </div>
</template>

<script>
import appHeader from "../../components/public/header.vue";
import { getSystem  , getIsLogin , getTokenId , getUserData, getSecretKey } from "../../common/common.js";
export default {
    data() {
        return {
            headerMsg:{
                type:"common",
                title:'果币商城',
                leftColor:'white'
            },
            licenseImg: null,
            showlicenseImg: false,
            imgBaseUrl:'',
            score_info:{
                surplusScore:0
            }
        }
    },
    components: {
        appHeader,
    },
    mounted(){
        if (getIsLogin()) {
            const userInfo = JSON.parse(getUserData());
            this.userBasicParam = {
                firmId : userInfo.firmInfoid,
				source : 'firmId'+userInfo.firmInfoid,
				sign : this.$md5('firmId'+userInfo.firmInfoid+"key"+getSecretKey()).toUpperCase(),
				tokenId : getTokenId()
            }
            this.get_firm_score_info();
        }
        localStorage.getItem('scoreGoods_desc') && localStorage.removeItem('scoreGoods_desc');
    },
    methods:{
        get_firm_score_info:function(){
            const obj = Object.assign({
                method: "firm_score_info",
            },this.userBasicParam)
            this.$ajax.get(this.HOST, {
                params:obj
            }).then(result => {
                return result.data;
            }).then(data => {
                console.log(data);
                if (data.statusCode == 100000) {
                    this.score_info = data.data;
                } else {
                    console.log(data.statusStr);
                }
                console.log(this.score_info)
            });
        },
        goBack:function(){
            this.$router.go(-1)
        },
    }
}
</script>

<style scoped>
@import "../../common/sprite.css";

.score{
    /* position: absolute;
    right: 0;
    left: 0; */
    height: 100%;
    max-width: 750px;
    margin: 0 auto;
}
.score .header-wrap {
    max-width: 750px;
    left: 50%;
    margin-left: -375px;
    background: #f76a10;
    border-bottom-color: #f76a10;
    color: #FFF;
    height: 88px;

}
.score .main_top {
    width: 100%;
    height: 333px;
    background: #f76a10;
    text-align: center;
    color: #FFF;
    margin-top: 87px;
}

.score .now_score {
    padding-top: 100px;
    font-size: 88px
}

.score .now_score_show,.score .score_msg {
    height: 88px;
    line-height: 88px;
    font-size: 28px
}

.score_msg .font {
    font-size: 40px;
    display: inline-block;
    height: 88px;
    line-height: 88px;
    padding: 0 4px
}

.score .main_center_top {
    margin: 20px 0;
    height: 88px;
    line-height: 88px;
    background: #FFF;
    text-align: center
}

.score .main_center_top li {
    width: 49%;
    height: 88px;
    font-size: 30px
}

.line {
    line-height: 88px;
    width: 1px;
    background: #999997;
    height: 60px;
    margin-top: 14px
}

.score .main_center_bottom li {
    height: 88px;
    line-height: 88px;
    padding-right: 20px
}
.cont {
    width: 100%;
    background: #fff;
    margin-bottom: 22px;
}

.cont0 dl {
    width: 100%;
    height: 96px
}

.cont0 dd,.cont0 dt {
    height: 100%;
    line-height: 96px;
    float: left
}

.cont0 dt {
    width: 100px;
    text-align: center
}

.cont0 dd {
    width: 650px;
    border-bottom: 1px solid #ddd;
    position: relative
}

.cont0 dd a:nth-child(1) {
    font-size: 25px;
    color: #000
}

.cont0 dd a:nth-child(2) {
    position: absolute;
    right: 22px;
    width: 50px;
    height: 96px;
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg)
}
.license_container{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.5);
    z-index: 101;

}
.license_container img{
    width: 100%;
    position: absolute;
	top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}
.fade-enter, .fade-leave-active {
    opacity: 0;
}
.router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
}
.router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
}
</style>
