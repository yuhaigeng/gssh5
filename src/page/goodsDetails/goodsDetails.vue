<template>
 <div class="detail">
     <div class="header-wrap goodsDetails_header">
			<div class="header_left header_back sprite icon_delete" @click="back"></div>
			<div class="header_right header_collect sprite" :class="isCollect?'icon_collect_b':'icon_collect_a'" @click="changeCollect"></div>
		</div>
        <div class="main-wrap goods_detaile_wrap" style="height: 1236px; background: #FFFFFF;">
			<div class="main">
				<div class="goodsDetails_img_box">
                    <div class="swiper-container">
					<div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item,index) in imgList" :key="index">
                        <img :src="item.img" alt="">
                        </div>
					</div>
					<!-- 如果需要分页器 -->
					<div class="swiper-pagination"></div>
                    </div>
				</div>
                <div class="goodsDetails_box1">
					<div class="goodsDetails_box1_top clearfloat">
						<h3 class="goodsDetails_box1_title">香蕉</h3>
						<div class="goodsDetails_box1_ionc">
							
						</div>
					</div>
					<ul class="goodsDetails_box1_center">
						<li class="clearfloat goodsDetails_box1_center_li1">
							<div class="goodsDetails_text">
								这香蕉很黄
							</div>
							<!-- <div class="moreGoods_goods_number clearfloat">
								<span class="goodsNumber_min">
									<img src="img/btn_m@2x.png"/>
								</span>
								<span class="goodsNumber fontColor">5</span>
								<span class="goodsNumber_max">
									<img src="img/btn_a@2x.png"/>
								</span>
							</div> -->
						</li>
						<li class="clearfloat">
							<div class="goodsDetails_box_left goodsDetails_Unit_Price">
								单价：
							</div>
							<div class="goodsDetails_box_right goodsDetails_Total_Price">
								总价:
							</div>
						</li>
						<li class="clearfloat">
							<div class="goodsDetails_box_left goodsDetails_Place">
								产地：
							</div>
							<div class="goodsDetails_box_right goodsDetails_Standrd">
								规格：
							</div>
						</li>
						<li class="clearfloat">
							<div class="goodsDetails_box_left goodsDetails_kucun">
								库存：
							</div>
							<div class="goodsDetails_box_right">
								
							</div>
						</li>
					</ul>
				</div>
				<div class="goodsDetails_box2">
					<h4><span></span>&nbsp;&nbsp;商品详情</h4>
					<div class="goodsDetails_box2_">
						<div class="goods_area">
						<p>产地：安徽</p>
						</div>
						<div class="goods_standard">
						<p>规格：哇热噶热爱过</p>
						</div>
						<div class="goods_feature">
						<p>特征：热啊赫然好热刚好然而gear 然而干哈而过热爱和个人规划</p>
						</div>
					</div>
					
				</div>
			</div>
        </div>
 </div>
</template>

<script>
import Swiper from 'swiper'
import '@/common/swiper-3.3.1.min.css'
export default {
 data() {
 return {
	 isCollect:true,
     imgList: [
         {img: "http://img.guoss.cn/gss_img_root/img_goods/10050/20180716123009.jpg"},
         {img: "http://img.guoss.cn/gss_img_root/img_goods/10050/20180716123009.jpg"},
         ]
 }
 },
 methods:{
	 back(){
		 this.$router.go(-1);
	 },
	 changeCollect(){
		 
		 this.isCollect = !this.isCollect
		 if(this.isCollect == true){
			 this.$message({
          message: '取消收藏',
		  center: true,
		});
		 }else {
			 this.$message({
          message: '收藏成功',
		  center: true,
		});
		 }
	 }
 },
 mounted(){
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

.goodsDetails_box2_ p {
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
