<template>
   <div class="my">
        <app-header :type="headerMsg" :logined="logined"   v-show="logined"></app-header>
        <loginState :userInfo = "userInfo" :userVipInfo= "userVipInfo" :logined="logined" ></loginState>
        <div  v-cloak class="cont cont1 clearfloat">
        <dl class="float_left " >
            <dt><b>VIP</b></dt>
            <dd>服务</dd>
        </dl>
        <dl class="float_left" >
            <dt><b v-text='userVipInfo.coupons || 0'></b><span>张</span></dt>
            <dd>优惠券</dd>
        </dl>
        <dl class="float_left" >
            <dt><b v-text='userVipInfo.surplusScore || 0'></b><span>个</span></dt>
            <dd>果币商城</dd>
        </dl>
        </div>
        <personalOptions :orderList="orderList" :title ="title" ></personalOptions>
        <personalOptions :orderList="otherList" :title ="title1"></personalOptions>
        <app-footer></app-footer>
   </div>
</template>

<script>
import appHeader from "../../components/public/header.vue";
import appFooter from "../../components/public/footer.vue";
import loginState from "./loginState.vue";
import personalOptions from "./personalOptions.vue";
export default {
   name: 'my',
   data() {
       return {
          headerMsg:{
                    type:"common3",
                    title:'我的',
                    routerPath:'/setUp',
                },
         logined: true,
         userInfo:{
              faceImgUrl: "zhangshuoinfo.b0.upaiyun.com/2018/8/1535597472",
              firmName: "掌烁测试-朱高飞",
              linkTel: "18315318515"

         },
         userVipInfo:{
            coupons: 0,
            firmExp: 82.5,
            firmId: "132",
            firmMonthExp: 82.5,
            lastMonthExp: 0,
            monthExp: 110,
            needExp: 27.5,
            surplusScore: 18,
            upExp: 27.5,
            vip: -1,
            vipGrade: 0,
         },
          orderList:dateModule.orderList,
          otherList:dateModule.otherList,
          title:dateModule.title,
          title1:dateModule.title1,
         
       }
   },
  components: {
    appHeader,
    appFooter,
    loginState,
    personalOptions,
  }
}
var dateModule  = {
      logined:false,//是否登陆
      title:"我的订单",
      title1:"其他",
      orderList:[//订单列表数据结构
        {
          icon:'.././static/img/icon_order1.png',
          type:1,
          name:'待发货',
          linkUrl:'',
        },{
          icon:'.././static/img/icon_order2.png',
          type:2,
          name:'已配货',
          linkUrl:'',
        },{
          icon:'.././static/img/icon_order3.png',
          type:3,
          name:'待支付',
          linkUrl:'',
        },{
          icon:'.././static/img/icon_order0.png',
          type:0,
          name:'全部订单',
          linkUrl:'',
        }
      ],
      //其他列表数据结构
      otherList:[
        {
          icon:'.././static/img/icon_address.png',
          type:null,
          name:'收货地址',
          linkUrl:'address',
        },{
          icon:'.././static/img/icon_collection.png',
          type:null,
          name:'收藏',
          linkUrl:'',
        }
      ]
  }
</script>

<style scoped >
.my{
    max-width: 750px;
}
.cont.cont1 {
  height: 160px;
  background: #FFF;
}
.cont {
    width: 100%;
    background: #fff;
    margin-bottom: 22px;
}
.cont1 dl {
    float: left;
    width: 250px;
    text-align: center;
}
.cont1 dl dt {
    padding-top: 36px;
}
.cont1 dl dt b {
    font-size: 40px;
    color: #F51B44;
}
.cont1 dl dd {
    font-size: 28px;
    color: #333;
    line-height: 44px;
}
.cont1 dl dt span {
    font-size: 24px;
    color: #F51B44;
}
</style>
