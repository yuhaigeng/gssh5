
<template>
   <div class="common-wrap">
       <div class="footer-wrap order_footer_wrap" >
			<div class="footer clearfloat">
				<div class="footer clearfloat">
				<div class="footer-left order_footer_left">
					合计:<span v-text="getMoney+'元'"></span>
				</div>
				<div class="footer-rigth order_footer_right" :class="{'true':!!couponObj.selectId}" @click="submitSelectCoupon">确定</div>
			</div>
			</div>
		</div>
   </div>
</template>

<script>
export default {
	name : 'footerOrder',
   	props : ['couponObj'],
   	data() {
       return {
	   }
	},
	computed: {
		getMoney(){
			let totalMoney = 0;
			if (this.couponObj.selectId) {
				var arr = (this.couponObj.selectId).split(',');
				var couponArr = this.couponObj.useable;
				couponArr.forEach(element => {
					totalMoney = totalMoney + parseFloat(element.couponMoney)
				});
			}
			return totalMoney.toFixed(2);
		},
	},
	methods : {
		submitSelectCoupon(){
			if (this.couponObj.selectId) {
				this.$emit('listenSubmit',this.getMoney)
			}
			
		}
	}
}
</script>

<style scoped >

.footer-wrap{max-width: 750px;width: 100%;margin: 0 auto;height: 98px;background: #FFFFFF;position: fixed;border-top: 1px solid #bababa;left: 0;bottom: 0;z-index: 6;}

.footer-left,.footer-rigth{height:98px;line-height:98px;float:left;font-size:32px;color:#FFF;background-color:#494848;z-index: 13;}

.footer-left{width:492px;background-color:#494848;text-align:center}
.footer-rigth{width:258px;text-align:center}
.footer-rigth.submit{background: rgb(243, 124, 48)}

.order_footer_wrap{z-index:5}
.footer .order_footer_left{width:492px;background:#FFF;text-align:center;color:#000;font-size:30px}
.footer .order_footer_left span{color:#eA5a2a}
.footer .order_footer_right{width:258px;text-align:center;background:#999;color:#FFF};
.footer .order_footer_right.true{background:#f37c31;}
.footer .order_footer_right.true{background:#f37c31;}
.footer-wrap{ left: 50%; margin-left: -375px;}
</style>
