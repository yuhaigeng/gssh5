<template>
   <div>
       <div class="empty1"></div>   
       <div class="footer-wrap">
		<div class="footer1">
			<router-link :to="'home'" tag="dl" >
				<dt class="sprite tab_bar_home_a"></dt>
				<dd>首页</dd>
			</router-link>
			<router-link :to="'more'" tag="dl">
				<dt class="sprite tab_bar_more_a"></dt>
				<dd>更多商品</dd>
			</router-link>
			<router-link :to="'my'" tag="dl">
				<dt class="sprite tab_bar_mine_a"></dt>
				<dd>我</dd>
			</router-link>
			<router-link :to="logined ? 'message' : 'login'" tag="dl">
				<dt class="sprite tab_bar_Message_a">
					<span class="new_msg" v-if="isNew"></span>
				</dt>
				<dd>消息</dd>
			</router-link>
		</div>
	</div>
   </div>
</template>

<script>
export default {
   name: 'footer_',
   props:['isNew'],
   data() {
       return { logined:localStorage.getItem("user_data") ? true : false,}
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



.router-link-active .tab_bar_home_a{background-position:-95px -81px;}
.router-link-active .tab_bar_more_a{background-position:-269px -81px;}
.router-link-active .tab_bar_mine_a{background-position:-426px -81px;}
.router-link-active .tab_bar_Message_a{background-position:-603px -81px;}

.new_msg{width:10px;height:10px;background:red;border-radius:5px;display: inline-block;position:relative;left: 10px;}

</style>
