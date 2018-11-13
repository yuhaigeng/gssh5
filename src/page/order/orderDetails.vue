<template>
 <div class="">
     <app-header :type ="headerMsg"></app-header>
        <div class="main order_details_main">
            <div class="order_details_top">
                <dl class="order_details_top_code clearfloat">
                    <dt>订单编号：</dt>
                    <dd><span>{{orderDetailList.orderCode}}</span></dd>
                    <dd class="tetails" v-if="orderStatus == 1">待发货</dd>
                    <dd class="tetails" v-if="orderStatus == 2">已配货</dd>
                    <dd class="tetails" v-if="orderStatus == 3">待支付</dd>
                    <dd class="tetails" v-if="orderStatus == 4">已支付</dd>
                    <dd class="tetails" v-if="orderStatus == -1">已作废</dd>
                </dl>
                <dl class="clearfloat">
                    <dt>下单时间：</dt><dd>{{orderDetailList.createTime}}</dd>
                </dl>
                <dl class="clearfloat" v-if="orderStatus == 1 || orderStatus == -1">
                    <dt>预计配送：</dt><dd>{{orderDetailList.preSendTime}}</dd>
                </dl>
                <dl class="clearfloat" v-if="orderStatus == 2 || orderStatus == 3 || orderStatus == 4">
                    <dt>配货时间：</dt><dd>{{orderDetailList.readyGoodsTime}}</dd>
                </dl>
                <dl class="clearfloat" v-if="orderStatus == 3 || orderStatus == 4">
                    <dt>配送时间：</dt><dd>{{orderDetailList.sendTime}}</dd>
                </dl>
                <dl class="clearfloat"  v-if="orderStatus == 1 || orderStatus == 2">
                    <dt>&nbsp;</dt><dd>(请保持电话畅通)</dd>
                </dl>
            </div>
            <div class="order_details_add">
                <div class="order_details_add_top clearfloat">
                    <div class="order_details_name">
                        {{orderDetailList.customName}}
                    </div>
                    <div class="order_details_phoneNumber">
                        {{orderDetailList.customMobile}}
                    </div>
                </div>
                <p class="order_details_address">
                    {{orderDetailList.receiveAddress}}
                </p>
                <span class="order_details_arrows hidden">
                    〉
                </span>
            </div>
            <ul class="order_details_goods">
                <li v-for="(item,index) in orderDetailsList" :key="index">
                    <dl class="clearfloat">
                        <dt class="goodName">{{item.goodsName}}</dt>
                        <dd><span class="color_f27c32">{{item.gssPrice}}</span>元/{{item.priceUnit}}&nbsp;&nbsp;<span class="color_f27c32">{{item.wholeGssPrice}}</span>元/{{item.wholePriceSize}}</dd>
                        <dd class="order_details_goods_right">X{{item.buyCount}}</dd>
                    </dl>
                    <dl class="clearfloat">
                        <dt>商品总量：{{item.roughWeight}}x{{item.buyCount}}={{item.roughWeight*item.buyCount}}斤</dt>
                        <dd></dd>
                        <dd class="order_details_goods_right">总价：{{item.costMoney}}元</dd>
                    </dl>
                    <div class="order_details_goods_ clearfloat" v-if="orderStatus == 3 || orderStatus == 4">
                        <dl class="clearfloat">
                            <dt>实际总重:</dt>
                            <dd><span class="color_f27c32">{{item.afterWholePriceSize}}斤</span></dd>
                        </dl>
                        <dl class="clearfloat">
                            <dt>实际总价:</dt>
                            <dd><span class="color_f27c32">{{item.afterCostMoney}}元</span></dd>
                        </dl>
                    </div>
                </li>
            </ul>
            <!--备注信息-->
            <div class="order_details_make">
                备注：<input type="text" name="" id="remark" value="" placeholder="选填，您想对商家说些什么" />
            </div>
            <!--配送费用说明-->
            <div class="order_details_distribution" >
                配送费用：<span class="logistic_price">0.0元</span>
                    <button class="logistic_show" data-type="#PS-DESC">配送说明</button>
            </div>
            <!--优惠券-->
            <div class="order_details_coupon_box1 conpon_item_box clearfloat" v-if="orderStatus == 3" data-type='1' >
                <dl class="order_details_coupon clearfloat">
                    <dt>优惠券:（单选）</dt>
                    <dd class="order_coupon_price"></dd>
                </dl>
            </div>
            <div class="order_details_coupon_box1 conpon_item_box clearfloat" v-if="orderStatus == 3" data-type='2' >
                <dl class="order_details_coupon clearfloat">
                    <dt>商品券:（可多选）</dt>
                    <dd class="order_coupon_price"></dd>
                </dl>
            </div>
            <div class="order_details_coupon_box1 conpon_item_box clearfloat" v-if="orderStatus == 3" data-type='3'>
                <dl class="order_details_coupon clearfloat">
                    <dt>商品类目券:（可多选）</dt>
                    <dd class="order_coupon_price"></dd>
                </dl>
            </div>
            <div class="order_details_coupon_box11" v-if="orderStatus == 3">
                点击去支付后，不能重新选择优惠券，请谨慎操作！
            </div>
            <!--订单总金额-->
            <div class="order_details_money" v-if="orderStatus == 1">
                <dl class="clearfloat">
                    <dt>订单总金额:</dt>
                    <dd><span class="color_f27c32">{{orderDetailList.orderMoney}}0</span>元</dd>
                </dl>
                <p>(实际金额按照收货时实际称重结算)</p>
            </div>
            <!--订单金额详情-->
					<div class="order_details_money_details" v-if="orderStatus == 2 || orderStatus == 3 || orderStatus == 4">
						<dl class="clearfloat">
							<dt>订单总金额:</dt>
							<dd><span class="color_f27c32">{{orderDetailList.goodsMoney}}</span>元</dd>
						</dl>
						<dl class="clearfloat">
							<dt>应付金额:</dt>
							<dd><span v-if="orderStatus == 2">(按实际称重核算后计算) </span>{{orderDetailList.shouldPayMoney}}元</dd>
						</dl>
						<dl class="clearfloat">
							<dt>优惠金额:</dt>
							<dd>{{orderDetailList.offMoney}}元</dd>
						</dl>
						<dl class="clearfloat">
							<dt>实际金额:</dt>
							<dd>{{orderDetailList.realPayMoney}}元</dd>
						</dl>
					</div>
            <div class="order_details_cancel" v-if="orderStatus == 1">
				取消订单
			</div>
			<div class="order_details_cancel" v-if="orderStatus == -1">
				删除订单
			</div>
        </div>
 </div>
