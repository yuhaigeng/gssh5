<template>
   <div class="common-wrap">
       <div class="empty1"></div>
       <div class="footer-wrap" v-show="!isMask">
			<div class="footer clearfloat">
				<span id="gw_car" class="sprite icon_shoppingcar" v-show="goodAllNum " @click="switchCartShow()" >
					<span class="gw_car_num" v-text="(goodAllNum > 99 ? '99+' : goodAllNum)"></span>
				</span>
				<!-- <transition
					@before-enter="beforeEnter"
					@enter="enter"
					@after-enter="afterEnter"
					:css="false" >
					<span id="gw_car" class="sprite icon_shoppingcar" v-show="goodAllNum " @click="switchCartShow()" >
						<span class="gw_car_num" v-text="(goodAllNum > 99 ? '99+' : goodAllNum)"></span>
					</span>
				</transition> -->

				<section class="clearfloat bootom">
					<div class="footer-left icon_shoppingcar" :class="{'sprite':!goodAllNum}" v-text="(goodAllNum ? '共'+goodAllMoney+'元' : '购物车是空的')"></div>
					<div class="footer-rigth true" :class="{'submit':isSubmit}" v-text="getSubmitText" @click="submitGoShopCart()"></div>
				</section>
				<transition name="toggle-cart">
					<dl class="footer_car" v-show="goShopCart&&goShopCart.length&&isCartShow" ref="sty">
						<dt class="car_top clearfloat">
							<div class="car_left" v-text="'购物车'"></div>
							<div class="car_right car_clear" v-text="'清空所有'" @click="clearShopCart"></div>
						</dt>
						<dd class="car_main" :style="{height:getHeight}">
							<ul>
								<li v-for="(item,index) in goShopCart" :key="index">
									<div class="car_left" v-text="item.name"></div>
									<div class="car_right car_good clearfloat">
										<span class="car_min sprite btn_m" @click="cutGood(item,index)"></span>
										<span class="car_number fontColor" v-text="item.sum" @click="alertMask(item,index)"></span>
										<span class="car_max sprite btn_a" @click="addGood(item)"></span>
									</div>
								</li>
							</ul>
						</dd>
					</dl>
				</transition>
				<transition name="fade">
					<div class="screen_cover" v-show="goShopCart&&goShopCart.length&&isCartShow" @click="toggleCartList"></div>
				</transition>
			</div>
		</div>
		<!--输入框添加-->
		<transition name="fade">
			<div class="input_mask" v-show="isMask">
				<div class="wrap" v-if="good">
					<input  class="number" type="tel"  maxlength="4"   placeholder="请输入数量" pattern="[0-9]*" v-model="goodNum"/>
					<p v-text="msgText"></p>
					<div class="clearfloat">
						<span class="mask_left" @click="cancle()">取消</span><span class="mask_right" @click="confirm()">确定</span>
					</div>
				</div>
			</div>
		</transition>
   </div>
</template>

