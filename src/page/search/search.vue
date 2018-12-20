<template>
	<div class="">
		<div class="header-wrap clearfloat">
				<div class="searchCallback sprite arrow_left" @click="goBack"></div>
			<div class="search">
				<input type="text" class="sprite icon_search_grey" placeholder="请输入商品名称" v-model="searchVal" @input="search($event)" ref="focusState"/>
				<div class="delete sprite delete_b" @click="delSearch()"></div>
			</div>
		</div>
		<div class="main-wrap">
			<div class="search_star" v-show="!searchVal">
				<p class="search_tit">热门搜索</p>
				<ul class="search_item">
					<li v-for="(item,index) in searchList" :key="index" @click="showSearch(item.keyword)" v-text="item.keyword"></li>
				</ul>
			</div>
			<div class="search_none" v-show="!goodsList.length && searchVal && state == 3">
				<dl>
					<dt>
						<img src="../../assets/img/pic_logo@2x.png"/>
					</dt>
					<dd>
						<p>非常抱歉，暂时没有您需要的水果！</p>
						<p v-text="phone"></p>
					</dd>
				</dl>
			</div>
			<div class="search_resurt" v-show="goodsList.length && searchVal && state == 3 ">
				<div class="search_goods" v-for="(item,index) in goodsList" :key="index" @click="goDetail(item)">
					<dl>
						<dt>
							<img v-lazy="item.goodsLogo"/>
							<span v-if="item.vipGrade > 0" :class = "'icon_vip' + item.vipGrade"></span>
						</dt>
						<dd>
							<h3 class="moreGoods_goods_name ellipsis" v-text="item.goodsName"></h3>
							<p class="moreGoods_goods_text" v-text="item.goodsShows"></p>
							<p class="moreGoods_goods_price" v-if="logined">
								<span v-if="item.vipGrade > 0"><span class="fontColor">{{item.gssPrice}}</span>元/{{item.priceUnit}} &nbsp; &nbsp;<del>{{item.nomalPrice}}元/{{item.priceUnit}}</del></span>

								<span v-else><span class="fontColor">{{item.gssPrice}}</span>元/{{item.priceUnit}} &nbsp; &nbsp;{{item.priceDesc}}</span>
							</p>
							<div class="moreGoods_goods_icon">
								<span v-if="item.isSale" class = "icon_cu"></span>
								<span v-if="item.isNew" class = "icon_ji"></span>
								<span v-if="item.isRecommend" class = "icon_jian"></span>
								<span v-if="item.isHot" class = "icon_re"></span>
                          </div>
						</dd>
					</dl>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getIsLogin } from "../../common/common.js";

// 节流函数
const delay = (function() {
    let timer = 0;
		return function(func, delay) {
			clearTimeout(timer);
			timer = setTimeout(func, delay);
		};
})();
export default {
	data() {
		return {
			searchVal:'',
			logined:getIsLogin(),
			searchList:[],
			goodsList:[],
			state:1,//1 未请求,2 请求中,3 请求完毕
			websiteNode: this.websiteDate.code,
			phone:''
		}
  },
  mounted(){
	this.get_goods_hot()
	if(localStorage.getItem("system")) {
		const system = JSON.parse(localStorage.getItem("system"))
		this.phone = system.feedback_method
	}
  },
	watch:{
		searchVal() {
			delay(() => {
				this.search();
			},300)
		}
	},
	methods:{
		get_goods_hot:function(){
			let obj  = {
				method: "goods_show_hot",
			}
			this.$ajax.get(this.HOST, {
				params:obj
			}).then(resp => {
				if (resp.data.statusCode == 100000) {
					this.searchList = resp.data.data;
				} else {
					this.$toast({
						message : data.statusStr,
						position: 'bottom',
						duration: 2000
					})
				}
			}).catch(err => {
				console.log('请求失败：'+ err.statusCode);
			});
		},
		get_goods_name2:function() {
			this.state = 2;
			let obj = {
				method: "goods_show_name2",
				websiteNode: this.websiteNode,
				goodsName:this.searchVal
			}
			this.$ajax.get(this.HOST, {
				params:obj
			}).then(resp => {
				if (resp.data.statusCode == 100000) {
					this.goodsList = resp.data.data;
					this.state = 3;
				} else {
					this.$toast({
						message : data.statusStr,
						position: 'bottom',
						duration: 2000
					})
				}
			}).catch(err => {
				console.log('请求失败：'+ err.statusCode);
				this.state = 3;
			});
		},
		clearTimer() {
			if (this.timer) {
				clearTimeout(this.timer)
			}
		},
		search(event) {
			if(event) {
				if(this.searchVal.length != 0){
					this.get_goods_name2()
				}
			}
		},
		delSearch() {
			this.searchVal = ''
			this.goodsList = []
			this.$refs.focusState.focus()
		},
		showSearch(index) {
			this.searchVal = index;
			this.get_goods_name2()
		},
		goDetail(item) {
			const id = item.id;
			sessionStorage.setItem('goodsDetails',JSON.stringify(item));
			this.$router.push({ path:'detail', query:{ id:id }})
		},
		goBack() {
			this.$router.go(-1);
		},
	}
}
</script>

