<template>
 <div class="common-wrap">
     <app-header :type ="headerMsg"></app-header>
     <ul class="order_management_top clearfloat">
		<li class="order_man_item" v-for="(item,index) in orderNav" :key="index" :class="{'order_border_bottom':index == navIndex}" @click="navTop(index)" v-text="item.tit"></li>
	</ul>
    <div class="main-wrap order_management_wrap">
        <div class="main">
            <ul class="order_management_main" v-for="(item, index) in ordersList" :key="index" @click="toOrderDetail(item)">
                <li class="order_list">
                    <div class="order_list_top clearfloat">
                        <div class="order_list_num" v-text="'订单编号：'+item.orderCode"></div>
                        <div class="order_list_state" v-text="orderStatusText[+item.orderStatus +1]"></div>
                    </div>
                    <div class="order_list_details">
                        <div class="order_list_details_top clearfloat">
                            <div class="order_list_details_num" v-text=" '商品数量：'+item.containGoodsNum+'件'"></div>
                            <div class="order_list_details_money" v-text="'订单金额：￥'+( (item.orderStatus == 3 || item.orderStatus == 4) ? item.realPayMoney : item.orderMoney )+'元'"></div>
                        </div>
                        <div class="order_list_details_buttom clearfloat">
                            <div class="order_list_details_weight" v-text=" '商品重量：'+item.containGoodsWeight+'斤'"></div>
                            <div class="order_list_details_time" v-text="'下单时间：'+item.createTime"></div>
                        </div>
                    </div>
                    <div class="order_list_close" v-if="item.orderStatus == 1 || item.orderStatus == ''">
                        <dl class="order_list_close clearfloat"><dt style="color: #2f83ff;">实际金额按照实际称重计算为准</dt><dd>取消订单</dd></dl>
                    </div>
                    <div class="order_list_close" v-if="item.orderStatus == 2 || item.orderStatus == ''">
                        <dl class="order_list_close" style="color: #2f83ff;">实际金额按照实际称重计算为准</dl>
                    </div>
                    <div class="order_list_close" v-if="item.orderStatus == 3 || item.orderStatus == ''">
                        <dl class="order_list_close clearfloat"><dt style="color: #d05351;">为避免耽误您再次下单,请尽快支付</dt><dd style="background:#f47c30;color:#FFF;border-color: #FFF;">立即支付</dd></dl>
                    </div>
                    <div class="order_list_close" v-if="item.orderStatus == 4 || item.orderStatus == ''">
                        <dl class="order_list_close order_suc_">交易成功!</dl>
                    </div>
                    <div class="order_list_close" v-if="item.orderStatus == -1 || item.orderStatus == ''">
                        <dl class="order_list_close">关闭交易</dl>
                    </div>
                </li>
            </ul>
            <p class="lodemore" v-text=" this.isLast ? '没有更多数据了':'点击加载更多'" @click="loadMore"></p>
        </div>
    </div>
 </div>
</template>

