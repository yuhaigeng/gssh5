<template>
  <div class="moreGoods common-wrap">
    <app-header :type ="headerMsg">
    </app-header>
    <div class="moreDoogs_main_wrap">
      <div class="moreDoogs_main_top" >
        <ul class="moreDoogs_main_top_list" v-bind:style="{width:getTopWidth}"  >
          <li v-for="(item,index) in topNavList" :key="index" :class="{topClass:index == topNavIndex}" @click="topNav(item.typeCode,index)" v-text="item.typeName"></li>
        </ul>
      </div>
      <div class="moreDoogs_main_box clearfloat">
        <div class="moreDoogs_main_box_left_wrap" v-bind:style="{height:getLeftHeight}">
          <ul class="moreDoogs_main_box_left" >
            <li v-for="(item,index) in leftNavList" :class="{isSelected:index == leftNavIndex}" :key="index"  v-text="item.typeName" @click="leftNav(item.typeCode,index)"></li>
          </ul>
        </div>
        <div class="moreDoogs_main_box_right" v-bind:style="{height:getLeftHeight}" >
          <div class="moreDoogs_main_box_right_box" v-bind:style="{height:getLeftHeight}">
            <ul class="moreGoods_box_list_class" v-show="tagesNav.length">
              <li v-for="(item,index) in tagesNav" :key="index" v-text="item.name" :class="{active:index == tagesNavIndex}" @click="threeNav(index,item.id)"></li>
            </ul>
            <ul class="moreGoods_box_list"  v-show="leftNavList.length">
              <li v-for="(item,index) in goodsList " :key="index"  @click="toDetail(item)" >
                <dl class="moreGoods_goods_detaile clearfloat">
                  <dt>
                    <img v-lazy="item.goodsLogo" alt="" :key="item.goodsLogo">
                    <span v-if="item.vipGrade > 0" :class = "'icon_vip'+ item.vipGrade"></span>
                  </dt>
                  <dd>
                      <h3 class="moreGoods_goods_name" v-text="item.goodsName"></h3>
                      <p class="moreGoods_goods_text" v-text="item.goodsShows"></p>
                      <div v-if="isLogin">
                        <p class="moreGoods_goods_price" v-if="item.vipGrade > 0">
                          <span  class="fontColor" v-text="item.gssPrice"></span>{{'元/'+item.priceUnit}}<del>{{item.nomalPrice + '元/'+item.priceUnit}}</del>
                        </p>
                        <p class="moreGoods_goods_price" v-else>
                          <span  class="fontColor" v-text="item.gssPrice"></span>{{'元/'+item.priceUnit}}<span v-text="item.priceDesc"></span>
                        </p>
                        <div class="moreGoods_goods_num">
                          <div class="moreGoods_goods_icon">
                            <span v-if="item.isSale" class = "icon_cu"></span>
                            <span v-if="item.isNew" class = "icon_ji"></span>
                            <span v-if="item.isRecommend"  class = "icon_jian"></span>
                            <span v-if="item.isHot" class = "icon_re"></span>
                          </div>
                          <div class="moreGoods_goods_number clearfloat" >
                            <b class='bStyle' v-if="getNumText(item)" v-text="getNumText(item)" ></b>
                            <span v-if="!getNumText(item)" v-show="getGoodNum(item.id)" class="goodsNumber_min"  v-on:click.stop="cutGood(item)"><img src="../../assets/img/btn_m@2x.png"/></span>
                            <span v-if="!getNumText(item)" v-show="getGoodNum(item.id)" class="goodsNumber fontColor" v-text="getGoodNum(item.id)"></span>
                            <span v-if="!getNumText(item)" class="goodsNumber_max" v-on:click.stop="addGood(item,$event)"><img src="../../assets/img/btn_a@2x.png"></span>
                          </div>
                        </div>
                      </div>
                  </dd>
                </dl>
              </li>
            </ul>
            <p class="lodemore" v-show='leftNavList.length' v-text="isLast ? '没有更多数据了':'点击加载更多'" @click="loadMore"></p>
            <p class="noMore" v-show="leftNavList.length == 0" v-text="'暂无更多信息'"></p>
          </div>
        </div>
      </div>
    </div>
    <app-footer-go-shop :goShopCart="goShopCart" :systemMoney="systemMoney" v-on:listenSubmit="submitGoShopCart"></app-footer-go-shop>
  </div>
