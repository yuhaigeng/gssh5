<template>
   <div class="my">
        <app-header :type="headerMsg" :logined="logined"   v-show="logined"></app-header>
        <loginState :userInfo = "userInfo" :userVipInfo= "userVipInfo" :logined="logined" ></loginState>
        <div  v-cloak class="cont cont1 clearfloat">
        <router-link to="vip" tag="dl"  class="float_left " >
            <dt><b>VIP</b></dt>
            <dd>服务</dd>
        </router-link>
        <router-link to="onlineCoupon" tag="dl"  class="float_left " >
            <dt><b v-text='userVipInfo.coupons || 0'></b><span>张</span></dt>
            <dd>优惠券</dd>
        </router-link>
        <router-link to="score" tag="dl" class="float_left" >
            <dt><b v-text='userVipInfo.surplusScore || 0'></b><span>个</span></dt>
            <dd>果币商城</dd>
        </router-link>
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
import md5 from 'js-md5';
export default {
   name: 'my',
   components: {
        appHeader,
        appFooter,
        loginState,
        personalOptions,
   },
   data() {
       return {
            headerMsg:{
                type:"common3",
                title:'我的',
                routerPath:'/setUp',
            },
            logined:localStorage.getItem("user_data") ? true : false,
            method:["user_personal_msg","firm_vip_info"],
            firmId:  localStorage.getItem("user_data") ? JSON.parse(localStorage.getItem("user_data")).firmInfoid : "" ,
            userBasicParam:{
                source:'firmId'+ this.firmId,
                tokenId:localStorage.getItem("tokenId"),
                sign :md5('firmId'+ this.firmId + "key" + localStorage.getItem("secretKey")).toUpperCase()
             },
            userInfo:{},
            userVipInfo:{},
            orderList:dateModule.orderList,
            otherList:dateModule.otherList,
            title:dateModule.title,
            title1:dateModule.title1,
        }
   },
   mounted(){
       if(localStorage.getItem("user_data")){
                 this.personApi()
             this.firm_vip_info()
       }
            
   },
   methods:{
       personApi:function(){
            this.$ajax.get(this.HOST, {
                    params:$.extend({
                       method:this.method[0],
				      firmId:this.firmId
                    },this.userBasicParam)
            }).then(resp => {
                console.log(resp.data)
                this. userInfo = resp.data.data
            }).catch(err => {
                console.log('请求失败：'+ err.statusCode);
            });
       },
       firm_vip_info:function(){
            this.$ajax.get(this.HOST, {
                    params:{
                       method:this.method[1],
				       firmId:this.firmId
                    }
            }).then(resp => {
                console.log(resp.data)
                this.userVipInfo=resp.data.data

            }).catch(err => {
                console.log('请求失败：'+ err.statusCode);
            });
       },
    

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
          linkUrl:'orderSettlement',
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
          linkUrl:'collect',
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
