<template>
   <div class="my">
        <app-header :type="headerMsg"   v-show="isLogin">
            <div   class='my-head'   slot="myLeft">
                <router-link to="/setUp" tag="dl">
                    <dt><img src="../../assets/img/icon_set.png"/></dt>
                    <dd>设置</dd>
                </router-link>
            </div>
            <div class='my-head' slot="myRight">
                <dl>
                    <dt><img src="../../assets/img/icon_server.png"/></dt>
                    <dd>人工客服</dd>
                </dl>
                <a class="telPhone"></a>
            </div>

        </app-header>
        <loginState :userInfo = "userInfo" :userVipInfo= "userVipInfo" :isLogin = "isLogin" ></loginState>
        <div  v-cloak class="cont cont1 clearfloat">
        <router-link :to="isLogin ? 'vip' : 'login'" tag="dl"  class="float_left " >
            <dt><b>VIP</b></dt>
            <dd>服务</dd>
        </router-link>
        <router-link :to="isLogin ?'onlineCoupon' : 'login'" tag="dl"  class="float_left " >
            <dt><b v-text='userVipInfo.coupons || 0'></b><span>张</span></dt>
            <dd>优惠券</dd>
        </router-link>
        <router-link :to=" isLogin ? 'score' :'login'" tag="dl" class="float_left" >
            <dt><b v-text='userVipInfo.surplusScore || 0'></b><span>个</span></dt>
            <dd>果币商城</dd>
        </router-link>
        </div>
        <personalOptions :orderList="orderList" :title ="title" :isLogin='isLogin'></personalOptions>
        <personalOptions :orderList="otherList" :title ="title1" :isLogin='isLogin'></personalOptions>
        <app-footer :isLogin="isLogin"></app-footer>
   </div>
</template>

<script>
import appHeader from "../../components/public/header.vue";
import appFooter from "../../components/public/footer.vue";
import loginState from "./loginState.vue";
import personalOptions from "./personalOptions.vue";
import { getSystem , getMessage , getIsLogin , getTokenId , getUserData, getSecretKey } from "../../common/common.js";
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
                type:"my",
                title:'我的',
                routerPath:'/setUp',
            },
            isLogin:getIsLogin(),
            method:["user_personal_msg","firm_vip_info"],
            firmId:  JSON.parse(getUserData()) ? JSON.parse(getUserData()).firmInfoid : "" ,
            userBasicParam:{
                source:'firmId'+ JSON.parse(getUserData()).firmInfoid,
                tokenId: getTokenId(),
                sign :this.$md5('firmId'+ JSON.parse(getUserData()).firmInfoid + "key" + getSecretKey()).toUpperCase()
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
       }
   }
}
var dateModule  = {
      isLogin:false,//是否登陆
      title:"我的订单",
      title1:"其他",
      orderList:[//订单列表数据结构
        {
          icon:'.././static/img/icon_order1.png',
          type:1,
          name:'待发货',
          linkUrl:'orderManagement',
        },{
          icon:'.././static/img/icon_order2.png',
          type:2,
          name:'已配货',
          linkUrl:'orderManagement',
        },{
          icon:'.././static/img/icon_order3.png',
          type:3,
          name:'待支付',
          linkUrl:'orderManagement',
        },{
          icon:'.././static/img/icon_order0.png',
          type:4,
          name:'全部订单',
          linkUrl:'orderManagement',
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
.my-head{
    padding-top:10px;
    height: 87px;
}
.my-head  dl{
    text-align: center;
    display: inline-block;
    color: #fff;
}
.my-head dt{
    width:80px;
    height:44px;
    text-align: center;
}
.my-head dt img{
    vertical-align:top;
    text-align: center;
}
.my-head dd{
    line-height: 36px;
    font-size: 20px;
}
.my-head a.telPhone {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>