</template>
<script>
  import appHeader from "../../components/public/header.vue";
  import appFooterGoShop from "../../components/footerGoShop.vue";
  import { mapState , mapMutations } from "vuex";
  import { getSystem ,getMoreFistList , getMoreSecondList , getMoreGoodsList , submitGoCart } from "../../api/index.js";
  import { goodlist1 } from "../../common/goods_car.js";
  import $ from 'jquery';
  export default {
    name: 'more',
    data() {
      return {
        headerMsg:{
          type:"jump",
          title:'更多商品',
          left:'返回',
          jumpBefore:'home',
        },
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        websiteNode:this.websiteDate.code,
        topNavList:[],//顶部导航
        topNavIndex:0,
        leftNavList:[],//侧边导航
        leftNavIndex:0,
        goodsList:[],//商品列表
        tagesNav:[],//商品列表里面的菜单项
        tagesNavIndex:0,
        isClickLoad:false,//是否点击加载
        typeCode:"",
        eyeId:'',
        goodsType:'',
        isLast:false,
        queryParameter:null,
        //本地购物车
        //systemMoney:-1,//系统参数配置中配置的起售金额
        showMoveDot: [], //控制下落的小圆点显示隐藏
        elLeft: 0, //当前点击加按钮在网页中的绝对top值
        elBottom: 0, //当前点击加按钮在网页中的绝对left值
        receiveInCart: false, //购物车组件下落的圆点是否到达目标位置
        windowHeight: null, //屏幕的高度
        cache:{
          'goods_first_type':{},
          'goods_second_type':{},
          'goods_info_show_fou':{}
        }
      }
    },
    components: {
      appHeader,
      appFooterGoShop
    },
    computed:{
      ...mapState([
          'tokenId','secretKey','firmId','userData','isLogin','system',
          'goShopCart',
      ]),
      // 获取宽度
      getTopWidth:function(){
        return  (this.topNavList.length * 164) + 24 +'px'
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
      systemMoney:function () {
        if (this.system) {
          return this.system.how_much_money_dispatch;
        }
      }
    },
    created(){
      if(this.$route.query.typeCode){
        this.queryParameter = this.$route.query.typeCode
      }
      this.INIT_DATA();
      this.INIT_BUYCART();
    },
    watch:{
      goShopCart: {
        handler:function( val,oldVal ) {
          localStorage.setItem('good',JSON.stringify(val))
        },
        deep:true,
      }
    },
    mounted() {
      // 数据初始化
      if (this.isLogin) {
        this.publicParameters = {
          tokenId:this.tokenId,
          source:'firmId'+this.firmId,
          sign:this.$md5('firmId'+this.firmId+"key"+this.secretKey).toUpperCase()
        }
      }
      this.initData()
      this.goods_first_nav()
      this.windowHeight = window.innerHeight;
      
    },
    methods: {
      ...mapMutations([
        'INIT_DATA','INIT_BUYCART','SAVE_SYSTEM'
      ]),
      //初始化时获取基本数据
      async initData(){
        if (!this.system) {
          let _this = this;
          getSystem().then(d => {
            if (d.statusCode == 100000) {
              _this.SAVE_SYSTEM(d.data)
            }
          })
        };
      },
      //请求一级列表
      goods_first_nav:function () {
        let _this = this;
        getMoreFistList(_this.firmId).then(function (d) {
          if(d.statusCode == "100000"){
            
            _this.goods_first_nav_data(d.data)
            
          }
        }).catch(err => {
          console.log(err)
        });
      },
      //对于一级列表的数据处理
      goods_first_nav_data:function (data) {
        if (this.cache['goods_first_type']) {
            this.cache['goods_first_type'] = data;
          }
        this.topNavList = data;
        if (!this.isClickLoad) {
          if (this.queryParameter) {
            let code = this.queryParameter.substring(0,2);
            this.topNavIndex = this.filterValofData(code,this.topNavList);
          } else {
            this.topNavIndex = 0;
          }
          setTimeout(() => {
            let topLeft = document.querySelector(".moreDoogs_main_top")
            let ele = document.querySelectorAll(".moreDoogs_main_top_list li")[this.topNavIndex]
            console.log(ele)
            if (ele.offsetLeft > 200) {
              topLeft.scrollLeft = ele.offsetLeft-200
            }else{
              topLeft.scrollLeft = 0
            }
          }, 200);
        } 
        this.typeCode = this.topNavList[this.topNavIndex].typeCode;
        this.goods_second_nav()
      },
      //筛选数组数据里面的某个数据 == 返回值为在数组的位置
      filterValofData:function (val , arr) {
        let index = 0;
        let data = arr.filter(function (o , i ) {
          if (o.typeCode == val) {
            index = i;
            return;
          }
        })
        return index;
      },
      //二级列表菜单的请求
      goods_second_nav:function () {
        let _this = this;
        getMoreSecondList(_this.firmId , _this.typeCode ).then(function (d) {
          if(d.statusCode == "100000"){
            
            _this.goods_second_nav_data(d.data)
          }
        }).catch( err => {
          console.log(err)
        });
      },
      //二级列表菜单的数据处理
      goods_second_nav_data:function (data) {
        if (!data.length) {
          return;
        };
        if (!this.cache['goods_second_type'][this.typeCode]) {
          this.cache['goods_second_type'][this.typeCode] = data;
        }
        this.leftNavList = data;
        if (!this.isClickLoad) {
          if (this.queryParameter) {
            let code = this.queryParameter;
            this.leftNavIndex = this.filterValofData(code,this.leftNavList);
          } else {
            this.leftNavIndex = 0;
          }
          setTimeout(() => {
            let topLeft = document.querySelector(".moreDoogs_main_box_left_wrap")
            let ele = document.querySelectorAll(".moreDoogs_main_box_left_wrap li")[this.leftNavIndex]
            if (ele.offsetTop > 200) {
              topLeft.scrollTop = ele.offsetTop-200
            }else{
              topLeft.scrollTop = 0
            }
          }, 200);
        }
        this.goodsType = this.leftNavList.length && this.leftNavList[this.leftNavIndex].typeCode;
        if (this.cache['goods_info_show_fou']['typeCode'+this.goodsType + 'eyeId'+this.eyeId + 'pageNo'+this.pageNo ]) {
          this.goods_info_nav_data(this.cache['goods_info_show_fou']['typeCode'+this.goodsType + 'eyeId'+this.eyeId + 'pageNo'+this.pageNo ])
        } else {
          this.goods_info_nav()
        }
      },
      //请求的商品列表
      goods_info_nav:function () {
        let _this = this;
        getMoreGoodsList(_this.firmId , _this.goodsType , _this.eyeId , _this.pageNo , _this.pageSize).then(function (d) {
          if(d.statusCode == "100000"){
            _this.goods_info_nav_data(d.data)
          }else{
            _this.$toast({
              message : d.statusStr,
              position: 'middle',
              duration: 2000,
            })
          }
        }).catch( err => {
          console.log(err)
        })
      },
      //商品列表的数据处理
      goods_info_nav_data:function (data) {
        if (!this.cache['goods_info_show_fou']['typeCode'+this.goodsType + 'eyeId'+this.eyeId + 'pageNo'+this.pageNo ]) {
          this.cache['goods_info_show_fou']['typeCode'+this.goodsType + 'eyeId'+this.eyeId + 'pageNo'+this.pageNo ] = data;
        }
        let listData = data.page;
        this.tagesNav = data.gtes;
        this.isLast  = listData.isLast;
        if( this.pageNo == 1){
          this.goodsList =  listData.objects;
        }else{
          this.goodsList =  this.goodsList.concat(listData.objects);
        }
      },
      submitGoShopCart(){
        let goodsList = goodlist1();
        let obj = Object.assign({
            method: "settlement_shop_cart",
            goodsList:goodsList,
          },this.userBasicParam);

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
      topNav(typeCode,index) {
        let rightTop = document.querySelector(".moreDoogs_main_box_right")
        let wrapTop = document.querySelector(".moreDoogs_main_box_left_wrap")
        let topLeft = document.querySelector(".moreDoogs_main_top")
          if (typeCode != this.typeCode) {
            this.pageNo = '1'
            this.typeCode = typeCode;
            this.topNavIndex = index;
            this.leftNavList = [];
            this.leftNavIndex = 0;
            this.goodsList = [];
            this.isClickLoad = true;

            if (this.cache['goods_second_type'][typeCode]) {
              this.goods_second_nav_data(this.cache['goods_second_type'][typeCode])
            } else {
              this.goods_second_nav()              
            }
            rightTop.scrollTop = 0;
            wrapTop.scrollTop = 0;
            let ele = document.querySelectorAll(".moreDoogs_main_top_list li")[index]
            if (ele.offsetLeft > 200) {
              topLeft.scrollLeft = ele.offsetLeft-200
            }else{
              topLeft.scrollLeft = 0
            }
          }
      },
      leftNav(typeCode,index) {
        let rightTop = document.querySelector(".moreDoogs_main_box_right")
        let wrapTop = document.querySelector(".moreDoogs_main_box_left_wrap")
        if ( this.goodsType != typeCode ) {
          this.eyeId = '';
          this.tagesNavIndex = 0;
          this.pageNo = '1'
          this.goodsType = typeCode
          this.leftNavIndex =  index;
          this.isClickLoad = true;
          console.log(this.cache['goods_info_show_fou'])
          console.log('typeCode'+this.goodsType + 'eyeId'+this.eyeId + 'pageNo'+this.pageNo)
          console.log(this.cache['goods_info_show_fou']['typeCode'+this.goodsType + 'eyeId'+this.eyeId + 'pageNo'+this.pageNo ])
          if (this.cache['goods_info_show_fou']['typeCode'+this.goodsType + 'eyeId'+this.eyeId + 'pageNo'+this.pageNo ]) {
            this.goods_info_nav_data(this.cache['goods_info_show_fou']['typeCode'+this.goodsType + 'eyeId'+this.eyeId + 'pageNo'+this.pageNo ])
          } else {
            this.goods_info_nav()
          }
          
          rightTop.scrollTop = 0;

          let ele = document.querySelectorAll(".moreDoogs_main_box_left li")[index]
          if (ele.offsetTop>200) {
            wrapTop.scrollTop = ele.offsetTop-200
          }else{
            wrapTop.scrollTop = 0
          }
        }
      },
      loadMore:function(){
        if(!this.isLast){
          this.pageNo ++;
          if (this.cache['goods_info_show_fou']['typeCode'+this.goodsType + 'eyeId'+this.eyeId + 'pageNo'+this.pageNo ]) {
            this.goods_info_nav_data(this.cache['goods_info_show_fou']['typeCode'+this.goodsType + 'eyeId'+this.eyeId + 'pageNo'+this.pageNo ])
          } else {
            this.goods_info_nav()
          }
        }
      },
      toDetail(item) {
        const id = item.id;
			  sessionStorage.setItem('goodsDetails',JSON.stringify(item));
			  this.$router.push({ path:'detail', query:{id:id ,typeCode:this.goodsType}})
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
          } else{
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
      threeNav(index,id){
        this.pageNo = '1'
        this.tagesNavIndex = index;
        this.eyeId = id;
        if (this.cache['goods_info_show_fou']['typeCode'+this.goodsType + 'eyeId'+this.eyeId + 'pageNo'+this.pageNo ]) {
          this.goods_info_nav_data(this.cache['goods_info_show_fou']['typeCode'+this.goodsType + 'eyeId'+this.eyeId + 'pageNo'+this.pageNo ])
        } else {
          this.goods_info_nav()
        }
      }
    }
  }
</script>
<style scoped>
.icon_vip1 {
	display: block;
	position: absolute;
	width: 62px;
	height: 32px;
	background: url(../../assets/img/vip_icon1_square_active.png);
	top: 20px;
	left: 0;
}

.icon_vip2 {
	display: block;
	position: absolute;
	width: 62px;
	height: 32px;
	background: url(../../assets/img/vip_icon2_square_active.png);
	top: 20px;
	left: 0;
}

.icon_vip3 {
	display: block;
	position: absolute;
	width: 62px;
	height: 32px;
	background: url(../../assets/img/vip_icon3_square_active.png);
	top: 20px;
	left: 0;
}

.icon_vip4 {
	display: block;
	position: absolute;
	width: 62px;
	height: 32px;
	background: url(../../assets/img/vip_icon4_square_active.png);
	top: 20px;
	left: 0;
}
.moreDoogs_main_wrap {
	background: #EBEAEA;
	width: 750px;
	position: absolute;
  margin-top: 87px;
}
/* .moreDoogs_main_top::-webkit-scrollbar-track ,.moreDoogs_main_box_left_wrap::-webkit-scrollbar-track,.moreDoogs_main_box_right::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #F5F5F5;
	border-radius: 10px;
}
.moreDoogs_main_top::-webkit-scrollbar ,.moreDoogs_main_box_left_wrap::-webkit-scrollbar,.moreDoogs_main_box_right::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background-color: #f5f5f5;
}
.moreDoogs_main_top::-webkit-scrollbar-thumb ,.moreDoogs_main_box_left_wrap::-webkit-scrollbar-thumb,.moreDoogs_main_box_right::-webkit-scrollbar-thumb {
  background-color: #AAA;
	border-radius: 10px;
	background-image: -webkit-linear-gradient(90deg,
                        rgba(0, 0, 0, .2) 25%,
                        transparent 25%,
                        transparent 50%,
                        rgba(0, 0, 0, .2) 50%,
                        rgba(0, 0, 0, .2) 75%,
                        transparent 75%,
                        transparent)
} */
/* .moreDoogs_main_top::-webkit-scrollbar ,.moreDoogs_main_box_left_wrap::-webkit-scrollbar,.moreDoogs_main_box_right::-webkit-scrollbar {
  display: none;
} */
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
  position: relative;
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
.moreGoods_goods_number {
  float: right;
  height: 62px;
  padding-right: 10px;
  line-height: 62px;
  text-align: right;
  width: 240px
}
.move_dot{
  width: 20px;
  height: 20px;
  position: absolute;
  background: #f56d15;
  border-radius: 50%;
  z-index: 600;
}
.noMore{
  width: 100%;
  height: 100px;
  text-align: center;
  line-height: 80px;
  font-size: 30px;
  cursor: pointer;
  background: #FFF;
  margin-bottom: 10px;
}
.moreGoods_box_list_class {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 20px 20px 20px 0;
  font-size: 30px;
  text-align: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}
.moreGoods_box_list_class .active {
  border-color: #ea5a2a;
  color: #ea5a2a;
}
.moreGoods_box_list_class li {
  padding: 8px 20px;
  height: 60px;
  margin-left: 30px;
  margin-bottom: 30px;
  line-height: 42px;
  border: 1px solid #999;
  border-radius: 8px;
}
</style>
