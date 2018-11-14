<template>
 <div class="">
    <app-header :type="headerMsg"></app-header>
    <!--选择优惠卷-->
    <div class="main-wrap coupon_main_wrap">
        <div class="main">
            <div class="select_coupon_top">不使用优惠卷</div>
            <div class="coupon_main_">
                <div class="coupon_main_available_box">
                    <p class="title">可用优惠卷</p>
                    <div class="coupon_main_available">
                        <dl class="clearfloat coupon_status1" v-for="(item, index) in userList" :key="index">
                            <dt class="sprite_login quan_c">{{item.couponMoney}}元</dt>
                            <dd>
                                <div class="coupon_top clearfloat">
                                    <div class="coupon_name">{{item.couponName}}</div>
                                    <div class="coupon_state"></div>
                                </div>
                                <div class="coupon_time">有效期至：{{item.endTime}}</div>
                                <div class="coupon_money">金额要求：单个订单大于{{item.leastOrderMoney}}元</div>
                                <div class="coupon_come">来源：{{item.sendMethod}}</div>
                            </dd>
                        </dl>
                    </div>
                </div>
                <div class="coupon_main_unAvailable_box">
                    <p class="title">不可用优惠卷</p>
                    <div class="coupon_main_unAvailable">
                        <dl class="clearfloat coupon_status1" v-for="(item, index) in unuserList" :key="index">
                            <dt class="sprite_login quan_c">{{item.couponMoney}}元</dt>
                            <dd>
                                <div class="coupon_top clearfloat">
                                    <div class="coupon_name">{{item.couponName}}</div>
                                    <div class="coupon_state"></div>
                                </div>
                                <div class="coupon_time">有效期至：{{item.endTime}}</div>
                                <div class="coupon_money">金额要求：单个订单大于{{item.leastOrderMoney}}元</div>
                                <div class="coupon_come">来源：{{item.sendMethod}}</div>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    </div>
 </div>
</template>

<script>
import appHeader from "../../components/public/header.vue";
export default {
    name: 'chooseCoupon',
    data() {
        return {
            headerMsg:{
                type:"common",
                title:'选择优惠券(单选)',
                right:'使用说明',
                left:'返回',
            },
            tokenId:localStorage.getItem("tokenId"),
            userList:null,
            unuserList:null,
            gunusableList:null
        }
    },
    components: {
        appHeader,
    },
    created:function() {
        this.Code = this.$route.query.code
        console.log(this.Code)
    },
    methods: {
        get_order_coupon:function () {
			this.$ajax.get(this.HOST, {
				params:{
					method: "order_details_fou",
					orderCode: 2018101001003901,
					tokenId: this.tokenId
					}
				}).then(resp => {
                    this.userList = resp.data.data.useable;
                    this.unuserList = resp.data.data.unusable;
                    this.gunusableList = resp.data.data.gunusable;
				}).catch(err => {
				console.log('请求失败：'+ err.statusCode);
			});
		},
    },
    mounted() {
        this.get_order_coupon()
    }
}
</script>

<style scoped>
/*在线领取优惠券*/

.coupon_main_ .clearfloat {
	position: relative;
}

.coupon_main_wrap dl {
	border-radius: 10px;
}

.coupon_status1 .receive_state {
	color: #f76b0f;
	border: 1px solid #f76b0f;
}

.coupon_status2 .receive_state {
	color: #e3b17a;
	border: 1px solid #e3b17a;
}

.coupon_status3 .receive_state {
	color: #666;
	border: 1px solid #666;
}

.coupon_main_ .clearfloat .receive_state {
	position: absolute;
	right: 20px;
	top: 0;
	bottom: 0;
	margin: auto;
	width: initial;
	height: 60px;
	font-size: 26px;
	padding: 10px 26px;
	border-radius: 26px;
	letter-spacing: 2px;
	box-sizing: border-box;
}

.coupon_main_ .clearfloat dd div+div {
	color: #999;
}
.sprite_login {
	background-image: url(../../assets/img/sprite_login.png);
	background-repeat: no-repeat;
}
.quan_c {
	background-position: -882px -412px;
}
/*优惠券管理页面*/

.coupon_main_wrap {
	height: 1244px;
}

.coupon_main_ {
	padding-top: 20px;
}

.coupon_main_ {
	padding: 0 24px;
	padding-top: 24px;
}

.coupon_main_wrap dl {
	width: 100%;
	height: 166px;
	margin-bottom: 20px;
	background: #f2f2f2;
}

.coupon_main_wrap .coupon_status1 {
	background: #FFF;
}

.coupon_main_wrap dl dt,
.coupon_main_wrap dl dd {
	float: left;
}

.coupon_main_wrap dl dt {
	width: 170px;
	height: 166px;
	padding: 0 40px;
	font-size: 32px;
	line-height: 166px;
	overflow: hidden;
}

.coupon_main_wrap dl dd {
	width: 532px;
	height: 166px;
}

.coupon_top {
	height: 40px;
	width: 100%;
	margin-top: 16px;
	line-height: 40px;
	font-size: 30px;
}

.coupon_name {
	float: left;
}

.coupon_state {
	float: right;
	font-size: 20px;
	padding-right: 20px;
}

.coupon_time,
.coupon_money,
.coupon_come {
	height: 30px;
	line-height: 30px;
	font-size: 20px;
}

.coupon_status1 dt,
.coupon_status1 .coupon_state {
	color: #f76b0f
}

;
.coupon_status2 dt,
.coupon_status2 .coupon_state {
	color: #e3b17a
}

;
.coupon_status3 dt,
.coupon_status3 .coupon_state {
	color: #666
}

.coupon_main_wrap {
    height: auto;
    margin-top: 87px;
}

 .coupon_main_ .title {
	font-size: 30px;
	color: #666666;
	padding-top: 10px;
	padding-bottom: 34px;
}

 .coupon_main_unAvailable {
	color: #9a9a9a;
}

 .coupon_main_available .coupon_status1.active {
	background: #fff url('../../assets/img/coupon_active.png') no-repeat right top;
}

 .coupon_main_unAvailable .coupon_status1 dt {
	color: #9A9A9A;
}

 .select_coupon_top {
	width: 100%;
	height: 80px;
	line-height: 80px;
	background: #FFF url(../../assets/img/bg_num_b.png) no-repeat 96% center;
	font-size: 24px;
	padding: 0 24px;
	margin-top: 30px;
}

 .select_coupon_top.active {
	background-image: url(../../assets/img/bg_num_a.png);
}

 .coupon_main_ .title {
	font-size: 30px;
	color: #666666;
	padding-top: 10px;
	padding-bottom: 34px;
}

.order_coupon_header_right {
	display: none;
}

.conpon_item_box .order_details_coupon {
	width: 100%;
}

.conpon_item_box .order_details_coupon dd {
	float: right;
	min-width: 100px;
	background: url(../../assets/img/arrow_right.png) no-repeat right center;
	padding-right: 44px;
	height: 80px;
	position: relative;
	right: -20px;
	color: #f50909;
}

.order_details_coupon_box11 {
	color: #f50909;
}

</style>