<template>
  <div class="moreGoods">
    <app-header :type ="headerMsg"></app-header>
    <div class="moreDoogs_main_wrap">
      <div class="moreDoogs_main_top">
				<ul class="moreDoogs_main_top_list">
					<li v-for="(item,index) in goods" :key="index" :class="{topClass:index == isTop}" @click="topNav(item.tit,index)" v-text="item.tit"></li>
          </ul>
          </div>
          <div class="moreDoogs_main_box clearfloat">
				<div class="moreDoogs_main_box_left_wrap">
					<ul class="moreDoogs_main_box_left" v-for="(item,index) in goods" :key="index">
						<li v-for="(item1,index) in item.left_name" :class="{isSelected:index == isSelected}" :key="index" v-show="name==item.tit" v-text="item1.name" @click="leftNav(item1.name,index)"></li>
					</ul>
				</div>
        <div class="moreDoogs_main_box_right">
					<div class="moreDoogs_main_box_right_box">
            <router-link to="detail">
            <div v-for="(item,index) in goods" :key="index">
						<ul class="moreGoods_box_list" v-for="(item1,index) in item.left_name" :key="index">
              <li v-for="(item2,index) in item1.food" :key="index" v-show="name1==item1.name">
                <dl class="moreGoods_goods_detaile clearfloat">
              <dt><img :src="item2.img" alt=""></dt>
              <dd>
                <h3 class="moreGoods_goods_name">{{item2.name}}</h3>
                <p class="moreGoods_goods_text">{{item2.con}}</p>
              </dd>
            </dl>
              </li>
						</ul>
            </div>
            </router-link>
						<!-- <p class="lodemore"></p> -->
					</div>
					
				</div>
        </div>
    </div>
    <app-footer-go-shop></app-footer-go-shop>
  </div>
</template>
<script>

  import appHeader from "../../components/public/header.vue";
  import appFooterGoShop from "../../components/footerGoShop.vue";
  export default {
    name: 'more',
    data() {
      return {
         headerMsg:{
            type:"common",
            title:'更多商品',
            left:'返回'
         },
         goods:[
           {
             tit:'进口水果',
             left_name:[
               {
                 name:'苹果',
                 food:[{
                   img: 'http://img.guoss.cn/gss_img_root/img_goods/14424/20181019130326.jpg',name:'苹果',con:'新鲜又好吃的大苹果'
                 }]
               },
                {
            name: '香蕉',
            food: [{
              img: 'http://img.guoss.cn/gss_img_root/img_goods/10050/20180716123017.jpg',name:'香蕉',con:'新鲜又好吃的香蕉'
            }]
          }
             ]
           },
           {
             tit:'精品优选',
             left_name:[
               {
                 name:'梨',
                 food:[{
                   img: 'http://img.guoss.cn/gss_img_root/img_goods/14424/20181019130326.jpg',name:'梨',con:'新鲜又好吃的大苹果'
                 }]
               },
                {
            name: '橘子',
            food: [{
              img: 'http://img.guoss.cn/gss_img_root/img_goods/10050/20180716123017.jpg',name:'香蕉',con:'新鲜又好吃的香蕉'
            }]
          }
             ]
           },
         ],
        name: 'food',
        isSelected:0,
        isTop:0,
        isShow:0,
        name1: ''
      }
    },
    components: {
      appHeader,
      appFooterGoShop
    },
    methods: {
     topNav(name,index) {
       this.isTop = index
       this.name = name
     },
     leftNav(name1,index) {
       this.isSelected = index
       this.name1 = name1
     }
    },
  }
</script>
<style scoped>
.moreDoogs_main_wrap {
	background: #EBEAEA;
	width: 750px;
	position: absolute;
  margin-top: 87px;
}

.moreDoogs_main_top {
	height: 90px;
	background: #ebeaea;
	width: 750px;
	position: fixed;
	overflow-x: scroll;
	overflow-y: hidden;
	z-index: 6;
}

.moreDoogs_main_top_list {
	padding: 11px 0;
	width: auto;
}

.moreDoogs_main_top_list li {
	width: 140px;
	height: 64px;
	background: #FFFFFF;
	float: left;
	line-height: 64px;
	text-align: center;
	color: #999;
	font-size: 28px;
	border: 2px solid #dddddd;
	border-radius: 34px;
	margin-left: 24px;
	display: inline-block;
}

 .topClass {
	border-color: rgb(234, 90, 42) !important;
	color: rgb(234, 90, 42) !important;
}
.moreGoods_goods_detaile {
	height: 220px;
}

.moreGoods_goods_detaile dt,
.moreGoods_goods_detaile dd {
	float: left;
}

.moreGoods_goods_detaile dt {
	width: 182px;
	height: 200px;
	padding-top: 20px;
}

.moreGoods_goods_detaile dt img {
	width: 160px;
	height: 160px;
}

.moreGoods_goods_detaile dd {
	width: 418px;
	height: 220px;
	padding-top: 16px;
	border-bottom: 1px solid #DDDDDD;
}
  .moreDoogs_main_box_left .isSelected {
    border-left: 4px solid rgb(234, 90, 42);
    color: rgb(234, 90, 42);
    border-right: none;
    background: rgb(255, 255, 255)
  }
  .moreDoogs_main_box {
    width: 100%;
    margin-top: 90px;
    position: relative;
  }
  .moreDoogs_main_box_left_wrap,
  .moreDoogs_main_box_right {
    float: left;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .moreDoogs_main_box_left_wrap {
    width: 130px;
    background: #ebeaea;
    position: relative;
  }
  .moreDoogs_main_box_left li {
    width: 129px;
    height: 99px;
    text-align: center;
    background: #f5f5f5;
    font-size: 30px;
    line-height: 99px;
    overflow: hidden;
    border-bottom: 1px solid #DDDDDD;
    border-right: 1px solid #DDDDDD;
    color: #666666;
  }
  .moreDoogs_main_box_right {
    width: 620px;
    padding-left: 20px;
    background: #FFF;
    position: relative;
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
  .clearfloat:after {
    content: ".";
    display: block;
    height: 0;
    overflow: hidden;
    visibility: hidden;
    clear: both;
  }
  /*公用goods*/
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
  .moreGoods_box_list .moreGoods_goods_num {
    height: 62px;
    line-height: 60px
  }
  .moreGoods_box_list .moreGoods_goods_icon {
    float: left;
    width: 150px;
    height: 62px
  }
  /*.goodsNumber_min {float: left;}
  .goodsNumber_max{float: right;}*/
  .moreGoods_box_list .goodsNumber_max,
  .moreGoods_box_list .goodsNumber_min {
    font-size: 34px;
  }
  .moreDoogs_main_box_right {
	width: 620px;
	padding-left: 20px;
	background: #FFF;
	position: relative;
}
</style>
