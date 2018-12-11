<template>
	<div class="common-wrap">
		<app-header :type="headerMsg"></app-header>
		<div class="main-wrap often_shop_main_wrap">
			<ul>
				<li class="line-wrapper" v-for="(item,index) in collectList" :key="item.goodsInfoId" @click="toDetail(item)">
					<mt-cell-swipe :right="rightButtons(index)">
						<dl class="line-normal-wrapper clearfloat">
							<dt class="line-normal-avatar-wrapper">
								<img v-lazy="item.goodsInfo.goodsLogo"/>
								<span v-if="item.goodsInfo.vipGrade > 0" :class = "'icon_vip'+ item.goodsInfo.vipGrade"></span>
							</dt>
							<dd class="line-normal-info-wrapper">
								<div class="often_shop_goods_top clearfloat">
									<p class="often_shop_goods_tit" v-text="item.goodsInfo.goodsName"></p>
									<p class="often_shop_goods_icon">
										<span v-if="item.isSale" class = "icon_cu"></span>
										<span v-if="item.isNew" class = "icon_ji"></span>
										<span v-if="item.isRecommend" class = "icon_jian"></span>
										<span v-if="item.isHot" class = "icon_re"></span>
									</p>
								</div>
								<p class="often_shop_show" v-text="item.goodsInfo.goodsShows"></p>
								<div class="often_shop_NumPir">
									<div class="os_pir">
										<span class="often_shop_color" v-text="item.goodsInfo.gssPrice"></span>元/{{item.goodsInfo.priceUnit}}&nbsp;&nbsp;<span v-text="item.goodsInfo.priceDesc"></span>
									</div>
									<div class="os_Num">
										<b class='bStyle' v-if="getNumText(item.goodsInfo)" v-text="getNumText(item.goodsInfo)" ></b>
										<span v-if="!getNumText(item.goodsInfo)" v-show="getGoodNum(item.goodsInfo.id)" class="goodsNumber_min"  v-on:click.stop="cutGood(item.goodsInfo)"><img src="../../assets/img/btn_m@2x.png"/></span>
										<span v-if="!getNumText(item.goodsInfo)" v-show="getGoodNum(item.goodsInfo.id)" class="goodsNumber fontColor" v-text="getGoodNum(item.goodsInfo.id)"></span>
										<span v-if="!getNumText(item.goodsInfo)" class="goodsNumber_max" v-on:click.stop="addGood(item.goodsInfo,$event)"><img src="../../assets/img/btn_a@2x.png"></span>
									</div>
								</div>
							</dd>
						</dl>
					</mt-cell-swipe>
				</li>
        		<p class="lodemore" v-text="isLast ? '没有更多数据了':'点击加载更多'" @click="loadMore"></p>
			</ul>
		</div>
		<app-footer-go-shop :goShopCart="goShopCart" :systemMoney="systemMoney" v-on:listenSubmit="submitGoShopCart"></app-footer-go-shop>
	</div>
</template>

