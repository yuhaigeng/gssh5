<template>
    <div>
        <div class="header-wrap" v-if="type == 'home'">
            <div class="header_left index_header_left sprite icon_location_a"></div>
            <h1 class="index_tit header_tit"><img src="../../assets/img/top_logo@2x.png" alt="" /></h1>
            <div class="header_right sprite icon_search_a"></div>
        </div>
        <div class="header-wrap" v-if="type == 'more'">
            <div class="header_left moreDoogs_header_left sprite arrow_left_orange" v-text="'返回'" @click="goBack"></div>
			<h2 class="index_tit header_tit" v-text="'更多商品'"></h2>
        </div>
        <div v-show="logined" v-if="type == 'my'" class="header-wrap goodsDetails_header wo_header">
            <div class="header_left">
                <dl data-url="set.html" @click="goToNext" >
                    <dt><img src="../../assets/img/icon_set.png"/></dt>
                    <dd>设置</dd>
                </dl>
            </div>
            <div class="index_tit header_tit">我的</div>
            <div class="header_right">
                <dl>
                    <dt><img src="../../assets/img/icon_server.png"/></dt>
                    <dd>人工客服</dd>
                </dl>
                <a class="telPhone" :href="'tel:123456'"></a>
            </div>
        </div>
        <div class="header-wrap" v-if="type == 'message'">
            <div class="header_left moreDoogs_header_left sprite arrow_left_orange" v-text="'返回'" @click="goBack"></div>
			<h2 class="index_tit header_tit" v-text="'消息'"></h2>
        </div>
        <div class="empty" v-if="type == 'my'" v-text="type"></div>
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
                window.history.go(-1);
            },
            goToNext:function(){

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
        border-bottom: 1px solid #d8d8d8;
        position: fixed;
        background: #f6f6f6;
        z-index: 3;
        top: 0;
    }
    .header_left,.header_right{width: 150px;height: 87px;position: absolute;font-size: 26px;line-height: 87px;z-index: 30;color: #f66b0c;top: 0;}
    .header_tit{width: 100%;height: 87px;font-size: 36px;line-height: 87px;position: relative;text-align: center;}

    .index_header_left{text-indent: 80px;width: 180px;}
    .header_right{right: 0;}
    /* .jump_search{background: url(../../assets/img/icon_search_a@2x.png) no-repeat 70px center;} */
    .index_tit img{width: 30%;}


    .sprite{background-image:url(../../assets/img/sprite.png);background-repeat:no-repeat ;}
    .icon_location_a{background-position:-422px -318px;}/*21.16*/


    .arrow_left{background-position:21px -210px;}
    .arrow_left_b{background-position:21px -280px;}/*0.9*/
    .arrow_left_orange{background-position:21px -352px;}/*0.9*/


    .icon_search_a{background-position:-1000px 20px;}/*85,20*/


    .icon_voice{background-position:-1084px -444px;}


    .empty{width: 100%;height: 87px;}
</style>
