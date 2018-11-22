<template>
    <div class="exchangeCoupon"> 
        <app-header :type ="headerMsg"></app-header>
        
        <div class="score_goods_main_wrap main-wrap">
            <div class="main score_coupon">
                <ul class="score_coupon_box clearfloat" v-if="couponList.length">
                    <div class="coupon_list_item"  v-for="(item,index) in couponList" :key="index" :class="{'bg':item.flag != 0}">
						<div class="coupon_left sprite_login" :class="(item.flag == 0 ? 'quan_c' : 'quan_a')" v-text="item.couponMoney+'元'"></div>
						<div class="coupon_center ">
							<div class="coupon_name" v-text="item.kindName"></div>
							<p v-text="'有效期：'+item.realDays+'天'"></p>
							<p v-text="'金额要求：实付满'+item.leastOrderMoney+'元'"></p>
						</div>
						<div class="coupon_right">
							<div class="coupon_score" v-text="item.needScore"><span v-text="'币'"></span></div>
							<div class="coupon_button" :class="'coupon_btn'+item.flag" :data="item.id" v-text="couponBtn[item.flag]" @click="exchange(index)"></div>
						</div>
					</div>
                </ul>
                <p class="lodemore" v-text="!couponList.length ? '暂无可兑换优惠卷' : (isLast ? '没有更多数据了' : '点击加载更多')" @click="getMore()"></p>
            </div>
        </div>
    </div>
</template>

<script>
import appHeader from "../../../components/public/header.vue";
import { getIsLogin , getTokenId , getUserData, getSecretKey } from "../../../common/common.js";
export default {
    name:'exchangeCoupon',
    data() {
        return {
            headerMsg:{
                type:"common",
                title:'果币兑换优惠卷',
                left:'返回'
            },
            licenseImg: null,
            showlicenseImg: false,
            imgBaseUrl:'',
            websiteNode:this.websiteDate['code'],
            isLast:false,
            pageSize:this.pageSize,
            pageNo:this.pageNo,
            couponList:[],
            couponBtn:["立即兑换","果币不足","已兑换","已兑换","已兑完"]
        }
    },
    components: {
        appHeader,
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
            this.get_coupon_kindList();
        }
    },
    methods:{
        //优惠卷列表
        get_coupon_kindList:function(){
            const obj = Object.assign({
                    method: "coupon_kind",
                    websiteNode: this.websiteNode,
                    pageSize:this.pageSize,
                    pageNo:this.pageNo,
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
                    
                    this.isLast = data.data.isLast;
                    if (data.data.pageNo == 1) {
                        this.couponList = data.data.objects;
                    } else {
                        this.couponList = this.couponList.concat(data.data.objects);
                    }
                } else {
                    console.log(data.statusStr)
                }
            });
        },
        //果币兑换优惠卷
        exchange_coupon:function(id){
            const obj = Object.assign({
                    method: "exchange_coupon",
                    websiteNode: this.websiteNode,
                    couponKindId:id,
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
                    this.$messagebox.alert('兑换成功','').then(action => {
                        console.log('1')
                    }).catch((e) => {
                        console.log(e)
                    });
                    
                } else if (data.statusCode == 100619) {
                    
                    this.$toast({
                        message : data.statusStr,
                        position: 'middle',//top boottom middle
                        duration: 2000,//延时多久消失
                        //iconClass: 'mint-toast-icon mintui mintui-field-warning'
                        //.mintui-search .mintui-more .mintui-back.mintui-field-error .mintui-field-warning .mintui-success .mintui-field-success
                    })
                } else {
                    console.log(data.statusStr)
                }
            });
            
        },
        getMore:function () {
            if (!this.isLast) {
                this.pageNo = this.pageNo+1 ;
                this.get_coupon_kindList();
            } 
        },
        exchange:function (i) {
            const _this = this;
            const id = this.couponList[i].id;
            if (this.couponList[i].flag == 0) {
                
                this.$messagebox.confirm('是否兑换优惠卷？','').then(action => {
                    _this.exchange_coupon(id);
                }).catch((e) => {
                    console.log(e)
                });
            } else {
                
            }
            
        }
    }
}
</script>

<style scoped>
@import "../../../common/sprite.css";
.exchangeCoupon{
    padding-top: 87px;
    background-color: #ebebeb;
    z-index: 18;
}
.coupon_main_wrap dl{width: 100%;height: 166px;margin-bottom: 20px;background: #f2f2f2;}
.coupon_main_wrap .coupon_status1{background: #FFF;}
.coupon_main_wrap dl dt, .coupon_main_wrap dl dd{float: left;}
.coupon_main_wrap dl dt{width: 170px;height: 166px;padding: 0 40px;font-size: 32px;line-height: 166px;overflow: hidden;}
.coupon_main_wrap dl dd{width: 532px;height: 166px;}
.coupon_top{height: 40px;width: 100%;margin-top: 16px;line-height: 40px;font-size: 30px;}
.coupon_name{float: left;}
.coupon_state{float: right;font-size: 20px;padding-right: 20px;}
.coupon_time,.coupon_money,.coupon_come{height: 30px;line-height: 30px;font-size: 20px;}
.coupon_status1 dt,.coupon_status1 .coupon_state{color:#f76b0f};
.coupon_status2 dt,.coupon_status2 .coupon_state{color:#e3b17a};
.coupon_status3 dt,.coupon_status3 .coupon_state{color:#666};

.main.score_coupon{padding-top: 20px;}
.coupon_list_item{width: 710px;height: 166px;margin: 20px;background: #FFFFFF;border-radius: 8px;display: flex;}
.coupon_list_item.bg{background-color:rgb(242,242,242);}
.coupon_list_item.bg .quan_a,.coupon_list_item.bg .coupon_score{color: rgb(145,145,145);}
.coupon_left{width: 170px;height: 166px;line-height: 166px;font-size: 30px;text-indent: 30px;color: #F76A10;}
.coupon_right{height: 166px;width: 180px;text-align: center;}
.coupon_center{flex: 1;};
.coupon_center1{background: url(../../../assetc/img/exchange01@2x.png) no-repeat 65% center;}
.coupon_center2{background: url(../../../assetc/img/exchange02@2x.png) no-repeat 65% center;}
.coupon_center3{background: url(../../../assetc/img/exchange03@2x.png) no-repeat 65% center;}
.coupon_list_item .coupon_name,.coupon_list_item .coupon_score{height: 70px;padding-top: 28px;line-height: 48px;font-size: 26px;width: 100%;}
.coupon_list_item .coupon_score{color: #f76a10;height: 90px;line-height: 68px;font-size: 34px;}
.coupon_list_item .coupon_score span{font-size: 18px;}
.coupon_center p{line-height: 30px;font-size: 20px;color: #666666;}
.coupon_button{width: 140px;height: 52px;border: 1px solid rgb(145,145,145);color: rgb(145,145,145); line-height: 52px;font-size: 26px;border-radius: 3px;margin: 0 auto;}
.coupon_btn0{border-color: rgb(247,106,16);color: rgb(247,106,16);}
.coupon_center1{background: url(../../../assetc/img/exchange01@2x.png) no-repeat 65% center;}
.coupon_center2{background: url(../../../assetc/img/exchange02@2x.png) no-repeat 65% center;}
.coupon_center3{background: url(../../../assetc/img/exchange03@2x.png) no-repeat 65% center;}
</style>
