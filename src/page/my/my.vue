<template>
  <div class="my common-wrap">
    <app-header :type="headerMsg"   v-show="isLogin">
      <div class='my-head'   slot="myLeft">
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
        <a class="telPhone" :href="'tel:'+system.feedback_method"></a>
      </div>
    </app-header>
    <loginState :userInfo = "userInfo" :userVipInfo= "userVipInfo" :isLogin = "isLogin"  :userBasicParam = 'userBasicParam' ></loginState>
    <div v-cloak class="cont cont1 clearfloat">
      <router-link v-for="(item,index) in navInfo " :to="isLogin ? item.jumpRouter : 'login'" tag="dl"  class="float_left " :key='index'>
        <dt v-html="isLogin ? item.text1 : item.text "></dt>
        <dd v-text="item.text2"></dd>
      </router-link>
    </div>
    <personalOptions v-for="(item,index) in infoData" :info="item" :isLogin='isLogin' :key="index"></personalOptions>
    <app-footer :isLogin="isLogin" :isNew = 'isNew'></app-footer>
  </div>
</template>

<script>
import appHeader from "../../components/public/header.vue";
import appFooter from "../../components/public/footer.vue";
import loginState from "./loginState.vue";
import personalOptions from "./personalOptions.vue";
import {  getMessage , getIsLogin , getTokenId , getUserData, getSecretKey } from "../../common/common.js";
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
      userBasicParam:{},
      userInfo:{},
      userVipInfo:{},
      infoData:[
        dateModule[0],
        dateModule[1]
      ],
      navInfo:[],
      system:{},
      isNew:false,//表示是否有新消息
    }
  },
  mounted(){
    this.navInfo = [
        dateModule[2],
        dateModule[3],
        dateModule[4],
    ]
    if (getIsLogin()) {
      this.system = JSON.parse(localStorage.getItem('system'))
      const userInfo = JSON.parse(getUserData());
      this.userBasicParam ={
        firmId:userInfo.firmInfoid,
        source:'firmId'+ userInfo.firmInfoid,
        tokenId: getTokenId(),
        sign :this.$md5('firmId'+ userInfo.firmInfoid + "key" + getSecretKey()).toUpperCase()
      }
      if(localStorage.getItem("isNew")){
        this.isNew = JSON.parse(localStorage.getItem("isNew"))
      }else{
        getMessage(this)
        localStorage.setItem('isNew',this.isNew)
      }
      this.personApi()
      this.firm_vip_info()
    }
       
    
  },
  methods:{
    personApi:function(){
      let obj = Object.assign({
          method:this.method[0],
          firmId: this.userBasicParam.firmId
        },this.userBasicParam);
      this.$ajax.get(this.HOST, {
        params: obj
      }).then(resp => {
        if(resp.data.statusCode ==  "100000"){
          this.userInfo = resp.data.data
        }else{
          this.$toast({
            message : resp.data.statusStr,
            position: 'bottom',
            duration: 2000,
          })
        }
      }).catch(err => {
        console.log(err)
      });
    },
    firm_vip_info:function(){
      let obj = {
          method:this.method[1],
          firmId: this.userBasicParam.firmId
        }
      this.$ajax.get(this.HOST, {
        params: obj
      }).then(resp => {
        if(resp.data.statusCode ==  "100000"){
          this.userVipInfo=resp.data.data
          dateModule[3].text1= `<b>${this.userVipInfo.coupons}</b><span>张</span>`
          dateModule[4].text1= `<b>${this.userVipInfo.surplusScore}</b><span>个</span>`
          this.navInfo = [
            dateModule[2],
            dateModule[3],
            dateModule[4],
          ]
        }else{
          this.$toast({
            message : resp.data.statusStr,
            position: 'bottom',
            duration: 2000,
          })
        }
      }).catch(err => {
        console.log(err)
      });
    }
  }
}
var dateModule  = [
  {
    title:"我的订单",
    list:[//订单列表数据结构
      {
        icon:'../../static/img/icon_order1.png',
        type:1,
        name:'待发货',
        linkUrl:'orderManagement',
      },{
        icon:'../../static/img/icon_order2.png',
        type:2,
        name:'已配货',
        linkUrl:'orderManagement',
      },{
        icon:'../../static/img/icon_order3.png',
        type:3,
        name:'待支付',
        linkUrl:'orderManagement',
      },{
        icon:'../../static/img/icon_order0.png',
        type:4,
        name:'全部订单',
        linkUrl:'orderManagement',
      }
    ]
  },{
    title:"其他",
    //其他列表数据结构
    list:[
      {
        icon:'../../static/img/icon_address.png',
        type:null,
        name:'收货地址',
        linkUrl:'address',
      },{
        icon:'../../static/img/icon_collection.png',
        type:null,
        name:'收藏',
        linkUrl:'collect',
      }
    ]
  },
  { // vip 优惠券 果币商城 数据
    jumpRouter:'vip',
    text: `<b>VIP</b>`,
    text1:`<b>VIP</b>`,
    text2:'服务' 

  },{
    jumpRouter:'coupon',
    text:`<b>0</b><span>张</span>`,
    text1:'',
    text2:'优惠券'

  },{
    jumpRouter:'score',
    text: `<b>0</b><span>个</span>`,
    text1:'',
    text2:'果币商城'
  }]

</script>

<style scoped >
.my{
  position: relative;
  max-width: 750px;
  margin-bottom: 98px;
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
.cont1 >>> b {
  font-size: 40px;
  color: #F51B44;
}
.cont1 dl dd {
  font-size: 28px;
  color: #333;
  line-height: 44px;
}
.cont1 >>> span {
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
