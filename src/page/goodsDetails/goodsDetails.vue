<template>
 	<div class="detail common-wrap">
    <div class="header-wrap goodsDetails_header">
			<div class="header_left header_back sprite icon_delete" @click="back"></div>
			<div class="header_right header_collect sprite" :class="isCollect?'icon_collect_a':'icon_collect_b'" @click="changeCollect"></div>
		</div>
		<div class="main-wrap goods_detaile_wrap">
			<div class="main">
				<div class="goodsDetails_img_box">
					<goodsBanner :imgList = "bannerDate" :height = "'600px'" v-if="bannerDate.length"></goodsBanner>
				</div>
				<ul class="goodsDetails_box1_center">
					<li class="clearfloat goodsDetails_box1_center_li1">
						<div class="goodsDetails_text" v-text="detailList.goodsShows"></div>
						<div class="moreGoods_goods_number clearfloat">
							<b class='bStyle' v-if="getNumText(detailList)" v-text="getNumText(detailList)" ></b>
							<span v-if="!getNumText(detailList)" v-show="getGoodNum(detailList.id)" class="goodsNumber_min"  v-on:click.stop="cutGood(detailList)"><img src="../../assets/img/btn_m@2x.png"/></span>
							<span v-if="!getNumText(detailList)" v-show="getGoodNum(detailList.id)" class="goodsNumber fontColor" v-text="getGoodNum(detailList.id)"></span>
							<span v-if="!getNumText(detailList)" class="goodsNumber_max" v-on:click.stop="addGood(detailList,$event)"><img src="../../assets/img/btn_a@2x.png"></span>
						</div>
					</li>
					<li class="clearfloat">
						<div class="goodsDetails_box_left">
							单价：<span v-if="logined"><span class="color_f27c32" v-text="detailList.gssPrice"></span>元/{{detailList.priceUnit}}</span>
							<span v-else></span>
						</div>
						<div class="goodsDetails_box_right">
							总价: <span v-if="logined" v-text="detailList.priceDesc"></span>
							<span v-else></span>
						</div>
						<div class="goodsDetails_box_left" v-text="'产地：' + detailList.sourceCityName"></div>
						<div class="goodsDetails_box_right" v-text="'规格：' + detailList.sizeDesc"></div>
					</li>
				</ul>
			</div>
			<div class="goodsDetails_box2">
				<h4><span></span>&nbsp;&nbsp;商品详情</h4>
				<div class="goodsDetails_box2_" v-html="detailList.goodsContext"></div>
			</div>
    </div>
		<app-footer-go-shop :goShopCart="goShopCart" :systemMoney="systemMoney" v-on:listenSubmit="submitGoShopCart"></app-footer-go-shop>
 	</div>
</template>