<style scoped>
@import "../../common/sprite.css";
.icon_vip1 {
	display: block;
	position: absolute;
	width: 62px;
	height: 32px;
	background: url(../../assets/img/vip_icon1_square_active.png);
	left: 0;
	top: 0;
}

.icon_vip2 {
	display: block;
	position: absolute;
	width: 62px;
	height: 32px;
	background: url(../../assets/img/vip_icon2_square_active.png);
	left: 0;
	top: 0;
}

.icon_vip3 {
	display: block;
	position: absolute;
	width: 62px;
	height: 32px;
	background: url(../../assets/img/vip_icon3_square_active.png);
	left: 0;
	top: 0;
}

.icon_vip4 {
	display: block;
	position: absolute;
	width: 62px;
	height: 32px;
	background: url(../../assets/img/vip_icon4_square_active.png);
	left: 0;
	top: 0;
}
.moreGoods_box_list .moreGoods_goods_name {
	font-size: 30px;
	width: 400px;
	color: #000;
	height: 34px;
	line-height: 34px;
	font-weight: 500;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
}
.search_goods .moreGoods_goods_name{width: 468px;}
.moreGoods_box_list .moreGoods_goods_text {
	height: 64px;
	font-size: 24px;
	line-height: 32px;
	padding-right: 24px;
	overflow: hidden
}

.moreGoods_box_list .moreGoods_goods_price {
	height: 38px;
	line-height: 38px;
	font-size: 26px
}
.moreGoods_box_list .fontColor {
	color: #eb5c2b;
	font-size: 34px;
	height: 60px;
}
.main-wrap {
	max-width: 750px;
	width: 100%;
	margin: 0 auto;
	background: #ebeaea;
    margin-top: 87px;
}
.search {
	width: 666px;
	height: 76px;
	float: left;
	padding-top: 11px;
}

.search input {
	width: 628px;
	height: 64px;
	background-color: #E5E5E5;
	border-radius: 20px;
	color: #999999;
	font-size: 28px;
	line-height: 64px;
	text-indent: 56px;
}

.delete {
	width: 64px;
	height: 64px;
	position: relative;
	right: -564px;
	top: -64px;
	border: none;
}

.search_star {
	width: 100%;
	height: 100%;
	padding: 30px 44px;
	background: #ebeaea;
}

.search_tit {
	font-size: 28px;
	height: 43px;
}

.search_item li {
	float: left;
	width: 200px;
	height: 64px;
	background: #FFFFFF;
	color: #666666;
	font-size: 30px;
	text-align: center;
	border-radius: 32px;
	line-height: 64px;
    margin: 15px 0 15px 30px;
}

.search_item li:nth-child(3n+1) {
	margin-left: 0;
}

.search_none {
	width: 100%;
	height: 100%;
	background: #ebeaea;
}

.search_none dl dt {
	width: 100%;
	height: 450px;
	padding-top: 148px;
	text-align: center;
}

.search_none dl dd {
	line-height: 38px;
	font-size: 30px;
	text-align: center;
}

.search_none {
	width: 100%;
	height: 100%;
	overflow: auto;
}
.search_resurt {
	padding-top: 20px;
}
.search_goods dl{width: 100%;height: 257px;background: #FFF;border-bottom: 1px solid #e7e7e7;padding-top:2px ;}
.search_goods dl dt,.search_goods dl dd{float: left;}
.search_goods dl dt{width: 276px;height: 256px;position: relative;}
.search_goods dl dt img{width: 250px;height: 250px;}
.search_goods dl dd {
    width: 474px;
}
.search_goods .moreGoods_goods_name{font-size: 30px;color: #000000;height: 56px;line-height: 56px;font-weight: 500;}
.search_goods .moreGoods_goods_text{height: 100px;font-size: 24px;line-height: 36px;color: #999999;padding-right: 70px;}
.search_goods .moreGoods_goods_price{height: 50px;line-height: 50px;font-size: 24px;color: #999999;}
.search_goods .fontColor{color: #eb5c2b;font-size: 28px;}
.search_goods .moreGoods_goods_icon{height: 50px;}
.searchCallback {
	width: 84px;
	height: 87px;
	float: left;
}
</style>
