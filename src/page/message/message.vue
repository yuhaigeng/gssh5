<template>
   <div class="message">
        <app-header :type="headerMsg"></app-header>
        <div v-cloak class="main-wrap">
          <div class="main message">
            <div class="message_box">
              <div class="message_item" v-for="item in messages" :key="item">
                <div class="message_item_top clearfloat">
                  <div class="message_tit" v-text="item.msgTitle"></div>
                  <div class="message_time" v-text="item.createTime"></div>
                </div>
                <div class="message_count" v-text="item.messageContent"></div>
              </div>
            </div>
            <p class="lodemore" v-text=" isLast? '没有更多数据了' :'点击加载更多' "></p>
            
          </div>
			</div>
        <app-footer></app-footer>
   </div>
</template>

<script>
import appHeader from "../../components/public/header.vue";
import appFooter from "../../components/public/footer.vue";
export default {
   name: 'message',
   data() {
       return {
         headerMsg:{
            type:"common",
            title:'消息',
            left:'返回'
         },
         isLast:false,
         messages:[
           {msgTitle: "#月末有礼#",createTime: "2018-05-29 18:13:41",messageContent: "立减和满赠活动持续火热进行中，更有为您精心准备特惠商品...(产地直销)玉菇.江苏.箱装1.88元/斤，香蕉（金黄焦）.海南.箱装-N 38元/件，库尔勒香梨(特级).新疆.箱装49元/件...机不可失时不再来，快快点击果速送APP开始下单吧！"},
           {msgTitle: "#月末有礼#",createTime: "2018-05-29 18:13:41",messageContent: "立减和满赠活动持续火热进行中，更有为您精心准备特惠商品...(产地直销)玉菇.江苏.箱装1.88元/斤，香蕉（金黄焦）.海南.箱装-N 38元/件，库尔勒香梨(特级).新疆.箱装49元/件...机不可失时不再来，快快点击果速送APP开始下单吧！"},
           {msgTitle: "#月末有礼#",createTime: "2018-05-29 18:13:41",messageContent: "立减和满赠活动持续火热进行中，更有为您精心准备特惠商品...(产地直销)玉菇.江苏.箱装1.88元/斤，香蕉（金黄焦）.海南.箱装-N 38元/件，库尔勒香梨(特级).新疆.箱装49元/件...机不可失时不再来，快快点击果速送APP开始下单吧！"},
         ]
       }
   },
  components: {
    appHeader,
    appFooter
  }
}
</script>

<style scoped >
.main-wrap {
  max-width: 750px;
  width: 100%;
  margin-top: 87px;
  background: #ebeaea;
}
.main.message {
    padding-bottom: 100px;
}
.main {
    width: 100%;
    height: auto;
}
.message_box {
    padding: 20px;
}
.message_item {
    width: 100%;
    padding: 12px 32px;
    background: #FFF;
    margin-bottom: 20px;
    border-radius: 8px;
}
.message_item_top {
    width: 100%;
    line-height: 48px;
}
.message_tit {
    float: left;
    font-size: 32px;
    color: #000;
}
.message_time {
    float: right;
    font-size: 24px;
}
.message_count {
    font-size: 26px;
    line-height: 40px;
}
.lodemore {
    width: 100%;
    height: 100px;
    text-align: center;
    line-height: 80px;
    font-size: 30px;
    cursor: pointer;
    background: #FFF;
    margin-bottom: 10px;
}

</style>
