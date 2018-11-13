<template>
   <div class="orderSettlement">
      <app-header :type="headerMsg"></app-header>
      <div class="main-wrap">
			<div class="main">
				<div class="order_infor">
					<router-link  :to="{path:'address', query:{isBack:true}}" tag="div" class="my_infor" v-if="addressInfo">
						<div class="my_info_top clearfloat">
							<div class="my_name" v-text="addressInfo.receiverName">
							</div>
							<div class="my_phoneNumber" v-text="addressInfo.receiverMobile">
							</div>
						</div>
						<p class="my_address" v-text="addressInfo.allAddr">
						</p>
						<span class="arrows sprite arrow_left"></span>
					</router-link>
                    <router-link  :to="{path:'address', query:{isBack:true}}" tag="div" class="my_infor" v-else>
                                <div class="get_address">点击此处选择地址</div>
                                <span class="arrows sprite arrow_left"></span>
                    </router-link>
					<ul class="order_goods_box">
                        <li v-for="(item,index) in goods" :key="index">
                        	<div class="order_goods_top clearfloat">
                        		<b class="goods_name" v-text="item.name"></b>
                        		<span class="goods_num" v-text="'X' + item.sum"></span>
                        	</div>
                        	<div class="order_goods_bottom clearfloat">
                         		<p class="goods_Price">
                         			<span v-text="item.gssPrice"></span>{{'元/'+item.priceUnit+'&nbsp;&nbsp;'}}<span v-text="item.price"></span>{{"元/"+item.wholePriceSize}}
                         		</p>
                         		<span class="goods_subtotal" v-text="'合计：￥'+(parseFloat(item.price)*parseInt(item.sum)).toFixed(2)"></span>
                         	</div>
                         </li>
					</ul>
					<div class="remark">
						备注：<input type="text" name="" id="remark" value="" v-model="customRequest" placeholder="选填，您想对商家说些什么" />
					</div>
					<div class="logistic">
						配送费用：<span class="logistic_price">0元</span>
						<button class="logistic_show" @click="agreement" >配送说明</button>
					</div>
				</div>
			</div>
		</div>
        <div class="footer-wrap order_footer_wrap">
			<div class="footer clearfloat">
				<div class="footer-left order_footer_left">
					合计:<span v-text="'￥'+total"></span>
				</div>
				<div class="footer-rigth order_footer_right true" @click="get">
					提交订单
				</div>
			</div>
		</div>
        <agreementAlert :noticeInfoList="noticeInfoList" v-if="noticeInfoList"  v-on:listenClose = "closeAlert"> </agreementAlert>
   </div>
</template>

<script>
import appHeader from "../../components/public/header.vue";
import agreementAlert from  "../../components/public/alert.vue";
import md5 from 'js-md5';
   export default {
        name: 'orderSettlement' ,
        components:{
            appHeader,
            agreementAlert
        },
        data() {
             return {
                 headerMsg:{
                    type:"common",
                    title: '订单结算' ,
                },
                addressInfo:JSON.parse(sessionStorage.getItem("data")) ? JSON.parse(sessionStorage.getItem("data")):{receiverName: "朱高飞",receiverName: "邹",allAddr: "浙江省杭州市下城区31232131",receiverMobile: "12312321322"},
                websiteNode:'3301',
                descCode:"#PS-DESC",
                noticeInfoList:null,
                firmId:  localStorage.getItem("user_data") ? JSON.parse(localStorage.getItem("user_data")).firmInfoid : "" ,
                userBasicParam:{
                    source:'firmId'+ this.firmId,
                    tokenId:localStorage.getItem("tokenId"),
                    sign :md5('firmId'+ this.firmId + "key" + localStorage.getItem("secretKey")).toUpperCase()
                },
                userId:JSON.parse(localStorage.getItem("user_data")).cuserInfoid,
                goodsList:{"goodsList":[{"goodsId":14498,"count":10}]},
                customRequest:"",
                addressId:"4131",
                postCost:JSON.parse(sessionStorage.addresses).postCost ? JSON.parse(sessionStorage.addresses).postCost : 0 ,
                goods:[
                    {
                        gssPrice: "59.50",
                        id: "14498",
                        maxCount: 0,
                        name: "金黄蕉(福门).广西.箱装",
                        packageNum: 49139,
                        price: "59.50",
                        priceUnit: "箱",
                        sum: 10,
                        wholePriceSize: "箱",
                    }

                ]
            }
        },
        computed:{
                total:function(){
                        let total = 0;
                        for(var i = 0, len = this.goods.length; i < len; i++) {
                            total += this.goods[i].price * this.goods[i].sum;
                        }
                        return total
                },
                //获取商品列表 id和sum
                goodlist1:function(){
                    var id,num;
                    arr=[];
                    var goodsList1={'goodsList':arr}
                    if (typeof (localStorage.good) =="undefined") {
                        return 0;
                    }else{
                        var obj1;
                        goodobj = JSON.parse(localStorage.good);
                        for (var i in goodobj) {
                            obj1 =new Object();
                            obj1.goodsId=goodobj[i].id;
                            obj1.count=goodobj[i].sum;
                            arr.push(obj1)
                        }
                        //console.log(JSON.stringify(goodsList1))
                        return JSON.stringify(goodsList1);
                    }
                }

        },
        mounted(){

            console.log()
        },
        methods:{
             desc_data:function(){
                 this.$ajax.get(this.HOST, {
                    params:{
                        method:'gss_desc',
                        websiteNode:this.websiteNode,
                        code:this.websiteNode + this.descCode
                    }
                }).then(resp => {
                      resp.data.data.noticeContent =  (resp.data.data.desc.toString()).replace(/\r\n/g, '<br/>');
                      resp.data.data.noticeTitle =  resp.data.data.title;
                      this.noticeInfoList = resp.data.data;
                      console.log(this.noticeInfoList)
                }).catch(err => {
                    console.log('请求失败：'+ err.data.statusCode);
                });
            },
            orderSubmit:function(){
                 this.$ajax.get(this.HOST, {
                    params:Object.assign({
                        method:'order_submit',
                        userId:this.userId,
                        firmId:this.firmId,
                        goodsList:this.goodsList,
                        customRequest:this.customRequest,
                        addressId:this.addressId,
                        postCost:this.postCost,
                        orderFrom:"H5",
                    }, this.userBasicParam)
                }).then(resp => {
                      resp.data.data.noticeContent =  (resp.data.data.desc.toString()).replace(/\r\n/g, '<br/>');
                      resp.data.data.noticeTitle =  resp.data.data.title;
                      this.noticeInfoList = resp.data.data;
                      console.log(this.noticeInfoList)
                }).catch(err => {
                    // console.log('请求失败：'+ err.data.statusCode);
                });
            },
             closeAlert:function(){
                this.noticeInfoList = null;
            },
             agreement:function(){
                    this.desc_data()
            },
            get:function(){
                 this.orderSubmit()
            }
        }
   }
