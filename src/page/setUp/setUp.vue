<template>
     <div class="common-wrap">
         <setHeader :type = headerMsg ></setHeader>
         <div class="main-wrap ">
				<div class="main set_main">
					<div class="set_box">
					  	<router-link :to="item.routerUrl" tag="div" class="set_item"  v-for = "(item,index) in items"  v-text = "item.name" :key = "index"></router-link>
				   	</div>
				   	<div class="set_box hidden">
					  	<div class="set_item">通用</div>
				   	</div>
					<div class="signOut" @click="login_out">
						退出登陆
					</div>
				</div>
		 </div>
     </div>
</template>

<script>
import setHeader from "../../components/public/header.vue";
import { getSystem , getMessage , getIsLogin , getTokenId , getUserData, getSecretKey } from "../../common/common.js";
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
                type:"common",
                title:'设置',
                left:'返回'
            },
            userBasicParam:{
                source:'firmId'+ this.firmId,
                tokenId: getTokenId(),
                sign :this.$md5('firmId'+ this.firmId + "key" + getSecretKey()).toUpperCase()
            },
          }
      },
      mounted(){
          console.log( JSON.parse(localStorage.getItem("user_data")).firmInfoid)
          console.log(localStorage.getItem("tokenId"))
      },
      methods:{
        login_out:function(){
              this.$ajax.get(this.HOST, {
                params :Object.assign({
                    method:'user_logout',
                },this.userBasicParam)
            }).then(resp => {
                    console.log(resp.data)
                    localStorage.clear();
                    this.$router.push({path:'/my',query:{isLogin:false}})
                    if (!sessionStorage.getItem('system')) {
                        getSystem(this)
                    }

            }).catch(err => {
                console.log('请求失败：'+ err.statusCode);
            });
        }

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
