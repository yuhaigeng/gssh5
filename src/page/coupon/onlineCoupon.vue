<template>
    <div class="coupon">
        <app-header :type="headerMsg"></app-header>
        <div class="score_goods_main_wrap main-wrap">
            <div class="main score_coupon">
                <ul class="score_coupon_box clearfloat" v-if="couponList.length">
                    <div class="coupon_list_item"  v-for="(item,index) in couponList" :key="index" :class="item.onOff ? '' : 'bg'">
						<div class="coupon_left sprite_login" :class="item.onOff ? 'quan_c' : 'quan_a'" v-text="item.mouldMoney+'元'"></div>
						<div class="coupon_center ">
							<div class="coupon_name" v-text="item.mouldName"></div>
							<p v-text="'有效期：'+item.realDays+'天'"></p>
							<p v-text="'实付金额满：'+ item.leastOrderMoney+'元'"></p>
                            <p v-text="'来源：在线领取优惠券' "></p>
						</div>
						<div class="coupon_right">
							<div class="coupon_button" :class="item.onOff ? 'no_receive' : 'receive'" :data="item.id" v-text="item.onOff ? '领取' : '已领取'" @click="exchange(index)"></div>
						</div>
					</div>
                </ul>
                <p class="lodemore" v-text="!couponList.length ? '暂无可兑换优惠卷' : (isLast ? '没有更多数据了' : '点击加载更多')" @click="getMore()"></p>
            </div>
        </div>
    </div>
</template>
<script>
import appHeader from "../../components/public/header.vue";
import { getSystem  , getIsLogin , getTokenId , getUserData, getSecretKey } from "../../common/common.js";
export default {
    name:'onloneCoupon',
    data(){
        return{
            headerMsg:{
                type:"common",
                title:'在线领取优惠券',
                left:'返回',
            },
            couponList:[],
            textList:['','单笔订单实付满','单品订单实付满','单类订单实付满'],
            couponClass : ['',"quan_c","quan_b","quan_a"],
            websiteNode:'3301',
            pageNum:'1',
            pageSize:'10',
            couponBtn:['领取','已领取']
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
        //this.get_coupon_list();
    },
    methods : {
        get_coupon_list(){
            const obj = Object.assign({
                method: "online_coupon_list",
                websiteNode:this.websiteNode,
                pageNum:this.pageNum,
                pageSize:this.pageSize
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
                    this.isLast = data.data.lastPage;
                    if (data.data.pageNo == 1) {
                        this.couponList = data.data.list;
                    } else {
                        this.couponList = this.couponList.concat(data.data.list);
                    }
                    
                } else {
                    console.log(data.statusStr)
                }
            });
        },
        getMore:function () {
            if (!this.isLast) {
                this.pageNum = this.pageNum+1 ;
                this.get_coupon_list();
            } 
        },
        exchange(index){
            const id = this.couponList[index].id; 
            const obj = Object.assign({
                method: "get_coupon",
                couponId:id
            },this.userBasicParam)
            this.$ajax.get(this.HOST, {
                params:obj
            }).then(result => {
                return result.data;
            }).then(data => {
                if (data.statusCode == 100000) {
                    this.couponList[index].onOff = false;
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


.coupon_button.receive {border-radius: 26px;margin-top: 60px}


.coupon_button.no_receive {border-radius: 26px;margin-top: 60px;border-color: #f76b0f;color: #f76b0f;}
</style>