</script>

<style scoped>
.main-wrap{
    margin-top: 107px;
}
 .my_infor {
    height: 160px;
    padding: 28px 88px 22px 24px;
}
.logistic, .my_infor, .order_goods_box, .remark {
    width: 100%;
    margin-top: 20px;
    background: #FFF;
}
.delete, .my_infor {
    position: relative;
}
.my_info_top {
    font-size: 28px;
    color: #333;
    line-height: 50px;
}
.my_name {
    float: left;
}
.my_phoneNumber {
    float: right;
}
.my_info_top {
    font-size: 28px;
    color: #333;
    line-height: 50px;
}
.my_address {
    line-height: 32px;
    font-size: 28px;
}
.arrow_left {
    background-position: 21px -210px;
}
.sprite {
    background-image: url(../../assets/img/sprite.png);
}
.sprite, .sprite_login {
    background-repeat: no-repeat;
}
.arrows {
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -20px;
    width: 60px;
    height: 60px;
    color: #999;
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
    font-size: 40px;
    font-weight: 700;
}
.order_goods_box li {
    padding: 0 24px;
    border-bottom: 1px solid #eaeaea;
}
.order_goods_top {
    height: 70px;
    line-height: 70px;
}
.order_goods_bottom {
    line-height: 50px;
    font-size: 28px;
}
.goods_name {
    float: left;
    font-size: 28px;
    font-weight: 400;
}
.goods_num {
    float: right;
    color: #999;
    font-size: 28px;
}
.goods_Price {
    float: left;
    font-size: 26px;
    color: #999;
}
.goods_Price span {
    color: #ea5b2a;
}
.goods_Price span {
    color: #ea5b2a;
}
.goods_subtotal {
    float: right;
}
.logistic, .remark {
    height: 80px;
    font-size: 28px;
    line-height: 80px;
    color: #333;
    padding: 0 24px;
}
.remark input {
    width: 600px;
    height: 78px;
}
.logistic_show {
    border: none;
    background: #FFF;
    color: #a93a3a;
    float: right;
    outline: 0;
    margin-bottom: 100px;
}
.get_address{
    line-height:110px;
    text-align:center;
    font-size:36px;
}
.footer-wrap {
    width: 100%;
    height: 98px;
    background: #FFF;
    position: fixed;
    border-top: 1px solid #bababa;
    left: 0;
    bottom: 0;
    z-index: 5;
}
.footer-wrap{
    margin: 0 auto;
    max-width: 750px;
}
.footer .order_footer_left {
    width: 492px;
    background: #FFF;
    text-align: center;
    color: #000;
    font-size: 30px;
}
.footer .order_footer_right {
    width: 258px;
    text-align: center;
    background: #f37c31;
    color: #FFF;
}
.footer-left, .footer-rigth {
    height: 98px;
    line-height: 98px;
    float: left;
    font-size: 32px;
    color: #FFF;
    background: #494848;
}
.footer .order_footer_left span {
    color: #eA5a2a;
}

</style>
