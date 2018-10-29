<template>
   <div>
       <div class="empty1"></div>   
       <div class="footer-wrap">
			<div class="footer clearfloat">
				<span id="gw_car" class="sprite icon_shoppingcar hidden">
					<span class="gw_car_num">99+</span>
				</span>
				<dl class="footer_car hidden">
					<dt class="car_top clearfloat">
						<div class="car_left" v-text="'购物车'"></div>
						<div class="car_right car_clear" v-text="'清空所有'"></div>
					</dt>
					<dd class="car_main">
						<ul></ul>
					</dd>
				</dl>
				<div class="footer-left sprite icon_shoppingcar"></div>
				<div class="footer-rigth true"></div>
			</div>
		</div>
   </div>
</template>

<script>
export default {
   name: 'footer_',
   data() {
       return {}
   },
  components: {}
}
</script>

<style scoped >

.empty1{width: 100%;height: 98px;}
.footer-wrap{max-width: 750px;width: 100%;margin: 0 auto;height: 98px;background: #FFFFFF;position: fixed;border-top: 1px solid #bababa;left: 0;bottom: 0;z-index: 6;}
.sprite{background-image:url(../assets/img/sprite.png);background-repeat:no-repeat ;}
.footer-left,.footer-rigth{height:98px;line-height:98px;float:left;font-size:32px;color:#FFF;background:#494848}
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
.car_right .sprite{width: 60px;height: 60px;}
.car_min {float: left;}
.car_max{float: right;}
.car_number{display: inline-block;height: 60px;line-height: 60px;padding: 0 10px;}
.car_number,.car_min,.car_max{margin-top: 20px;}

</style>
