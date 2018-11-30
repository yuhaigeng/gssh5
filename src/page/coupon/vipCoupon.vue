<template>
    <div class="coupon common-wrap">
        <app-header :type="headerMsg"></app-header>
        <div id="appVue" class="main-wrap ticket_main_wrap" v-cloak>
			<div class="ticket_nav clearfloat">
				<div class="ticket_nav_item float_left " v-for="(item,index) in vipNav" v-text="item.name" :class="{'active':coupon.type == item.type}" @click="couponNav(item)" :key="index"></div>
			</div>
			<div class="ticket_main">
				<div class="ticket_main_content">
					<div class="ticket_item clearfloat" v-for="(item,index) in coupon['list']" :key="index">
						<div class="ticket_item_left float_left">
							<span class="ticket_money" v-text='item.templateMoney'></span>
						</div>
						<div class="ticket_item_center float_left">
							<p class="ticket_tit"><span class="ticket_name" v-text='item.templateName'></span> <span data-url="vip.html" class="user_vip_icon" :class="'vip'+item.vipGrade"></span></p>
							<p class="ticket_item_time">有效期：<span v-text='item.realDays+"天"'></span></p>
							<p class="ticket_item_prerequisite" v-text='textList[coupon["type"]]+item.leastOrderMoney+"元"'></p>

						</div>
						<div class="ticket_item_right float_right" :class="'state'+item.state">
							<span class="btn" v-text="btnText(item)" @click="getCoupon(item)"></span>
						</div>
					</div>
				</div>
			</div>
			<div class="ticket_bottom">
				<p>*VIP会员在会员期间只可领取一次<span v-text="coupon['name']"></span></p>
			</div>
		</div>
    </div>
