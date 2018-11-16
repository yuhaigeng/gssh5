<template>
 <div class="">
     <app-header :type ="headerMsg"></app-header>
	<div class="main order_details_main">
		<div class="order_details_top" v-if="orderInfo">
			<dl class="order_details_top_code clearfloat">
				<dt v-text="'订单编号：'"></dt>
				<dd><span v-text="orderInfo.orderCode"></span></dd>
				<dd class="tetails" v-text="orderStatusText[+orderInfo.orderStatus + 1]"></dd>
			</dl>
			<dl class="clearfloat">
				<dt v-text="'下单时间：'"></dt><dd v-text="orderInfo.createTime"></dd>
			</dl>
			<dl class="clearfloat" v-if="(orderInfo.orderStatus == -1 || orderInfo.orderStatus == 0 || orderInfo.orderStatus == 1)">
				<dt v-text="'预计配送：'"></dt><dd v-text="orderInfo.preSendTime"></dd>
			</dl>
			<dl class="clearfloat" v-if="(orderInfo.orderStatus == 2 || orderInfo.orderStatus ==3 || orderInfo.orderStatus ==4)">
				<dt v-text="'配货时间：'"></dt><dd v-text="orderInfo.readyGoodsTime"></dd>
			</dl>
			<dl class="clearfloat" v-if="(orderInfo.orderStatus == 3 || orderInfo.orderStatus ==4 || orderInfo.orderStatus ==0)">
				<dt v-text="'配送时间：'"></dt><dd v-text="orderInfo.sendTime"></dd>
			</dl>
			<dl class="clearfloat" v-if="(orderInfo.orderStatus == 1 || orderInfo.orderStatus ==2)">
				<dt>&nbsp;</dt><dd v-text="'(请保持电话畅通)'"></dd>
			</dl>
		</div>
		<div class="order_details_add" v-if="orderInfo">
			<div class="order_details_add_top clearfloat">
				<div class="order_details_name" v-text="orderInfo.customName"></div>
				<div class="order_details_phoneNumber" v-text="orderInfo.customMobile"></div>
			</div>
			<p class="order_details_address" v-text="orderInfo.receiveAddress"></p>
			<span class="order_details_arrows hidden" v-text="'〉'"></span>
		</div>
		<ul class="order_details_goods" v-if="orderInfo && orderInfo.orderDetailsList && orderInfo.orderDetailsList.length">
			<li v-for="(item,index) in orderInfo.orderDetailsList" :key="index">
				<dl class="clearfloat">
					<dt class="goodName" v-text="item.goodsName"></dt>
					<dd><span class="color_f27c32" v-text="item.gssPrice"></span>元/{{item.priceUnit}}&nbsp;&nbsp;<span class="color_f27c32" v-text="item.wholeGssPrice"></span>元/{{item.wholePriceSize}}</dd>
					<dd class="order_details_goods_right">X{{item.buyCount}}</dd>
				</dl>
				<dl class="clearfloat">
					<dt>商品总量：{{item.roughWeight}}x{{item.buyCount}}={{item.roughWeight*item.buyCount}}斤</dt>
					<dd></dd>
					<dd class="order_details_goods_right">总价：{{item.costMoney}}元</dd>
				</dl>
				<div class="order_details_goods_ clearfloat" v-if="(orderInfo.orderStatus == 3 || orderInfo.orderStatus ==4)">
					<dl class="clearfloat">
						<dt>实际总重:</dt>
						<dd><span>{{item.afterWholePriceSize}}斤</span></dd>
					</dl>
					<dl class="clearfloat">
						<dt>实际总价:</dt>
						<dd><span>{{item.afterCostMoney}}元</span></dd>
					</dl>
				</div>
			</li>
		</ul>
		<!--备注信息-->
		<div class="order_details_make" v-if="orderInfo">
			备注：<input type="text" name="" id="remark" v-model="orderInfo.customRequest" disabled />
		</div>
		<!--配送费用说明-->
		<div class="order_details_distribution" v-if="orderInfo" >
			配送费用：<span class="logistic_price" v-text="orderInfo.postCost+'元'"></span>
				<button class="logistic_show" v-show="(orderInfo.orderStatus == 1 || orderInfo.orderStatus == 2 || orderInfo.orderStatus == 3)" data-type="#PS-DESC" @click="get_desc">配送说明</button>
		</div>
		<!--优惠-->
		<div class="order_details_coupon_box" v-if="orderInfo">
			<!--优惠策略-->
			<div class="order_details_coupon_box2" v-if="((orderInfo.orderStatus == 3 && offItem.id ) || (orderInfo.orderStatus == 4 && orderInfo.offMoney))">
				<dl class="clearfloat">
					<dt>优惠策略:</dt>
					<dd class="order_coupon_price" v-text="(orderInfo.orderStatus == 3 && offItem.id ) ? offItem.itemName : parseInt(orderInfo.offMoney).toFixed(2)+'元'" :data="(orderInfo.orderStatus == 4 && orderInfo.offMoney) ? parseInt(orderInfo.offMoney).toFixed(2) : null"></dd>
				</dl>
			</div>
			<!--vip优惠-->
			<div class="order_details_coupon_box3" v-if="orderInfo.vipMoney && (orderInfo.orderStatus == 3 || orderInfo.orderStatus == 4)" >
				<dl class="clearfloat">
					<dt>VIP优惠:</dt>
					<dd class="order_coupon_price" v-text="parseInt(orderInfo.vipMoney).toFixed(2)" :data="parseInt(orderInfo.vipMoney).toFixed(2)"></dd>
				</dl>
			</div>
			<!--其他优惠-->
			<div class="order_details_coupon_box4" v-if="orderInfo.goodsDiscountMoney && (orderInfo.orderStatus == 3 || orderInfo.orderStatus == 4)" >
				<dl class="clearfloat">
					<dt>其他优惠:</dt>
					<dd class="order_coupon_price" v-text="parseInt(orderInfo.goodsDiscountMoney).toFixed(2)" :data="parseInt(orderInfo.goodsDiscountMoney).toFixed(2)"></dd>
				</dl>
			</div>
			<!--优惠券-->
			<div class="order_details_coupon_box1 conpon_item_box clearfloat" v-if="couponList && (orderInfo.orderStatus == 3 || (orderInfo.couponMoney && orderInfo.orderStatus == 4))">
				<dl class="order_details_coupon clearfloat" v-if="couponList" v-for="(item,index) in couponList" :key="index" @click="selectCoupon(item)">
					<dt v-text="item.title"></dt>
					<dd class="order_coupon_price" v-text="getCouponText(item)"></dd>
				</dl>
			</div>
			<!-- <div class="order_details_coupon_box1 conpon_item_box clearfloat" v-if="orderInfo.orderStatus == 3 || (orderInfo.couponMoney && orderInfo.orderStatus == 4)" @click="toCoupon(1)">
				<dl class="order_details_coupon clearfloat">
					<dt>优惠券:（单选）</dt>
					<dd class="order_coupon_price" v-if="couponMoney != null">已选：-{{couponMoney}}元</dd>
					<dd class="order_coupon_price" v-if="couponMoney == null">{{this.couponNum}}张可用</dd>
				</dl>
			</div>
			<div class="order_details_coupon_box1 conpon_item_box clearfloat" v-if="orderInfo.orderStatus == 3 || (orderInfo.couponMoney && orderInfo.orderStatus == 4)" @click="toCoupon(2)">
				<dl class="order_details_coupon clearfloat">
					<dt>商品券:（可多选）</dt>
					<dd class="order_coupon_price">暂无可用优惠券</dd>
				</dl>
			</div>
			<div class="order_details_coupon_box1 conpon_item_box clearfloat" v-if="orderInfo.orderStatus == 3 || (orderInfo.couponMoney && orderInfo.orderStatus == 4)" @click="toCoupon(3)">
				<dl class="order_details_coupon clearfloat">
					<dt>商品类目券:（可多选）</dt>
					<dd class="order_coupon_price">暂无可用优惠券</dd>
				</dl>
			</div> -->
			<div class="order_details_coupon_box11" v-if="orderInfo.orderStatus == 3">
				点击去支付后，不能重新选择优惠券，请谨慎操作！
			</div>
		</div>
		<!--订单总金额-->
		<div class="order_details_money" v-if="orderInfo && orderInfo.orderStatus == 1">
			<dl class="clearfloat">
				<dt>订单总金额:</dt>
				<dd><span class="color_f27c32" v-text="parseFloat(orderInfo.orderMoney).toFixed(2)"></span>元</dd>
			</dl>
			<p>(实际金额按照收货时实际称重结算)</p>
		</div>
		<!--订单金额详情-->
		<div class="order_details_money_details" v-if=" orderInfo && (orderInfo.orderStatus == 2 || orderInfo.orderStatus == 3 || orderInfo.orderStatus == 4)">
			<dl class="clearfloat">
				<dt>订单总金额:</dt>
				<dd><span class="color_f27c32">{{orderInfo.goodsMoney}}</span>元</dd>
			</dl>
			<dl class="clearfloat">
				<dt>应付金额:</dt>
				<dd v-text="(orderInfo.orderStatus == 2) ? '(按实际称重核算后计算)' : parseFloat(orderInfo.shouldPayMoney).toFixed(2) + '元' "></dd>
			</dl>
			<dl class="clearfloat">
				<dt>优惠金额:</dt>
				<dd v-text="(getCouponMoney == '?' ? '?元' : '-'+getCouponMoney+'元') "></dd>
			</dl>
			<dl class="clearfloat">
				<dt>实际金额:</dt>
				<dd v-text="(getRealMoney == '?' ? '?元' : getRealMoney+'元')"></dd>
			</dl>
		</div>
		<div class="order_details_cancel" v-if="orderInfo && (orderInfo.orderStatus == 1 || orderInfo.orderStatus == -1 || orderInfo.orderStatus == 3)" v-text="orderStatusBtnText[+orderInfo.orderStatus +1]"></div>
		<explainAlert :noticeInfoList="noticeInfoList" v-if="noticeInfoList"  v-on:listenClose = "closeAlert"> </explainAlert>
    </div>
 </div>