<script>
import appHeader from "../../components/public/header.vue";
import appFooterGoShop from "../../components/footerGoShop.vue";
import { goodlist1 } from "../../common/goods_car.js";
import { getSystem  , getIsLogin , getTokenId , getUserData, getSecretKey } from "../../common/common.js";
export default {
 	data() {
		return {
			headerMsg:{
				type:"common",
				title:'常购商品',
				left:'返回'
			},
			collectList:[],
			goodID:'',
			isLast:false,
			pageNo: this.pageNo,
			pageSize: this.pageSize,
			userId: JSON.parse(localStorage.getItem("user_data")).cuserInfoid,
			//本地购物车
			goShopCart:[],
			systemMoney:-1,//系统参数配置中配置的起售金额
			showMoveDot: [], //控制下落的小圆点显示隐藏
			elLeft: 0, //当前点击加按钮在网页中的绝对top值
			elBottom: 0, //当前点击加按钮在网页中的绝对left值
			receiveInCart: false, //购物车组件下落的圆点是否到达目标位置
			windowHeight: null, //屏幕的高度
		}
	},
	watch:{
		goShopCart: {
			handler:function( val,oldVal ) {
			localStorage.setItem('good',JSON.stringify(val))
			},
			deep:true,
		}
    },
 	components: {
		appHeader,
		appFooterGoShop
	},
	created(){
		var _this = this;
		this.rightButtons = function(index){
			return [
				{
					data:index,
					content: '删除',
					style: { background: 'red', color: '#fff',width:'200px',fontSize:'24px',textAlign:'center',lineHeight:'200px'},
					handler: function(index){
						_this.goodID = _this.collectList[this.data].goodsInfoId;
						_this.get_goods_collect_del(this.data);
					}
				}
			]
		}
	},
	mounted() {
		this.get_goods_collected()
		// 数据初始化
		if (getIsLogin()) {
			this.isLogin = getIsLogin();
			this.tokenId = getTokenId();
			const userInfo = JSON.parse(getUserData());

			this.userBasicParam = {
				firmId : userInfo.firmInfoid,
				source : 'firmId'+userInfo.firmInfoid,
				sign : this.$md5('firmId'+userInfo.firmInfoid+"key"+getSecretKey()).toUpperCase(),
				tokenId : getTokenId()
			}
		}
		if ( localStorage.getItem('system') ) {
			this.systemMoney = JSON.parse(localStorage.getItem('system')).how_much_money_dispatch;
		} else {

		}
		if ( localStorage.getItem('good') ) {
			this.goShopCart = JSON.parse(localStorage.getItem('good'))
		} else {
			this.goShopCart = []
		}
		this.windowHeight = window.innerHeight;
	},
	computed:{
		// 获取宽度
		getTopWidth:function() {
			return (this.goods.length * 164) + 24 +'px'
		},
		// 获取高度
		getLeftHeight:function() {
			const bodyHeight = document.querySelector("body");
			const wrapHeight = document.querySelector(".header-wrap");
			const topHeight  = document.querySelector('.moreDoogs_main_top');
			const footerHeigh = document.querySelector(".footer-wrap");
			let a = parseInt(window.getComputedStyle(bodyHeight).height);
			let b = wrapHeight ? parseInt(window.getComputedStyle(wrapHeight).height) : 87 ;
			let c = topHeight ? parseInt(window.getComputedStyle(topHeight).height):90;
			let d = footerHeight ? parseInt(window.getComputedStyle(footerHeight).height):98;
			let e = a-b-c-d;
			return e + 'px';
		},
	},
	methods:{
		get_goods_collected:function() {
      	let params ={
			method: "goods_collection",
			pageNo: this.pageNo,
			pageSize: this.pageSize,
			firmId: this.firmInfoid,
			userId: this.userId
		}
			this.$ajax.get(this.HOST, {
				params:params
			}).then(resp => {
				if (resp.data.statusCode == 100000) {
					this.isLast = resp.data.data.isLast;
					if (resp.data.data.pageNo == 1) {
						this.collectList = resp.data.data.objects;
					} else {
						this.collectList = this.collectList.concat(resp.data.data.objects);
					}
				} else {
					this.$toast({
						message : data.statusStr,
						position: 'middle',//top bottom middle
						duration: 2000,//延时多久消失
						//iconClass: 'mint-toast-icon mintui mintui-field-warning'
						//.mintui-search .mintui-more .mintui-back.mintui-field-error .mintui-field-warning .mintui-success .mintui-field-success
					})
				}
			}).catch(err => {
				console.log('请求失败：'+ err.statusCode);
			});
		},
		get_goods_collect_del:function (index) {
			let params = {
				method: "goods_collection_del",
				userId: this.userId,
				goodsId: this.goodID
			}
			this.$ajax.get(this.HOST, {
				params:params
			}).then(resp => {
				if(resp.data.statusCode == 100000) {
					const arr = this.collectList;
					const arr1 = arr.splice(index, 1);
					this.collectList =arr;
				}else {
					this.$toast({
						message : data.statusStr,
						position: 'middle',//top bottom middle
						duration: 2000,//延时多久消失
						//iconClass: 'mint-toast-icon mintui mintui-field-warning'
						//.mintui-search .mintui-more .mintui-back.mintui-field-error .mintui-field-warning .mintui-success .mintui-field-success
					})
				}
			}).catch(err => {
				console.log('请求失败：'+ err.statusCode);
			});
		},
		submitGoShopCart(){
			let goodsList = goodlist1();
			let obj = Object.assign({
				method: "settlement_shop_cart",
				goodsList:goodsList,
			},this.userBasicParam)
			this.$ajax.get(this.HOST, {
				params:obj
			}).then(result => {
				return result.data;
			}).then(data => {
				if (data.statusCode=='100000') {
					sessionStorage.setItem('address',JSON.stringify(data.data));
					this.$router.push({path:'/orderSettlement'})
				}else if (data.statusCode=='100903' || data.statusCode=='100907') {
					var orderResult={
						statusCode:data.statusCode,
						orderCode:data.data.orderCode
					}
					sessionStorage.setItem('orderResult',JSON.stringify(orderResult));
					this.$router.push({path:'/orderResult'})
				}else{
					$(".footer-rigth").addClass("true");
					this.$toast({
						message : data.statusStr,
						position: 'middle',//top bottom middle
						duration: 2000,//延时多久消失
						//iconClass: 'mint-toast-icon mintui mintui-field-warning'
						//.mintui-search .mintui-more .mintui-back.mintui-field-error .mintui-field-warning .mintui-success .mintui-field-success
					})
				}
			});
		},
		toDetail(item) {
			const id = item.goodsInfoId;
			sessionStorage.setItem('goodsDetails',JSON.stringify(item.goodsInfo));
			 this.$router.push({ path:'detail', query:{id:id}})
		},
		getNumText(item){
			const msgArr = ['','','不是VIP','等级不足']
			if (item.vipGrade > 0 && (item.state == 2 || item.state == 3) ) {
				return msgArr[item.state]
			} else {
				if ((parseInt(item.initNum) - parseInt(item.saleNum)) <= 0) {
					return '已售罄'
				}else{
					return ''
				}
			}
		},
		getGoodNum(id){
			if(this.goShopCart && this.goShopCart.length) {
				let good = this.goShopCart.filter((item)=>{
					if (item.id == id) {
						return item;
					}
				});
				if (good && good.length) {
					return good[0].sum;
				}
				return 0;
			}else {
				return 0;
			}
		},
		// 购物车相关
		//获取本地商品对象
		getGoodObj(id){
			if (this.goShopCart && this.goShopCart.length) {
				let good = this.goShopCart.filter((item)=>{
					if (item.id == id) {
						return item;
					}
				});
				if (good && good.length) {
					return good[0];
				}
				return null;
			} else {
				return null;
			}
		},
		// 添加商品
		addGood(item,event){
			let good = this.getGoodObj(item.id)
			if (good) {
				//先判断库存和限购  在执行加操作
				if ( +good.sum < +item.packageNum) {
					if(+item.maxCount > 0){
						if( +good.sum < +item.maxCount){
							good.sum = parseInt(good.sum) + 1;

							let elLeft = event.target.getBoundingClientRect().left;
							let elTop = event.target.getBoundingClientRect().top;

							this.sport(elLeft,elTop)
						}else{
							this.$toast({
								message : "该商品限购"+item.maxCount+"件",
								position: 'middle',//top bottom middle
								duration: 2000,//延时多久消失
								//iconClass: 'mint-toast-icon mintui mintui-field-warning'
								//.mintui-search .mintui-more .mintui-back.mintui-field-error .mintui-field-warning .mintui-success .mintui-field-success
							})
						}
					}else{
						good.sum = parseInt(good.sum) + 1;
						let elLeft = event.target.getBoundingClientRect().left;
						let elTop = event.target.getBoundingClientRect().top;
						this.sport(elLeft,elTop)
					}
				}else {
					this.$toast({
						message : "库存不足",
						position: 'middle',//top bottom middle
						duration: 2000,//延时多久消失
						//iconClass: 'mint-toast-icon mintui mintui-field-warning'
						//.mintui-search .mintui-more .mintui-back.mintui-field-error .mintui-field-warning .mintui-success .mintui-field-success
					})
				}
			} else {
				let obj = {
				"id":item.id,
				"name":item.goodsName,
				"sum":1,
				"price":item.wholeGssPrice,
				"wholePriceSize":item.wholePriceSize,
				"gssPrice":item.gssPrice,
				"priceUnit":item.priceUnit,
				"packageNum":item.packageNum,
				"maxCount":item.maxCount
				}
				let elLeft = event.target.getBoundingClientRect().left;
				let elTop = event.target.getBoundingClientRect().top;
				this.sport(elLeft,elTop)
				this.goShopCart.push(obj)
			}
		},
		// 减少商品
		cutGood(item){
			let good = this.getGoodObj(item.id)
			if (good.sum == 1) {
				this.goShopCart.splice(this.goShopCart.indexOf(good),1);
			} else {
				good.sum = parseInt(good.sum) - 1;
			}
		},
		sport(x,y){
			var $ele = $(".gw_car_num");
			if($ele.is(':visible')){
				var xEnd=$ele.offset().left+$ele.width()/4;
				var yEnd=$ele.offset().top;
			}else{
				var xEnd = 86,
				yEnd = this.windowHeight - 110;
			}
			var xStar=x;
			var yStar=y;
			var main_obj=$('<div></div>');
			var new_obj=$("<span></span>");
			$('body').append(main_obj)
			main_obj.append(new_obj);
			new_obj.css({
				'width': '20px',
				'height': '20px',
				'position': 'absolute',
				'background': '#f56d15',
				"border-radius":"50%",
				'z-index':'600',
				"top":yStar,
				"left":xStar
			}).animate({
				left:xEnd,
				top:yEnd
			},800,function(){
				main_obj.remove();
			})
		},
		loadMore:function(){
			if(!this.isLast){
				this.pageNo ++
				this.get_goods_collected()
			}
		}
	}
}
</script>

