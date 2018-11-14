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
                        <dl class="clearfloat coupon_status1">	<dt class="sprite_login quan_c">20元</dt>	<dd>		<div class="coupon_top clearfloat">			<div class="coupon_name">test0814</div>			<div class="coupon_state"></div>		</div>		<div class="coupon_time">有效期至：2018-08-19 23:59:59</div>		<div class="coupon_money">金额要求：单个订单大于300元</div>		<div class="coupon_come">来源：测试</div>	</dd></dl>
                    </div>
                </div>
                <div class="coupon_main_unAvailable_box">
                    <p class="title">不可用优惠卷</p>
                    <div class="coupon_main_unAvailable">
                        
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
                title:'常购商品',
                left:'返回'
		    },
        }
    },
    components: {
        appHeader,
    },
}
</script>

<style scoped>
.coupon_main_wrap {
	height: auto;
}

.select_coupon .coupon_main_ .title {
	font-size: 30px;
	color: #666666;
	padding-top: 10px;
	padding-bottom: 34px;
}

.select_coupon .coupon_main_unAvailable {
	color: #9a9a9a;
}

.select_coupon .coupon_main_available .coupon_status1.active {
	background: #fff url('../../assets/img/coupon_active.png') no-repeat right top;
}

.select_coupon .coupon_main_unAvailable .coupon_status1 dt {
	color: #9A9A9A;
}

.select_coupon .select_coupon_top {
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