</template>

<script>
import appHeader from "../../components/public/header.vue";
export default {
    data() {
        return {
            headerMsg:{
            type:"common",
            title:'订单详情',
            left:'返回'
        },
        orderDetailList:[],
        orderDetailsList:[],
        orderStatus: ''
        }
    },
    components: {
    appHeader,
  	},
  	created:function() {
      this.Code = this.$route.query.code
      this.orderStatus = this.$route.query.orderStatus
  	},
  	methods: {
        get_order_detail:function () {
		this.$ajax.get(this.HOST, {
			params:{
				method: "order_details_fou",
				orderCode: this.Code,
				}
			}).then(resp => {
                this.orderDetailList = resp.data.data.orderInfo;
                this.orderDetailsList = resp.data.data.orderInfo.orderDetailsList;
			}).catch(err => {
			   console.log('请求失败：'+ err.statusCode);
			});
		},
  	},
  	mounted() {
      this.get_order_detail()
  	}
}
</script>

<style scoped>
.color_f27c32 {
	color: #f27c32;
}
.order_details_main {
	margin-bottom: 0;
    margin-top: 107px;
}

.order_details_right {
	top: 0;
	right: 0;
	text-align: right;
	padding-right: 24px
}

.order_details_top {
	width: 100%;
	margin-top: 20px;
	padding: 14px 24px;
	background: #FFF
}

.order_details_top p {
	width: 100%;
	text-indent: 140px;
	font-size: 24px
}

.order_details_top dl {
	height: 46px;
	line-height: 46px;
	font-size: 24px;
	color: #000
}

.order_details_top dl dd,
.order_details_top dl dt {
	float: left
}

.order_details_top dl dt {
	width: 140px
}

.order_details_top dl .tetails {
	float: right;
	color: #F76A10
}

.order_details_add {
	width: 100%;
	padding: 18px 24px 26px 24px;
	font-size: 24px;
	position: relative;
	background: #FFF;
	margin-top: 20px
}

.order_details_add_top {
	line-height: 50px
}

.order_details_name {
	float: left
}

.order_details_phoneNumber {
	float: right;
	padding-right: 20px
}

.order_details_address {
	line-height: 30px;
	padding-right: 20px
}

.order_details_arrows {
	position: absolute;
	right: 0;
	font-size: 40px;
	font-weight: 700;
	top: 50%;
	margin-top: -20px;
	color: #999
}

