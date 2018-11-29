<template>
 <div class="common-wrap managment">
     <app-header :type ="headerMsg"></app-header>
     <ul class="order_management_top clearfloat">
		<li class="order_man_item" v-for="(item,index) in orderNav" :key="index" :class="{'order_border_bottom':index == navIndex}" @click="navTop(index)" @click.native.prevent="active = 'tab-container' + index" v-text="item.tit"></li>
	</ul>
    <div class="main-wrap order_management_wrap">
        <div class="main">
            <mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>
                <mt-tab-container-item :id="this.active">
                    <mt-cell class="order_management_main" v-for="(item, index) in ordersList" :key="index">
                        <ul @click="toOrderDetail(item)">
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
                                <div class="order_list_close" v-if="item.orderStatus == 1 " @click.stop>
                                    <dl class="order_list_close clearfloat"><dt style="color: #2f83ff;">实际金额按照实际称重计算为准</dt><dd v-on:click.stop="cancle_order(item,index)">取消订单</dd></dl>
                                </div>
                                <div class="order_list_close" v-if="item.orderStatus == 2 ">
                                    <dl class="order_list_close" style="color: #2f83ff;">实际金额按照实际称重计算为准</dl>
                                </div>
                                <div class="order_list_close" v-if="item.orderStatus == 3 ">
                                    <dl class="order_list_close clearfloat"><dt style="color: #d05351;">为避免耽误您再次下单,请尽快支付</dt><dd style="background:#f47c30;color:#FFF;border-color: #FFF;">立即支付</dd></dl>
                                </div>
                                <div class="order_list_close" v-if="item.orderStatus == 4">
                                    <dl class="order_list_close order_suc_">交易成功!</dl>
                                </div>
                                <div class="order_list_close" v-if="item.orderStatus == -1" @click.stop>
                                    <dl class="order_list_close" v-on:click.stop="delete_order(item,index)">关闭交易</dl>
                                </div>
                            </li>
                        </ul>
                    </mt-cell>
                    <p class="lodemore" v-text=" this.isLast ? '没有更多数据了':'点击加载更多'" @click="loadMore"></p>
                </mt-tab-container-item>
            </mt-tab-container>
            
        </div>
    </div>
 </div>
</template>

