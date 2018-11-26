<template>
    <div class="score_goods">
        <app-header :type ="headerMsg"></app-header>
        <div class="main-wrap goods_detaile_wrap">
            <div class="main">
                <div class="goodsDetails_img_box">
                    <banner :imgList = "bannerDate" :height = "'600px'" v-if="bannerDate.length"></banner>
                </div>
                <div class="goodsDetails_box1" v-if="scoreGoods.id">
                    <div class="goodsDetails_box1_top clearfloat">
                        <h3 class="goodsDetails_box1_title" style="float: none;" v-text="scoreGoods.goodsName"></h3>
                        <p class="describe" v-text="scoreGoods.sizeDesc"></p>
                        <div class="scoreGood_info">
                            <span class="score_color" v-text="scoreGoods.score"></span>
                            <span class="font22">币</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span class="score_rmb" v-text="'￥'+scoreGoods.gssPrice"></span>
                        </div>
                    </div>
                </div>
                <div class="goodsDetails_box2 scoregoods">
                    <h4 v-if="scoreGoods.goodsContext"><span></span>&nbsp;商品详情</h4>
                    <div class="goodsDetails_box2_" v-if="scoreGoods.goodsContext" v-text="scoreGoods.goodsContext"></div>
                    <h4 v-if="scoreGoods_desc.desc"><span></span>&nbsp;注意事项</h4>
                    <div class="scoreGoodDetails"  v-if="scoreGoods_desc.desc" v-html="(scoreGoods_desc.desc).toString().replace(/\r\n/g, '<br/>')"></div>
                </div>
            </div>
            <div class="score_goods_btn" v-if="state != null">
                <div class="scoregoodsBtn" v-html="btnData[state].txt" :class="btnData[state].cla" @click="exchange()"></div>
            </div>
        </div>
        
        <div class="order_refund">		
            <div class="refund_bg refund_bg_load"></div>
            <div class="loading_box">
                <div id="gavinPlay"></div>
            </div>
        </div>
    </div>
</template>

<script>

import appHeader from "../../../../components/public/header.vue";
import banner from "../../../banner/goodsBanner.vue";
//import BScroll from 'better-scroll'
import { getIsLogin , getTokenId , getUserData, getSecretKey } from "../../../../common/common.js";
export default {
    name:'scoreGoods',
    data() {
        return {
            headerMsg:{
                type:"common",
                title:'果币商品',
                left:'返回'
            },
            id:null,
            licenseImg: null,
            showlicenseImg: false,
            imgBaseUrl:'',
            bannerDate:[],
            scoreGoods_desc:{},
            scoreGoods:{},
            state:null,
            btnData:{
                "0":{txt:"立即兑换",cla:"color01"},
                "1":{txt:"果币不足",cla:"color02"},
                "2":{txt:"您已兑换过啦",cla:"color03"},
                "3":{txt:"您已兑换过啦",cla:"color03"},
                "4":{txt:"已兑完",cla:"color03"}
            }
        }
    },
    async beforeMount(){
		this.id = this.$route.query.id
    },
    components: {
        appHeader,
        banner
    },
    mounted(){
        console.log('mounted')
        if (getIsLogin()) {
            
            const userInfo = JSON.parse(getUserData());
            this.userBasicParam = {
                firmId : userInfo.firmInfoid,
				source : 'firmId'+userInfo.firmInfoid,
				sign : this.$md5('firmId'+userInfo.firmInfoid+"key"+getSecretKey()).toUpperCase(),
				tokenId : getTokenId()
            }
        }
        if (localStorage.getItem('scoreGoods')) {
            this.scoreGoods = JSON.parse(localStorage.getItem('scoreGoods'))
            const list = this.scoreGoods.goodsPics.split('@');
                list.pop();
            this.bannerDate = list;
            console.log(list)
        }
        if (localStorage.getItem('scoreGoods_desc')) {
            this.scoreGoods_desc = JSON.parse(localStorage.getItem('scoreGoods_desc'))
        }
        this.get_scoregoods_details();
        // this.$nextTick(() => {
        //     new BScroll('#scroll_section', {  
        //         deceleration: 0.001,
        //         bounce: true,
        //         swipeTime: 1800,
        //         click: true,
        //     }); 
        // })
    },
    methods:{
        get_scoregoods_details:function(){
            this.$ajax.get(this.HOST, {
                params:{
                    method: "scoregoods_details",
                    firmId: this.userBasicParam.firmId,
                    goodsId: this.id
                }
            }).then(result => {
                // return JSON.parse(JSON.stringify(result));
                return result.data;

                
            }).then(data => {
                console.log(data.data.scoreGoods);
                if (data.statusCode == 100000) {
                    this.scoreGoods = data.data.scoreGoods;
                    const list = this.scoreGoods.goodsPics.split('@');
                        list.pop();
                    this.bannerDate = list;
                    this.state = data.data.status;
                } else {
                    console.log(data.statusStr)
                }
            });
        },
        exchange:function () {
            const _this = this;
            if (this.state == 0) {
                
                this.$messagebox.confirm('兑换后不能退换，确定兑换？','').then(action => {
                    _this.exchange_api();
                }).catch((e) => {
                    console.log(e)
                });
            }
        },
        exchange_api:function () {
            this.$ajax.get(this.HOST, {
                params:{
                    method: "exchange_scoregoods",
                    firmId: this.userBasicParam.firmId,
                    goodsId: this.id
                }
            }).then(result => {
                // return JSON.parse(JSON.stringify(result));
                return result.data;

                // console.log(data);
            }).then(data => {
                if (data.statusCode == 100000) {
                    
                    this.$messagebox.alert('兑换成功','').then(action => {
                        console.log('1')
                    }).catch((e) => {
                        console.log(e)
                    });
                    this.state = data.data.status;
                } else {
                    console.log(data.statusStr)
                }
            });
        }
    },
    beforeDestroy(){
        localStorage.getItem('scoreGoods') && localStorage.removeItem('scoreGoods');
        // localStorage.getItem('scoreGoods_desc') && localStorage.removeItem('scoreGoods_desc');
    }
}
</script>
<style scoped>
.score_goods{
    padding-top: 87px;
    background-color: #ebebeb;
    z-index: 19;
}
.scroll_container{
    width: 100%;
    height: 100%;
}
.goodsDetails_img_box {
    width: 100%;
    height: 600px;
    overflow: hidden;
    position: relative
}
.goodsDetails_box1 {
    background: #FFF
}