</template>

<script>
import appHeader from "../../components/public/header.vue";
import explainAlert from  "../../components/public/alert.vue";

import { getSystem , getMessage , getIsLogin , getTokenId , getUserData, getSecretKey } from "../../common/common.js";
export default {
    data() {
        return {
            headerMsg:{
				type:"common",
				title:'订单详情',
				left:'返回'
			},
			noticeInfoList:null,
			orderInfo:null,
			descCode: "#PS-DESC",
			websiteNode:this.websiteDate.code,
			orderCode:null,
			couponList:[],
			orderStatusText:['已作废','','待发货','已配货','待支付','已支付'],
			orderStatusBtnText:['删除订单','','取消订单','','去支付','']
        }
    },
    components: {
		appHeader,
		explainAlert
  	},
  	created:function() {
		this.couponNum = this.$route.query.couponNum
	},
	computed:{
		getCouponMoney(){
			let m = '';
			if (this.orderInfo.orderStatus == 2) {
				return '?'
			} else {
				m = 0;
				if (this.orderInfo.goodsDiscountMoney) {
					m = m + parseFloat(this.orderInfo.goodsDiscountMoney)
				}
				if (this.orderInfo.vipMoney) {
					m = m + parseFloat(this.orderInfo.vipMoney)
				}
				if (this.orderInfo.offMoney) {
					m = m + parseFloat(this.orderInfo.offMoney)
				}
				if (this.couponList && this.couponList.length) {
					this.couponList.forEach((item)=>{
						m = m + parseFloat(item.couponMoney)
					})
				}
				return m.toFixed(2);
			}
			
		},
		getRealMoney(){
			let m = '';
			if (this.orderInfo.orderStatus == 2) {
				return '?'
			} else if (this.orderInfo.orderStatus == 3 || this.orderInfo.orderStatus == 4){
				if ((this.orderInfo.orderStatus == 3 && this.orderInfo.isGoToPay == 1) || this.orderInfo.orderStatus=='4') {
					return (parseFloat(this.orderInfo.realPayMoney)).toFixed(2)
				}else{
					return ((parseFloat(this.orderInfo.realPayMoney) - parseFloat(this.getCouponMoney))).toFixed(2)
				}
			}
		}
	},
  	mounted() {
		let sessCode = sessionStorage.getItem('orderData')
		this.orderCode = JSON.parse(sessCode).code;
		if (getIsLogin()) {
            this.tokenId = getTokenId();
            const userInfo = JSON.parse(getUserData());
            this.userBasicParam = {
                firmId : userInfo.firmInfoid,
                source : 'firmId'+userInfo.firmInfoid,
                sign : this.$md5('firmId'+userInfo.firmInfoid+"key"+getSecretKey()).toUpperCase(),
                tokenId : getTokenId()
			}
			this.get_order_detail()
        }
    	
  	},
  	methods: {
        get_order_detail:function () {
			let obj = Object.assign({
				method: "order_details_fou",
				orderCode: this.orderCode,
				},this.userBasicParam);

			this.$ajax.get(this.HOST, {
				params:obj
			}).then(resp => {
				let v = resp.data.data;
					this.offItem = v.offItem;
					this.orderInfo = v.orderInfo;
					this.couponInit(v);
				}).catch(err => {
				console.log('请求失败：'+ err.statusCode);
			});
		},
		couponInit(v){
			this.couponList = [
				//普通的优惠卷
				{
					name:'couponInfo',
					title:'优惠券:（单选）',
					selectId:v.orderInfo.coupon,
					selectData:null,
					couponMoney:v.orderInfo.couponMoney ? v.orderInfo.couponMoney : 0,//优惠卷金额
					useable:v.useable,//可用列表
					unusable:v.unusable//不可用列表
				},
				//商品优惠卷
				{
					name:'goodCouponInfo',
					title:'商品券:（可多选）',
					selectId:v.orderInfo.goodsCoupon ? v.orderInfo.goodsCoupon.join(",") : null,
					selectData:null,
					couponMoney:v.orderInfo.goodsCouponMoney ? v.orderInfo.goodsCouponMoney : 0,//优惠卷金额
					useable:v.guseable,//可用列表
					unusable:v.gunusable//不可用列表
				},
				//类目优惠卷
				{
					name:'typeCouponInfo',
					title:'商品类目券:（可多选）',
					selectId:v.orderInfo.goodsTypeCoupon ? v.orderInfo.goodsTypeCoupon.join(",") : null,
					selectData:null,
					couponMoney:v.orderInfo.goodsTypeCouponMoney ? v.orderInfo.goodsTypeCouponMoney : 0,//优惠卷金额
					useable:v.tuseable,//可用列表
					unusable:v.tunusable//不可用列表
				},
			]
			if(v.orderInfo.orderStatus == 3){
				if (v.orderInfo.isGoToPay == 1) {
					if (v.couponInfo != null) {
						this.couponList[0].couponMoney = v.couponInfo.couponMoney;
					}else{
						this.couponList[0].couponMoney = 0;
					}
				}else{
					if (localStorage.getItem('couponInfo')) {
						this.couponList[0] = JSON.parse(localStorage.getItem('couponInfo'));
					} else {
						let isEmpty = this.couponList[0].useable && this.couponList[0].useable.length != 0;
						this.couponList[0].selectId = isEmpty ? this.couponList[0].useable[0].id : null;
						this.couponList[0].couponMoney = isEmpty ? this.couponList[0].useable[0].couponMoney : 0;
					}
					if (localStorage.getItem('goodCouponInfo')) {
						this.couponList[1] = JSON.parse(localStorage.getItem('goodCouponInfo'));
					}
					if (localStorage.getItem('typeCouponInfo')) {
						this.couponList[2] = JSON.parse(localStorage.getItem('typeCouponInfo'));
					}
					
					
				}
			}
		},
		desc_data:function(){
			this.$ajax.get(this.HOST, {
				params:{
					method:'gss_desc',
					websiteNode:this.websiteNode,
					code:this.websiteNode + this.descCode
				}
			}).then(resp => {
					resp.data.data.noticeContent =  (resp.data.data.desc.toString()).replace(/\r\n/g, '<br/>');
					resp.data.data.noticeTitle =  resp.data.data.title;
					resp.data.data.alertType = 1;
					this.noticeInfoList = resp.data.data;
			}).catch(err => {
				console.log('请求失败：'+ err.data.statusCode);
			});
		},
		get_desc() {
			this.desc_data()
		},
		closeAlert:function(){
            this.noticeInfoList = null;
		},
		selectCoupon(item) {
			let dataType = item.name;
			localStorage.setItem(dataType,JSON.stringify(item));
			this.$router.push({path:'/chooseCoupon',query:{dataType:dataType}})
		},
		getCouponText(item){
			let obj = {
				status:0,//0表示--暂无优惠卷可用 1表示有优惠卷但是没有选择 3表示已经选择优惠卷 4表示已绑定状态
				num:0,//表示可用优惠卷的张数
				money:0,//表示优惠卷的金额
				dataId:[],//表示所选优惠卷的ID列表
			}
			console.log(item)
			if (this.orderInfo.orderStatus == 3 || this.orderInfo.orderStatus == 4) {
				if (this.orderInfo.orderStatus == 3 ) {
					if (this.orderInfo.isGoToPay) {
						obj.status = 4;
						obj.money = item.couponMoney ? item.couponMoney : 0
					}else{
						if (item.useable && item.useable.length ) {
							if (item.selectId) {
								if (item.selectId instanceof Array) {
									if (item.selectId.length == 0) {
										obj.status = 1;
										obj.num = item.useable.length;
									}else{
										obj.status = 3;
										obj.money = item.couponMoney;
										obj.dataId = item.selectId;
									}
								}else{
									obj.status = 3;
									obj.money = item.couponMoney;
									obj.dataId = item.selectId;
								}
							}else{
								obj.status = 1;
								obj.num = item.useable.length;
							}
						}else{
							obj.status = 0;
							obj.num = 0;
						}
					}
				}else{
					if (item.couponMoney) {
						return parseInt(item.couponMoney).toFixed(2);
					}else{

					}
				}
			}
			if (obj.status == 0) {
				return '暂无优惠卷可用'
			}
			if (obj.status == 1) {
				return obj.num + '张可用'
			}
			if (obj.status == 3) {
				return '已选：-'+parseInt(obj.money).toFixed(2)+'元'
			}
			if (obj.status == 4) {
				return "已绑定："+parseInt(obj.money).toFixed(2)+"元"
			}
		}
	},
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