<script>
import appHeader from "../../components/public/header.vue";
import {  getIsLogin , getTokenId , getUserData, getSecretKey } from "../../common/common.js";
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
            active:'',
            isLast:false,
            pageNo: this.pageNo,
            pageSize: this.pageSize,
            websiteNode: this.websiteNode,
            firmId: "" ,
            orderStatus:1,
            ordersList:[],
            orderStatusText:['已作废','','待发货','已配货','待支付','已支付'],
            goods:[],
			idArr:[],
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
      this.goods = localStorage.getItem('good') && JSON.parse(localStorage.getItem('good'))
        if (getIsLogin()) {
            this.tokenId = getTokenId();
            const userInfo = JSON.parse(getUserData());
            this.firmId = userInfo.firmInfoid;
            this.userBasicParam = {
                firmId : userInfo.firmInfoid,
                source : 'firmId'+userInfo.firmInfoid,
                sign : this.$md5('firmId'+userInfo.firmInfoid+"key"+getSecretKey()).toUpperCase(),
                tokenId : getTokenId()
			}
            this.idArr = this.getIdArr();
            this.get_goods_order()
        }
    },
    methods: {
      // 请求数据
      get_goods_order:function () {
        let obj = {
          method: "orders_manage2",
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          firmId: this.firmId,
          orderStatus: this.orderStatus
        }
        this.$ajax.get(this.HOST, {
          params:obj
        }).then(result => {
          return result.data;
        }).then(data => {
          if (data.statusCode == 100000) {
            this.isLast = data.data.isLast;
            if (data.data.pageNo == 1) {
                this.ordersList = data.data.objects;
            } else {
                this.ordersList = this.ordersList.concat(data.data.objects);
            }
          } else {
            this.$toast({
                message : data.statusStr,
                position: 'boottom',//top boottom middle
                duration: 2000,//延时多久消失
                //iconClass: 'mint-toast-icon mintui mintui-field-warning'
                //.mintui-search .mintui-more .mintui-back.mintui-field-error .mintui-field-warning .mintui-success .mintui-field-success
            })
          }
        }).catch(err => {
            console.log('请求失败：'+ err);
        });
	    },
      navTop(index) {
          this.active = 'tab-container' + index
        if (index != this.navIndex) {
          this.navIndex = index
          this.orderStatus = index + 1
          if(this.orderStatus >= 4) {
            this.orderStatus = ''
          }else {
            this.pageNo = 1
          }
          this.get_goods_order()
        }
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
            type = this.type;
        let obj = {orderCode:code,type:type}
        sessionStorage.setItem('orderData', JSON.stringify(obj))
        localStorage.getItem('selectCoupon') && localStorage.removeItem('selectCoupon')
        this.$router.push({ path:'orderDetails'})

      },
      cancle_order(item,index){
        this.$messagebox.confirm('您确定要取消订单吗？','').then(action => {
          console.log('取消订单')
          this.cancle_order_api(item,index)
        }).catch((e) => {
            console.log(e)
        });
      },
      cancle_order_api(item,index){
        let obj = Object.assign({
          method: "order_cancel",
          orderCode: item.orderCode,
        },this.userBasicParam);
        this.$ajax.get(this.HOST, {
          params:obj
        }).then(result =>{
          return result.data
        }).then(data =>{
          console.log(data)
          if (data.statusCode == 100000) {
            this.cancle_goods_callback_goShopCar(data)
          }
        }).catch(err => {
          console.log('请求失败：'+ err);
        });
      },
		delete_order(item,index){
			this.$messagebox.confirm('您确定要删除订单吗？','').then(action => {
        console.log('删除订单order_del')
        this.delete_order_api(item,index);
      }).catch((e) => {
        console.log(e)
      });
		},
    delete_order_api(item,index){
      let obj = Object.assign({
        method: "order_del",
        orderCode: item.orderCode,
      },this.userBasicParam);

			this.$ajax.get(this.HOST, {
				params:obj
			}).then(result =>{
				return result.data
			}).then(data =>{
				if (data.statusCode == 100000) {
          this.get_goods_order()
				}
			}).catch(err => {
				console.log('请求失败：'+ err.statusCode);
			});
        },
		cancle_goods_callback_goShopCar(data){
			var v = data.data;
			if (data.data != null) {
				var i = 0;
				for (i in v) {
					if (this.goods.length == 0) {
						let goodobj = {
							id:v[i].id,
							name:v[i].goodsName,
							sum:v[i].buyCount,
							price:v[i].wholeGssPrice,
							wholePriceSize:v[i].wholePriceSize,
							gssPrice:v[i].gssPrice,
							priceUnit:v[i].priceUnit,
							packageNum:v[i].packageNum,
							maxCount:v[i].maxCount
						};
						this.goods.push(goodobj);

					} else{
						var l = (this.idArr).indexOf(v[i].id);
						if ( l == -1) {
							let goodobj = {
								id:v[i].id,
								name:v[i].goodsName,
								sum:v[i].buyCount,
								price:v[i].wholeGssPrice,
								wholePriceSize:v[i].wholePriceSize,
								gssPrice:v[i].gssPrice,
								priceUnit:v[i].priceUnit,
								packageNum:v[i].packageNum,
								maxCount:v[i].maxCount
							};
							this.goods.push(goodobj);
						}else{
							this.goods[l].sum = v[i].buyCount + this.goods[l].sum ;
						}
					}
        }
        localStorage.setItem("good",JSON.stringify(this.goods));
        this.$router.replace({path:"more"})
      }
		},
		getIdArr(){
			let arr = [];
			if (this.goods) {
				this.goods.forEach(element => {
					arr.push(element.id)
				});
			}
			return arr;
		}
  }
}
</script>

<style scoped>
.managment{
  margin-top: 87px;
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
	height: auto;
    margin-bottom: 18px;
}

.order_man_main {
	width: 100%;
	height: auto
}

.order_list {
	margin-bottom: 20px;
	width: 100%;
	height: 292px;
	font-size: 26px;
    color: #000
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
	line-height: 60px;
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
	width: 380px
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
