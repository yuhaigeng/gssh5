<template>
 <div class="">
     <app-header :type="headerMsg"></app-header>
     <div class="main-wrap often_shop_main_wrap">
			<div class="main">
				<ul>
					<li class="line-wrapper" v-for="(item,index) in goodsList" :key="index">
                        <mt-cell-swipe
            :right="rightButtons">
			        	<div class="line-scroll-wrapper clearfloat">
			                <dl class="line-normal-wrapper clearfloat">
		                         <dt class="line-normal-avatar-wrapper">
		                         	<img :src="item.img"/>
		                         </dt>
		                         <dd class="line-normal-info-wrapper">
		                            <div class="often_shop_goods_top clearfloat">
					 					<p class="often_shop_goods_tit">{{item.tit}}</p>
					 					<p class="often_shop_goods_icon">
										 	<img class="icon_cu" src="../../assets/img/tag_te@2x.png"/>
					 					</p>
					 				</div>
		                            <p class="often_shop_show">{{item.det}}</p>
					 				<div class="often_shop_NumPir">
					 					<div class="os_pir">
					 						<span class="often_shop_color">{{item.price}}</span>元/箱&nbsp;&nbsp;<span>{{item.aa}}</span>'
					 					</div>
					 					<div class="os_Num">
					 						<button class="goods_Number_min">
					 							<img src="../../assets/img/btn_m@2x.png"/>
					 						</button>
					 						<span class="goodsNumber fontColor">0</span>
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
        goodsList:[{img:'http://img.guoss.cn/gss_img_root/img_goods/13459/20180921115645.jpg',tit:'香蕉',det:'这是香蕉',price:'65',aa:'20'},
        {img:'http://img.guoss.cn/gss_img_root/img_goods/13459/20180921115645.jpg',tit:'香蕉',det:'这是香蕉',price:'65',aa:'20'}
        ]
 }
 },
 components: {
    appHeader,
  },
  created(){
      this.rightButtons = [
                {
                    content: '删除',
                    style: { background: 'red', color: '#fff',width:'200px',fontSize:'24px',textAlign:'center',lineHeight:'200px'},
                    handler: () => deleteSection(item.id)
                }
      ]
  },
  methods:{
      deleteSection(sid){
          console.log(111)
      }
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
	height: 200px;
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
