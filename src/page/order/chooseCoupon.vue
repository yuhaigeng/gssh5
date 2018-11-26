<template>
	<div class="common-wrap">
		<app-header :type="headerMsg">
			<div slot="commonAlert" @click="get_desc" v-if="dataType == 0">使用说明</div>
		</app-header>

		<!--选择优惠卷-->
		<div class="main-wrap coupon_main_wrap">
			<div class="main">
				<div class="select_coupon_top" :class="{selectTop:isUse}" @click="noUse">不使用优惠券</div>
				<div class="coupon_main_" v-if="coupon[dataType]">
					<div class="coupon_main_available_box" v-if="coupon[dataType].useable && coupon[dataType].useable.length">
						<p class="title" >可用优惠券</p>
						<div class="coupon_main_available">
							<dl class="clearfloat coupon_status1"  v-for="(item, index) in coupon[dataType].useable" :key="index" :class="{'active':(coupon[dataType].selectId.split(',')).indexOf(item.id) != -1 ,'no':dataType != '0'}" @click="choose(item)">
								<dt class="sprite_login quan_c" v-text="item.couponMoney">元</dt>
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
					<div class="coupon_main_unAvailable_box" v-if="coupon[dataType].unusable && coupon[dataType].unusable.length">
						<p class="title">不可用优惠券</p>
						<div class="coupon_main_unAvailable">
							<dl class="clearfloat coupon_status1" v-for="(item, index) in coupon[dataType].unusable" :key="index">
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
		<agreementAlert :noticeInfoList="noticeInfoList" v-if="noticeInfoList"  v-on:listenClose = "closeAlert"> </agreementAlert>
		<order-footer v-if="dataType" :couponObj="coupon[dataType]" v-on:listenSubmit = "submitCoupon"></order-footer>
	</div>
</template>

<script>
import appHeader from "../../components/public/header.vue";
import agreementAlert from  "../../components/public/alert.vue";
import orderFooter from  "./footerOrder.vue";
export default {
    name: 'chooseCoupon',
    data() {
        return {
            headerMsg:{
              type:"common",
              title:'',
              left:'返回',
            },
			websiteNode:this.websiteDate.code,
			descCode:'#YHQ-DESC',
			noticeInfoList:null,
			isRight:0,
			isUse:false,
			coupon:[],
			couponNum:'',
			dataType:'',
			cache:{}
        }
    },
    components: {
		appHeader,
		agreementAlert,
		orderFooter,
	},
	watch:{
		coupon(val,oldVal){
			if (val) {
				localStorage.setItem('selectCoupon',JSON.stringify(val))
			}
		}
	},
	mounted() {
		this.coupon = JSON.parse(localStorage.getItem('selectCoupon'));
		this.dataType = this.$route.query.dataType;
		this.headerMsg.title = '选择'+this.coupon[this.dataType].title;
		document.querySelectorAll("body")[0].scrollTop = 0;
	},
    methods: {
		desc_data:function(){
      let obj = {
        method:'gss_desc',
        websiteNode:this.websiteNode,
        code:this.websiteNode + this.descCode
      }
			this.$ajax.get(this.HOST, {
				params:obj
			}).then(resp => {
				if (resp.data.statusCode == 100000) {
          let data = resp.data.data
					data.noticeContent = (data.desc.toString()).replace(/\r\n/g, '<br/>');
				  data.noticeTitle =  data.title;
					data.alertType = 1;
					this.noticeInfoList = data;
					let key = this.websiteNode + this.descCode ;
					let obj = '{'+'"'+key+'"'+':'+JSON.stringify(data)+'}'
					this.cache = Object.assign(this.cache,JSON.parse(obj))
				} else {
					this.$toast({
						message : data.statusStr,
						position: 'middle',//top boottom middle
						duration: 2000,//延时多久消失
						//iconClass: 'mint-toast-icon mintui mintui-field-warning'
						//.mintui-search .mintui-more .mintui-back.mintui-field-error .mintui-field-warning .mintui-success .mintui-field-success
					})
				}
			}).catch(err => {
				console.log('请求失败：'+ err.data.statusCode);
			});
		},
		get_desc() {
            // console.log(this.cache[this.websiteNode+this.descCode])
      if (this.cache[this.websiteNode+this.descCode]) {
          this.noticeInfoList = this.cache[this.websiteNode+this.descCode]
      }else{
          this.desc_data()
      }
		},
		closeAlert:function(){
            this.noticeInfoList = null;
		},
		choose(item) {
      const _this = this;
      let coupon = 	this.coupon[this.dataType]
			if (coupon.name == 'couponInfo') {
			  coupon.selectId = item.id;
				coupon.couponMoney = item.couponMoney;
				setTimeout(() => {
					this.$router.go(-1)
				}, 100);
			} else {
				let id = item.id;
				let money = item.money;

				if (coupon.selectId) {
					console.log(coupon.selectId)
					var arr = (coupon.selectId).split(',');
					console.log(arr)
					if (arr.indexOf(id) == -1) {
						//表示该项没有被选中
						coupon.selectId += ','+id;
					}else{
						//表示该项已经被选中
						arr.splice(arr.indexOf(id), 1);
						console.log(arr)
						if (arr.length) {
						coupon.selectId = arr.join(',');
						}else{
							coupon.selectId = '';
						}
					}
				}else{
				coupon.selectId = id;
				}
			}
		},
		noUse(couponNum) {
      let coupon = 	this.coupon[this.dataType]
			coupon.selectId = '';
			coupon.couponMoney = 0;
			this.$router.go(-1)
		},
		submitCoupon(data){
			this.coupon[this.dataType].couponMoney = data;
			this.$router.go(-1)
			console.log('subMitCoupon')
		}
	},
    //离开当前页面后执行
	destroyed: function () {
		console.log('end')
		localStorage.setItem('selectCoupon',JSON.stringify(this.coupon))
	},
}
</script>

<style scoped>
.coupon_main_wrap{
	margin-bottom: 0;
    margin-top: 107px;
}
.active {
	background: #fff url('../../assets/img/coupon_active.png') no-repeat right top;
}
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
}

 .selectTop {
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
.coupon_main_available .coupon_status1.no {background:#fff url(../../assets/img/coupon_active_no.png) no-repeat right top;}

.coupon_main_available .coupon_status1.no.active{background:#fff url(../../assets/img/coupon_active.png) no-repeat right top;}

</style>