<style scoped>
.bStyle{
    color:red;
    text-align:center;
    width:100px;
    height:64px;
    line-height:64px;
    display:inline-block;
    font-size: 24px;
}
.icon_vip1 {
	display: block;
	position: absolute;
	width: 62px;
	height: 32px;
	background: url(../../assets/img/vip_icon1_square_active.png);
	top: 15px;
	left: 15px;
}

.icon_vip2 {
	display: block;
	position: absolute;
	width: 62px;
	height: 32px;
	background: url(../../assets/img/vip_icon2_square_active.png);
	top: 15px;
	left: 15px;
}

.icon_vip3 {
	display: block;
	position: absolute;
	width: 62px;
	height: 32px;
	background: url(../../assets/img/vip_icon3_square_active.png);
	top: 15px;
	left: 15px;
}

.icon_vip4 {
	display: block;
	position: absolute;
	width: 62px;
	height: 32px;
	background: url(../../assets/img/vip_icon4_square_active.png);
	top: 15px;
	left: 15px;
}
 .fontColor {
	color: #eb5c2b;
	font-size: 28px;
}
.goodsNumber {
	padding: 0 10px;
	font-size: 24px
}
.main-wrap {
	max-width: 750px;
	width: 100%;
	margin: 97px  auto  108px;
	background: #ebeaea;
}
.often_shop_main_wrap ul {
	width: 100%;
	margin-top: 10px;
	background: #FFF
}
.line-wrapper {
	width: 100%;
	overflow: hidden;
}

.line-normal-wrapper {
	float: left;
	width: 750px;
	height: 200px;
	margin-left: -15px;
}

.line-normal-avatar-wrapper {
	float: left;
	width: 200px;
	height: 200px;
	padding: 20px;
	position: relative;
}

.line-normal-avatar-wrapper img {
	width: 100%;
	height: 100%
}

.line-normal-info-wrapper {
	float: left;
	width: 550px;
	height: 200px;
	padding-top: 18px;
	border-bottom: 1px solid #666
}

.often_shop_goods_top p {
	float: left;
	height: 40px;
	font-size: 30px;
	color: #000
}

.often_shop_goods_top .often_shop_goods_tit {
	font-weight: 700;
}

.often_shop_goods_top .often_shop_goods_icon {
	float: right;
	padding-right: 24px
}

.often_shop_show {
	width: 550px;
	height: 72px;
	line-height: 36px;
	padding-right: 90px;
	color: #999;
	font-size: 24px
}

.os_pir {
	float: left;
	font-size: 26px;
	color: #999;
	line-height: 36px
}

.often_shop_color {
	color: #F76A10;
	font-size: 30px
}

.os_Num {
	float: right;
	padding-right: 8px
}
</style>
