<template>
    <div class="index-module" :class="'index-module' + mainActivityList.goodsNum   ">
        <div class="index-module-title clearfloat">
            <div class="float_left" v-text="mainActivityList.activityTitle"></div>
            <div class="float_right">
                <a href="javascript:void(0);" v-text="'更多'" @click="goMore(mainActivityList)"></a>
            </div>
        </div>
         
        <div class="index-module-goods clearfloat">
            <dl class="index-module-item clearfloat" v-for="(item,index) in  mainActivityList.activityDetailsList" :key="index" @click="goDetails(item)">
                <dt> 
                    <img v-lazy="item.goodsInfo.goodsLogo" alt="">
                </dt>
                <dd>
                    <p class="good_name ellipsis" v-text="item.goodsInfo.goodsName"></p>
                    <p class="good_describe ellipsis" v-if="mainActivityList.goodsNum != 3" v-text="item.goodsInfo.goodsShows"></p>
                    <p class="good_tag"><span v-if="item.noteTable && mainActivityList.goodsNum != 3" v-text="item.noteTable"></span></p>
                    <div class="good_box" v-if="isLogin">
                        <div :class="{'float_left':mainActivityList.goodsNum != 3}">
                            <p class="del" v-if="mainActivityList.goodsNum != 3"><del v-text="(item.goodsInfo.nomalPrice ? '¥'+item.goodsInfo.nomalPrice : '' )"></del></p>
                            <p class="good_price_box" >
                                <span class="good_price_icon">￥</span>
                                <span class="good_price" v-text="item.goodsInfo.gssPrice"></span>
                                <span>/&nbsp;{{item.goodsInfo.priceUnit}}</span>
                            </p>
                        </div>
                        <div class="float_right" v-if="mainActivityList.goodsNum != 3">
                            <span class="button">立即购买</span>
                        </div>
                    </div>
                </dd>
            </dl>
        </div>
    </div>
</template>

<script>
    export default {
        name:"homeGoods",
        props:['mainActivityList','isLogin'],
        data() {
             return {
                 logined:localStorage.getItem("user_data") ? true : false,
             }
        },
        methods:{
            goDetails:function(item){
                const id = item.goodsId;
                this.$router.push({path:'/detail/'+id})
            },
            goMore:function (item) {
                const code = item.linkUrl.trim().split('&')[1];
                
                this.$router.push({path:'/more',query:{typeCode:code}})
            }
        }
    }
</script>

<style scoped>


.index-module{background: #FFF;margin-bottom: 20px;padding:  0 30px;}
.index-module .index-module-goods{padding: 30px 0;}

.index-module-title{height: 88px;border-bottom: 1px solid #E5E5E5;line-height: 88px;}
.index-module-title .float_left{font-size: 32px;background: linear-gradient(to right, #f37c30, #eb72b6);-webkit-background-clip: text;color: transparent;}
.index-module-title .float_right a{ display:block;font-size: 28px;color: #999;background: url(../../assets/img/arrow_right.png) no-repeat right center;padding-right: 40px;}

.index-module-item{padding: 30px 0;border-bottom: 1px solid #E5E5E5;}
.index-module-item dt img{widows: 100%;height: 100%;}
.index-module-item dt{position: relative;background: url(../../assets/img/default_huodong_pic.png) no-repeat center; background-size: 100%;overflow: hidden;border-radius: 10px;}
.index-module-item dt .icon_tags{position: absolute;top: 0;left: 0;}

.index-module-item .good_name{font-size: 36px;color: #333;padding-top: 14px;height: 61px;}
.index-module-item .good_describe{height: 42px;font-size: 24px;color: #666;padding-top: 10px;}
.index-module-item .good_tag{padding-top: 10px;height: 52px;}
.index-module-item .good_tag span{display: inline-block;border: 1px solid #57bef9;color: #57BEF9;padding: 4px 16px;border-radius: 4px;height: 42px;font-size: 24px;}
.index-module-item .good_box{padding-top: 12px;}
.index-module-item .good_box p{font-size: 24px;color: #333;}
.index-module-item .good_box p.del{height: 26px;}
.index-module-item .good_box del{color: #B6B6B6;}
.index-module-item .good_box .good_price_box{font-size: 20px;}

.index-module-item .good_box .good_price_icon{color: #f51b44;}
.index-module-item .good_box .good_price{font-size:32px ;color: #f51b44;letter-spacing:-3px}
.index-module-item .good_box .float_right{padding-top:10px ;}
.index-module-item .good_box .button{display: block;width: 120px;text-align: center;height: 48px;line-height: 48px;border-radius: 24px;border: 2px solid #F37C30;font-size: 20px; color: #F37C30;}

.index-module1 .index-module-item{padding-top: 18px;}
.index-module1 .index-module-item:nth-child(1){padding-top: 0;margin-top: -12px;}
.index-module1 .index-module-item:nth-last-child(1){padding-bottom: 0;border-bottom: none;}
.index-module1 .index-module-item dt,.index-module1 .index-module-item dd{float: left;}
.index-module1 .index-module-item dt{width: 200px;height: 200px;top: 12px;}
.index-module1 .index-module-item dd{padding-left: 30px;width: 490px;}
.index-module1 .good_name,.index-module1 .good_describe{width: 460px;}


.index-module2 .index-module-item{float: left;width: 345px;}
.index-module2 .index-module-item:nth-child(2n){padding-left: 30px;}
.index-module2 .index-module-item:nth-child(2n+1){padding-right: 30px; border-right: 1px solid #E5E5E5;}
.index-module2 .index-module-item:nth-child(1),.index-module2 .index-module-item:nth-child(2){padding-top:0 ;}
.index-module2 .index-module-item:nth-last-child(1),.index-module2 .index-module-item:nth-last-child(2){padding-bottom:0 ;border-bottom: none;}
.index-module2 .index-module-item dt{width: 314px;height: 314px;}
.index-module2 .good_name,.index-module2 .good_describe{width: 314px;}

.index-module3 .index-module-item{float: left;width: 220px;border-bottom: 1xp solid #E5E5E5;}
.index-module3 .index-module-item:nth-child(3n+2){width: 250px;padding-left: 30px;padding-right: 30px;border-left: 1px solid #E5E5E5;border-right: 1px solid #E5E5E5;}
.index-module3 .index-module-item:nth-child(3n){padding-left: 30px;}
.index-module3 .index-module-item:nth-child(3n+1){padding-right: 30px;}
.index-module3 .index-module-item:nth-child(1),.index-module3 .index-module-item:nth-child(2),.index-module3 .index-module-item:nth-child(3){padding-top:0 ;}
.index-module3 .index-module-item:nth-last-child(1),.index-module3 .index-module-item:nth-last-child(2),.index-module3 .index-module-item:nth-last-child(3){padding-bottom:0 ;border-bottom: none;}
.index-module3 .index-module-item dt{width: 190px;height: 190px;}

.index-module3 .index-module-item .good_name{font-size: 30px;color: #333;padding-top: 14px;height: 62px;}
.index-module3 .index-module-item .good_box{padding-top: 10px;}

.index-module1 .index-module-item dd .good_price{font-size: 48px;}
.index-module2 .index-module-item dd .good_price{font-size: 38px;}
.index-module3 .index-module-item dd .good_price{font-size: 34px;}

</style>
