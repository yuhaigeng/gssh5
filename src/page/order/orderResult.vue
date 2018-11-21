<template>
   <div class="order-result common-wrap">
        <appHeader :type="headerMsg"></appHeader>
        <div class="main-wrap">
          <div class="main">
            <!--提交成功-->
            <div class="order_result">
              <div class="order_result_title"  v-html="dataInfo.title[statusData.statusCode]"></div>
              <div class="order_result_box">
                <div class="order_err_info"></div>
                <div class="order_suc_num" v-html="'订单编号：'+ statusData.orderCode"></div>
                <div class="order_suc_time" v-html="dataInfo.time[statusData.statusCode]"></div>
                <div class="order_suc_look" @click="jumpOrder" v-text="'查看订单'"></div>
              </div>
            </div>
          </div>
		    </div>
   </div>
</template>

<script>
import appHeader from "../../components/public/header.vue";
export default {
  name:'orderResult' ,
  components:{
    appHeader
  },
  data() {
    return {
      headerMsg:{
      type:"jump",
      title: '订单结算' ,
      jumpBefore:'orderManagement',
      num:'1',
      left:'返回'
      },
      statusData:JSON.parse(sessionStorage.getItem('orderResult')),
      dataInfo:{
        title:{
          '100000':'订单提交成功',
          '100903':'有未支付订单',
          '100907':'您今天已经下单，请勿多次下单！'
        },
        info:{
          '100000':'',
          '100903':'有未支付订单',
          '100907':'如需重新下单，请取消之前所下订单！'
        },
        time:{
          '100000':'预计次日'+JSON.parse(localStorage.getItem('system')).default_dispatch_time+'送达，请保持通讯设备畅通',
          '100903':'',
          '100907':''
        }
      }
    }
  },
  methods:{
    jumpOrder:function(){
      let data = JSON.parse(sessionStorage.getItem('orderResult'))
      let orderData = {
        orderCode: data.orderCode,
        type: 1
      };
      sessionStorage.setItem('orderData',JSON.stringify(orderData))
      sessionStorage.removeItem('orderResult')
      this.$router.push({path:'orderDetails'})

    }
  }
}
</script>

<style scoped>
.main-wrap {
   margin-top:87px;
}
.order_result_title {
    width: 100%;
    height: 100px;
    background: #f8f8f8;
    line-height: 100px;
    text-align: center;
    color: #ff6201;
    font-size: 34px;
    border-bottom: 1px solid #eaeaea;
}
.order_result_box {
    padding-bottom: 20px;
    background: #FFFFFF;
}
.order_err_info {
    width: 100%;
    height: 70px;
    line-height: 70px;
    text-align: center;
    font-size: 26px;
    color: #999;
}
.order_suc_num {
    width: 100%;
    height: 60px;
    text-align: center;
    line-height: 60px;
    font-size: 26px;
    color: #000;
}
.order_suc_time {
    width: 100%;
    padding: 0 24px;
    line-height: 50px;
    text-align: center;
    color: #b3b3b3;
    font-size: 22px;
}
.order_suc_look {
    width: 230px;
    margin: 36px auto;
    height: 64px;
    border-radius: 32px;
    background: #ff6201;
    color: #FFF;
    font-size: 28px;
    text-align: center;
    line-height: 64px;
}

</style>
