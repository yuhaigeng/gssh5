<template>
    <div>
        <div class="header-wrap" v-if="type == 'home'">
            <div class="header_left index_header_left sprite icon_location_a"></div>
            <h1 class="index_tit header_tit"><img src="../../assets/img/top_logo@2x.png" alt="" /></h1>
            <div class="header_right sprite icon_search_a"></div>
        </div>
        <div class="header-wrap" v-if="type == 'more'">
            <div class="header_left moreDoogs_header_left sprite arrow_left_orange" v-text="'返回'"></div>
			<h2 class="index_tit header_tit" v-text="type == 'home'"></h2>
        </div>
        <div class="empty"></div>
    </div>
</template>

<script>

    export default {
    
        name: 'app-header',
        props: ["type"],
        data() {
            return {
            }
    
        },
        created:{
            
        },
        components: {}
    
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