<script>
import appFooterGoShop from "../../components/footerGoShop.vue";
import goodsBanner from "../../page/banner/goodsBanner.vue";
import { goodlist1 } from "../../common/goods_car.js";
import $ from 'jquery';
import { getSystem  , getIsLogin , getTokenId , getUserData, getSecretKey } from "../../common/common.js";
export default {
	name:'goodsDetail',
 	data() {
 		return {
			isCollect: false,
			logined:getIsLogin(),
			detailList: [],
			bannerDate:[],
			userId:[],
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
		appFooterGoShop,
		goodsBanner
 	},
	created:function() {
		this.goodsId = this.$route.params.id
 	},
	mounted(){
		// 数据初始化
		if (getIsLogin()) {
			const userInfo = JSON.parse(getUserData());
			this.userBasicParam = {
				firmId : userInfo.firmInfoid,
				source : 'firmId'+userInfo.firmInfoid,
				sign : this.$md5('firmId'+userInfo.firmInfoid+"key"+getSecretKey()).toUpperCase(),
				tokenId : getTokenId()
			}
			this.userId = userInfo.cuserInfoid;
			this.firmId = userInfo.firmInfoid;
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
		this.get_goods_detail()
	},
	computed:{
		// 获取宽度
		getTopWidth:function(){
			return  (this.goods.length * 164) + 24 +'px'
		},
		// 获取高度
		getLeftHeight:function(){
			const  bodyHeight  =  document.querySelector("body");
			const  wrapHeight  =  document.querySelector(".header-wrap");
			const  topHeight   =  document.querySelector('.moreDoogs_main_top');
			const  footerHeight =  document.querySelector(".footer-wrap");
			let a = parseInt(window.getComputedStyle(bodyHeight).height);
			let b =   wrapHeight ? parseInt(window.getComputedStyle(wrapHeight).height) : 87 ;
			let c = topHeight ? parseInt(window.getComputedStyle(topHeight).height):90;
			let d =  footerHeight ? parseInt(window.getComputedStyle(footerHeight).height):98;
			let e = a-b-c-d;
			return e + 'px';
		},
	},
	methods:{
		get_goods_detail:function () {
			this.$ajax.get(this.HOST, {
				params:{
					method: "goods_get_by_id_two",
					goodsId: this.goodsId,
					userId: this.userId
				}
			}).then(resp => {
				if (resp.data.statusCode == 100000) {
					this.detailList = resp.data.data;
					const list = this.detailList.goodsPics.split('@');
					list.pop();
					this.bannerDate = list;
					this.isCollect = (resp.data.data.isColl > 0 ? true : false)
				} else {
					this.$toast({
						message : data.statusStr,
						position: 'boottom',//top boottom middle
						duration: 2000,//延时多久消失
						//iconClass: 'mint-toast-icon mintui mintui-field-warning'
						//.mintui-search .mintui-more .mintui-back.mintui-field-error .mintui-field-warning .mintui-success .mintui-field-success
					})
				}
			}).catch(err => {
				console.log('请求失败：'+ err);
			});
		},
		get_goods_collectAdd:function () {
			this.$ajax.get(this.HOST, {
				params:{
					method: "goods_collection_add",
					goodsId: this.goodsId,
					firmId: this.firmId,
					userId: this.userId
				}
			}).then(resp => {
				if (resp.data.statusCode == 100000) {
					this.isCollect = true
					this.$toast({
						message : '收藏成功',
						position: 'boottom',//top boottom middle
						duration: 2000,//延时多久消失
						//iconClass: 'mint-toast-icon mintui mintui-field-warning'
						//.mintui-search .mintui-more .mintui-back.mintui-field-error .mintui-field-warning .mintui-success .mintui-field-success
					})
				} else {
					
				}
			}).catch(err => {
				console.log('请求失败：'+ err.statusCode);
			});
		},
		get_goods_collect_del:function (index) {
			this.$ajax.get(this.HOST, {
				params:{
					method: "goods_collection_del",
					goodsId: this.goodsId,
					firmId: this.firmId,
					userId: this.userId
				}
			}).then(resp => {
				if (resp.data.statusCode == 100000) {
					this.isCollect = false;
					this.$toast({
						message : '取消收藏成功',
						position: 'boottom',//top boottom middle
						duration: 2000,//延时多久消失
						//iconClass: 'mint-toast-icon mintui mintui-field-warning'
						//.mintui-search .mintui-more .mintui-back.mintui-field-error .mintui-field-warning .mintui-success .mintui-field-success
					})
				} else {
					
				}
			}).catch(err => {
				console.log('请求失败：'+ err.statusCode);
			});
		},
		goVip() {
			this.$router.push({path:'/vip'})
		},
		changeCollect(){
			if(this.isCollect){
				this.get_goods_collect_del();
			}else {
				this.get_goods_collectAdd()
			}
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
						position: 'boottom',//top boottom middle
						duration: 2000,//延时多久消失
						//iconClass: 'mint-toast-icon mintui mintui-field-warning'
						//.mintui-search .mintui-more .mintui-back.mintui-field-error .mintui-field-warning .mintui-success .mintui-field-success
					})
				}
			});
	  },
	  getNumText(item){
			const msgArr = ['','','不是VIP','等级不足']
			if (item.vipGrade > 0 && (item.state == 2 || item.state == 3) ) {
				return msgArr[item.state]
			} else {
				let text = ((parseInt(item.initNum) - parseInt(item.saleNum)) <= 0) ? '已售罄' : ''
				return text;
			}
		},
		getGoodNum(id){
			if (this.goShopCart && this.goShopCart.length) {
				let good = this.goShopCart.filter((item)=>{
					if (item.id == id) {
						return item;
					}
				});
				if (good && good.length) {
					return good[0].sum;
				}
				return 0;
			} else {
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
								position: 'boottom',//top boottom middle
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
				} else{
					this.$toast({
						message : "库存不足",
						position: 'boottom',//top boottom middle
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
		back(){
			this.$router.go(-1);
		},
		
	}
}
</script>

<style scoped>
.icon_vip1 {
	display: inline-block;
	width: 62px;
	height: 32px;
	margin-left: 20px;
	background: url(../../assets/img/vip_icon1_square_active.png);
}

.icon_vip2 {
	display: inline-block;
	width: 62px;
	height: 32px;
	margin-left: 20px;
	background: url(../../assets/img/vip_icon2_square_active.png);
}

.icon_vip3 {
	display: inline-block;
	width: 62px;
	height: 32px;
	margin-left: 20px;
	background: url(../../assets/img/vip_icon3_square_active.png);
}

.icon_vip4 {
	display: inline-block;
	width: 62px;
	height: 32px;
	margin-left: 20px;
	background: url(../../assets/img/vip_icon4_square_active.png);
}
.bStyle{
    color:red;
    text-align:center;
    width:100px;
    height:64px;
    line-height:64px;
    display:inline-block;
    font-size: 24px;
}
.fontColor{
	margin: 0 10px;
}
.color_f27c32 {
	color: #f27c32
}
.goodsDetails_img_box {
	width: 100%;
	height: 600px;
	overflow: hidden;
	position: relative
}

.goodsDetails_img_box img {
	width: 100%;
	height: 100%
}

.goodsDetails_img_box .swiper-slide {
	background: url(../../assets/img/pic_logo@2x.png) no-repeat center;
	background-size: auto;
}
.main {
	width: 100%;
	height: auto;
}
.main-wrap {
	max-width: 750px;
	width: 100%;
	margin: 0 auto;
	background: #ebeaea;
}
.goods_detaile_wrap .describe {
	font-size: 22px;
	color: #6f6f6f;
	height: 44px;
	padding: 0 20px;
	line-height: 44px;
}
.goods_detaile_wrap {
	margin-top: 0
}
 .goodsDetails_box2_ {
	margin-bottom: 10px;
}
.goodsDetails_box2 {
	font-size: 24px;
	line-height: 36px;
	background: #FFF;
	color: #000;
}

.goodsDetails_box2 h4 {
	height: 58px;
	line-height: 58px;
	border-bottom: 1px solid #d7d7d7;
	background: #efefef;
	font-size: 30px;
	color: #30A1F2;
	text-indent: 18px;
	margin-bottom: 10px
}

.goodsDetails_box2 h4 span {
	display: inline-block;
	width: 16px;
	height: 16px;
	border-radius: 50%;
	background: #30A1F2
}
.goodsDetails_box2_ {
	padding: 0 24px;
	margin-bottom: 5px;
	line-height: 40px;
}
.goodsDetails_box_left, .goodsDetails_box_right {
	height: auto;
	line-height: 40px;
	padding: 8px 0;
}
.goodsDetails_box_left,
.goodsDetails_box_right {
	float: left;
	height: 58px;
	line-height: 58px
}

.goodsDetails_box_left {
	width: 350px
}
.moreGoods_goods_number {
	float: right;
	height: 62px;
	padding-right: 10px;
	line-height: 62px;
	text-align: right;
	width: 240px;
}
.goodsDetails_text {
	width: 480px;
	padding: 15px 0;
	float: left;
	line-height: 40px;
	font-size: 28px;
	color: #333
}
.goodsDetails_box1_center li {
	border-bottom: 1px dashed #666;
	font-size: 24px;
	padding-left: 24px;
}
.goodsDetails_box1 {
	background: #FFF;
	padding-bottom: 15px;
}

.goodsDetails_box1_top {
	padding-top: 20px;
	font-size: 36px
}

.goodsDetails_box1_ionc,
.goodsDetails_box1_title {
	float: left
}

.goodsDetails_box1_title {
	text-indent: 24px;
	font-weight: normal;
	color: #000;
	width: 560px;
}

.goodsDetails_box1_ionc {
	padding-top: 10px;
}
.header-wrap {
	max-width: 750px;
	width: 100%;
	margin: 0 auto;
	height: 87px;
	border-bottom: 1px solid #d8d8d8;
	position: fixed;
	background: #f6f6f6;
	z-index: 3;
	top: 0;
}
.goodsDetails_header {
	border: none;
	position: absolute;
	background: none;
	top: 0 ;
	left: 50%;
  margin-left:-384px;
}

.goodsDetails_header .header_back {
	top: 20px;
	left: 20px
}

.goodsDetails_header .header_collect {
	top: 20px;
	right: 20px;
	text-align: right
}

.goodsDetails_header div {
	z-index: 200
}
.wo_header .header_left,
.wo_header .header_right {
	line-height: 36px;
	padding-top: 7px;
	font-size: 20px;
}

.wo_header .header_left {
	text-align: left;
	padding-left: 24px;
	z-index: 210;
}

.wo_header .header_right {
	text-align: right;
	padding-right: 24px;
}

.wo_header .header_left dl, .wo_header .header_right dl {
	text-align: center;
	display: inline-block;
}
.sprite {
	background-image: url(../../assets/img/sprite.png);
	background-repeat: no-repeat;
}
.icon_delete {
	background-position: -730px -311px;
}
.icon_collect_a {
	background-position: -850px -383px;
}
.icon_collect_b {
	background-position: -850px -288px;
}
.header_left,
.header_right {
	width: 150px;
	height: 87px;
	position: absolute;
	font-size: 26px;
	line-height: 87px;
	z-index: 30;
	color: #f66b0c;
	top: 0;
}
</style>