</template>
<script>
import appHeader from "../../components/public/header.vue";
import { getIsLogin , getTokenId , getUserData, getSecretKey } from "../../common/common.js";
export default {
    name:'onloneCoupon',
    data(){
        return{
            headerMsg:{
                type:"common",
                title:'领券中心',
                left:'返回',
            },
            textList:['','单笔订单实付满','单品订单实付满','单类订单实付满'],
            vipNav:[
                {
                    name:'优惠券',
                    type:1,
                },{
                    name:'商品券',
                    type:2,
                },{
                    name:'专项类目券',
                    type:3,
                }
            ],
			couponInfo:{},
			coupon:{
				type:'',
				name:'',
				list:[],
            },
            type:''
        }
    },
    components: {
        appHeader,
    },
    mounted(){
        console.log('mounted')
        if (this.$route.query.type) {
            this.type = this.$route.query.type;
        } else {
            this.type = 1;
        }
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
    },
    methods : {
        //优惠卷列表
        get_coupon_list(){
            const obj = Object.assign({
                method: "vip_cou_tem_list",
                type:this.type
            },this.userBasicParam)
            this.$ajax.get(this.HOST, {
                params:obj
            }).then(result => {
                return result.data;
            }).then(data => {
                console.log(data);
                if (data.statusCode == 100000) {
                    this.couponInfo[this.type] = data.data;
                    this.coupon = {
                        type:this.type,
                        name:this.vipNav[this.type-1]['name'],
                        list:data.data,
                    }
                } else {
                    this.$toast({
                        message : data.statusStr,
                        position: 'bottom',
                        duration: 2000,
                    })
                }
            });
        },
        //领取优惠券
        get_coupon:function (id) {
            const obj = Object.assign({
                method: "get_vip_cou_tem",
                vipTempId:id
            },this.userBasicParam)
            this.$ajax.get(this.HOST, {
                params:obj
            }).then(result => {
                return result.data;
            }).then(data => {
                console.log(data);
                if (data.statusCode == 100000) {
                    this.couponInfo[this.type] = data.data;
                    this.coupon = {
                        type:this.type,
                        name:this.vipNav[this.type-1]['name'],
                        list:data.data,
                    }
                    this.$toast({
                        message : "领取成功",
                        position: 'middle',
                        duration: 2000,
                    })
                } else {
                    this.$toast({
                        message : data.statusStr,
                        position: 'bottom',
                        duration: 2000,
                    })
                }
            });
        },
        couponNav:function(item){
            // console.log(item)
            // console.log(this.couponInfo[item.type])
            if (this.coupon['type'] != item.type) {
                if(this.couponInfo[item.type]){
                    const arr1 = this.couponInfo[item.type];
                    console.log(arr1);
                    // pub.creatDataModule.couponInfo(item.type,this.couponInfo[item.type])
                    this.couponInfo[item.type] = arr1;
                    this.coupon = {
                        type:item.type,
                        name:this.vipNav[item.type-1]['name'],
                        list:arr1,
                    }
                }else{
                    this.type = item.type;
                    this.get_coupon_list();
                }
            }
        },
        btnText:function(item){
            if(item.state == 1){
                return '领取'
            }else if (item.state == 2){
                return '已经领取'
            }else if (item.state == 3){
                return '次数用完'
            }else if (item.state == 4){
                return '升级解锁'
            }
        },
        getCoupon:function(item){
            if (item.state == 1) {
                const id  = item.id;
                this.get_coupon(id)
            }
        }
    }
}
</script>
<style scoped>
@import "../../common/sprite.css";
.coupon{
    padding-top: 87px;
}
.ticket_nav{height: 80px;text-align: center;color: #999;font-size: 28px;background: #FFFFFF;position: fixed;top: 88px;z-index: 10;}
.ticket_nav .ticket_nav_item{width: 250px;line-height: 44px;padding-top: 20px;}
.ticket_nav .ticket_nav_item:after{display: block;content: '';width: 52px;height: 6px;border-radius: 3px;background: #FFFFFF;margin: 0 auto;}
.ticket_nav .ticket_nav_item.active{color: #F37C30;}
.ticket_nav .ticket_nav_item.active:after{background: #F37C30;}

.ticket_main{margin-top: 80px;}
.ticket_main_content{padding: 20px;}

.ticket_main_content .ticket_item{width: 100%;padding: 40px 20px 40px 0;background: #FFFFFF;border-radius: 10px;margin-bottom: 20px;}
.ticket_item .ticket_item_left{width: 210px;text-align: center;padding: 42px;}
.ticket_money{height: 76px;line-height: 76px;position: relative;font-size: 60px;color: #F51B44;}
.ticket_money:before{display: inline; content: "￥";font-size: 30px;color: #F51B44;bottom: 8px;}
.ticket_tit{height: 48px;}
.ticket_name{font-size: 32px;color: #333333;margin-bottom: 12px;line-height: 48px;}

.ticket_item_time,.ticket_item_prerequisite,.ticket_item_from{font-size: 24px;color: #999999;line-height: 40px;position: relative;padding-left: 20px;}
.ticket_item_time:before,.ticket_item_prerequisite:before,.ticket_item_from:before{display: inline-block;content: '';width: 10px;height: 10px;background: #d1d1d1;border-radius: 50%;position: absolute;left: 0;top: 15px;}


.ticket_item_right{width: 140px;text-align: right;padding-top: 66px;}
.ticket_item_right .btn{width: 140px;height: 48px;border: 2px solid #F37C30;border-radius: 24px;text-align: center;line-height: 48px;color: #F37C30;font-size: 24px;display: block;}
.ticket_item_right.state2 .btn,.ticket_item_right.state3 .btn,.ticket_item_right.state4 .btn{color: #999;border-color: #999;}
.ticket_item_right.state4 .btn{border: none;background:#dbdbdb ;color: #999;}
/*.ticket_item .user_name {font-size: 36px;line-height: 52px;padding-right: 30px;}*/
.ticket_item .user_vip_icon {display: inline-block;width: 98px;height: 34px;border-radius: 17px;margin-right: 8px;position: relative;top: 6px;}
.ticket_item .user_vip_icon.vip1{background: url(../../assets/img/vip_icon1_square_active.png) no-repeat center;}
.ticket_item .user_vip_icon.vip2{background: url(../../assets/img/vip_icon2_square_active.png) no-repeat center;}
.ticket_item .user_vip_icon.vip3{background: url(../../assets/img/vip_icon3_square_active.png) no-repeat center;}
.ticket_item .user_vip_icon.vip4{background: url(../../assets/img/vip_icon4_square_active.png) no-repeat center;}

.ticket_bottom{position: fixed;width: 100%;left: 0;bottom: 0;height: 80px;background: #E5E5E5;}
.ticket_bottom p {text-align: center;color: #F51B44;font-size: 24px;line-height: 80px;}
</style>
