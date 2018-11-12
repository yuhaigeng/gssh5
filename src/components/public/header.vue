<template>
        <!-- home 头部  带图片的头部-->
        <div class="header-wrap" :class="type.type == 'my' && 'my-header'">
            <!-- 左  -->
            <div class="header_left">
                <!-- home -->
                <slot name="homeleft"></slot>
                <!-- 返回 -->
                <div class="common_back " v-if="type.type == 'common'" v-text="type.left ? type.left :'' " @click="goBack"></div>
                 <!-- my -->
                <slot name="myLeft"></slot>
            </div>
            <!-- 中 -->
            <h2 class="header_tit">
                <!-- home  -->
                <slot name="homeLogo"></slot>
                <!-- 标题 -->
                <div v-text="type.title"></div>
            </h2>
            <!-- 右 -->
             <div class="header_right">
                  <!-- 搜索 -->
                 <router-link to="/search" v-if="type.type == 'home'" tag="div" class="icon_search_a"></router-link>
                 <!-- 跳转路由 -->
                 <router-link :to="type.jumpAfter" tag="div" v-if="type.jumpAfter" v-text="type.right"></router-link>
                 <!-- 弹框 -->
                 <slot name="commonAlert"></slot>
                 <!-- my -->
                 <slot name="myRight"></slot>
                 <!-- 确认按钮 -->
                 <slot name="sure"></slot>

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
                    this.$router.go(-1)
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
    .header_right{right: 0;  text-align: right;padding-right: 20px;}
    .login_top_right {
    text-align: right;
    padding-right: 20px;
}
    /* 新加样式 */
    .icon_search_a {
        width:100%;
        height:100%;
        background-position: -1000px 20px;
        background-image: url(../../assets/img/sprite.png);
        background-repeat: no-repeat;
    }
   .common_back{
        background-image: url(../../assets/img/sprite.png);
        background-position: 21px -352px;
        background-repeat: no-repeat;
        text-indent: 55px;
        z-index: 100;
   }
   .my-header{
       background:none;
       border:none;
       color: #fff;
   }
</style>