.goodsDetails_box1_top {
    padding-top: 20px;
    font-size: 36px
}

.goodsDetails_box1_title {
    text-indent: 24px;
    font-weight: 400;
    color: #000;
    width: 560px
}
.scoreGood_info {
    height: 100px;
    line-height: 100px;
    padding: 0 20px
}

.scoreGood_info span {
    font-size: 40px
}

.scoreGood_info .font22 {
    color: #f66b0c;
    font-size: 22px
}

.score_color {
    font-size: 48px;
    color: #f66b0c
}

.scoreGood_info .score_rmb {
    font-size: 30px;
    color: #666;
    text-decoration: line-through
}

.goods_detaile_wrap .describe {
    font-size: 22px;
    color: #6f6f6f;
    height: 44px;
    padding: 0 20px;
    line-height: 44px
}
.goodsDetails_box2 {
    font-size: 24px;
    line-height: 36px;
    background: #FFF;
    color: #000
}

.goodsDetails_box2 h4 {
    height: 58px;
    line-height: 58px;
    border-bottom: 1px solid #d7d7d7;
    background: #efefef;
    font-size: 30px;
    color: #30A1F2;
    text-indent: 18px;
    margin-bottom: 10px
}

.goodsDetails_box2 h4 span {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #30A1F2
}

.goodsDetails_box2_ p {
    padding: 0 24px;
    margin-bottom: 5px;
    line-height: 40px
}
.score_goods .goodsDetails_box2_ {
    margin-bottom: 10px;
    padding: 0 24px;
}
.scoregoodsBtn {
    width: 80%;
    margin: 15px auto;
    height: 80px;
    text-align: center;
    line-height: 80px;
    border-radius: 10px;
    font-size: 30px
}

.scoreGoodDetails {
    width: 100%;
    font-size: 26px;
    color: #333;
    line-height: 40px;
    padding: 20px 20px 22px;
    background: #fff
}
.footer-wrap.score_goods_btn {
    background-color: #ebeaea;
    height: 110px
}
.color01 {
    background-color: #f66b0c;
    color: #FFF
}

.color02,.color03 {
    background-color: #a1a1a1;
    color: #FFF
}
</style>

