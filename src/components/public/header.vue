<template>
    <div>
        <!-- home 头部  带图片的头部-->
        <div   class="header-wrap" v-if="type == 'home'">
            <div class="header_left index_header_left sprite icon_location_a"></div>
            <h1 class="index_tit header_tit"><img src="../../assets/img/top_logo@2x.png" alt="" /></h1>
            <router-link to="/search">
            <div class="header_right sprite icon_search_a"></div>
            </router-link>
        </div>
        <!-- more 头部  标题头部-->
        <div  class="header-wrap"  v-if="type.type == 'common'">
            <div class="header_left moreDoogs_header_left sprite arrow_left_orange" v-text="type.left" @click="goBack"></div>
			<h2 class="index_tit header_tit" v-text="type.title"></h2>
        </div>
        <!-- login 头部  右侧有功能按钮-->
       <div class="header-wrap" v-if="type.type == 'common1'">
           <router-link :to="type.jumpFront" tag="div" class="header_left moreDoogs_header_left sprite arrow_left_orange" v-text="type.left"></router-link>
            <!-- <div class="header_left moreDoogs_header_left sprite arrow_left_orange" v-text="'返回'"></div> -->
			<h2 class="index_tit header_tit" v-text="type.title"></h2>
            <router-link :to="type.jumpAfter" tag="div" class="header_right login_top_right" v-text="type.right"></router-link>
            <!-- <div class="header_right login_top_right" v-text="'申请服务'" @click="register"></div> -->
        </div>
        <!-- my 头部 两边都有功能按钮的头部 -->
         <div class="wo_header" v-if="type.type == 'common3'">
           <div class="header_left">
					<dl @click="goToNext">
						<dt><img src="../../assets/img/icon_set.png"/></dt>
						<dd>设置</dd>
					</dl>
				</div>
				<div class="index_tit header_tit" v-text="type.title"></div>
				<div v-cloak class="header_right">
					<dl>
						<dt><img src="../../assets/img/icon_server.png"/></dt>
						<dd>人工客服</dd>
					</dl>
					<a class="telPhone" ></a>
				</div>
        </div>
        <!-- 点击事件的头部 -->
         <div class="header-wrap" v-if="type.type == 'common2'">
            <div class="header_left moreDoogs_header_left sprite arrow_left_orange" v-text="type.left" @click=" goBack"></div>
			<h2 class="index_tit header_tit" v-text="type.title"></h2>
            <div class="header_right login_top_right" v-text="type.right" @click="goToNext"></div>
        </div>
    </div>
</template>

<script>

    export default {
    
        name: 'app-header',
        props: ["type"],
        data() {
            return {
                logined:true,
            }
        },
        methods:{
            goBack : function(){
                if (window.history.length <= 1) {
                        this.$router.push({path:'/my'})   
                        return false;
                } else {
                    this.$router.go(-1)
                }
            },
            goToNext:function(){
                if(this.type.routerPath ){
                     return this.$router.push({path:this.type.routerPath , query:{isNew:1}})
                }else{
                     this.$router.go(-1) 
                }
              
            },
            register:function(){
                console.log('注册')
            }
        }
    
    }
</script>



<style scoped >
    .header-wrap{
        max-width: 750px;
        width: 100%;
        margin: 0 auto;
        height:87px;
        /* border-bottom: 1px solid #d8d8d8; */
        position: fixed;
        background: #f6f6f6;
        z-index: 3;
        top: 0;
    }
    .header_left,.header_right{width: 150px;height: 87px;position: absolute;font-size: 26px;line-height: 87px;z-index: 30;color: #f66b0c;top: 0;}
    .header_tit{width: 100%;height: 87px;font-size: 36px;line-height: 87px;position: relative;text-align: center;}

    .index_header_left{text-indent: 80px;width: 180px;}
    .header_right{right: 0;}
    .login_top_right {
    text-align: right;
    padding-right: 20px;
}
    /* .jump_search{background: url(../../assets/img/icon_search_a@2x.png) no-repeat 70px center;} */
    .index_tit img{width: 30%;}


    .sprite{background-image:url(../../assets/img/sprite.png);background-repeat:no-repeat ;}
    .icon_location_a{background-position:-422px -318px;}/*21.16*/


    .arrow_left{background-position:21px -210px;}
    .arrow_left_b{background-position:21px -280px;}/*0.9*/
    .arrow_left_orange{background-position:21px -352px;text-indent: 55px;}/*0.9*/


    .icon_search_a{background-position:-1000px 20px;}/*85,20*/


    .icon_voice{background-position:-1084px -444px;}


    /* .empty{width: 100%;height: 87px;} */


    /* my 样式 */
     .wo_header{
        border: none;
        position: absolute;
        background: 0 0;
        top: 0;
        left: 0;
        width: 100%;
        height: 87px;
        z-index: 3;
        /* background-color: #f37d33;
        box-shadow:0px 10px 10px #f37d33;  */
     }
    .wo_header .header_left {
        text-align: left;
        padding-left: 24px;
        z-index: 210;
    }
    .wo_header .header_left, .wo_header .header_right {
        line-height: 36px;
        padding-top: 7px;
        font-size: 20px;
    }
    .wo_header div {
        color: #FFF;
    }
    .wo_header .header_left dl, .wo_header .header_right dl {
        text-align: center;
        display: inline-block;
    }
    .wo_header .header_right {
        text-align: right;
        padding-right: 24px;
    }

</style>
