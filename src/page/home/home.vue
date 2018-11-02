<template>
   <div class="home">
        <app-header type="home"></app-header>
        <app-banner class="topHeight"></app-banner>
        <h1>hello world</h1>
        <homeGoods :mainActivityList = 'mainActivityList'></homeGoods>
        <homeGoods :mainActivityList = 'mainActivityList'></homeGoods>
        <alert></alert>
        <app-footer></app-footer>
   </div>
</template>

<script>
import appHeader from "../../components/public/header.vue";
import appFooter from "../../components/public/footer.vue";
import appBanner from "../../page/home/banner.vue";
import alert from "../../components/public/alert.vue";
import homeGoods from "./homeGoods.vue";
export default {
   name: 'home',
   data() {
       return {
           mainActivityList: {
                    activityDetailsList:[
                    {goodsLogo:"http://img.guoss.cn/gss_img_root/img_goods/14125/20181010141656.jpg",goodsName:"碧根果.罐装",gssPrice: "13.50",priceUnit: "罐"},
                    {goodsLogo:"http://img.guoss.cn/gss_img_root/img_goods/14125/20181010141656.jpg",goodsName:"碧根果.罐装",gssPrice: "13.50",priceUnit: "罐"},
                    {goodsLogo:"http://img.guoss.cn/gss_img_root/img_goods/14125/20181010141656.jpg",goodsName:"碧根果.罐装",gssPrice: "13.50",priceUnit: "罐"},
                    {goodsLogo:"http://img.guoss.cn/gss_img_root/img_goods/14125/20181010141656.jpg",goodsName:"碧根果.罐装",gssPrice: "13.50",priceUnit: "罐"},
                    {goodsLogo:"http://img.guoss.cn/gss_img_root/img_goods/14125/20181010141656.jpg",goodsName:"碧根果.罐装",gssPrice: "13.50",priceUnit: "罐"},
                    {goodsLogo:"http://img.guoss.cn/gss_img_root/img_goods/14125/20181010141656.jpg",goodsName:"碧根果.罐装",gssPrice: "13.50",priceUnit: "罐"},
                    {goodsLogo:"http://img.guoss.cn/gss_img_root/img_goods/14125/20181010141656.jpg",goodsName:"碧根果.罐装",gssPrice: "13.50",priceUnit: "罐"},
                    {goodsLogo:"http://img.guoss.cn/gss_img_root/img_goods/14125/20181010141656.jpg",goodsName:"碧根果.罐装",gssPrice: "13.50",priceUnit: "罐"},
                    {goodsLogo:"http://img.guoss.cn/gss_img_root/img_goods/14125/20181010141656.jpg",goodsName:"碧根果.罐装",gssPrice: "13.50",priceUnit: "罐"},
                    {goodsLogo:"http://img.guoss.cn/gss_img_root/img_goods/14125/20181010141656.jpg",goodsName:"碧根果.罐装",gssPrice: "13.50",priceUnit: "罐"}
                    
                    ],
                    activityTitle:"秋季价到-坚果零食盛宴",
                    goodsNum: 3
                }
       }
    },
    components: {
        appHeader,
        appFooter,
        appBanner,
        alert,
        homeGoods
    },
    mounted(){
        this.get_main_page();
    },
    methods:{
        get_main_page:function () {
            this.$ajax.get(this.HOST, {
                params:{
                    method: "main_page_show_three",
                    websiteNode: "3301"
                }
            }).then(result => {
                // return JSON.parse(JSON.stringify(result));
                return JSON.stringify(result.data);

                // console.log(data);
            }).then(data => {
                console.log(data);
                
            });
        }
    }
}
</script>

<style scoped >
    .topHeight{
        margin-top:87px; 
    }

</style>
