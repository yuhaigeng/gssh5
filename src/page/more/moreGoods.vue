<template>
  <div class="moreGoods">
      <app-header :type ="headerMsg">
      </app-header>
      <div class="moreDoogs_main_wrap">
        <div class="moreDoogs_main_top" >
          <ul class="moreDoogs_main_top_list" v-bind:style="{width:getTopWidth}"  >
            <li v-for="(item,index) in goods" :key="index" :class="{topClass:index == isTop}" @click="topNav(item.typeCode,index)" v-text="item.typeName"></li>
          </ul>
        </div>
        <div class="moreDoogs_main_box clearfloat">
          <div class="moreDoogs_main_box_left_wrap" v-bind:style="{height:getLeftHeight}">
            <ul class="moreDoogs_main_box_left" >
              <li v-for="(item,index) in left_name" :class="{isSelected:index == isSelected}" :key="index"  v-text="item.typeName" @click="leftNav(item.typeCode,index)"></li>
            </ul>
          </div>
          <div class="moreDoogs_main_box_right" v-bind:style="{height:getLeftHeight}">
            <div class="moreDoogs_main_box_right_box" v-bind:style="{height:getLeftHeight}">
              <ul class="moreGoods_box_list">
                <li v-for="(item,index) in listObj " :key="index"  >
                  <dl class="moreGoods_goods_detaile clearfloat">
                    <dt>
                      <img :src="item.goodsLogo" alt="">
                      <span v-if="item.vipGrade > 0" :class = "'icon_vip'+ item.vipGrade"></span>
                    </dt>
                    <dd>
                       <h3 class="moreGoods_goods_name" v-text="item.goodsName"></h3>
                       <p class="moreGoods_goods_text" v-text="item.goodsShows"></p>
                       <div v-if="logined">
                          <p class="moreGoods_goods_price" v-if="item.vipGrade > 0">
                            <span  class="fontColor" v-text="item.wholeGssPrice"></span>{{'元/'+item.wholePriceSize}}<del>{{item.nomalPrice + '元/'+item.wholePriceSize}}</del>
                            </p>
                            <p class="moreGoods_goods_price" v-else>
                                  <span  class="fontColor" v-text="item.gssPrice"></span>{{'元/'+item.priceUnit}}<span v-text="item.priceDesc"></span>
                            </p>
                          <div class="moreGoods_goods_num">
                                <div class="moreGoods_goods_icon">
                                  <span v-if="item.isSale" class = "icon_cu"></span>
                                  <span v-if="item.isNew" class = "icon_ji"></span>
                                  <span v-if="item.isRecommend"   class = "icon_jian"></span>
                                  <span v-if="item.isHot" class = "icon_re"></span>
                                </div>
                                <div class="moreGoods_goods_number clearfloat" v-if="item.vipGrade > 0">
                                    <div  v-if="item.state == 1">
                                          <b  v-if="(parseInt(item.initNum) - parseInt(item.saleNum)) <= 0" class='bStyle' >已售罄</b>
                                          <div class="component" v-else>
                                                <span v-if="goodNum != 0">
                                                      <span class="goodsNumber_min"><img src="../../assets/img/btn_m@2x.png"/></span>
                                                      <span class="goodsNumber fontColor" v-text="goodNum"></span>
                                                </span>
                                                <span v-else>
                                                      <span class="goodsNumber_min hidden"><img src="../../assets/img/btn_m@2x.png"/></span>
                                                      <span class="goodsNumber fontColor hidden"></span>
                                                </span>
                                          </div>
                                    </div>
                                    <div v-else>
                                              <b v-if="item.state == 2"  class='bStyle'  >不是VIP</b>
                                              <b v-if="item.state == 3"  class='bStyle' >等级不足</b>
                                    </div>
                                </div>
                                <div class="moreGoods_goods_number clearfloat" v-else>
                                    <b  v-if="(parseInt(item.initNum) - parseInt(item.saleNum)) <= 0" class='bStyle' >已售罄</b>
                                    <div class="component" v-else>
                                          <span v-if="goodNum != 0">
                                                <span class="goodsNumber_min"><img src="../../assets/img/btn_m@2x.png"/></span>
                                                <span class="goodsNumber fontColor" v-text="goodNum"></span>
                                          </span>
                                          <span v-else>
                                              <span class="goodsNumber_min hidden"><img src="../../assets/img/btn_m@2x.png"/></span>
                                              <span class="goodsNumber fontColor hidden"></span>
                                          </span>
                                          <span class="goodsNumber_max"><img src="../../assets/img/btn_a@2x.png"/></span>
                                    </div>
                                </div>
                          </div>
                       </div>
                       <div v-else>
                       </div>
                    </dd>
                  </dl>
                </li>
              </ul>
              <p class="lodemore" v-text=" this.isLast ? '没有更多数据了':'点击加载更多'" @click="loadMore"></p>
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
  import { getSystem  , getIsLogin , getTokenId , getUserData, getSecretKey } from "../../common/common.js";
  export default {
    name: 'more',
    data() {
      return {
         headerMsg:{
            type:"common",
            title:'更多商品',
            left:'返回'
         },
         logined:false,
         pageNo: this.pageNo,
         pageSize: this.pageSize,
         websiteNode:this.websiteDate.code,
         firmId:getIsLogin() ? JSON.parse(localStorage.getItem("user_data")).firmInfoid :"" ,
         goods:[],
         left_name:[],
         goodsList:null,
         listObj:[],
         typeCode:null,
         goodsType:null,
         isSelected:0,
         isTop:0,
         isShow:0,
         goodNum:1,//本地存储的数量
         isLast:false,
         goShopCart:[],//本地购物车
         systemMoney:-1,//系统参数配置中配置的起售金额

      }
    },
    components: {
      appHeader,
      appFooterGoShop
    },
    mounted() {
      if(this.$route.query.typeCode){
        this.goodsType = this.$route.query.typeCode
      }else{

      }
      // 数据初始化
      this.logined = getIsLogin();

      if ( localStorage.getItem('system') ) {
        this.systemMoney = JSON.parse(localStorage.getItem('system')).how_much_money_dispatch;
      } else {

      }
      this.goods_first_nav()
      console.log(this.getUserData)
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

        }
    },
    methods: {
      goods_first_nav:function () {
            this.$ajax.get(this.HOST, {
                params:{
                    method: "goods_first_type",
                    firmId: this.firmId,
                    websiteNode:this.websiteNode,
                }
            }).then(resp => {
                  this.goods = resp.data.data;
                  this.typeCode = this.goods[0].typeCode
                  this.goods_second_nav()
                  console.log(resp.data);
            }).catch(err => {
                // console.log(JSON.parse(data).data.goods);
                  console.log('请求失败：'+ err.statusCode);

            });
        },
        goods_second_nav:function () {
            this.$ajax.get(this.HOST, {
                params:{
                    method: "goods_second_type",
                    firmId:this.firmId,
                    websiteNode:this.websiteNode,
                    typeCode: this.typeCode

                }
            }).then(resp => {
                   this.left_name = resp.data.data;
                   console.log(resp.data.data)
                   this.goodsType =  this.left_name[0].typeCode
                   this.isSelected = 0;
                   this.goods_info_nav()
                console.log(resp.data);
            }).catch(err => {
                  // console.log('请求失败：'+ err.statusCode);

            });
        },
        goods_info_nav:function () {
            this.$ajax.get(this.HOST, {
                params:{
                    method: "goods_info_show_fou",
                    firmId:this.firmId,
                    websiteNode: this.websiteNode,
                    typeCode:this.goodsType,
                    pageNo: this.pageNo,
                    pageSize: this.pageSize,
                }
            }).then(resp => {
                    if( this.pageNo == 1){
                         this.goodsList = resp.data.data.page;
                         this.listObj =  this.goodsList.objects
                         this.isLast = this.goodsList.isLast
                    }else{
                         this.goodsList = resp.data.data.page
                         this.listObj =  this.listObj.concat(this.goodsList.objects)
                         this.isLast  = this.goodsList.isLast
                    }
                  console.log(resp.data.data.page)
            }).catch(err => {
                console.log(JSON.parse(data).data);
                  console.log('请求失败：'+ err.statusCode);

            });
        },
        topNav(typeCode,index) {
          let rightTop = document.querySelector(".moreDoogs_main_box_right")
          let wrapTop = document.querySelector(".moreDoogs_main_box_left_wrap")
          let topLeft = document.querySelector(".moreDoogs_main_top")
            this.typeCode = typeCode;
            this.isTop = index;
            this.goods_second_nav()
            rightTop.scrollTop = 0;
            wrapTop.scrollTop = 0;
            let ele = document.querySelectorAll(".moreDoogs_main_top_list li")[index]
            if (ele.offsetLeft > 200) {
              topLeft.scrollLeft = ele.offsetLeft-200
            }else{
              topLeft.scrollLeft = 0
            }
        },
        leftNav(typeCode,index) {
          let rightTop = document.querySelector(".moreDoogs_main_box_right")
          let wrapTop = document.querySelector(".moreDoogs_main_box_left_wrap")
            this.pageNo = '1'
            this.goodsType = typeCode
            this.isSelected =  index
            this.goods_info_nav()
            rightTop.scrollTop = 0;
            let ele = document.querySelectorAll(".moreDoogs_main_box_left li")[index]
            if (ele.offsetTop>200) {
              wrapTop.scrollTop = ele.offsetTop-200
            }else{
              wrapTop.scrollTop = 0
          }
        },
        loadMore:function(){
            if(!this.isLast){
                this.pageNo ++
                this.goods_info_nav()
            }
        }
    }
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
  position: fixed;
	height: 90px;
	background: #ebeaea;
	width:750px;
	overflow-x: scroll;
	overflow-y: hidden;
	z-index: 6;
}

.moreDoogs_main_top_list {
  height: 90px;
	padding: 11px 0;
	width: auto;
  box-sizing: border-box;
}

.moreDoogs_main_top_list li {
  float: left;
	width: 140px;
	height: 64px;
	background: #FFFFFF;
	line-height: 64px;
	text-align: center;
	color: #999;
	font-size: 28px;
	border: 2px solid #dddddd;
	border-radius: 34px;
	margin-left: 24px;
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
    margin-top: 90px;
    width: 100%;
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
.component{
  text-align: right;
  padding-right: 10px;
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
</style>