.order_details_goods {
	margin-top: 20px;
	font-size: 26px;
	color: #000
}

.order_details_goods li {
	width: 100%;
	border-bottom: 1px solid #EAEAEA;
	background: #FFF;
	padding-bottom: 10px;
}

.order_details_goods li dl {
	padding: 0 24px;
	line-height: 52px
}

.order_details_goods li dl dd,
.order_details_goods li dl dt {
	float: left;
	padding-right: 10px;
	height: 52px;
}

.order_details_goods li dl .goodName {
	width: 353px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.order_details_goods li dl .order_details_goods_right {
	float: right
}

.order_details_goods_ {
	width: 100%;
	height: 80px;
	padding: 0 24px;
	background: #fffdda;
	color: #999997;
}

.order_details_goods .order_details_goods_ dl {
	width: 50%;
	float: left;
	line-height: 80px
}

.order_details_goods_ dl dd {
	color: #71bd5b
}

.order_details_distribution,
.order_details_make {
	width: 100%;
	padding: 0 24px;
	line-height: 80px;
	font-size: 26px;
	background: #FFF;
	margin-top: 20px
}

.order_details_coupon_box1,
.order_details_coupon_box2,
.order_details_coupon_box3,
.order_details_coupon_box4 {
	width: 100%;
	padding: 0 24px;
	line-height: 80px;
	font-size: 26px;
	background: #FFF;
	margin-top: 20px
}

.order_details_coupon_box11 {
	width: 100%;
	padding: 0 24px;
	line-height: 60px;
	font-size: 26px;
	background: #FFF;
	margin-top: 20px;
	color: red;
	text-align: center;
}

.order_details_coupon_box1 dl {
	float: left
}

.order_details_coupon {
	width: 240px
}

.order_details_coupon dd,
.order_details_coupon dt {
	float: left
}

.order_details_coupon dt {
	padding-right: 20px
}

.order_details_coupon dd input {
	width: 104px;
	color: #d66110;
	background: #FFF;
}

.order_details_coupon_sel_box {
	position: relative;
	width: 70px;
	padding-top: 10px
}

.order_details_coupon_sel_box_top {
	width: 300px;
	height: 60px;
	border-radius: 40px;
	border: 1px solid #666;
	text-align: center;
	line-height: 60px
}

.order_details_coupon_sel_box_bottom {
	width: 300px;
	border-radius: 30px;
	position: absolute;
	top: 70px;
	padding-left: 10px;
	border: 1px solid #666;
	background: #FFF;
	display: none
}

.order_details_coupon_sel_box_bottom p {
	width: 246px;
	margin: 0 auto;
	height: 60px;
	line-height: 60px;
	border-bottom: 1px solid #666
}

.order_details_coupon_box2 dt,
.order_details_coupon_box3 dt,
.order_details_coupon_box4 dt {
	float: left;
	padding-right: 20px
}

.order_details_coupon_box2 dd,
.order_details_coupon_box3 dd,
.order_details_coupon_box4 dd {
	float: left
}

.order_details_money_details {
	width: 100%;
	padding: 24px;
	background: #FFF;
	line-height: 40px;
	margin-top: 20px;
	font-size: 26px
}

.order_details_money_details dl {
	height: 40px
}

.order_details_money_details dl dt {
	float: left
}

.order_details_money_details dl dd {
	float: right
}

.order_details_money {
	width: 100%;
	padding: 0 24px;
	font-size: 26px;
	background: #FFF;
	margin-top: 20px;
}

.order_details_money dl {
	line-height: 88px
}

.order_details_money dl dt {
	float: left
}

.order_details_money dl dd {
	float: right
}

.order_details_money p {
	line-height: 72px;
	text-align: center
}

.order_details_cancel {
	width: 630px;
	height: 90px;
	background: #f47c30;
	border-radius: 45px;
	text-align: center;
	line-height: 90px;
	color: #FFF;
	margin: 30px auto;
	font-size: 32px
}

.order_details_distribution .logistic_show {
	border: none;
	background: #FFFFFF;
	color: #a93a3a;
	float: right;
	outline: none;
	margin-bottom: 0;
}
/*优惠卷*/
.coupon_main_wrap {
	height: auto;
}

.select_coupon {
	display: none;
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

.select_coupon .select_coupon_top.active {
	background-image: url(../../assets/img/bg_num_a.png);
}

.select_coupon .coupon_main_ .title {
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
