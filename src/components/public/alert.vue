<template >
    <div class="alert">
        <div class="my_bg"></div>
        <div class="logistic_show" :class="noticeInfoList.alertType == '1' && 'logistic_show1'">
            <div class="logistic_show_header">
                <h3 class="logistic_show_title" v-text="noticeInfoList.noticeTitle"></h3>
                <span class="logistic_back" @click="exchange"></span>
            </div>
            <div class="logistic_show_main" :class="noticeInfoList.alertType == '1' && 'logistic_show_main1'">
                <div class="logistic_show_text" v-html="noticeInfoList.noticeContent"></div>
            </div>
            <div class="logistic_show_footer" :class="noticeInfoList.alertType == '1' && 'logistic_show_footer1'">by:果速送平台</div>
        </div>
    </div>
</template>

<script>
    export default {
         name:'alert',
         props:["noticeInfoList"],
         data() {
             return {
            //    isShow:false,
            //    noticeInfoList:{
            //        noticeTitle: "【下单时间调整】",
            //        noticeContent: "即日起杭州站下单时间为：下午14:00至晚间24:00"
            //        }
             }
         },
          mounted(){
            //   console.log(this.noticeInfoList)
        },
         methods:{
             exchange:function(){
                this.$emit('listenClose',true)
             }
         }
    }
</script>

<style scoped>
    .logistic_show{
        width: 600px;
        height: 690px;
        position: fixed;
        z-index: 9000;
        background: rgb(255, 255, 255);
        top: 50%;
        left: 50%;
        margin-left: -300px;
        margin-top: -345px;
        border-radius: 10px;
    }
    .logistic_show1{
        height: 70%;
        top: 15%;
        margin-top: 0px;
    }
    .logistic_show_header {
        height: 100px;
        background: #f76a10;
        color: #FFF;
        text-align: center;
        border-radius: 10px 10px 0 0;
    }
    .logistic_show_title {
        font-size: 36px;
        line-height: 100px;
    }
    .logistic_back {
        width: 60px;
        height: 60px;
        position: absolute;
        right: -30px;
        top: -30px;
        background-image: url(../../assets/img/sprite.png);
        background-position: -888px 0;
        background-repeat: no-repeat;
        border-radius: 50%;
        font-size: 36px;
        line-height: 100px;
    }
    .logistic_show_main {
        width: 100%;
        padding: 32px;
        height: 500px;
        overflow-y: auto;
    }
    .logistic_show_text {
        font-size: 28px;
        line-height: 40px;
    }
   .logistic_show_footer {
        color: #f8680f;
        height: 90px;
        font-size: 28px;
        padding: 0 32px;
        line-height: 75px;
        text-align: left;
    }
    .my_bg {
        position: fixed;
        width: 100%;
        height: 100%;
        background: #000;
        top: 0;
        left: 0;
        opacity: .3;
        z-index: 999;
        filter: Alpha(opacity=30);
        overflow: hidden;
    }
    .logistic_show_footer1{
        height: 10%;
    }
    .logistic_show_main1{
        height: 80%;
    }
</style>
