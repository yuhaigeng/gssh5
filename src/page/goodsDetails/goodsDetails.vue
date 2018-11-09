<template>
 <div class="detail">
     <div class="header-wrap goodsDetails_header">
			<div class="header_left header_back sprite icon_delete" @click="back"></div>
			<div class="header_right header_collect sprite" :class="isCollect?'icon_collect_a':'icon_collect_b'" @click="changeCollect"></div>
		</div>
        <div class="main-wrap goods_detaile_wrap" style="height: 1236px; background: #FFFFFF;">
			<div class="main">
				<div class="goodsDetails_img_box">
                    <div class="swiper-container">
					<div class="swiper-wrapper">
                        <div class="swiper-slide">
                        <img :src="detailList.goodsLogo" alt="">
                        </div>
					</div>
					<!-- 如果需要分页器 -->
					<div class="swiper-pagination"></div>
                    </div>
				</div>
                <div class="goodsDetails_box1">
					<div class="goodsDetails_box1_top clearfloat">
						<h3 class="goodsDetails_box1_title">{{detailList.goodsName}}</h3>
						<div class="goodsDetails_box1_ionc">
							
						</div>
					</div>
					<ul class="goodsDetails_box1_center">
						<li class="clearfloat goodsDetails_box1_center_li1">
							<div class="goodsDetails_text">
								{{detailList.goodsShows}}
							</div>
							<div class="moreGoods_goods_number clearfloat">
								<span class="goodsNumber_min" v-if="num > 0" @click="goodsNumber_min">
									<img src="../../assets/img/btn_m@2x.png"/>
								</span>
								<span class="goodsNumber fontColor" v-if="num > 0">{{num}}</span>
								<span class="goodsNumber_max" @click="goodsNumber_max">
									<img src="../../assets/img/btn_a@2x.png"/>
								</span>
							</div>
						</li>
						<li class="clearfloat">
							<div class="goodsDetails_box_left goodsDetails_Unit_Price">
								单价：<span class="color_f27c32">{{detailList.gssPrice}}</span>元/箱
							</div>
							<div class="goodsDetails_box_right goodsDetails_Total_Price">
								总价: {{detailList.gssPrice}}元/箱
							</div>
						</li>
						<li class="clearfloat">
							<div class="goodsDetails_box_left goodsDetails_Place">
								产地：{{detailList.sourceCityName}}
							</div>
							<div class="goodsDetails_box_right goodsDetails_Standrd">
								规格：{{detailList.sizeDesc}}
							</div>
						</li>
					</ul>
				</div>
				<div class="goodsDetails_box2">
					<h4><span></span>&nbsp;&nbsp;商品详情</h4>
					<div class="goodsDetails_box2_" v-html="detailList.goodsContext">
					</div>
					
				</div>
			</div>
        </div>
		<app-footer-go-shop></app-footer-go-shop>
 </div>
</template>

<script>
import Swiper from 'swiper'
import '@/common/swiper-3.3.1.min.css'
import appFooterGoShop from "../../components/footerGoShop.vue";
export default {
	name:'goodsDetail',
 data() {
 return {
	 isCollect:localStorage.getItem("isColle"),
	 detailList:[],
	 num:0,
	 collectList:[]
 }
 },
 components: {
	 appFooterGoShop
 },
 created:function() {
	 this.getOrder()
 },
 methods:{
	 getOrder() {
		 this.Id = this.$route.params.id
	 },
	 get_goods_detail:function () {
		this.$ajax.get(this.HOST, {
			params:{
				method: "goods_get_by_id_two",
				goodsId: this.Id,
				userId: 1881
			}
		}).then(resp => {
			// return JSON.parse(JSON.stringify(result));
			// return JSON.stringify(data.data);
				this.detailList = resp.data.data;
				if (resp.data.statusCode == 100000) {
				let a = resp.data.data.isColl > 0 ? true : false;
				this.isCollect = a
				localStorage.setItem("isColle",a)
				}
		}).catch(err => {
			   console.log('请求失败：'+ err.statusCode);
		});
	},
	get_goods_collectAdd:function () {
		this.$ajax.get(this.HOST, {
			params:{
				method: "goods_collection_add",
				goodsId: this.Id,
				firmId: 132,
				userId: 1881
			}
		}).then(resp => {
			// return JSON.parse(JSON.stringify(result));
			// return JSON.stringify(data.data);
			// console.log(resp.data);
			this.isColl = true
		}).catch(err => {
			// console.log(JSON.parse(data).data.mainActivityList);
			   console.log('请求失败：'+ err.statusCode);
		});
	},
	get_goods_collect_del:function (index) {
		this.$ajax.get(this.HOST, {
			params:{
				method: "goods_collection_del",
				userId: 1881,
				goodsId: this.Id
			}
		}).then(resp => {
			// return JSON.parse(JSON.stringify(result));
			// return JSON.stringify(data.data);
			// console.log(resp.data);
			if (resp.data.statusCode == 100000) {
				const arr = this.collectList;
				const arr1 = arr.splice(index, 1);
				this.collectList =arr;
			} else {
				console.log(data.statusStr);
			}
		}).catch(err => {
			// console.log(JSON.parse(data).data.mainActivityList);
			   console.log('请求失败：'+ err.statusCode);
		});
	},
	 back(){
		 this.$router.go(-1);
	 },
	 changeCollect(){
		 this.isCollect = !this.isCollect
		 if(this.isCollect == false){
			this.get_goods_collect_del();
			this.$message({
          message: '取消收藏',
		  center: true,
		});
		 }else {
			this.get_goods_collectAdd()
			this.$message({
          message: '收藏成功',
		  center: true,
		});
		 }
	 },
	 goodsNumber_max() {
		 this.num++
	 },
	 goodsNumber_min() {
		 this.num--
	 }
 },
 mounted(){
	this.get_goods_detail()
    var mySwiper = new Swiper('.swiper-container', {
		loop: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
			autoplayDisableOnInteraction: false
        },
    })
 }
}
</script>

<style scoped>
.fontColor{margin: 0 10px;}
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
.scoregoods .goodsDetails_box2_ {
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
	padding-left: 24px
}
.goodsDetails_box1 {
	background: #FFF
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
	top: 0;
	left: 0
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
