<template>
   <div class="order-pay common-wrap">
      <payHeader :type='headerMsg'></payHeader>
      <div class="main-wrap">
        <div class="main">
          <div class="order_pay_order_info">
            <div class="order_pay_order_code">
              订单编号: <span v-text="orderMsg.orderCode"></span>
            </div>
            <div class="order_pay_order_money">
              支付金额: <span  v-text="orderMsg.realPayMoney + '元'"></span>
            </div>
          </div>
          <ul class="order_pay_mode_box">
            <!-- <li id="weixin" @click="paySel = 0" v-show ="paySel === 0">
              <dl>
                <dt class="sprite_login icon_mine_wechat"></dt>
                <dd class="order_pay_mode_center">微信支付</dd>
                <dd class="order_pay_mode_right sprite_login " :class="paySel === 0 ? 'icon_chosen' : 'icon_chosen_a'" data='1'></dd>
              </dl>
            </li> -->
            <li id="yinhangka"  @click="paySel = 1">
              <dl>
                <dt class="sprite_login icon_pay_card"></dt>
                <dd class="order_pay_mode_center">银行卡支付</dd>
                <dd class="order_pay_mode_right sprite_login"  :class="paySel === 1 ? 'icon_chosen' : 'icon_chosen_a'" data='3'></dd>
              </dl>
            </li>
          </ul>
          <form action="https://wap.lianlianpay.com/payment.htm" method="post" id="form1">
            <input type="hidden" name="req_data" id="input1" value='' />
          </form>
          <div class="true_order no_pay" style="background: #999;" @click="pay">
            确认支付
          </div>
          <div class="pay_msg">
            由于微信支付策略问题，暂时无法支付。如需支付请下载APP使用支付宝支付。
          </div>
        </div>
      </div>
   </div>
</template>

<script>
import  payHeader from "../../components/public/header.vue";
import { getTokenId , getUserData, getSecretKey, getIsWeiXin} from "../../common/common.js";
   export default {
       name:'orderPay',
       components:{
          payHeader
       },
       data() {
          return {
            paySel:1,
            headerMsg:{
              type:'common',
              left:'返回',
              title:'订单支付'
            },
            orderMsg:{},
            userInfo:{},
            publicParameter : {}
          }
       },
      mounted(){
        this.api();
        this.userInfo = JSON.parse(getUserData())
        let pay = localStorage.getItem('order_pay')
        if (pay) {
            this.orderMsg = JSON.parse(pay)
            this.publicParameter = {
              orderCode : JSON.parse(pay).orderCode,
              source : 'firmId'+this.userInfo.firmInfoid,
              sign : this.$md5('firmId'+this.userInfo.firmInfoid+"key"+getSecretKey()).toUpperCase(),
              tokenId : getTokenId()
            }
        }
      },
      methods:{
        llpay:function () {
          let obj = Object.assign({
            method:'order_topay_llpay',
          },this.publicParameter)
          this.$ajax.get(_this.HOST, {
            params:obj
          }).then(result => {
            console.log(result)
            return result.data;
          }).then(data => {
            if (data.statusCode == 100000) {
              let str=JSON.stringify(data.data);
              let input = document.getElementById('input1')
              let form  = document.getElementById('form1')
              input.value = str ;
              form.submit()
            } else {
              console.log(data.statusStr)
            }
          })
        },
        // wxpay:function(){
        //    this.$ajax.get('/api', {
        //           params:Object.assign({
        //             method:"goto_pay_weixin",
        //             url:common.http,
        //             websiteNode:pub.websiteNode,
        //             openId:pub.openId,
        //           },this.publicParameter)
        //       }).then(result => {
        //           console.log(result)
        //           return result.data;
        //       }).then(data => {
        //         if(data.statusCode == '100200'){
				// 		    	alert("微信提交订单异常，请重新操作!");
        //         }else if(data.statusCode == '100000'){
        //           //获取PrepayId
        //           //调用微信支付JSAPI
        //           var result = data.data;
        //           var prepayId = result.prepayId;
        //           var nonceStr = result.nonceStr;
        //           var timeStamp = result.timeStamp;
        //           var packages = result.package;//"prepay_id="+prepayId;
        //           var paySign = result.paySign;
        //           var appId = result.appId;
        //           var signType = result.signType;
        //           var configSign = result.configSign;
        //           var timestamp = result.timestamp;
        //           var noncestr = result.noncestr;
        //             wx.config({
        //               debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        //               appId: appId, // 必填，公众号的唯一标识
        //               timestamp:timestamp, // 必填，生成签名的时间戳
        //               nonceStr: noncestr, // 必填，生成签名的随机串
        //               signature: configSign,// 必填，签名，见附录1
        //               jsApiList: ["chooseWXPay"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        //           });
        //             wx.ready(function(){
        //               wx.chooseWXPay({
        //                   timestamp: timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        //                   nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
        //                   package: packages, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        //                   signType: signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        //                   paySign: paySign, // 支付签名
        //                   success: function (res) {
        //                       //支付成功后的回调函数
        //                 window.location.href='order_management.html';
        //                   }
        //               })
        //             })
        //         }else{
        //           common.prompt(data.statusStr)
        //         }
        //     })
        // },
        api:function(){
          if(this.orderMsg){
            if(getIsWeiXin()){
              // this.paySel = 0
            }else{
              this.paySel = 1
            }
          }
        },
        pay:function(){
          const pay = document.getElementsByClassName('true_order')[0].classList.contains('no_pay');
          if (!pay) {
            if (this.paySel == 0) {
              // pub.openId && pub.pay.wxpay();
            }
            if (this.paySel == 1 ) {
              this.llpay();
            }
          }
        }
      }
   }
</script>

<style scoped>
.main-wrap{
  margin-top:107px;
}
.order_pay_order_info {
    width: 100%;
    padding: 20px 24px 24px 24px;
    margin-top: 20px;
    background: #FFF;
    font-size: 26px;
    line-height: 50px;
}
.order_pay_mode_box {
    width: 100%;
    padding: 0 24px;
    background: #FFF;
    font-size: 26px;
    margin-top: 20px;
    border-top: 1px solid #d7d7d7;
    border-bottom: 1px solid #d7d7d7;
}
.order_pay_mode_box li {
    height: 90px;
    border-bottom: 1px solid #D7D7D7;
    line-height: 90px;
}
.order_pay_mode_box li dl dd, .order_pay_mode_box li dl dt {
    float: left;
}
.order_pay_mode_box dt {
    width: 50px;
    height: 90px;
}
.icon_mine_wechat {
    background-position: -230px -256px;
}
.sprite_login {
    background-image: url(../../assets/img/sprite_login.png);
    background-repeat: no-repeat;
}
.order_pay_mode_box .order_pay_mode_center {
    padding: 0 20px;
}
.icon_pay_card {
    background-position: -137px -256px;
}
.order_pay_mode_box .order_pay_mode_right {
    float: right;
}
.icon_chosen_a {
    background-position: -368px -280px;
}
.icon_chosen {
    background-position: 20px -489px;
}
.order_pay_mode_right {
    width: 100px;
    height: 90px;
}
.true_order {
    width: 80%;
    height: 90px;
    margin: 30px auto;
    line-height: 90px;
    background: #F76A10;
    color: #FFF;
    text-align: center;
    font-size: 36px;
    font-weight: 700;
    border-radius: 45px;
}
.pay_msg {
    padding: 100px 20px;
    line-height: 40px;
    color: crimson;
    text-align: center;
    font-size: 32px;
}
</style>
