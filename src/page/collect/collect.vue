<template>
 <div class="">
     <app-header :type="headerMsg"></app-header>
     <div class="main-wrap often_shop_main_wrap">
			<div class="main">
				<ul>
					<li class="line-wrapper"  v-for="(item,index) in collectList" :key="item.goodsInfoId" @click="toDetail(item.goodsInfoId)">
                        <mt-cell-swipe :right="rightButtons(index)">
							<div class="line-scroll-wrapper clearfloat">
								<dl class="line-normal-wrapper clearfloat">
									<dt class="line-normal-avatar-wrapper">
										<img :src="item.goodsInfo.goodsLogo"/>
									</dt>
									<dd class="line-normal-info-wrapper">
										<div class="often_shop_goods_top clearfloat">
											<p class="often_shop_goods_tit">{{item.goodsInfo.goodsName}}</p>
											<p class="often_shop_goods_icon">
												<img class="icon_cu" src="../../assets/img/tag_te@2x.png"/>
											</p>
										</div>
										<p class="often_shop_show">{{item.goodsInfo.goodsShows}}</p>
										<div class="often_shop_NumPir">
											<div class="os_pir">
												<span class="often_shop_color">{{item.goodsInfo.gssPrice}}</span>元/{{item.goodsInfo.priceUnit}}&nbsp;&nbsp;<span>{{item.goodsInfo.priceDesc}}</span>'
											</div>
											<div class="os_Num">
												<button class="goods_Number_min" v-if="buyNum > 0">
													<img src="../../assets/img/btn_m@2x.png"/>
												</button>
												<span class="goodsNumber fontColor" v-if="buyNum > 0">{{buyNum}}</span>
												<button class="goods_Number_max">
													<img src="../../assets/img/btn_a@2x.png"/>
												</button>
											</div>
										</div>
									</dd>
								</dl>
							</div>
                        </mt-cell-swipe>
			        </li>
				</ul>
			</div>
            <p class="lodemore" v-text=" this.isLast ? '没有更多数据了':'点击加载更多'" @click="loadMore"></p>
		</div>
 </div>
</template>

<script>
import appHeader from "../../components/public/header.vue";
import { CellSwipe } from 'mint-ui';
export default {
 data() {
	return {
		headerMsg:{
			type:"common",
			title:'常购商品',
			left:'返回'
		},
		collectList:[],
		buyNum:1,
		goodID:'',
		isLast:false,
		pageSize:'10',
        pageNo:'1',
 	}
 },
 components: {
    appHeader,
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
  },
  methods:{
	  get_goods_collected:function () {
		this.$ajax.get(this.HOST, {
			params:{
				method: "goods_collection",
				pageNo: this.pageNo,
				pageSize: this.pageSize,
				firmId: this.firmInfoid,
				userId: 1881
			}
		}).then(resp => {
			// return JSON.parse(JSON.stringify(result));
			// return JSON.stringify(data.data);
			// console.log(resp.data);
			if (resp.data.statusCode == 100000) {
				this.isLast = resp.data.data.isLast;
				if (resp.data.data.pageNo == 1) {
					this.collectList = resp.data.data.objects;
				} else {
					this.collectList = this.collectList.concat(resp.data.data.objects);
				}
			} else {
				console.log(data.statusStr);
			}
		}).catch(err => {
			   console.log('请求失败：'+ err.statusCode);
		});
	},

	get_goods_collect_del:function (index) {
		this.$ajax.get(this.HOST, {
			params:{
				method: "goods_collection_del",
				userId: 1881,
				goodsId: this.goodID
			}
		}).then(resp => {
			if (resp.data.statusCode == 100000) {
				const arr = this.collectList;
				const arr1 = arr.splice(index, 1);
				this.collectList =arr;
			} else {
				console.log(data.statusStr);
			}
		}).catch(err => {
			   console.log('请求失败：'+ err.statusCode);
		});
	},

	toDetail(id) {
		this.$router.push({ path:'detail/'+id })
	},

	loadMore:function(){
        if(!this.isLast){
            this.pageNo ++
            this.get_goods_collected()
        	}
	 	},
  	}
}
</script>

<style scoped>
.search_goods .fontColor {
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
	margin: 0 auto;
	background: #ebeaea;
    margin-top: 87px;
}
.often_shop_main_wrap .main ul {
	width: 100%;
	margin-top: 10px;
	background: #FFF
}
.line-wrapper {
	width: 100%;
	overflow: hidden;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
}
.line-scroll-wrapper {
	height: 200;
	width: 950px
}

.line-normal-wrapper {
	float: left;
	width: 750px;
	height: 200px
}

.line-normal-avatar-wrapper {
	float: left;
	width: 200px;
	height: 200px;
	padding: 20px
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