<script>
import appHeader from "../../components/public/header.vue";
import { getSystem  , getIsLogin , getTokenId , getUserData, getSecretKey } from "../../common/common.js";
export default {
    name: 'order_management',
    data() {
        return {
            headerMsg:{
                type:"jump",
                title:'订单管理',
                jumpBefore:'my',
                left:'返回'
            },
            orderNav:[
                {tit:'待发货'},
                {tit:'已配货'},
                {tit:'待支付'},
                {tit:'全部'}
            ],
            navIndex:0,
            isLast:false,
            pageNo: this.pageNo,
            pageSize: this.pageSize,
            websiteNode: this.websiteNode,
            firmId:getIsLogin() ? JSON.parse(localStorage.getItem("user_data")).firmInfoid :"" ,
            orderStatus:1,
            ordersList:[],
            orderStatusText:['已作废','','待发货','已配货','待支付','已支付'],
        }
    },
    components: {
        appHeader
    },
    created() {
        // 接收上个页面传过来的值
        this.type = this.$route.query.type
        this.navIndex = this.type - 1
        this.orderStatus = this.type
        if(this.orderStatus >= 4) {
            this.orderStatus = ''
        }else {
            // 重置pageNo
            this.pageNo = 1
        }
    },
    mounted() {

        this.get_goods_order()
    },
    methods: {
        // 请求数据
        get_goods_order:function () {
            this.$ajax.get(this.HOST, {
                params:{
                    method: "orders_manage2",
                    pageNo: this.pageNo,
                    pageSize: this.pageSize,
                    firmId: this.firmId,
                    orderStatus: this.orderStatus
                }
            }).then(resp => {
                if (resp.data.statusCode == 100000) {
                    this.isLast = resp.data.data.isLast;
                    if (resp.data.data.pageNo == 1) {
                        this.ordersList = resp.data.data.objects;
                    } else {
                        this.ordersList = this.ordersList.concat(resp.data.data.objects);
                    }
                } else {
                    console.log(data.statusStr);
                }
            }).catch(err => {
                console.log('请求失败：'+ err.statusCode);
            });
	    },
        navTop(index) {
            this.navIndex = index
            this.orderStatus = index + 1
            if(this.orderStatus >= 4) {
                this.orderStatus = ''
            }else {
                // 重置pageNo
                this.pageNo = 1
            }
            this.get_goods_order()
        },
        //加载更多
        loadMore:function(){
            if(!this.isLast){
                this.pageNo ++
                this.get_goods_order()
            }
        },
        //路由传值给详情页面
        toOrderDetail(item) {
            let code = item.orderCode,
                orderStatus = item.orderStatus
            this.$router.push({ path:'orderDetails'})
            let a = {code:code,order:orderStatus}
	        sessionStorage.setItem('orderData', JSON.stringify(a))
        }
    }
}
</script>

<style scoped>
.order_management_wrap {
	margin-top: 0;
	height: 1176px
}

.order_management_top {
	display: -webkit-box;
	display: flex;
	margin: 0 auto;
	width: 100%;
	height: 80px;
	max-width: 750px;
	background: #FFF;
	font-size: 26px;
    margin-top: 87px;
}

.order_man_item {
	border-bottom: 4px solid #FFF;
	text-align: center;
	line-height: 80px;
	flex-grow: 1
}

.order_border_bottom {
	border-color: #f76a10;
	color: #F76A10
}

.order_management_main {
	margin-top: 10px;
	width: 100%;
	height: auto
}

.order_man_main {
	width: 100%;
	height: auto
}

.order_list {
	margin-bottom: 20px;
	width: 100%;
	height: 312px;
	font-size: 26px
}

.order_list_top {
	display: -webkit-box;
	display: flex;
	padding: 0 24px;
	height: 82px;
	background: #f8f8f8;
	line-height: 82px
}

.order_list_num,
.order_list_state {
	height: 82px;
	flex-grow: 1
}

.order_list_state {
	color: #F76A10;
	text-align: right
}

.order_list_details {
	padding: 12px 24px 20px 24px;
	width: 100%;
	border-bottom: 1px solid #ececec;
	background: #FFF;
	line-height: 60px
}

.order_list_details_buttom,
.order_list_details_top {
	width: 100%;
	height: 60px
}

.order_list_details_num,
.order_list_details_weight {
	float: left;
	width: 302px
}

.order_list_details_money,
.order_list_details_time {
	float: left;
	width: 400px
}

.order_list_close {
	background: #FFF;
	text-align: center;
	line-height: 80px
}

.order_suc_ {
	color: #F76A10;
}

.order_list_close dt {
	float: left;
	padding-left: 24px;
}

.order_list_close dd {
	float: right;
	padding-right: 14px;
	padding-left: 14px;
	border: 0.5px solid #666666;
	height: 50px;
	border-radius: 25px;
	margin-top: 14px;
	margin-right: 24px;
	line-height: 50px;
}
</style>
