<template>
   <div>
       <div class="empty1"></div>   
       <div class="footer-wrap">
		<div class="footer1">
			<dl class="yes">
				<dt class="sprite tab_bar_home_b"></dt>
				<dd>首页</dd>
			</dl>
			<dl class="no" data = 'html/moreGoods.html'>
				<dt class="sprite tab_bar_more_a"></dt>
				<dd>更多商品</dd>
			</dl>
			<dl class="no" data = "html/wo.html">
				<dt class="sprite tab_bar_mine_a"></dt>
				<dd>我</dd>
			</dl>
			<dl class="no" data = 'html/login.html'>
				<dt class="sprite tab_bar_Message_a"></dt>
				<dd>消息</dd>
			</dl>
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
/*首页和我的页面公用底部*/
.footer1{width:100%;position:relative;display:flex}
.footer1 dl{flex:1;height:98px;text-align:center;padding-top:10px;font-size:24px;color:#f76A10}
.footer1 dl dt{height: 48px;}
.footer1 dl dd{line-height:40px;}
.sprite{background-image:url(../../assets/img/sprite.png);background-repeat:no-repeat ;}


.tab_bar_home_a{background-position:-96px -1px;}
.tab_bar_home_b{background-position:-95px -81px;}/*+64*/
.tab_bar_more_a{background-position:-264px -1px;}
.tab_bar_more_b{background-position:-269px -81px;}
.tab_bar_mine_a{background-position:-422px -1px;}
.tab_bar_mine_b{background-position:-426px -81px;}
.tab_bar_Message_a{background-position:-605px -1px;}
.tab_bar_Message_b{background-position:-603px -81px;}
</style>
