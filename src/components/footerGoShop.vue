<template>
   <div>
       <div class="empty1"></div>   
       <div class="footer-wrap">
			<div class="footer clearfloat">
				<transition 
					@before-enter="beforeEnter" 
					@enter="enter" 
					@after-enter="afterEnter">
					<span id="gw_car" class="sprite icon_shoppingcar" v-show="goodAllNum" @click="switchCartShow()" >
						<span class="gw_car_num" v-text="goodAllNum">99+</span>
					</span>
				</transition>
				
				<section class="clearfloat bootom">
					<div class="footer-left sprite icon_shoppingcar" v-text="'共'+goodAllMoney+'元'"></div>
					<div class="footer-rigth true" :class="{'submit':isSubmit}" v-text="getSubmitText"></div>
				</section>
				<transition name="toggle-cart">
					<dl class="footer_car" v-show="goShopCart&&goShopCart.length&&isCartShow" ref="sty">
						<dt class="car_top clearfloat">
							<div class="car_left" v-text="'购物车'"></div>
							<div class="car_right car_clear" v-text="'清空所有'"></div>
						</dt>
						<dd class="car_main" >
							<ul>
								<li v-for="(item,index) in goShopCart" :key="index">
									<div class="car_left" v-text="item.name"></div>
									<div class="car_right car_good clearfloat">
										<span class="car_min sprite btn_m" @click="cutGood(item)"></span>
										<span class="car_number fontColor" v-text="item.sum"></span>
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
   </div>
</template>

<script>
export default {
	name : 'footer_',
	computed: {
		goodAllNum() {
			let num = 0;
			
			if ( (this.goShopCart instanceof Array) && this.goShopCart.length ) {
				const list = this.goShopCart;
				for (let key in list) {
					if (list.hasOwnProperty(key)) {
						let element = list[key];
						num += element['sum'] ;
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
			const systemMoney = (+this.systemMoney > 0 ? (+this.systemMoney).toFixed(2) : 0.00);
			let diffVal = (systemMoney - this.goodAllMoney)
			if ( diffVal > 0 ) {
				this.isSubmit = false;
				return '还差￥'+ diffVal
			} else {
				this.isSubmit = true;
				return '选好了'
			}
		},

	},
   	props : ['goShopCart','systemMoney'],
   	data() {
       return {
		   isCartShow:false,//是否显示购物车
		   isSubmit:false,//是否满足起送条件
	   }
	},
	methods : {
		switchCartShow () {
			console.log("click")
			console.log(this.$refs.sty.offsetHeight)
			this.isCartShow = !this.isCartShow
			console.log(this.$refs.sty.offsetHeight)
			setTimeout(() => {
				console.log(this.$refs.sty.offsetHeight)
			}, 20);
			
		},
		// 1.0 动画进入前
		beforeEnter: function (el) {
			console.log('1.0 beforeEnter');

			// 在这个方法中设定当前动画元素的起始位置
			el.style = "padding-left:100px";
		},
		// 2.0 动画执行中
		// el:动画的元素dom对象
		// done:enter事件执行完以后的回调，执行了它之后，afterEnter事件才会执行
		enter: function (el, done) {
			console.log('2.0 enter');

			var step = 3;
			var interval = setInterval(() => {
				el.style.paddingLeft = (100 - step) + 'px';
				step++;
				if (parseInt(el.style.paddingLeft) <= 0) {
					clearInterval(interval)
					// 动画结束后必须执行done()函数
					done()
				}
			}, 10)
		},
		// 3.0 动画执行完毕
		afterEnter: function (el) {
			console.log('3.0 afterEnter');
			// 将isshow重置为false即可
			this.isshow = false;
		},
		toggleCartList:function () {
			this.isCartShow = false;
		},
		addGood:function (item) {
			item.sum += 1;
			//先判断库存和限购  在执行加操作
			if (item.sum < item.packageNum) {
				if(maxCount > 0){
					if(goodnum < maxCount){
						var num1=addgoods(id,name,price,wholePriceSize,gssPrice,priceUnit,packageNum,maxCount,goodType,goodscore)
						$(this).siblings().eq(1).html(num1)
						pub.sport($(this))
					}else{
						common.prompt("该商品限购"+maxCount+"件")
					}
				}else{
					var num1=addgoods(id,name,price,wholePriceSize,gssPrice,priceUnit,packageNum,maxCount,goodType,goodscore)
					$(this).siblings().eq(1).html(num1)
					pub.sport($(this))
				}
			} else{
				common.prompt("库存不足")
			}
		},
		cutGood:function(item){

		}
	}
}
</script>

<style scoped >

@import "../common/sprite.css";
.empty1{width: 100%;height: 98px;}
.footer-wrap{max-width: 750px;width: 100%;margin: 0 auto;height: 98px;background: #FFFFFF;position: fixed;border-top: 1px solid #bababa;left: 0;bottom: 0;z-index: 6;}

.footer-left,.footer-rigth{height:98px;line-height:98px;float:left;font-size:32px;color:#FFF;background:#494848;z-index: 13;}
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

</style>