<script>
export default {
	name : 'footer_',
   	props : ['goShopCart','systemMoney'],
   	data() {
       return {
		   isCartShow:false,//是否显示购物车
		   isSubmit:false,//是否满足起送条件
		   good:null,
		   goodNum:0,
		   selectIndex:-1,
		   correctGoodNUm:0,
		   isMask:false,
	   }
	},
	computed: {
		goodAllNum() {
			let num = 0;
			if ( (this.goShopCart instanceof Array) && this.goShopCart.length ) {
				const list = this.goShopCart;
				for (let key in list) {
					if (list.hasOwnProperty(key)) {
						let element = list[key];
						num += parseInt(element['sum']) ;
					}
				}
			}
			return num;
		},
		goodAllMoney(){
			let totalMoney = 0;
			if ( (this.goShopCart instanceof Array) && this.goShopCart.length ) {
				const list = this.goShopCart;
				for (let key in list) {
					if (list.hasOwnProperty(key)) {
						let element = list[key];
						totalMoney += parseInt(element['sum']) * parseFloat(element['price']);
					}
				}
			}
			return totalMoney.toFixed(2);
		},
		getSubmitText(){
      const systemMoney = (this.systemMoney > 0 ? (+this.systemMoney).toFixed(2) : 0.00);
      let diffVal = (systemMoney - this.goodAllMoney).toFixed(2)
			if ( diffVal > 0 ) {
				this.isSubmit = false;
				return '还差￥'+ diffVal
			} else {
				this.isSubmit = true;
				return '选好了'
			}
		},
		msgText(){
			let msg = '';
			if ( +this.goodNum > +this.good.packageNum) {
				if ( (+this.good.maxCount > 0) && (+this.goodNum > +this.good.maxCount)) {
					msg = "该商品限购"+this.good.maxCount+"件"
					this.correctGoodNUm = this.good.maxCount;
				}else{
					msg = "*库存不足*"
					this.correctGoodNUm = this.good.packageNum;
				}
			} else {
				if ( (+this.good.maxCount > 0) && (+this.goodNum > +this.good.maxCount)) {
					msg = "该商品限购"+this.good.maxCount+"件"
					this.correctGoodNUm = this.good.maxCount;
				}else{
					this.correctGoodNUm = this.goodNum;
				}
			}
			return msg;
    },
    getHeight(){
      if(this.goShopCart.length > 3){
          return '300px'
      }else{
          return this.goShopCart.length * 100 +'px'
      }
    }
	},
	watch:{
		isCartShow:function (val) {
			if (val) {
				$("#gw_car").animate({
					bottom:(parseInt(this.getHeight)+168)+"px"
				},300)
				$('.footer-left').animate({
					'text-indent':-150
				},300)
			} else {
				$("#gw_car").animate({
					bottom:26+"px"
				},300)
				$('.footer-left').animate({
					'text-indent':0
				},300)
			}
		},
		goShopCart:function (val,oldVal) {
			console.log(this.isCartShow )
			if(this.isCartShow){
				if (val.length) {
						$("#gw_car").animate({
							bottom:(parseInt(this.getHeight)+168)+"px"
						},300)
				}else{
					$("#gw_car").animate({
						bottom:26+"px"
					},300)
					$('.footer-left').animate({
						'text-indent':0
					},300)
				}
			}
			if(!val.length){
				this.isCartShow = false;
			}


		}
	},
	methods : {
		switchCartShow () {
			this.isCartShow = !this.isCartShow;
		},
		toggleCartList:function () {
			this.isCartShow = false;
		},
		addGood:function (item) {
			//先判断库存和限购  在执行加操作
			if (item.sum < item.packageNum) {
				if(item.maxCount > 0){
					if(item.sum < item.maxCount){
						item.sum += 1;
					}else{
						this.$toast({
							message : "该商品限购"+item.maxCount+"件",
							position: 'boottom',//top boottom middle
							duration: 2000,//延时多久消失
							//iconClass: 'mint-toast-icon mintui mintui-field-warning'
							//.mintui-search .mintui-more .mintui-back.mintui-field-error .mintui-field-warning .mintui-success .mintui-field-success
						})
					}
				}else{
					item.sum += 1;
				}
			} else{
				this.$toast({
					message : "库存不足",
					position: 'boottom',//top boottom middle
					duration: 2000,//延时多久消失
					//iconClass: 'mint-toast-icon mintui mintui-field-warning'
					//.mintui-search .mintui-more .mintui-back.mintui-field-error .mintui-field-warning .mintui-success .mintui-field-success
				})
			}
			console.log(this.goShopCart)
		},
		cutGood:function(item,index){
			if (item.sum > 1) {
				item.sum -= 1;
			} else {
				this.goShopCart.splice(index,1);

			}
		},
		alertMask:function(item,index){
			this.good = item;
			this.goodNum = item.sum;
			this.selectIndex = index;
			this.isMask = true;

		},
		clearShopCart:function () {
			this.goShopCart.splice(0,this.goShopCart.length);
			this.isCartShow = false;
		},
		cancle:function(){
			this.isMask = false;
			this.good = null;
		},
		confirm:function(){
			this.isMask = false;
			if (this.correctGoodNUm) {
				this.goShopCart[this.selectIndex].sum = this.correctGoodNUm;
			} else {
				this.goShopCart.splice(this.selectIndex,1);
			}
		},
		submitGoShopCart(){
			if (this.isSubmit) {
				this.$emit('listenSubmit')
			}
		}
	}
}
</script>

