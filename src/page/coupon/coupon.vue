<template>
    <div class="coupon">
        <app-header :type="headerMsg"></app-header>
        <div class="score_goods_main_wrap main-wrap">
            <div class="main score_coupon">
                <ul class="score_coupon_box clearfloat" v-if="couponList.length">
                    <div class="coupon_list_item"  v-for="(item,index) in couponList" :key="index">
						<div class="coupon_left sprite_login" :class="couponClass[item.status]" v-text="item.couponMoney+'元'"></div>
						<div class="coupon_center ">
							<div class="coupon_name" v-text="item.couponName"></div>
							<p v-text="'有效期至：'+item.endTime+'天'"></p>
							<p v-text="'金额要求：'+textList[item.type] + item.leastOrderMoney+'元'"></p>
                            <p v-text="'来源：'+item.sendMethod "></p>
						</div>
						<div class="coupon_right">
							
						</div>
					</div>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import appHeader from "../../components/public/header.vue";
import { getSystem  , getIsLogin , getTokenId , getUserData, getSecretKey } from "../../common/common.js";
export default {
    name:'couponList',
    data(){
        return{
            headerMsg:{
                type:"common1",
                title:'优惠券管理',
                left:'返回',
                right:'使用说明',
                jumpFront:"login",
                jumpAfter:'',
            },
            couponList:[],
            textList:['','单笔订单实付满','单品订单实付满','单类订单实付满'],
            couponClass : ['',"quan_c","quan_b","quan_a"]
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
            this.get_coupon_list();
        }
        //this.get_coupon_kindList();
        
    },
    methods : {
        get_coupon_list(){
            const obj = Object.assign({
                method: "coupon_info_show"
            }.this.userBasicParam)
            this.$ajax.get(this.HOST, {
                params:obj
            }).then(result => {
                // return JSON.parse(JSON.stringify(result));
                return result.data;

                // console.log(data);
            }).then(data => {
                console.log(data);
                if (data.statusCode == 100000) {
                    this.couponList = data.data;
                    
                } else {
                    console.log(data.statusStr)
                }
            });
        }
        
    }
}
</script>
<style scoped>
@import "../../common/sprite.css";
.coupon{
    padding-top: 87px;
}
.main.score_coupon{padding-top: 20px;}
.coupon_list_item{width: 710px;height: 166px;margin: 20px;background: #FFFFFF;border-radius: 8px;display: flex;}
.coupon_list_item.bg{background-color:rgb(242,242,242);}
.coupon_list_item.bg .quan_a,.coupon_list_item.bg .coupon_score{color: rgb(145,145,145);}
.coupon_left{width: 170px;height: 166px;line-height: 166px;font-size: 30px;text-indent: 30px;color: #F76A10;}
.coupon_right{height: 166px;width: 180px;text-align: center;}
.coupon_center{flex: 1;}
.coupon_list_item .coupon_name,
.coupon_list_item .coupon_score{height: 70px;padding-top: 28px;line-height: 48px;font-size: 26px;width: 100%;}
.coupon_list_item .coupon_score{color: #f76a10;height: 90px;line-height: 68px;font-size: 34px;}
.coupon_list_item .coupon_score span{font-size: 18px;}
.coupon_center p{line-height: 30px;font-size: 20px;color: #666666;}
.coupon_button{width: 140px;height: 52px;border: 1px solid rgb(145,145,145);color: rgb(145,145,145); line-height: 52px;font-size: 26px;border-radius: 3px;margin: 0 auto;}
.coupon_btn0{border-color: rgb(247,106,16);color: rgb(247,106,16);}
.coupon_center1{background: url(../../../static/img/exchange01@2x.png) no-repeat 65% center;}
.coupon_center2{background: url(../../../static/img/exchange02@2x.png) no-repeat 65% center;}
.coupon_center3{background: url(../../../static/img/exchange03@2x.png) no-repeat 65% center;}
</style>
