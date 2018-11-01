<template>
     <div>
         <setHeader :type = headerMsg ></setHeader>
         <div class="main-wrap ">
				<div class="main set_main">
					<div class="set_box">
					  	<router-link :to="item.routerUrl" tag="div" class="set_item"  v-for = "(item,index) in items"  v-text = "item.name" :key = "index"></router-link>
				   	</div>
				   	<div class="set_box hidden">
					  	<div class="set_item">通用</div>
				   	</div>
					<div class="signOut">
						退出登陆
					</div>
				</div>
		 </div>
     </div>
</template>

<script>
import setHeader from "../../components/public/header.vue";
    export default {
        name:'setUp',
        components:{
          setHeader 
        },
         data() {
             return {
                 items:[
                    {name:'企业信息',routerUrl:"company"},
                    {name:'登陆密码',routerUrl:"revise"}
                 ],
                 headerMsg:{
                    type:"common2",
                    title:'设置',
                    right:'',
                    left:'返回'
                },
             }
         },
         methods:{
            
              
         }
    }
</script>

<style scoped>
.main-wrap{
    margin-top: 87px;
}
.set_main .set_box {
    margin-bottom: 22px;
    background: #FFF;
    padding: 0 24px;
}
.set_box .set_item {
    background: url(../../assets/img/arrow_right.png) right center no-repeat;
    color: #333;
    border-bottom: 1px solid #DDD;
}
.set_box .set_item, .set_main .signOut {
    height: 88px;
    line-height: 88px;
    font-size: 30px;
}
.set_box .set_item:last-child {
    border-bottom: none;
}
.hidden {
    display: none;
}
.set_main .signOut {
    color: #F51B44;
    margin-top: 60px;
}
.set_main .signOut, .ticket_nav {
    text-align: center;
    background: #FFF;
}
</style>