<style scoped >

@import "../common/sprite.css";
.empty1{width: 100%;height: 98px;}
.footer-wrap{max-width: 750px;width: 100%;margin: 0 auto;height: 98px;background: #FFFFFF;position: fixed;border-top: 1px solid #bababa;left: 0;bottom: 0;z-index: 6;}

.footer-left,.footer-rigth{height:98px;line-height:98px;float:left;font-size:32px;color:#FFF;background-color:#494848;z-index: 13;}
#gw_car{width:100px;height:100px;border-radius:50%;background-color:#383737;text-align:center;line-height:100px;position:absolute;left:26px;bottom:26px;z-index:15}
#gw_car.icon_shoppingcar{background-position:-218px -386px ;}
#gw_car .gw_car_num{width:40px;height:40px;border-radius:50%;background:#e62622;position:absolute;font-size:18px;line-height:40px;color:#FFF}
.footer_car{width:100%;max-height:370px;height:auto!important;position:absolute;padding:0;bottom:98px;z-index:12}
.footer_car .car_left{float:left}
.footer_car .car_right{float:right;}
.footer_car .car_top{width:100%;height:70px;padding:0 24px;line-height:70px;color:#FFF;font-size:24px;background:#999}
.footer_car .car_main{width:100%;font-size:28px;background:#FFF}
.car_main ul li{width:100%;height:100px;line-height:100px;border-bottom:1px solid #CCC;padding:0 24px;}
.footer-left{width:492px;background-color:#494848;text-align:center}
.footer-rigth{width:258px;text-align:center}
.footer-rigth.submit{background: rgb(243, 124, 48)}
.car_right .sprite{width: 60px;height: 60px;}
.car_min {float: left;}
.car_max{float: right;}
.car_number{display: inline-block;height: 60px;line-height: 60px;padding: 0 10px;}
.car_number,.car_min,.car_max{margin-top: 20px;}
.car_number {
    width: 100px;
    text-align: center;
 }
 .bootom{
	 position: absolute;
	 left: 0;
	 bottom: 0;
	 width: 100%;
	 max-width: 750px;
	 margin: 0 auto;
	 z-index: 13;
}
 .screen_cover{
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(0,0,0,.7);
	z-index: 11;
}

.input_mask {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    z-index: 999;
    background-color: rgba(0,0,0,.5);
    font-size: 32px
}

.input_mask .wrap {
    position: absolute;
    width: 490px;
    height: 214px;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    padding: 30px;
    background-color: #fff;
    border-radius: 10px
}

.input_mask .wrap input {
    width: 100%;
    height: 50px;
    border: 1px solid #000;
    text-indent: 24px
}

.input_mask .wrap p {
    height: 35px;
    font-size: 26px;
    color: red
}

.input_mask .wrap .mask_left,.input_mask .wrap .mask_right {
    display: inline-block;
    width: 130px;
    margin: 16px 30px 0;
    border-radius: 4px;
    height: 56px;
    line-height: 56px;
    font-size: 30px;
    text-align: center
}

.input_mask .wrap .mask_left {
    float: left;
    background-color: #ddd
}

.input_mask .wrap .mask_right {
    float: right;
    background-color: #f76b0f;
    color: #fff
}

.fade-enter-active, .fade-leave-active {
	transition: opacity .5s;
}
.fade-enter, .fade-leave-active {
	opacity: 0;
}
.toggle-cart-enter-active, .toggle-cart-leave-active {
	transition: all .3s ease-out;
}
.toggle-cart-enter, .toggle-cart-leave-active {
	transform: translateY(100%);
}
.car_main{
  overflow-y: auto;
  overflow-x: hidden;
}
.footer-wrap{ left: 50%; margin-left: -375px;}
</style>
