<template>
    <div class="index-module" :class="'index-module' + mainActivityList.goodsNum   ">
        <div class="index-module-title clearfloat">
            <div class="float_left" v-text="mainActivityList.activityTitle">秋季价到-坚果零食盛宴</div>
            <div class="float_right">
                <a href="javascript:void(0);" v-text="'更多'" @click="goMore(mainActivityList)"></a>
            </div>
        </div>
         
        <div class="index-module-goods clearfloat">
            <dl class="index-module-item clearfloat" v-for="(item,index) in  mainActivityList.activityDetailsList" :key="index" @click="goDetails(item)">
                <dt>
                    <img :src="item.goodsInfo.goodsLogo" alt="">
                </dt>
                <dd>
                    <p class="good_name ellipsis" v-text="item.goodsInfo.goodsName"></p>
                    <div class="good_box" v-if="logined">
                        <p class="good_price_box">
                            <span class="good_price_icon">￥</span>
                            <span class="good_price" v-text="item.goodsInfo.gssPrice"></span>
                            <span>/&nbsp;{{item.goodsInfo.priceUnit}}</span>
                        </p>
                    </div>
                    <div class="good_box" v-else>
                    </div>
                </dd>
            </dl>
        </div>
    </div>
</template>

<script>
    export default {
        name:"homeGoods",
        props:['mainActivityList'],
        data() {
             return {
                 logined:localStorage.getItem("user_data") ? true : false,
             }
        },
        mounted(){
            console.log(this.mainActivityList)
        },
        methods:{
            goDetails:function(item){
                console.log(item)
                const id = item.id;
                this.$router.push({path:'/detail',query:{id:id}})
            },
            goMore:function (item) {
                const code = item.linkUrl.trim().split('&')[1];
                
                this.$router.push({path:'/more',query:{typeCode:code}})
            }
        }
    }
</script>

<style scoped>
 .center_wrap {
     max-width:750px;
    margin-bottom: 20px;
}
.index-module {
    background: #FFF;
    margin-bottom: 20px;
    padding: 0 30px;
}
.index-module-title {
    height: 88px;
    border-bottom: 1px solid #E5E5E5;
    line-height: 88px;
}
.index-module-title .float_left {
    font-size: 32px;
    background: -webkit-gradient(linear,left top,right top,from(#f37c30),to(#eb72b6));
    background: linear-gradient(to right,#f37c30,#eb72b6);
    -webkit-background-clip: text;
    color: transparent;
}
.index-module-title .float_right a {
    display: block;
    font-size: 28px;
    color: #999;
    background: url(../../assets/img/arrow_right.png) right center no-repeat;
    padding-right: 40px;
}
.index-module2 .index-module-item:nth-child(1), .index-module2 .index-module-item:nth-child(2), .index-module3 .index-module-item:nth-child(1), .index-module3 .index-module-item:nth-child(2), .index-module3 .index-module-item:nth-child(3) {
    padding-top: 0;
}
.index-module2 .index-module-item:nth-child(2n+1), .index-module3 .index-module-item:nth-child(3n+2) {
    border-right: 1px solid #E5E5E5;
    padding-right: 30px;
}
.index-module .index-module-goods {
    padding: 30px 0;
}
.index-module-item {
    padding: 30px 0;
    border-bottom: 1px solid #E5E5E5;
}
.index-module-item dt {
    position: relative;
    background: url(../../assets/img/default_huodong_pic.png) center no-repeat;
    background-size: 100%;
    overflow: hidden;
    border-radius: 10px;
}
.index-module-item .good_box .good_price_box {
    font-size: 20px;
    text-align: left;
}
.index-module-item .good_box .good_price_icon {
    color: #f51b44;
}
.index-module-item .good_box .good_price {
    color: #f51b44;
    letter-spacing: -3px;
}
/* 3个商品排列样式 */
.index-module3 .index-module-item:nth-child(3n+2) {
    width: 250px;
    padding-left: 30px;
    border-left: 1px solid #E5E5E5;
}
.index-module3 .index-module-item:nth-child(3n) {
    padding-left: 30px;
}
.index-module3 .index-module-item:nth-child(3n+1) {
    padding-right: 30px;
}
.index-module3 .index-module-item {
    float: left;
    width: 220px;
}
.index-module3 .index-module-item dt  {
    width: 190px;
    height: 190px;
}
.index-module3 .index-module-item dt img {
    width: 190px;
    height: 190px;
}
.index-module3 .index-module-item .good_name {
    font-size: 36px;
    color: #333;
    padding-top: 14px;
    height: 62px;
}
.index-module3 .index-module-item .good_box {
    padding-top: 10px;
}
.index-module3 .index-module-item dd .good_price {
    font-size: 34px;
}
/* 2个商品排列样式 */
.index-module2 .index-module-item {
    float: left;
    width: 345px;
    font-size: 36px;
}

.index-module2 .index-module-item dt,
.index-module2 .index-module-item dt img{
    width: 314px;
    height: 314px;
}
.index-module2 .index-module-item .good_box .good_price_box .good_price {
     font-size: 38px;
}
.index-module2 .index-module-item:nth-child(2n) {
    padding-left: 30px;
}
.index-module1 .index-module-item{padding-top: 18px;}
.index-module1 .index-module-item:nth-child(1){padding-top: 0;margin-top: -12px;}
.index-module1 .index-module-item:nth-last-child(1){padding-bottom: 0;border-bottom: none;}
.index-module1 .index-module-item dt,.index-module1 .index-module-item dd{float: left;}
.index-module1 .index-module-item dt{width: 200px;height: 200px;top: 12px;}
.index-module1 .index-module-item dt img {width: 200px; height: 200px;}
.index-module1 .index-module-item dd{padding-left: 30px;width: 490px;}
.index-module1 .good_name,.index-module1 .good_describe{width: 490px;}
.index-module1 .index-module-item dd .good_price{font-size: 48px;}
.index-module1 .good_name {font-size: 36px;}
</style>
